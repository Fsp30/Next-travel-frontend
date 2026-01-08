import { z } from 'zod';
import { UpdateProfileFormSchema } from '../ui/update-profile.form';
import { CreateProfileFormSchema } from '../ui/create-profile.form';

export const CreateUserRequestSchema = CreateProfileFormSchema.extend({
  googleId: z.string().min(1, 'Google ID é necessário').trim(),
});

export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>;

export const GetProfileRequestSchema = z
  .object({
    id: z.uuidv4('Formato de Id Inválido').optional(),

    email: z.email('Formato de email Inválido').toLowerCase().trim().optional(),

    googleId: z.string().min(1).trim().optional(),
  })
  .refine((data) => data.id || data.email || data.googleId, {
    message: 'Uma forma de identificação deve ser fornecida',
    path: ['_form'],
  });

export type GetProfileRequest = z.infer<typeof GetProfileRequestSchema>;

export const UpdateProfileRequestSchema = UpdateProfileFormSchema.extend({
  userId: z.uuidv4('Formato de Id Inválido'),
});

export type UpdateProfileRequest = z.infer<typeof UpdateProfileFormSchema>;
