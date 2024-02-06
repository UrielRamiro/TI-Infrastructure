import { ZodError } from 'zod'

export function makeZodErrorMessage(zodError: ZodError): string {
  return zodError.issues
    .map(issue => `${issue.path.join('.')}: ${issue.message}`)
    .join('\n')
}
