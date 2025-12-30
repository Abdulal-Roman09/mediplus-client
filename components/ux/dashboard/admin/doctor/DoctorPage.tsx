"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/services/api/api";
import { Doctor, DoctorsApiResponse } from "@/interface/doctor";
import {
  ArrowUpDown,
  IdCardIcon,
  Mail,
  Phone,
  SearchIcon,
  User,
} from "lucide-react";

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
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import CreateDoctorModel from "./CreateDoctorModel";
import DoctorPageHader from "./DoctorPageHader";
import { Button } from "@/components/ui/button";

const columns: ColumnDef<Doctor>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ getValue }) => getValue(),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ getValue }) => getValue(),
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
    cell: ({ getValue }) => getValue(),
  },
];

export default function DoctorPage() {
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

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
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
  });

  const handleSearch = () => {
    setGlobalFilter(searchInput);
  };

  return (
    <div className="p-6 space-y-6">
      <DoctorPageHader onOpenModal={() => setIsOpenModel(true)} />
      <CreateDoctorModel open={isOpenModel} onOpenChange={setIsOpenModel} />

      <div className="flex items-center gap-4">
        <InputGroup className="max-w-sm">
          <InputGroupInput
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="Search all columns..."
            type="search"
          />
          <InputGroupAddon>
            <SearchIcon
              onClick={handleSearch}
              className="size-4 cursor-pointer"
            />
          </InputGroupAddon>
        </InputGroup>

        <Button onClick={handleSearch}>
          <SearchIcon className="size-4" />
        </Button>
      </div>

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
            ) : table.getRowModel().rows.length === 0 ? (
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
    </div>
  );
}
