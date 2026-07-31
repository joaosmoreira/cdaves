import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import {
  Building2,
  CalendarDays,
  Contact,
  Image,
  LayoutDashboard,
  Newspaper,
  Shirt,
  Trophy,
  Users,
} from "lucide-react";
import logo from "@/assets/logo-cd.png";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Administração — Backoffice · CD Aves" },
      { name: "description", content: "Backoffice do CD Aves: gestão de notícias, futebol, modalidades, corporate, multimédia, sócios e contactos." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Administração · CD Aves" },
      { property: "og:description", content: "Área reservada de gestão de conteúdos do clube." },
    ],
  }),
  component: AdminLayout,
});

const MENU: { label: string; icon: typeof Newspaper; items: { to: string; label: string }[] }[] = [
  { label: "Geral", icon: LayoutDashboard, items: [{ to: "/admin", label: "Painel" }] },
  { label: "Notícias", icon: Newspaper, items: [{ to: "/admin/noticias", label: "Artigos" }] },
  {
    label: "Futebol",
    icon: Shirt,
    items: [
      { to: "/admin/futebol/equipas", label: "Equipas" },
      { to: "/admin/futebol/atletas", label: "Atletas" },
      { to: "/admin/jogos", label: "Jogos e resultados" },
    ],
  },
  {
    label: "Modalidades",
    icon: Trophy,
    items: [
      { to: "/admin/modalidades", label: "Modalidades" },
      { to: "/admin/modalidades/equipas", label: "Equipas" },
      { to: "/admin/modalidades/atletas", label: "Atletas" },
    ],
  },
  {
    label: "Clube",
    icon: Building2,
    items: [
      { to: "/admin/clube", label: "Páginas e institucional" },
    ],
  },
  { label: "Corporate", icon: Users, items: [{ to: "/admin/corporate", label: "Patrocínios" }] },
  {
    label: "Multimédia",
    icon: Image,
    items: [
      { to: "/admin/multimedia", label: "Fotos e vídeos" },
      { to: "/admin/multimedia/categorias", label: "Categorias" },
    ],
  },
  { label: "Sócios", icon: CalendarDays, items: [{ to: "/admin/socios", label: "Preços e pagamentos" }] },
  { label: "Contactos", icon: Contact, items: [{ to: "/admin/contactos", label: "Dados de contacto" }] },
];

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 border-r border-border bg-secondary/40 lg:block">
        <div className="sticky top-0 max-h-screen overflow-y-auto p-6">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Emblema do CD Aves" width={816} height={816} className="h-10 w-10 object-contain" />
            <span className="font-display text-sm uppercase leading-none">Backoffice</span>
          </Link>

          <nav className="mt-8 space-y-6">
            {MENU.map((group) => (
              <div key={group.label}>
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  <group.icon className="h-3.5 w-3.5" />
                  {group.label}
                </p>
                <div className="mt-2 flex flex-col">
                  {group.items.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      activeOptions={{ exact: true }}
                      activeProps={{ className: "border-primary text-primary" }}
                      className="border-l-2 border-transparent py-1.5 pl-3 text-sm text-foreground transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="border-b border-border px-6 py-4 lg:hidden">
          <div className="flex items-center justify-between">
            <span className="font-display text-lg uppercase">Backoffice</span>
            <Link to="/" className="text-xs font-bold uppercase tracking-widest text-primary">
              Ver site
            </Link>
          </div>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
            {MENU.flatMap((g) => g.items).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: true }}
                activeProps={{ className: "text-primary" }}
                className="whitespace-nowrap text-[11px] font-bold uppercase tracking-widest text-muted-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </header>
        <main className="p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
