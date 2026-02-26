"use client";

import Link from "next/link";
import { Shield, Menu, Phone, Mail } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/src/lib/ui/sheet";

const navLinks = [
  { label: "Бүтээгдэхүүн", href: "/categories" },
  { label: "Технологи", href: "#" },
  { label: "Бидний тухай", href: "#" },
  { label: "Холбоо барих", href: "#" },
];

export const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors">
          <Menu className="w-5 h-5 text-slate-700" />
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-80 flex flex-col p-0 bg-white">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="text-primary w-5 h-5" />
          </div>
          <div>
            <p className="font-black text-sm tracking-tight uppercase leading-none">
              Elite ХХХ
            </p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">
              Аюулгүй байдлын тоног төхөөрөмж
            </p>
          </div>
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

        {/* Footer */}
        <div className="mx-4 mb-6 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden">
          <a
            href="tel:+97699999999"
            className="flex items-center gap-3 px-4 py-3.5 hover:bg-slate-100 transition-colors border-b border-slate-100"
          >
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Phone className="w-3 h-3 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700 leading-none">
                +976 9999-9999
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">24/7 дэмжлэг</p>
            </div>
          </a>
          <a
            href="mailto:info@elitesafety.mn"
            className="flex items-center gap-3 px-4 py-3.5 hover:bg-slate-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="w-3 h-3 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-700 leading-none">
                info@elitesafety.mn
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                И-мэйлээр холбоо барих
              </p>
            </div>
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
};
