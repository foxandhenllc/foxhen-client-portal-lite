import type { ClientWorkspace } from "../../src/data/clientWorkspace.js";

export const fixtureWorkspace: ClientWorkspace = {
  repoName: "foxhen-client-portal-lite",
  title: "Fictional Client Portal Status",
  clientLabel: "Fictional Client Co.",
  workspaceLabel: "Public-safe launch workspace",
  serviceLine: "Client workspace starter",
  summary:
    "Fixture workspace for smoke-testing milestone exports, client decisions, file requests, questions, and closeout status.",
  repositoryUrl: "https://github.com/foxandhenllc/foxhen-client-portal-lite",
  liveDemoUrl: "https://foxhen-client-portal-lite.vercel.app",
  theme: {
    accent: "#253f6e",
    accent2: "#f4b860",
    ink: "#070d19",
    soft: "#edf4ff",
    warm: "#fff4df"
  },
  milestones: [
    {
      id: "milestone-shell",
      title: "Launch workspace shell",
      phase: "Milestone 1",
      owner: "Fox & Hen",
      dueWindow: "Week 1",
      approvalState: "in-review",
      progress: 65,
      summary: "Create the reusable portal layout and public-safe content system.",
      acceptanceCriteria: ["Navigation is clear", "All sample data is fictional"],
      files: [
        {
          id: "file-brand",
          label: "Brand asset placeholder",
          kind: "Brand asset",
          status: "placeholder",
          notes: "Use a generated sample instead of a client logo."
        }
      ],
      requests: [
        {
          id: "request-copy",
          label: "Homepage copy prompt",
          kind: "Copy",
          status: "needed",
          notes: "Placeholder request for client language."
        },
        {
          id: "request-access",
          label: "Publishing access placeholder",
          kind: "Access",
          status: "needed",
          notes: "Documents the access need without storing credentials."
        }
      ],
      questions: [
        {
          id: "question-priority",
          question: "Which approval should happen first?",
          owner: "Client",
          status: "open",
          answer: ""
        }
      ]
    },
    {
      id: "milestone-closeout",
      title: "Closeout package",
      phase: "Milestone 2",
      owner: "Client",
      dueWindow: "Week 2",
      approvalState: "approved",
      progress: 100,
      summary: "Prepare final links, decisions, and follow-up notes.",
      acceptanceCriteria: ["Final summary is generated", "Closeout checklist is visible"],
      files: [],
      requests: [],
      questions: []
    }
  ],
  decisions: [
    {
      id: "decision-placeholder-files",
      date: "2026-05-20",
      topic: "Public-safe files",
      owner: "Fox & Hen",
      status: "accepted",
      decision: "Use placeholder files only.",
      nextStep: "Replace with private assets in private forks."
    }
  ],
  closeoutChecklist: [
    {
      id: "closeout-summary",
      label: "Final status summary drafted",
      owner: "Fox & Hen",
      complete: true
    },
    {
      id: "closeout-assets",
      label: "Asset placeholders reconciled",
      owner: "Fox & Hen",
      complete: false
    },
    {
      id: "closeout-next",
      label: "Next engagement prompt ready",
      owner: "Client",
      complete: false
    }
  ],
  publicSafeRules: [
    "Use fictional client and owner names.",
    "Never store credentials, private URLs, or production screenshots."
  ]
};
