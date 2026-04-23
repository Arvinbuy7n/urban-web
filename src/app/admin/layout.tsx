import "@/src/app/admin/Admin.css";
import type { Metadata } from "next";
import { AdminShell } from "@/src/app/admin/_components/AdminShell";
import { adminListSubmissions } from "@/src/lib/supabase/admin/client";

export const metadata: Metadata = {
  title: "Urban Uniform — Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let unread = 0;
  try {
    const subs = await adminListSubmissions();
    unread = subs.filter((s) => !s.read).length;
  } catch {
    // no-op: if the backend is down we still render the shell
  }
  return <AdminShell unreadCount={unread}>{children}</AdminShell>;
}
