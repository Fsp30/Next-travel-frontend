import z from 'zod';

export const UpdateProfileFormSchema = z.object({
  name: z
    .string()
    .min(2, 'O nome deve conter no minimo 2 caracteres')
    .max(100, 'O nome não deve ultrapassar 100 caracteres')
    .optional(),
  profilePicture: z.url().optional().nullable(),
});
