import { Database, Clock, Zap } from 'lucide-react';

interface DestinationMetadataProps {
  cache?: {
    cached: boolean;
    cachedAt?: string;
    source?: 'redis' | 'fresh';
  };
  metadata?: {
    generatedAt: string;
    processingTimeMs?: number;
  };
}
export function DestinationMetadata({
  cache,
  metadata,
}: DestinationMetadataProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <Database className="w-4 h-4" />
        Informações Técnicas
      </h3>

      <div className="space-y-3 text-sm">
        {cache && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Fonte:</span>
            <span
              className={`font-medium ${
                cache.cached ? 'text-green-700' : 'text-blue-700'
              }`}
            >
              {cache.cached ? '⚡ Cache' : '🆕 Dados Novos'}
            </span>
          </div>
        )}

        {cache?.cached && cache.cachedAt && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Cacheado:</span>
            <span className="text-gray-900">
              {new Date(cache.cachedAt).toLocaleString('pt-BR')}
            </span>
          </div>
        )}

        {metadata && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Gerado:</span>
            <span className="text-gray-900">
              {new Date(metadata.generatedAt).toLocaleString('pt-BR')}
            </span>
          </div>
        )}

        {metadata?.processingTimeMs && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Tempo:
            </span>
            <span className="font-medium text-gray-900">
              {(metadata.processingTimeMs / 1000).toFixed(2)}s
            </span>
          </div>
        )}
      </div>

      {cache?.cached && (
        <div className="mt-3 pt-3 border-t border-gray-300">
          <div className="flex items-start gap-2 text-xs text-gray-600">
            <Zap className="w-3 h-3 text-yellow-500 shrink-0 mt-0.5" />
            <span>
              Dados salvos em cache para melhor performance. Informações podem
              ter até algumas horas de diferença.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
