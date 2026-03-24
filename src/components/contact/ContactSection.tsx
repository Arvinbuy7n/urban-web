import { Mail, MapPin, Clock } from "lucide-react";
import { PhoneCard } from "./PhoneCard";

const otherItems = [
  {
    icon: Mail,
    label: "И-мэйл",
    value: "uniform@urban.mn",
    href: "mailto:uniform@urban.mn",
  },
  {
    icon: MapPin,
    label: "Хаяг",
    value:
      "УБ хот, Хан-Уул Дүүрэг, 18-р хороо, Нийслэлийн хүрээ өргөн чөлөө, Park Garden Plaza, 10 давхар, Монгол улс",
    href: "https://www.google.com/maps/place/PG+Plaza+%D0%9E%D1%84%D1%84%D0%B8%D1%81/@47.8983656,106.9101487,857m/data=!3m2!1e3!4b1!4m6!3m5!1s0x5d9693006140837b:0xe7ce14dc8cf54d57!8m2!3d47.898362!4d106.912729!16s%2Fg%2F11x1vztp3m?entry=ttu&g_ep=EgoyMDI2MDIyNC4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    icon: Clock,
    label: "Ажлын цаг",
    value: "Даваа–Баасан, 09:00–18:00",
    href: null,
  },
];

export const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="mb-12">
          <p className="text-[11px] font-black uppercase tracking-widest text-primary mb-2">
            Холбоо барих
          </p>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">
            Бидэнтэй холбогдох
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Асуулт, захиалга болон хамтын ажиллагааны талаар бидэнтэй
            холбогдоорой.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <PhoneCard />

          {otherItems.map(({ icon: Icon, label, value, href }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-6 flex items-start gap-4 border border-slate-100"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="text-sm font-semibold text-slate-900 hover:text-primary transition-colors"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-sm font-semibold text-slate-900">
                    {value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
