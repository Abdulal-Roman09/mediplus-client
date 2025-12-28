"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ux/navbar/ModeToggle";
import { getUserInfo } from "@/services/auth.serivce";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { AppSidebar } from "./sidebar/app-sidebar";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import DashboardUserAvator from "./DashboardUserAvator";

export default function DashboardLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const info = getUserInfo();
    setUser(info);
    setLoading(false);
  }, []);

  // Show skeleton UI while user data is loading (improves perceived performance)
  if (loading) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          {/* Header in loading state */}
          <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 sticky top-0 bg-background z-10">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <span className="text-sm font-medium">Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              {/* Skeleton placeholders for avatar and text */}
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-24" />
            </div>
          </header>
          {/* Content area loading skeleton */}
          <div className="p-6">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-64 w-full" />
          </div>
        </main>
      </SidebarProvider>
    );
  }

  // Placeholder for unread notification count — replace with real data later
  const unreadNotifications = 3;

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        {/* Header section */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b px-4 sticky top-0 bg-background z-10">
          {/* Left side: sidebar trigger and page title */}
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <span className="text-sm font-medium">Dashboard</span>
          </div>

          {/* Right side: notifications, mode toggle, and user menu */}
          <div className="flex items-center gap-4">
            {/* Notification bell icon with badge */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    No new notifications.
                  </p>
                  {/* Real notification list will be added here later */}
                </div>
              </PopoverContent>
            </Popover>
            {/* Dark/Light mode toggle */}
            <ModeToggle />
            {/* User profile dropdown menu */}
            <DashboardUserAvator user={user} />
          </div>
        </header>

        {/* Main page content area — where child pages are rendered */}
        <div className="p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
