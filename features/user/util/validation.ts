// src/features/user/validation.ts
import { z } from "zod";
import {
  registrationSchema,
  type RegistrationStep1Form,
  type RegistrationStep2Form,
  type RegistrationStep3Form,
} from "@/features/user/types/registration";

export interface ValidationResult<T> {
  valid: boolean;
  errors: Partial<Record<keyof T, string>>;
}

export const validateForm = <T>(
  form: T,
  schema: z.ZodSchema<T>
): ValidationResult<T> => {
  try {
    schema.parse(form);
    return { valid: true, errors: {} };
  } catch (err) {
    if (err instanceof z.ZodError) {
      const { fieldErrors } = err.flatten();
      const errors = Object.fromEntries(
        Object.entries(fieldErrors).map(([key, messages]) => [
          key,
          messages?.[0] || "",
        ])
      ) as Partial<Record<keyof T, string>>;
      return { valid: false, errors };
    }
    return { valid: false, errors: {} };
  }
};

export const validateRegistrationStep1 = (
  form: RegistrationStep1Form
): ValidationResult<RegistrationStep1Form> => {
  return validateForm(form, registrationSchema.step1);
};

export const validateRegistrationStep2 = (
  form: RegistrationStep2Form
): ValidationResult<RegistrationStep2Form> => {
  return validateForm(form, registrationSchema.step2);
};

export const validateRegistrationStep3 = (
  form: RegistrationStep3Form
): ValidationResult<RegistrationStep3Form> => {
  return validateForm(form, registrationSchema.step3);
};
