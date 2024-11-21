'use client';

import { useSession } from '@/hooks/use-session';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This will automatically handle session checks and redirects
  useSession();

  return <>{children}</>;
}