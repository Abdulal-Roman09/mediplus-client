import DashboardLayoutPage from "@/components/modules/dashboard/DashboardLayout/DashboardNavbar/DashboardLayoutpage";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardLayoutPage>{children}</DashboardLayoutPage>;
}
