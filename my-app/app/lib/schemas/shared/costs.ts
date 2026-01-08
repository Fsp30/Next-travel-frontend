import z from 'zod';

export const CostRangeSchema = z.object({
  min: z.number(),
  max: z.number(),
});

export const TransportCostsSchema = z.object({
  bus: CostRangeSchema.optional(),
  flight: CostRangeSchema.optional(),
  currency: z.string().default('BRL'),
});

export const AccommodationCostsSchema = z.object({
  budget: CostRangeSchema.optional(),
  midRange: CostRangeSchema.optional(),
  luxury: CostRangeSchema.optional(),
  currency: z.string().default('BRL'),
});

export const CostsSchema = z.object({
  currency: z.string().default('BRL'),
  transport: TransportCostsSchema,
  accommodation: AccommodationCostsSchema,
  estimateDailyBudget: z
    .object({
      budget: z.number().optional(),
      midRange: z.number().optional(),
      luxury: z.number().optional(),
    })
    .optional(),
  totalEstimate: CostRangeSchema.optional(),
});

export const HotelSchema = z.object({
  hotelId: z.string(),
  name: z.string(),
  cityCode: z.string().optional(),
  rating: z.string().optional(),
  geoCode: z
    .object({
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    })
    .optional(),
});
