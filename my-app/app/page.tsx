import { SearchTriggerButton } from '@/app/search/_components/search-trigger-button';
import { getCurrentUser } from '@/app/lib/auth';
import Link from 'next/link';

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {user && (
            <div className="mb-6">
              <p className="text-lg text-gray-700">
                Olá, <span className="font-semibold text-gray-900">{user.name}</span>! 👋
              </p>
              <div className="mt-2">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-800 font-medium"
                >
                  Ir para Dashboard →
                </Link>
              </div>
            </div>
          )}

          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-200">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            Planeje sua próxima aventura
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Descubra o destino
            <br />
            <span className="bg-linear-to-r text-zinc-700 bg-clip-text ">
              perfeito para você
            </span>
          </h1>

          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            Informações completas sobre destinos, clima, custos e recomendações
            personalizadas geradas por IA. Tudo em um só lugar.
          </p>

          <SearchTriggerButton variant="hero" />

          {/* Recursos em Destaque */}
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

      {!user && (
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-12 text-white shadow-2xl">
            <h2 className="text-3xl font-bold mb-4">
              Crie sua conta e salve suas viagens
            </h2>
            <p className="text-blue-100 mb-8">
              Acesse seu histórico de buscas, salve destinos favoritos e muito
              mais!
            </p>
            <a
              href="/login"
              className="inline-block bg-white text-blue-800 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Começar Agora
            </a>
          </div>
        </section>
      )}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          ✨ O que nossos usuários dizem
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TestimonialCard
            name="Maria Silva"
            text="Economizei 30% na minha viagem usando as estimativas de custo!"
          />
          <TestimonialCard
            name="Carlos Santos"
            text="O guia gerado por IA me ajudou a descobrir lugares incríveis!"
          />
          <TestimonialCard
            name="Ana Costa"
            text="A previsão do tempo foi super precisa, me ajudou a planejar melhor."
          />
        </div>
      </section>
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
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
}

function DestinationCard({
  city,
  country,
  image,
}: {
  city: string;
  country: string;
  image: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-200">
      <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
        {/* Placeholder para imagem */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl">🏖️</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-xl text-gray-900">{city}</h3>
        <p className="text-gray-700">{country}</p>
        <button className="mt-4 w-full bg-blue-100 text-blue-800 font-medium py-2 rounded-lg hover:bg-blue-200 transition-colors border border-blue-200">
          Explorar
        </button>
      </div>
    </div>
  );
}

function TestimonialCard({ name, text }: { name: string; text: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <div className="flex text-yellow-500">
            {'★★★★★'.split('').map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-700 italic">"{text}"</p>
    </div>
  );
}
