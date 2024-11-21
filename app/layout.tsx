import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { SessionProvider } from '@/components/auth/session-provider';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/navbar';
import { AIChatWidget } from '@/components/chat/ai-chat-widget';
import Loading from './loading';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TicketMe - Modern Support Made Simple',
  description: 'Transform your customer support with our intelligent ticketing system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SessionProvider>
            <Navbar />
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
            <AIChatWidget />
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}