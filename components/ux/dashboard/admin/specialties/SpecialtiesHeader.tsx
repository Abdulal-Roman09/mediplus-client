import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SpecialtiesHeaderProps {
  onOpenModal: () => void;
}

export function SpecialtiesHeader({ onOpenModal }: SpecialtiesHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <h2 className="text-2xl font-bold tracking-tight">Specialties</h2>
      <Button onClick={onOpenModal} className="gap-2">
        <Plus className="size-4" />
        Create Specialty
      </Button>
    </div>
  );
}