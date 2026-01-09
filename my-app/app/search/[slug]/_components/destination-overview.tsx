import { Info } from 'lucide-react';

interface DestinationOverviewProps {
  description: string;
  summary?: string;
}

export function DestinationOverview({
  description,
  summary,
}: DestinationOverviewProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
      <div className="flex items-start gap-3">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Info className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Sobre o Destino
          </h2>
          {summary && (
            <p className="text-sm text-blue-900 font-medium mb-3">{summary}</p>
          )}
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}
