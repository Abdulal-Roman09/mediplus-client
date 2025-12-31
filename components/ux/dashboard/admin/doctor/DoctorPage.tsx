"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import {
  ArrowBigUpDashIcon,
  ArrowUpDown,
  Copy,
  Mail,
  MoreHorizontal,
  Phone,
  SearchIcon,
  Trash,
  User,
  IdCardIcon,
} from "lucide-react";

import { toast } from "sonner";
import React, { useState } from "react";
import { del, get } from "@/services/api/api";
import { Button } from "@/components/ui/button";
import DoctorPageHader from "./DoctorPageHader";
import { Checkbox } from "@/components/ui/checkbox";
import CreateDoctorModel from "./CreateDoctorModel";
import { Doctor, DoctorsApiResponse } from "@/interface/doctor";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function DoctorPage() {
  const queryClient = useQueryClient();
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [rowSelection, setRowSelection] = React.useState({});

  const { data: res, isLoading } = useQuery<DoctorsApiResponse>({
    queryKey: ["doctors", page, limit],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      return (await get(`/doctor?${params.toString()}`)) as DoctorsApiResponse;
    },
    keepPreviousData: true,
  });

  const doctors: Doctor[] = res?.data || [];
  const total = res?.meta.total || 0;
  const serverPage = res?.meta.page || 1;
  const serverLimit = res?.meta.limit || 10;
  const totalPages = total > 0 ? Math.ceil(total / serverLimit) : 1;

  const handleDelete = async (id: string) => {
    try {
      await del(`/doctor/${id}`);
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      toast.success("Doctor deleted successfully", { position: "top-center" });
    } catch (err) {
      toast.error("Doctor deletion failed", { position: "top-center" });
    }
  };

  const handleLimitChange = (value: string) => {
    setLimit(Number(value));
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, serverPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const startEntry = total === 0 ? 0 : (serverPage - 1) * serverLimit + 1;
  const endEntry = Math.min(serverPage * serverLimit, total);

  const columns: ColumnDef<Doctor>[] = [
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
      header: "ID",
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ getValue }) => {
        const gender = getValue<"MALE" | "FEMALE">();
        return (
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
              gender === "FEMALE"
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : gender === "MALE"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
            }`}
          >
            {gender || "Unknown"}
          </span>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ getValue }) => (
        <div className="font-medium text-primary italic">
          {getValue<string>()}
        </div>
      ),
    },
    {
      accessorKey: "contactNumber",
      header: "Contact Number",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const doctor = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-60 p-2 bg-white rounded-xl shadow-lg border border-gray-100"
            >
              <DropdownMenuLabel className="px-2 py-1.5 text-sm font-semibold">
                Actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="my-1 h-px bg-slate-200" />

              <DropdownMenuItem
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm outline-none transition-colors focus:bg-slate-100"
                onClick={() => navigator.clipboard.writeText(doctor.id)}
              >
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy ID</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1 h-px bg-slate-200" />

              <DropdownMenuItem className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm outline-none transition-colors focus:bg-slate-100">
                <User className="mr-2 h-4 w-4" />
                <span>View doctor</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1 h-px bg-slate-200" />

              <DropdownMenuItem className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm outline-none transition-colors focus:bg-slate-100">
                <ArrowBigUpDashIcon className="mr-2 h-4 w-4" />
                <span>Update</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-1 h-px bg-slate-200" />

              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                onClick={() => handleDelete(doctor.id)}
                className="flex cursor-pointer items-center rounded-md px-2 py-2 text-sm font-medium text-red-600 outline-none transition-colors focus:bg-red-50 focus:text-red-700"
              >
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: doctors,
    columns,
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
  });

  return (
    <div className="space-y-6">
      <DoctorPageHader onOpenModal={() => setIsOpenModel(true)} />
      <CreateDoctorModel open={isOpenModel} onOpenChange={setIsOpenModel} />

      {/* Search */}
      <div className="flex items-center gap-4">
        <InputGroup className="max-w-sm">
          <InputGroupInput
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search all columns..."
            type="search"
          />
          <InputGroupAddon>
            <SearchIcon className="size-4" />
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    }
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
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

                      {header.column.getCanSort() && (
                        <>
                          {header.column.getIsSorted() === "asc" && (
                            <ArrowUpDown className="size-4 rotate-180" />
                          )}
                          {header.column.getIsSorted() === "desc" && (
                            <ArrowUpDown className="size-4" />
                          )}
                          {!header.column.getIsSorted() && (
                            <ArrowUpDown className="size-4 opacity-40" />
                          )}
                        </>
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
                  Loading doctors...
                </TableCell>
              </TableRow>
            ) : doctors.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No doctors found.
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

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page</span>
          <Select value={limit.toString()} onValueChange={handleLimitChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={(e) => {
                    e.preventDefault();
                    if (serverPage > 1) handlePageChange(serverPage - 1);
                  }}
                  className={
                    serverPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {getPageNumbers().map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(pageNum);
                    }}
                    isActive={pageNum === serverPage}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {totalPages > 5 && serverPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={(e) => {
                    e.preventDefault();
                    if (serverPage < totalPages)
                      handlePageChange(serverPage + 1);
                  }}
                  className={
                    serverPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <div className="text-sm text-muted-foreground">
          Showing {startEntry} to {endEntry} of {total} doctors
        </div>
      </div>
    </div>
  );
}
