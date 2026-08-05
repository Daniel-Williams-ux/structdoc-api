# Field definitions

**DOC-101:** Document each identity extraction field below.

Use this template per field:

```markdown
### fieldName

| Property | Value |
|----------|-------|
| Type | string |
| Required | yes |
| Nullable | no |
| Validation | minLength: 1 |
| Example | `"A1234567"` |
| Business reason | Why this field exists for HR / compliance workflow |
```

## Passport

_Add fields after you design `passport.schema.json`._

| Field | Type | Required | Validation | Example | Business Reason |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `documentType` | string | Yes | Must be a exact string constant (`passport`, `driving_licence`, `utility_bill`). | `"passport"` | Used by the system router to identify the document type and apply the correct sub-validation rules. |

| `fullName` | string | Yes | Non-empty string (minimum 1 character). | `"Daniel Williams"` | Used to identify the employee and match it against the HR onboarding records. |

| `documentNumber` | string | Yes | Non-empty string (minimum 1 character). | `"A1234567"` | The unique identification number of the document used to check for duplicates or fraud. |

| `confidenceScore` | number | Yes | Minimum: `0`, Maximum: `1`. | `0.91` | Indicates the machine learning model's statistical confidence in the accuracy of the extracted data. |

| `expiryDate` | string \| null | No | Must be an ISO-8601 date or null. | `"2031-10-15"` | Needed to verify that identity documents are currently valid. Nullable to prevent engine crashes on blurry uploads. |


## Driving licence

_Add fields after you design `driving-licence.schema.json`._

| Field | Type | Required | Validation | Example | Business Reason |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `documentType` | string | Yes | Must be a exact string constant (`passport`, `driving_licence`, `utility_bill`). | `"driving_licence"` | Used by the system router to identify the document type and apply the correct sub-validation rules. |

| `fullName` | string | Yes | Non-empty string (minimum 1 character). | `"Daniel Williams"` | Used to identify the employee and match it against the HR onboarding records. |

| `documentNumber` | string | Yes | Non-empty string (minimum 1 character). | `"A1234567"` | The unique identification number of the document used to check for duplicates or fraud. |

| `confidenceScore` | number | Yes | Minimum: `0`, Maximum: `1`. | `0.91` | Indicates the machine learning model's statistical confidence in the accuracy of the extracted data. |

| `contact_info` | object | Yes | Object containing address and postcode properties; additional properties are forbidden. | `{"address": "123 Main St", "postcode": "1001"}` | The address and postcode used to contact the employees |

| `expiryDate` | string \| null | No | Must be an ISO-8601 date or null. | `"2031-10-15"` | Needed to verify that identity documents are currently valid. Nullable to prevent engine crashes on blurry uploads. |


## Utility bill

_Add fields after you design `utility-bill.schema.json`._

| Field | Type | Required | Validation | Example | Business Reason |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `documentType` | string | Yes | Must be a exact string constant (`passport`, `driving_licence`, `utility_bill`). | `"utility_bill"` | Used by the system router to identify the document type and apply the correct sub-validation rules. |

| `fullName` | string | Yes | Non-empty string (minimum 1 character). | `"Daniel Williams"` | Used to identify the employee and match it against the HR onboarding records. |

| `documentNumber` | string | Yes | Non-empty string (minimum 1 character). | `"A1234567"` | The unique identification number of the document used to check for duplicates or fraud. |

| `confidenceScore` | number | Yes | Minimum: `0`, Maximum: `1`. | `0.91` | Indicates the machine learning model's statistical confidence in the accuracy of the extracted data. |

| `contact_info` | object | Yes | Object containing address and postcode properties; additional properties are forbidden. | `{"address": "123 Main St", "postcode": "1001"}` | The address and postcode used to contact the employees |

| `expiryDate` | string \| null | No | Must be an ISO-8601 date or null. | `"2031-10-15"` | Needed to verify that identity documents are currently valid. Nullable to prevent engine crashes on blurry uploads. |

| `lineItems` | array | Yes | Non-empty array (minimum item of 1). | `[{"description": "Gas Usage", "amount": 40.0}]` | Shows reprated key business items |