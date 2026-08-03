# API contract (draft)

**Status:** Draft for DOC-101 — implementation in DOC-102

## POST /v1/extractions/validate

Validate structured extraction output against identity document schemas.

### Request

```json
{
  "payload": { ... extracted document JSON ... }
}
```

### Success — 200

```json
{
  "valid": true,
  "documentType": "passport"
}
```

### Validation failure — 400

```json
{
  "valid": false,
  "error": "validation_failed",
  "message": "Extraction payload failed schema validation",
  "fields": [
    {
      "field": "documentNumber",
      "issue": "minLength",
      "message": "must NOT have fewer than 1 characters"
    }
  ]
}
```

### Notes

- Contract will be finalized in DOC-102 when the route is implemented.
- Fill in request/response field tables during DOC-101 based on your schemas.
