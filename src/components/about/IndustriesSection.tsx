import { INDUSTRIES } from "@/src/lib/constants";
import { Zap } from "lucide-react";

export const IndustriesSection = () => (
  <div className="bg-slate-900 rounded-2xl p-8 mb-8">
    <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">
      Үйлчилдэг салбарууд
    </p>
    <h2 className="text-xl font-black text-white mb-7">
      Аль салбарт үйлчилдэг вэ?
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {INDUSTRIES.map((industry) => (
        <div
          key={industry}
          className="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl px-4 py-3 transition-colors duration-200"
        >
          <Zap className="w-3 h-3 text-primary shrink-0" />
          <span className="text-xs font-bold text-slate-300">{industry}</span>
        </div>
      ))}
    </div>
  </div>
);
