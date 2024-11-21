'use client';

import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
            Try TicketMe for Free
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            We&apos;re currently in beta, offering our full platform at no cost while we perfect the experience
          </p>
        </div>

        {/* Current Offer */}
        <div className="max-w-lg mx-auto mb-16">
          <div className="relative">
            {/* Animated background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-blue-500/10 animate-gradient rounded-2xl blur-xl"></div>
            </div>
            
            {/* Card content */}
            <div className="relative bg-card border rounded-2xl p-8 shadow-lg">
              <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4">
                Beta Access
              </div>
              <h2 className="text-2xl font-bold mb-4">Free Trial Period</h2>
              <p className="text-muted-foreground mb-6">
                Experience all premium features while we&apos;re in beta
              </p>
              
              <div className="space-y-3 mb-8">
                {[
                  'Unlimited Tickets',
                  'AI-Powered Resolution',
                  'Real-time Analytics',
                  'Priority Support',
                  'Team Collaboration',
                  'Custom Branding'
                ].map((feature) => (
                  <div key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button asChild className="w-full">
                <Link href="/register">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Future Plans */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Coming Soon: SaaS Pricing</h2>
          <p className="text-muted-foreground mb-8">
            In the future, we&apos;ll offer flexible pricing plans designed to scale with your business:
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                description: 'Perfect for small businesses',
                features: ['Up to 500 tickets/month', 'Basic Analytics', 'Email Support']
              },
              {
                name: 'Professional',
                description: 'Ideal for growing teams',
                features: ['Unlimited tickets', 'Advanced Analytics', 'Priority Support']
              },
              {
                name: 'Enterprise',
                description: 'For large organizations',
                features: ['Custom Solutions', 'Dedicated Support', 'SLA Guarantees']
              }
            ].map((plan) => (
              <div key={plan.name} className="bg-card border rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <ul className="text-sm space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-2xl mx-auto mt-24">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">How long will the beta period last?</h3>
              <p className="text-muted-foreground">
                We&apos;re committed to providing a free beta period while we perfect our platform. All beta users will receive advance notice before any pricing changes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Will my data be transferred when pricing is implemented?</h3>
              <p className="text-muted-foreground">
                Yes, all your data and settings will be preserved when we transition to paid plans. Beta users will receive special consideration for loyalty pricing.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What happens after the beta period?</h3>
              <p className="text-muted-foreground">
                You&apos;ll have the option to choose from our flexible pricing tiers or continue with a free basic plan. We&apos;ll ensure a smooth transition for all users.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}