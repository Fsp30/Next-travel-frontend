import z from 'zod';
import { CoordinatesSchema } from './coordinates';

export const CitySchema = z.object({
  id: z.uuid(),
  name: z.string(),
  state: z.string(),
  country: z.string(),
  slug: z.string(),
  coordinates: CoordinatesSchema.optional(),
  requestCount: z.number(),
  isPopular: z.boolean(),
});

export const CityInfoSchema = z.object({
  description: z.string(),
  summary: z.string().optional(),
  pageUrl: z.url().optional(),
  thumbnailUrl: z.url().optional(),
  extractedAt: z.iso.datetime().optional(),
});
