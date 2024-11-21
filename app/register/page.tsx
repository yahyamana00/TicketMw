'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';
import { ThemeToggle } from '@/components/theme-toggle';
import { TicketIcon, Loader2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { loginWithGoogle, register } from '@/lib/auth';
import { useRouter } from 'next/navigation';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  position: z.string().min(2, 'Position is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  country: z.string().min(2, 'Country is required'),
  city: z.string().min(2, 'City is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  gender: z.enum(['male', 'female', 'other']),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const handleGoogleSignup = async () => {
    try {
      const result = await loginWithGoogle();
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Successfully signed in with Google!',
        });
        router.push('/dashboard');
      } else {
        throw new Error(result.error?.message);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as Error).message || 'Failed to sign in with Google',
        variant: 'destructive',
      });
    }
  };

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      const result = await register(data.email, data.password, data.fullName);
      
      if (result.success) {
        toast({
          title: 'Account created successfully',
          description: result.message || 'Please check your email to verify your account.',
        });
        router.push('/verify');
      } else {
        throw new Error(result.error?.message);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as Error).message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Animated Background */}
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
              Join TicketMe
            </h2>
            <p className="text-white/80 max-w-md mx-auto">
              Create your account and start managing support tickets efficiently
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col bg-background overflow-auto">
        <div className="p-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <TicketIcon className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">TicketMe</span>
          </Link>
          <ThemeToggle />
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-blue-600 via-primary to-purple-600 bg-clip-text text-transparent animate-gradient">
                Create Account
              </h2>
              <p className="mt-2 text-muted-foreground">
                Join us and experience the next generation of customer support
              </p>
            </div>

            {/* Google Sign Up Button */}
            <div className="space-y-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleGoogleSignup}
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
                Sign up with Google
              </Button>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Rest of the form fields remain the same */}
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  {...register('fullName')}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="text-sm text-red-500">{errors.fullName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  {...register('position')}
                  placeholder="Software Engineer"
                />
                {errors.position && (
                  <p className="text-sm text-red-500">{errors.position.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  placeholder="+1 (555) 000-0000"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    {...register('country')}
                    placeholder="United States"
                  />
                  {errors.country && (
                    <p className="text-sm text-red-500">{errors.country.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...register('city')}
                    placeholder="New York"
                  />
                  {errors.city && (
                    <p className="text-sm text-red-500">{errors.city.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup
                  onValueChange={(value) => setValue('gender', value as 'male' | 'female' | 'other')}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
                {errors.gender && (
                  <p className="text-sm text-red-500">{errors.gender.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword')}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-semibold text-primary hover:text-primary/80"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}