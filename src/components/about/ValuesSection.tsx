import { VALUES } from "@/src/lib/constants";

export const ValuesSection = () => (
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
      {VALUES.map(({ num, icon: Icon, title, description }) => (
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
          <h3 className="text-sm font-black text-slate-900 mb-2">{title}</h3>
          <p className="text-xs text-slate-500 leading-relaxed flex-1">
            {description}
          </p>
        </div>
      ))}
    </div>
  </div>
);
