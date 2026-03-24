"use client";

import { CLIENTS } from "@/src/lib/constants";

export const ClientsSlider = () => {
  const doubled = [...CLIENTS, ...CLIENTS];

  return (
    <section className="py-8 bg-slate-50 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(255,255,255,0.9),transparent)]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-6 mb-10 text-center relative">
        <p className="text-sm font-black uppercase tracking-widest text-slate-500">
          Харилцагч байгууллагууд
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-32 z-10 bg-gradient-to-r from-slate-50 to-transparent" />

        <div className="pointer-events-none absolute right-0 top-0 h-full w-32 z-10 bg-gradient-to-l from-slate-50 to-transparent" />

        <div className="animate-marquee">
          {doubled.map((client, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 mx-4 flex items-center justify-center px-6 py-3 rounded-xl bg-white border border-slate-200/80 shadow-sm hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-default"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-14 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
