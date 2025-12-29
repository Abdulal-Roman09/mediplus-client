import { Plus } from "lucide-react"; // Missing import added
import { Button } from "@/components/ui/button";

interface DoctorPageHeaderProps {
  onOpenModal: () => void;
}

export default function DoctorPageHeader({
  onOpenModal,
}: DoctorPageHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full mb-6">
      <div>
        <h1 className="text-2xl font-bold">Doctors</h1>
      </div>
      <div>
        <Button onClick={onOpenModal}>
          <Plus className="mr-2 h-4 w-4" /> Create Doctor
        </Button>
      </div>
    </div>
  );
}
