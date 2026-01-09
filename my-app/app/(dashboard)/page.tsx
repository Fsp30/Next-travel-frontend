// app/(dashboard)/page.tsx
import { protectPage } from '@/app/lib/auth';
import { QuickActions } from './_components/quick-actions';
import { DashboardStats } from './_components/dashboard-stats';
import { RecentSearches } from './_components/recent-search';

export default async function DashboardPage() {
  await protectPage();

  return (
    <div className="space-y-8">
      <div className="bg-linear-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Bem-vindo de volta! 👋</h1>
        <p className="text-blue-100">
          Veja suas últimas buscas, destinos favoritos e planeje sua próxima
          viagem.
        </p>
        <button className="mt-6 bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
          Nova Busca
        </button>
      </div>
      <QuickActions />

      <DashboardStats />

      <RecentSearches />
    </div>
  );
}
