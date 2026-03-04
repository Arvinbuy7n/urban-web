"use client";

import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { PHONE_NUMBERS, shuffleArray, formatPhone } from "@/src/lib/phoneNumbers";

export default function PhoneCard({ single = false }: { single?: boolean }) {
  const [phones, setPhones] = useState<string[]>([]);

  useEffect(() => {
    const shuffled = shuffleArray(PHONE_NUMBERS);
    setPhones(single ? [shuffled[0]] : shuffled);
  }, [single]);

  return (
    <div className="group relative bg-white rounded-xl p-4 border border-slate-100 shadow-sm overflow-hidden flex items-center gap-3 hover:border-primary/20 hover:shadow-md transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

      <div className="w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center shrink-0 transition-colors duration-300">
        <Phone className="w-3.5 h-3.5 text-primary" />
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">
          Утас
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
          {phones.map((num) => (
            <a
              key={num}
              href={`tel:+976${num}`}
              className="text-xs font-semibold text-slate-900 group-hover:text-primary transition-colors duration-300 tabular-nums"
            >
              {formatPhone(num)}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
