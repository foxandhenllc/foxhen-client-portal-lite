import { approvalLabels, type MilestoneTemplate } from "../data/clientWorkspace";
import { getMilestoneActionCount } from "../lib/portalMetrics";
import { StatusBadge } from "./StatusBadge";

type MilestoneBoardProps = {
  milestones: MilestoneTemplate[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function MilestoneBoard({ milestones, selectedId, onSelect }: MilestoneBoardProps) {
  return (
    <div className="milestone-list" aria-label="Milestone templates">
      {milestones.map((milestone) => (
        <button
          key={milestone.id}
          type="button"
          className={milestone.id === selectedId ? "milestone-card selected" : "milestone-card"}
          onClick={() => onSelect(milestone.id)}
        >
          <span className="card-topline">
            <span>{milestone.phase}</span>
            <StatusBadge label={approvalLabels[milestone.approvalState]} status={milestone.approvalState} />
          </span>
          <strong>{milestone.title}</strong>
          <small>{milestone.summary}</small>
          <span className="progress-track">
            <span style={{ width: `${milestone.progress}%` }} />
          </span>
          <span className="card-meta">
            <em>{milestone.progress}% complete</em>
            <em>{getMilestoneActionCount(milestone)} open actions</em>
          </span>
        </button>
      ))}
    </div>
  );
}
