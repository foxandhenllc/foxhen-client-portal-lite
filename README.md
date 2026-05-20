# Client Portal Lite

Public Fox & Hen working sample for a **client operations portal**.

![Demo screenshot](docs/demo-screenshot.png)

## Live Demo

- Demo: [https://foxhen-client-portal-lite.vercel.app](https://foxhen-client-portal-lite.vercel.app)
- Repository: [https://github.com/foxandhenllc/foxhen-client-portal-lite](https://github.com/foxandhenllc/foxhen-client-portal-lite)

## What This Demo Is

Client Portal Lite is a forkable React/Vite operating tool for teams that want to turn scattered approvals, files, milestone notes, and closeout tasks into a public-safe client command center. It is intentionally small, static, and public-safe so you can copy the pattern without inheriting a backend or vendor lock-in.

## Fully Working Behaviors

- Search, filter, and sort a domain-specific workflow board.
- Add a fictional item and edit owner, notes, priority, value, effort, and friction.
- Advance status and watch readiness metrics update in real time.
- Run a 24-hour sprint simulation to reduce friction on the highest-scoring work.
- Toggle QA gates, generate a handoff report, and download the board as JSON.

## Workflow Template

See [docs/workflow-template.md](docs/workflow-template.md) for the sample client workspace launch loop, adaptation checklist, and public-safe data rules.

## Suggested Forks

- Replace sample items with your real client milestones.
- Rename owners to match your delivery roles.
- Use checks as acceptance criteria before a milestone ships.
- Export the handoff JSON before each client update.

## Local Run

```bash
npm install
npm run dev
npm run build
```

## Public-Safe Scope

This is a static React/Vite demo with fictional sample data. It includes no production data, credentials, real contacts, copied customer work, backend, auth, or external service calls.
