// app/(dashboard)/_components/dashboard-sidebar.tsx
'use client';

import { useState } from 'react';
import {
  Home,
  Search,
  Map,
  Calendar,
  Heart,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Search, label: 'Buscar Destinos', href: '/search' },
  { icon: Map, label: 'Meus Mapas', href: '/maps' },
  { icon: Calendar, label: 'Minhas Viagens', href: '/trips' },
  { icon: Heart, label: 'Favoritos', href: '/favorites' },
  { icon: Settings, label: 'Configurações', href: '/settings' },
  { icon: HelpCircle, label: 'Ajuda', href: '/help' },
];

export function DashboardSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`
        hidden md:flex flex-col h-[calc(100vh-80px)]
        bg-white border-r border-gray-200
        transition-all duration-300
        ${isCollapsed ? 'w-20' : 'w-64'}
        sticky top-0
      `}
    >
      {/* Botão de collapse */}
      <div className="p-4 border-b border-gray-200 flex justify-end">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <a
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-4 px-4 py-3 rounded-xl
                transition-all duration-200
                ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 border border-blue-100'
                    : 'hover:bg-gray-50 text-gray-700'
                }
              `}
            >
              <Icon
                size={22}
                className={isActive ? 'text-blue-500' : 'text-gray-500'}
              />
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </a>
          );
        })}
      </nav>

      {/* Upgrade Banner */}
      {!isCollapsed && (
        <div className="m-4 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
          <div className="mb-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-2">
              <span className="text-lg">⭐</span>
            </div>
            <h3 className="font-bold">Upgrade para Premium</h3>
            <p className="text-sm opacity-90">Acesso a recursos exclusivos</p>
          </div>
          <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors">
            Upgrade Agora
          </button>
        </div>
      )}

      {/* Versão colapsada do banner */}
      {isCollapsed && (
        <div className="m-4 p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white flex items-center justify-center">
          <span className="text-lg">⭐</span>
        </div>
      )}
    </aside>
  );
}
