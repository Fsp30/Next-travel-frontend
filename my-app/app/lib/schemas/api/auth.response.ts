import { boolean, z } from 'zod';
import { UserResponseSchema } from './user.response';

export const AuthResponseSchema = z.object({
  data: z.object({
    user: UserResponseSchema,
    isNewUser: boolean().optional(),
  }),
  success: z.boolean(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
