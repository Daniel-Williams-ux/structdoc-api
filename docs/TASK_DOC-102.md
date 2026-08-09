# DOC-102 — Validate API route + data model

**Status:** Assigned  
**Assignee:** Daniel  
**Reviewer:** Lead (AI simulation)  
**Depends on:** DOC-101 (merged)

## Business context

Clients need an HTTP endpoint to validate extraction payloads before storage. The validator exists; now expose it as an API with the contract in `API_CONTRACT.md`.

## Deliverables

| Path | Description |
|------|-------------|
| `src/server.ts` or `src/index.ts` | HTTP server (Express or Node http) |
| `src/routes/validateExtractionRoute.ts` | `POST /v1/extractions/validate` handler |
| `docs/DATA_MODEL.md` | Firestore-style tables: `candidates`, `documents` |
| `docs/API_CONTRACT.md` | Finalize request/response (update draft) |
| `samples/api-valid-request.json` | Example API request body |
| `samples/api-invalid-request.json` | Example bad request |

## Acceptance criteria

- [ ] `POST /v1/extractions/validate` accepts `{ "payload": { ... } }`
- [ ] Success `200`: `{ "valid": true, "documentType": "..." }`
- [ ] Validation failure `400`: `{ "valid": false, "error": "validation_failed", "message": "...", "fields": [...] }`
- [ ] Malformed body (missing `payload`) returns `400` with clear error
- [ ] Handler calls `validateExtraction(payload)` — no duplicate AJV logic in route
- [ ] `DATA_MODEL.md` documents `candidates` + `documents` with PK/FK
- [ ] README updated with how to run the server

## Out of scope

- Database writes (DOC-103)
- OCR / real PDF parsing
- Authentication

## PR checklist

- [ ] Branch: `feature/doc-102-validate-api`
- [ ] Manual test: curl or sample request files
- [ ] PR explains validator layer vs HTTP layer

## Review rubric

| Area | Weight |
|------|--------|
| API contract match | 30% |
| Correct HTTP status codes | 20% |
| Reuses `validateExtraction` | 20% |
| DATA_MODEL.md quality | 20% |
| PR explanation | 10% |
