import { STATS } from "@/src/lib/constants";

export const AboutHero = () => (
  <div className="bg-slate-900 text-white">
    <div className="max-w-7xl mx-auto px-6 pt-20 pb-0">
      <p className="text-[11px] font-black uppercase tracking-widest text-primary mb-4">
        Бидний тухай
      </p>
      <h1 className="text-5xl font-black tracking-tight leading-[1.1] mb-5 max-w-xl">
        Аюулгүй байдал <span className="text-primary">бидний гол зорилго</span>
      </h1>
      <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-16">
        Urban Uniform нь 2014 оноос хойш Монголын уул уурхай, барилга болон
        үйлдвэрлэлийн салбарт өндөр чанарын хамгаалалтын хувцас, тоног төхөөрөмж
        нийлүүлж ирсэн.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800 rounded-2xl overflow-hidden translate-y-8 border border-slate-700">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`bg-slate-900 px-6 py-6 flex flex-col gap-1 ${
              i !== 0 ? "border-l border-slate-800" : ""
            }`}
          >
            <span className="text-2xl font-black text-white">{s.value}</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
