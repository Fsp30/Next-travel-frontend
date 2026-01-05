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

  if (!res.ok) {
    let errorMessage = `HTTP ${res.status}`;

    try {
      const errorData = await res.json().catch(() => null);

      if (errorData) {
        if (errorData.error && typeof errorData.error === 'string') {
          errorMessage = errorData.error;
        } else if (errorData.message && typeof errorData.message === 'string') {
          errorMessage = errorData.message;
        } else if (typeof errorData === 'string') {
          errorMessage = errorData;
        }
      }
    } catch {
      try {
        const errorText = await res.text();
        if (errorText) {
          errorMessage = errorText;
        }
      } catch {}
    }

    console.error(`[ApiFetch] HTTP ${res.status}:`, errorMessage);
    throw new Error(errorMessage);
  }

  try {
    const data = await res.json();
    return data as T;
  } catch (error) {
    console.error('[ApiFetch] Erro ao parsear JSON:', error);
    throw new Error('Resposta inválida do servidor');
  }
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

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export async function apiFetchWithResponse<T>(
  input: RequestInfo,
  init?: RequestInit & {
    tags?: string[];
    skipRetry?: boolean;
  }
): Promise<ApiResponse<T>> {
  try {
    const response = await apiFetch<ApiResponse<T>>(input, init);
    return response;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido',
    };
  }
}
