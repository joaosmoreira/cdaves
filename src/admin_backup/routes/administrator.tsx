import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X } from "lucide-react";
import { NAVIGATION, AdministratorSidebar } from "@/components/administrator/AdministratorSidebar";
import { AdministratorHeader } from "@/components/administrator/AdministratorHeader";
import { AdministratorDashboardView } from "@/components/administrator/AdministratorDashboardView";
import { AdministratorContentView } from "@/components/administrator/AdministratorContentView";

export const Route = createFileRoute("/administrator")({
  head: () => ({
    meta: [
      { title: "Painel de Administração · CD Aves" },
      { name: "description", content: "Novo painel de gestão do CD Aves inspirado no design Figma com as cores oficiais do clube." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Painel de Administração · CD Aves" },
    ],
  }),
  component: AdministratorPage,
});

function getTabTitle(tabId: string): string {
  for (const group of NAVIGATION) {
    for (const item of group.items) {
      if (item.id === tabId) return `${group.group} — ${item.label}`;
    }
  }
  return "Painel de Administração";
}

function AdministratorPage() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const currentTitle = getTabTitle(activeTab);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Desktop Sidebar */}
      <div className="hidden h-full shrink-0 lg:block">
        <AdministratorSidebar activeTab={activeTab} onSelectTab={setActiveTab} />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 flex h-full w-72 flex-col bg-card shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-4 top-4 rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground"
              aria-label="Fechar menu"
            >
              <X size={18} />
            </button>
            <AdministratorSidebar
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              onCloseMobile={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdministratorHeader
          title={currentTitle}
          onOpenMobile={() => setMobileOpen(true)}
          onQuickAction={activeTab === "dashboard" ? () => setActiveTab("artigos") : undefined}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10">
          <div className="mx-auto max-w-7xl">
            {activeTab === "dashboard" ? (
              <AdministratorDashboardView onNavigateTab={setActiveTab} />
            ) : (
              <AdministratorContentView tabId={activeTab} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
