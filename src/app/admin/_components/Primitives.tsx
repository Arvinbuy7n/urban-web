"use client";

import * as React from "react";
import {
  Check,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  X,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";

// ─── Button ────────────────────────────────────────────────────────────────
type BtnVariant =
  | "default"
  | "primary"
  | "outline"
  | "ghost"
  | "danger"
  | "dangerOutline"
  | "link";
type BtnSize = "sm" | "md" | "lg" | "icon" | "iconSm";

export function AdminButton({
  variant = "default",
  size = "md",
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  children,
  disabled,
  onClick,
  type = "button",
  title,
  style,
  className,
}: {
  variant?: BtnVariant;
  size?: BtnSize;
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  type?: "button" | "submit" | "reset";
  title?: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  const [hover, setHover] = React.useState(false);
  const sizes: Record<BtnSize, React.CSSProperties> = {
    sm: { height: 28, padding: "0 10px", fontSize: 12.5, borderRadius: 6 },
    md: { height: 34, padding: "0 12px", fontSize: 13, borderRadius: 7 },
    lg: { height: 40, padding: "0 16px", fontSize: 14, borderRadius: 8 },
    icon: { width: 34, height: 34, padding: 0, borderRadius: 7 },
    iconSm: { width: 28, height: 28, padding: 0, borderRadius: 6 },
  };
  const variants: Record<BtnVariant, React.CSSProperties> = {
    default: {
      background: "var(--fg)",
      color: "var(--bg)",
      borderColor: "var(--fg)",
    },
    primary: {
      background: "var(--accent)",
      color: "#fff",
      borderColor: "var(--accent)",
    },
    outline: {
      background: "var(--panel)",
      color: "var(--fg)",
      borderColor: "var(--border-strong)",
    },
    ghost: {
      background: "transparent",
      color: "var(--fg-muted)",
      borderColor: "transparent",
    },
    danger: {
      background: "var(--danger)",
      color: "#fff",
      borderColor: "var(--danger)",
    },
    dangerOutline: {
      background: "var(--panel)",
      color: "var(--danger)",
      borderColor: "var(--border-strong)",
    },
    link: {
      background: "transparent",
      color: "var(--accent)",
      borderColor: "transparent",
      padding: 0,
      height: "auto",
    },
  };
  const hoverStyles: Record<BtnVariant, React.CSSProperties> = {
    default: { background: "#000", borderColor: "#000" },
    primary: {
      background: "var(--accent-hover)",
      borderColor: "var(--accent-hover)",
    },
    outline: {
      background: "var(--bg-muted)",
      borderColor: "var(--border-strong)",
    },
    ghost: { background: "var(--bg-sunken)" },
    danger: { background: "#b91c1c", borderColor: "#b91c1c" },
    dangerOutline: { background: "var(--danger-soft)" },
    link: { color: "var(--accent-hover)" },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={className}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        fontWeight: 500,
        letterSpacing: "-0.005em",
        whiteSpace: "nowrap",
        border: "1px solid transparent",
        transition: "all 140ms ease",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        userSelect: "none",
        ...sizes[size],
        ...variants[variant],
        ...(hover && !disabled ? hoverStyles[variant] : {}),
        ...style,
      }}
    >
      {LeftIcon && <LeftIcon size={size === "sm" ? 13 : 14} />}
      {children}
      {RightIcon && <RightIcon size={size === "sm" ? 13 : 14} />}
    </button>
  );
}

// ─── Badge ─────────────────────────────────────────────────────────────────
type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "destructive"
  | "outline"
  | "success"
  | "muted";

export function AdminBadge({
  variant = "default",
  size = "md",
  leftDot,
  children,
}: {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  leftDot?: boolean;
  children: React.ReactNode;
}) {
  const variants: Record<BadgeVariant, React.CSSProperties> = {
    default: {
      background: "var(--bg-sunken)",
      color: "var(--fg-muted)",
      border: "1px solid var(--border)",
    },
    primary: {
      background: "var(--accent-soft)",
      color: "var(--accent)",
      border: "1px solid transparent",
    },
    secondary: {
      background: "rgba(30,64,175,0.08)",
      color: "#1e40af",
      border: "1px solid transparent",
    },
    destructive: {
      background: "var(--danger-soft)",
      color: "var(--danger)",
      border: "1px solid transparent",
    },
    outline: {
      background: "transparent",
      color: "var(--fg-muted)",
      border: "1px solid var(--border-strong)",
    },
    success: {
      background: "var(--success-soft)",
      color: "var(--success)",
      border: "1px solid transparent",
    },
    muted: {
      background: "var(--bg-sunken)",
      color: "var(--fg-subtle)",
      border: "1px solid var(--border)",
    },
  };
  const sizes: Record<"sm" | "md", React.CSSProperties> = {
    sm: { height: 18, padding: "0 6px", fontSize: 10.5, borderRadius: 4 },
    md: { height: 22, padding: "0 8px", fontSize: 11.5, borderRadius: 5 },
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontWeight: 500,
        letterSpacing: "-0.005em",
        ...sizes[size],
        ...variants[variant],
      }}
    >
      {leftDot && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 99,
            background: "currentColor",
          }}
        />
      )}
      {children}
    </span>
  );
}

export function StatusBadge({ published }: { published: boolean }) {
  return published ? (
    <AdminBadge variant="success" leftDot>
      Published
    </AdminBadge>
  ) : (
    <AdminBadge variant="muted" leftDot>
      Draft
    </AdminBadge>
  );
}

export function TagBadge({
  tag,
  variant,
}: {
  tag: string | null | undefined;
  variant?: BadgeVariant;
}) {
  if (!tag) return <span style={{ color: "var(--fg-faint)" }}>—</span>;
  return <AdminBadge variant={variant || "default"}>{tag}</AdminBadge>;
}

// ─── Input ─────────────────────────────────────────────────────────────────
export function AdminInput({
  value,
  onChange,
  placeholder,
  type = "text",
  prefix,
  suffix,
  leftIcon: LeftIcon,
  size = "md",
  style,
  autoFocus,
  disabled,
  readOnly,
  id,
  onBlur,
  name,
}: {
  value?: string | number;
  onChange?: (v: string) => void;
  placeholder?: string;
  type?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  leftIcon?: LucideIcon;
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
  autoFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  id?: string;
  name?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}) {
  const [focus, setFocus] = React.useState(false);
  const heights = { sm: 30, md: 34, lg: 40 } as const;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        height: heights[size],
        padding: "0 10px",
        background: "var(--panel)",
        color: "var(--fg)",
        border: `1px solid ${focus ? "var(--accent)" : "var(--border-strong)"}`,
        boxShadow: focus ? "0 0 0 3px var(--accent-ring)" : "var(--shadow-xs)",
        borderRadius: 7,
        transition: "all 120ms ease",
        opacity: disabled ? 0.6 : 1,
        ...style,
      }}
    >
      {LeftIcon && (
        <LeftIcon size={14} style={{ color: "var(--fg-subtle)", flexShrink: 0 }} />
      )}
      {prefix && (
        <span
          style={{ color: "var(--fg-subtle)", fontSize: 13, flexShrink: 0 }}
        >
          {prefix}
        </span>
      )}
      <input
        id={id}
        name={name}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={(e) => {
          setFocus(false);
          onBlur?.(e);
        }}
        placeholder={placeholder}
        type={type}
        autoFocus={autoFocus}
        disabled={disabled}
        readOnly={readOnly}
        style={{
          flex: 1,
          minWidth: 0,
          border: "none",
          outline: "none",
          background: "transparent",
          color: "inherit",
          fontSize: 13,
          fontFamily: "inherit",
        }}
      />
      {suffix}
    </div>
  );
}

export function AdminTextarea({
  value,
  onChange,
  placeholder,
  rows = 4,
  id,
  name,
  style,
}: {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  rows?: number;
  id?: string;
  name?: string;
  style?: React.CSSProperties;
}) {
  const [focus, setFocus] = React.useState(false);
  return (
    <textarea
      id={id}
      name={name}
      value={value ?? ""}
      onChange={(e) => onChange?.(e.target.value)}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: "100%",
        padding: "10px 12px",
        background: "var(--panel)",
        color: "var(--fg)",
        border: `1px solid ${focus ? "var(--accent)" : "var(--border-strong)"}`,
        boxShadow: focus ? "0 0 0 3px var(--accent-ring)" : "var(--shadow-xs)",
        borderRadius: 7,
        fontSize: 13,
        fontFamily: "inherit",
        lineHeight: 1.55,
        resize: "vertical",
        outline: "none",
        transition: "all 120ms ease",
        ...style,
      }}
    />
  );
}

// ─── Checkbox ──────────────────────────────────────────────────────────────
export function AdminCheckbox({
  checked,
  onChange,
  indeterminate,
  size = 15,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  indeterminate?: boolean;
  size?: number;
  id?: string;
}) {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate;
  }, [indeterminate]);
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        width: size,
        height: size,
      }}
    >
      <input
        ref={ref}
        id={id}
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{
          position: "absolute",
          inset: 0,
          margin: 0,
          opacity: 0,
          cursor: "pointer",
          width: "100%",
          height: "100%",
        }}
      />
      <span
        style={{
          width: size,
          height: size,
          borderRadius: 4,
          background:
            checked || indeterminate ? "var(--accent)" : "var(--panel)",
          border: `1.5px solid ${
            checked || indeterminate
              ? "var(--accent)"
              : "var(--border-strong)"
          }`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 120ms ease",
          pointerEvents: "none",
        }}
      >
        {checked && !indeterminate && (
          <Check size={11} strokeWidth={3} color="#fff" />
        )}
        {indeterminate && (
          <div
            style={{
              width: 7,
              height: 2,
              background: "#fff",
              borderRadius: 1,
            }}
          />
        )}
      </span>
    </span>
  );
}

// ─── Toggle ────────────────────────────────────────────────────────────────
export function AdminToggle({
  checked,
  onChange,
  size = "md",
  label,
  id,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  size?: "sm" | "md";
  label?: string;
  id?: string;
}) {
  const sizes =
    size === "sm" ? { w: 28, h: 16, knob: 12 } : { w: 36, h: 20, knob: 16 };
  const inner = (
    <span
      role="switch"
      aria-checked={!!checked}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onChange(!checked);
        }
      }}
      onClick={() => onChange(!checked)}
      style={{
        width: sizes.w,
        height: sizes.h,
        flexShrink: 0,
        background: checked ? "var(--accent)" : "var(--border-strong)",
        borderRadius: 999,
        position: "relative",
        cursor: "pointer",
        transition: "background 140ms ease",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 2,
          left: 2,
          width: sizes.knob,
          height: sizes.knob,
          borderRadius: 999,
          background: "#fff",
          boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
          transform: checked
            ? `translateX(${sizes.w - sizes.knob - 4}px)`
            : "none",
          transition: "transform 160ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      />
    </span>
  );
  if (!label) return inner;
  return (
    <label
      htmlFor={id}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
      }}
    >
      {inner}
      <span style={{ fontSize: 13, color: "var(--fg)" }}>{label}</span>
    </label>
  );
}

// ─── Select (simple dropdown) ──────────────────────────────────────────────
export interface SelectOption {
  value: string;
  label: string;
}

export function AdminSelect({
  value,
  onChange,
  options,
  placeholder = "Select...",
  size = "md",
  style,
  leftIcon: LeftIcon,
}: {
  value?: string;
  onChange?: (v: string) => void;
  options: SelectOption[];
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
  leftIcon?: LucideIcon;
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const selected = options.find((o) => o.value === value);
  const heights = { sm: 30, md: 34, lg: 40 } as const;
  return (
    <div ref={ref} style={{ position: "relative", ...style }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          width: "100%",
          height: heights[size],
          padding: "0 10px",
          background: "var(--panel)",
          color: "var(--fg)",
          border: "1px solid var(--border-strong)",
          borderRadius: 7,
          fontSize: 13,
          cursor: "pointer",
          boxShadow: "var(--shadow-xs)",
          textAlign: "left",
        }}
      >
        {LeftIcon && <LeftIcon size={14} style={{ color: "var(--fg-subtle)" }} />}
        <span
          style={{
            flex: 1,
            color: selected ? "var(--fg)" : "var(--fg-subtle)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={14} style={{ color: "var(--fg-subtle)" }} />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 50,
            background: "var(--panel)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            boxShadow: "var(--shadow-pop)",
            padding: 4,
            maxHeight: 280,
            overflow: "auto",
            animation: "admin-fadeIn 120ms ease-out",
          }}
        >
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange?.(o.value);
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: "100%",
                padding: "7px 8px",
                border: "none",
                background:
                  value === o.value ? "var(--bg-sunken)" : "transparent",
                color: "var(--fg)",
                fontSize: 13,
                borderRadius: 5,
                cursor: "pointer",
                textAlign: "left",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--bg-sunken)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  value === o.value ? "var(--bg-sunken)" : "transparent")
              }
            >
              <span style={{ flex: 1 }}>{o.label}</span>
              {value === o.value && (
                <Check size={12} style={{ color: "var(--accent)" }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Kebab menu ────────────────────────────────────────────────────────────
export interface KebabItem {
  label?: string;
  icon?: LucideIcon;
  onClick?: () => void;
  danger?: boolean;
  divider?: boolean;
}

export function KebabMenu({
  items,
  align = "right",
}: {
  items: KebabItem[];
  align?: "left" | "right";
}) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        style={{
          width: 28,
          height: 28,
          border: "none",
          background: open ? "var(--bg-sunken)" : "transparent",
          color: "var(--fg-muted)",
          borderRadius: 6,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={(e) =>
          !open && (e.currentTarget.style.background = "var(--bg-sunken)")
        }
        onMouseLeave={(e) =>
          !open && (e.currentTarget.style.background = "transparent")
        }
      >
        <MoreHorizontal size={15} />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 2px)",
            [align]: 0,
            zIndex: 50,
            background: "var(--panel)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            boxShadow: "var(--shadow-pop)",
            padding: 4,
            minWidth: 160,
            animation: "admin-fadeIn 100ms ease-out",
          }}
        >
          {items.map((it, i) =>
            it.divider ? (
              <div
                key={i}
                style={{
                  height: 1,
                  background: "var(--border)",
                  margin: "4px 0",
                }}
              />
            ) : (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  it.onClick?.();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  padding: "7px 8px",
                  border: "none",
                  background: "transparent",
                  color: it.danger ? "var(--danger)" : "var(--fg)",
                  fontSize: 13,
                  borderRadius: 5,
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = it.danger
                    ? "var(--danger-soft)"
                    : "var(--bg-sunken)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {it.icon && <it.icon size={13} />}
                <span>{it.label}</span>
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

// ─── Dialog ────────────────────────────────────────────────────────────────
export function AdminDialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  width = 440,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
}) {
  React.useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "admin-overlayIn 120ms ease-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width,
          maxWidth: "calc(100vw - 32px)",
          background: "var(--panel)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          boxShadow: "var(--shadow-pop)",
          animation: "admin-fadeIn 180ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        <div style={{ padding: "20px 20px 0" }}>
          {title && (
            <div
              style={{
                fontSize: 15,
                fontWeight: 600,
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </div>
          )}
          {description && (
            <div
              style={{
                fontSize: 13,
                color: "var(--fg-muted)",
                marginTop: 6,
                lineHeight: 1.5,
              }}
            >
              {description}
            </div>
          )}
        </div>
        <div style={{ padding: "16px 20px" }}>{children}</div>
        {footer && (
          <div
            style={{
              padding: "12px 20px",
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              borderTop: "1px solid var(--border)",
              background: "var(--bg-muted)",
              borderRadius: "0 0 12px 12px",
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sheet ─────────────────────────────────────────────────────────────────
export function AdminSheet({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  width = 420,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
}) {
  React.useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 90,
        animation: "admin-overlayIn 140ms ease-out",
      }}
    >
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width,
          maxWidth: "calc(100vw - 32px)",
          background: "var(--panel)",
          borderLeft: "1px solid var(--border)",
          boxShadow: "var(--shadow-pop)",
          display: "flex",
          flexDirection: "column",
          animation: "admin-sheetIn 220ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        <div
          style={{
            padding: "18px 20px",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "flex-start",
            gap: 12,
          }}
        >
          <div style={{ flex: 1 }}>
            {title && (
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
              >
                {title}
              </div>
            )}
            {description && (
              <div
                style={{
                  fontSize: 12.5,
                  color: "var(--fg-muted)",
                  marginTop: 4,
                }}
              >
                {description}
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              width: 28,
              height: 28,
              border: "none",
              background: "transparent",
              color: "var(--fg-muted)",
              borderRadius: 6,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={15} />
          </button>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "20px" }}>
          {children}
        </div>
        {footer && (
          <div
            style={{
              padding: "12px 20px",
              borderTop: "1px solid var(--border)",
              display: "flex",
              justifyContent: "flex-end",
              gap: 8,
              background: "var(--bg-muted)",
            }}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Card / CardHeader ─────────────────────────────────────────────────────
export function AdminCard({
  children,
  style,
  padded = true,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  padded?: boolean;
}) {
  return (
    <div
      style={{
        background: "var(--panel)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        boxShadow: "var(--shadow-xs)",
        padding: padded ? 20 : 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: "12px 16px",
        borderBottom: "1px solid var(--border)",
        fontSize: 12,
        fontWeight: 500,
        color: "var(--fg-muted)",
        letterSpacing: "0.01em",
        textTransform: "uppercase",
      }}
    >
      {children}
    </div>
  );
}

// ─── ProductThumb ──────────────────────────────────────────────────────────
export function ProductThumb({
  cover,
  size = 40,
  rounded = 6,
  src,
}: {
  cover: { bg: string; label: string };
  size?: number;
  rounded?: number;
  src?: string | null;
}) {
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          flexShrink: 0,
          borderRadius: rounded,
          objectFit: "cover",
          border: "1px solid var(--border)",
          background: "var(--bg-sunken)",
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: size,
        height: size,
        flexShrink: 0,
        background: cover.bg,
        borderRadius: rounded,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: size * 0.26,
        fontWeight: 700,
        letterSpacing: "0.05em",
        fontFamily: "Geist Mono, monospace",
        boxShadow:
          "inset 0 0 0 1px rgba(0,0,0,0.08), inset 0 -6px 10px rgba(0,0,0,0.08)",
      }}
    >
      {cover.label}
    </div>
  );
}

// ─── Toast ─────────────────────────────────────────────────────────────────
export interface ToastMsg {
  id: string;
  message: string;
  variant?: "success" | "error";
}
const ToastCtx = React.createContext<{
  push: (message: string, variant?: "success" | "error") => void;
} | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMsg[]>([]);
  const push = React.useCallback(
    (message: string, variant: "success" | "error" = "success") => {
      const id = Math.random().toString(36).slice(2);
      setToasts((ts) => [...ts, { id, message, variant }]);
      setTimeout(
        () => setToasts((ts) => ts.filter((t) => t.id !== id)),
        3200
      );
    },
    []
  );
  const dismiss = (id: string) =>
    setToasts((ts) => ts.filter((t) => t.id !== id));
  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 200,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          pointerEvents: "none",
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              minWidth: 260,
              maxWidth: 400,
              pointerEvents: "auto",
              padding: "10px 12px",
              background: "var(--panel)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              boxShadow: "var(--shadow-pop)",
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              animation:
                "admin-slideIn 220ms cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
          >
            <div
              style={{
                flexShrink: 0,
                width: 18,
                height: 18,
                borderRadius: 99,
                background:
                  t.variant === "error"
                    ? "var(--danger-soft)"
                    : "var(--success-soft)",
                color:
                  t.variant === "error" ? "var(--danger)" : "var(--success)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 1,
              }}
            >
              {t.variant === "error" ? (
                <AlertTriangle size={11} strokeWidth={2.5} />
              ) : (
                <Check size={11} strokeWidth={2.5} />
              )}
            </div>
            <div
              style={{
                flex: 1,
                fontSize: 13,
                color: "var(--fg)",
                lineHeight: 1.4,
              }}
            >
              {t.message}
            </div>
            <button
              onClick={() => dismiss(t.id)}
              style={{
                border: "none",
                background: "transparent",
                color: "var(--fg-faint)",
                cursor: "pointer",
                padding: 2,
              }}
            >
              <X size={12} />
            </button>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useAdminToast() {
  const ctx = React.useContext(ToastCtx);
  if (!ctx) throw new Error("useAdminToast must be inside ToastProvider");
  return ctx;
}

// ─── Breadcrumb ────────────────────────────────────────────────────────────
export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontSize: 13,
        color: "var(--fg-subtle)",
        minWidth: 0,
      }}
    >
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <ChevronRight
              size={13}
              style={{ color: "var(--fg-faint)", flexShrink: 0 }}
            />
          )}
          {it.href ? (
            <a
              href={it.href}
              style={{
                color: "var(--fg-subtle)",
                fontSize: 13,
                textDecoration: "none",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {it.label}
            </a>
          ) : (
            <span
              style={{
                color:
                  i === items.length - 1 ? "var(--fg)" : "var(--fg-subtle)",
                fontWeight: i === items.length - 1 ? 500 : 400,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {it.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

// ─── PageContainer / PageHeader / EmptyState ──────────────────────────────
export function PageContainer({
  children,
  maxWidth = 1280,
}: {
  children: React.ReactNode;
  maxWidth?: number;
}) {
  return (
    <div
      style={{
        maxWidth,
        margin: "0 auto",
        padding: "28px 32px 64px",
        animation: "admin-fadeIn 220ms ease-out",
      }}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 16,
        marginBottom: 24,
        flexWrap: "wrap",
      }}
    >
      <div style={{ minWidth: 0 }}>
        <h1
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            color: "var(--fg)",
          }}
        >
          {title}
        </h1>
        {description && (
          <p
            style={{
              margin: "4px 0 0",
              fontSize: 13.5,
              color: "var(--fg-muted)",
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>
        )}
      </div>
      {actions && (
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>{actions}</div>
      )}
    </div>
  );
}

export function EmptyState({
  icon: IconC,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: "56px 24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "var(--fg-muted)",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 12,
          background: "var(--bg-sunken)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <IconC size={22} strokeWidth={1.5} color="var(--fg-subtle)" />
      </div>
      <div
        style={{
          fontSize: 15,
          fontWeight: 500,
          color: "var(--fg)",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </div>
      {description && (
        <div
          style={{
            fontSize: 13,
            color: "var(--fg-muted)",
            marginTop: 6,
            maxWidth: 360,
            lineHeight: 1.5,
          }}
        >
          {description}
        </div>
      )}
      {action && <div style={{ marginTop: 20 }}>{action}</div>}
    </div>
  );
}
