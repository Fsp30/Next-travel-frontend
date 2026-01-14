import { logout } from '../actions';
import { protectPage } from '../lib/auth';
import Image from 'next/image';

export default async function ProfilePage() {
  const user = await protectPage();

  return (
    <div>
      <div>
        <h1> Meu Perfil</h1>

        <form action={logout}>
          <button type="submit">Sair</button>
        </form>
      </div>

      <div>
        <h2>Informações</h2>
        <div>
          <p>
            <strong>Nome: </strong>
            {user.name}
          </p>
          <p>
            <strong>Email: </strong>
            {user.email}
          </p>
          {user.profilePicture && (
            <div>
              <Image src={user.profilePicture} alt={user.name} />
            </div>
          )}
          {user.lastLogin && (
            <p>
              <strong>Último Login: </strong>{' '}
              {new Date(user.lastLogin).toLocaleString('pt-BR')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
