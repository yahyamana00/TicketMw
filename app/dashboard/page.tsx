'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  TicketIcon, 
  Plus, 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut,
  MessageCircle,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { TicketList } from '@/components/tickets/ticket-list';
import { TicketFilters } from '@/components/tickets/ticket-filters';
import { getUserTickets } from '@/lib/tickets';
import type { Ticket } from '@/lib/tickets';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
  });

  useEffect(() => {
    async function loadTickets() {
      try {
        const result = await getUserTickets();
        if (result.success) {
          setTickets(result.data);
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadTickets();
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    if (filters.status !== 'all' && ticket.status !== filters.status) return false;
    if (filters.priority !== 'all' && ticket.priority !== filters.priority) return false;
    return true;
  });

  const stats = [
    {
      title: 'Total Tickets',
      value: tickets.length,
      icon: MessageCircle,
      color: 'text-blue-500',
      gradient: 'from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      title: 'Open Tickets',
      value: tickets.filter(t => t.status === 'open').length,
      icon: AlertCircle,
      color: 'text-yellow-500',
      gradient: 'from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900',
      borderColor: 'border-yellow-200 dark:border-yellow-800'
    },
    {
      title: 'In Progress',
      value: tickets.filter(t => t.status === 'in-progress').length,
      icon: Clock,
      color: 'text-purple-500',
      gradient: 'from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900',
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    {
      title: 'Resolved',
      value: tickets.filter(t => t.status === 'resolved').length,
      icon: CheckCircle2,
      color: 'text-green-500',
      gradient: 'from-green-50 to-green-100 dark:from-green-950 dark:to-green-900',
      borderColor: 'border-green-200 dark:border-green-800'
    }
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card">
        <div className="h-full flex flex-col">
          <div className="h-14 flex items-center px-4 border-b">
            <Link className="flex items-center space-x-2" href="/">
              <TicketIcon className="h-6 w-6 text-primary" />
              <span className="font-semibold">TicketMe</span>
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="w-full justify-start bg-accent"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/tickets">
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <TicketIcon className="mr-2 h-4 w-4" />
                Tickets
              </Button>
            </Link>
            <Link href="/users">
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <Users className="mr-2 h-4 w-4" />
                Users
              </Button>
            </Link>
            <Link href="/settings">
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </nav>
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1">
        <header className="h-14 border-b bg-card">
          <div className="h-full px-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/submit-ticket">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Ticket
                </Button>
              </Link>
            </div>
          </div>
        </header>
        
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={cn(
                    "relative overflow-hidden rounded-lg border p-6",
                    "bg-gradient-to-br",
                    stat.gradient,
                    stat.borderColor
                  )}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.title}
                      </p>
                      <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                    </div>
                    <Icon className={cn("h-6 w-6", stat.color)} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Tickets List */}
          <div className="bg-card border rounded-lg shadow-sm">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Recent Tickets</h2>
              <TicketFilters filters={filters} onFilterChange={setFilters} />
            </div>
            <div className="p-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <TicketList tickets={filteredTickets} isLoading={false} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}