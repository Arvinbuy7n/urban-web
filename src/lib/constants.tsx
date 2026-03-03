import React from "react";
import { Shield, PenTool, Award } from "lucide-react";

export const PRODUCTS = [
  {
    id: "boots",
    title: "Үйлдвэрийн гутал",
    description:
      "14 цагийн ажлын ээлжид зориулсан нийлмэл орой бүхий бат бэх, тохь тухтай гутал.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAGNMYO_voQumCGG_QcTHRILKu24q81gYqiVYGDcsk4q0CV_HpMzbYGOWvbN5D0A-H_s_-LmtgWLzbwBzdc1W2U16UofqdO-PEpal5Yt2ySQi2iCSvRfyogPfWOGto9JGnHgMHNFA6BaOsLM5Qra3elwr2G9S6h-qXrQs8245i_S1301KoD2ZUKt-eoBXibUDJJlA2M9gBCEgRGpLOTEPB8FLdxtBMaOsNLJwBn7LAipQdDfRRvSI5u-6gO5ZTDM_J6iYSB_9zRW6Q",
    tag: "Шинэ үе",
    tagVariant: "default" as const,
    price: "₮650,000",
    category: "Гутал",
  },
  {
    id: "helmets",
    title: "Ухаалаг дуулга",
    description:
      "Бодит цагийн эрүүл мэндийн хяналт бүхий нэгдсэн дэлгэц болон цохилтын мэдрэгч.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDXR6f1gd1MudsrHDJ69R_wBpUfr3d4SaAYWBGngCsssl1brheRDTA6x5MnMl139tZUMSMqyMeRO7wWLfyU9KGMvCx0fQYQDv491CPi3x43lTkJn14pPC0q2cMKVrqWGq0Yjh43ee2IkJaGSiJMP0oxmjTjfb58L7d6E2ZqlcoY98wDX4817i9N8CuAj7ReXR0DZBBWMpOl3LcNUXEg7IvB49WeCVixYR-yAMdCyPXj_MNHssMOKV9TKbO_thcLcKt_ZdqDoJho53E",
    tag: "IoT Бэлэн",
    tagVariant: "primary" as const,
    price: "₮860,000",
    category: "Технологийн хэрэгсэл",
  },
  {
    id: "fr-clothing",
    title: "Галд тэсвэртэй хувцас",
    description:
      "Тохь тухтай байдал болон агааржуулалтад зориулан нэхсэн дэвшилтэт галд тэсвэртэй полимерүүд.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB8XXHpjt4EP3Ww-GwtEDoAqwp5l0d4HCwaS69QOLzJ5a02VJhBVF291nZz2H4ACcG6qJAfr-CAImCtPjUf_iLxC73-dku-kUnL1c-G_QwRCKI5Lr5F7FXQwkGau7UoQxEMidJ0GRyPCdz1SxNV9-lxOWLHuN8szTazCyp5U3UI1Rys6BGuuRQ4xafNmGr_Wfw3t_qb3HQ-AybHtTgrH-xYWHVLYP8o_vG45RwRyGxhNZY1QvFNECiIeyrx29dwdmZ0UnZolTLRqak",
    tag: "Нуман зэрэглэл",
    tagVariant: "default" as const,
    price: "₮445,000",
    category: "Хувцас",
  },
  {
    id: "jackets",
    title: "Өндөр харагдацтай жакет",
    description:
      "Амьсгалддаг усны тэсвэртэй мембран технологи бүхий хамгийн өндөр харагдац.",
    image: "https://picsum.photos/seed/safety-jacket/800/800",
    tag: "3-р анги",
    tagVariant: "primary" as const,
    price: "₮550,000",
    category: "Хувцас",
  },
];

export const CLIENTS = [
  { name: "als", logo: "/logos/als.png" },
  { name: "altgana", logo: "/logos/altgana.png" },
  { name: "arigbank", logo: "/logos/arigbank.jpg" },
  { name: "baganuur", logo: "/logos/baganuur.jpg" },
  { name: "bers", logo: "/logos/bers.png" },
  { name: "bhya", logo: "/logos/bhya.png" },
  { name: "bichilglobus", logo: "/logos/bichilglobus.jpg" },
  { name: "er", logo: "/logos/er.png" },
  { name: "ett", logo: "/logos/ett.png" },
  { name: "geg", logo: "/logos/geg.webp" },
  { name: "khanaltai", logo: "/logos/khanaltai.jpg" },
  { name: "mak", logo: "/logos/mak.png" },
  { name: "mera", logo: "/logos/mera.png" },
  { name: "mtz", logo: "/logos/mtz.webp" },
  { name: "rio_logo", logo: "/logos/rio_logo.png" },
  { name: "sandvik", logo: "/logos/sandvik.png" },
  { name: "shsheg", logo: "/logos/shsheg.png" },
  { name: "shunklai", logo: "/logos/shunklai.png" },
  { name: "soyolon", logo: "/logos/soyolon.png" },
  { name: "suu", logo: "/logos/suu.jpg" },
  { name: "tavantolgoi", logo: "/logos/tavantolgoi.webp" },
  { name: "tb", logo: "/logos/tb.png" },
  { name: "tseg", logo: "/logos/tseg.png" },
  { name: "tugeehsuljee", logo: "/logos/tugeehsuljee.jpg" },
  { name: "unitel", logo: "/logos/unitel.jpg" },
  { name: "zam", logo: "/logos/zam.png" },
  { name: "zhsg", logo: "/logos/zhsg.webp" },
];

export const FEATURES = [
  {
    title: "Дээд зэргийн бат бэх байдал",
    description:
      "Бүх бүтээгдэхүүн гэрчилгээжүүлэхээс өмнө аюултай нөхцөлд 100+ цагийн хэт ачааллын туршилтанд ордог.",
    icon: <Shield className="w-8 h-8 text-primary" />,
  },
  {
    title: "Эргономик загвар",
    description:
      "Тэргүүн зэргийн хэрэглэгчийн технологиос санаа авсан бидний загварууд жин тархалт болон агааржилтаар ядаргааг хамгийн бага болгодог.",
    icon: <PenTool className="w-8 h-8 text-primary" />,
  },
  {
    title: "Дэлхийн стандартад нийцэл",
    description:
      "OSHA, ANSI болон ISO стандартаар бүрэн гэрчилгээжсэн. Бид зөвхөн дүрэм журмыг хангаад зогсохгүй, тэдгээрийг давдаг.",
    icon: <Award className="w-8 h-8 text-primary" />,
  },
];
