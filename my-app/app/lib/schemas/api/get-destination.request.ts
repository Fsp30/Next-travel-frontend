import { z } from 'zod';

export const GetDestinationRequestSchema = z
  .object({
    cityName: z.string().min(2).max(100).trim(),
    state: z.string().min(2).max(50).trim(),
    origin: z.string().min(2).max(100).trim(),

    country: z.string().min(2).max(50).default('Brasil'),

    startDate: z.coerce.date().optional(),
    endDate: z.coerce.date().optional(),

    forecastDays: z.number().min(1).max(7).default(5),
    targetMonth: z
      .number()
      .min(1)
      .max(12)
      .default(new Date().getMonth() + 1),

    includeForecast: z.boolean().default(true),
    includeSeasonal: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.endDate && !data.startDate) return false;
      return true;
    },
    { message: 'Data de término fornecida sem data de início' }
  )
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate > data.startDate;
      }
      return true;
    },
    { message: 'Data de término deve ser posterior à data de início' }
  );

export type GetDestinationRequest = z.infer<typeof GetDestinationRequestSchema>;
