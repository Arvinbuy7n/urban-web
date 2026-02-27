"use client";

import { motion } from "framer-motion";
import { FEATURES } from "@/src/lib/constants";

export const WhyElite = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-[11px] font-black uppercase tracking-widest text-primary mb-2">
              Яагаад бидэн дээр
            </p>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 leading-snug">
              Үйлдвэрийн удирдагчид <br className="hidden sm:block" />
              яагаад Urban Uniform-г сонгодог вэ
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
            Зүгээр л илүү сайн хэрэгсэл бүтээгээгүй — үйлдвэрийн
            эргономикийн стандартыг дахин тодорхойлсон.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="group relative bg-slate-50 hover:bg-slate-900 rounded-3xl p-8 transition-all duration-500 overflow-hidden"
            >
              {/* Hover accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="w-12 h-12 rounded-2xl bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-6 transition-colors duration-500">
                {feature.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 group-hover:text-white mb-3 transition-colors duration-500">
                {feature.title}
              </h3>
              <p className="text-xs text-slate-500 group-hover:text-slate-400 leading-relaxed transition-colors duration-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
