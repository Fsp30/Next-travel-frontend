import { protectPage } from '@/app/lib/auth';
import { LogoutButton } from './_components/logout-button';
import Image from 'next/image';

export default async function ProfilePage() {
  const user = await protectPage();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-6 mb-8">
            {user.profilePicture && (
              <Image
                src={user.profilePicture}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-blue-100"
              />
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Membro desde
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                {new Date(user.createdAt).toLocaleDateString('pt-BR')}
              </p>
            </div>

            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-sm font-medium text-gray-600 mb-2">
                Último acesso
              </h3>
              <p className="text-2xl font-bold text-green-600">
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleDateString('pt-BR')
                  : 'Primeiro acesso'}
              </p>
            </div>
          </div>

          <div className="border-t pt-6">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
