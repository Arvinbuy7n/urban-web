"use client";

import * as React from "react";
import { Search, Bell, Sun, Moon, Sliders } from "lucide-react";
import { Breadcrumb, type Crumb } from "./Primitives";
import Link from "next/link";

export function TopHeader({
  breadcrumb,
  theme,
  onToggleTheme,
  onOpenTweaks,
  unreadCount,
}: {
  breadcrumb: Crumb[];
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onOpenTweaks: () => void;
  unreadCount: number;
}) {
  const [query, setQuery] = React.useState("");
  const [focus, setFocus] = React.useState(false);
  const iconBtn: React.CSSProperties = {
    width: 34,
    height: 34,
    border: "none",
    background: "transparent",
    borderRadius: 7,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 120ms ease",
  };
  return (
    <header
      style={{
        height: 56,
        flexShrink: 0,
        background: "var(--panel)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        gap: 16,
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
    >
      <div style={{ flex: "0 1 auto", minWidth: 0 }}>
        <Breadcrumb items={breadcrumb} />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          maxWidth: 560,
          margin: "0 auto",
        }}
      >
        <div style={{ width: "100%", maxWidth: 440, position: "relative" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: 34,
              padding: "0 10px",
              background: focus ? "var(--panel)" : "var(--bg-muted)",
              border: `1px solid ${focus ? "var(--accent)" : "var(--border)"}`,
              boxShadow: focus ? "0 0 0 3px var(--accent-ring)" : "none",
              borderRadius: 7,
              transition: "all 120ms ease",
            }}
          >
            <Search size={14} style={{ color: "var(--fg-subtle)" }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              placeholder="Search products, categories, submissions…"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: 13,
                color: "var(--fg)",
              }}
            />
            {!focus && (
              <kbd
                style={{
                  fontFamily: "Geist Mono, monospace",
                  fontSize: 10.5,
                  padding: "1px 5px",
                  background: "var(--panel)",
                  border: "1px solid var(--border)",
                  borderRadius: 3,
                  color: "var(--fg-subtle)",
                }}
              >
                ⌘K
              </kbd>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          flexShrink: 0,
        }}
      >
        <button
          type="button"
          onClick={onOpenTweaks}
          title="Tweaks"
          style={iconBtn}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--bg-sunken)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <Sliders size={15} style={{ color: "var(--fg-muted)" }} />
        </button>
        <Link
          href="/admin/submissions"
          title="Notifications"
          style={{ ...iconBtn, position: "relative", textDecoration: "none" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--bg-sunken)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <Bell size={15} style={{ color: "var(--fg-muted)" }} />
          {unreadCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: 6,
                right: 7,
                width: 7,
                height: 7,
                borderRadius: 99,
                background: "var(--accent)",
                border: "1.5px solid var(--panel)",
              }}
            />
          )}
        </Link>
        <button
          type="button"
          onClick={onToggleTheme}
          title="Toggle theme"
          style={iconBtn}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "var(--bg-sunken)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          {theme === "dark" ? (
            <Sun size={15} style={{ color: "var(--fg-muted)" }} />
          ) : (
            <Moon size={15} style={{ color: "var(--fg-muted)" }} />
          )}
        </button>
      </div>
    </header>
  );
}
