'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, resetInactivityTimer } from '@/lib/auth';
import type { UserRole } from '@/lib/auth';

interface User {
  $id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface SessionContextType {
  user: User | null;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType>({
  user: null,
  isLoading: true,
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        const result = await getCurrentUser();
        if (mounted) {
          setUser(result.success ? result.data : null);
          setIsLoading(false);
        }
      } catch {
        if (mounted) {
          setUser(null);
          setIsLoading(false);
        }
      }
    }

    // Set up activity listeners
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetInactivityTimer);
    });

    checkSession();

    // Check session periodically
    const interval = setInterval(checkSession, 60000);

    return () => {
      mounted = false;
      clearInterval(interval);
      events.forEach(event => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [router]);

  return (
    <SessionContext.Provider value={{ user, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);