'use client';

import { Plane } from 'lucide-react';
import { useState } from 'react';

interface UserTriggerButtonProps {
  variant?: 'hero' | 'navbar' | 'compact';
  className?: string;
}

export function SearchTriggerButton({
  variant = 'hero',
  className = '',
}: UserTriggerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const variants = {
    hero: 'bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 font-semibold',
    navbar:
      'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors',
    compact:
      'text-blue-600 hover:text-blue-700 flex items-center gap-2 text-sm font-medium transition-colors',
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`${variants[variant]} ${className}`}
        aria-label="Atualizar perfil"
      >
        <Plane className={variant === 'hero' ? 'w-6 h-6' : 'w-5 h-5'} />
        <span>Planejar Viagem</span>
      </button>
      {/* 
      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
    </>
  );
}
