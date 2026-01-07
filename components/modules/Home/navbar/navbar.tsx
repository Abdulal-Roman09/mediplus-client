"use client";

import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { navLinks } from "./navLink";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import Logo from "../../sharedComponents/logo";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const AuthButton = dynamic(() => import("./AuthButton"), { ssr: false });
  const [isOpen, setIsOpen] = React.useState(false);

  const isActiveLink = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => {
              const active = isActiveLink(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-primary",
                    active
                      ? " after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <ModeToggle />
            <AuthButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden rounded-md p-2 text-muted-foreground hover:bg-accent"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300",
          isOpen ? "max-h-screen border-t" : "max-h-0"
        )}
      >
        <div className="space-y-1 px-4 py-4 bg-background">
          {navLinks.map((link) => {
            const active = isActiveLink(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium transition-colors",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent"
                )}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="flex flex-col gap-4 pt-6 px-3">
            <ModeToggle />
            <AuthButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
