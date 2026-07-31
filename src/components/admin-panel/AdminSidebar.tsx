import { Link } from "@tanstack/react-router";
import { ChevronRight, ExternalLink } from "lucide-react";
import logo from "@/assets/logo-cd.png";
import { NAVIGATION } from "./navigation";
import { cn } from "@/lib/utils";

type SidebarProps = {
  activeTab: string;
  onSelectTab: (id: string) => void;
  onCloseMobile?: () => void;
};

export function AdminSidebar({ activeTab, onSelectTab, onCloseMobile }: SidebarProps) {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-card">
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <img src={logo} alt="CD Aves" className="h-9 w-9 object-contain" />
        <div>
          <h2 className="font-display text-base uppercase leading-none text-foreground">CD Aves Admin</h2>
          <p className="mt-1 text-[11px] font-semibold text-primary">Painel Oficial</p>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto p-4">
        {NAVIGATION.map((group) => (
          <div key={group.group}>
            {/* Menu Principal (Título do Grupo) em Vermelho */}
            <p className="px-3 text-[11px] font-bold uppercase tracking-widest text-primary font-mono">
              {group.group}
            </p>
            <div className="mt-2 space-y-1">
              {group.items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.id);
                      onCloseMobile?.();
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-xs transition-all duration-150 font-mono",
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "text-slate-800 font-medium hover:bg-slate-100 hover:text-slate-900"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight size={14} className="opacity-80" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-border p-4 bg-secondary/50">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              A
            </span>
            <div className="text-left">
              <p className="text-xs font-bold text-foreground">Administrador</p>
              <p className="text-[10px] text-muted-foreground font-mono">admin@cdaves.pt</p>
            </div>
          </div>
        </div>

        <Link
          to="/"
          className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent"
        >
          <span>Ver Site Público</span>
          <ExternalLink size={13} className="text-primary" />
        </Link>
      </div>
    </aside>
  );
}
