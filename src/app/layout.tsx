import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Urban Uniform — Аюулгүй байдалд зориулан бүтээсэн",
  description:
    "Мэргэжлийн өндөр зэргийн аюулгүйн хувцас болон үйлдвэрийн хувийн хамгаалах хэрэгслийн шийдлүүд. Хамгаалалт болон тав тухтай байдлын хамгийн дээд стандартад зориулан нарийвчлалтай бүтээгдсэн.",
  icons: {
    icon: "/Urban_favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body className="min-h-screen selection:bg-primary/30 flex flex-col">
        {children}
      </body>
    </html>
  );
}
