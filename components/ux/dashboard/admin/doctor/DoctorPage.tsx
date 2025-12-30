"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
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
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const { data: res } = useQuery<DoctorsApiResponse>({
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
      if ( genderFilter !== "All") {
        params.gender = genderFilter;
      }

      const queryString = new URLSearchParams(params).toString();
      const response = (await get(
        `/doctor?${queryString}`
      )) as DoctorsApiResponse;
      return response;
    },
  });

  const doctors: Doctor[] = res?.data || [];

  const hendelSearch = () => {
    setSearch(searchTerm);
    setPage(1);
  };

  return (
    <div className="">
      <DoctorPageHader onOpenModal={setIsOpenModel} />

      <div className="flex flex-col md:flex-row gap-4 my-6 items-end">
        {/* Search Input Section */}
        <div className="flex gap-2">
          <InputGroup>
            <InputGroupInput
              placeholder="Doctor Name Enter Hear..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  hendelSearch();
                }
              }}
            />
            <InputGroupAddon>
              <SearchIcon size={18} />
            </InputGroupAddon>
          </InputGroup>
          <Button onClick={hendelSearch}>Search</Button>
        </div>

        {/* Sorting Section */}
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
              <SelectItem value="asc">Newest First (Oldest)</SelectItem>
              <SelectItem value="desc">Oldest First (Latest)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Sorting gender */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">
            Sort by Gender
          </label>
          <Select
            value={genderFilter}
            onValueChange={(value: "MALE" | "FEMALE" | "All") => {
              setGenderFilter(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select your Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="MALE">MALE</SelectItem>
              <SelectItem value="FEMALE">FEMALE</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* all data display */}
      <div className="mt-10 border rounded-lg overflow-hidden">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="flex gap-10 items-center p-4 border-b last:border-0 hover:bg-gray-50 transition"
            >
              <p className="min-w-[200px]">
                <span className="font-bold text-gray-700">Name:</span>{" "}
                {doctor.name}
              </p>
              <p>
                <span className="font-bold text-gray-700">Email:</span>{" "}
                {doctor.email}
              </p>
              <p className="text-xs text-gray-400 ml-auto">
                Joined: {new Date(doctor.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <div className="p-10 text-center text-gray-500">
            কোনো তথ্য পাওয়া যায়নি।
          </div>
        )}
      </div>

      <CreateDoctorModel open={isOpenModel} onOpenChange={setIsOpenModel} />
    </div>
  );
}
