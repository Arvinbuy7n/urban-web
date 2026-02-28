"use client";

import { CLIENTS } from "@/src/lib/constants";

export const ClientsSlider = () => {
  const doubled = [...CLIENTS, ...CLIENTS];

  return (
    <section className="py-8 bg-slate-50 relative overflow-hidden">
      {/* Soft radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,255,255,0.9),transparent)]" />

      {/* Top / bottom dividers */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-6 mb-10 text-center relative">
        <p className="text-sm font-black uppercase tracking-widest text-slate-500">
          Харилцагч байгууллагууд
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-32 z-10 bg-gradient-to-r from-slate-50 to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-32 z-10 bg-gradient-to-l from-slate-50 to-transparent" />

        <div className="animate-marquee">
          {doubled.map((client, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 mx-2.5 flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-slate-200/80 shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-default group"
            >
              <div className="w-7 h-7 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors duration-300 flex-shrink-0">
                <span className="text-[9px] font-black text-primary leading-none">
                  {client.abbr}
                </span>
              </div>
              <span className="text-[13px] font-semibold text-slate-500 group-hover:text-slate-800 whitespace-nowrap transition-colors duration-300">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
