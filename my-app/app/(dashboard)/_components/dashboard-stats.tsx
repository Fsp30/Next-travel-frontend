'use client';

import { MapPin, Calendar, Heart, Users } from 'lucide-react';

export function DashboardStats() {
  const stats = [
    {
      icon: MapPin,
      value: '12',
      label: 'Destinos Visitados',
      change: '+3 este ano',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Calendar,
      value: '4',
      label: 'Viagens Planejadas',
      change: 'Próxima: Dezembro',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Heart,
      value: '24',
      label: 'Destinos Favoritos',
      change: '+5 recentemente',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
    },
    {
      icon: Users,
      value: '8',
      label: 'Amigos Viajando',
      change: '3 viajando agora',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div
              className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mb-4`}
            >
              <Icon size={24} className={stat.color} />
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">
              {stat.value}
            </p>
            <p className="font-medium text-gray-700 mb-1">{stat.label}</p>
            <p className="text-sm text-gray-500">{stat.change}</p>
          </div>
        );
      })}
    </div>
  );
}
