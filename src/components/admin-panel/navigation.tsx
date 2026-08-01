import {
  LayoutDashboard,
  Trophy,
  Newspaper,
  Shield,
  UserCircle,
  Layers,
  Users,
  FileText,
  Building2,
  Handshake,
  Image,
  Video,
  FolderOpen,
  CreditCard,
  Palette,
  Phone,
} from "lucide-react";
import { NavGroup } from "./types";

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
