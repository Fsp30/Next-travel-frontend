'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, MapPin, Calendar, Navigation } from 'lucide-react';
import { searchDestination } from '@/app/actions/search.actions';
import type { GetDestinationRequest } from '@/app/lib/schemas/api/get-destination.request';

interface SearchFormProps {
  onSuccess?: () => void;
}

export function SearchForm({ onSuccess }: SearchFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<GetDestinationRequest>({
    cityName: '',
    state: '',
    origin: '',
    country: 'Brasil',
    startDate: undefined,
    endDate: undefined,
    forecastDays: 5,
    targetMonth: new Date().getMonth() + 1,
    includeForecast: true,
    includeSeasonal: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        if (
          !formData.cityName.trim() ||
          !formData.state.trim() ||
          !formData.origin.trim()
        ) {
          setError('Preencha todos os campos obrigatórios');
          return;
        }

        const result = await searchDestination(formData);

        if (!result.success) {
          setError(result.error);
          return;
        }

        const { destination } = result.data;

        const queryParams = new URLSearchParams();

        queryParams.append('city', formData.cityName);
        queryParams.append('state', formData.state);
        queryParams.append('origin', formData.origin);

        if (formData.startDate) {
          queryParams.append(
            'startDate',
            formData.startDate.toISOString().split('T')[0]
          );
        }

        if (formData.endDate) {
          queryParams.append(
            'endDate',
            formData.endDate.toISOString().split('T')[0]
          );
        }

        const url = `/search/${destination.city.slug}?${queryParams.toString()}`;
        router.push(url);

        onSuccess?.();
      } catch (err) {
        console.error('Erro no formulário:', err);
        setError('Erro ao processar a solicitação. Tente novamente.');
      }
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'date' ? (value ? new Date(value) : undefined) : value,
    }));
  };

  const fillExample = () => {
    setFormData({
      cityName: 'Cabo Frio',
      state: 'Rio de Janeiro',
      origin: 'São Paulo',
      country: 'Brasil',
      startDate: new Date('2026-01-15'),
      endDate: new Date('2026-01-22'),
      forecastDays: 5,
      targetMonth: 1,
      includeForecast: true,
      includeSeasonal: false,
    });
    setError(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-800 font-medium mb-1">
              🚀 Teste rápido
            </p>
            <p className="text-xs text-blue-600">
              Clique para preencher automaticamente com dados de exemplo
            </p>
          </div>
          <button
            type="button"
            onClick={fillExample}
            className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium px-3 py-1 rounded-lg transition-colors"
            disabled={isPending}
          >
            Preencher exemplo
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100"
      >
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-start gap-3 animate-pulse">
            <span className="text-red-600 text-xl mt-0.5">⚠️</span>
            <div className="flex-1">
              <p className="font-medium text-sm">Erro na busca</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Título */}
        <div className="text-center mb-2">
          <h2 className="text-2xl font-bold text-gray-900">
            Encontre seu destino perfeito
          </h2>
          <p className="text-gray-600 mt-2">
            Preencha os dados abaixo para gerar seu guia personalizado
          </p>
        </div>

        {/* Destino */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="cityName"
              className="flex text-sm font-medium text-gray-700 items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Cidade de Destino
            </label>
            <input
              type="text"
              id="cityName"
              name="cityName"
              required
              value={formData.cityName}
              onChange={handleChange}
              placeholder="Ex: Cabo Frio, Rio de Janeiro, Florianópolis..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
              disabled={isPending}
            />
            <p className="text-xs text-gray-500">
              Nome completo da cidade que você quer visitar
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="state"
              className="flex text-sm font-medium text-gray-700"
            >
              Estado 
            </label>
            <input
              type="text"
              id="state"
              name="state"
              required
              value={formData.state}
              onChange={handleChange}
              placeholder="Minas Gerais..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400 uppercase"
              disabled={isPending}
            />
            <p className="text-xs text-gray-500">
              Sigla ou nome completo do estado
            </p>
          </div>
        </div>

        {/* Origem */}
        <div className="space-y-2">
          <label
            htmlFor="origin"
            className="flex text-sm font-medium text-gray-700 items-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            Cidade de Origem
          </label>
          <input
            type="text"
            id="origin"
            name="origin"
            required
            value={formData.origin}
            onChange={handleChange}
            placeholder="Ex: São Paulo, Belo Horizonte, Porto Alegre..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
            disabled={isPending}
          />
          <p className="text-xs text-gray-500">
            De onde você estará partindo para sua viagem
          </p>
        </div>

        {/* Datas */}
        <div className="space-y-2">
          <label className="flex text-sm font-medium text-gray-700 items-center gap-2">
            <Calendar className="w-4 h-4" />
            Datas da viagem (opcional)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="startDate" className="text-xs text-gray-600 flex">
                Data de ida
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={
                  formData.startDate
                    ? formData.startDate.toISOString().split('T')[0]
                    : ''
                }
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={isPending}
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="endDate" className="text-xs text-gray-600 flex">
                Data de volta
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={
                  formData.endDate
                    ? formData.endDate.toISOString().split('T')[0]
                    : ''
                }
                onChange={handleChange}
                min={
                  formData.startDate
                    ? formData.startDate.toISOString().split('T')[0]
                    : new Date().toISOString().split('T')[0]
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                disabled={isPending}
              />
            </div>
          </div>
          <p className="text-xs text-gray-500">
            💡 As datas ajudam a calcular custos mais precisos e mostrar
            previsões específicas
          </p>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Buscando informações...</span>
              </>
            ) : (
              <>
                <MapPin className="w-5 h-5" />
                <span className="text-lg">Buscar Destino</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-5">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <span className="text-blue-600 text-xl">ℹ️</span>
            </div>
            <div>
              <p className="text-sm text-blue-800 font-semibold mb-2">
                O que você vai recever no seu guia:
              </p>
              <ul className="text-sm text-blue-700 space-y-1.5">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  Informações detalhadas sobre o destino
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  Previsão do tempo e clima sazonal
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  Estimativa de custos de transporte e hospedagem
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  Lista de hotéis disponíveis
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  Guia personalizado gerado por IA
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  Dicas de atrações e gastronomia local
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center pt-2">
          <p className="text-xs text-gray-500">
            ⏱️ A busca pode levar alguns segundos enquanto coletamos todas as
            informações
          </p>
        </div>
      </form>
    </div>
  );
}
