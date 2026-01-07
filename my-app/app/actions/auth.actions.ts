'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { apiFetch } from '@/app/lib/fetcher';

import {
  AuthenticateUserRequestSchema,
  type AuthenticateUserRequest,
} from '@/app/lib/schemas/api/authenticate-user.request';
import { AuthResponseSchema } from '@/app/lib/schemas/api/auth.response';

type ActionResult<T = undefined> =
  | (T extends undefined ? { success: true } : { success: true; data: T })
  | { success: false; error: string };

export async function authenticateUser(
  data: AuthenticateUserRequest
): Promise<ActionResult<{ redirectTo: string }>> {
  try {
    const validated = AuthenticateUserRequestSchema.parse(data);

    const response = await apiFetch<unknown>('/auth/google', {
      method: 'POST',
      body: JSON.stringify(validated),
      cache: 'no-store',
    });

    console.log('[authenticateUser] Response:', response);

    const authResult = AuthResponseSchema.parse(response);

    console.log('[authenticateUser] Autenticação bem-sucedida:', authResult);

    revalidateTag('user', 'max');
    revalidateTag('me', 'max');

    return {
      success: true,
      data: {
        redirectTo: '/profile',
      },
    };
  } catch (error) {
    console.error('[authenticateUser] Error:', error);

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Falha na autenticação',
    };
  }
}

export async function logout(): Promise<void> {
  try {
    await apiFetch('/auth/logout', {
      method: 'POST',
      cache: 'no-store',
    });
  } catch (error) {
    console.error('[logout] Error na chamada ao backend:', error);
  } finally {
    revalidateTag('user', 'max');
    revalidateTag('me', 'max');

    redirect('/login');
  }
}
