# Client Portal Lite

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
- JSON and Markdown report exports generated from the current workspace state.
- Fixture-based smoke test for report/export generation.

## Screenshots

The README screenshot lives at `docs/demo-screenshot.png`. Refresh it whenever the rendered UI changes.

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
3. Adjust the theme tokens in the same fixture file.
4. Use `docs/client-brief-template.md` to plan client-specific content before editing code.
5. Keep backend/auth/integration work out of the public starter unless it belongs in a private fork.

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

## Public-Safe Scope

This is a static frontend starter with fictional sample data. It includes no backend, auth, credentials, real client data, private files, external service calls, or production screenshots.

## License

MIT — see `LICENSE`.
