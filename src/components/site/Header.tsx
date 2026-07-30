import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-cd.png";


const NAV = [
  { to: "/noticias", label: "Notícias" },
  { to: "/futebol", label: "Futebol" },
  { to: "/modalidades", label: "Modalidades" },
  { to: "/corporate", label: "Corporate" },
  { to: "/multimedia", label: "Multimédia" },
  { to: "/socios", label: "Sócios" },
  { to: "/contactos", label: "Contactos" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Emblema do CD Aurirrubro" width={816} height={816} className="h-11 w-11 object-contain" />
          <span className="font-display text-lg uppercase leading-none tracking-tight">Aurirrubro</span>
        </Link>


        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-primary" }}
              className="text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/socios">Sê Sócio</Link>
          </Button>
          <button
            className="lg:hidden"
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-xs font-bold uppercase tracking-widest last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
