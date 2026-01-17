import { protectPage } from '../lib/auth';
import LogoutButton from './_components/logout-button';
import InfoProfileCard from './_components/info-profile-card';
import { redirect } from 'next/navigation';
import { UpdateProfileButton } from './_components/(_update-profile-components)';

export default async function ProfilePage() {
  const user = await protectPage();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="container min-h-- mx-auto p-6 max-w-2xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold"> Meu Perfil</h1>
        <UpdateProfileButton />
        <LogoutButton />
      </div>
      <InfoProfileCard user={user} />
    </div>
  );
}
