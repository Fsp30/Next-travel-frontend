import { redirect } from 'next/navigation';
import { searchDestination } from '@/app/actions/search.actions';
import { DestinationHeader } from './[slug]/_components/destination-header';
import { DestinationOverview } from './[slug]/_components/destination-overview';
import { WeatherSection } from './[slug]/_components/weather-section';
import { CostsSection } from './[slug]/_components/costs-section';
import { HotelsSection } from './[slug]/_components/hotels-section';
import { DestinationMetadata } from './[slug]/_components/destination-metadata';
import { ErrorState } from './[slug]/_components/error-state';
import { AIGuideSection } from './[slug]/_components/ai-guide-section';
import { Plane } from 'lucide-react';

interface SearchPageProps {
  searchParams: Promise<{
    city?: string;
    state?: string;
    origin?: string;
    startDate?: string;
    endDate?: string;
  }>;
}

export default async function SearchPage(props: SearchPageProps) {
  const searchParams = await props.searchParams;

  if (!searchParams.city || !searchParams.state) {
    console.log('Missing query params, redirecting to home');
    redirect('/');
  }

  console.log('Search page received:', searchParams);

  try {
    const getTargetMonth = (startDate?: string): number => {
      if (startDate) {
        return new Date(startDate).getMonth() + 1;
      }
      return new Date().getMonth() + 1;
    };

    const result = await searchDestination({
      cityName: searchParams.city,
      state: searchParams.state,
      origin: searchParams.origin || 'São Paulo',
      country: 'Brasil',
      forecastDays: 5,
      targetMonth: getTargetMonth(searchParams.startDate),
      includeForecast: true,
      includeSeasonal: true,
      startDate: searchParams.startDate
        ? new Date(searchParams.startDate)
        : undefined,
      endDate: searchParams.endDate
        ? new Date(searchParams.endDate)
        : undefined,
    });

    if (!result.success) {
      console.error('Search failed:', result.error);
      return (
        <ErrorState
          title="Erro na busca"
          message={result.error}
          retryLink="/"
          retryText="Voltar para busca"
        />
      );
    }

    const { destination, fromCache } = result.data;

    const travelInfo =
      searchParams.startDate && searchParams.endDate
        ? {
            startDate: searchParams.startDate,
            endDate: searchParams.endDate,
            durationDays: Math.ceil(
              (new Date(searchParams.endDate).getTime() -
                new Date(searchParams.startDate).getTime()) /
                (1000 * 60 * 60 * 24)
            ),
          }
        : undefined;

    if (
      !destination.costs?.totalEstimate &&
      travelInfo?.durationDays &&
      destination.costs?.accommodation?.budget
    ) {
      const accommodationMin =
        destination.costs.accommodation.budget.min *
        (travelInfo.durationDays - 1);
      const accommodationMax =
        destination.costs.accommodation.budget.max *
        (travelInfo.durationDays - 1);

      const transportMin =
        destination.costs.transport.flight?.min ||
        destination.costs.transport.bus?.min ||
        0;
      const transportMax =
        destination.costs.transport.flight?.max ||
        destination.costs.transport.bus?.max ||
        0;

      destination.costs.totalEstimate = {
        min: transportMin + accommodationMin,
        max: transportMax + accommodationMax,
      };
    }

    const cityData = {
      ...destination.city,
      coordinates: destination.city.coordinates || {
        latitude: -22.8794,
        longitude: -42.0186,
      },
    };

    const cityInfo = {
      description:
        destination.cityInfo?.description || 'Descrição não disponível.',
      summary: destination.cityInfo?.summary || 'Informações sobre o destino',
    };

    return (
      <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 py-8 fade-in">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 slide-up">
            <DestinationHeader city={cityData} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {cityInfo.description &&
                cityInfo.description !== 'Informações sobre Cabo Frio' && (
                  <div className="slide-up" style={{ animationDelay: '100ms' }}>
                    <DestinationOverview
                      description={cityInfo.description}
                      summary={cityInfo.summary}
                    />
                  </div>
                )}

              {destination.textGenerated && (
                <div className="slide-up" style={{ animationDelay: '200ms' }}>
                  <AIGuideSection text={destination.textGenerated} />
                </div>
              )}

              {!destination.weather ||
              Object.keys(destination.weather).length === 0 ? (
                <div className="slide-up" style={{ animationDelay: '300ms' }}>
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <span className="text-2xl">🌤️</span>
                      Clima
                    </h2>
                    <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-xl p-8 text-center">
                      <p className="text-gray-600 mb-4">
                        ⚠️ Dados de clima temporariamente indisponíveis
                      </p>
                      <p className="text-sm text-gray-500">
                        As informações meteorológicas serão atualizadas em
                        breve.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="slide-up" style={{ animationDelay: '300ms' }}>
                  <WeatherSection weather={destination.weather} />
                </div>
              )}

              {!destination.hotels || destination.hotels.length === 0 ? (
                <div className="slide-up" style={{ animationDelay: '400ms' }}>
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-2xl">🏨</span>
                        Hotéis em {destination.city.name}
                      </h2>
                    </div>
                    <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-lg p-8 text-center border border-purple-100">
                      <p className="text-gray-700 mb-4">
                        🏗️ Em busca de opções de hospedagem...
                      </p>
                      <p className="text-sm text-gray-600">
                        Nossos parceiros estão atualizando as informações de
                        hotéis para esta cidade.
                      </p>
                      <div className="mt-6">
                        <a
                          href={`https://www.google.com/search?q=hot%C3%A9is+${encodeURIComponent(destination.city.name)}+${encodeURIComponent(destination.city.state)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity"
                        >
                          🔍 Buscar hotéis no Google
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="slide-up" style={{ animationDelay: '400ms' }}>
                  <HotelsSection
                    hotels={destination.hotels}
                    cityName={destination.city.name}
                  />
                </div>
              )}
            </div>

            <div className="space-y-8">
              {destination.costs && (
                <div className="slide-up" style={{ animationDelay: '100ms' }}>
                  <CostsSection
                    costs={destination.costs}
                    travelInfo={travelInfo}
                  />
                </div>
              )}

              <div className="slide-up" style={{ animationDelay: '200ms' }}>
                <DestinationMetadata
                  cache={destination.cache}
                  metadata={destination.metadata}
                />
              </div>

              <div
                className="slide-up bg-white rounded-2xl shadow-lg p-6 border border-gray-100 card-hover"
                style={{ animationDelay: '300ms' }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Plane /> Informações da Busca
                  {fromCache && (
                    <span className="text-xs bg-amber-100 text-amber-700 font-semibold px-2 py-1 rounded">
                      ⚡ Cache
                    </span>
                  )}
                </h3>
                <div className="space-y-3">
                  {searchParams.origin && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Origem:</span>
                      <span className="font-semibold text-gray-900">
                        {searchParams.origin}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Destino:</span>
                    <span className="font-semibold text-gray-900">
                      {destination.city.name}, {destination.city.state}
                    </span>
                  </div>
                  {travelInfo ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Duração:</span>
                        <span className="font-semibold text-gray-900">
                          {travelInfo.durationDays}{' '}
                          {travelInfo.durationDays === 1 ? 'dia' : 'dias'}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Período:</p>
                        <p className="font-medium text-gray-900">
                          {new Date(travelInfo.startDate).toLocaleDateString(
                            'pt-BR'
                          )}{' '}
                          -{' '}
                          {new Date(travelInfo.endDate).toLocaleDateString(
                            'pt-BR'
                          )}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">
                        📅 Não especificou datas?
                      </p>
                      <p className="text-xs text-gray-500">
                        Adicione datas de viagem para ver estimativas mais
                        precisas.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {fromCache && (
                <div className="slide-up" style={{ animationDelay: '400ms' }}>
                  <div className="bg-white rounded-2xl shadow-lg p-4 border border-amber-200">
                    <p className="text-sm text-amber-800 mb-3">
                      ℹ️ Dados carregados do cache. Para informações mais
                      recentes:
                    </p>
                    <form
                      action={`/api/revalidate?slug=${destination.city.slug}`}
                      method="POST"
                    >
                      <button
                        type="submit"
                        className="w-full bg-linear-to-r from-amber-500 to-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
                      >
                        🔄 Buscar dados atualizados
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div
            className="mt-8 pt-8 border-t border-gray-200 slide-up"
            style={{ animationDelay: '500ms' }}
          >
            <div className="text-center text-sm text-gray-500">
              <p>
                ✨ Este guia foi gerado automaticamente com base nas informações
                mais recentes disponíveis. Os preços podem variar e recomendamos
                verificar as informações antes de viajar.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs">
                {destination.sources?.map((source: any, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                  >
                    📡 {source.name}
                  </span>
                ))}
                <span className="text-gray-400">
                  🗺️ Dados processados em{' '}
                  {new Date(
                    destination.metadata?.generatedAt || Date.now()
                  ).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error: unknown) {
    console.error('Unexpected error:', error);
    if(error instanceof Error){
      console.error('Unexpected error:', error.message);
    }
    return (
      <ErrorState
        title="Erro inesperado"
        message="Ocorreu um erro ao processar sua solicitação. Tente novamente."
        retryLink="/"
        retryText="Voltar para busca"
      />
    );
  }
}
