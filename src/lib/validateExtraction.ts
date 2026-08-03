/**
 * DOC-101: Implement identity document extraction validation.
 *
 * Requirements:
 * - Load schemas from schemas/identity/
 * - Use AJV with ajv-formats
 * - Return { valid, errors? } with field-level detail
 */

export type ValidationFieldError = {
  field: string;
  issue: string;
  message: string;
};

export type ValidationResult = {
  valid: boolean;
  documentType?: string;
  errors?: ValidationFieldError[];
};

/**
 * Validate an extraction payload against identity document schemas.
 * TODO (DOC-101): Replace stub with AJV implementation.
 */
export function validateExtraction(_payload: unknown): ValidationResult {
  return {
    valid: false,
    errors: [
      {
        field: "_schema",
        issue: "not_implemented",
        message: "DOC-101: implement validateExtraction with AJV",
      },
    ],
  };
}
