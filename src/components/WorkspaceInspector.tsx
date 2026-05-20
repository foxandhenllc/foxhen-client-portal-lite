import {
  approvalLabels,
  placeholderLabels,
  questionLabels,
  type MilestoneTemplate
} from "../data/clientWorkspace";
import { StatusBadge } from "./StatusBadge";

type WorkspaceInspectorProps = {
  milestone: MilestoneTemplate;
  onAdvanceApproval: (id: string) => void;
  onToggleFile: (milestoneId: string, fileId: string) => void;
  onToggleRequest: (milestoneId: string, requestId: string) => void;
  onToggleQuestion: (milestoneId: string, questionId: string) => void;
};

export function WorkspaceInspector({
  milestone,
  onAdvanceApproval,
  onToggleFile,
  onToggleRequest,
  onToggleQuestion
}: WorkspaceInspectorProps) {
  return (
    <aside className="inspector" id="inspector">
      <div className="inspector-topline">
        <StatusBadge label={approvalLabels[milestone.approvalState]} status={milestone.approvalState} />
        <button type="button" onClick={() => onAdvanceApproval(milestone.id)}>Advance approval</button>
      </div>
      <h3>{milestone.title}</h3>
      <p>{milestone.summary}</p>
      <dl className="detail-grid">
        <div>
          <dt>Owner</dt>
          <dd>{milestone.owner}</dd>
        </div>
        <div>
          <dt>Due window</dt>
          <dd>{milestone.dueWindow}</dd>
        </div>
      </dl>

      <section className="inspector-section">
        <h4>Acceptance criteria</h4>
        <ul className="check-list compact">
          {milestone.acceptanceCriteria.map((criterion) => <li key={criterion}>{criterion}</li>)}
        </ul>
      </section>

      <section className="inspector-section">
        <h4>File placeholders</h4>
        <div className="placeholder-list">
          {milestone.files.length ? milestone.files.map((file) => (
            <button key={file.id} type="button" onClick={() => onToggleFile(milestone.id, file.id)}>
              <span>
                <strong>{file.label}</strong>
                <small>{file.kind} · {file.notes}</small>
              </span>
              <StatusBadge label={placeholderLabels[file.status]} status={file.status} />
            </button>
          )) : <p className="empty-note">No file placeholders for this milestone.</p>}
        </div>
      </section>

      <section className="inspector-section">
        <h4>Client requests</h4>
        <div className="placeholder-list">
          {milestone.requests.length ? milestone.requests.map((request) => (
            <button key={request.id} type="button" onClick={() => onToggleRequest(milestone.id, request.id)}>
              <span>
                <strong>{request.label}</strong>
                <small>{request.kind} · {request.notes}</small>
              </span>
              <StatusBadge label={placeholderLabels[request.status]} status={request.status} />
            </button>
          )) : <p className="empty-note">No open client requests for this milestone.</p>}
        </div>
      </section>

      <section className="inspector-section">
        <h4>Client questions</h4>
        <div className="question-list">
          {milestone.questions.length ? milestone.questions.map((question) => (
            <button key={question.id} type="button" onClick={() => onToggleQuestion(milestone.id, question.id)}>
              <span>
                <strong>{question.question}</strong>
                <small>{question.owner}{question.answer ? ` · ${question.answer}` : ""}</small>
              </span>
              <StatusBadge label={questionLabels[question.status]} status={question.status} />
            </button>
          )) : <p className="empty-note">No client questions for this milestone.</p>}
        </div>
      </section>
    </aside>
  );
}
