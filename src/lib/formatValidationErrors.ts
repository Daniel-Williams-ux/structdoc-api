import type { ErrorObject } from "ajv";
import type { ValidationFieldError } from "./validationTypes.js";

/** `/contactInfo/address` → `contactInfo.address` */
function jsonPath(instancePath: string): string {
  return instancePath.replace(/^\//, "").replace(/\//g, ".");
}

function toFieldPath(error: ErrorObject): string {
  if (error.keyword === "required" && error.params.missingProperty) {
    const parent = jsonPath(error.instancePath);
    const field = String(error.params.missingProperty);
    return parent ? `${parent}.${field}` : field;
  }
  return jsonPath(error.instancePath) || "root";
}

export function formatValidationErrors(errors: ErrorObject[]): ValidationFieldError[] {
  return errors.map((error) => ({
    field: toFieldPath(error),
    issue: error.keyword,
    message: error.message ?? "Validation failed",
  }));
}
