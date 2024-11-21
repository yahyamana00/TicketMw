import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatDistanceToNow } from 'date-fns';
import type { Ticket } from '@/lib/tickets';

interface TicketListProps {
  tickets: Ticket[];
  isLoading: boolean;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const statusColors = {
  open: 'bg-green-100 text-green-800',
  'in-progress': 'bg-purple-100 text-purple-800',
  resolved: 'bg-gray-100 text-gray-800',
};

export function TicketList({ tickets, isLoading }: TicketListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    );
  }

  if (tickets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">No tickets found</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket) => (
          <TableRow key={ticket.$id}>
            <TableCell className="font-medium">{ticket.title}</TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className={priorityColors[ticket.priority]}
              >
                {ticket.priority}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge
                variant="secondary"
                className={statusColors[ticket.status]}
              >
                {ticket.status}
              </Badge>
            </TableCell>
            <TableCell className="text-gray-500">
              {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}