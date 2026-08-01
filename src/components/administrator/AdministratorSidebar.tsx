import { Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Trophy,
  Newspaper,
  Users,
  UserCircle,
  Layers,
  FileText,
  Building2,
  Handshake,
  Image,
  Video,
  FolderOpen,
  CreditCard,
  Palette,
  Phone,
  Shield,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import logo from "@/assets/logo-cd.png";
import { cn } from "@/lib/utils";

export type NavItem = { label: string; icon: React.ReactNode; id: string };
export type NavGroup = { group: string; items: NavItem[] };

export const NAVIGATION: NavGroup[] = [
  {
    group: "Geral",
    items: [
      { label: "Dashboard", icon: <LayoutDashboard size={16} />, id: "dashboard" },
      { label: "Jogos e Resultados", icon: <Trophy size={16} />, id: "jogos" },
    ],
  },
  {
    group: "Notícias",
    items: [{ label: "Artigos", icon: <Newspaper size={16} />, id: "artigos" }],
  },
  {
    group: "Futebol",
    items: [
      { label: "Equipas", icon: <Shield size={16} />, id: "futebol-equipas" },
      { label: "Atletas", icon: <UserCircle size={16} />, id: "futebol-atletas" },
    ],
  },
  {
    group: "Modalidades",
    items: [
      { label: "Modalidades", icon: <Layers size={16} />, id: "modalidades" },
      { label: "Equipas", icon: <Users size={16} />, id: "modalidades-equipas" },
      { label: "Atletas", icon: <UserCircle size={16} />, id: "modalidades-atletas" },
    ],
  },
  {
    group: "Clube",
    items: [
      { label: "Páginas", icon: <FileText size={16} />, id: "paginas" },
      { label: "Institucional", icon: <Building2 size={16} />, id: "institucional" },
    ],
  },
  {
    group: "Corporate",
    items: [{ label: "Patrocínios", icon: <Handshake size={16} />, id: "patrocinios" }],
  },
  {
    group: "Multimédia",
    items: [
      { label: "Fotos", icon: <Image size={16} />, id: "fotos" },
      { label: "Vídeos", icon: <Video size={16} />, id: "videos" },
      { label: "Categorias", icon: <FolderOpen size={16} />, id: "media-categorias" },
    ],
  },
  {
    group: "Sócios",
    items: [{ label: "Preços e Pagamentos", icon: <CreditCard size={16} />, id: "socios" }],
  },
  {
    group: "Design",
    items: [{ label: "Design e Aparência", icon: <Palette size={16} />, id: "design" }],
  },
  {
    group: "Contactos",
    items: [{ label: "Dados de Contacto", icon: <Phone size={16} />, id: "contactos" }],
  },
];

type SidebarProps = {
  activeTab: string;
  onSelectTab: (id: string) => void;
  onCloseMobile?: () => void;
};

export function AdministratorSidebar({ activeTab, onSelectTab, onCloseMobile }: SidebarProps) {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-card">
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <img src={logo} alt="CD Aves" className="h-9 w-9 object-contain" />
        <div>
          <h2 className="font-display text-base uppercase leading-none text-foreground">CD Aves Admin</h2>
          <p className="mt-1 text-[11px] font-semibold text-primary">Painel do Clube</p>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto p-4">
        {NAVIGATION.map((group) => (
          <div key={group.group}>
            <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
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
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "text-foreground hover:bg-accent hover:text-accent-foreground"
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

      <div className="border-t border-border p-4 bg-muted/30">
        <Link
          to="/"
          className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-accent"
        >
          <span>Ir para o Site</span>
          <ExternalLink size={14} className="text-primary" />
        </Link>
      </div>
    </aside>
  );
}
