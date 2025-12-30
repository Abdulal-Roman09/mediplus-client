"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import CreateDoctorModel from "./CreateDoctorModel";
import DoctorPageHader from "./DoctorPageHader";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/services/api/api";
import { Doctor, DoctorsApiResponse } from "@/interface/doctor";
import {
  IdCardIcon,
  Mail,
  Phone,
  Search as SearchIcon,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<Doctor>();

const columns = [
  columnHelper.accessor("id", {
    header: () => (
      <div className="flex items-center">
        <IdCardIcon className="mr-2 size-4" />
        ID
      </div>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("name", {
    header: () => (
      <div className="flex items-center">
        <User className="mr-2 size-4" />
        Name
      </div>
    ),
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: () => (
      <div className="flex items-center">
        <Mail className="mr-2 size-4" />
        Email
      </div>
    ),
    cell: (info) => (
      <div className="text-primary italic font-medium">{info.getValue()}</div>
    ),
  }),
  columnHelper.accessor("contactNumber", {
    header: () => (
      <div className="flex items-center">
        <Phone className="mr-2 size-4" />
        Contact Number
      </div>
    ),
    cell: (info) => info.getValue(),
  }),
];

export default function DoctorPage() {
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [genderFilter, setGenderFilter] = useState<"MALE" | "FEMALE" | "All">(
    "All"
  );

  const { data: res, isLoading } = useQuery<DoctorsApiResponse>({
    queryKey: [
      "doctors",
      { page, limit, search, genderFilter, sortBy, sortOrder },
    ],
    queryFn: async () => {
      const params: Record<string, string> = {
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        sortOrder,
      };

      if (search.trim()) params.searchTerm = search.trim();
      if (genderFilter !== "All") params.gender = genderFilter;

      const queryString = new URLSearchParams(params).toString();
      return (await get(`/doctor?${queryString}`)) as DoctorsApiResponse;
    },
  });

  const doctors: Doctor[] = res?.data || [];

  const table = useReactTable({
    data: doctors,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleSearch = () => {
    setSearch(searchTerm);
    setPage(1);
  };

  return (
    <div className="p-6">
      <DoctorPageHader onOpenModal={() => setIsOpenModel(true)} />
      <CreateDoctorModel open={isOpenModel} onOpenChange={setIsOpenModel} />

      <div className="flex flex-col md:flex-row gap-4 my-6 items-end">
        {/* Search Input */}
        <div className="flex gap-2">
          <InputGroup>
            <InputGroupInput
              placeholder="Doctor Name Enter Here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <InputGroupAddon>
              <SearchIcon size={18} />
            </InputGroupAddon>
          </InputGroup>
          <Button onClick={handleSearch}>Search</Button>
        </div>

        {/* Sort by Date */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">
            Sort by Date
          </label>
          <Select
            value={sortOrder}
            onValueChange={(value: "asc" | "desc") => {
              setSortOrder(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Oldest First</SelectItem>
              <SelectItem value="desc">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filter by Gender */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">
            Filter by Gender
          </label>
          <Select
            value={genderFilter}
            onValueChange={(value: any) => {
              setGenderFilter(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Genders" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          {/* Optional caption */}
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
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                  No doctors found matching your filters.
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

      {/* Optional: Pagination controls can be added here later */}
    </div>
  );
}
