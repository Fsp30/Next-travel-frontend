import { z } from 'zod';

export const TravelInfoSchema = z.object({
  startDate: z.iso.datetime().optional(),
  endDate: z.iso.datetime().optional(),
  durationDays: z.number().optional(),
});

export const CacheSchema = z.object({
  cached: z.boolean(),
  cachedAt: z.iso.datetime().optional(),
  expiresAt: z.iso.datetime().optional(),
  source: z.enum(['redis', 'fresh']).optional(),
});

export const MetadataSchema = z.object({
  generatedAt: z.iso.datetime(),
  processingTimeMs: z.number().optional(),
  apiCallsCount: z.number().optional(),
});
