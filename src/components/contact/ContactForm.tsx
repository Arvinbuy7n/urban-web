"use client";

import { useState } from "react";
import { Phone, Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import { cn } from "@/src/lib/utils";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

type FormData = {
  phone_number: string;
  mail: string;
  note: string;
};

const INITIAL_FORM: FormData = { phone_number: "", mail: "", note: "" };

type Status = "idle" | "loading" | "success" | "error";

export const ContactForm = () => {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = (): string | null => {
    const phone = form.phone_number.trim();
    if (!phone || !/^\d{8}$/.test(phone)) {
      return "Утасны дугаар 8 оронтой тоо байх ёстой.";
    }
    const email = form.mail.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Зөв и-мэйл хаяг оруулна уу.";
    }
    if (!form.note.trim()) {
      return "Тэмдэглэл хоосон байна.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(`${STRAPI_URL}/api/contact-submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: form }),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      setForm(INITIAL_FORM);
    } catch {
      setStatus("error");
      setError("Илгээхэд алдаа гарлаа. Дахин оролдоно уу.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-base font-black text-slate-900">
          Амжилттай илгээлээ!
        </h3>
        <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
          Таны мэдэгдлийг хүлээн авлаа. Удахгүй холбоо барина.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-2 text-xs font-bold text-primary hover:underline"
        >
          Дахин илгээх
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
          Утасны дугаар
        </label>
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 h-12 transition-colors focus-within:border-primary/50 focus-within:bg-white">
          <Phone className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="tel"
            name="phone_number"
            value={form.phone_number}
            onChange={handleChange}
            required
            placeholder="88886583"
            className="bg-transparent text-sm w-full focus:outline-none placeholder:text-slate-300 text-slate-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
          И-мэйл
        </label>
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 h-12 transition-colors focus-within:border-primary/50 focus-within:bg-white">
          <Mail className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="email"
            name="mail"
            value={form.mail}
            onChange={handleChange}
            required
            placeholder="example@mail.com"
            className="bg-transparent text-sm w-full focus:outline-none placeholder:text-slate-300 text-slate-900"
          />
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
          Тэмдэглэл
        </label>
        <div className="flex gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 transition-colors focus-within:border-primary/50 focus-within:bg-white">
          <MessageSquare className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            required
            rows={4}
            placeholder="Захиалга, үнийн саналын хүсэлтээ энд бичнэ үү..."
            className="bg-transparent text-sm w-full focus:outline-none placeholder:text-slate-300 text-slate-900 resize-none"
          />
        </div>
      </div>

      {error && <p className="text-xs font-bold text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "w-full flex items-center justify-center gap-2 h-12 rounded-xl text-sm font-black transition-all",
          status === "loading"
            ? "bg-primary/60 text-white cursor-not-allowed"
            : "bg-primary hover:bg-primary/90 text-white"
        )}
      >
        <Send className="w-4 h-4" />
        {status === "loading" ? "Илгээж байна..." : "Илгээх"}
      </button>
    </form>
  );
};
