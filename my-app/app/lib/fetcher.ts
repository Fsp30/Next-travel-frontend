export async function apiFetch<T>(
  input: RequestInfo,
  init?: RequestInit & { tags?: string[] }
): Promise<T> {
  const res = await fetch(`${process.env.BACKEND_URL}${input}`, {
    ...init,
    credentials: 'include',
    cache: 'force-cache',
    next: { tags: init?.tags },
  });

  if (!res.ok) {
    throw new Error('API Error');
  }

  return res.json();
}
