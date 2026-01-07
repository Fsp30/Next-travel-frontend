import 'server-only';
import { redirect } from 'next/navigation';
import { getCurrentUser } from './get-current-user';

export async function protectPage(redirectTo: string = '/login') {
  const user = await getCurrentUser();

  if (!user) {
    redirect(redirectTo);
  }

  return user;
}

export async function redirectIfAuthenticated(redirectTo: string = '/dashboard') {
  const user = await getCurrentUser();

  if (user) {
    redirect(redirectTo);
  }
}
