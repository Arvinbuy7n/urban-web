-- Adds a nullable read_at timestamp to contact_submissions so the admin
-- dashboard can persist "read" state. The admin code already degrades
-- gracefully when the column is missing, but running this migration is
-- required to actually track read/unread.
alter table
  public.contact_submissions
add
  column if not exists read_at timestamptz;

-- Allow admin (service_role) to update the column. The existing RLS
-- policies only permit public insert; updates from the browser using the
-- anon key will still be rejected, which is the desired behavior.