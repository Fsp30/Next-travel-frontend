import z from 'zod';
import { UserResponseSchema } from '../schemas/api/user.response';

export type CurrentUser = z.infer<typeof UserResponseSchema> | null;
