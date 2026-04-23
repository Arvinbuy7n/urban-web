"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Inbox,
  Shield,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AdminBadge } from "./Primitives";

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
  match: (path: string) => boolean;
}

export function AdminSidebar({
  collapsed,
  setCollapsed,
  unreadCount,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  unreadCount: number;
}) {
  const pathname = usePathname() || "/admin";
  const items: NavItem[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      match: (p) => p === "/admin",
    },
    {
      id: "products",
      label: "Products",
      href: "/admin/products",
      icon: Package,
      match: (p) => p.startsWith("/admin/products"),
    },
    {
      id: "categories",
      label: "Categories",
      href: "/admin/categories",
      icon: FolderTree,
      match: (p) => p.startsWith("/admin/categories"),
    },
    {
      id: "submissions",
      label: "Submissions",
      href: "/admin/submissions",
      icon: Inbox,
      badge: unreadCount,
      match: (p) => p.startsWith("/admin/submissions"),
    },
  ];
  const width = collapsed ? 64 : 240;
  return (
    <aside
      style={{
        width,
        flexShrink: 0,
        background: "var(--panel)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        transition: "width 200ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        position: "sticky",
        top: 0,
        height: "100vh",
      }}
    >
      <div
        style={{
          height: 56,
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            minWidth: 0,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              flexShrink: 0,
              background: "var(--fg)",
              borderRadius: 7,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--accent)",
            }}
          >
            <Shield size={17} strokeWidth={2} />
          </div>
          {!collapsed && (
            <div
              style={{
                minWidth: 0,
                display: "flex",
                flexDirection: "column",
                lineHeight: 1.1,
              }}
            >
              <div
                style={{
                  fontSize: 13.5,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                }}
              >
                Urban Uniform
              </div>
              <div
                style={{
                  fontSize: 10.5,
                  color: "var(--fg-subtle)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginTop: 1,
                }}
              >
                Admin
              </div>
            </div>
          )}
        </div>
      </div>

      <nav
        style={{
          flex: 1,
          padding: 8,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {items.map((it) => {
          const active = it.match(pathname);
          const IconC = it.icon;
          return (
            <Link
              key={it.id}
              href={it.href}
              title={collapsed ? it.label : undefined}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                height: 36,
                padding: collapsed ? 0 : "0 10px",
                justifyContent: collapsed ? "center" : "flex-start",
                borderRadius: 7,
                fontSize: 13,
                fontWeight: active ? 500 : 400,
                background: active ? "var(--bg-sunken)" : "transparent",
                color: active ? "var(--fg)" : "var(--fg-muted)",
                textDecoration: "none",
                position: "relative",
                transition: "background 100ms ease",
              }}
            >
              {active && (
                <div
                  style={{
                    position: "absolute",
                    left: collapsed ? 4 : 2,
                    top: 8,
                    bottom: 8,
                    width: 2,
                    background: "var(--accent)",
                    borderRadius: 1,
                  }}
                />
              )}
              <IconC
                size={16}
                style={{
                  color: active ? "var(--accent)" : "var(--fg-subtle)",
                  flexShrink: 0,
                }}
              />
              {!collapsed && (
                <span style={{ flex: 1, textAlign: "left" }}>{it.label}</span>
              )}
              {!collapsed && it.badge != null && it.badge > 0 && (
                <AdminBadge variant="primary" size="sm">
                  {it.badge}
                </AdminBadge>
              )}
              {collapsed && it.badge != null && it.badge > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 10,
                    width: 6,
                    height: 6,
                    borderRadius: 99,
                    background: "var(--accent)",
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: 8 }}>
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          style={{
            width: "100%",
            height: 32,
            display: "flex",
            alignItems: "center",
            gap: 10,
            justifyContent: collapsed ? "center" : "flex-start",
            padding: collapsed ? 0 : "0 10px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "var(--fg-subtle)",
            fontSize: 12,
            borderRadius: 6,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--bg-sunken)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>

      <div style={{ padding: 8, borderTop: "1px solid var(--border)" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: collapsed ? 0 : 8,
            justifyContent: collapsed ? "center" : "flex-start",
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              flexShrink: 0,
              borderRadius: 99,
              background: "linear-gradient(135deg, #FF6B1A, #B45309)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 11.5,
              fontWeight: 600,
            }}
          >
            UU
          </div>
          {!collapsed && (
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: 12.5,
                  fontWeight: 500,
                  letterSpacing: "-0.005em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Admin
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--fg-subtle)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                Basic Auth session
              </div>
            </div>
          )}
          {!collapsed && (
            <a
              href="/admin/logout"
              title="Log out"
              style={{
                width: 28,
                height: 28,
                border: "none",
                background: "transparent",
                color: "var(--fg-subtle)",
                borderRadius: 6,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
              }}
            >
              <LogOut size={14} />
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}
