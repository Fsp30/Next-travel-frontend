import { z } from 'zod';
import { CoordinatesSchema } from '../shared/coordinates';

export const GetDestinationFormSchema = z.object({
  cityName: z.string().min(2).max(100),
  state: z.string().min(3).max(50),
  country: z.string().default('Brasil'),

  origin: z.string().min(2).max(100),
  originCoordinates: CoordinatesSchema.optional(),

  startDate: z.string().optional(),
  endDate: z.string().optional(),

  forecastDays: z.number().min(1).max(7).optional(),
  targetMonth: z.number().min(1).max(12),

  includeSummary: z.boolean().optional(),
  includeSearch: z.boolean().optional(),
  includeForecast: z.boolean().optional(),
  includeSeasonal: z.boolean().optional(),
});

export type GetDestinationForm = z.infer<typeof GetDestinationFormSchema>;
