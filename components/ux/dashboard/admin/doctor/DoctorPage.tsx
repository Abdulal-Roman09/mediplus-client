"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/services/api/api";
import { Doctor, DoctorsApiResponse } from "@/interface/doctor";
import { ArrowUpDown, IdCardIcon, Mail, Phone, User } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";

import CreateDoctorModel from "./CreateDoctorModel";
import DoctorPageHader from "./DoctorPageHader";

const columnHelper = createColumnHelper<Doctor>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    enableSorting: true,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: "Name",
    enableSorting: true,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    enableSorting: true,
    cell: (info) => (
      <div className="font-medium text-primary italic">{info.getValue()}</div>
    ),
  }),
  columnHelper.accessor("contactNumber", {
    header: "Contact Number",
    enableSorting: true,
    cell: (info) => info.getValue(),
  }),
];

export default function DoctorPage() {
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: res, isLoading } = useQuery<DoctorsApiResponse>({
    queryKey: ["doctors"],
    queryFn: () => get("/doctor"),
  });

  const doctors: Doctor[] = res?.data || [];

  const table = useReactTable({
    data: doctors,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="p-6 space-y-6">
      <DoctorPageHader onOpenModal={() => setIsOpenModel(true)} />
      <CreateDoctorModel open={isOpenModel} onOpenChange={setIsOpenModel} />

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableCaption className="text-left pb-4">
            {isLoading
              ? "Loading doctors..."
              : doctors.length === 0
              ? "No doctors found."
              : `Showing ${doctors.length} doctor${
                  doctors.length !== 1 ? "s" : ""
                }`}
          </TableCaption>

          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {/* Custom icon + header text */}
                      {header.column.id === "id" && (
                        <IdCardIcon className="size-4" />
                      )}
                      {header.column.id === "name" && (
                        <User className="size-4" />
                      )}
                      {header.column.id === "email" && (
                        <Mail className="size-4" />
                      )}
                      {header.column.id === "contactNumber" && (
                        <Phone className="size-4" />
                      )}

                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      {/* Sorting indicator */}
                      {{
                        asc: <ArrowUpDown className="size-4 rotate-180" />,
                        desc: <ArrowUpDown className="size-4" />,
                      }[header.column.getIsSorted() as string] ?? (
                        <ArrowUpDown className="size-4 opacity-40" />
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No doctors available.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/50">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
