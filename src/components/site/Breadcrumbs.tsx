import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; to?: string; params?: Record<string, string> };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="border-b border-border bg-secondary/60">
      <div className="mx-auto flex max-w-7xl items-center gap-1 px-4 py-2 text-[11px] uppercase tracking-widest text-muted-foreground">
        <Link to="/" className="transition-colors hover:text-primary">
          Início
        </Link>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3 opacity-50" />
            {item.to && i < items.length - 1 ? (
              <Link to={item.to as "/"} params={item.params} className="transition-colors hover:text-primary">
                {item.label}
              </Link>

            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  );
}
