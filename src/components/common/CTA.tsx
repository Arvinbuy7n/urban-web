"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export const CTA = () => {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="relative rounded-3xl bg-slate-900 overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] -translate-x-1/4 translate-y-1/4 pointer-events-none" />

          {/* Dot grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 px-10 md:px-16 py-14 md:py-16">
            {/* Left */}
            <div className="text-center lg:text-left">
              <p className="text-[11px] font-black uppercase tracking-widest text-primary mb-3">
                Байгууллагын захиалга
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-snug mb-4">
                Ирээдүйн ажиллах хүчнийгээ <br className="hidden sm:block" />
                тоноглоход бэлэн үү?
              </h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto lg:mx-0 leading-relaxed">
                Их хэмжээний захиалга, байгууллагын каталог болон тусгай үнийн
                саналын тулд манай зөвлөхүүдтэй холбоо барина уу.
              </p>
            </div>

            {/* Right — buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold text-sm px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-primary/30"
              >
                <Phone className="w-4 h-4" />
                Холбоо барих
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white font-bold text-sm px-7 py-3.5 rounded-xl border border-white/10 transition-all"
              >
                Каталог үзэх <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
