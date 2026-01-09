import { ReactNode } from 'react';
import { DashboardSidebar } from './_components/dashboard-sidebar';
import { DashboardHeader } from './_components/dashboard-header';
import { protectPage } from '@/app/lib/auth';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  await protectPage();

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
