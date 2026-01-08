import z from 'zod';

export const WeatherCurrentSchema = z.object({
  temperature: z.number().optional(),
  temperatureMin: z.number().optional(),
  temperatureMax: z.number().optional(),
  feelsLike: z.number().optional(),
  condition: z.string().optional(),
  description: z.string().optional(),
  humidity: z.number().optional(),
  windSpeed: z.number().optional(),
  pressure: z.number().optional(),
  cloudiness: z.number().optional(),
  visibility: z.number().optional(),
  timestamp: z.iso.datetime().optional(),
});

export const WeatherForecastSchema = z.object({
  date: z.iso.datetime(),
  temperature: z.number().optional(),
  temperatureMin: z.number().optional(),
  temperatureMax: z.number().optional(),
  condition: z.string().optional(),
  description: z.string().optional(),
  humidity: z.number().optional(),
  chanceOfRain: z.number().optional(),
});

export const WeatherSeasonalSchema = z.object({
  season: z.enum(['summer', 'autumn', 'winter', 'spring']),
  averageTemperature: z.number(),
  averageRainfall: z.number(),
  description: z.string(),
});

export const WeatherSchema = z.object({
  current: WeatherCurrentSchema.optional(),
  forecast: z.array(WeatherForecastSchema).optional(),
  seasonal: WeatherSeasonalSchema.optional(),
});
