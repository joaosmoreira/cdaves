import { Bell, Menu, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type HeaderProps = {
  title: string;
  onOpenMobile: () => void;
  onQuickAction?: () => void;
};

export function AdministratorHeader({ title, onOpenMobile, onQuickAction }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground lg:hidden"
          aria-label="Abrir menu"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="font-display text-xl uppercase tracking-tight text-foreground">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Pesquisar no sistema..."
            className="h-9 w-64 pl-8 text-xs bg-card"
          />
        </div>

        <div className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-semibold text-primary sm:flex">
          <ShieldCheck size={14} />
          <span>Época 2025/26</span>
        </div>

        <button
          className="relative grid h-9 w-9 place-items-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent"
          aria-label="Notificações"
        >
          <Bell size={16} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
        </button>

      </div>
    </header>
  );
}
