import z from 'zod';

const MAX_FILE_SIZE = 4.5 * 1024 * 1024;

export const FileSchema = z.object({
  file: z.instanceof(File).refine((file) => file.size >= MAX_FILE_SIZE, {
    error: 'O tamanho deve ser igual ou inferior a 4.5MB',
  }),
  name: z.string().min(1, 'O arquivo deve conter um nome'),
});
