/**
 * DOC-101: Identity document extraction validation (AJV).
 */
import { Ajv2020 } from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import identityRouterSchema from "../../schemas/identity/identity-document.schema.json" with { type: "json" };
import passportSchema from "../../schemas/identity/passport.schema.json" with { type: "json" };
import drivingLicenceSchema from "../../schemas/identity/driving-licence.schema.json" with { type: "json" };
import utilityBillSchema from "../../schemas/identity/utility-bill.schema.json" with { type: "json" };
import { formatValidationErrors } from "./formatValidationErrors.js";
import type { ValidationResult } from "./validationTypes.js";

export type { ValidationFieldError, ValidationResult } from "./validationTypes.js";

const ajv = new Ajv2020({ allErrors: true, strict: false });

// @ts-expect-error ajv-formats default export is the plugin function (NodeNext ESM typing)
addFormats(ajv);

ajv.addSchema(passportSchema);
ajv.addSchema(drivingLicenceSchema);
ajv.addSchema(utilityBillSchema);

const validate = ajv.compile(identityRouterSchema);

function getDocumentType(payload: unknown): string | undefined {
  if (typeof payload !== "object" || payload === null) return undefined;
  const { documentType } = payload as { documentType?: unknown };
  return typeof documentType === "string" ? documentType : undefined;
}

export function validateExtraction(payload: unknown): ValidationResult {
  const documentType = getDocumentType(payload);

  if (validate(payload)) {
    return { valid: true, documentType };
  }

  return {
    valid: false,
    documentType,
    errors: formatValidationErrors(validate.errors ?? []),
  };
}
