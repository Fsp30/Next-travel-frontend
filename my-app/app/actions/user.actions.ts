import { revalidateTag } from 'next/cache';
import { apiFetch } from '../lib/fetcher';
import {
  CreateUserRequest,
  CreateUserRequestSchema,
  UserResponseSchema,
} from '../lib/schemas';

type ActionResult<T = undefined> =
  | (T extends undefined ? { success: true } : { success: true; data: T })
  | { success: false; error: string };

export async function createUser(
  data: CreateUserRequest
): Promise<ActionResult<{ redirectTo: string }>> {
  try {
    const validated = CreateUserRequestSchema.parse(data);

    const response = await apiFetch<unknown>('/me', {
      method: 'POST',
      body: JSON.stringify(validated),
    });

    console.log('[createUser] Response:', response);

    const userResult = UserResponseSchema.parse(response);

    console.log('[createUser] Criação bem-sucedida:', userResult);

    revalidateTag('user', 'max');

    return {
      success: true,
      data: {
        redirectTo: '/dashboard',
      },
    };
  } catch (error) {
    console.log('[createUser] Error:', error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Falha na criação de usuário',
    };
  }
}
