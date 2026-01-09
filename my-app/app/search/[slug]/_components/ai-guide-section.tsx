import { Sparkles } from 'lucide-react';

interface AIGuideSectionProps {
  text: string;
}

export function AIGuideSection({ text }: AIGuideSectionProps) {
  return (
    <section
      className="
        relative
        rounded-2xl
        border border-purple-200
        bg-gradient-to-br from-purple-50 via-white to-pink-50
        shadow-lg
        p-6
      "
    >
      <div className="mb-6 flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100">
          <Sparkles className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Guia Inteligente</h2>
          <p className="text-sm text-gray-600">
            Dicas personalizadas para o seu destino
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="prose prose-sm max-w-none">
        {text.split('\n').map((paragraph, index) => {
          if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
            return (
              <p
                key={index}
                className="font-semibold text-gray-900 text-base my-4"
              >
                {paragraph.replace(/\*\*/g, '')}
              </p>
            );
          }

          if (paragraph.startsWith('# ')) {
            return (
              <h3
                key={index}
                className="text-xl font-bold text-gray-900 mt-8 mb-4"
              >
                {paragraph.replace('# ', '')}
              </h3>
            );
          }

          if (paragraph.startsWith('- ')) {
            return (
              <div key={index} className="flex gap-2 my-2">
                <span className="text-purple-500">•</span>
                <span className="text-gray-700">
                  {paragraph.replace('- ', '')}
                </span>
              </div>
            );
          }

          if (paragraph.trim() === '') {
            return <div key={index} className="h-3" />;
          }

          return (
            <p key={index} className="text-gray-700 leading-relaxed my-3">
              {paragraph}
            </p>
          );
        })}
      </div>
    </section>
  );
}
