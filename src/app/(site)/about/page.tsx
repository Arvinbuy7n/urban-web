import {
  AboutHero,
  MissionSection,
  ValuesSection,
  IndustriesSection,
  CertificationsBar,
} from "@/src/components/about";

export const metadata = {
  title: "Бидний тухай — Urban Uniform",
  description:
    "Urban Uniform — Өндөр эрсдэлтэй орчинд зориулсан ISO баталгаатай аюулгүй байдлын тоног төхөөрөмж үйлдвэрлэгч.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <AboutHero />

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <MissionSection />
        <ValuesSection />
        <IndustriesSection />
        <CertificationsBar />
      </div>
    </div>
  );
}
