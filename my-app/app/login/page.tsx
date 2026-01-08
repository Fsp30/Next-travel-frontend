import { redirectIfAuthenticated } from '@/app/lib/auth';
import { LoginForm } from './_components/login-form';
import { Plane } from 'lucide-react';

export default async function LoginPage() {
  await redirectIfAuthenticated('/dashboard');

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ✈️ Next Travel
          </h1>
          <p className="text-gray-600">
            <Plane width={40} height={40} />
            Planeje suas viagens com inteligência
          </p>
        </div>

        <LoginForm />

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Ao continuar, você concorda com nossos</p>
          <p>
            <a href="/termos" className="text-blue-600 hover:underline">
              Termos de Serviço
            </a>
            {' e '}
            <a href="/privacidade" className="text-blue-600 hover:underline">
              Política de Privacidade
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
