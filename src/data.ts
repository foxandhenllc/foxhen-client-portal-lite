export type ItemStatus = "backlog" | "active" | "blocked" | "ready" | "done";

export type WorkItem = {
  id: string;
  title: string;
  category: string;
  owner: string;
  status: ItemStatus;
  priority: number;
  effort: number;
  friction: number;
  value: number;
  due: string;
  notes: string;
};

export type QualityCheck = {
  id: string;
  label: string;
  passed: boolean;
  weight: number;
};

export const sample: {
  repoName: string;
  title: string;
  subtitle: string;
  serviceLine: string;
  description: string;
  repositoryUrl: string;
  liveDemoUrl: string;
  theme: { accent: string; accent2: string; ink: string; soft: string; warm: string };
  items: WorkItem[];
  checks: QualityCheck[];
  deliverables: string[];
} = {
  "repoName": "foxhen-client-portal-lite",
  "title": "Client Portal Lite",
  "subtitle": "client workspace",
  "serviceLine": "Client operations portal",
  "description": "Operational command center for intake, milestones, approvals, files, and closeout.",
  "repositoryUrl": "https://github.com/foxandhenllc/foxhen-client-portal-lite",
  "liveDemoUrl": "https://foxhen-client-portal-lite.vercel.app",
  "theme": {
    "accent": "#253f6e",
    "accent2": "#f4b860",
    "ink": "#070d19",
    "soft": "#edf4ff",
    "warm": "#fff4df"
  },
  "items": [
    {
      "id": "cli-1",
      "title": "Kickoff packet",
      "category": "Intake",
      "owner": "Chris",
      "status": "active",
      "priority": 5,
      "effort": 2,
      "friction": 1,
      "value": 5,
      "due": "Today",
      "notes": "Sample client workspace work item for client operations portal."
    },
    {
      "id": "cli-2",
      "title": "Design approval",
      "category": "Build",
      "owner": "Fox & Hen",
      "status": "backlog",
      "priority": 4,
      "effort": 4,
      "friction": 2,
      "value": 4,
      "due": "24h",
      "notes": "Sample client workspace work item for client operations portal."
    },
    {
      "id": "cli-3",
      "title": "Asset handoff",
      "category": "Review",
      "owner": "Buyer",
      "status": "blocked",
      "priority": 3,
      "effort": 3,
      "friction": 4,
      "value": 4,
      "due": "48h",
      "notes": "Sample client workspace work item for client operations portal."
    },
    {
      "id": "cli-4",
      "title": "Invoice memo",
      "category": "Export",
      "owner": "Automation",
      "status": "ready",
      "priority": 4,
      "effort": 2,
      "friction": 2,
      "value": 3,
      "due": "This week",
      "notes": "Sample client workspace work item for client operations portal."
    },
    {
      "id": "cli-5",
      "title": "Launch note",
      "category": "Intake",
      "owner": "QA",
      "status": "backlog",
      "priority": 2,
      "effort": 1,
      "friction": 1,
      "value": 3,
      "due": "Waiting",
      "notes": "Sample client workspace work item for client operations portal."
    },
    {
      "id": "cli-6",
      "title": "Follow-up offer",
      "category": "Build",
      "owner": "Chris",
      "status": "done",
      "priority": 5,
      "effort": 5,
      "friction": 3,
      "value": 5,
      "due": "Next pass",
      "notes": "Sample client workspace work item for client operations portal."
    }
  ],
  "checks": [
      {
          "id": "owner",
          "label": "Client owner and approver are clear",
          "passed": true,
          "weight": 18
      },
      {
          "id": "criteria",
          "label": "Milestone acceptance criteria are written",
          "passed": true,
          "weight": 18
      },
      {
          "id": "assets",
          "label": "Missing assets/access are documented",
          "passed": false,
          "weight": 14
      },
      {
          "id": "handoff",
          "label": "Client update package is generated",
          "passed": false,
          "weight": 16
      },
      {
          "id": "reuse",
          "label": "Reusable portal setup note exists",
          "passed": true,
          "weight": 12
      }
  ],
  "deliverables": [
      "Client milestone board",
      "Approval and asset queue",
      "Readiness checklist",
      "Exportable client update"
  ]
};
