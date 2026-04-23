import Link from "next/link";
import {
  ArrowUpRight,
  CircleDot,
  FolderTree,
  Inbox,
  Package,
} from "lucide-react";
import {
  adminListCategories,
  adminListProducts,
  adminListSubmissions,
  type AdminProduct,
  type AdminCategory,
  type Submission,
} from "@/src/lib/supabase/admin/client";
import {
  AdminCard,
  PageContainer,
  PageHeader,
  EmptyState,
  ProductThumb,
  StatusBadge,
} from "@/src/app/admin/_components/Primitives";
import { StatCard } from "@/src/app/admin/_components/StatCard";
import {
  formatTugrug,
  thumbCover,
  timeAgo,
} from "@/src/app/admin/_lib/Format";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  let products: AdminProduct[] = [];
  let categories: AdminCategory[] = [];
  let submissions: Submission[] = [];
  try {
    [products, categories, submissions] = await Promise.all([
      adminListProducts(),
      adminListCategories(),
      adminListSubmissions(),
    ]);
  } catch {
    // fall through to empty state
  }

  const published = products.filter((p) => p.published).length;
  const draft = products.length - published;
  const topLevelCats = categories.filter((c) => c.parentId === null).length;
  const weekMs = 7 * 24 * 60 * 60 * 1000;
  const now = Date.now();
  const newSubmissions = submissions.filter(
    (s) => now - new Date(s.createdAt).getTime() < weekMs
  ).length;

  const recentSubs = submissions.slice(0, 5);
  const recentProducts = products.slice(0, 6);

  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Overview of your catalog and recent activity."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
          marginBottom: 28,
        }}
      >
        <StatCard
          label="Total products"
          value={products.length}
          icon={Package}
        />
        <StatCard
          label="Categories"
          value={categories.length}
          icon={FolderTree}
          sub={`${topLevelCats} top-level`}
        />
        <StatCard
          label="New submissions"
          value={newSubmissions}
          icon={Inbox}
          trendLabel="last 7 days"
        />
        <StatCard
          label="Published"
          value={`${published} / ${products.length}`}
          icon={CircleDot}
          sub={`${draft} in draft`}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 20 }}>
        <AdminCard padded={false}>
          <div
            style={{
              padding: "16px 18px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                Recent submissions
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--fg-muted)",
                  marginTop: 2,
                }}
              >
                Last {recentSubs.length} contact form messages
              </div>
            </div>
            <Link
              href="/admin/submissions"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12.5,
                color: "var(--fg-muted)",
                textDecoration: "none",
                padding: "6px 10px",
                borderRadius: 6,
              }}
            >
              View all <ArrowUpRight size={13} />
            </Link>
          </div>
          <div>
            {recentSubs.length === 0 ? (
              <EmptyState
                icon={Inbox}
                title="No submissions yet"
                description="When customers fill out the contact form, they'll appear here."
              />
            ) : (
              recentSubs.map((s, i) => (
                <Link
                  key={s.id}
                  href={`/admin/submissions?id=${s.id}`}
                  style={{
                    display: "block",
                    textAlign: "left",
                    padding: "14px 18px",
                    borderTop: i === 0 ? "none" : "1px solid var(--border)",
                    color: "var(--fg)",
                    textDecoration: "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      marginBottom: 4,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        minWidth: 0,
                      }}
                    >
                      {!s.read && (
                        <span
                          style={{
                            width: 7,
                            height: 7,
                            borderRadius: 99,
                            background: "var(--accent)",
                            flexShrink: 0,
                          }}
                        />
                      )}
                      <span
                        className="mono"
                        style={{
                          fontSize: 12.5,
                          color: "var(--fg)",
                          fontWeight: 500,
                        }}
                      >
                        {s.phone_number}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "var(--fg-subtle)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        · {s.mail}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 11.5,
                        color: "var(--fg-subtle)",
                        flexShrink: 0,
                      }}
                    >
                      {timeAgo(s.createdAt)}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: "var(--fg-muted)",
                      lineHeight: 1.55,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 1,
                      textOverflow: "ellipsis",
                    }}
                  >
                    {s.note}
                  </div>
                </Link>
              ))
            )}
          </div>
        </AdminCard>

        <AdminCard padded={false}>
          <div
            style={{
              padding: "16px 18px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                Recently updated products
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--fg-muted)",
                  marginTop: 2,
                }}
              >
                Last {recentProducts.length} products edited or added
              </div>
            </div>
            <Link
              href="/admin/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 12.5,
                color: "var(--fg-muted)",
                textDecoration: "none",
                padding: "6px 10px",
                borderRadius: 6,
              }}
            >
              View all <ArrowUpRight size={13} />
            </Link>
          </div>
          {recentProducts.length === 0 ? (
            <EmptyState
              icon={Package}
              title="No products yet"
              description="Create your first product in the Products tab."
            />
          ) : (
            <div
              style={{
                padding: 14,
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 10,
              }}
            >
              {recentProducts.map((p) => {
                const coverImg = p.images[0]?.url ?? null;
                const cover = thumbCover(p.id, p.title);
                return (
                  <Link
                    key={p.id}
                    href={`/admin/products/${p.id}`}
                    style={{
                      display: "flex",
                      gap: 10,
                      padding: 10,
                      background: "transparent",
                      border: "1px solid var(--border)",
                      borderRadius: 9,
                      color: "var(--fg)",
                      textDecoration: "none",
                    }}
                  >
                    <ProductThumb cover={cover} src={coverImg} size={44} />
                    <div
                      style={{
                        minWidth: 0,
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12.5,
                          fontWeight: 500,
                          letterSpacing: "-0.005em",
                          lineHeight: 1.3,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                          textOverflow: "ellipsis",
                        }}
                      >
                        {p.title}
                      </div>
                      <div
                        style={{ fontSize: 11, color: "var(--fg-subtle)" }}
                      >
                        {p.category?.name ?? "—"}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: 2,
                        }}
                      >
                        <span
                          className="mono"
                          style={{
                            fontSize: 12,
                            color: "var(--fg)",
                            fontWeight: 500,
                          }}
                        >
                          {formatTugrug(p.price)}
                        </span>
                        <StatusBadge published={p.published} />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </AdminCard>
      </div>
    </PageContainer>
  );
}
