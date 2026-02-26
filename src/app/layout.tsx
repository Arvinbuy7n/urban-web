import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar } from "../components";

export const metadata: Metadata = {
  title: "Elite ХХХ — Аюулгүй байдалд зориулан бүтээсэн",
  description:
    "Мэргэжлийн өндөр зэргийн аюулгүйн хувцас болон үйлдвэрийн хувийн хамгаалах хэрэгслийн шийдлүүд. Хамгаалалт болон тав тухтай байдлын хамгийн дээд стандартад зориулан нарийвчлалтай бүтээгдсэн.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body className="min-h-screen selection:bg-primary/30 flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
