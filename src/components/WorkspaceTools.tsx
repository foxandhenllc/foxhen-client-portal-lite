import { useState, type ChangeEvent, type FormEvent } from "react";
import type { CustomMilestoneInput } from "../lib/workspaceStorage";

type WorkspaceToolsProps = {
  statusMessage: string;
  onExportWorkspace: () => void;
  onImportWorkspace: (contents: string) => void;
  onResetWorkspace: () => void;
  onAddMilestone: (input: CustomMilestoneInput) => void;
};

type MilestoneDraft = {
  title: string;
  owner: string;
  dueWindow: string;
  summary: string;
};

const emptyDraft: MilestoneDraft = {
  title: "",
  owner: "Client",
  dueWindow: "Next check-in",
  summary: ""
};

export function WorkspaceTools({
  statusMessage,
  onExportWorkspace,
  onImportWorkspace,
  onResetWorkspace,
  onAddMilestone
}: WorkspaceToolsProps) {
  const [draft, setDraft] = useState<MilestoneDraft>(emptyDraft);

  async function handleImport(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    if (!file) return;

    onImportWorkspace(await file.text());
    input.value = "";
  }

  function updateDraft(field: keyof MilestoneDraft, value: string) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function submitMilestone(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAddMilestone(draft);
    setDraft(emptyDraft);
  }

  return (
    <section className="workspace-tools" id="workspace-tools" aria-label="Local workspace tools">
      <div className="tools-copy">
        <p className="section-kicker">Local workspace tools</p>
        <h2>Keep edits in this browser, export them, or reset to the sample.</h2>
        <p>
          Workspace JSON stays local to this browser unless you choose to download or import a file.
          Keep entries fictional and placeholder-based for public-safe use.
        </p>
        <div className="workspace-controls">
          <button type="button" className="primary-action" onClick={onExportWorkspace}>Export workspace JSON</button>
          <label className="secondary-action import-action">
            Import workspace JSON
            <input type="file" accept="application/json,.json" onChange={handleImport} />
          </label>
          <button type="button" className="secondary-action" onClick={onResetWorkspace}>Reset to sample</button>
        </div>
        <p className="workspace-status" role="status">{statusMessage}</p>
      </div>

      <form className="quick-add-form" onSubmit={submitMilestone}>
        <h3>Add a custom milestone</h3>
        <label>
          <span>Title</span>
          <input
            type="text"
            value={draft.title}
            onChange={(event) => updateDraft("title", event.currentTarget.value)}
            placeholder="Client review checkpoint"
            required
          />
        </label>
        <div className="form-pair">
          <label>
            <span>Owner</span>
            <input
              type="text"
              value={draft.owner}
              onChange={(event) => updateDraft("owner", event.currentTarget.value)}
              placeholder="Client"
            />
          </label>
          <label>
            <span>Due window</span>
            <input
              type="text"
              value={draft.dueWindow}
              onChange={(event) => updateDraft("dueWindow", event.currentTarget.value)}
              placeholder="Next check-in"
            />
          </label>
        </div>
        <label>
          <span>Summary</span>
          <textarea
            value={draft.summary}
            onChange={(event) => updateDraft("summary", event.currentTarget.value)}
            placeholder="Public-safe note about what this milestone needs to track."
          />
        </label>
        <button type="submit" className="primary-action">Add milestone</button>
      </form>
    </section>
  );
}
