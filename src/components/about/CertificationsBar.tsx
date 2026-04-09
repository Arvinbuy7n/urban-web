import { ABOUT_CERTIFICATIONS } from "@/src/lib/constants";
import { Award } from "lucide-react";

export const CertificationsBar = () => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-8 py-6 flex flex-col sm:flex-row sm:items-center gap-6">
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 shrink-0">
      Баталгаажуулалт
    </p>
    <div className="h-px sm:h-8 sm:w-px bg-slate-100 shrink-0" />
    <div className="flex flex-wrap gap-3">
      {ABOUT_CERTIFICATIONS.map((cert) => (
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
);
