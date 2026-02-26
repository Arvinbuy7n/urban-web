"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/src/lib/ui/button";

const STATS = [
  { value: "500+", label: "Байгууллагын хэрэглэгч" },
  { value: "50,000+", label: "Борлуулсан бүтээгдэхүүн" },
  { value: "99.8%", label: "Аюулгүй байдлын үнэлгээ" },
  { value: "12+", label: "Жилийн туршлага" },
];

const TAGS = ["ISO баталгаатай", "Галд тэсвэртэй", "OSHA нийцтэй"];

const HERO_IMAGES = [
  {
    src: "https://cdn.strauss.com/global/assets/ats/images/ArticleTileV3/product/16.Release.3210670/High-vis_softshell_jacket_e_s_motion-9064-3-638382265624666173.png",
    label: "Титан GT В-Цуврал",
    sub: "Галд тэсвэртэй · ISO баталгаатай",
  },
  {
    src: "https://cdn.strauss.com/global/assets/ats/images/ArticleTileV3/product/16.Release.3210770/High-vis_trousers_e_s_motion-9059-3-638162704673553162.png",
    label: "Арктик Про Цуврал",
    sub: "Хүйтэнд тэсвэртэй · CE баталгаатай",
  },
  {
    src: "https://cdn.strauss.com/global/assets/ats/images/ArticleTileV3/product/16.Release.3210120/High-vis_softshell_jacket_softl_e_s_motion_2020-117826-0-638162704600563934.png",
    label: "Хай-Виз Элит Цуврал",
    sub: "Өндөр харагдах · ANSI нийцтэй",
  },
];

export const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/6 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-100/60 rounded-full blur-[100px] translate-y-1/3 pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_540px] gap-8 xl:gap-16 min-h-[80vh] items-center py-16">
          {/* ── Left ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="flex flex-col"
          >
            {/* Tag pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-200 rounded-full px-3 py-1 bg-white"
                >
                  <ShieldCheck className="w-3 h-3 text-primary" />
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Headline */}
            <h1 className="text-[2.6rem] md:text-[3.4rem] xl:text-[4rem] font-black tracking-tight leading-[1.04] mb-6 text-slate-900">
              Ажлын орчины
              <br />
              <span className="text-primary">аюулгүй байдал</span>
              <br />
              шинэ шатанд.
            </h1>

            <p className="text-base text-slate-500 leading-relaxed mb-8 max-w-[480px]">
              Уул уурхай, барилга, эрчим хүчний салбарт зориулсан ISO
              баталгаатай хамгаалах хувцас, тоног төхөөрөмж. Аюулгүй байдлыг
              зөвхөн стандарт биш, амьдралын хэв маяг болго.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Button
                asChild
                size="lg"
                className="rounded-xl gap-2 px-7 bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20"
              >
                <Link href="/categories">
                  Каталог үзэх <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-xl px-7 border-slate-800 text-slate-900 hover:bg-slate-900 hover:text-white"
              >
                <Link href="#contact">Холбоо барих</Link>
              </Button>
            </div>

            {/* Social proof row */}
            <div className="flex items-center gap-6">
              <div className="flex -space-x-2.5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm"
                  >
                    <img
                      src={`https://picsum.photos/seed/user${i}/80/80`}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-primary text-primary"
                    />
                  ))}
                  <span className="text-xs font-black text-slate-800 ml-1">
                    4.9
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  <span className="font-bold text-slate-800">500+</span> компани
                  итгэдэг
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Right — image carousel ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.1 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-[0_32px_80px_-12px_rgba(0,0,0,0.2)] border border-slate-100">
              {/* Slides */}
              {HERO_IMAGES.map((img, i) => (
                <motion.img
                  key={i}
                  src={img.src}
                  alt="Аюулгүй хувцас"
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  animate={{ opacity: i === activeSlide ? 1 : 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Bottom overlay card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between shadow-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-1">
                      Онцлох бүтээгдэхүүн
                    </p>
                    <p className="text-sm font-black text-slate-900">
                      {HERO_IMAGES[activeSlide].label}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {HERO_IMAGES[activeSlide].sub}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <Link
                  href="/categories"
                  className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-105 transition-transform shrink-0"
                >
                  <ArrowRight className="text-white w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-7 px-6 text-center ${
                i < 3 ? "md:border-r border-slate-100" : ""
              }`}
            >
              <p className="text-2xl font-black text-slate-900 mb-0.5">
                {stat.value}
              </p>
              <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
