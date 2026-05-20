import type { WorkspaceSummary } from "../lib/portalMetrics";

type MetricCardsProps = {
  summary: WorkspaceSummary;
};

export function MetricCards({ summary }: MetricCardsProps) {
  return (
    <div className="metric-grid">
      <article>
        <span>Milestones</span>
        <strong>{summary.totalMilestones}</strong>
        <small>{summary.approvedMilestones} approved</small>
      </article>
      <article>
        <span>Open questions</span>
        <strong>{summary.openClientQuestions}</strong>
        <small>{summary.milestonesInReview} in review</small>
      </article>
      <article>
        <span>File requests</span>
        <strong>{summary.pendingFileRequests}</strong>
        <small>{summary.placeholderFiles} placeholders</small>
      </article>
      <article>
        <span>Closeout</span>
        <strong>{summary.closeoutCompletion}</strong>
        <small>{summary.averageProgress}% avg progress</small>
      </article>
    </div>
  );
}
