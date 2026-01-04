'use server';

import { updateTag } from 'next/cache';
import { cookies } from 'next/headers';
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

    const authResult = AuthResponseSchema.parse(response);

    if ('accessToken' in authResult && authResult.accessToken) {
      const cookieStore = await cookies();

      cookieStore.set('access_token', authResult.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: authResult.expiresIn,
        path: '/',
      });

      if ('refreshToken' in authResult && authResult.refreshToken) {
        cookieStore.set('refresh_token', authResult.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: authResult.expiresIn,
          path: '/',
        });
      }
    }

    updateTag('me');
    updateTag('user');

    return {
      success: true,
      data: { redirectTo: '/profile' },
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
    }).catch(() => {});
  } catch (error) {
    console.error('[logout] Error na chamada ao backend:', error);
  } finally {
    const cookieStore = await cookies();
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');

    updateTag('me');
    updateTag('user');

    redirect('/login');
  }
}

export async function refreshAccessToken(): Promise<ActionResult> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token');

    if (!refreshToken) {
      return { success: false, error: 'No refresh token' };
    }

    const response = await apiFetch<unknown>('/auth/refresh-token', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: refreshToken.value }),
      cache: 'no-store',
    });

    const authResult = AuthResponseSchema.parse(response);

    if ('accessToken' in authResult && authResult.accessToken) {
      cookieStore.set('access_token', authResult.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: authResult.expiresIn,
        path: '/',
      });
    }

    return { success: true };
  } catch (error) {
    console.error('[refreshAccessToken] Error:', error);

    const cookieStore = await cookies();
    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');

    return {
      success: false,
      error: 'Falha ao tentar refresh token',
    };
  }
}
