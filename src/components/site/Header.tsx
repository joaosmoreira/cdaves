import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-cd.png";
import { useAdmin } from "@/admin/store";

const NAV = [
  { to: "/clube", label: "Clube" },
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
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const logoUrl = useAdmin((s) => s.settings?.logoUrl ?? logo);
  const modalidades = useAdmin((s) => s.modalidades ?? []);

  const futebolMod = modalidades.find((m) => String(m.slug) === "futebol" || String(m.nome).toLowerCase().includes("futebol profissional"));
  const isFutebolActive = futebolMod ? String(futebolMod.activa) === "sim" || String(futebolMod.activa) === "true" : false;

  const navItems = NAV.filter((item) => {
    if (item.to === "/futebol" && !isFutebolActive) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    // Verificar a posição inicial ao carregar/atualizar a página
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === "/";
  const isDarkHeader = isHomePage && !isScrolled && !open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isDarkHeader
          ? "bg-transparent border-b border-transparent"
          : "bg-background/95 backdrop-blur border-b border-border shadow-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logoUrl} alt="Emblema do CD Aves" width={816} height={816} className="h-11 w-11 object-contain" />
          <span className={`font-display text-lg uppercase leading-none tracking-tight transition-colors ${isDarkHeader ? "text-white" : "text-foreground"}`}>
            CD Aves
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-accent" }}
              inactiveProps={{ className: isDarkHeader ? "text-white" : "text-foreground" }}
              className="text-xs font-bold uppercase tracking-widest transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* O botão mantém rigorosamente a mesma variante "hero" e dimensões nos 2 estados */}
          <Button asChild size="sm" variant="hero" className="hidden sm:inline-flex">
            <Link to="/socios">Sê Sócio</Link>
          </Button>
          <button
            className={`lg:hidden p-1 transition-colors ${isDarkHeader ? "text-white" : "text-foreground"}`}
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background text-foreground lg:hidden shadow-lg">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-accent" }}
                inactiveProps={{ className: "text-foreground" }}
                className="border-b border-border py-3 text-xs font-bold uppercase tracking-widest hover:text-accent last:border-0"
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
