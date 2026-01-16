import { UserResponseSchema } from '@/app/lib/schemas';
import Image from 'next/image';
import z from 'zod';

type User = z.infer<typeof UserResponseSchema>;

interface InfoProfileCardProps {
  user: User;
}

export default async function InfoProfileCard({ user }: InfoProfileCardProps) {
  return (
    <div className="mb-8 p-4 border rounded">
      <h2 className="text-xl font-semibold mb-4">Informações</h2>
      <div className="space-y-2">
        <p>
          <strong>Nome: </strong>
          {user.name}
        </p>
        <p>
          <strong>Email: </strong>
          {user.email}
        </p>
        <div className="rounded-full mt-2">
          {user.profilePicture && (
            <Image
              src={user.profilePicture}
              alt={user.name}
              priority={false}
              width={45}
              height={45}
              className="rounded-full"
            />
          )}
        </div>
        {user.lastLogin && (
          <p>
            <strong>Último Login: </strong>{' '}
            {new Date(user.lastLogin).toLocaleString('pt-BR')}
          </p>
        )}
      </div>
    </div>
  );
}
