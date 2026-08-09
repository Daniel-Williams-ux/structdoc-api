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
