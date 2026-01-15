import 'server-only';
import z, { ZodError } from 'zod';
import { AuthResponseSchema, UserResponseSchema } from '../schemas';
import { apiFetch } from '../fetcher';

type CurrentUser = z.infer<typeof UserResponseSchema> | null;

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const response = await apiFetch<unknown>('/users/me', {
      tags: ['me', 'user'],
      cache: 'no-store',
    });
    const validate = AuthResponseSchema.parse(response);

    return validate.data.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('[getCurrentUser] Falha ao buscar user:', error.message);
    }

    if (error instanceof ZodError) {
      console.log(
        error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }))
      );
    }
    return null;
  }
}

export async function isAutenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}

export async function requireAuth(): Promise<NonNullable<CurrentUser>> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error('UNAUTHORIZED');
  }

  return user;
}
