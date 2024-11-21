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
  Search,
  Filter,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';
import { TicketList } from '@/components/tickets/ticket-list';
import { TicketFilters } from '@/components/tickets/ticket-filters';
import { getUserTickets } from '@/lib/tickets';
import type { Ticket } from '@/lib/tickets';

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
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
    // Apply search filter
    if (searchQuery && !ticket.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Apply status filter
    if (filters.status !== 'all' && ticket.status !== filters.status) {
      return false;
    }
    // Apply priority filter
    if (filters.priority !== 'all' && ticket.priority !== filters.priority) {
      return false;
    }
    return true;
  });

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
                className="w-full justify-start"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/tickets">
              <Button
                variant="ghost"
                className="w-full justify-start bg-accent"
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
            <h1 className="text-xl font-semibold">Tickets</h1>
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
          <div className="bg-card border rounded-lg shadow-sm">
            {/* Search and Filters */}
            <div className="p-6 border-b space-y-4">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tickets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <TicketFilters filters={filters} onFilterChange={setFilters} />
              </div>
            </div>

            {/* Tickets List */}
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