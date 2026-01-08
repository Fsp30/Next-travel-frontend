'use server';

import { revalidateTag } from 'next/cache';
import { apiFetch } from '../lib/fetcher';
import {
  DestinationInfoResponseSchema,
  GetDestinationRequest,
  GetDestinationRequestSchema,
} from '../lib/schemas';
import { ZodError } from 'zod';

type ActionResult<T = undefined> =
  | (T extends undefined ? { success: true } : { success: true; data: T })
  | { success: false; error: string };

export async function searchDestination(
  data: GetDestinationRequest
): Promise<ActionResult<{ destination: unknown; fromCache: boolean }>> {
  try {
    console.log('[searchDestination] Iniciando busca:', {
      city: data.cityName,
      state: data.state,
      origin: data.origin,
    });

    const validated = GetDestinationRequestSchema.parse(data);

    const response = await apiFetch<unknown>('/search', {
      method: 'POST',
      body: JSON.stringify(validated),
      cache: 'no-store',
    });

    console.log('[searchDestination] Response:', response);

    const searchResult = DestinationInfoResponseSchema.parse(response);

    const { data: destination } = searchResult;

    console.log('[searchDestination] Busca bem-sucedida:', {
      city: destination.city.name,
      cached: destination.cache?.cached ?? false,
      hasWeather: !!destination.weather,
      hasCosts: !!destination.costs,
      hotelsCount: destination.hotels?.length ?? 0,
    });

    revalidateTag('destinations', 'max');
    revalidateTag(`destination-${destination.city.slug}`, 'max');

    return {
      success: true,
      data: {
        destination,
        fromCache: destination.cache?.cached ?? false,
      },
    };
  } catch (error) {
    console.error('[searchDestination] Erro:', error);

    if (error instanceof Error) {
      const errorMessage = error.message.toLowerCase();

      if (
        errorMessage.includes('invalid') ||
        errorMessage.includes('validation')
      ) {
        return {
          success: false,
          error: 'Dados de busca inválidos, Verifique os campos preenchidos',
        };
      }
      if (
        errorMessage.includes('not found') ||
        errorMessage.includes('não encontrad')
      ) {
        return {
          success: false,
          error: 'Destino não encontrado. Verifique o nome da cidade e estado.',
        };
      }

      if (errorMessage.includes('api') || errorMessage.includes('external')) {
        return {
          success: false,
          error:
            'Erro ao buscar informações externas. Tente novamente em alguns instantes.',
        };
      }

      if (
        errorMessage.includes('timeout') ||
        errorMessage.includes('timed out')
      ) {
        return {
          success: false,
          error: 'A busca está demorando mais que o esperado. Tente novamente.',
        };
      }
      if (errorMessage.includes('fetch') || errorMessage.includes('network')) {
        return {
          success: false,
          error: 'Erro de conexão. Verifique sua internet e tente novamente.',
        };
      }

      if (error instanceof ZodError) {
        console.log(
          error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          }))
        );
      }

      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: 'Erro inesperado ao buscar destino. Tente novamente.',
    };
  }
}

export async function getPopularDestinations(): Promise<
  ActionResult<{
    cities: Array<{
      id: string;
      name: string;
      state: string;
      requestCount: number;
    }>;
  }>
> {
  try {
    console.log('[getPopularDestinations] Buscando cidades populares...');

    const response = await apiFetch<unknown>('/search/popular', {
      method: 'GET',
      next: {
        revalidate: 3600,
        tags: ['popular-destinations'],
      },
    });

    console.log('[getPopularDestinations] Response recebida');

    const result = response as {
      success: boolean;
      data: {
        cities: Array<{
          id: string;
          name: string;
          state: string;
          requestCount: number;
        }>;
      };
    };

    if (!result.success || !result.data) {
      throw new Error('Resposta do servidor inválida');
    }

    console.log('[getPopularDestinations] Sucesso:', {
      count: result.data.cities.length,
    });

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error('[getPopularDestinations] Erro:', error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Erro ao buscar cidades populares',
    };
  }
}

export async function revalidateDestination(
  citySlug: string
): Promise<ActionResult> {
  try {
    console.log('[revalidateDestination] Revalidando:', citySlug);

    revalidateTag(`destination-${citySlug}`, 'max');
    revalidateTag('destinations', 'max');

    return { success: true };
  } catch (error) {
    console.error('[revalidateDestination] Erro:', error);

    return {
      success: false,
      error: 'Erro ao revalidar cache',
    };
  }
}
