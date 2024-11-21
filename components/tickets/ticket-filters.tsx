import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TicketFiltersProps {
  filters: {
    status: string;
    priority: string;
  };
  onFilterChange: (filters: any) => void;
}

export function TicketFilters({ filters, onFilterChange }: TicketFiltersProps) {
  return (
    <div className="flex gap-4">
      <Select
        value={filters.status}
        onValueChange={(value) =>
          onFilterChange({ ...filters, status: value })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="open">Open</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="resolved">Resolved</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.priority}
        onValueChange={(value) =>
          onFilterChange({ ...filters, priority: value })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by priority" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value="low">Low</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="high">High</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}