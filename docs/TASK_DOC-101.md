# DOC-101 — Identity document extraction schemas

**Status:** Assigned  
**Assignee:** Daniel  
**Reviewer:** Lead (AI simulation)

## Business context

HR onboarding receives identity documents (passport, driving licence, utility bill) as PDFs. An extractor returns JSON. This service validates that JSON **before** it is stored or sent downstream.

## Deliverables

| Path | Description |
|------|-------------|
| `schemas/identity/identity-document.schema.json` | Root router (`oneOf` + `$ref`) |
| `schemas/identity/passport.schema.json` | Passport extraction shape |
| `schemas/identity/driving-licence.schema.json` | Driving licence shape |
| `schemas/identity/utility-bill.schema.json` | Utility bill shape |
| `docs/FIELD_DEFINITIONS.md` | Per-field docs with business reasons |
| `docs/API_CONTRACT.md` | Draft validate endpoint (no route yet) |
| `src/lib/validateExtraction.ts` | AJV validator with field-level errors |
| `samples/valid-passport.json` | Valid example |
| `samples/invalid-passport.json` | Invalid example |
| `samples/valid-utility-bill.json` | Valid example |

## Acceptance criteria

- [ ] Root schema uses `oneOf` with `$ref` to three document schemas in `$defs`
- [ ] Each document schema sets `additionalProperties: false`
- [ ] Passport **required:** `documentType`, `fullName`, `documentNumber`, `confidenceScore`
- [ ] Passport **optional:** `expiryDate` — nullable allowed (`type: ["string", "null"]`, `format: "date"`)
- [ ] `confidenceScore` is `number` with `minimum: 0`, `maximum: 1`
- [ ] `documentType` uses `const` or `enum` per document schema
- [ ] `FIELD_DEFINITIONS.md` includes: field, type, required, validation, example, business reason
- [ ] Validator returns field-level errors (not only `valid: false`)
- [ ] At least 3 sample payloads (2 valid, 1 invalid)
- [ ] `npm run validate:samples` passes for valid samples and fails for invalid

## Out of scope

- HTTP API route (DOC-102)
- Database / Firestore writes (DOC-102)
- OCR or real PDF parsing

## PR checklist

- [ ] Branch: `feature/doc-101-identity-schemas`
- [ ] PR description explains: required vs optional, `oneOf` choice, `additionalProperties`
- [ ] No unrelated files changed

## Review rubric

| Area | Weight |
|------|--------|
| JSON Schema correctness | 30% |
| Required/optional/nullable reasoning | 20% |
| Documentation | 20% |
| Validator implementation | 20% |
| PR explanation | 10% |
