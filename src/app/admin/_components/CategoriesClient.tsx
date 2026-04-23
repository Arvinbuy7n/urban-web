"use client";

import * as React from "react";
import {
  ChevronRight,
  Edit,
  FolderPlus,
  FolderTree,
  GripVertical,
  Lock,
  Plus,
  Trash,
  Unlock,
} from "lucide-react";
import type { AdminCategory } from "@/src/lib/supabase/admin/client";
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminDialog,
  AdminInput,
  AdminSelect,
  AdminSheet,
  EmptyState,
  KebabMenu,
  PageContainer,
  PageHeader,
  useAdminToast,
} from "./Primitives";
import { slugify } from "../_lib/Format";
import { deleteCategory, saveCategory } from "@/src/lib/supabase/admin/actions";

type EditingState =
  | { mode: "new"; parentId: number | null }
  | { mode: "edit"; category: AdminCategory }
  | null;

export function CategoriesClient({
  categories,
}: {
  categories: AdminCategory[];
}) {
  const { push } = useAdminToast();
  const [editing, setEditing] = React.useState<EditingState>(null);
  const [confirmDelete, setConfirmDelete] = React.useState<AdminCategory | null>(null);
  const [expanded, setExpanded] = React.useState<Set<number>>(() => {
    const s = new Set<number>();
    for (const c of categories) if (c.parentId === null) s.add(c.id);
    return s;
  });
  const [pending, startTransition] = React.useTransition();

  const roots = categories.filter((c) => c.parentId === null);
  const childrenOf = (id: number) =>
    categories.filter((c) => c.parentId === id);

  const toggle = (id: number) => {
    const next = new Set(expanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpanded(next);
  };

  const doDelete = () => {
    if (!confirmDelete) return;
    const name = confirmDelete.name;
    const id = confirmDelete.id;
    startTransition(async () => {
      try {
        await deleteCategory(id);
        push(`"${name}" deleted`);
        setConfirmDelete(null);
      } catch (e) {
        push((e as Error).message, "error");
      }
    });
  };

  return (
    <PageContainer maxWidth={980}>
      <PageHeader
        title="Categories"
        description={`${categories.length} categories organizing ${categories.reduce(
          (a, c) => a + c.productCount,
          0
        )} products`}
        actions={
          <AdminButton
            variant="primary"
            leftIcon={Plus}
            onClick={() => setEditing({ mode: "new", parentId: null })}
          >
            New category
          </AdminButton>
        }
      />

      <AdminCard padded={false}>
        {roots.length === 0 ? (
          <EmptyState
            icon={FolderTree}
            title="No categories yet"
            description="Organize your catalog into a tree of categories. Start with top-level groups like Head protection or Footwear."
            action={
              <AdminButton
                variant="primary"
                leftIcon={Plus}
                onClick={() => setEditing({ mode: "new", parentId: null })}
              >
                Create your first category
              </AdminButton>
            }
          />
        ) : (
          <div>
            {roots.map((c, i) => (
              <CategoryRow
                key={c.id}
                cat={c}
                depth={0}
                childrenOf={childrenOf}
                expanded={expanded}
                toggle={toggle}
                onEdit={(cat) => setEditing({ mode: "edit", category: cat })}
                onDelete={setConfirmDelete}
                onAddChild={(p) =>
                  setEditing({ mode: "new", parentId: p.id })
                }
                first={i === 0}
              />
            ))}
          </div>
        )}
      </AdminCard>

      <CategoryEditSheet
        open={editing !== null}
        onClose={() => setEditing(null)}
        editing={editing}
        cats={categories}
      />

      <AdminDialog
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title={`Delete "${confirmDelete?.name ?? ""}"?`}
        description="This category and all its children will be permanently removed. Products in these categories will become uncategorized. This action cannot be undone."
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

function CategoryRow({
  cat,
  depth,
  childrenOf,
  expanded,
  toggle,
  onEdit,
  onDelete,
  onAddChild,
  first,
}: {
  cat: AdminCategory;
  depth: number;
  childrenOf: (id: number) => AdminCategory[];
  expanded: Set<number>;
  toggle: (id: number) => void;
  onEdit: (c: AdminCategory) => void;
  onDelete: (c: AdminCategory) => void;
  onAddChild: (c: AdminCategory) => void;
  first?: boolean;
}) {
  const kids = childrenOf(cat.id);
  const hasKids = kids.length > 0;
  const isOpen = expanded.has(cat.id);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          borderTop: first ? "none" : "1px solid var(--border)",
          paddingLeft: 16 + depth * 24,
          transition: "background 100ms ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = "var(--bg-muted)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.background = "transparent")
        }
      >
        <button
          type="button"
          title="Drag to reorder"
          style={{
            width: 20,
            height: 20,
            border: "none",
            background: "transparent",
            color: "var(--fg-faint)",
            cursor: "grab",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <GripVertical size={13} />
        </button>
        <button
          type="button"
          onClick={() => hasKids && toggle(cat.id)}
          disabled={!hasKids}
          style={{
            width: 20,
            height: 20,
            border: "none",
            background: "transparent",
            color: hasKids ? "var(--fg-muted)" : "transparent",
            cursor: hasKids ? "pointer" : "default",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transform: isOpen ? "rotate(90deg)" : "none",
            transition: "transform 140ms ease",
          }}
        >
          <ChevronRight size={14} />
        </button>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 6,
            background: depth === 0 ? "var(--accent-soft)" : "var(--bg-sunken)",
            color: depth === 0 ? "var(--accent)" : "var(--fg-subtle)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {hasKids ? <FolderTree size={12} /> : <FolderPlus size={12} />}
        </div>
        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: depth === 0 ? 500 : 400,
              color: "var(--fg)",
              letterSpacing: "-0.005em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {cat.name}
          </span>
          <span
            className="mono"
            style={{ fontSize: 11.5, color: "var(--fg-subtle)" }}
          >
            /{cat.slug}
          </span>
        </div>
        <AdminBadge variant="outline" size="sm">
          {cat.productCount} {cat.productCount === 1 ? "product" : "products"}
        </AdminBadge>
        <KebabMenu
          items={[
            { icon: Edit, label: "Edit", onClick: () => onEdit(cat) },
            { icon: Plus, label: "Add child", onClick: () => onAddChild(cat) },
            { divider: true },
            {
              icon: Trash,
              label: "Delete",
              onClick: () => onDelete(cat),
              danger: true,
            },
          ]}
        />
      </div>
      {isOpen &&
        kids.map((k) => (
          <CategoryRow
            key={k.id}
            cat={k}
            depth={depth + 1}
            childrenOf={childrenOf}
            expanded={expanded}
            toggle={toggle}
            onEdit={onEdit}
            onDelete={onDelete}
            onAddChild={onAddChild}
          />
        ))}
    </>
  );
}

function CategoryEditSheet({
  open,
  onClose,
  editing,
  cats,
}: {
  open: boolean;
  onClose: () => void;
  editing: EditingState;
  cats: AdminCategory[];
}) {
  const { push } = useAdminToast();
  const [form, setForm] = React.useState({
    name: "",
    slug: "",
    parentId: null as number | null,
  });
  const [slugLocked, setSlugLocked] = React.useState(false);
  const [pending, startTransition] = React.useTransition();

  React.useEffect(() => {
    if (!open || !editing) return;
    if (editing.mode === "edit") {
      setForm({
        name: editing.category.name,
        slug: editing.category.slug,
        parentId: editing.category.parentId,
      });
      setSlugLocked(true);
    } else {
      setForm({ name: "", slug: "", parentId: editing.parentId });
      setSlugLocked(false);
    }
  }, [open, editing]);

  React.useEffect(() => {
    if (!slugLocked && form.name) {
      setForm((f) => ({ ...f, slug: slugify(form.name) }));
    }
  }, [form.name, slugLocked]);

  const invalidIds = React.useMemo(() => {
    if (!editing || editing.mode !== "edit") return new Set<number>();
    const target = editing.category.id;
    const set = new Set<number>([target]);
    let changed = true;
    while (changed) {
      changed = false;
      for (const c of cats) {
        if (c.parentId != null && set.has(c.parentId) && !set.has(c.id)) {
          set.add(c.id);
          changed = true;
        }
      }
    }
    return set;
  }, [editing, cats]);

  const parentOptions = [
    { value: "null", label: "— No parent (top level) —" },
    ...cats
      .filter((c) => !invalidIds.has(c.id) && c.parentId === null)
      .map((c) => ({ value: String(c.id), label: c.name })),
  ];

  const submit = () => {
    const editingId = editing?.mode === "edit" ? editing.category.id : undefined;
    startTransition(async () => {
      try {
        await saveCategory({
          id: editingId,
          name: form.name,
          slug: form.slug,
          parentId: form.parentId,
        });
        push(editingId ? "Category updated" : "Category created");
        onClose();
      } catch (e) {
        push((e as Error).message, "error");
      }
    });
  };

  const title = editing?.mode === "edit" ? "Edit category" : "New category";
  const description =
    editing?.mode === "edit"
      ? `Editing "${editing.category.name}"`
      : "Create a new category in your catalog";

  return (
    <AdminSheet
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      footer={
        <>
          <AdminButton variant="ghost" onClick={onClose}>
            Cancel
          </AdminButton>
          <AdminButton
            variant="primary"
            onClick={submit}
            disabled={!form.name.trim() || pending}
          >
            {editing?.mode === "edit" ? "Save" : "Create"}
          </AdminButton>
        </>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label style={labelStyle}>Name</label>
          <AdminInput
            value={form.name}
            onChange={(v) => setForm((f) => ({ ...f, name: v }))}
            placeholder="e.g. Safety boots"
            autoFocus
          />
        </div>
        <div>
          <label style={labelStyle}>Slug</label>
          <AdminInput
            value={form.slug}
            onChange={(v) => setForm((f) => ({ ...f, slug: v }))}
            prefix="/"
            readOnly={!slugLocked}
            suffix={
              <button
                type="button"
                onClick={() => setSlugLocked(!slugLocked)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "var(--fg-subtle)",
                  cursor: "pointer",
                  padding: 2,
                  display: "flex",
                }}
              >
                {slugLocked ? <Lock size={13} /> : <Unlock size={13} />}
              </button>
            }
          />
          <div
            style={{
              fontSize: 11.5,
              color: "var(--fg-subtle)",
              marginTop: 5,
            }}
          >
            Auto-generated from name. Unlock to edit manually.
          </div>
        </div>
        <div>
          <label style={labelStyle}>Parent category</label>
          <AdminSelect
            value={form.parentId === null ? "null" : String(form.parentId)}
            onChange={(v) =>
              setForm((f) => ({
                ...f,
                parentId: v === "null" ? null : Number(v),
              }))
            }
            options={parentOptions}
          />
        </div>
      </div>
    </AdminSheet>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12.5,
  fontWeight: 500,
  color: "var(--fg)",
  marginBottom: 6,
};
