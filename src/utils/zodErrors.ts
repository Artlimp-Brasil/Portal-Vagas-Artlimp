import { z } from "zod";
import type { ApplicationFormErrors, ApplicationFormState } from "@/types/applicationForm";

export const getZodErrors = (
  result: z.SafeParseReturnType<unknown, unknown>
): ApplicationFormErrors => {
  if (result.success) return {};

  return result.error.issues.reduce((acc, issue) => {
    const field = issue.path[0] as keyof ApplicationFormState;
    acc[field] = issue.message;
    return acc;
  }, {} as ApplicationFormErrors);
};