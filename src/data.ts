export const sample = {
  "repoName": "foxhen-client-portal-lite",
  "title": "Client Portal Lite",
  "subtitle": "A polished service portal sample",
  "serviceLine": "Client operations portal",
  "heroTitle": "A clean command center for small-service engagements.",
  "heroCopy": "A fictional client workspace with intake status, milestones, approvals, files, and payment-readiness signals in one public-safe demo.",
  "primaryAction": "Review portal flow",
  "secondaryAction": "Package handoff",
  "repositoryUrl": "https://github.com/foxandhenllc/foxhen-client-portal-lite",
  "liveDemoUrl": "https://foxhen-client-portal-lite.vercel.app",
  "theme": {
    "accent": "#244b5a",
    "accent2": "#d99058",
    "ink": "#07121f",
    "soft": "#eaf4ef",
    "warm": "#f8efe4",
    "surface": "#fffaf4",
    "muted": "#5c667a",
    "border": "rgba(7, 18, 31, 0.12)"
  },
  "metrics": [
    {
      "label": "Open approvals",
      "value": "3",
      "note": "2 need owner input"
    },
    {
      "label": "Milestone clarity",
      "value": "94%",
      "note": "+28 pts"
    },
    {
      "label": "Handoff assets",
      "value": "12",
      "note": "ready to package"
    }
  ],
  "stages": [
    {
      "label": "Intake",
      "detail": "Scope answers are normalized into a job card with budget, dates, stakeholders, and open questions.",
      "status": "ready",
      "owner": "F&H",
      "index": 1
    },
    {
      "label": "Milestones",
      "detail": "The engagement is split into visible checkpoints with owner, proof, and acceptance state.",
      "status": "active",
      "owner": "Studio",
      "index": 2
    },
    {
      "label": "Approvals",
      "detail": "Pending decisions are separated from delivery work so the client knows exactly what to review.",
      "status": "waiting",
      "owner": "Client",
      "index": 3
    },
    {
      "label": "Payment",
      "detail": "Mock invoice readiness, receipt status, and delivery notes are reconciled before closeout.",
      "status": "queued",
      "owner": "Ops",
      "index": 4
    }
  ],
  "workItems": [
    {
      "title": "Welcome packet",
      "detail": "Add scope summary and kickoff checklist",
      "status": "ready"
    },
    {
      "title": "Homepage polish",
      "detail": "Mark first milestone as reviewable",
      "status": "active"
    },
    {
      "title": "Asset folder",
      "detail": "Replace loose links with grouped deliverables",
      "status": "waiting"
    },
    {
      "title": "Invoice memo",
      "detail": "Preview closeout and next-step copy",
      "status": "queued"
    }
  ],
  "deliverables": [
    {
      "title": "Portal map",
      "detail": "Clear page structure, navigation states, and stakeholder view rules."
    },
    {
      "title": "Approval tracker",
      "detail": "A compact queue for decisions that otherwise disappear in email threads."
    },
    {
      "title": "Closeout pack",
      "detail": "Receipt notes, files, and next recommended engagement packaged for handoff."
    }
  ],
  "timeline": [
    {
      "time": "0-4 hrs",
      "detail": "Normalize intake and define portal architecture"
    },
    {
      "time": "4-16 hrs",
      "detail": "Build dashboard states and approval queue"
    },
    {
      "time": "16-24 hrs",
      "detail": "QA mobile flow and package handoff"
    }
  ],
  "proof": [
    "Maps directly to a paid portal/dashboard cleanup offer.",
    "Shows product management judgment from kickoff to closeout.",
    "Uses fictional data only and avoids any real customer artifacts."
  ]
} as const;

export type StageStatus = "ready" | "active" | "waiting" | "queued";
export type DemoStage = (typeof sample.stages)[number];
export type WorkItem = (typeof sample.workItems)[number];
