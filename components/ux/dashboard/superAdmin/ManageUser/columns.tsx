"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  User,
  ShieldCheck,
  UserCog,
  Copy,
  Edit,
  Trash2,
  ArrowUpDown,
} from "lucide-react";
import { Checkbox } from "@radix-ui/react-checkbox";

export type IUser = {
  id: string;
  name: string;
  status: "ACTIVE" | "INACTIVE" | "DELETE";
  email: string;
  role: "DOCTOR" | "PATIENT" | "ADMIN";
  createdAt: string | Date;
};

export const columns: ColumnDef<IUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const rawRole = row.getValue("role") as string;
      const role = (rawRole?.toUpperCase() || "PATIENT") as IUser["role"];

      const roleConfig = {
        ADMIN: {
          style: "bg-indigo-100 text-indigo-700 border-indigo-200",
          icon: <ShieldCheck className="w-3 h-3 mr-1" />,
        },
        DOCTOR: {
          style: "bg-emerald-100 text-emerald-700 border-emerald-200",
          icon: <UserCog className="w-3 h-3 mr-1" />,
        },
        PATIENT: {
          style: "bg-sky-100 text-sky-700 border-sky-200",
          icon: <User className="w-3 h-3 mr-1" />,
        },
      };
      const config = roleConfig[role] || roleConfig.PATIENT;

      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.style}`}
        >
          {config.icon}
          {role}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Account Creation Date",
    cell: ({ row }) => {
      const dateValue = row.getValue("createdAt");
      if (!dateValue) return "N/A";
      try {
        const date = new Date(dateValue as string);
        return (
          <span className="text-gray-600 text-sm">
            {date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        );
      } catch {
        return "Invalid Date";
      }
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = (
        row.getValue("status") as string
      )?.toUpperCase() as IUser["status"];

      const statusConfig: Record<string, string> = {
        ACTIVE: "bg-green-50 text-green-700 border-green-200 ring-green-500/10",
        INACTIVE:
          "bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/10",
        DELETE: "bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/10",
      };

      const currentStatusStyle =
        statusConfig[status] || "bg-gray-50 text-gray-700 border-gray-200";

      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold border ring-1 ring-inset ${currentStatusStyle}`}
        >
          <span
            className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
              status === "ACTIVE"
                ? "bg-green-600"
                : status === "INACTIVE"
                ? "bg-amber-600"
                : status === "DELETE"
                ? "bg-rose-600"
                : "bg-gray-600"
            }`}
          />
          {status || "UNKNOWN"}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
              <MoreHorizontal className="h-4 w-4 text-gray-500" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              <Copy className="mr-2 h-4 w-4" /> Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" /> Edit User
            </DropdownMenuItem>
            <DropdownMenuItem className="text-rose-600 focus:bg-rose-50 focus:text-rose-600">
              <Trash2 className="mr-2 h-4 w-4" /> Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
