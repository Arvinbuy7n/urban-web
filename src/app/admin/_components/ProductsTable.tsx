"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Copy,
  Edit,
  Package,
  Plus,
  Search,
  Trash,
  X,
} from "lucide-react";
import type { AdminProduct, AdminCategory } from "@/src/lib/supabase/admin/client";
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminCheckbox,
  AdminDialog,
  AdminInput,
  AdminSelect,
  EmptyState,
  KebabMenu,
  PageContainer,
  PageHeader,
  ProductThumb,
  StatusBadge,
  TagBadge,
  useAdminToast,
} from "./Primitives";
import { formatTugrug, thumbCover, timeAgo } from "../_lib/Format";
import {
  deleteProduct,
  deleteProducts,
  duplicateProduct,
  setProductsPublished,
} from "@/src/lib/supabase/admin/actions";

type SortKey = "title" | "category" | "price" | "updatedAt";

export function ProductsTable({
  products,
  categories,
}: {
  products: AdminProduct[];
  categories: AdminCategory[];
}) {
  const { push } = useAdminToast();
  const [search, setSearch] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [tagFilter, setTagFilter] = React.useState("all");
  const [selected, setSelected] = React.useState<Set<number>>(new Set());
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [sort, setSort] = React.useState<{ key: SortKey; dir: "asc" | "desc" }>(
    { key: "updatedAt", dir: "desc" }
  );
  const [confirmDelete, setConfirmDelete] = React.useState<
    AdminProduct | "bulk" | null
  >(null);
  const [pending, startTransition] = React.useTransition();

  const filtered = React.useMemo(() => {
    let list = products;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q)
      );
    }
    if (categoryFilter !== "all")
      list = list.filter((p) => String(p.categoryId) === categoryFilter);
    if (statusFilter !== "all")
      list = list.filter((p) =>
        statusFilter === "published" ? p.published : !p.published
      );
    if (tagFilter !== "all") list = list.filter((p) => p.tagVariant === tagFilter);
    list = [...list].sort((a, b) => {
      let av: string | number;
      let bv: string | number;
      if (sort.key === "updatedAt") {
        av = new Date(a.updatedAt).getTime();
        bv = new Date(b.updatedAt).getTime();
      } else if (sort.key === "category") {
        av = a.category?.name ?? "";
        bv = b.category?.name ?? "";
      } else if (sort.key === "price") {
        av = a.price;
        bv = b.price;
      } else {
        av = a.title;
        bv = b.title;
      }
      if (av < bv) return sort.dir === "asc" ? -1 : 1;
      if (av > bv) return sort.dir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [products, search, categoryFilter, statusFilter, tagFilter, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);
  const allSelected =
    pageItems.length > 0 && pageItems.every((p) => selected.has(p.id));
  const someSelected = pageItems.some((p) => selected.has(p.id));

  const toggleSort = (key: SortKey) =>
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" }
    );

  const clearSel = () => setSelected(new Set());

  const handleBulk = (action: "publish" | "unpublish" | "delete") => {
    if (action === "delete") {
      setConfirmDelete("bulk");
      return;
    }
    const ids = Array.from(selected);
    startTransition(async () => {
      try {
        await setProductsPublished(ids, action === "publish");
        push(
          `${ids.length} product${ids.length > 1 ? "s" : ""} ${
            action === "publish" ? "published" : "unpublished"
          }`
        );
        clearSel();
      } catch (e) {
        push((e as Error).message, "error");
      }
    });
  };

  const doDelete = () => {
    if (confirmDelete === "bulk") {
      const ids = Array.from(selected);
      startTransition(async () => {
        try {
          await deleteProducts(ids);
          push(`${ids.length} product${ids.length > 1 ? "s" : ""} deleted`);
          clearSel();
          setConfirmDelete(null);
        } catch (e) {
          push((e as Error).message, "error");
        }
      });
    } else if (confirmDelete) {
      const title = confirmDelete.title;
      const id = confirmDelete.id;
      startTransition(async () => {
        try {
          await deleteProduct(id);
          push(`"${title}" deleted`);
          setConfirmDelete(null);
        } catch (e) {
          push((e as Error).message, "error");
        }
      });
    }
  };

  const doDuplicate = (p: AdminProduct) => {
    startTransition(async () => {
      try {
        await duplicateProduct(p.id);
        push("Product duplicated");
      } catch (e) {
        push((e as Error).message, "error");
      }
    });
  };

  const categoryOptions = [
    { value: "all", label: "All categories" },
    ...categories
      .filter((c) => c.parentId !== null)
      .map((c) => {
        const parent = categories.find((x) => x.id === c.parentId);
        return {
          value: String(c.id),
          label: parent ? `${parent.name} › ${c.name}` : c.name,
        };
      }),
  ];

  const thStyle = (w?: number): React.CSSProperties => ({
    height: 40,
    padding: "0 14px",
    fontSize: 11.5,
    fontWeight: 500,
    color: "var(--fg-muted)",
    textAlign: "left",
    letterSpacing: "0.01em",
    whiteSpace: "nowrap",
    width: w,
  });
  const tdStyle: React.CSSProperties = { padding: "0 14px", verticalAlign: "middle" };

  return (
    <PageContainer>
      <PageHeader
        title="Products"
        description={`${filtered.length} of ${products.length} products`}
        actions={
          <Link href="/admin/products/new" style={{ textDecoration: "none" }}>
            <AdminButton variant="primary" leftIcon={Plus}>
              New product
            </AdminButton>
          </Link>
        }
      />

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 14,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div style={{ flex: "1 1 260px", minWidth: 200, maxWidth: 360 }}>
          <AdminInput
            leftIcon={Search}
            placeholder="Search by title or slug…"
            value={search}
            onChange={setSearch}
          />
        </div>
        <AdminSelect
          value={categoryFilter}
          onChange={setCategoryFilter}
          options={categoryOptions}
          style={{ width: 200 }}
        />
        <AdminSelect
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: "all", label: "All statuses" },
            { value: "published", label: "Published" },
            { value: "draft", label: "Draft" },
          ]}
          style={{ width: 140 }}
        />
        <AdminSelect
          value={tagFilter}
          onChange={setTagFilter}
          options={[
            { value: "all", label: "All tags" },
            { value: "default", label: "Default" },
            { value: "primary", label: "Primary" },
            { value: "secondary", label: "Secondary" },
            { value: "destructive", label: "Destructive" },
            { value: "outline", label: "Outline" },
          ]}
          style={{ width: 140 }}
        />
      </div>

      <AdminCard padded={false} style={{ overflow: "hidden" }}>
        <div style={{ overflow: "auto" }}>
          <table style={{ minWidth: 1000 }}>
            <thead>
              <tr
                style={{
                  background: "var(--bg-muted)",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <th style={thStyle(44)}>
                  <AdminCheckbox
                    checked={allSelected}
                    indeterminate={someSelected && !allSelected}
                    onChange={(v) => {
                      const next = new Set(selected);
                      if (v) pageItems.forEach((p) => next.add(p.id));
                      else pageItems.forEach((p) => next.delete(p.id));
                      setSelected(next);
                    }}
                  />
                </th>
                <th style={thStyle(56)}></th>
                <th style={thStyle()}>
                  <SortHead
                    label="Title"
                    active={sort.key === "title"}
                    dir={sort.dir}
                    onClick={() => toggleSort("title")}
                  />
                </th>
                <th style={thStyle(160)}>
                  <SortHead
                    label="Category"
                    active={sort.key === "category"}
                    dir={sort.dir}
                    onClick={() => toggleSort("category")}
                  />
                </th>
                <th style={{ ...thStyle(110), textAlign: "right" }}>
                  <SortHead
                    label="Price"
                    active={sort.key === "price"}
                    dir={sort.dir}
                    onClick={() => toggleSort("price")}
                    align="right"
                  />
                </th>
                <th style={thStyle(120)}>Tag</th>
                <th style={thStyle(110)}>Status</th>
                <th style={thStyle(100)}>
                  <SortHead
                    label="Updated"
                    active={sort.key === "updatedAt"}
                    dir={sort.dir}
                    onClick={() => toggleSort("updatedAt")}
                  />
                </th>
                <th style={thStyle(44)}></th>
              </tr>
            </thead>
            <tbody>
              {pageItems.length === 0 ? (
                <tr>
                  <td colSpan={9}>
                    <EmptyState
                      icon={Package}
                      title={
                        products.length === 0
                          ? "No products yet"
                          : "No products match your filters"
                      }
                      description={
                        products.length === 0
                          ? "Create your first product to start building the Urban Uniform catalog."
                          : "Try clearing a filter or adjusting your search."
                      }
                      action={
                        products.length === 0 ? (
                          <Link
                            href="/admin/products/new"
                            style={{ textDecoration: "none" }}
                          >
                            <AdminButton variant="primary" leftIcon={Plus}>
                              Create your first product
                            </AdminButton>
                          </Link>
                        ) : (
                          <AdminButton
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSearch("");
                              setCategoryFilter("all");
                              setStatusFilter("all");
                              setTagFilter("all");
                            }}
                          >
                            Clear filters
                          </AdminButton>
                        )
                      }
                    />
                  </td>
                </tr>
              ) : (
                pageItems.map((p) => {
                  const isSel = selected.has(p.id);
                  return (
                    <tr
                      key={p.id}
                      style={{
                        borderBottom: "1px solid var(--border)",
                        height: "var(--row-h)",
                        background: isSel ? "var(--accent-soft)" : "transparent",
                        transition: "background 100ms ease",
                      }}
                    >
                      <td style={tdStyle}>
                        <AdminCheckbox
                          checked={isSel}
                          onChange={(v) => {
                            const next = new Set(selected);
                            if (v) next.add(p.id);
                            else next.delete(p.id);
                            setSelected(next);
                          }}
                        />
                      </td>
                      <td style={tdStyle}>
                        <Link
                          href={`/admin/products/${p.id}`}
                          style={{ display: "inline-block" }}
                        >
                          <ProductThumb
                            cover={thumbCover(p.id, p.title)}
                            src={p.images[0]?.url ?? null}
                            size={36}
                          />
                        </Link>
                      </td>
                      <td style={tdStyle}>
                        <Link
                          href={`/admin/products/${p.id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 500,
                              color: "var(--fg)",
                              lineHeight: 1.3,
                              letterSpacing: "-0.005em",
                              maxWidth: 360,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {p.title}
                          </div>
                          <div
                            className="mono"
                            style={{
                              fontSize: 11.5,
                              color: "var(--fg-subtle)",
                              marginTop: 1,
                            }}
                          >
                            /{p.slug}
                          </div>
                        </Link>
                      </td>
                      <td style={tdStyle}>
                        {p.category ? (
                          <AdminBadge variant="outline">{p.category.name}</AdminBadge>
                        ) : (
                          <span style={{ color: "var(--fg-faint)" }}>—</span>
                        )}
                      </td>
                      <td style={{ ...tdStyle, textAlign: "right" }}>
                        <span
                          className="mono"
                          style={{
                            fontSize: 13,
                            color: "var(--fg)",
                            fontWeight: 500,
                          }}
                        >
                          {formatTugrug(p.price)}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <TagBadge tag={p.tag} variant={p.tagVariant} />
                      </td>
                      <td style={tdStyle}>
                        <StatusBadge published={p.published} />
                      </td>
                      <td style={tdStyle}>
                        <span style={{ fontSize: 12, color: "var(--fg-muted)" }}>
                          {timeAgo(p.updatedAt)}
                        </span>
                      </td>
                      <td style={tdStyle}>
                        <KebabMenu
                          items={[
                            {
                              icon: Edit,
                              label: "Edit",
                              onClick: () => {
                                window.location.href = `/admin/products/${p.id}`;
                              },
                            },
                            {
                              icon: Copy,
                              label: "Duplicate",
                              onClick: () => doDuplicate(p),
                            },
                            { divider: true },
                            {
                              icon: Trash,
                              label: "Delete",
                              onClick: () => setConfirmDelete(p),
                              danger: true,
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderTop: "1px solid var(--border)",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <div style={{ fontSize: 12.5, color: "var(--fg-muted)" }}>
              Showing{" "}
              <b style={{ color: "var(--fg)", fontWeight: 500 }}>
                {(page - 1) * pageSize + 1}–
                {Math.min(page * pageSize, filtered.length)}
              </b>{" "}
              of{" "}
              <b style={{ color: "var(--fg)", fontWeight: 500 }}>
                {filtered.length}
              </b>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12.5,
                  color: "var(--fg-muted)",
                }}
              >
                Rows
                <AdminSelect
                  value={String(pageSize)}
                  size="sm"
                  style={{ width: 68 }}
                  onChange={(v) => {
                    setPageSize(Number(v));
                    setPage(1);
                  }}
                  options={[
                    { value: "10", label: "10" },
                    { value: "25", label: "25" },
                    { value: "50", label: "50" },
                  ]}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <AdminButton
                  variant="outline"
                  size="iconSm"
                  disabled={page <= 1}
                  onClick={() => setPage(1)}
                  title="First"
                >
                  <ChevronsLeft size={13} />
                </AdminButton>
                <AdminButton
                  variant="outline"
                  size="iconSm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={13} />
                </AdminButton>
                <span
                  style={{
                    fontSize: 12.5,
                    color: "var(--fg-muted)",
                    padding: "0 8px",
                    minWidth: 70,
                    textAlign: "center",
                  }}
                >
                  Page{" "}
                  <b style={{ color: "var(--fg)", fontWeight: 500 }}>{page}</b>{" "}
                  of {pageCount}
                </span>
                <AdminButton
                  variant="outline"
                  size="iconSm"
                  disabled={page >= pageCount}
                  onClick={() =>
                    setPage((p) => Math.min(pageCount, p + 1))
                  }
                >
                  <ChevronRight size={13} />
                </AdminButton>
                <AdminButton
                  variant="outline"
                  size="iconSm"
                  disabled={page >= pageCount}
                  onClick={() => setPage(pageCount)}
                  title="Last"
                >
                  <ChevronsRight size={13} />
                </AdminButton>
              </div>
            </div>
          </div>
        )}
      </AdminCard>

      {selected.size > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--fg)",
            color: "var(--bg)",
            borderRadius: 10,
            padding: "8px 8px 8px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "var(--shadow-pop)",
            zIndex: 50,
            animation: "admin-fadeIn 180ms cubic-bezier(0.2,0.8,0.2,1)",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 500 }}>
            {selected.size} selected
          </span>
          <div
            style={{
              width: 1,
              height: 20,
              background: "rgba(255,255,255,0.15)",
            }}
          />
          <button
            onClick={() => handleBulk("publish")}
            disabled={pending}
            style={bulkBtnStyle}
          >
            Publish
          </button>
          <button
            onClick={() => handleBulk("unpublish")}
            disabled={pending}
            style={bulkBtnStyle}
          >
            Unpublish
          </button>
          <button
            onClick={() => handleBulk("delete")}
            disabled={pending}
            style={{ ...bulkBtnStyle, color: "#fca5a5" }}
          >
            Delete
          </button>
          <button
            onClick={clearSel}
            title="Clear selection"
            style={{
              width: 28,
              height: 28,
              border: "none",
              background: "transparent",
              color: "rgba(255,255,255,0.6)",
              borderRadius: 5,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 2,
            }}
          >
            <X size={13} />
          </button>
        </div>
      )}

      <AdminDialog
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title={
          confirmDelete === "bulk"
            ? `Delete ${selected.size} products?`
            : "Delete this product?"
        }
        description={
          confirmDelete === "bulk"
            ? `This will permanently remove ${selected.size} products. This action cannot be undone.`
            : confirmDelete
            ? `"${confirmDelete.title}" will be permanently removed. This action cannot be undone.`
            : ""
        }
        footer={
          <>
            <AdminButton
              variant="ghost"
              onClick={() => setConfirmDelete(null)}
            >
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

const bulkBtnStyle: React.CSSProperties = {
  padding: "6px 10px",
  border: "none",
  background: "transparent",
  color: "#fff",
  fontSize: 12.5,
  fontWeight: 500,
  cursor: "pointer",
  borderRadius: 6,
  fontFamily: "inherit",
};

function SortHead({
  label,
  active,
  dir,
  onClick,
  align = "left",
}: {
  label: string;
  active: boolean;
  dir: "asc" | "desc";
  onClick: () => void;
  align?: "left" | "right";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        border: "none",
        background: "transparent",
        color: active ? "var(--fg)" : "var(--fg-muted)",
        fontSize: 11.5,
        fontWeight: 500,
        letterSpacing: "0.01em",
        padding: 0,
        cursor: "pointer",
        textTransform: "inherit",
        fontFamily: "inherit",
        width: align === "right" ? "100%" : "auto",
        justifyContent: align === "right" ? "flex-end" : "flex-start",
      }}
    >
      {label}
      {active ? (
        dir === "asc" ? (
          <ArrowUp size={11} strokeWidth={2} />
        ) : (
          <ArrowDown size={11} strokeWidth={2} />
        )
      ) : null}
    </button>
  );
}
