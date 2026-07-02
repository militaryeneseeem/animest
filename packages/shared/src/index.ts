import { z } from 'zod';

export const spoilerLevels = ['0', '1', '2', '3', 'FULL'] as const;
export type SpoilerLevel = (typeof spoilerLevels)[number];

export const animeFormats = ['TV', 'MOVIE', 'OVA', 'ONA', 'SPECIAL', 'MUSIC'] as const;
export type AnimeFormat = (typeof animeFormats)[number];

export const recommendationRequestSchema = z.object({
  query: z.string().min(2).max(800),
  locale: z.string().min(2).max(32).default('tr'),
  spoilerLevel: z.enum(spoilerLevels).default('0'),
  limit: z.number().int().min(1).max(50).default(12),
});

export type RecommendationRequest = z.infer<typeof recommendationRequestSchema>;

export interface ApiEnvelope<T> {
  data: T;
  meta: { requestId: string; generatedAt: string };
}

export function envelope<T>(requestId: string, data: T): ApiEnvelope<T> {
  return { data, meta: { requestId, generatedAt: new Date().toISOString() } };
}
