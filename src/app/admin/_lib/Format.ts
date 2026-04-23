export function timeAgo(iso: string | Date | null | undefined): string {
  if (!iso) return "—";
  const now = Date.now();
  const t = new Date(iso).getTime();
  const s = Math.floor((now - t) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d}d ago`;
  return `${Math.floor(d / 7)}w ago`;
}

export function formatTugrug(n: number | null | undefined): string {
  if (n == null) return "—";
  return "₮ " + Number(n).toLocaleString("en-US");
}

export function formatDateTime(iso: string | Date | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${
    months[d.getMonth()]
  } ${d.getDate()}, ${d.getFullYear()} · ${hh}:${mm}`;
}

export function slugify(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/[^a-z0-9Ѐ-ӿ\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Deterministic thumbnail palette based on product id.
const THUMB_PALETTE = [
  { bg: "#fbbf24", label: "HAT" },
  { bg: "#1c1917", label: "GLV" },
  { bg: "#38bdf8", label: "EYE" },
  { bg: "#78350f", label: "BT" },
  { bg: "#ef4444", label: "JKT" },
  { bg: "#0ea5e9", label: "RSP" },
  { bg: "#065f46", label: "GLV" },
  { bg: "#44403c", label: "PNT" },
];

export function thumbCover(
  id: number,
  title: string
): { bg: string; label: string } {
  const pick = THUMB_PALETTE[id % THUMB_PALETTE.length];
  const label = (title || "PR").slice(0, 3).toUpperCase();
  return { bg: pick.bg, label };
}
