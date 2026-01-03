import 'server-only';
import z from 'zod';
import { UserResponseSchema } from '../schemas';
import { cookies } from 'next/headers';
import { apiFetch } from '../fetcher';

export type CurrentUser = z.infer<typeof UserResponseSchema> | null;

export async function getCurrentUser(): Promise<CurrentUser> {
  try {
    const cookieStore = await cookies();
    const hasAuthCookie =
      cookieStore.has('access_token') || cookieStore.has('session');

    if (!hasAuthCookie) {
      return null;
    }

    const response = await apiFetch<unknown>('/users/me', {
      tags: ['me', 'user'],
      next: { revalidate: 3600 },
    });

    const user = UserResponseSchema.parse(response);

    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[getCurrentUser] Failed to fetch user:', error.message);
    }
    return null;
  }
}
