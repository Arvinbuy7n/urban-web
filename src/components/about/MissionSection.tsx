import { SERVICES } from "@/src/types";
import { CheckCircle } from "lucide-react";

export const MissionSection = () => (
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
        хамгаалахад чиглэсэн бүтээгдэхүүн үйлдвэрлэдэг. Бүтээгдэхүүн бүр олон
        улсын аюулгүй байдлын стандартыг хангасан байхаас гадна монгол орны уур
        амьсгал, ажлын нөхцөлд тохирсон байхыг эрхэмлэдэг.
      </p>
      <p className="text-sm text-slate-500 leading-relaxed">
        ISO 9001 баталгаатай манай үйлдвэрлэлийн процесс нь чанарын хяналтыг бүх
        шатанд хэрэгжүүлж, үйлчлүүлэгч бүрт найдвартай шийдэл санал болгодог.
      </p>
    </div>

    <div className="bg-slate-900 rounded-2xl p-8 text-white">
      <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-6">
        Бид юу хийдэг вэ?
      </p>
      <div className="space-y-5">
        {SERVICES.map((item) => (
          <div key={item} className="flex items-start gap-3">
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
);
