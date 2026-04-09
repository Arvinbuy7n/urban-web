import { motion } from "framer-motion";
import { Star, CheckCircle2, Package } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { formatPrice } from "@/src/lib/strapi";
import { SPECS, TRUST_BADGES, CERTIFICATIONS } from "@/src/lib/constants";

type ProductInfoPanelProps = {
  title: string;
  description: string;
  price: number;
  category: string;
};

export const ProductInfoPanel = ({
  title,
  description,
  price,
  category,
}: ProductInfoPanelProps) => (
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
        <span className="text-xs font-bold text-slate-400">
          4.9 · 128 сэтгэгдэл
        </span>
      </div>
    </div>

    {/* Price */}
    <div className="flex items-baseline gap-3">
      <span className="text-3xl font-black text-slate-900">
        {formatPrice(price)}
      </span>
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
          <span className="text-xs text-slate-400 font-medium">
            {spec.label}
          </span>
          <span className="text-xs font-bold text-slate-700">{spec.value}</span>
        </div>
      ))}
    </div>

    {/* Trust badges */}
    <div className="grid grid-cols-3 gap-3">
      {TRUST_BADGES.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-2 bg-white rounded-2xl border border-slate-100 p-4 text-center"
        >
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <p className="text-[10px] font-bold text-slate-600 leading-tight">
            {label}
          </p>
        </div>
      ))}
    </div>

    {/* Certifications */}
    <div className="flex flex-wrap gap-2 pt-2">
      {CERTIFICATIONS.map((cert) => (
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
        <p className="text-[11px] text-slate-400">
          Их хэмжээний захиалгад тусгай үнэ
        </p>
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
);
