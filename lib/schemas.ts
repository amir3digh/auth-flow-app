import * as z from 'zod';

export const loginSchema = z.object({
  phone: z
    .string()
    .regex(/^09\d{9}$/, 'phone_validation_error')
});

export type LoginFormData = z.infer<typeof loginSchema>; 