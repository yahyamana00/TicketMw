'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentUser, resetInactivityTimer } from '@/lib/auth';

export function useAuth() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;

    async function checkAuth() {
      const result = await getCurrentUser();
      
      if (mounted && !result.success) {
        router.push(`/login?redirect=${pathname}`);
      }
    }

    // Check auth on mount
    checkAuth();

    // Set up activity listeners
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetInactivityTimer);
    });

    // Check auth periodically
    const interval = setInterval(checkAuth, 60000);

    return () => {
      mounted = false;
      clearInterval(interval);
      events.forEach(event => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [router, pathname]);
}