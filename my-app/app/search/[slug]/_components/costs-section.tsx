import { DollarSign, Bus, Plane, Hotel, Calendar, BusIcon } from 'lucide-react';

interface CostsSectionProps {
  costs: {
    currency: string;
    transport: {
      bus?: { min: number; max: number };
      flight?: { min: number; max: number };
      currency: string;
    };
    accommodation: {
      budget?: { min: number; max: number };
      midRange?: { min: number; max: number };
      luxury?: { min: number; max: number };
      currency: string;
    };
    totalEstimate?: {
      min: number;
      max: number;
    };
  };
  travelInfo?: {
    startDate?: string;
    endDate?: string;
    durationDays?: number;
  };
}

export function CostsSection({ costs, travelInfo }: CostsSectionProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: costs.currency,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <DollarSign className="w-6 h-6 text-green-600" />
        Custos Estimados
      </h2>

      {travelInfo && travelInfo.durationDays && (
        <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
          <div className="flex items-center gap-2 text-blue-900 mb-2">
            <Calendar className="w-4 h-4" />
            <span className="font-semibold text-sm">
              {travelInfo.durationDays}{' '}
              {travelInfo.durationDays === 1 ? 'dia' : 'dias'} de viagem
            </span>
          </div>
          {travelInfo.startDate && travelInfo.endDate && (
            <p className="text-xs text-blue-700">
              {new Date(travelInfo.startDate).toLocaleDateString('pt-BR')} até{' '}
              {new Date(travelInfo.endDate).toLocaleDateString('pt-BR')}
            </p>
          )}
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <BusIcon />
          Transporte
        </h3>
        <div className="space-y-3">
          {costs.transport.bus && (
            <CostCard
              icon={<Bus className="w-5 h-5 text-blue-600" />}
              label="Ônibus"
              min={formatCurrency(costs.transport.bus.min)}
              max={formatCurrency(costs.transport.bus.max)}
            />
          )}
          {costs.transport.flight && (
            <CostCard
              icon={<Plane className="w-5 h-5 text-indigo-600" />}
              label="Avião"
              min={formatCurrency(costs.transport.flight.min)}
              max={formatCurrency(costs.transport.flight.max)}
            />
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          🏨 Hospedagem (por noite)
        </h3>
        <div className="space-y-3">
          {costs.accommodation.budget && (
            <CostCard
              icon={<Hotel className="w-5 h-5 text-green-600" />}
              label="Econômica"
              min={formatCurrency(costs.accommodation.budget.min)}
              max={formatCurrency(costs.accommodation.budget.max)}
            />
          )}
          {costs.accommodation.midRange && (
            <CostCard
              icon={<Hotel className="w-5 h-5 text-yellow-600" />}
              label="Intermediária"
              min={formatCurrency(costs.accommodation.midRange.min)}
              max={formatCurrency(costs.accommodation.midRange.max)}
            />
          )}
          {costs.accommodation.luxury && (
            <CostCard
              icon={<Hotel className="w-5 h-5 text-purple-600" />}
              label="Luxo"
              min={formatCurrency(costs.accommodation.luxury.min)}
              max={formatCurrency(costs.accommodation.luxury.max)}
            />
          )}
        </div>
      </div>

      {costs.totalEstimate && (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200">
          <p className="text-sm text-gray-700 mb-2">Estimativa Total</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatCurrency(costs.totalEstimate.min)} -{' '}
            {formatCurrency(costs.totalEstimate.max)}
          </p>
          <p className="text-xs text-gray-600 mt-2">
            * Valores aproximados para toda a viagem
          </p>
        </div>
      )}
    </div>
  );
}

function CostCard({
  icon,
  label,
  min,
  max,
}: {
  icon: React.ReactNode;
  label: string;
  min: string;
  max: string;
}) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium text-gray-900">{label}</span>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-gray-900">
          {min} - {max}
        </p>
      </div>
    </div>
  );
}
