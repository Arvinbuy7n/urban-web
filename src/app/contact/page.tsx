import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Холбоо барих — Urban Uniform",
  description: "Urban Uniform-тай холбоо барих. Бидний хаяг, утас, и-мэйл.",
};

const contactItems = [
  {
    icon: Phone,
    label: "Утас",
    value: "9968 3330",
    href: "tel:+97699683330",
    external: false,
  },
  {
    icon: Mail,
    label: "И-мэйл",
    value: "uniform@urban.mn",
    href: "mailto:uniform@urban.mn",
    external: false,
  },
  {
    icon: MapPin,
    label: "Хаяг",
    value: "Park Garden Plaza, 10 давхар",
    href: "https://www.google.com/maps/place/PG+Plaza+%D0%9E%D1%84%D1%84%D0%B8%D1%81/@47.8983656,106.9101487,857m/data=!3m2!1e3!4b1!4m6!3m5!1s0x5d9693006140837b:0xe7ce14dc8cf54d57!8m2!3d47.898362!4d106.912729!16s%2Fg%2F11x1vztp3m?entry=ttu&g_ep=EgoyMDI2MDIyNC4wIKXMDSoASAFQAw%3D%3D",
    external: true,
  },
  {
    icon: Clock,
    label: "Ажлын цаг",
    value: "Даваа–Баасан\n09:00–18:00",
    href: null,
    external: false,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-[1280px] mx-auto px-6 py-20">
          <p className="text-[11px] font-black uppercase tracking-widest text-primary mb-3">
            Холбоо барих
          </p>
          <h1 className="text-4xl font-black tracking-tight leading-tight mb-4">
            Бидэнтэй <br className="hidden sm:block" />
            холбогдоорой
          </h1>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Захиалга, асуулт болон хамтын ажиллагааны талаар доорх мэдээллээр
            холбогдоно уу.
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-[1280px] mx-auto px-6 -mt-8 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contactItems.map(({ icon: Icon, label, value, href, external }) => (
            <div
              key={label}
              className="group relative bg-white rounded-xl p-4 border border-slate-100 shadow-sm overflow-hidden flex items-center gap-3 hover:border-primary/20 hover:shadow-md transition-all duration-300"
            >
              {/* top accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div className="w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center shrink-0 transition-colors duration-300">
                <Icon className="w-3.5 h-3.5 text-primary" />
              </div>

              <div className="min-w-0">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 group-hover:text-primary transition-colors duration-300 whitespace-pre-line"
                  >
                    {value}
                    {external && (
                      <ArrowUpRight className="w-3 h-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}
                  </a>
                ) : (
                  <p className="text-xs font-semibold text-slate-900 whitespace-pre-line">
                    {value}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Map + Form */}
        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          {/* Map embed */}
          <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm h-[420px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.6!2d106.9101487!3d47.8983656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693006140837b%3A0xe7ce14dc8cf54d57!2sPG%20Plaza%20%D0%9E%D1%84%D1%84%D0%B8%D1%81!5e0!3m2!1sen!2smn!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Contact form */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">
              Мэдэгдэл илгээх
            </p>
            <h2 className="text-lg font-black text-slate-900 mb-6">
              Бидэнд бичнэ үү
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
