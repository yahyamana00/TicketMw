import Link from 'next/link';
import { TicketForm } from '@/components/tickets/ticket-form';
import { TicketIcon } from 'lucide-react';

export default function SubmitTicketPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between border-b">
        <Link className="flex items-center justify-center" href="/">
          <TicketIcon className="h-6 w-6" />
          <span className="ml-2 text-lg font-semibold">TicketMe</span>
        </Link>
        <Link href="/login" className="text-sm text-muted-foreground hover:text-primary">
          Sign in to track your tickets
        </Link>
      </header>
      <main className="flex-1 container max-w-3xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Submit a Support Request</h1>
            <p className="text-muted-foreground mt-2">
              No account required. However, creating an account will allow you to track and manage your tickets.
            </p>
          </div>
          <div className="bg-card border rounded-lg p-6">
            <TicketForm isAuthenticated={false} />
          </div>
        </div>
      </main>
    </div>
  );
}