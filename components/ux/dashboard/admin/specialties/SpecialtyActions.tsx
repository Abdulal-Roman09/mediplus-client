import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Trash2, Loader2 } from "lucide-react";

interface SpecialtyActionsProps {
  id: string;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export function SpecialtyActions({ id, onDelete, isDeleting }: SpecialtyActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <EllipsisVertical className="h-4 w-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="text-destructive focus:text-destructive cursor-pointer"
          onClick={() => onDelete(id)}
          disabled={isDeleting}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Specialty
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}