/**
 * DOC-101: Identity document extraction validation (AJV).
 */
import Ajv2020Module from "ajv/dist/2020.js";
import addFormatsModule from "ajv-formats";
import type { ErrorObject, ValidateFunction } from "ajv";
import identityRouterSchema from "../../schemas/identity/identity-document.schema.json" with { type: "json" };
import passportSchema from "../../schemas/identity/passport.schema.json" with { type: "json" };
import drivingLicenceSchema from "../../schemas/identity/driving-licence.schema.json" with { type: "json" };
import utilityBillSchema from "../../schemas/identity/utility-bill.schema.json" with { type: "json" };

const Ajv2020 = Ajv2020Module as unknown as new (options?: object) => {
  addSchema: (schema: object) => void;
  compile: (schema: object) => (data: unknown) => boolean;
  errors?: ErrorObject[] | null;
};

const addFormats = addFormatsModule as unknown as (ajv: InstanceType<typeof Ajv2020>) => void;

const ajv = new Ajv2020({ allErrors: true, strict: false });

addFormats(ajv);

// Register document schemas once (by $id). Do not re-add when compiling the router.
ajv.addSchema(passportSchema);
ajv.addSchema(drivingLicenceSchema);
ajv.addSchema(utilityBillSchema);

const validate = ajv.compile(identityRouterSchema) as ValidateFunction;

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

/** Turn AJV instancePath (/fullName) into API field path (fullName). */
function toFieldPath(error: ErrorObject): string {
  if (error.keyword === "required") {
    const missing = error.params.missingProperty as string | undefined;
    const parent = error.instancePath.replace(/^\//, "").replace(/\//g, ".");
    if (missing) {
      return parent ? `${parent}.${missing}` : missing;
    }
  }

  const path = error.instancePath.replace(/^\//, "").replace(/\//g, ".");
  return path || "root";
}

function formatAjvErrors(errors: ErrorObject[]): ValidationFieldError[] {
  return errors.map((error) => ({
    field: toFieldPath(error),
    issue: error.keyword,
    message: error.message ?? "Validation failed",
  }));
}

function readDocumentType(payload: unknown): string | undefined {
  if (typeof payload === "object" && payload !== null && "documentType" in payload) {
    const value = (payload as { documentType: unknown }).documentType;
    return typeof value === "string" ? value : undefined;
  }
  return undefined;
}

export function validateExtraction(payload: unknown): ValidationResult {
  const documentType = readDocumentType(payload);
  const isValid = validate(payload);

  if (isValid) {
    return { valid: true, documentType };
  }

  return {
    valid: false,
    documentType,
    errors: formatAjvErrors(validate.errors ?? []),
  };
}
