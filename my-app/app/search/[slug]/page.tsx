import { redirect } from 'next/navigation';

interface DestinationPageProps {
  searchParams: Promise<{
    city?: string;
    state?: string;
    origin?: string;
    startDate?: string;
    endDate?: string;
  }>;
}

export default async function DestinationPage(props: DestinationPageProps) {
  const searchParams = await props.searchParams;

  const urlParams = new URLSearchParams();

  if (searchParams.city) urlParams.append('city', searchParams.city);
  if (searchParams.state) urlParams.append('state', searchParams.state);
  if (searchParams.origin) urlParams.append('origin', searchParams.origin);
  if (searchParams.startDate)
    urlParams.append('startDate', searchParams.startDate);
  if (searchParams.endDate) urlParams.append('endDate', searchParams.endDate);

  if (!searchParams.city || !searchParams.state) {
    console.log('No query params, redirecting to home');
    redirect('/');
  }

  redirect(`/search?${urlParams.toString()}`);
}
