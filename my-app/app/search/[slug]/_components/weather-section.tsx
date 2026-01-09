import { Cloud, Droplets, Wind, Calendar } from 'lucide-react';

interface WeatherSectionProps {
  weather: {
    current?: {
      temperature?: number;
      temperatureMin?: number;
      temperatureMax?: number;
      feelsLike?: number;
      condition?: string;
      description?: string;
      humidity?: number;
      windSpeed?: number;
    };
    forecast?: Array<{
      date: string;
      temperature?: number;
      temperatureMin?: number;
      temperatureMax?: number;
      condition?: string;
      chanceOfRain?: number;
    }>;
    seasonal?: {
      season: 'summer' | 'autumn' | 'winter' | 'spring';
      averageTemperature: number;
      averageRainfall: number;
      description: string;
    };
  };
}

const seasonEmoji = {
  summer: '☀️',
  autumn: '🍂',
  winter: '❄️',
  spring: '🌸',
};

const seasonName = {
  summer: 'Verão',
  autumn: 'Outono',
  winter: 'Inverno',
  spring: 'Primavera',
};

export function WeatherSection({ weather }: WeatherSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Cloud className="w-6 h-6 text-blue-600" />
        Clima
      </h2>

      {weather.current && (
        <div className="bg-gradinet-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Agora</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">
                  {weather.current.temperature}°
                </span>
                <span className="text-blue-100">C</span>
              </div>
              <p className="text-xl mt-2">{weather.current.condition}</p>
              {weather.current.description && (
                <p className="text-blue-100 text-sm mt-1">
                  {weather.current.description}
                </p>
              )}
            </div>

            <div className="text-right space-y-2">
              {weather.current.temperatureMax && (
                <div className="text-sm">
                  <span className="text-blue-100">Máx:</span>{' '}
                  <span className="font-semibold">
                    {weather.current.temperatureMax}°
                  </span>
                </div>
              )}
              {weather.current.temperatureMin && (
                <div className="text-sm">
                  <span className="text-blue-100">Mín:</span>{' '}
                  <span className="font-semibold">
                    {weather.current.temperatureMin}°
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-blue-400">
            {weather.current.humidity !== undefined && (
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                <div>
                  <p className="text-blue-100 text-xs">Umidade</p>
                  <p className="font-semibold">{weather.current.humidity}%</p>
                </div>
              </div>
            )}
            {weather.current.windSpeed !== undefined && (
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4" />
                <div>
                  <p className="text-blue-100 text-xs">Vento</p>
                  <p className="font-semibold">
                    {weather.current.windSpeed} km/h
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {weather.forecast && weather.forecast.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            Próximos Dias
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {weather.forecast.map((day, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      {new Date(day.date).toLocaleDateString('pt-BR', {
                        weekday: 'short',
                        day: '2-digit',
                        month: '2-digit',
                      })}
                    </p>
                    <p className="font-semibold text-gray-900">
                      {day.condition}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      {day.temperature}°
                    </p>
                    {day.chanceOfRain !== undefined && (
                      <p className="text-xs text-blue-600 mt-1">
                        💧 {day.chanceOfRain}%
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {weather.seasonal && (
        <div className="bg-gradinet-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
          <div className="flex items-start gap-3">
            <span className="text-3xl">
              {seasonEmoji[weather.seasonal.season]}
            </span>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">
                {seasonName[weather.seasonal.season]}
              </h4>
              <p className="text-sm text-gray-700 mb-2">
                {weather.seasonal.description}
              </p>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-600">
                  🌡️ Média: {weather.seasonal.averageTemperature}°C
                </span>
                <span className="text-gray-600">
                  💧 Chuva: {weather.seasonal.averageRainfall}mm
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
