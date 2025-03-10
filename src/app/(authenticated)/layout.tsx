'use client';

import { ToastContainer } from '@/components/design-system/ToastContainer';
import { useAuthStore } from '@/state/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { MainNav } from '../__layout/MainNav';

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <main className="min-h-screen flex flex-col">
      <header>
        <MainNav />
      </header>
      <main className="flex flex-1">
        <ToastContainer />
        <div className="px-8 md:px-8 py-8 w-full">{children}</div>
      </main>
    </main>
  );
}
