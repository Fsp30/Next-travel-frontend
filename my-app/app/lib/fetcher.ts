export async function apiFetch<T>(
  input: RequestInfo,
  init?: RequestInit & {
    tags?: string[];
    skipRetry?: boolean;
  }
): Promise<T> {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${input}`;

  const res = await fetch(url, {
    ...init,
    credentials: 'include',
    cache: init?.cache ?? 'force-cache',
    next: init?.next ?? { tags: init?.tags },
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (res.status === 401 && !init?.skipRetry) {
    console.log('[ApiFetch] Erro 401, tentando refresh token...');

    try {
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refresh`,
        {
          method: 'POST',
          credentials: 'include',
          cache: 'no-store',
        }
      );

      if (refreshRes.ok) {
        console.log('[ApiFetch] Token refreshed, refazendo a request...');
        return apiFetch<T>(input, { ...init, skipRetry: true });
      }

      console.log('[ApiFetch] Token refresh falhou');
    } catch (error) {
      console.error('[ApiFetch] Token refresh error:', error);
    }
  }

  if (!res.ok) {
    const errorText = await res.text().catch(() => 'Unknown error');
    console.error(`[ApiFetch] HTTP ${res.status}:`, errorText);

    throw new Error(errorText || `HTTP ${res.status}`);
  }

  return res.json();
}

export async function apiGet<T>(
  path: string,
  options?: { tags?: string[]; cache: RequestCache }
): Promise<T> {
  return apiFetch<T>(path, {
    method: 'GET',
    ...options,
  });
}

export async function apiPost<T, D = unknown>(
  path: string,
  data?: D,
  options?: { tags?: string[] }
): Promise<T> {
  return apiFetch<T>(path, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
    cache: 'no-store',
    ...options,
  });
}

export async function apiPut<T, D = unknown>(
  path: string,
  data: D,
  options?: { tags?: string[] }
): Promise<T> {
  return apiFetch<T>(path, {
    method: 'PUT',
    body: JSON.stringify(data),
    cache: 'no-store',
    ...options,
  });
}

export async function apiDelete<T>(
  path: string,
  options?: { tags?: string[] }
): Promise<T> {
  return apiFetch<T>(path, {
    method: 'DELETE',
    cache: 'no-store',
    ...options,
  });
}
