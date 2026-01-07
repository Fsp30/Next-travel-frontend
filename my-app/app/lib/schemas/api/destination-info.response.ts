import { z } from 'zod';

export const DestinationInfoResponseSchema = z.object({
  city: z.object({
    id: z.string(),
    name: z.string(),
  }),

  cityInfo: z.object({
    description: z.string(),
    summary: z.string().optional(),
    pageUrl: z.url().optional(),
    thumbnailUrl: z.url().optional(),
    extractedAt: z.string().optional(),
  }),

  textGenerated: z.string(),

  travelInfo: z
    .object({
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      durationDays: z.number().optional(),
    })
    .optional(),

  cache: z
    .object({
      cached: z.boolean(),
      cachedAt: z.string().optional(),
      expiresAt: z.string().optional(),
      source: z.enum(['redis', 'fresh']).optional(),
    })
    .optional(),
});

export type DestinationInfoResponse = z.infer<
  typeof DestinationInfoResponseSchema
>;
