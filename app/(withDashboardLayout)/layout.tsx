import DashboardLayoutPage from "@/components/ux/dashboard/layout/DashboardLayoutpage";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardLayoutPage>{children}</DashboardLayoutPage>;
}
