'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { verifyEmail, resendVerificationEmail } from '@/lib/auth';
import { useToast } from '@/components/ui/use-toast';

export default function VerifyPage() {
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [isResending, setIsResending] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    async function verify() {
      const userId = searchParams.get('userId');
      const secret = searchParams.get('secret');

      if (!userId || !secret) {
        setStatus('error');
        return;
      }

      const result = await verifyEmail(userId, secret);
      
      if (result.success) {
        setStatus('success');
        toast({
          title: "Email Verified",
          description: "Your email has been successfully verified. Redirecting to login...",
        });
        setIsRedirecting(true);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setStatus('error');
        toast({
          title: "Verification Failed",
          description: result.error?.message || "Failed to verify email",
          variant: "destructive",
        });
      }
    }

    verify();
  }, [router, searchParams, toast]);

  const handleResend = async () => {
    setIsResending(true);
    try {
      const result = await resendVerificationEmail();
      if (result.success) {
        toast({
          title: "Verification Email Sent",
          description: "Please check your email for the new verification link.",
        });
      } else {
        throw new Error(result.error?.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to resend verification email",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 space-y-4 text-center">
        {status === 'verifying' && (
          <div className="space-y-4 animate-fade-in">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <h1 className="text-2xl font-bold">Verifying your email...</h1>
            <p className="text-muted-foreground">Please wait while we verify your email address.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4 animate-fade-in">
            <div className="h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto text-xl">
              ✓
            </div>
            <h1 className="text-2xl font-bold text-green-600">Email Verified!</h1>
            <p className="text-muted-foreground">
              {isRedirecting ? (
                <span className="flex items-center justify-center space-x-2">
                  <span>Redirecting to login</span>
                  <span className="inline-flex">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                  </span>
                </span>
              ) : (
                'Your email has been successfully verified!'
              )}
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4 animate-fade-in">
            <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-xl">
              ✕
            </div>
            <h1 className="text-2xl font-bold text-red-600">Verification Failed</h1>
            <p className="text-muted-foreground mb-6">
              We couldn&apos;t verify your email. The link might be expired or invalid.
            </p>
            <Button
              onClick={handleResend}
              disabled={isResending}
              className="mx-auto"
            >
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resending...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Resend Verification Email
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}