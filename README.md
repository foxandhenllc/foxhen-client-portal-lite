# Client Portal Lite

[![Build](https://github.com/foxandhenllc/foxhen-client-portal-lite/actions/workflows/build.yml/badge.svg)](https://github.com/foxandhenllc/foxhen-client-portal-lite/actions/workflows/build.yml)

A reusable, public-safe React + TypeScript + Vite starter for lightweight client workspaces.

![Client Portal Lite screenshot](docs/demo-screenshot.png)

## What It Is

Client Portal Lite turns a generic project board into a client-facing workspace pattern: milestone templates, approval states, decision logs, file/request placeholders, client questions, closeout tasks, and exportable status reports. It is intentionally static and fixture-driven so the public repo stays safe to fork.

## Use Cases

- Package a service engagement into visible milestones and approval checkpoints.
- Track client questions, missing files, access requests, and scope decisions.
- Generate Markdown and JSON status reports before client updates.
- Create a private fork for a real client without starting from an empty app.
- Show a public portfolio demo without exposing customer data.

## Included Starter Features

- Domain-specific milestone templates with progress and approval states.
- Decision log for scope calls, architecture choices, and next steps.
- File and request placeholders that show what is needed without storing private assets.
- Client question queue with open, answered, and deferred states.
- Closeout checklist for final handoff and follow-up prompts.
- Public-safe mode toggle that labels exports as fixture-only or private-fork previews.
- Local browser persistence for workspace edits without a backend.
- Reset-to-sample plus workspace JSON import/export for portable local workspaces.
- Quick-add custom milestone form for lightweight client-specific planning.
- JSON and Markdown report exports generated from the current workspace state.
- Fixture-based smoke tests for report/export generation and local workspace helpers.

## Screenshots

The README screenshot lives at `docs/demo-screenshot.png`. Refresh it whenever the rendered UI changes.

## SEO / AIO Discoverability

**Plain-language answer:** Use this repo to create a static client workspace for milestones, approvals, decisions, file requests, closeout checks, and status exports.

**Who it helps:** freelancers, agencies, and consultants managing client delivery.

**Search intents covered:**

- client portal starter
- milestone approval dashboard
- client handoff portal
- static client workspace template

**Why this repo is useful:** It gives client delivery a clear structure without exposing private files or requiring production infrastructure.

## Local Usage

```bash
npm install
npm run dev
npm run test:smoke
npm run typecheck
npm run build
```

A copy-ready CI workflow lives at `docs/github-actions/build.yml.example`; move it to `.github/workflows/build.yml` after GitHub auth has the `workflow` scope.

## Client Customization

1. Copy this repo into a private fork for real client work.
2. Edit `src/data/clientWorkspace.ts` to replace fictional milestones, owners, files, requests, questions, decisions, and closeout tasks.
3. Adjust the theme values in the same fixture file.
4. Use `docs/client-brief-template.md` to plan client-specific content before editing code.
5. Keep backend/auth/integration work out of the public starter unless it belongs in a private fork.

## Local-Only Workspace Data

Edits made in the app are saved to `localStorage` in the current browser. Workspace JSON import/export uses local files only; no data is uploaded, synced, or sent to a backend.

## Documentation

- `docs/public-safe-data.md` — data rules for keeping the public repo fictional.
- `docs/customization-guide.md` — how to adapt the starter for a private workspace.
- `docs/client-brief-template.md` — fill-in brief for real client setup planning.
- `docs/workflow-template.md` — original workflow adaptation checklist.

## Project Structure

```text
src/components   Reusable React UI sections
src/data         Fictional workspace fixture and domain types
src/lib          Workspace metrics and state helpers
src/exporters    JSON and Markdown report generation
tests/fixtures   Smoke-test workspace fixture
```

## Open Source Readiness

- MIT licensed for reuse, remixing, and client-safe adaptation.
- GitHub Actions build workflow runs install, typecheck, tests when present, and production build.
- Contribution guide, roadmap, and issue templates are included for public collaboration.
- Public-safe data policy keeps examples fictional and reviewable.

## Validation

```bash
npm run typecheck --if-present
npm run test --if-present
npm run build --if-present
```

## Public-Safe Scope

This is a static frontend starter with fictional sample data. It includes no backend, auth, credentials, real client data, private files, external service calls, or production screenshots.

## Contributing

See `CONTRIBUTING.md` for public-safe contribution rules, local validation commands, and good first contribution ideas. Roadmap items live in `ROADMAP.md`.

## License

MIT — see `LICENSE`.
