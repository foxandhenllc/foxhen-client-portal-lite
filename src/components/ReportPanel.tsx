import type { CloseoutChecklistItem } from "../data/clientWorkspace";

type ReportPanelProps = {
  reportMarkdown: string;
  closeoutChecklist: CloseoutChecklistItem[];
  onRefresh: () => void;
  onDownloadJson: () => void;
  onDownloadMarkdown: () => void;
  onToggleCloseout: (id: string) => void;
};

export function ReportPanel({
  reportMarkdown,
  closeoutChecklist,
  onRefresh,
  onDownloadJson,
  onDownloadMarkdown,
  onToggleCloseout
}: ReportPanelProps) {
  return (
    <section className="report-panel" id="exports">
      <div className="panel-copy">
        <p className="section-kicker">Status report exports</p>
        <h2>Generate client-ready JSON and Markdown from the current workspace.</h2>
        <p>
          The report mirrors milestone templates, approval state, decision history, file/request placeholders,
          client questions, closeout tasks, and the active public-safe mode.
        </p>
        <div className="action-row">
          <button type="button" className="primary-action" onClick={onRefresh}>Refresh report</button>
          <button type="button" className="secondary-action" onClick={onDownloadJson}>Download JSON</button>
          <button type="button" className="secondary-action" onClick={onDownloadMarkdown}>Download Markdown</button>
        </div>
      </div>
      <div className="closeout-card">
        <h3>Closeout checklist</h3>
        <div className="closeout-list">
          {closeoutChecklist.map((item) => (
            <button key={item.id} type="button" className={item.complete ? "closeout-item complete" : "closeout-item"} onClick={() => onToggleCloseout(item.id)}>
              <span>{item.complete ? "✓" : "○"}</span>
              <strong>{item.label}</strong>
              <small>{item.owner}</small>
            </button>
          ))}
        </div>
      </div>
      <textarea
        className="report-output"
        value={reportMarkdown}
        readOnly
        aria-label="Generated Markdown status report"
      />
    </section>
  );
}
