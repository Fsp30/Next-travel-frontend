import { z } from 'zod';

export const AuthenticateUserRequestSchema = z.object({
  googleToken: z.string().min(1),
});

export type AuthenticateUserRequest = z.infer<
  typeof AuthenticateUserRequestSchema
>;
