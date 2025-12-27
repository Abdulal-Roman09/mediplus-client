import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface SpecialtiesFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  limit: string;
  onLimitChange: (value: string) => void;
}

export function SpecialtiesFilters({
  searchTerm,
  onSearchChange,
  limit,
  onLimitChange,
}: SpecialtiesFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-card p-4 rounded-lg border">
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search specialties..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <span className="text-sm text-muted-foreground whitespace-nowrap">Show:</span>
        <Select value={limit} onValueChange={onLimitChange}>
          <SelectTrigger className="w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}