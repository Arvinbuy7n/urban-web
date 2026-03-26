"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { MobileNav } from "./MobileNav";

const navLinks = [
  { label: "Бүтээгдэхүүн", href: "/categories" },
  { label: "Бидний тухай", href: "/about" },
  { label: "Холбоо барих", href: "/contact" },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-slate-100/80 shadow-sm shadow-black/[0.03]">
      <div className="max-w-[1280px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/company/urbanblack.png"
            alt="Urban Uniform"
            className="h-18 w-auto object-contain"
          />
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
                    : "text-slate-700 hover:text-slate-900"
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
