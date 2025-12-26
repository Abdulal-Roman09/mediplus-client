import { USER_ROLE } from "@/contants/role";
import { DrawerItems, UserRole } from "@/types";
import {
    LayoutDashboard,
    Users,
    Stethoscope,
    CalendarCheck,
    Clock,
    Star,
    FileText,
    Heart,
    History,
    Settings,
    Pill,
    Syringe
} from "lucide-react";


export const drawerItems = (role: UserRole): DrawerItems[] => {
    const roleMenus: DrawerItems[] = [];

    switch (role) {
        case USER_ROLE.SUPER_ADMIN:
            roleMenus.push(
                {
                    title: "Dashboard",
                    path: `${role}`,
                    icon: LayoutDashboard,
                },
                {
                    title: "Manage Users",
                    path: `${role}/manage-users`,
                    icon: Users,
                }
            );
            break;

        case USER_ROLE.ADMIN:
            roleMenus.push(
                {
                    title: "Dashboard",
                    path: `${role}`,
                    icon: LayoutDashboard,
                },
                {
                    title: "Doctors",
                    path: `${role}/doctors`,
                    icon: Stethoscope,
                },
                {
                    title: "Specialties",
                    path: `${role}/specialties`,
                    icon: Pill,
                },
                {
                    title: "Appointments",
                    path: `${role}/appointments`,
                    icon: CalendarCheck,
                },
                {
                    title: "Schedules",
                    path: `${role}/schedules`,
                    icon: Clock,
                },
                {
                    title: "Reviews",
                    path: `${role}/reviews`,
                    icon: Star,
                }
            );
            break;

        case USER_ROLE.DOCTOR:
            roleMenus.push(
                {
                    title: "Dashboard",
                    path: `${role}`,
                    icon: LayoutDashboard,
                },
                {
                    title: "My Appointments",
                    path: `${role}/appointments`,
                    icon: CalendarCheck,
                },
                {
                    title: "Schedules",
                    path: `${role}/schedules`,
                    icon: Clock,
                },
                {
                    title: "Patients",
                    path: `${role}/patients`,
                    icon: Users,
                },
                {
                    title: "Prescriptions",
                    path: `${role}/prescriptions`,
                    icon: FileText,
                },
                {
                    title: "Reviews",
                    path: `${role}/reviews`,
                    icon: Star,
                }
            );
            break;

        case USER_ROLE.PATIENT:
            roleMenus.push(
                {
                    title: "Dashboard",
                    path: `${role}`,
                    icon: LayoutDashboard,
                },
                {
                    title: "Book Appointment",
                    path: `${role}/book-appointment`,
                    icon: CalendarCheck,
                },
                {
                    title: "My Appointments",
                    path: `${role}/my-appointments`,
                    icon: Heart,
                },
                {
                    title: "Appointment History",
                    path: `${role}/history`,
                    icon: History,
                },
                {
                    title: "Prescriptions",
                    path: `${role}/prescriptions`,
                    icon: FileText,
                },
                {
                    title: "Profile Settings",
                    path: `${role}/profile`,
                    icon: Settings,
                }
            );
            break;

        default:
            return [];
    }

    return roleMenus;
};