import { z } from 'zod';
import {
  CacheSchema,
  CityInfoSchema,
  CitySchema,
  CostsSchema,
  HotelSchema,
  MetadataSchema,
  TravelInfoSchema,
  WeatherSchema,
} from '../shared';

export const DestinationInfoResponseSchema = z.object({
  data: z.object({
    city: CitySchema,
    cityInfo: CityInfoSchema,
    textGenerated: z.string(),

    weather: WeatherSchema.optional(),
    costs: CostsSchema.optional(),
    hotels: z.array(HotelSchema).optional().default([]),

    travelInfo: TravelInfoSchema.optional(),
    cache: CacheSchema.optional(),
    metadata: MetadataSchema.optional(),
  }),
  success: z.boolean(),
});

export type DestinationInfoResponse = z.infer<
  typeof DestinationInfoResponseSchema
>;
