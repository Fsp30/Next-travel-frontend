'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { apiFetch } from '../lib/fetcher';
import {
  CreateUserRequest,
  CreateUserRequestSchema,
  FileSchema,
  GetProfileRequest,
  GetProfileRequestSchema,
  UpdateProfileRequest,
  UpdateProfileRequestSchema,
  UserResponseSchema,
} from '../lib/schemas';
import { put } from '@vercel/blob';
import { ZodError } from 'zod';
import { GlobalStorageResult } from './interface';

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

export async function uploadFile(
  formData: FormData
): Promise<ActionResult<{ retirectTo: string }>> {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      throw new Error('Nenhum arquivo encontrado');
    }

    const validatedFile = FileSchema.parse(file);

    const result: GlobalStorageResult = await put(validatedFile.name, file, {
      access: 'public',
    });

    if (!result) {
      throw new Error('Falha ao salvar arquivo');
    }

    revalidatePath('/');
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
        error instanceof Error ? error.message : 'Falha ao salvar o arquivo',
    };
  }
}
