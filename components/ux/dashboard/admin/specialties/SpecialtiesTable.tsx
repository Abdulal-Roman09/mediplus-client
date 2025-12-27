import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { SpecialtyTableRow } from "./SpecialtyTableRow";
import { Specialty } from "@/interface/spilaties";

interface SpecialtiesTableProps {
  data: Specialty[] | undefined;
  isPending: boolean;
  filteredData: Specialty[];
  searchTerm: string;
  onDelete: (id: string) => void;
  deletingId: string | null;
}

export function SpecialtiesTable({
  data,
  isPending,
  filteredData,
  searchTerm,
  onDelete,
  deletingId,
}: SpecialtiesTableProps) {
  if (isPending) {
    return (
      <TableRow>
        <TableCell colSpan={3} className="h-32 text-center">
          <Loader2 className="mx-auto size-6 animate-spin text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">Loading data...</p>
        </TableCell>
      </TableRow>
    );
  }

  if (filteredData.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={3} className="h-32 text-center text-muted-foreground">
          {searchTerm ? "No results found for your search." : "No specialties available."}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <>
      {filteredData.map((item) => (
        <SpecialtyTableRow
          key={item.id}
          item={item}
          onDelete={onDelete}
          isDeleting={deletingId === item.id}
        />
      ))}
    </>
  );
}