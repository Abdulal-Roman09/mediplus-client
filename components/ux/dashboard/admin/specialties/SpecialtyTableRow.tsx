import { TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import { SpecialtyActions } from "./SpecialtyActions";
import { Specialty } from "@/interface/spilaties";

interface SpecialtyTableRowProps {
  item: Specialty;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export function SpecialtyTableRow({ item, onDelete, isDeleting }: SpecialtyTableRowProps) {
  return (
    <TableRow className="hover:bg-muted/30 transition-colors">
      <TableCell>
        {item.file ? (
          <Image
            src={item.file}
            alt={item.title}
            width={40}
            height={40}
            className="rounded-lg object-cover border bg-gray-50"
          />
        ) : (
          <div className="size-10 bg-muted rounded-lg border border-dashed flex items-center justify-center text-[10px] text-muted-foreground">
            No Img
          </div>
        )}
      </TableCell>
      <TableCell className="font-medium text-slate-700">{item.title}</TableCell>
      <TableCell className="text-right">
        <SpecialtyActions id={item.id} onDelete={onDelete} isDeleting={isDeleting} />
      </TableCell>
    </TableRow>
  );
}