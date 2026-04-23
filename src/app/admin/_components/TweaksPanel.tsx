"use client";

import * as React from "react";
import {
  AdminButton,
  AdminSelect,
  AdminSheet,
  AdminToggle,
} from "./Primitives";

export interface AdminTweaks {
  theme: "light" | "dark";
  accent: "orange" | "yellow" | "amber";
  sidebarDefault: "expanded" | "collapsed";
  density: "comfortable" | "compact";
  lang: "en" | "mn";
}

export const TWEAK_DEFAULTS: AdminTweaks = {
  theme: "light",
  accent: "orange",
  sidebarDefault: "expanded",
  density: "comfortable",
  lang: "en",
};

export function TweaksPanel({
  open,
  onClose,
  state,
  setState,
}: {
  open: boolean;
  onClose: () => void;
  state: AdminTweaks;
  setState: (patch: Partial<AdminTweaks>) => void;
}) {
  return (
    <AdminSheet
      open={open}
      onClose={onClose}
      title="Tweaks"
      description="Explore variations of this design"
      width={360}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <TweakRow label="Theme" description="Light or dark appearance">
          <AdminToggle
            checked={state.theme === "dark"}
            onChange={(v) => setState({ theme: v ? "dark" : "light" })}
          />
        </TweakRow>
        <TweakRow
          label="Accent color"
          description="Primary color used across the admin"
        >
          <div style={{ display: "flex", gap: 8 }}>
            {(
              [
                { v: "orange", c: "#FF6B1A", label: "Safety orange" },
                { v: "yellow", c: "#EAB308", label: "Deep yellow" },
                { v: "amber", c: "#F59E0B", label: "Amber" },
              ] as const
            ).map((a) => (
              <button
                key={a.v}
                type="button"
                onClick={() => setState({ accent: a.v })}
                title={a.label}
                style={{
                  width: 36,
                  height: 36,
                  border:
                    state.accent === a.v
                      ? "2px solid var(--fg)"
                      : "2px solid transparent",
                  padding: 2,
                  background: "transparent",
                  borderRadius: 8,
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: a.c,
                    borderRadius: 5,
                  }}
                />
              </button>
            ))}
          </div>
        </TweakRow>
        <TweakRow
          label="Sidebar default"
          description="Expanded or icon-only on load"
        >
          <AdminSelect
            value={state.sidebarDefault}
            onChange={(v) =>
              setState({ sidebarDefault: v as AdminTweaks["sidebarDefault"] })
            }
            options={[
              { value: "expanded", label: "Expanded (240px)" },
              { value: "collapsed", label: "Collapsed (64px)" },
            ]}
          />
        </TweakRow>
        <TweakRow label="Density" description="How tightly rows and controls pack">
          <AdminSelect
            value={state.density}
            onChange={(v) =>
              setState({ density: v as AdminTweaks["density"] })
            }
            options={[
              { value: "comfortable", label: "Comfortable" },
              { value: "compact", label: "Compact" },
            ]}
          />
        </TweakRow>
        <TweakRow
          label="Language"
          description="Display language for interface labels"
        >
          <AdminSelect
            value={state.lang}
            onChange={(v) => setState({ lang: v as AdminTweaks["lang"] })}
            options={[
              { value: "en", label: "English" },
              { value: "mn", label: "Mongolian" },
            ]}
          />
        </TweakRow>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <AdminButton variant="outline" size="sm" onClick={onClose}>
            Done
          </AdminButton>
        </div>
      </div>
    </AdminSheet>
  );
}

function TweakRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: "var(--fg)",
          marginBottom: 3,
        }}
      >
        {label}
      </div>
      {description && (
        <div
          style={{
            fontSize: 12,
            color: "var(--fg-muted)",
            marginBottom: 10,
            lineHeight: 1.5,
          }}
        >
          {description}
        </div>
      )}
      {children}
    </div>
  );
}
