'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { TicketIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { ThemeToggle } from '@/components/theme-toggle';
import { UnauthorizedModal } from '@/components/auth/unauthorized-modal';
import { login, loginWithGoogle, getCurrentUser } from '@/lib/auth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [authError, setAuthError] = useState<{
    email?: string;
    password?: string;
  }>({});

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    // Show unauthorized modal if redirected from protected route
    if (searchParams.get('unauthorized') === 'true') {
      setShowUnauthorizedModal(true);
    }

    // Check for existing session
    async function checkSession() {
      try {
        const result = await getCurrentUser();
        if (result.success) {
          // If user is already logged in, redirect to dashboard
          router.push('/dashboard');
        }
      } finally {
        setIsCheckingSession(false);
      }
    }
    checkSession();
  }, [router, searchParams]);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message || 'Failed to sign in with Google',
        variant: "destructive",
      });
    }
  };

  const onSubmit = async (data: LoginForm) => {
    setAuthError({});

    try {
      const result = await login(data.email, data.password);
      
      if (result.success) {
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
        
        const redirectPath = searchParams.get('redirect');
        router.push(redirectPath || '/dashboard');
      } else {
        setAuthError({
          email: result.error?.message,
          password: result.error?.message,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <TicketIcon className="h-8 w-8 text-primary" />
              <span className="ml-2 text-2xl font-bold">TicketMe</span>
            </Link>
            <ThemeToggle />
          </div>
          
          <h2 className="mt-6 text-3xl font-extrabold">Sign in to your account</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Or{' '}
            <Link
              href="/register"
              className="font-medium text-primary hover:text-primary/80"
            >
              create a new account
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-card border p-8 rounded-lg shadow-sm">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
                {authError.email && (
                  <p className="text-sm text-destructive">{authError.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  disabled={isSubmitting}
                />
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password.message}</p>
                )}
                {authError.password && (
                  <p className="text-sm text-destructive">{authError.password}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Right side - Animated Background */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
            <div className="absolute inset-0 blur-3xl">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/50 rounded-full mix-blend-multiply animate-blob"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/50 rounded-full mix-blend-multiply animate-blob animation-delay-2000"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/50 rounded-full mix-blend-multiply animate-blob animation-delay-4000"></div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-primary/20 to-purple-500/20 backdrop-blur-sm"></div>

        <div className="relative h-full flex items-center justify-center p-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome Back!
            </h2>
            <p className="text-white/80 max-w-md mx-auto">
              Sign in to access your dashboard and manage your support tickets
            </p>
          </div>
        </div>
      </div>

      {showUnauthorizedModal && <UnauthorizedModal />}
    </div>
  );
}