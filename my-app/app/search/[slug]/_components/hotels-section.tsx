import { Hotel, MapPin, Star } from 'lucide-react';

interface HotelsSectionProps {
  hotels: Array<{
    hotelId: string;
    name: string;
    cityCode?: string;
    rating?: string;
    geoCode?: {
      latitude?: number;
      longitude?: number;
    };
  }>;
  cityName: string;
}

export function HotelsSection({ hotels, cityName }: HotelsSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Hotel className="w-6 h-6 text-purple-600" />
          Hotéis em {cityName}
        </h2>
        <span className="text-sm text-gray-600">
          {hotels.length} {hotels.length === 1 ? 'hotel' : 'hotéis'} disponíveis
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map((hotel) => (
          <div
            key={hotel.hotelId}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-gray-900 line-clamp-2">
                {hotel.name}
              </h3>
              {hotel.rating && (
                <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded text-xs font-semibold text-yellow-800">
                  <Star className="w-3 h-3 fill-current" />
                  {hotel.rating}
                </div>
              )}
            </div>

            {hotel.geoCode && (
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <MapPin className="w-3 h-3" />
                <span>
                  {hotel.geoCode.latitude?.toFixed(4)}°,{' '}
                  {hotel.geoCode.longitude?.toFixed(4)}°
                </span>
              </div>
            )}

            {hotel.cityCode && (
              <div className="mt-2 text-xs text-gray-500">
                Código: {hotel.cityCode}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
        <p className="text-sm text-purple-900">
          💡 <span className="font-semibold">Dica:</span> Em breve você poderá
          reservar diretamente através dos nossos parceiros!
        </p>
      </div>
    </div>
  );
}
