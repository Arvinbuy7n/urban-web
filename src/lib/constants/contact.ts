import { Mail, MapPin, Clock } from "lucide-react";

export const CONTACT_ITEMS = [
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
] as const;

export const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2673.6!2d106.9101487!3d47.8983656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d9693006140837b%3A0xe7ce14dc8cf54d57!2sPG%20Plaza%20%D0%9E%D1%84%D1%84%D0%B8%D1%81!5e0!3m2!1sen!2smn!4v1";
