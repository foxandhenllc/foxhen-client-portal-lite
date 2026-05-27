export type ApprovalState = "not-started" | "in-review" | "changes-requested" | "approved";
export type PlaceholderStatus = "needed" | "received" | "placeholder";
export type QuestionStatus = "open" | "answered" | "deferred";
export type DecisionStatus = "proposed" | "accepted" | "needs-client" | "superseded";

export type PortalTheme = {
  accent: string;
  accent2: string;
  ink: string;
  soft: string;
  warm: string;
};

export type FilePlaceholder = {
  id: string;
  label: string;
  kind: string;
  status: PlaceholderStatus;
  notes: string;
};

export type ClientRequest = {
  id: string;
  label: string;
  kind: string;
  status: PlaceholderStatus;
  notes: string;
};

export type ClientQuestion = {
  id: string;
  question: string;
  owner: string;
  status: QuestionStatus;
  answer: string;
};

export type MilestoneTemplate = {
  id: string;
  title: string;
  phase: string;
  owner: string;
  dueWindow: string;
  approvalState: ApprovalState;
  progress: number;
  summary: string;
  acceptanceCriteria: string[];
  files: FilePlaceholder[];
  requests: ClientRequest[];
  questions: ClientQuestion[];
};

export type DecisionLogEntry = {
  id: string;
  date: string;
  topic: string;
  owner: string;
  status: DecisionStatus;
  decision: string;
  nextStep: string;
};

export type CloseoutChecklistItem = {
  id: string;
  label: string;
  owner: string;
  complete: boolean;
};

export type ClientWorkspace = {
  repoName: string;
  title: string;
  clientLabel: string;
  workspaceLabel: string;
  serviceLine: string;
  summary: string;
  repositoryUrl: string;
  liveDemoUrl: string;
  theme: PortalTheme;
  milestones: MilestoneTemplate[];
  decisions: DecisionLogEntry[];
  closeoutChecklist: CloseoutChecklistItem[];
  publicSafeRules: string[];
};

export const approvalOrder: ApprovalState[] = ["not-started", "in-review", "changes-requested", "approved"];

export const approvalLabels: Record<ApprovalState, string> = {
  "not-started": "Not started",
  "in-review": "In review",
  "changes-requested": "Changes requested",
  approved: "Approved"
};

export const placeholderLabels: Record<PlaceholderStatus, string> = {
  needed: "Needed",
  received: "Received",
  placeholder: "Placeholder"
};

export const questionLabels: Record<QuestionStatus, string> = {
  open: "Open",
  answered: "Answered",
  deferred: "Deferred"
};

export const decisionLabels: Record<DecisionStatus, string> = {
  proposed: "Proposed",
  accepted: "Accepted",
  "needs-client": "Needs client",
  superseded: "Superseded"
};

export const sampleWorkspace: ClientWorkspace = {
  repoName: "foxhen-client-portal-lite",
  title: "Client Portal Lite",
  clientLabel: "Fictional Client Co.",
  workspaceLabel: "Public-safe client workspace starter",
  serviceLine: "Client workspace operations",
  summary:
    "A reusable static portal starter for keeping milestones, approvals, decisions, file placeholders, client questions, and closeout tasks in one public-safe workspace.",
  repositoryUrl: "https://github.com/foxandhenllc/foxhen-client-portal-lite",
  liveDemoUrl: "https://freetoolsforpeople.com/client-portal-lite",
  theme: {
    accent: "#253f6e",
    accent2: "#f4b860",
    ink: "#070d19",
    soft: "#edf4ff",
    warm: "#fff4df"
  },
  milestones: [
    {
      id: "kickoff",
      title: "Kickoff workspace",
      phase: "Template 01",
      owner: "Fox & Hen",
      dueWindow: "Week 1",
      approvalState: "in-review",
      progress: 72,
      summary: "Set the operating rhythm, client roles, and placeholders before any private project material appears.",
      acceptanceCriteria: [
        "Client owner, approver, and update cadence are named with fictional labels.",
        "Required files are represented as placeholders, not production assets.",
        "Open questions are visible before the first milestone review."
      ],
      files: [
        {
          id: "kickoff-brief",
          label: "Project brief placeholder",
          kind: "Brief",
          status: "placeholder",
          notes: "Replace with a private brief only in a private fork."
        },
        {
          id: "brand-kit",
          label: "Brand kit placeholder",
          kind: "Brand asset",
          status: "needed",
          notes: "Tracks the need without uploading client marks."
        }
      ],
      requests: [
        {
          id: "request-voice",
          label: "Voice and tone confirmation",
          kind: "Copy",
          status: "needed",
          notes: "Ask for tone direction in client-safe language."
        }
      ],
      questions: [
        {
          id: "question-cadence",
          question: "Who signs off on weekly portal updates?",
          owner: "Client",
          status: "open",
          answer: ""
        }
      ]
    },
    {
      id: "milestone-review",
      title: "Milestone review",
      phase: "Template 02",
      owner: "Client",
      dueWindow: "Week 2",
      approvalState: "changes-requested",
      progress: 48,
      summary: "Collect client feedback, approval states, and outstanding requests without mixing in private artifacts.",
      acceptanceCriteria: [
        "Approval state is explicit.",
        "Client questions are answered or intentionally deferred.",
        "Files and requests show whether they are needed, received, or placeholders."
      ],
      files: [
        {
          id: "review-screenshot",
          label: "Review screenshot placeholder",
          kind: "Image",
          status: "placeholder",
          notes: "Use generated UI imagery in this public starter."
        }
      ],
      requests: [
        {
          id: "request-examples",
          label: "Reference examples",
          kind: "Reference",
          status: "received",
          notes: "Fictional examples are represented as a received placeholder."
        },
        {
          id: "request-approval",
          label: "Approval notes",
          kind: "Decision",
          status: "needed",
          notes: "Tracks missing signoff details."
        }
      ],
      questions: [
        {
          id: "question-scope",
          question: "Should the next update prioritize files or decision cleanup?",
          owner: "Fox & Hen",
          status: "answered",
          answer: "Prioritize decision cleanup before file replacement."
        }
      ]
    },
    {
      id: "delivery-handoff",
      title: "Delivery handoff",
      phase: "Template 03",
      owner: "Fox & Hen",
      dueWindow: "Week 3",
      approvalState: "not-started",
      progress: 24,
      summary: "Package exportable status reports, links, and next-step notes for an end-of-project handoff.",
      acceptanceCriteria: [
        "JSON and Markdown exports include current milestone state.",
        "Decision log captures what changed and what happens next.",
        "Closeout checklist is ready for the final client update."
      ],
      files: [
        {
          id: "handoff-links",
          label: "Final links placeholder",
          kind: "Links",
          status: "needed",
          notes: "Keep private URLs out of the public starter."
        }
      ],
      requests: [
        {
          id: "request-follow-up",
          label: "Follow-up offer preference",
          kind: "Closeout",
          status: "placeholder",
          notes: "Shows how a next-offer request would be tracked."
        }
      ],
      questions: [
        {
          id: "question-next",
          question: "What should the follow-up offer focus on?",
          owner: "Client",
          status: "deferred",
          answer: "Capture during closeout."
        }
      ]
    },
    {
      id: "closeout",
      title: "Closeout checklist",
      phase: "Template 04",
      owner: "Shared",
      dueWindow: "Final pass",
      approvalState: "approved",
      progress: 100,
      summary: "Confirm the workspace is reusable, documented, and safe to publish as a starter.",
      acceptanceCriteria: [
        "Public-safe mode is available.",
        "Customization docs explain how to replace fixture data.",
        "Closeout report can be exported before archiving."
      ],
      files: [],
      requests: [],
      questions: []
    }
  ],
  decisions: [
    {
      id: "decision-static",
      date: "2026-05-20",
      topic: "Architecture",
      owner: "Fox & Hen",
      status: "accepted",
      decision: "Keep the starter as a static React, TypeScript, and Vite app.",
      nextStep: "Use private forks for integrations that need a backend or auth."
    },
    {
      id: "decision-fixtures",
      date: "2026-05-20",
      topic: "Fixture content",
      owner: "Fox & Hen",
      status: "accepted",
      decision: "Use fictional client labels, placeholder files, and generated copy only.",
      nextStep: "Review docs/public-safe-data.md before adding new examples."
    },
    {
      id: "decision-exports",
      date: "2026-05-20",
      topic: "Status exports",
      owner: "Fox & Hen",
      status: "proposed",
      decision: "Provide both JSON and Markdown status reports from the current workspace state.",
      nextStep: "Use the exports as client update drafts in private forks."
    }
  ],
  closeoutChecklist: [
    {
      id: "closeout-report",
      label: "Generate latest Markdown status report",
      owner: "Fox & Hen",
      complete: true
    },
    {
      id: "closeout-files",
      label: "Confirm all public files are placeholders",
      owner: "Fox & Hen",
      complete: false
    },
    {
      id: "closeout-decisions",
      label: "Review decision log with client owner",
      owner: "Client",
      complete: false
    },
    {
      id: "closeout-next-offer",
      label: "Draft the next engagement prompt",
      owner: "Fox & Hen",
      complete: false
    }
  ],
  publicSafeRules: [
    "Use fictional clients, owners, dates, files, and decision examples.",
    "Keep credentials, private URLs, production screenshots, and customer exports out of this repo.",
    "Add integrations only in a private fork with an explicit data-handling review."
  ]
};
