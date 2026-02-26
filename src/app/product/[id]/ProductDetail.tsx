"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Star, Shield, Zap, CheckCircle2, Package, Award } from "lucide-react";
import { Badge } from "@/src/lib/ui/badge";
import { cn } from "@/src/lib/utils";

interface Props {
  title: string;
  description: string;
  price: string;
  tag?: string;
  tagVariant?: "default" | "primary" | "secondary" | "destructive" | "outline";
  images: string[];
  category: string;
}

const SPECS = [
  { label: "Материал", value: "FR Cotton / Nomex®" },
  { label: "Стандарт", value: "ISO 11612, EN 469" },
  { label: "Хамгаалалтын зэрэг", value: "A1 B1 C1" },
  { label: "Угаах", value: "60°C хүртэл" },
];

export default function ProductDetail({
  title,
  description,
  price,
  tag,
  tagVariant,
  images,
  category,
}: Props) {
  const [activeImage, setActiveImage] = useState(0);

  const thumbs = images;

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-[1280px] mx-auto px-6 py-3 flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          <Link href="/" className="hover:text-primary transition-colors">Нүүр</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/categories" className="hover:text-primary transition-colors">Бүтээгдэхүүн</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-600">{category}</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 truncate max-w-[200px]">{title}</span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">

          {/* ── Image panel ── */}
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-sm"
            >
              {thumbs[activeImage] && (
                <img
                  src={thumbs[activeImage]}
                  alt={title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              )}
              {tag && (
                <div className="absolute top-4 left-4">
                  <Badge variant={tagVariant} className="shadow-md">
                    {tag}
                  </Badge>
                </div>
              )}
            </motion.div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {thumbs.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "aspect-square rounded-xl overflow-hidden border-2 transition-all",
                    activeImage === i
                      ? "border-primary shadow-md shadow-primary/20"
                      : "border-transparent hover:border-slate-300"
                  )}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ── Info panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Title + rating */}
            <div>
              <p className="text-[11px] font-black uppercase tracking-widest text-primary mb-2">
                {category}
              </p>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 mb-3">
                {title}
              </h1>
              <div className="flex items-center gap-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-400">4.9 · 128 сэтгэгдэл</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900">{price}</span>
              <span className="text-xs font-bold text-slate-400 bg-slate-100 rounded-full px-2.5 py-1">
                НӨАТ багтсан
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-5">
              {description}
            </p>

            {/* Specs */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              {SPECS.map((spec, i) => (
                <div
                  key={spec.label}
                  className={cn(
                    "flex items-center justify-between px-5 py-3 text-sm",
                    i < SPECS.length - 1 ? "border-b border-slate-100" : ""
                  )}
                >
                  <span className="text-xs text-slate-400 font-medium">{spec.label}</span>
                  <span className="text-xs font-bold text-slate-700">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Shield, label: "Насан туршийн баталгаа" },
                { icon: Zap, label: "3-5 өдрийн хүргэлт" },
                { icon: Award, label: "ISO баталгаатай" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 bg-white rounded-2xl border border-slate-100 p-4 text-center"
                >
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-600 leading-tight">{label}</p>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2 pt-2">
              {["ISO 11612", "EN 469", "OSHA", "ANSI Z87"].map((cert) => (
                <span
                  key={cert}
                  className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-200 rounded-full px-3 py-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-primary" />
                  {cert}
                </span>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="bg-slate-900 rounded-2xl p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black text-white mb-0.5">Захиалга өгөх</p>
                <p className="text-[11px] text-slate-400">Их хэмжээний захиалгад тусгай үнэ</p>
              </div>
              <a
                href="tel:+97699999999"
                className="shrink-0 bg-primary hover:bg-primary/90 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-primary/30"
              >
                <Package className="w-3.5 h-3.5" />
                Холбоо барих
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
