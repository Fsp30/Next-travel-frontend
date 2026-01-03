import { z } from 'zod';
import { UserResponseSchema } from './user.response';

export const AuthResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
  expiresIn: z.number(),
  user: UserResponseSchema,
  isNewUser: z.boolean(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
