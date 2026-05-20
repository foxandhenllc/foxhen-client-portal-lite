import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { MetricCards } from "./components/MetricCards";
import { MilestoneBoard } from "./components/MilestoneBoard";
import { PublicSafeToggle } from "./components/PublicSafeToggle";
import { ReportPanel } from "./components/ReportPanel";
import { StatusBadge } from "./components/StatusBadge";
import { WorkspaceInspector } from "./components/WorkspaceInspector";
import { WorkspaceTools } from "./components/WorkspaceTools";
import {
  approvalOrder,
  decisionLabels,
  placeholderLabels,
  type ClientWorkspace,
  type MilestoneTemplate,
  type PlaceholderStatus,
  type QuestionStatus
} from "./data/clientWorkspace";
import { buildClientWorkspaceReport, serializeClientWorkspaceStatus } from "./exporters/statusReport";
import { getWorkspaceSummary } from "./lib/portalMetrics";
import {
  addCustomMilestone,
  cloneSampleWorkspace,
  loadWorkspaceFromStorage,
  parseWorkspaceJson,
  saveWorkspaceToStorage,
  serializeWorkspace,
  type CustomMilestoneInput,
  type StorageLike
} from "./lib/workspaceStorage";
import "./styles.css";

function cyclePlaceholder(status: PlaceholderStatus): PlaceholderStatus {
  if (status === "needed") return "received";
  if (status === "received") return "placeholder";
  return "needed";
}

function cycleQuestion(status: QuestionStatus): QuestionStatus {
  if (status === "open") return "answered";
  if (status === "answered") return "deferred";
  return "open";
}

function updateMilestone(workspace: ClientWorkspace, milestoneId: string, updater: (milestone: MilestoneTemplate) => MilestoneTemplate): ClientWorkspace {
  return {
    ...workspace,
    milestones: workspace.milestones.map((milestone) => (milestone.id === milestoneId ? updater(milestone) : milestone))
  };
}

function downloadFile(filename: string, contents: string, type: string) {
  const url = URL.createObjectURL(new Blob([contents], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function getBrowserStorage(): StorageLike | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage ?? null;
  } catch {
    return null;
  }
}

function getInitialWorkspace() {
  return loadWorkspaceFromStorage(getBrowserStorage()) ?? cloneSampleWorkspace();
}

function App() {
  const [workspace, setWorkspace] = useState<ClientWorkspace>(getInitialWorkspace);
  const [publicSafeMode, setPublicSafeMode] = useState(true);
  const [selectedId, setSelectedId] = useState(workspace.milestones[0]?.id ?? "");
  const [report, setReport] = useState(() => buildClientWorkspaceReport(workspace, { publicSafeMode: true }));
  const [workspaceNotice, setWorkspaceNotice] = useState("Saved automatically in this browser only.");
  const [selectLatestMilestone, setSelectLatestMilestone] = useState(false);

  const summary = useMemo(() => getWorkspaceSummary(workspace), [workspace]);
  const selectedMilestone = workspace.milestones.find((milestone) => milestone.id === selectedId) ?? workspace.milestones[0];
  const appStyle = {
    "--accent": workspace.theme.accent,
    "--accent-2": workspace.theme.accent2,
    "--ink": workspace.theme.ink,
    "--soft": workspace.theme.soft,
    "--warm": workspace.theme.warm
  } as CSSProperties;

  useEffect(() => {
    saveWorkspaceToStorage(workspace, getBrowserStorage());
  }, [workspace]);

  useEffect(() => {
    if (!workspace.milestones.some((milestone) => milestone.id === selectedId)) {
      setSelectedId(workspace.milestones[0]?.id ?? "");
    }
  }, [selectedId, workspace.milestones]);

  useEffect(() => {
    if (!selectLatestMilestone) return;

    const addedMilestone = workspace.milestones[workspace.milestones.length - 1];
    setSelectedId(addedMilestone?.id ?? workspace.milestones[0]?.id ?? "");
    setSelectLatestMilestone(false);
  }, [selectLatestMilestone, workspace.milestones]);

  function refreshReport() {
    const nextReport = buildClientWorkspaceReport(workspace, { publicSafeMode });
    setReport(nextReport);
    return nextReport;
  }

  function advanceApproval(milestoneId: string) {
    setWorkspace((current) =>
      updateMilestone(current, milestoneId, (milestone) => {
        const currentIndex = approvalOrder.indexOf(milestone.approvalState);
        const nextState = approvalOrder[(currentIndex + 1) % approvalOrder.length];
        const nextProgress = nextState === "approved" ? 100 : Math.min(95, milestone.progress + 12);
        return { ...milestone, approvalState: nextState, progress: nextProgress };
      })
    );
  }

  function toggleFile(milestoneId: string, fileId: string) {
    setWorkspace((current) =>
      updateMilestone(current, milestoneId, (milestone) => ({
        ...milestone,
        files: milestone.files.map((file) => (file.id === fileId ? { ...file, status: cyclePlaceholder(file.status) } : file))
      }))
    );
  }

  function toggleRequest(milestoneId: string, requestId: string) {
    setWorkspace((current) =>
      updateMilestone(current, milestoneId, (milestone) => ({
        ...milestone,
        requests: milestone.requests.map((request) => (request.id === requestId ? { ...request, status: cyclePlaceholder(request.status) } : request))
      }))
    );
  }

  function toggleQuestion(milestoneId: string, questionId: string) {
    setWorkspace((current) =>
      updateMilestone(current, milestoneId, (milestone) => ({
        ...milestone,
        questions: milestone.questions.map((question) =>
          question.id === questionId
            ? {
                ...question,
                status: cycleQuestion(question.status),
                answer: question.answer || "Captured for the next client update."
              }
            : question
        )
      }))
    );
  }

  function toggleCloseout(id: string) {
    setWorkspace((current) => ({
      ...current,
      closeoutChecklist: current.closeoutChecklist.map((item) => (item.id === id ? { ...item, complete: !item.complete } : item))
    }));
  }

  function downloadJson() {
    const nextReport = refreshReport();
    downloadFile(`${nextReport.filenameBase}.json`, serializeClientWorkspaceStatus(nextReport.json), "application/json");
  }

  function downloadMarkdown() {
    const nextReport = refreshReport();
    downloadFile(`${nextReport.filenameBase}.md`, nextReport.markdown, "text/markdown");
  }

  function downloadWorkspaceJson() {
    downloadFile(`${workspace.repoName}-workspace.json`, serializeWorkspace(workspace), "application/json");
    setWorkspaceNotice("Workspace JSON downloaded. No data was sent anywhere.");
  }

  function importWorkspaceJson(contents: string) {
    const parsedWorkspace = parseWorkspaceJson(contents);

    if (!parsedWorkspace.ok) {
      setWorkspaceNotice(parsedWorkspace.error);
      return;
    }

    setWorkspace(parsedWorkspace.workspace);
    setSelectedId(parsedWorkspace.workspace.milestones[0]?.id ?? "");
    setReport(buildClientWorkspaceReport(parsedWorkspace.workspace, { publicSafeMode }));
    setWorkspaceNotice("Workspace JSON imported and saved locally in this browser.");
  }

  function resetWorkspace() {
    const nextWorkspace = cloneSampleWorkspace();
    setWorkspace(nextWorkspace);
    setSelectedId(nextWorkspace.milestones[0]?.id ?? "");
    setReport(buildClientWorkspaceReport(nextWorkspace, { publicSafeMode }));
    setWorkspaceNotice("Reset to the public-safe sample workspace.");
  }

  function addMilestone(input: CustomMilestoneInput) {
    const now = input.now ?? new Date();
    setWorkspace((current) => addCustomMilestone(current, { ...input, now }));
    setSelectLatestMilestone(true);
    setWorkspaceNotice("Custom milestone added and saved locally.");
  }

  return (
    <div className={publicSafeMode ? "app-shell public-safe" : "app-shell private-preview"} style={appStyle}>
      <header className="site-header">
        <a className="brand" href={workspace.liveDemoUrl}>
          <span className="brand-mark">F&amp;H</span>
          <span>
            <strong>{workspace.title}</strong>
            <small>{workspace.workspaceLabel}</small>
          </span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#milestones">Milestones</a>
          <a href="#decisions">Decisions</a>
          <a href="#exports">Exports</a>
          <a href="#workspace-tools">Workspace</a>
          <a className="nav-button" href={workspace.repositoryUrl}>Fork starter</a>
        </nav>
        <PublicSafeToggle enabled={publicSafeMode} onChange={setPublicSafeMode} />
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="section-kicker">{workspace.serviceLine}</p>
            <h1>Reusable public-safe client workspace starter.</h1>
            <p className="lede">{workspace.summary}</p>
            <div className="action-row">
              <button type="button" className="primary-action" onClick={refreshReport}>Generate status report</button>
              <a className="secondary-action" href="#milestones">Open workspace</a>
            </div>
          </div>
          <aside className="mode-card">
            <span className="mode-pill">{publicSafeMode ? "Public-safe mode on" : "Private fork preview"}</span>
            <h2>{workspace.clientLabel}</h2>
            <p>
              {publicSafeMode
                ? "Exports are labeled as fictional and placeholder-based so this repo can stay reusable."
                : "Preview how the same static workspace can be customized in a private fork without adding backend dependencies."}
            </p>
            <ul>
              {workspace.publicSafeRules.map((rule) => <li key={rule}>{rule}</li>)}
            </ul>
          </aside>
        </section>

        <section className="summary-panel" aria-label="Workspace status metrics">
          <MetricCards summary={summary} />
        </section>

        <WorkspaceTools
          statusMessage={workspaceNotice}
          onExportWorkspace={downloadWorkspaceJson}
          onImportWorkspace={importWorkspaceJson}
          onResetWorkspace={resetWorkspace}
          onAddMilestone={addMilestone}
        />

        <section className="workspace-section" id="milestones">
          <div className="section-heading">
            <p className="section-kicker">Milestone templates</p>
            <h2>Track approvals, placeholders, and client questions in one static workspace.</h2>
          </div>
          <div className="workspace-grid">
            <MilestoneBoard milestones={workspace.milestones} selectedId={selectedMilestone.id} onSelect={setSelectedId} />
            <WorkspaceInspector
              milestone={selectedMilestone}
              onAdvanceApproval={advanceApproval}
              onToggleFile={toggleFile}
              onToggleRequest={toggleRequest}
              onToggleQuestion={toggleQuestion}
            />
          </div>
        </section>

        <section className="decision-section" id="decisions">
          <div className="section-heading">
            <p className="section-kicker">Decision log</p>
            <h2>Keep scope calls visible before they become client confusion.</h2>
          </div>
          <div className="decision-grid">
            {workspace.decisions.map((decision) => (
              <article key={decision.id} className="decision-card">
                <div className="decision-topline">
                  <span>{decision.date}</span>
                  <StatusBadge label={decisionLabels[decision.status]} status={decision.status} />
                </div>
                <h3>{decision.topic}</h3>
                <p>{decision.decision}</p>
                <small><strong>Owner:</strong> {decision.owner}</small>
                <small><strong>Next:</strong> {decision.nextStep}</small>
              </article>
            ))}
          </div>
        </section>

        <section className="placeholder-section">
          <div>
            <p className="section-kicker">File and request placeholders</p>
            <h2>Public starter data shows the shape of work without carrying private assets.</h2>
          </div>
          <div className="placeholder-summary">
            {workspace.milestones.flatMap((milestone) => [...milestone.files, ...milestone.requests]).slice(0, 6).map((item) => (
              <article key={item.id}>
                <StatusBadge label={placeholderLabels[item.status]} status={item.status} />
                <strong>{item.label}</strong>
                <small>{item.kind}</small>
              </article>
            ))}
          </div>
        </section>

        <ReportPanel
          reportMarkdown={report.markdown}
          closeoutChecklist={workspace.closeoutChecklist}
          onRefresh={refreshReport}
          onDownloadJson={downloadJson}
          onDownloadMarkdown={downloadMarkdown}
          onToggleCloseout={toggleCloseout}
        />
      </main>
    </div>
  );
}

export default App;
