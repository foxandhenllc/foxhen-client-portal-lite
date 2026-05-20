import {
  approvalLabels,
  decisionLabels,
  placeholderLabels,
  questionLabels,
  type ClientWorkspace,
  type CloseoutChecklistItem,
  type DecisionLogEntry,
  type MilestoneTemplate
} from "../data/clientWorkspace.js";
import { getWorkspaceSummary, type WorkspaceSummary } from "../lib/portalMetrics.js";

export type ClientWorkspaceStatusJson = {
  generatedAt: string;
  publicSafeMode: boolean;
  modeNote: string;
  workspace: {
    title: string;
    clientLabel: string;
    workspaceLabel: string;
    serviceLine: string;
    repositoryUrl: string;
    liveDemoUrl: string;
  };
  summary: WorkspaceSummary;
  milestones: MilestoneTemplate[];
  decisions: DecisionLogEntry[];
  closeoutChecklist: CloseoutChecklistItem[];
  publicSafeRules: string[];
};

export type ClientWorkspaceReport = {
  json: ClientWorkspaceStatusJson;
  markdown: string;
  filenameBase: string;
};

export type ReportOptions = {
  generatedAt?: string;
  publicSafeMode: boolean;
};

export function buildClientWorkspaceReport(workspace: ClientWorkspace, options: ReportOptions): ClientWorkspaceReport {
  const generatedAt = options.generatedAt ?? new Date().toISOString();
  const json: ClientWorkspaceStatusJson = {
    generatedAt,
    publicSafeMode: options.publicSafeMode,
    modeNote: options.publicSafeMode
      ? "Public-safe mode is active. Keep this report fictional and placeholder-based."
      : "Private fork preview. Replace fixture content only in a private workspace.",
    workspace: {
      title: workspace.title,
      clientLabel: workspace.clientLabel,
      workspaceLabel: workspace.workspaceLabel,
      serviceLine: workspace.serviceLine,
      repositoryUrl: workspace.repositoryUrl,
      liveDemoUrl: workspace.liveDemoUrl
    },
    summary: getWorkspaceSummary(workspace),
    milestones: workspace.milestones,
    decisions: workspace.decisions,
    closeoutChecklist: workspace.closeoutChecklist,
    publicSafeRules: workspace.publicSafeRules
  };

  return {
    json,
    markdown: renderMarkdownStatus(json),
    filenameBase: `${workspace.repoName}-status-report`
  };
}

export function serializeClientWorkspaceStatus(status: ClientWorkspaceStatusJson) {
  return JSON.stringify(status, null, 2);
}

function renderMarkdownStatus(status: ClientWorkspaceStatusJson) {
  const lines = [
    `# ${status.workspace.title}`,
    "",
    `Generated: ${status.generatedAt}`,
    `Mode: ${status.publicSafeMode ? "Public-safe" : "Private fork preview"}`,
    `Client label: ${status.workspace.clientLabel}`,
    `Workspace: ${status.workspace.workspaceLabel}`,
    "",
    "## Summary",
    `- Milestones: ${status.summary.totalMilestones}`,
    `- Approved milestones: ${status.summary.approvedMilestones}`,
    `- In review or changes requested: ${status.summary.milestonesInReview}`,
    `- Open client questions: ${status.summary.openClientQuestions}`,
    `- Pending file/request placeholders: ${status.summary.pendingFileRequests}`,
    `- Closeout completion: ${status.summary.closeoutCompletion}`,
    `- Average milestone progress: ${status.summary.averageProgress}%`,
    "",
    "## Milestones",
    ...status.milestones.flatMap((milestone) => [
      `- ${milestone.title} — ${approvalLabels[milestone.approvalState]} — ${milestone.progress}%`,
      `  - Owner: ${milestone.owner}; due: ${milestone.dueWindow}`,
      `  - Acceptance: ${milestone.acceptanceCriteria.join("; ")}`,
      `  - Files: ${milestone.files.length ? milestone.files.map((file) => `${file.label} (${placeholderLabels[file.status]})`).join(", ") : "None"}`,
      `  - Requests: ${milestone.requests.length ? milestone.requests.map((request) => `${request.label} (${placeholderLabels[request.status]})`).join(", ") : "None"}`,
      `  - Questions: ${milestone.questions.length ? milestone.questions.map((question) => `${question.question} (${questionLabels[question.status]})`).join(", ") : "None"}`
    ]),
    "",
    "## Decisions",
    ...status.decisions.map((decision) => `- ${decision.date}: ${decision.topic} — ${decision.decision} (${decisionLabels[decision.status]}; next: ${decision.nextStep})`),
    "",
    "## Closeout Checklist",
    ...status.closeoutChecklist.map((item) => `- ${item.complete ? "[x]" : "[ ]"} ${item.label} — ${item.owner}`),
    "",
    "## Public-Safe Rules",
    ...status.publicSafeRules.map((rule) => `- ${rule}`)
  ];

  return `${lines.join("\n")}\n`;
}
