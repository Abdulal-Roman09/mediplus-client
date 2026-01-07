"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Doctor } from "@/interface/doctor";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Copy,
  User,
  Trash,
  MoreHorizontal,
  ArrowBigUpDashIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const getDoctorColumns = (
  handleDelete: (id: string) => void
): ColumnDef<Doctor>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ getValue }) => {
      const gender = getValue<string>();
      const style =
        gender === "FEMALE"
          ? "bg-green-100 text-green-800"
          : "bg-blue-100 text-blue-800";
      return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${style}`}>
          {gender}
        </span>
      );
    },
  },
  { accessorKey: "name", header: "Name" },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ getValue }) => (
      <div className="text-primary italic">{getValue<string>()}</div>
    ),
  },
  { accessorKey: "contactNumber", header: "Contact" },
  {
    id: "actions",
    cell: ({ row }) => {
      const doctor = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-white shadow-lg border p-2"
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(doctor.id)}
            >
              <Copy className="mr-2 h-4 w-4" /> Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" /> View Doctor
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ArrowBigUpDashIcon className="mr-2 h-4 w-4" /> Update
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleDelete(doctor.id)}
              className="text-red-600 focus:bg-red-50"
            >
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
