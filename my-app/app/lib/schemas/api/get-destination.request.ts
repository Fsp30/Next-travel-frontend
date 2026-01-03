import { z } from 'zod';
import { CoordinatesSchema } from '../shared/coordinates';

export const GetDestinationRequestSchema = z.object({
  cityName: z.string(),
  state: z.string(),
  country: z.string(),
  origin: z.string(),

  originCoordinates: CoordinatesSchema.optional(),
  userId: z.string().uuid().optional(),

  startDate: z.string().optional(),
  endDate: z.string().optional(),

  forecastDays: z.number().optional(),
  targetMonth: z.number(),

  includeSummary: z.boolean().optional(),
  includeSearch: z.boolean().optional(),
  includeForecast: z.boolean().optional(),
  includeSeasonal: z.boolean().optional(),
});

export type GetDestinationRequest = z.infer<
  typeof GetDestinationRequestSchema
>;