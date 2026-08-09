# Data model (draft)

**DOC-102:** Document how validated extraction data is stored long-term.

## Entities

### `candidates`

| Column | Type | Notes |
|--------|------|-------|
| `candidateId` | string | **Primary key** |
| `fullName` | string | |
| `email` | string | optional |
| `createdAt` | timestamp | |

### `documents`

| Column | Type | Notes |
|--------|------|-------|
| `documentId` | string | **Primary key** |
| `candidateId` | string | **Foreign key** → `candidates.candidateId` |
| `documentType` | string | `passport`, `drivingLicence`, `utility_bill` |
| `documentNumber` | string | searchable |
| `expiryDate` | date | optional |
| `confidenceScore` | number | 0–1 |
| `rawExtractedJson` | json | full extraction for audit |
| `validationStatus` | string | `valid`, `needs_review` |
| `createdAt` | timestamp | |

## Relationships

- One **candidate** → many **documents** (one-to-many)
- `documents.candidateId` references `candidates.candidateId`

## Notes

_Fill in: why store `rawExtractedJson` alongside columns, when `validationStatus` = `needs_review`._
