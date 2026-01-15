'use server';

import { cookies } from 'next/headers';

interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'lax' | 'none' | 'strict';
  path: string;
  domain?: string;
  maxAge?: number;
  expires?: Date;
}

export async function proxiCookies(setCookiesHeader: string) {
  const cookieStore = await cookies();

  const cookiesArray = setCookiesHeader.split(/,(?=\s*\w+=)/);

  for (const cookieString of cookiesArray) {
    const [nameValue, ...attributes] = cookieString.split(';');
    const [name, value] = nameValue.split('=');

    const options: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    };

    for (const attr of attributes) {
      const [key, val] = attr.trim().split('=');

      if (!val) continue;

      if (key.toLowerCase() === 'max-age') {
        options.maxAge = Number(val);
      }

      if (key.toLowerCase() === 'expires') {
        options.expires = new Date(val);
      }
    }

    cookieStore.set(name, value, options);
  }
}
