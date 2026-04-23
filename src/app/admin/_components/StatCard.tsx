import * as React from "react";
import {
  ArrowDown,
  ArrowUp,
  type LucideIcon,
} from "lucide-react";

export function StatCard({
  label,
  value,
  trend,
  trendLabel,
  icon: IconC,
  sub,
}: {
  label: string;
  value: string | number;
  trend?: number | null;
  trendLabel?: string;
  icon: LucideIcon;
  sub?: string;
}) {
  const positive = trend != null && trend > 0;
  return (
    <div
      style={{
        background: "var(--panel)",
        border: "1px solid var(--border)",
        borderRadius: 12,
        padding: 18,
        position: "relative",
        boxShadow: "var(--shadow-xs)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "var(--bg-sunken)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--fg-muted)",
          }}
        >
          <IconC size={15} />
        </div>
        {trend != null && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 3,
              fontSize: 11.5,
              fontWeight: 500,
              color: positive ? "var(--success)" : "var(--danger)",
              background: positive ? "var(--success-soft)" : "var(--danger-soft)",
              padding: "2px 6px",
              borderRadius: 4,
            }}
          >
            {positive ? (
              <ArrowUp size={10} strokeWidth={2.5} />
            ) : (
              <ArrowDown size={10} strokeWidth={2.5} />
            )}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div
        style={{
          fontSize: 12.5,
          color: "var(--fg-muted)",
          fontWeight: 500,
          letterSpacing: "-0.005em",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 600,
          letterSpacing: "-0.03em",
          color: "var(--fg)",
          marginTop: 2,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </div>
      {sub && (
        <div style={{ fontSize: 11.5, color: "var(--fg-subtle)", marginTop: 3 }}>
          {sub}
        </div>
      )}
      {trendLabel && (
        <div style={{ fontSize: 11.5, color: "var(--fg-subtle)", marginTop: 3 }}>
          {trendLabel}
        </div>
      )}
    </div>
  );
}
