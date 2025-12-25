import { USER_ROLE } from "@/contants/role";
import { LucideIcon } from "lucide-react";

export type IMeta = {
    page: number;
    limit: number;
    total: number;
};

export type UserRole = keyof typeof USER_ROLE;


type IconComponent = LucideIcon;

export interface DrawerItems {
    title: string;
    path: string;
    parentPath?: string;
    icon?: IconComponent;
    child?: DrawerItems[];
}