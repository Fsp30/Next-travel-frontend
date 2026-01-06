'use client';

import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticateUser } from '@/app/actions';

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      setError('Nenhuma credencial recebida do Google');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('[Login] ID Token recebido do Google');

      const result = await authenticateUser({
        googleToken: credentialResponse.credential,
      });

      if (result.success) {
        console.log('[Login] Autenticação bem-sucedida');
        router.push(result.data.redirectTo);
        router.refresh();
      } else {
        console.error('[Login] Erro:', result.error);
        setError(result.error);
      }
    } catch (err) {
      console.error('[Login] Erro inesperado:', err);
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = () => {
    console.error('[Login] Erro ao fazer login com Google');
    setError('Erro ao conectar com o Google. Tente novamente.');
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
          <span>Autenticando...</span>
        </div>
      )}

      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
          size="large"
          text="continue_with"
          shape="rectangular"
          theme="outline"
          logo_alignment="left"
        />
      </div>

      <div className="text-center text-xs text-gray-500 mt-4">
        <p>Login com Google</p>
      </div>
    </div>
  );
}
