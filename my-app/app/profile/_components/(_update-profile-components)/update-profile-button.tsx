import { Pencil } from 'lucide-react';

export async function UpdateProfileButton() {
  return (
    <div className="px-16 py-3 flex text-sm border rounded-2xl hover:bg-blue-400 transition-all cursor-pointer">
      <Pencil className="mr-2 w-4 h-4" />
      <button type="button">Atualizar perfil</button>
    </div>
  );
}
