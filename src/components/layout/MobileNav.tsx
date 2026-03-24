"use client";

import Link from "next/link";
import { Menu, Phone, Mail } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/src/lib/ui/sheet";

const navLinks = [
  { label: "Бүтээгдэхүүн", href: "/categories" },
  { label: "Бидний тухай", href: "/about" },
  { label: "Холбоо барих", href: "/contact" },
];

export const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors">
          <Menu className="w-5 h-5 text-slate-700" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full flex flex-col p-0 bg-white">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center">
          <img
            src="/company/urbanblack.png"
            alt="Urban Uniform"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-3 py-4 flex-1">
          {navLinks.map((link) => (
            <SheetClose asChild key={link.label}>
              <Link
                href={link.href}
                className="group flex items-center px-4 py-3.5 rounded-2xl hover:bg-slate-50 active:bg-slate-100 transition-colors"
              >
                <span className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">
                  {link.label}
                </span>
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
