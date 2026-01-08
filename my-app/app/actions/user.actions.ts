'use server';

import { revalidateTag } from 'next/cache';
import { apiFetch } from '../lib/fetcher';
import {
  CreateUserRequest,
  CreateUserRequestSchema,
  GetProfileRequest,
  GetProfileRequestSchema,
  UpdateProfileRequest,
  UpdateProfileRequestSchema,
  UserResponseSchema,
} from '../lib/schemas';
import { ZodError } from 'zod';

type ActionResult<T = undefined> =
  | (T extends undefined ? { success: true } : { success: true; data: T })
  | { success: false; error: string };

export async function createProfile(
  data: CreateUserRequest
): Promise<ActionResult<{ redirectTo: string }>> {
  try {
    const validated = CreateUserRequestSchema.parse(data);

    const response = await apiFetch<unknown>('/me', {
      method: 'POST',
      body: JSON.stringify(validated),
    });

    console.log('[createProfile] Response:', response);

    const userResult = UserResponseSchema.parse(response);

    console.log('[createProfile] Criação bem-sucedida:', userResult);

    revalidateTag('user', 'max');

    return {
      success: true,
      data: {
        redirectTo: '/dashboard',
      },
    };
  } catch (error) {
    console.log('[createProfile] Error:', error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Falha na criação de usuário',
    };
  }
}

export async function getProfile(
  data: GetProfileRequest
): Promise<ActionResult<{ retirectTo: string }>> {
  try {
    const validated = GetProfileRequestSchema.parse(data);

    const response = await apiFetch<unknown>('me', {
      method: 'GET',
      body: JSON.stringify(validated),
    });

    console.log('[getProfile] Response:', response);

    const userResult = UserResponseSchema.parse(response);

    console.log('[getProfile] Busca bem sucedida:', userResult);

    revalidateTag('user', 'max');

    return {
      success: true,
      data: {
        retirectTo: '/profile',
      },
    };
  } catch (error: unknown) {
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
      error:
        error instanceof Error ? error.message : 'Falha na busca de usuário',
    };
  }
}

export async function updateProfile(
  data: UpdateProfileRequest
): Promise<ActionResult<{ redirectTo: string }>> {
  try {
    const validated = UpdateProfileRequestSchema.parse(data);

    const response = await apiFetch<unknown>('/me', {
      method: 'PUT',
      body: JSON.stringify(validated),
    });

    console.log('[updateProfile] Response', response);

    const userResult = UserResponseSchema.parse(response);

    console.log('[updateProfile] Atualização bem sucedida:', userResult);

    revalidateTag('user', 'max');

    return {
      success: true,
      data: {
        redirectTo: '/profile',
      },
    };
  } catch (error: unknown) {
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
      error:
        error instanceof Error ? error.message : 'Falha na busca de usuário',
    };
  }
}
