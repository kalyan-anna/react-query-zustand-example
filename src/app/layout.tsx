'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils/client.helper';
import { ThemeProvider } from '@/components/design-system';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

if (process.env.NEXT_PUBLIC_ENABLE_API_MOCKING === 'true') {
  import('../../mocks').catch(err => console.error('MSW failed to start', err));
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
