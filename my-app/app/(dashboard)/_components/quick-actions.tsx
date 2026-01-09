// app/(dashboard)/_components/quick-actions.tsx
'use client';

import { Search, Heart, Calendar, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function QuickActions() {
  const router = useRouter();

  const actions = [
    {
      icon: Search,
      label: 'Buscar Destino',
      description: 'Encontre seu próximo destino',
      color: 'from-blue-500 to-cyan-500',
      href: '/search',
    },
    {
      icon: Heart,
      label: 'Favoritos',
      description: 'Seus destinos salvos',
      color: 'from-pink-500 to-rose-500',
      href: '/dashboard/favorites',
    },
    {
      icon: Calendar,
      label: 'Minhas Viagens',
      description: 'Planeje suas viagens',
      color: 'from-green-500 to-emerald-500',
      href: '/dashboard/trips',
    },
    {
      icon: MapPin,
      label: 'Destinos Visitados',
      description: 'Seu histórico',
      color: 'from-purple-500 to-violet-500',
      href: '/dashboard/history',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.label}
            onClick={() => router.push(action.href)}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all text-left group"
          >
            <div
              className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}
            >
              <Icon size={28} className="text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{action.label}</h3>
            <p className="text-sm text-gray-600">{action.description}</p>
          </button>
        );
      })}
    </div>
  );
}
