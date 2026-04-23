// Client-side public mutations. Import from Client Components.
// Backed by RLS policy "public insert contact submissions" in 0001_init.sql.

import { createClient } from "./client";

export async function submitContact(data: {
  phone_number: string;
  mail: string;
  note: string;
}): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("contact_submissions").insert(data);
  if (error) throw new Error(`Supabase contact insert: ${error.message}`);
}
