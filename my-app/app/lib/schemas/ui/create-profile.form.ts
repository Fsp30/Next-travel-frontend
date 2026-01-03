import z from 'zod';

export const CreateProfileFormSchema = z.object({
  email: z.email('Formato de email Inválido').toLowerCase().trim(),

  name: z
    .string()
    .min(2, 'O nome deve conter no minimo 2 caracteres')
    .max(100, 'O nome não deve ultrapassar 100 caracteres')
    .trim(),

  profilePicture: z
    .url('URL de imagem de perfil inválida')
    .optional()
    .nullable(),
});
