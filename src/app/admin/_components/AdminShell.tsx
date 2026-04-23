"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "./Sidebar";
import { TopHeader } from "./TopHeader";
import { TweaksPanel, TWEAK_DEFAULTS, type AdminTweaks } from "./TweaksPanel";
import { ToastProvider, type Crumb } from "./Primitives";

export function AdminShell({
  children,
  unreadCount,
}: {
  children: React.ReactNode;
  unreadCount: number;
}) {
  const pathname = usePathname() || "/admin";
  const [tweaks, setTweaksState] = React.useState<AdminTweaks>(TWEAK_DEFAULTS);
  const [collapsed, setCollapsed] = React.useState(false);
  const [tweaksOpen, setTweaksOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("uu_admin_tweaks");
      if (raw) {
        const next = { ...TWEAK_DEFAULTS, ...JSON.parse(raw) } as AdminTweaks;
        setTweaksState(next);
        setCollapsed(next.sidebarDefault === "collapsed");
      }
    } catch {
      // ignore
    }
  }, []);

  const setTweaks = (patch: Partial<AdminTweaks>) => {
    setTweaksState((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem("uu_admin_tweaks", JSON.stringify(next));
      } catch {
        // ignore
      }
      if (patch.sidebarDefault)
        setCollapsed(patch.sidebarDefault === "collapsed");
      return next;
    });
  };

  const breadcrumb: Crumb[] = React.useMemo(() => {
    const crumbs: Crumb[] = [{ label: "Urban Uniform", href: "/admin" }];
    if (pathname === "/admin") crumbs.push({ label: "Dashboard" });
    else if (pathname.startsWith("/admin/products")) {
      crumbs.push({ label: "Products", href: "/admin/products" });
      if (pathname === "/admin/products/new")
        crumbs.push({ label: "New product" });
      else if (pathname !== "/admin/products") crumbs.push({ label: "Edit" });
    } else if (pathname.startsWith("/admin/categories"))
      crumbs.push({ label: "Categories" });
    else if (pathname.startsWith("/admin/submissions"))
      crumbs.push({ label: "Submissions" });
    return crumbs;
  }, [pathname]);

  return (
    <div
      className={`admin-root ${tweaks.theme === "dark" ? "admin-dark" : ""}`}
      data-accent={tweaks.accent}
      data-density={tweaks.density}
      style={{ display: "flex", minHeight: "100vh" }}
    >
      <ToastProvider>
        <AdminSidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          unreadCount={unreadCount}
        />
        <main
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TopHeader
            breadcrumb={breadcrumb}
            theme={tweaks.theme}
            onToggleTheme={() =>
              setTweaks({ theme: tweaks.theme === "dark" ? "light" : "dark" })
            }
            onOpenTweaks={() => setTweaksOpen(true)}
            unreadCount={unreadCount}
          />
          <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
        </main>
        <TweaksPanel
          open={tweaksOpen}
          onClose={() => setTweaksOpen(false)}
          state={tweaks}
          setState={setTweaks}
        />
      </ToastProvider>
    </div>
  );
}
