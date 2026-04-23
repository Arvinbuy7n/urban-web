import { adminListSubmissions } from "@/src/lib/supabase/admin/client";
import { SubmissionsClient } from "@/src/app/admin/_components/SubmissionsClient";

export const dynamic = "force-dynamic";

export default async function AdminSubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const params = await searchParams;
  const submissions = await adminListSubmissions().catch(() => []);
  const initialId = params.id ? Number(params.id) : undefined;
  return (
    <SubmissionsClient
      submissions={submissions}
      initialId={Number.isFinite(initialId) ? initialId : undefined}
    />
  );
}
