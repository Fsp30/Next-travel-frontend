'use client';

import { logout } from '@/app/actions';
import { useState } from 'react';

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (!confirm('Deseja realmente sair?')) return;

    setIsLoading(true);
    try {
      await logout();
    } catch (error) {
      console.error('[Logout] Erro:', error);
      alert('Erro ao fazer logout');
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Saindo...' : 'Sair'}
    </button>
  );
}
