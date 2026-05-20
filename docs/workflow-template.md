# Client Portal Lite Workflow Template

Use this template to fork the demo into a real internal tool while keeping the public repo fictional and credential-free.

## Audience

Freelancers, studios, and service teams that need a lightweight client workspace for approvals, client questions, file requests, decision history, and closeout.

## Operating Promise

Client Portal Lite turns scattered milestone notes into a visible client workspace with a status report export at the end of each review cycle.

## Sample Workflow

| Stage | Template area | What to customize |
| --- | --- | --- |
| 1 | Kickoff workspace | Replace fictional owner labels, cadence, and acceptance criteria in a private fork. |
| 2 | Milestone review | Map each client deliverable to an approval state and due window. |
| 3 | File/request placeholders | Track needed files, access, references, copy, and links without storing private materials. |
| 4 | Client questions | Capture open, answered, and deferred questions before every update. |
| 5 | Decision log | Record scope calls, client approvals, and next steps. |
| 6 | Closeout checklist | Confirm final report, files, decisions, and follow-up prompt before archiving. |

## Demo Metrics To Adapt

- Approved milestones
- Open client questions
- Pending file/request placeholders
- Decision log entries
- Closeout checklist completion
- Average milestone progress

## Fork Checklist

- Replace fixture data in `src/data/clientWorkspace.ts`.
- Keep public-safe mode available in private forks.
- Update report generation tests if export fields change.
- Refresh `docs/demo-screenshot.png` after UI changes.
- Run `npm run test:smoke`, `npm run typecheck`, and `npm run build` before publishing.

## Public-Safe Data Rules

- Use fictional people, accounts, tickets, deals, notes, and companies in the public repo.
- Do not add credentials, private URLs, customer exports, or production screenshots.
- Keep the app static unless you intentionally add integrations in a private fork.
