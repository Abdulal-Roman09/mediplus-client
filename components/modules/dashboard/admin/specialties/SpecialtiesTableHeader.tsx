import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SpecialtiesTableHeader() {
  return (
    <TableHeader className="bg-primary/80">
      <TableRow>
        <TableHead className="w-[100px] pl-6 text-white">Icon</TableHead>
        <TableHead className="text-center text-white">Specialty Name</TableHead>
        <TableHead className="text-right text-white">Action</TableHead>
      </TableRow>
    </TableHeader>
  );
}
