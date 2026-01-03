import z from 'zod';

export const UserResponseSchema = z.object({
  id: z.uuidv4(),
  email: z.email(),
  name: z.string(),
  profilePicture: z.url().optional().nullable(),
  createdAt: z.iso.datetime(),
  lastLogin: z.iso.datetime().optional().nullable(),
});
