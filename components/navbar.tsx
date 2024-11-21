'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  TicketIcon, 
  Menu, 
  X, 
  Home,
  LayoutDashboard,
  CreditCard,
  Info,
  LogIn
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Features', href: '/#features', icon: LayoutDashboard },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Pricing', href: '/pricing', icon: CreditCard },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <TicketIcon className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl hidden sm:inline-block">TicketMe</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 top-14 z-50 md:hidden transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "translate-x-full",
          "bg-background border-t shadow-lg"
        )}
      >
        <nav className="container mx-auto px-4 py-6">
          <div className="space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 text-sm font-medium text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="h-px bg-border my-6" />
            <div className="space-y-4">
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In
                </Button>
              </Link>
              <Link href="/register" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}