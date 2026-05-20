import type { ApprovalState, ClientWorkspace, MilestoneTemplate } from "../data/clientWorkspace.js";

export type WorkspaceSummary = {
  totalMilestones: number;
  approvedMilestones: number;
  milestonesInReview: number;
  openClientQuestions: number;
  pendingFileRequests: number;
  placeholderFiles: number;
  decisionCount: number;
  closeoutComplete: number;
  closeoutTotal: number;
  closeoutCompletion: string;
  averageProgress: number;
  approvalBreakdown: Record<ApprovalState, number>;
};

export function getWorkspaceSummary(workspace: ClientWorkspace): WorkspaceSummary {
  const totalMilestones = workspace.milestones.length;
  const closeoutComplete = workspace.closeoutChecklist.filter((item) => item.complete).length;
  const closeoutTotal = workspace.closeoutChecklist.length;
  const approvalBreakdown = workspace.milestones.reduce<Record<ApprovalState, number>>(
    (counts, milestone) => ({
      ...counts,
      [milestone.approvalState]: counts[milestone.approvalState] + 1
    }),
    {
      "not-started": 0,
      "in-review": 0,
      "changes-requested": 0,
      approved: 0
    }
  );

  return {
    totalMilestones,
    approvedMilestones: approvalBreakdown.approved,
    milestonesInReview: approvalBreakdown["in-review"] + approvalBreakdown["changes-requested"],
    openClientQuestions: workspace.milestones.flatMap((milestone) => milestone.questions).filter((question) => question.status === "open").length,
    pendingFileRequests: workspace.milestones.flatMap((milestone) => milestone.requests).filter((request) => request.status === "needed").length,
    placeholderFiles: workspace.milestones.flatMap((milestone) => milestone.files).filter((file) => file.status === "placeholder").length,
    decisionCount: workspace.decisions.length,
    closeoutComplete,
    closeoutTotal,
    closeoutCompletion: `${closeoutComplete}/${closeoutTotal}`,
    averageProgress: Math.round(workspace.milestones.reduce((sum, milestone) => sum + milestone.progress, 0) / Math.max(1, totalMilestones)),
    approvalBreakdown
  };
}

export function getMilestoneActionCount(milestone: MilestoneTemplate) {
  return (
    milestone.requests.filter((request) => request.status === "needed").length +
    milestone.files.filter((file) => file.status === "needed").length +
    milestone.questions.filter((question) => question.status === "open").length
  );
}
