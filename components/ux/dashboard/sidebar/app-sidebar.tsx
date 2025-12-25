"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Logo from "../../components/logo";
import { usePathname } from "next/navigation";
import { drawerItems } from "@/utils/drawerItems";
import { getUserInfo } from "@/services/auth.serivce";

export function AppSidebar() {
  const pathname = usePathname();
  const { role } = getUserInfo();
  const menuItems = drawerItems(role);

  return (
    <Sidebar collapsible="icon">
      {/* Sidebar Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <Logo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator className="my-2" />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const targetPath = `/dashboard/${item.path}`.replace(
                  /\/+/g,
                  "/"
                );
                const isActive =
                  pathname === targetPath ||
                  (item.path !== "" && pathname.startsWith(`${targetPath}/`));

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                      className={`relative flex items-center gap-3 px-4 py-2 transition-all duration-200 group
                      ${
                        isActive
                          ? "bg-primary/10 text-primary font-medium hover:bg-primary/15"
                          : "hover:bg-accent hover:text-accent-foreground "
                      }`}
                    >
                      <Link href={targetPath}>
                        <item.icon
                          className={`size-5 ${isActive ? "text-primary" : ""}`}
                        />
                        <span>{item.title}</span>

                        {/* Active Indicator*/}
                        {isActive && (
                          <span className="absolute right-0 h-8 w-full   bg-primary/20 rounded " />
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
