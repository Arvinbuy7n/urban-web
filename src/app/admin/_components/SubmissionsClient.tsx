"use client";

import * as React from "react";
import {
  Calendar,
  Check,
  Inbox,
  Mail,
  MailOpen,
  Phone,
  Search,
  Trash,
} from "lucide-react";
import type { Submission } from "@/src/lib/supabase/admin/client";
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminDialog,
  AdminInput,
  AdminToggle,
  EmptyState,
  PageContainer,
  PageHeader,
  useAdminToast,
} from "./Primitives";
import { formatDateTime, timeAgo } from "../_lib/Format";
import { deleteSubmission, setSubmissionRead } from "@/src/lib/supabase/admin/actions";

export function SubmissionsClient({
  submissions,
  initialId,
}: {
  submissions: Submission[];
  initialId?: number;
}) {
  const { push } = useAdminToast();
  const [subs, setSubs] = React.useState(submissions);
  const [selectedId, setSelectedId] = React.useState<number | undefined>(
    initialId ?? submissions[0]?.id
  );
  const [search, setSearch] = React.useState("");
  const [unreadOnly, setUnreadOnly] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState<Submission | null>(
    null
  );
  const [pending, startTransition] = React.useTransition();

  React.useEffect(() => {
    setSubs(submissions);
  }, [submissions]);

  const filtered = React.useMemo(() => {
    let list = [...subs].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.phone_number.toLowerCase().includes(q) ||
          s.mail.toLowerCase().includes(q) ||
          s.note.toLowerCase().includes(q)
      );
    }
    if (unreadOnly) list = list.filter((s) => !s.read);
    return list;
  }, [subs, search, unreadOnly]);

  const selected = subs.find((s) => s.id === selectedId);

  React.useEffect(() => {
    if (!selected || selected.read) return;
    const id = selected.id;
    const t = setTimeout(() => {
      setSubs((prev) =>
        prev.map((s) => (s.id === id ? { ...s, read: true } : s))
      );
      setSubmissionRead(id, true).catch(() => {
        // ignore: if the column doesn't exist we just keep local state optimistic
      });
    }, 800);
    return () => clearTimeout(t);
  }, [selectedId, selected]);

  const markRead = (id: number, read: boolean) => {
    setSubs((prev) => prev.map((s) => (s.id === id ? { ...s, read } : s)));
    startTransition(async () => {
      try {
        await setSubmissionRead(id, read);
      } catch (e) {
        push((e as Error).message, "error");
      }
    });
  };

  const doDelete = () => {
    if (!confirmDelete) return;
    const id = confirmDelete.id;
    const next = subs.filter((s) => s.id !== id);
    setSubs(next);
    setSelectedId(next[0]?.id);
    setConfirmDelete(null);
    startTransition(async () => {
      try {
        await deleteSubmission(id);
        push("Submission deleted");
      } catch (e) {
        push((e as Error).message, "error");
      }
    });
  };

  const unreadCount = subs.filter((s) => !s.read).length;

  return (
    <PageContainer maxWidth={1280}>
      <PageHeader
        title="Submissions"
        description={`${unreadCount} unread of ${subs.length} total contact form submissions`}
      />

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 14,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 260px", minWidth: 200, maxWidth: 420 }}>
          <AdminInput
            leftIcon={Search}
            placeholder="Search phone, email, or note…"
            value={search}
            onChange={setSearch}
          />
        </div>
        <AdminButton variant="outline" leftIcon={Calendar}>
          Date range
        </AdminButton>
        <div
          style={{
            marginLeft: "auto",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "0 12px",
            height: 34,
            border: "1px solid var(--border-strong)",
            borderRadius: 7,
            background: "var(--panel)",
            boxShadow: "var(--shadow-xs)",
          }}
        >
          <span style={{ fontSize: 12.5, color: "var(--fg-muted)" }}>
            Unread only
          </span>
          <AdminToggle
            checked={unreadOnly}
            onChange={setUnreadOnly}
            size="sm"
          />
        </div>
      </div>

      <AdminCard padded={false} style={{ overflow: "hidden" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 40fr) minmax(0, 60fr)",
            minHeight: 560,
          }}
        >
          <div
            style={{
              borderRight: "1px solid var(--border)",
              display: "flex",
              flexDirection: "column",
              maxHeight: 680,
              overflow: "auto",
            }}
          >
            {filtered.length === 0 ? (
              <EmptyState
                icon={Inbox}
                title="No submissions"
                description={
                  search || unreadOnly
                    ? "No submissions match your filters."
                    : "New contact form messages will appear here."
                }
              />
            ) : (
              filtered.map((s, i) => {
                const isSel = s.id === selectedId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedId(s.id)}
                    style={{
                      display: "block",
                      textAlign: "left",
                      border: "none",
                      cursor: "pointer",
                      padding: "14px 16px",
                      borderTop: i === 0 ? "none" : "1px solid var(--border)",
                      background: isSel ? "var(--accent-soft)" : "transparent",
                      color: "var(--fg)",
                      borderLeft: isSel
                        ? "2px solid var(--accent)"
                        : "2px solid transparent",
                      transition: "background 100ms ease",
                    }}
                    onMouseEnter={(e) =>
                      !isSel &&
                      (e.currentTarget.style.background = "var(--bg-muted)")
                    }
                    onMouseLeave={(e) =>
                      !isSel &&
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 10,
                        marginBottom: 3,
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
                          style={{
                            fontSize: 13,
                            fontWeight: s.read ? 400 : 600,
                            color: "var(--fg)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            letterSpacing: "-0.005em",
                          }}
                        >
                          {s.mail}
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
                      className="mono"
                      style={{
                        fontSize: 11.5,
                        color: "var(--fg-subtle)",
                        marginBottom: 5,
                      }}
                    >
                      {s.phone_number}
                    </div>
                    <div
                      style={{
                        fontSize: 12.5,
                        color: "var(--fg-muted)",
                        lineHeight: 1.5,
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        textOverflow: "ellipsis",
                      }}
                    >
                      {s.note}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          <div
            style={{
              minHeight: 560,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {!selected ? (
              <EmptyState
                icon={MailOpen}
                title="Select a submission"
                description="Choose a submission from the list to view details."
              />
            ) : (
              <>
                <div
                  style={{
                    padding: "18px 24px 14px",
                    borderBottom: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 4,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {selected.mail}
                      </div>
                      {!selected.read && (
                        <AdminBadge variant="primary" size="sm">
                          New
                        </AdminBadge>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--fg-subtle)" }}>
                      Received {formatDateTime(selected.createdAt)}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <AdminButton
                      variant="outline"
                      size="sm"
                      leftIcon={selected.read ? Mail : Check}
                      onClick={() => markRead(selected.id, !selected.read)}
                      disabled={pending}
                    >
                      {selected.read ? "Mark unread" : "Mark read"}
                    </AdminButton>
                    <AdminButton
                      variant="dangerOutline"
                      size="sm"
                      leftIcon={Trash}
                      onClick={() => setConfirmDelete(selected)}
                    >
                      Delete
                    </AdminButton>
                  </div>
                </div>

                <div
                  style={{
                    padding: 24,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <ContactRow icon={Phone} label="Phone">
                    <a
                      href={`tel:${selected.phone_number.replace(/\s/g, "")}`}
                      className="mono"
                      style={{
                        fontSize: 13,
                        color: "var(--fg)",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      {selected.phone_number}
                    </a>
                  </ContactRow>
                  <ContactRow icon={Mail} label="Email">
                    <a
                      href={`mailto:${selected.mail}`}
                      style={{
                        fontSize: 13,
                        color: "var(--fg)",
                        textDecoration: "none",
                        fontWeight: 500,
                      }}
                    >
                      {selected.mail}
                    </a>
                  </ContactRow>
                </div>

                <div style={{ padding: "20px 24px", flex: 1 }}>
                  <div
                    style={{
                      fontSize: 11.5,
                      fontWeight: 500,
                      color: "var(--fg-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      marginBottom: 10,
                    }}
                  >
                    Message
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "var(--fg)",
                      lineHeight: 1.65,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {selected.note}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </AdminCard>

      <AdminDialog
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete this submission?"
        description="This message will be permanently removed. This action cannot be undone."
        footer={
          <>
            <AdminButton variant="ghost" onClick={() => setConfirmDelete(null)}>
              Cancel
            </AdminButton>
            <AdminButton variant="danger" onClick={doDelete} disabled={pending}>
              Delete
            </AdminButton>
          </>
        }
      />
    </PageContainer>
  );
}

function ContactRow({
  icon: IconC,
  label,
  children,
}: {
  icon: typeof Phone;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: "var(--bg-sunken)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--fg-subtle)",
          flexShrink: 0,
        }}
      >
        <IconC size={14} />
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 11,
            color: "var(--fg-subtle)",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            marginBottom: 2,
          }}
        >
          {label}
        </div>
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
