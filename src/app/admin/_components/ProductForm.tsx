"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  FolderTree,
  GripVertical,
  Lock,
  Unlock,
  Upload,
  X,
} from "lucide-react";
import type {
  AdminCategory,
  AdminProduct,
} from "@/src/lib/supabase/admin/client";
import type { ProductImage } from "@/src/lib/supabase/types";
import {
  AdminBadge,
  AdminButton,
  AdminCard,
  AdminInput,
  AdminSelect,
  AdminTextarea,
  AdminToggle,
  PageContainer,
  SectionHeader,
  TagBadge,
  useAdminToast,
} from "./Primitives";
import { formatTugrug, slugify, timeAgo } from "../_lib/Format";
import { removeProductImage, saveProduct } from "@/src/lib/supabase/admin/actions";

type TagVariant = AdminProduct["tagVariant"];

export function ProductForm({
  product,
  categories,
}: {
  product: AdminProduct | null;
  categories: AdminCategory[];
}) {
  const router = useRouter();
  const { push } = useAdminToast();
  const existing = !!product;
  const [form, setForm] = React.useState(() => ({
    title: product?.title ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    price: product?.price ?? 0,
    tag: product?.tag ?? "",
    tagVariant: (product?.tagVariant ?? "default") as TagVariant,
    published: product?.published ?? false,
    categoryId: product?.categoryId ?? null,
  }));
  const [slugLocked, setSlugLocked] = React.useState(existing);
  const [dirty, setDirty] = React.useState(false);
  const [dragOver, setDragOver] = React.useState(false);
  const [existingImages, setExistingImages] = React.useState<ProductImage[]>(
    product?.images ?? []
  );
  const [pendingImages, setPendingImages] = React.useState<
    Array<{ name: string; type: string; dataUrl: string; data: string }>
  >([]);
  const [saving, startTransition] = React.useTransition();
  const fileRef = React.useRef<HTMLInputElement>(null);

  const update = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K]
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
    setDirty(true);
  };

  React.useEffect(() => {
    if (!slugLocked && form.title) {
      setForm((f) => ({ ...f, slug: slugify(form.title) }));
    }
  }, [form.title, slugLocked]);

  const categoryOptions = React.useMemo(
    () =>
      categories.map((c) => {
        const parent =
          c.parentId != null
            ? categories.find((x) => x.id === c.parentId)
            : null;
        return {
          value: String(c.id),
          label: parent ? `${parent.name} › ${c.name}` : c.name,
        };
      }),
    [categories]
  );

  const readFiles = async (files: FileList | File[]) => {
    const list = Array.from(files);
    const out: typeof pendingImages = [];
    for (const f of list) {
      const buf = await f.arrayBuffer();
      const bytes = new Uint8Array(buf);
      let bin = "";
      for (let i = 0; i < bytes.byteLength; i++)
        bin += String.fromCharCode(bytes[i]);
      const base64 = typeof btoa !== "undefined" ? btoa(bin) : "";
      const dataUrl = URL.createObjectURL(f);
      out.push({ name: f.name, type: f.type, dataUrl, data: base64 });
    }
    setPendingImages((prev) => [...prev, ...out]);
    setDirty(true);
  };

  const removePending = (i: number) => {
    setPendingImages((prev) => prev.filter((_, idx) => idx !== i));
    setDirty(true);
  };

  const removeExistingImage = (id: number) => {
    const previous = existingImages;
    setExistingImages((prev) => prev.filter((img) => img.id !== id));
    startTransition(async () => {
      try {
        await removeProductImage(id);
        push("Image removed");
      } catch (e) {
        setExistingImages(previous);
        push((e as Error).message, "error");
      }
    });
  };

  const save = (publishOverride?: boolean) => {
    const published =
      publishOverride !== undefined ? publishOverride : form.published;
    const uploads = pendingImages.map((p) => ({
      name: p.name,
      type: p.type,
      data: p.data,
    }));
    startTransition(async () => {
      try {
        const result = await saveProduct(
          {
            id: product?.id,
            title: form.title,
            slug: form.slug,
            description: form.description,
            price: form.price,
            tag: form.tag || null,
            tagVariant: form.tagVariant,
            categoryId: form.categoryId,
            published,
          },
          uploads
        );
        push(existing ? "Product saved" : "Product created");
        setDirty(false);
        setPendingImages([]);
        if (!existing) router.push(`/admin/products/${result.id}`);
        else router.refresh();
      } catch (e) {
        push((e as Error).message, "error");
      }
    });
  };

  return (
    <PageContainer maxWidth={1180}>
      <div style={{ marginBottom: 20 }}>
        <Link
          href="/admin/products"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            border: "none",
            background: "transparent",
            color: "var(--fg-subtle)",
            fontSize: 12.5,
            padding: 0,
            marginBottom: 10,
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={13} /> Back to products
        </Link>
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              {existing ? form.title || "Untitled product" : "New product"}
            </h1>
            <p
              style={{
                margin: "4px 0 0",
                fontSize: 13,
                color: "var(--fg-muted)",
              }}
            >
              {existing && product
                ? `Product ID #${product.id} · Updated ${timeAgo(
                    product.updatedAt
                  )}`
                : "Create a new product for the Urban Uniform catalog"}
            </p>
          </div>
          {dirty && (
            <AdminBadge variant="primary" leftDot>
              Unsaved changes
            </AdminBadge>
          )}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: 20,
          alignItems: "start",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <AdminCard>
            <Field label="Title">
              <AdminInput
                value={form.title}
                onChange={(v) => update("title", v)}
                placeholder="e.g. 3M H-700 хатуу малгай"
                size="lg"
              />
            </Field>
            <Field
              label="Slug"
              help="URL-friendly identifier. Edit manually if needed."
            >
              <AdminInput
                value={form.slug}
                onChange={(v) => update("slug", v)}
                prefix="/products/"
                readOnly={!slugLocked}
                suffix={
                  <button
                    type="button"
                    onClick={() => setSlugLocked(!slugLocked)}
                    title={
                      slugLocked
                        ? "Unlock to auto-generate from title"
                        : "Lock manual slug"
                    }
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
            </Field>
            <Field label="Description">
              <AdminTextarea
                value={form.description}
                onChange={(v) => update("description", v)}
                rows={6}
                placeholder="Бүтээгдэхүүний дэлгэрэнгүй тайлбар, стандарт, онцлог…"
              />
            </Field>
          </AdminCard>

          <AdminCard>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
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
                  Images
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--fg-muted)",
                    marginTop: 2,
                  }}
                >
                  First image is used as the cover. New uploads are saved when
                  you save the product.
                </div>
              </div>
              <AdminButton
                variant="outline"
                size="sm"
                leftIcon={Upload}
                onClick={() => fileRef.current?.click()}
              >
                Upload
              </AdminButton>
              <input
                ref={fileRef}
                type="file"
                multiple
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => {
                  if (e.target.files) readFiles(e.target.files);
                  e.target.value = "";
                }}
                style={{ display: "none" }}
              />
            </div>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                if (e.dataTransfer.files) readFiles(e.dataTransfer.files);
              }}
              style={{
                border: `1.5px dashed ${
                  dragOver ? "var(--accent)" : "var(--border-strong)"
                }`,
                background: dragOver
                  ? "var(--accent-soft)"
                  : "var(--bg-muted)",
                borderRadius: 10,
                padding: 22,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--fg-muted)",
                cursor: "pointer",
                transition: "all 140ms ease",
                marginBottom:
                  existingImages.length + pendingImages.length > 0 ? 14 : 0,
              }}
              onClick={() => fileRef.current?.click()}
            >
              <Upload
                size={20}
                style={{ color: "var(--fg-subtle)", marginBottom: 8 }}
              />
              <div
                style={{
                  fontSize: 13,
                  color: "var(--fg)",
                  fontWeight: 500,
                }}
              >
                Drop images here or click to upload
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  color: "var(--fg-subtle)",
                  marginTop: 3,
                }}
              >
                PNG, JPG, WEBP · up to 5 MB each
              </div>
            </div>

            {(existingImages.length > 0 || pendingImages.length > 0) && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
                  gap: 10,
                }}
              >
                {existingImages.map((img, i) => (
                  <ImageTile
                    key={`e-${img.id}`}
                    src={img.url}
                    isCover={i === 0}
                    onRemove={() => removeExistingImage(img.id)}
                  />
                ))}
                {pendingImages.map((img, i) => (
                  <ImageTile
                    key={`p-${i}`}
                    src={img.dataUrl}
                    isCover={existingImages.length === 0 && i === 0}
                    pending
                    onRemove={() => removePending(i)}
                  />
                ))}
              </div>
            )}
          </AdminCard>
        </div>

        <div
          style={{
            position: "sticky",
            top: 72,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <AdminCard padded={false}>
            <SectionHeader>Status</SectionHeader>
            <div
              style={{
                padding: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 99,
                    background: form.published
                      ? "var(--success)"
                      : "var(--fg-faint)",
                  }}
                />
                <span style={{ fontSize: 13, fontWeight: 500 }}>
                  {form.published ? "Published" : "Draft"}
                </span>
              </div>
              <AdminToggle
                checked={form.published}
                onChange={(v) => update("published", v)}
              />
            </div>
          </AdminCard>

          <AdminCard padded={false}>
            <SectionHeader>Category</SectionHeader>
            <div style={{ padding: 16 }}>
              <AdminSelect
                value={form.categoryId ? String(form.categoryId) : ""}
                placeholder="Select category…"
                onChange={(v) => update("categoryId", Number(v))}
                options={categoryOptions}
                leftIcon={FolderTree}
              />
            </div>
          </AdminCard>

          <AdminCard padded={false}>
            <SectionHeader>Pricing</SectionHeader>
            <div style={{ padding: 16 }}>
              <AdminInput
                type="number"
                value={form.price === 0 ? "" : String(form.price)}
                onChange={(v) => update("price", Number(v) || 0)}
                placeholder="0"
                prefix="₮"
              />
              {form.price > 0 && (
                <div
                  className="mono"
                  style={{
                    fontSize: 11.5,
                    color: "var(--fg-subtle)",
                    marginTop: 6,
                  }}
                >
                  {formatTugrug(form.price)}
                </div>
              )}
            </div>
          </AdminCard>

          <AdminCard padded={false}>
            <SectionHeader>Tag</SectionHeader>
            <div
              style={{
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <AdminInput
                value={form.tag ?? ""}
                onChange={(v) => update("tag", v)}
                placeholder="e.g. Best seller"
              />
              <AdminSelect
                value={form.tagVariant}
                onChange={(v) => update("tagVariant", v as TagVariant)}
                options={[
                  { value: "default", label: "Default" },
                  { value: "primary", label: "Primary (accent)" },
                  { value: "secondary", label: "Secondary" },
                  { value: "destructive", label: "Destructive" },
                  { value: "outline", label: "Outline" },
                ]}
              />
              {form.tag && (
                <div
                  style={{
                    padding: "8px 10px",
                    background: "var(--bg-muted)",
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 11.5,
                    color: "var(--fg-muted)",
                  }}
                >
                  <span>Preview</span>
                  <TagBadge tag={form.tag} variant={form.tagVariant} />
                </div>
              )}
            </div>
          </AdminCard>
        </div>
      </div>

      <div
        style={{
          position: "sticky",
          bottom: 0,
          background: "var(--panel)",
          borderTop: "1px solid var(--border)",
          margin: "24px -32px -64px",
          padding: "12px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: 12.5, color: "var(--fg-muted)" }}>
          {dirty
            ? "You have unsaved changes"
            : existing && product
            ? `Last saved ${timeAgo(product.updatedAt)}`
            : "Not saved yet"}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link href="/admin/products" style={{ textDecoration: "none" }}>
            <AdminButton variant="ghost">Cancel</AdminButton>
          </Link>
          <AdminButton
            variant="outline"
            onClick={() => save(false)}
            disabled={saving}
          >
            Save draft
          </AdminButton>
          <AdminButton
            variant="primary"
            onClick={() => save(true)}
            disabled={saving}
          >
            {form.published ? "Save" : "Publish"}
          </AdminButton>
        </div>
      </div>
    </PageContainer>
  );
}

function Field({
  label,
  help,
  children,
}: {
  label: string;
  help?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          display: "block",
          fontSize: 12.5,
          fontWeight: 500,
          color: "var(--fg)",
          marginBottom: 6,
          letterSpacing: "-0.005em",
        }}
      >
        {label}
      </label>
      {children}
      {help && (
        <div
          style={{
            fontSize: 11.5,
            color: "var(--fg-subtle)",
            marginTop: 5,
          }}
        >
          {help}
        </div>
      )}
    </div>
  );
}

function ImageTile({
  src,
  isCover,
  pending,
  onRemove,
}: {
  src: string;
  isCover: boolean;
  pending?: boolean;
  onRemove: () => void;
}) {
  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "1",
        borderRadius: 8,
        overflow: "hidden",
        border: "1px solid var(--border)",
        background: "var(--bg-sunken)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {isCover && (
        <div
          style={{
            position: "absolute",
            top: 6,
            left: 6,
            padding: "2px 6px",
            background: "rgba(0,0,0,0.7)",
            color: "#fff",
            fontSize: 10,
            borderRadius: 3,
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          COVER
        </div>
      )}
      {pending && (
        <div
          style={{
            position: "absolute",
            bottom: 6,
            left: 6,
            padding: "2px 6px",
            background: "var(--accent)",
            color: "#fff",
            fontSize: 10,
            borderRadius: 3,
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}
        >
          NEW
        </div>
      )}
      <button
        type="button"
        onClick={onRemove}
        title="Remove"
        style={{
          position: "absolute",
          top: 6,
          right: 6,
          width: 22,
          height: 22,
          border: "none",
          background: "rgba(0,0,0,0.7)",
          color: "#fff",
          borderRadius: 4,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <X size={11} />
      </button>
      <button
        type="button"
        title="Drag to reorder"
        style={{
          position: "absolute",
          bottom: 6,
          right: 6,
          width: 22,
          height: 22,
          border: "none",
          background: "rgba(0,0,0,0.55)",
          color: "#fff",
          borderRadius: 4,
          cursor: "grab",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GripVertical size={11} />
      </button>
    </div>
  );
}
