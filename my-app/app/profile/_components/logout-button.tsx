import { logout } from '@/app/actions';
import { LogOut } from 'lucide-react';

export default async function LogoutButton() {
  return (
    <form action={logout}>
      <div className="px-16 py-3 flex  text-sm border rounded-2xl hover:bg-red-400 transition-all cursor-pointer">
        <LogOut />
        <button type="submit">Sair</button>
      </div>
    </form>
  );
}
