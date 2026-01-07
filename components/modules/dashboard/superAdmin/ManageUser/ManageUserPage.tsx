"use client";

import { columns } from "@/components/modules/dashboard/superAdmin/ManageUser/columns";
import { useGetUsers } from "@/components/modules/dashboard/superAdmin/ManageUser/getData";
import { DataTable } from "@/components/modules/dashboard/superAdmin/ManageUser/DataTable";

export default function ManageUserPage() {
  const { data, isLoading, isError, error } = useGetUsers();

  if (isLoading) return <div className="p-10">Loading users...</div>;
  if (isError)
    return <div className="p-10 text-red-500">Error: {error?.message}</div>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <DataTable columns={columns} data={data || []} />
    </div>
  );
}
