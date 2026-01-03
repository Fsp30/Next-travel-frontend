import { z } from 'zod';

export const SearchHistoryItemSchema = z.object({
  id: z.string(),
  cityId: z.string(),
  cityName: z.string().optional(),

  travelStartDate: z.string().optional(),
  travelEndDate: z.string().optional(),

  searchDate: z.string(),
  isRecent: z.boolean(),
});

export const SearchHistoryResponseSchema = z.object({
  searches: z.array(SearchHistoryItemSchema),
  total: z.number(),
  userId: z.string(),
});

export type SearchHistoryResponse = z.infer<
  typeof SearchHistoryResponseSchema
>;