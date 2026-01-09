import '../index.css';
import { SearchTriggerButton } from '@/app/search/_components/search-trigger-button';
import { getCurrentUser } from '@/app/lib/auth';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {user && (
            <div className="mb-6">
              <p className="text-lg text-gray-600">
                Olá, <span className="font-semibold">{user.name}</span>! 👋
              </p>
            </div>
          )}

          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Planeje sua próxima aventura
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Descubra o destino
            <br />
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              perfeito para você
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Informações completas sobre destinos, clima, custos e recomendações
            personalizadas geradas por IA. Tudo em um só lugar.
          </p>

          <SearchTriggerButton variant="hero" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <FeatureCard
              icon="🌤️"
              title="Previsão do Tempo"
              description="Clima atual e previsão para os próximos dias"
            />
            <FeatureCard
              icon="💰"
              title="Estimativa de Custos"
              description="Valores de transporte, hospedagem e alimentação"
            />
            <FeatureCard
              icon="🤖"
              title="Guia Personalizado"
              description="Recomendações geradas por inteligência artificial"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 bg-white/50 rounded-3xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          🔥 Destinos Populares
        </h2>
        <p className="text-center text-gray-600">
          Em breve: lista de destinos mais buscados
        </p>
      </section>

      {!user && (
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Crie sua conta e salve suas viagens
            </h2>
            <p className="text-blue-100 mb-8">
              Acesse seu histórico de buscas, salve destinos favoritos e muito
              mais!
            </p>
            <a
              href="/login"
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Começar Agora
            </a>
          </div>
        </section>
      )}
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
