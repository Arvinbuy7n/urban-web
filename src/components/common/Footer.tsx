"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const columns = [
  {
    title: "Шийдлүүд",
    links: [
      { label: "Уул уурхай", href: "#", disabled: true },
      { label: "Барилга", href: "#", disabled: true },
      { label: "Сэргээгдэх эрчим хүч", href: "#", disabled: true },
      { label: "Газрын тос ба хий", href: "#", disabled: true },
    ],
  },
  {
    title: "Бүтээгдэхүүн",
    links: [
      { label: "Гутал", href: "/categories" },
      { label: "Толгойн хамгаалалт", href: "/categories" },
      { label: "Технологийн хувцас", href: "/categories" },
      { label: "Галд тэсвэртэй шугам", href: "/categories" },
    ],
  },
  {
    title: "Компани",
    links: [
      { label: "Бидний тухай", href: "/about" },
      { label: "Тогтвортой байдал", href: "#", disabled: true },
      { label: "Ажлын байр", href: "#", disabled: true },
      { label: "Мэдээ", href: "#", disabled: true },
    ],
  },
];

const legal = ["Нууцлалын бодлого", "Үйлчилгээний нөхцөл", "Күүкийн бодлого"];

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Top divider accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-14">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <Link href="/">
              <img
                src="/company/urbanwhite.png"
                alt="Urban Uniform"
                className="h-10 w-auto object-contain mb-2"
              />
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-[240px]">
              Өндөр эрсдэлтэй орчинд зориулсан ISO баталгаатай аюулгүй байдлын
              тоног төхөөрөмж үйлдвэрлэгч.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5">
              <a
                href="tel:+97699683330"
                className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                9968 3330
              </a>
              <a
                href="mailto:uniform@urban.mn"
                className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-primary shrink-0" />
                uniform@urban.mn
              </a>
              <a
                href="https://www.google.com/maps/place/PG+Plaza+%D0%9E%D1%84%D1%84%D0%B8%D1%81/@47.8983656,106.9101487,857m/data=!3m2!1e3!4b1!4m6!3m5!1s0x5d9693006140837b:0xe7ce14dc8cf54d57!8m2!3d47.898362!4d106.912729!16s%2Fg%2F11x1vztp3m?entry=ttu&g_ep=EgoyMDI2MDIyNC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-xs text-slate-400 hover:text-white transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                Park Garden Plaza, 10 давхар, Хан-Уул Дүүрэг, УБ
              </a>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.disabled ? (
                      <span className="text-xs text-slate-600 cursor-not-allowed select-none">
                        {link.label}
                      </span>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-xs text-slate-400 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Certification badges */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[
            "ISO 9001",
            "OSHA нийцтэй",
            "ANSI баталгаатай",
            "CE тэмдэглэгдсэн",
          ].map((badge) => (
            <span
              key={badge}
              className="text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-800 rounded-full px-3 py-1"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest">
            © {new Date().getFullYear()} Urban Uniform. Бүх эрх хуулиар
            хамгаалагдсан.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            {legal.map((link) => (
              <a
                key={link}
                href="#"
                className="text-[10px] text-slate-600 uppercase tracking-widest hover:text-slate-400 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
