import Link from 'next/link';

interface ErrorStateProps {
  title: string;
  message: string;
  retryLink: string;
  retryText: string;
}

export function ErrorState({
  title,
  message,
  retryLink,
  retryText,
}: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">⚠️</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">{title}</h1>
        <p className="text-gray-600 mb-6">{message}</p>

        <div className="space-y-4">
          <Link
            href={retryLink}
            className="block w-full bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            {retryText}
          </Link>

          <Link
            href="/"
            className="block w-full bg-gray-100 text-gray-700 font-medium py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Voltar para a página inicial
          </Link>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          Se o problema persistir, entre em contato com nosso suporte.
        </p>
      </div>
    </div>
  );
}
