import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { NAVIGATION } from "@/components/admin-panel/navigation";
import { AdminSidebar } from "@/components/admin-panel/AdminSidebar";
import { AdminHeader } from "@/components/admin-panel/AdminHeader";
import { AdminDashboardView } from "@/components/admin-panel/AdminDashboardView";
import { AdminContentView } from "@/components/admin-panel/AdminContentView";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel de Administração · CD Aves" },
      { name: "description", content: "Painel de gestão de conteúdos do CD Aves." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Painel de Administração · CD Aves" },
    ],
  }),
  component: AdminPage,
});

function getTabTitle(tabId: string): string {
  for (const group of NAVIGATION) {
    for (const item of group.items) {
      if (item.id === tabId) return `${group.group} — ${item.label}`;
    }
  }
  return "Painel de Administração";
}

function AdminPage() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const currentTitle = getTabTitle(activeTab);

  return (
    <div className="admin-theme flex h-screen w-full overflow-hidden font-sans bg-background text-foreground">
      {/* Sidebar Desktop */}
      <div className="hidden h-full shrink-0 lg:block">
        <AdminSidebar activeTab={activeTab} onSelectTab={setActiveTab} />
      </div>

      {/* Menu Mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 flex h-full w-72 flex-col bg-card shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-4 top-4 rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
              aria-label="Fechar menu"
            >
              <X size={18} />
            </button>
            <AdminSidebar
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              onCloseMobile={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Conteúdo Principal */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader
          title={currentTitle}
          onOpenMobile={() => setMobileOpen(true)}
          onQuickAction={activeTab === "dashboard" ? () => setActiveTab("artigos") : undefined}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 bg-background">
          <div className="mx-auto max-w-7xl">
            {activeTab === "dashboard" ? (
              <AdminDashboardView onNavigateTab={setActiveTab} />
            ) : (
              <AdminContentView tabId={activeTab} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
