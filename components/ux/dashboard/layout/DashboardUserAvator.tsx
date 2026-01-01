"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { removeUser } from "@/services/auth.serivce";
import { LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/services/api/api";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "DOCTOR" | "PATIENT" | string;
  profilePhoto: string;
  contactNumber?: string;
  status: "ACTIVE" | "INACTIVE";
  needPasswordChange: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function DashboardUserAvator() {
  const router = useRouter();

  const { data, isLoading } = useQuery<IUser>({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await get("/user/me");
      return res?.data as IUser;
    },
  });
  if (isLoading) return null;

  const {
    name = "User",
    email = "user@example.com",
    role = "Member",
    profilePhoto,
  } = data || {};

  const initials = name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = () => {
    removeUser();
    toast.error("Logout Successfully", {
      position: "top-center",
      duration: 2500,
      icon: <LogOut size={16} />,
    });
    router.push("/");
    router.refresh();
  };
  const userRole = data?.role?.toLowerCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profilePhoto} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">Hey, {name}!</p>
            <p className="text-sm text-muted-foreground">{email}</p>
            <p className="text-green-500"> {role}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={`/dashboard/${userRole}/profile`} className="flex gap-4">
            <User className="h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleLogout} className="text-destructive">
          <LogOut className="h-4 w-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
