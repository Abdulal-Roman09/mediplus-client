"use client";

import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Table, TableBody, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { get, del } from "@/services/api/api";
import { Specialty } from "@/interface/spilaties";
import { SpecialtiesHeader } from "@/components/ux/dashboard/admin/specialties/SpecialtiesHeader";
import { CreateSpecialtyModal } from "@/components/ux/dashboard/admin/specialties/CreateSpecialtyModal";
import { SpecialtiesFilters } from "@/components/ux/dashboard/admin/specialties/SpecialtiesFilters";
import { SpecialtiesTable } from "@/components/ux/dashboard/admin/specialties/SpecialtiesTable";


export default function SpecialtiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState("10");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data, isPending } = useQuery<Specialty[]>({
    queryKey: ["specialties"],
    queryFn: async () => {
      const res = await get("/specialties");
      return res.data;
    },
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered.slice(0, Number(limit));
  }, [data, searchTerm, limit]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    setDeletingId(id);
    try {
      await del(`/specialties/${id}`);
      toast.success("Deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["specialties"] });
    } catch {
      toast.error("Failed to delete.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <SpecialtiesHeader onOpenModal={() => setIsModalOpen(true)} />

      <CreateSpecialtyModal open={isModalOpen} onOpenChange={setIsModalOpen} />

      <SpecialtiesFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        limit={limit}
        onLimitChange={setLimit}
      />

      <div className="rounded-md border bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[100px]">Icon</TableHead>
              <TableHead>Specialty Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <SpecialtiesTable
              data={data}
              isPending={isPending}
              filteredData={filteredData}
              searchTerm={searchTerm}
              onDelete={handleDelete}
              deletingId={deletingId}
            />
          </TableBody>
        </Table>
      </div>

      <div className="text-xs text-muted-foreground px-2">
        Showing {filteredData.length} of {data?.length || 0} specialties
      </div>
    </div>
  );
}