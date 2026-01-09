// app/search/[slug]/_components/destination-header.tsx
import { MapPin, TrendingUp, Globe } from 'lucide-react';

interface DestinationHeaderProps {
  city: {
    name: string;
    state: string;
    country: string;
    requestCount: number;
    isPopular: boolean;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
}

export function DestinationHeader({ city }: DestinationHeaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-bold text-gray-900">{city.name}</h1>
            {city.isPopular && (
              <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
                🔥 Popular
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="text-lg">
                {city.state}, {city.country}
              </span>
            </div>

            {city.coordinates && (
              <div className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4" />
                <span>
                  {city.coordinates.latitude.toFixed(4)}°,{' '}
                  {city.coordinates.longitude.toFixed(4)}°
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          <span className="text-gray-600">
            <span className="font-semibold text-gray-900">
              {city.requestCount.toLocaleString('pt-BR')}
            </span>{' '}
            buscas
          </span>
        </div>
      </div>
    </div>
  );
}
