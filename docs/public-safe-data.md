# Public-Safe Data Guide

Client Portal Lite is designed to be safe as a public starter. The checked-in app should always use fictional workspace data, placeholder files, and generated copy.

## What Belongs In This Repo

- Fictional client labels, owners, dates, questions, and milestone examples.
- Placeholder file/request rows that show the shape of the workflow without attaching private material.
- Generic decision log entries that describe reusable operating choices.
- Static screenshots of the starter UI, not private project work.
- Documentation that teaches private-fork customization without requiring a backend.

## What Does Not Belong

- Production customer names, exports, contracts, invoices, support threads, analytics, or screenshots.
- Credentials, environment files, private URLs, vendor dashboards, or access instructions.
- Real client logos, brand kits, briefs, recordings, or unpublished strategy.
- Backend code, auth code, or calls to private services in the public starter.

## Public-Safe Mode

The in-app public-safe toggle changes the report context between a public fixture view and a private-fork preview. It does not reveal hidden data because the repository contains only fictional fixtures. In a private fork, keep the toggle as a visible reminder when exporting client updates.

## Fixture Review Checklist

- All names are fictional or generic roles.
- File entries are placeholders, not uploads or links to private assets.
- Requests describe the need without storing access details.
- Client questions are sample prompts or sanitized operating questions.
- Decision log entries explain reusable choices, not private negotiations.
- JSON and Markdown exports can be shared as starter examples.

## Before Publishing Changes

Run:

```bash
npm run test:smoke
npm run typecheck
npm run build
```

Then search any newly added text and assets for private project identifiers before pushing.
