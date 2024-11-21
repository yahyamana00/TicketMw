'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCurrentUser, logout, updateLastActive } from '@/lib/auth';

export function useSession() {
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    let inactivityTimeout: NodeJS.Timeout;

    async function checkSession() {
      try {
        const result = await getCurrentUser();
        if (mounted && !result.success) {
          await logout();
          router.push('/login');
        }
      } catch (error) {
        console.error('Session check failed:', error);
        if (mounted) {
          await logout();
          router.push('/login');
        }
      }
    }

    function resetInactivityTimer() {
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
      }
      inactivityTimeout = setTimeout(async () => {
        await logout();
        router.push('/login');
      }, 30 * 60 * 1000); // 30 minutes

      updateLastActive();
    }

    // Set up activity listeners
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetInactivityTimer);
    });

    // Initial session check
    checkSession();
    resetInactivityTimer();

    // Set up interval to periodically check session
    const interval = setInterval(checkSession, 60000); // Check every minute

    return () => {
      mounted = false;
      if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
      }
      clearInterval(interval);
      events.forEach(event => {
        window.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [router]);
}