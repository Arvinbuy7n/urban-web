import { PhoneCard, ContactCard, ContactForm } from "@/src/components/contact";
import { CONTACT_ITEMS, MAP_EMBED_URL } from "@/src/lib/constants";

export const metadata = {
  title: "Холбоо барих — Urban Uniform",
  description: "Urban Uniform-тай холбоо барих. Бидний хаяг, утас, и-мэйл.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
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

      <div className="max-w-7xl mx-auto px-6 -mt-8 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <PhoneCard />

          {CONTACT_ITEMS.map((item) => (
            <ContactCard key={item.label} {...item} />
          ))}
        </div>

        <div className="mt-6 grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm h-[420px]">
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">
              Мэдэгдэл илгээх
            </p>
            <h2 className="text-lg font-black text-slate-900 mb-6">
              Үнийн санал авах
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
