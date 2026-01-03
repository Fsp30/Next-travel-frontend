import { z } from 'zod';

export const AuthenticateUserFormSchema = z.object({
  googleToken: z.string().min(1),
});

export type AuthenticateUserForm = z.infer<typeof AuthenticateUserFormSchema>;
