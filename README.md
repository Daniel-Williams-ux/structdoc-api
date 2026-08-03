# structdoc-api

Backend service for validating structured document extraction output using JSON Schema.

Built for interview practice and real-world patterns: schema design, validation, API contracts, data modeling, and documentation.

## Status

**Active ticket:** `DOC-101` — Identity document extraction schemas

See [docs/TASK_DOC-101.md](./docs/TASK_DOC-101.md).

## Project structure

```text
schemas/identity/     JSON Schema files ($ref, oneOf, per-document types)
docs/                 Field definitions, API contract, data model, ADRs
samples/              Valid and invalid extraction payloads
src/lib/              AJV validation utilities
src/scripts/          CLI helpers (validate samples)
```

## Setup

```bash
npm install
npm run typecheck
npm run validate:samples
```

## Workflow

1. Pick up a ticket from `docs/`
2. Branch: `feature/doc-101-identity-schemas`
3. Implement + document
4. Open PR with schema decisions explained
5. Lead review before merge

## License

Private — practice project.
