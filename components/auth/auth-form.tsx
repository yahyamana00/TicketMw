'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { login, register } from '@/lib/auth';

const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

type AuthFormProps = {
  type: 'login' | 'register';
};

export function AuthForm({ type }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
  });

  async function onSubmit(data: z.infer<typeof authSchema>) {
    setIsLoading(true);
    setAuthError(null);

    try {
      const result = type === 'login'
        ? await login(data.email, data.password)
        : await register(data.email, data.password, data.name || '');

      if (result.success) {
        toast({
          title: type === 'login' ? 'Welcome back!' : 'Account created',
          description: result.message || 'You have successfully signed in.',
        });

        if (type === 'login') {
          const redirectPath = searchParams.get('redirect');
          router.push(redirectPath || '/dashboard');
        } else {
          router.push('/verify');
        }
      } else {
        setAuthError(result.error?.message || 'Authentication failed');
      }
    } catch (error: any) {
      setAuthError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {type === 'register' && (
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...registerForm('name')}
            disabled={isLoading}
            placeholder="Enter your name"
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...registerForm('email')}
          disabled={isLoading}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          {...registerForm('password')}
          disabled={isLoading}
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      {authError && (
        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
          {authError}
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {type === 'login' ? 'Signing in...' : 'Creating account...'}
          </>
        ) : (
          type === 'login' ? 'Sign In' : 'Create Account'
        )}
      </Button>
    </form>
  );
}