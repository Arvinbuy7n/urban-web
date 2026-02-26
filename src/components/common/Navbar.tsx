"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { label: "Бүтээгдэхүүн", href: "/categories" },
  { label: "Технологи", href: "#" },
  { label: "Бидний тухай", href: "#" },
  { label: "Холбоо барих", href: "#" },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-100/80 shadow-sm shadow-black/[0.03]">
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-md shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
            <Shield className="text-white w-4 h-4" />
          </div>
          <div className="flex flex-col leading-none gap-0.5">
            <span className="font-black text-sm tracking-tighter uppercase text-slate-900">
              Elite ХХХ
            </span>
            <span className="text-[9px] font-bold tracking-[0.18em] text-slate-400 uppercase hidden sm:block">
              Safety Wear
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "relative px-4 py-5 text-[11px] font-bold uppercase tracking-widest transition-colors duration-200",
                  active
                    ? "text-primary"
                    : "text-slate-400 hover:text-slate-800"
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-primary transition-all duration-300",
                    active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  )}
                />
              </Link>
            );
          })}
        </div>

        <MobileNav />
      </div>
    </nav>
  );
};
