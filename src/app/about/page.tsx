import { Shield, Award, CheckCircle, Zap, HeartHandshake } from "lucide-react";

export const metadata = {
  title: "Бидний тухай — Urban Uniform",
  description:
    "Urban Uniform — Өндөр эрсдэлтэй орчинд зориулсан ISO баталгаатай аюулгүй байдлын тоног төхөөрөмж үйлдвэрлэгч.",
};

const stats = [
  { value: "10+", label: "Жилийн туршлага" },
  { value: "500+", label: "Үйлчлүүлэгч" },
  { value: "1200+", label: "Бүтээгдэхүүний төрөл" },
  { value: "ISO 9001", label: "Чанарын баталгаа" },
];

const values = [
  {
    num: "01",
    icon: Shield,
    title: "Аюулгүй байдал",
    description:
      "Бүх бүтээгдэхүүн олон улсын стандартыг хангасан бөгөөд хамгийн өндөр эрсдэлтэй орчинд найдвартай ажиллана.",
  },
  {
    num: "02",
    icon: Award,
    title: "Чанар",
    description:
      "ISO 9001 баталгаатай процессоор дамжуулан бүтээгдэхүүн бүрийг нарийн хяналтад үйлдвэрлэдэг.",
  },
  {
    num: "03",
    icon: HeartHandshake,
    title: "Найдвартай байдал",
    description:
      "Захиалгаас хүргэлт хүртэл бүх шатанд үйлчлүүлэгчтэйгээ ойр хамтран ажиллаж, урт хугацааны түншлэл бүрдүүлдэг.",
  },
];

const industries = [
  "Уул уурхай",
  "Барилга",
  "Газрын тос ба хий",
  "Сэргээгдэх эрчим хүч",
  "Үйлдвэрлэл",
  "Тээвэр ба логистик",
];

const certifications = [
  "ISO 9001",
  "OSHA нийцтэй",
  "ANSI баталгаатай",
  "CE тэмдэглэгдсэн",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-slate-900 text-white">
        <div className="max-w-[1280px] mx-auto px-6 pt-20 pb-0">
          <p className="text-[11px] font-black uppercase tracking-widest text-primary mb-4">
            Бидний тухай
          </p>
          <h1 className="text-5xl font-black tracking-tight leading-[1.1] mb-5 max-w-xl">
            Аюулгүй байдал{" "}
            <span className="text-primary">бидний гол зорилго</span>
          </h1>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-16">
            Urban Uniform нь 2014 оноос хойш Монголын уул уурхай, барилга болон
            үйлдвэрлэлийн салбарт өндөр чанарын хамгаалалтын хувцас, тоног
            төхөөрөмж нийлүүлж ирсэн.
          </p>

          {/* Stats bar — overlaps into content */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800 rounded-2xl overflow-hidden translate-y-8 border border-slate-700">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`bg-slate-900 px-6 py-6 flex flex-col gap-1 ${
                  i !== 0 ? "border-l border-slate-800" : ""
                }`}
              >
                <span className="text-2xl font-black text-white">
                  {s.value}
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 pb-24">
        {/* Mission */}
        <div className="grid lg:grid-cols-2 gap-6 mt-16 mb-20">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-3">
              Манай эрхэм зорилго
            </p>
            <h2 className="text-xl font-black text-slate-900 mb-4 leading-snug">
              Ажилчдын аюулгүй байдлыг хамгийн дээд түвшинд хангана
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-3">
              Бид өндөр эрсдэлтэй орчинд ажилладаг мэргэжилтнүүдийн амь насыг
              хамгаалахад чиглэсэн бүтээгдэхүүн үйлдвэрлэдэг. Бүтээгдэхүүн бүр
              олон улсын аюулгүй байдлын стандартыг хангасан байхаас гадна
              монгол орны уур амьсгал, ажлын нөхцөлд тохирсон байхыг эрхэмлэдэг.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed">
              ISO 9001 баталгаатай манай үйлдвэрлэлийн процесс нь чанарын
              хяналтыг бүх шатанд хэрэгжүүлж, үйлчлүүлэгч бүрт найдвартай шийдэл
              санал болгодог.
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 text-white">
            <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">
              Бид юу хийдэг вэ?
            </p>
            <div className="space-y-5">
              {[
                "Аюулгүй байдлын хувцас үйлдвэрлэх",
                "Ажлын байранд зориулсан тоног төхөөрөмж нийлүүлэх",
                "Захиалгат хувцасны шийдэл боловсруулах",
                "Байгууллагын аюулгүй байдлын стандартыг нэвтрүүлэхэд туслах",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-slate-300 leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">
                Үнэт зүйлс
              </p>
              <h2 className="text-2xl font-black text-slate-900">
                Бидний үйл ажиллагааны үндэс
              </h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {values.map(({ num, icon: Icon, title, description }) => (
              <div
                key={title}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-slate-100 group-hover:text-primary/20 transition-colors duration-300">
                    {num}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-primary/10 group-hover:bg-primary/15 flex items-center justify-center transition-colors duration-300">
                    <Icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                </div>
                <div className="h-px bg-slate-100 mb-5" />
                <h3 className="text-sm font-black text-slate-900 mb-2">
                  {title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed flex-1">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Industries — dark section */}
        <div className="bg-slate-900 rounded-2xl p-8 mb-8">
          <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">
            Үйлчилдэг салбарууд
          </p>
          <h2 className="text-xl font-black text-white mb-7">
            Аль салбарт үйлчилдэг вэ?
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {industries.map((industry) => (
              <div
                key={industry}
                className="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl px-4 py-3 transition-colors duration-200"
              >
                <Zap className="w-3 h-3 text-primary shrink-0" />
                <span className="text-xs font-bold text-slate-300">
                  {industry}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-8 py-6 flex flex-col sm:flex-row sm:items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 shrink-0">
            Баталгаажуулалт
          </p>
          <div className="h-px sm:h-8 sm:w-px bg-slate-100 shrink-0" />
          <div className="flex flex-wrap gap-3">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-2 border border-slate-200 rounded-full px-4 py-1.5"
              >
                <Award className="w-3 h-3 text-primary shrink-0" />
                <span className="text-[11px] font-black text-slate-700 uppercase tracking-wide">
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
