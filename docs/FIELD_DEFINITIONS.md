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

| Field | Type | Required | Validation | Example | Business Reason |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `documentType` | string | Yes | Must be exactly `"passport"`. | `"passport"` | Routes the payload to passport validation rules in the identity router. |

| `fullName` | string | Yes | Non-empty string (minimum 1 character). | `"Daniel Williams"` | Used to identify the employee and match it against the HR onboarding records. |

| `documentNumber` | string | Yes | Non-empty string (minimum 1 character). | `"A1234567"` | The unique identification number of the document used to check for duplicates or fraud. |

| `confidenceScore` | number | Yes | Minimum: `0`, Maximum: `1`. | `0.91` | Indicates the machine learning model's statistical confidence in the accuracy of the extracted data. |

| `expiryDate` | string \| null | No | Must be an ISO-8601 date or null. | `"2031-10-15"` | Needed to verify that identity documents are currently valid. Nullable to prevent engine crashes on blurry uploads. |


## Driving licence

| Field | Type | Required | Validation | Example | Business Reason |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `documentType` | string | Yes | Must be exactly `"drivingLicence"`. | `"drivingLicence"` | Routes the payload to driving licence validation rules in the identity router. |

| `fullName` | string | Yes | Non-empty string (minimum 1 character). | `"Daniel Williams"` | Used to identify the employee and match it against the HR onboarding records. |

| `documentNumber` | string | Yes | Non-empty string (minimum 1 character). | `"A1234567"` | The unique identification number of the document used to check for duplicates or fraud. |

| `confidenceScore` | number | Yes | Minimum: `0`, Maximum: `1`. | `0.91` | Indicates the machine learning model's statistical confidence in the accuracy of the extracted data. |

| `contactInfo` | object | Yes | Object containing address and postcode properties; additional properties are forbidden. | `{"address": "123 Main St", "postcode": "1001"}` | Address on the licence for identity and residency verification. |

| Field | Type | Required | Validation | Example | Business Reason |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `documentType` | string | Yes | Must be exactly `"utility_bill"`. | `"utility_bill"` | Routes the payload to utility bill validation rules in the identity router. |

| `fullName` | string | Yes | Non-empty string (minimum 1 character). | `"Daniel Williams"` | Used to identify the employee and match it against the HR onboarding records. |

| `documentNumber` | string | Yes | Non-empty string (minimum 1 character). | `"A1234567"` | The unique identification number of the document used to check for duplicates or fraud. |

| `confidenceScore` | number | Yes | Minimum: `0`, Maximum: `1`. | `0.91` | Indicates the machine learning model's statistical confidence in the accuracy of the extracted data. |

| `contactInfo` | object | Yes | Object containing address and postcode properties; additional properties are forbidden. | `{"address": "123 Main St", "postcode": "1001"}` | Address on the bill for identity and residency verification. |

| `expiryDate` | string \| null | No | Must be an ISO-8601 date or null. | `"2031-10-15"` | Needed to verify that identity documents are currently valid. Nullable to prevent engine crashes on blurry uploads. |

| `lineItems` | array | Yes | Non-empty array (minimum item of 1). | `[{"description": "Gas Usage", "amount": 40.0}]` | Shows repeated key business items |