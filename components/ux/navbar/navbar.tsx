"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import Logo from "../components/logo";
import { navLinks } from "./navLink";
import { getUserInfo, removeUser } from "@/services/auth.serivce";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  const userInfo = getUserInfo();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    removeUser();
    router.refresh();
    toast.error("LogOut Successfully", {
      position: "top-center",
      duration: 2500,
      icon: <LogOut size={16} />,
    });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <ModeToggle />

            {userInfo?.email ? (
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button>
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-screen border-t" : "max-h-0"
        )}
      >
        <div className="space-y-1 px-4 py-4 pb-6 bg-background">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-accent hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="flex flex-col space-y-4 pt-6 px-3">
            <ModeToggle />

            {userInfo?.email ? (
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="w-full justify-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Link href="/login" onClick={() => setIsOpen(false)}>
                <Button className="w-full justify-center">
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
