import { useSyncExternalStore } from "react";
import { CLUB, MATCH_INFO, MODALIDADES, NEWS, PARTNERS, PAYMENT_PLANS, SEATS, SQUAD, TEAMS } from "@/data/club";

import logoCd from "@/assets/logo-cd.png";
import heroStadium from "@/assets/hero-stadium.jpg";
import newsAdmin from "@/assets/news-admin.jpg";
import newsGeneral from "@/assets/news-general.jpg";
import newsMatch from "@/assets/news-match.jpg";
import player1 from "@/assets/player-1.jpg";
import player2 from "@/assets/player-2.jpg";
import player3 from "@/assets/player-3.jpg";
import player4 from "@/assets/player-4.jpg";
import teamPhoto from "@/assets/team-photo.jpg";

export type Row = { id: string } & Record<string, string | number | undefined>;

export type AdminState = {
  noticias: Row[];
  equipas: Row[];
  jogadores: Row[];
  modalidades: Row[];
  modalidadeEquipas: Row[];
  atletas: Row[];
  patrocinios: Row[];
  jogos: Row[];
  mediaCategorias: Row[];
  media: Row[];
  planos: Row[];
  lugares: Row[];
  clubePaginas: Row[];
  institucional: Row[];
  horarios: Row[];
  emails: Row[];
  ctas: Row[];
  settings: {
    quota: string;
    moeda: string;
    morada: string;
    telefone: string;
    emailGeral: string;
    notaPagamento: string;
    primaryColor: string;
    accentColor: string;
    googleFont: string;
    themeMode: "light" | "dark" | "system";
    logoUrl: string;
    heroUrl: string;

    // 🔤 Fontes & Texto
    textColor: string;
    textMutedColor: string;
    headingColor: string;
    linkColor: string;

    // 🔘 Botões do Site
    btnGoldBg: string;      // Botão Amarelo / Destaque (ex: #F77F00 / Amarelo Destaque)
    btnGoldText: string;    // Texto do Botão Amarelo (ex: #000000)
    btnHeroBg: string;      // Botão Hero Principal (ex: #D90429)
    btnHeroText: string;    // Texto do Botão Hero (ex: #FFFFFF)
    btnPrimaryBg: string;   // Botão Primário (ex: #D90429)
    btnPrimaryText: string; // Texto do Botão Primário (ex: #FFFFFF)
    btnSecondaryBg: string; // Botão Secundário (ex: #F1F5F9)
    btnSecondaryText: string; // Texto do Botão Secundário (ex: #0F172A)
    btnDangerBg: string;    // Botão Perigo / Eliminar (ex: #EF4444)

    // 🚀 CTAs & Destaques
    ctaBgColor: string;
    ctaTextColor: string;

    // 🖼️ Fundo & Superfícies
    bgColor: string;
    cardBgColor: string;
    borderColor: string;

    // 📑 Menus & Cabeçalho
    headerBgColor: string;
    headerTextColor: string;
    headerHoverColor: string;
    sidebarBgColor: string;
    sidebarTextColor: string;
  };
};

export type SliceKey = Exclude<keyof AdminState, "settings">;

let uid = 0;
const id = () => `r${++uid}`;

const initial: AdminState = {
  noticias: NEWS.map((n, i) => ({
    id: id(),
    slug: n.slug,
    titulo: n.title,
    data: n.date,
    categoria: n.category,
    autor: i % 2 === 0 ? "Ana Silva (Editora)" : "Carlos Mendes (Redator)",
    estado: "Publicado",
    resumo: n.excerpt,
    imagem_capa: n.image,
    conteudo_blocos: JSON.stringify(
      n.blocks ?? n.body.map((p) => ({ type: "paragraph", text: p }))
    ),
  })),
  equipas: TEAMS.map((t) => ({ id: id(), nome: t.name, competicao: t.competition, treinador: t.coach, atletas: t.players })),
  jogadores: SQUAD.map((p) => ({
    id: id(),
    nome: p.name,
    equipa: "Equipa A",
    numero: p.number,
    posicao: p.position,
    idade: p.age,
    nacionalidade: p.nationality,
    foto: p.photo,
  })),
  modalidades: MODALIDADES.map((m) => ({
    id: id(),
    nome: m.name,
    treinador: m.coach,
    competicao: m.competition,
    recinto: m.venue,
    atletas: m.athletes,
    descricao: m.desc,
  })),
  modalidadeEquipas: MODALIDADES.map((m) => ({
    id: id(),
    nome: `${m.name} — Seniores`,
    modalidade: m.name,
    escalao: "Seniores",
    treinador: m.coach,
    competicao: m.competition,
  })),
  atletas: MODALIDADES.flatMap((m) =>
    m.roster.map((a) => ({
      id: id(),
      nome: a.name,
      modalidade: m.name,
      equipa: `${m.name} — Seniores`,
      numero: a.number,
      posicao: a.position,
      idade: a.age,
      foto: a.photo,
    })),
  ),
  patrocinios: PARTNERS.map((p, idx) => ({
    id: id(),
    nome: p.name,
    tipo: p.tier,
    site: "https://cdaves.pt",
    logotipo: idx % 2 === 0 ? logoCd : newsAdmin,
  })),
  jogos: [
    {
      id: id(),
      tipo: "Próximo jogo",
      adversario: MATCH_INFO.next.opponent,
      logo: "",
      local: MATCH_INFO.next.place,
      data: MATCH_INFO.next.date,
      hora: MATCH_INFO.next.time,
      estadio: MATCH_INFO.next.venue,
      competicao: MATCH_INFO.next.competition,
      resultado: "",
    },
    {
      id: id(),
      tipo: "Último jogo",
      adversario: MATCH_INFO.last.opponent,
      logo: "",
      local: MATCH_INFO.last.place,
      data: MATCH_INFO.last.date,
      hora: "21:00",
      estadio: MATCH_INFO.last.venue,
      competicao: MATCH_INFO.last.competition,
      resultado: MATCH_INFO.last.score,
    },
    {
      id: id(),
      tipo: "Histórico",
      adversario: "FC Porto",
      logo: "",
      local: "Fora",
      data: "20 Jul 2026",
      hora: "18:00",
      estadio: "Estádio do Dragão",
      competicao: "Liga Portugal",
      resultado: "2 — 1",
    },
    {
      id: id(),
      tipo: "Histórico",
      adversario: "SL Benfica",
      logo: "",
      local: "Casa",
      data: "13 Jul 2026",
      hora: "20:45",
      estadio: "Estádio Municipal do CD Aves",
      competicao: "Taça de Portugal",
      resultado: "2 — 2",
    },
    {
      id: id(),
      tipo: "Histórico",
      adversario: "Sporting CP",
      logo: "",
      local: "Fora",
      data: "06 Jul 2026",
      hora: "20:30",
      estadio: "Estádio José Alvalade",
      competicao: "Liga Portugal",
      resultado: "0 — 4",
    },
    {
      id: id(),
      tipo: "Histórico",
      adversario: "Vitória SC",
      logo: "",
      local: "Casa",
      data: "29 Jun 2026",
      hora: "18:00",
      estadio: "Estádio Municipal do CD Aves",
      competicao: "Liga Portugal",
      resultado: "1 — 0",
    },
  ],
  mediaCategorias: [
    { id: id(), nome: "Ficheiros Fixos do Site", pasta: "site_static", descricao: "Logótipos oficiais, emblemas e imagens hero fixas." },
    { id: id(), nome: "Notícias & Artigos", pasta: "noticias", descricao: "Fotografias e artes de notícias." },
    { id: id(), nome: "Fotos de Jogadores", pasta: "atletas", descricao: "Fotografias dos atletas e plantéis." },
    { id: id(), nome: "Patrocinadores & Parceiros", pasta: "patrocinadores", descricao: "Logótipos das marcas patrocinadoras." },
  ],
  media: [
    // 📁 Pastas: site_static
    { id: id(), titulo: "Emblema Oficial CD Aves (PNG)", pasta: "site_static", url: logoCd, tamanho: "190 KB", formato: "PNG", data: "2026-08-01" },
    { id: id(), titulo: "Fotografia Hero do Estádio", pasta: "site_static", url: heroStadium, tamanho: "119 KB", formato: "JPG", data: "2026-08-01" },

    // 📁 Pastas: noticias
    { id: id(), titulo: "Destaque Notícia Admin", pasta: "noticias", url: newsAdmin, tamanho: "164 KB", formato: "JPG", data: "2026-07-28" },
    { id: id(), titulo: "Comunicado Geral", pasta: "noticias", url: newsGeneral, tamanho: "188 KB", formato: "JPG", data: "2026-07-25" },
    { id: id(), titulo: "Fotografia de Jogo", pasta: "noticias", url: newsMatch, tamanho: "151 KB", formato: "JPG", data: "2026-07-20" },

    // 📁 Pastas: atletas
    { id: id(), titulo: "Foto Oficial Atleta #1", pasta: "atletas", url: player1, tamanho: "47 KB", formato: "JPG", data: "2026-07-01" },
    { id: id(), titulo: "Foto Oficial Atleta #2", pasta: "atletas", url: player2, tamanho: "63 KB", formato: "JPG", data: "2026-07-01" },
    { id: id(), titulo: "Foto Oficial Atleta #3", pasta: "atletas", url: player3, tamanho: "68 KB", formato: "JPG", data: "2026-07-01" },
    { id: id(), titulo: "Foto Oficial Atleta #4", pasta: "atletas", url: player4, tamanho: "70 KB", formato: "JPG", data: "2026-07-01" },
    { id: id(), titulo: "Fotografia Oficial do Plantel", pasta: "atletas", url: teamPhoto, tamanho: "252 KB", formato: "JPG", data: "2026-07-01" },

    // 📁 Pastas: patrocinadores
    { id: id(), titulo: "Logótipo Patrocinador Oficial", pasta: "patrocinadores", url: logoCd, tamanho: "190 KB", formato: "PNG", data: "2026-08-01" },

    // 📁 Pastas: vídeos
    { id: id(), titulo: "Resumo do Jogo: CD Aves vs SC Braga", tipo: "Vídeo", pasta: "videos", categoria: "Jogos", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", data: "2026-07-28" },
    { id: id(), titulo: "Conferência de Imprensa Pré-Jogo", tipo: "Vídeo", pasta: "videos", categoria: "Entrevistas", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", data: "2026-07-26" },
    { id: id(), titulo: "Bastidores: Apresentação da Época 2025/26", tipo: "Vídeo", pasta: "videos", categoria: "Institucional", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", data: "2026-07-15" },
    { id: id(), titulo: "Melhores Momentos da Vitória no Futsal", tipo: "Vídeo", pasta: "videos", categoria: "Modalidades", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", data: "2026-07-10" },
  ],
  planos: PAYMENT_PLANS.map((p) => ({ id: id(), nome: p.name, meses: p.months, desconto: `${p.discount * 100}%`, nota: p.note })),
  lugares: SEATS.map((s) => ({ id: id(), nome: s.zone, bancada: s.stand, preco: s.price, descricao: s.desc })),
  clubePaginas: [
    { id: id(), pagina: "História", resumo: "Fundado em 1919, o clube atravessa mais de um século de vida desportiva.", conteudo: "Texto completo da história do clube." },
    { id: id(), pagina: "Estádio", resumo: "Estádio Municipal do CD Aves, casa do clube desde 1954.", conteudo: "Capacidade, bancadas e acessos." },
    { id: id(), pagina: "Presidente", resumo: "Mensagem do presidente aos sócios e adeptos.", conteudo: "Biografia e mandato." },
  ],
  institucional: [
    { id: id(), seccao: "Órgãos Sociais", conteudo: "Direção, Mesa da Assembleia Geral e Conselho Fiscal do mandato em curso." },
    { id: id(), seccao: "Estatutos e Regulamentos", conteudo: "Estatutos do clube e regulamentos internos em vigor." },
    { id: id(), seccao: "Assembleias gerais", conteudo: "Convocatórias, atas e calendário de assembleias." },
    { id: id(), seccao: "Relatórios e contas", conteudo: "Relatórios e contas das últimas épocas desportivas." },
    { id: id(), seccao: "Informação privilegiada e comunicados", conteudo: "Comunicados oficiais e informação privilegiada." },
    { id: id(), seccao: "Outras empresas do grupo", conteudo: "Sociedades e entidades participadas pelo clube." },
  ],
  horarios: [
    { id: id(), servico: "Secretaria", dias: "Segunda a sexta", horario: "09:00 — 18:00" },
    { id: id(), servico: "Loja Oficial", dias: "Segunda a sábado", horario: "10:00 — 19:00" },
    { id: id(), servico: "Bilheteira", dias: "Dias de jogo", horario: "3h antes do apito inicial" },
  ],
  emails: [
    { id: id(), departamento: "Geral", email: CLUB.email },
    { id: id(), departamento: "Sócios", email: "socios@cdaves.pt" },
    { id: id(), departamento: "Comunicação", email: "imprensa@cdaves.pt" },
    { id: id(), departamento: "Corporate", email: "corporate@cdaves.pt" },
  ],
  ctas: [
    {
      id: id(),
      slug: "lugar-anual",
      nome: "Banner Lugar Anual (Homepage)",
      eyebrow: "Lugar Anual 2026/27",
      titulo: "Garante o teu lugar na bancada",
      descricao: "Todos os jogos em casa, o mesmo lugar, preço fechado para a época inteira.",
      textoBotao: "Comprar Lugar Anual",
      linkBotao: "/socios",
      usarCoresCustomizadas: "nao",
      corFundo: "#D90429",
      corTexto: "#FFFFFF",
      corBotaoFundo: "#F77F00",
      corBotaoTexto: "#000000",
    },
    {
      id: id(),
      slug: "newsletter",
      nome: "Banner Newsletter Oficial",
      eyebrow: "Newsletter",
      titulo: "Recebe as notícias primeiro",
      descricao: "Convocatórias, bastidores e campanhas de sócio directamente no teu email.",
      textoBotao: "Subscrever",
      linkBotao: "/newsletter",
      usarCoresCustomizadas: "nao",
      corFundo: "#0F172A",
      corTexto: "#FFFFFF",
      corBotaoFundo: "#F77F00",
      corBotaoTexto: "#000000",
    },
    {
      id: id(),
      slug: "campanha-socios",
      nome: "Banner Campanha de Renovação de Sócios",
      eyebrow: "Campanha de renovação",
      titulo: "Renova até 31 de agosto e mantém o teu lugar",
      descricao: "Sócios com quota em dia mantêm o lugar da época passada com prioridade absoluta.",
      textoBotao: "Falar com a secretaria",
      linkBotao: "/contactos",
      usarCoresCustomizadas: "nao",
      corFundo: "#D90429",
      corTexto: "#FFFFFF",
      corBotaoFundo: "#F77F00",
      corBotaoTexto: "#000000",
    },
    {
      id: id(),
      slug: "futebol-apoio",
      nome: "Banner Apoia a Equipa (Futebol)",
      eyebrow: "Apoia a equipa",
      titulo: "Estádio cheio, equipa mais forte",
      descricao: "Sócios têm acesso prioritário a bilhetes e descontos em todos os jogos em casa.",
      textoBotao: "Quero ser sócio",
      linkBotao: "/socios",
      usarCoresCustomizadas: "nao",
      corFundo: "#D90429",
      corTexto: "#FFFFFF",
      corBotaoFundo: "#F77F00",
      corBotaoTexto: "#000000",
    },
    {
      id: id(),
      slug: "modalidades-inscricoes",
      nome: "Banner Inscrições (Modalidades)",
      eyebrow: "Inscrições abertas",
      titulo: "Treina no clube da tua cidade",
      descricao: "Sócios têm mensalidades reduzidas em todas as escolas de formação das modalidades.",
      textoBotao: "Ser sócio e inscrever",
      linkBotao: "/socios",
      usarCoresCustomizadas: "nao",
      corFundo: "#D90429",
      corTexto: "#FFFFFF",
      corBotaoFundo: "#F77F00",
      corBotaoTexto: "#000000",
    },
    {
      id: id(),
      slug: "clube-historia",
      nome: "Banner História do Clube",
      eyebrow: "Faz parte da história",
      titulo: "Torna-te sócio do clube",
      descricao: "Quota de 8€ por mês, com descontos até 15% em pagamentos antecipados.",
      textoBotao: "Ser sócio",
      linkBotao: "/socios",
      usarCoresCustomizadas: "nao",
      corFundo: "#D90429",
      corTexto: "#FFFFFF",
      corBotaoFundo: "#F77F00",
      corBotaoTexto: "#000000",
    },
    {
      id: id(),
      slug: "clube-presidente",
      nome: "Banner Mensagem do Presidente",
      eyebrow: "Recebe as decisões em primeira mão",
      titulo: "Subscreve a newsletter do clube",
      descricao: "Comunicados oficiais, convocatórias e notícias enviadas diretamente para o teu email.",
      textoBotao: "Subscrever newsletter",
      linkBotao: "/noticias",
      usarCoresCustomizadas: "nao",
      corFundo: "#0F172A",
      corTexto: "#FFFFFF",
      corBotaoFundo: "#F77F00",
      corBotaoTexto: "#000000",
    },
    {
      id: id(),
      slug: "clube-estadio",
      nome: "Banner Lugar Anual (Estádio)",
      eyebrow: "Lugar anual",
      titulo: "Garante o teu lugar na bancada central coberta",
      descricao: "Duas modalidades disponíveis: futebol de 11 ou acesso a todas as competições do clube.",
      textoBotao: "Ver lugar anual",
      linkBotao: "/socios",
      usarCoresCustomizadas: "nao",
      corFundo: "#D90429",
      corTexto: "#FFFFFF",
      corBotaoFundo: "#F77F00",
      corBotaoTexto: "#000000",
    },
    {
      id: id(),
      slug: "clube-institucional",
      nome: "Banner Assembleias & Sócios (Institucional)",
      eyebrow: "Participa na vida do clube",
      titulo: "Sócios votam nas assembleias gerais",
      descricao: "Com a quota em dia participas e votas nas decisões estruturantes do clube.",
      textoBotao: "Ser sócio",
      linkBotao: "/socios",
      usarCoresCustomizadas: "nao",
      corFundo: "#D90429",
      corTexto: "#FFFFFF",
      corBotaoFundo: "#F77F00",
      corBotaoTexto: "#000000",
    },
  ],
  settings: {
    quota: "8",
    moeda: "EUR",
    morada: CLUB.address,
    telefone: CLUB.phone,
    emailGeral: CLUB.email,
    notaPagamento: "Débito direto, MB Way, referência multibanco ou pagamento na secretaria.",
    primaryColor: "#D90429",
    accentColor: "#F77F00",
    googleFont: "Inter",
    themeMode: "light",
    logoUrl: logoCd,
    heroUrl: heroStadium,

    // 🔤 Fontes & Texto
    textColor: "#0F172A",
    textMutedColor: "#64748B",
    headingColor: "#0F172A",
    linkColor: "#D90429",

    // 🔘 Botões do Site
    btnGoldBg: "#F77F00",      // Botão Amarelo / Destaque
    btnGoldText: "#000000",    // Texto do Botão Amarelo
    btnHeroBg: "#D90429",      // Botão Hero Principal
    btnHeroText: "#FFFFFF",    // Texto do Botão Hero
    btnPrimaryBg: "#D90429",   // Botão Primário
    btnPrimaryText: "#FFFFFF", // Texto do Botão Primário
    btnSecondaryBg: "#F1F5F9", // Botão Secundário
    btnSecondaryText: "#0F172A", // Texto do Botão Secundário
    btnDangerBg: "#EF4444",    // Botão Perigo / Eliminar

    // 🚀 CTAs & Destaques
    ctaBgColor: "#D90429",
    ctaTextColor: "#FFFFFF",

    // 🖼️ Fundo & Superfícies
    bgColor: "#FFFFFF",
    cardBgColor: "#FFFFFF",
    borderColor: "#E2E8F0",

    // 📑 Menus & Cabeçalho
    headerBgColor: "#FFFFFF",
    headerTextColor: "#0F172A",
    headerHoverColor: "#D90429",
    sidebarBgColor: "#0F172A",
    sidebarTextColor: "#F8FAFC",
  },
};

const STORAGE_KEY = "cdaves_admin_store_v1";

function saveToStorage(s: AdminState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch (e) {
    console.error("Erro a guardar no localStorage:", e);
  }
}

function loadFromStorage(): AdminState {
  if (typeof window === "undefined") return initial;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initial;
    const parsed = JSON.parse(raw);
    return {
      ...initial,
      ...parsed,
      jogos: parsed.jogos && parsed.jogos.length >= 4 ? parsed.jogos : initial.jogos,
      settings: { ...initial.settings, ...(parsed.settings ?? {}) },
    };
  } catch (e) {
    return initial;
  }
}

let state: AdminState = loadFromStorage();
const listeners = new Set<() => void>();

// Aplicar definições visuais na inicialização
if (typeof window !== "undefined") {
  setTimeout(() => applyDesignSettings(state.settings), 0);
}

export function applyDesignSettings(settings: Partial<AdminState["settings"]>) {
  if (typeof window === "undefined") return;
  const root = document.documentElement;

  // 1. Carregar Google Fontes Dinamicamente no <head>
  if (settings.googleFont) {
    const fontName = settings.googleFont;
    let linkEl = document.getElementById("google-font-dynamic") as HTMLLinkElement;
    const fontHref = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@400;500;600;700;800;900&display=swap`;
    
    if (!linkEl) {
      linkEl = document.createElement("link");
      linkEl.id = "google-font-dynamic";
      linkEl.rel = "stylesheet";
      document.head.appendChild(linkEl);
    }
    linkEl.href = fontHref;

    document.body.style.fontFamily = `'${fontName}', sans-serif`;
    root.style.setProperty("--font-sans", `'${fontName}', sans-serif`);
  }

  // 2. Aplicar Variáveis de Cores (apenas quando definidas ativamente)
  if (settings.primaryColor && settings.primaryColor !== "#D90429") {
    root.style.setProperty("--primary", settings.primaryColor);
  }

  // Botão Amarelo / Destaque (Variant "gold" / Accent)
  if (settings.btnGoldBg && settings.btnGoldBg !== "#F77F00") {
    root.style.setProperty("--accent", settings.btnGoldBg);
  }

  // CTAs Globais
  if (settings.ctaBgColor && settings.ctaBgColor !== "#D90429") {
    root.style.setProperty("--cta-bg", settings.ctaBgColor);
  }
  if (settings.ctaTextColor && settings.ctaTextColor !== "#FFFFFF") {
    root.style.setProperty("--cta-text", settings.ctaTextColor);
  }

  // Menus
  if (settings.headerBgColor) root.style.setProperty("--header-bg", settings.headerBgColor);
  if (settings.headerTextColor) root.style.setProperty("--header-text", settings.headerTextColor);
  if (settings.headerHoverColor) root.style.setProperty("--header-hover", settings.headerHoverColor);
}

function emit() {
  state = { ...state };
  saveToStorage(state);
  listeners.forEach((l) => l());
}

export function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function getState() {
  return state;
}

export function useAdmin<T>(selector: (s: AdminState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(initial),
  );
}

export function addRow(slice: SliceKey, row: Omit<Row, "id">) {
  state[slice] = [...state[slice], { ...row, id: id() } as Row];
  emit();
}

export function updateRow(slice: SliceKey, rowId: string, patch: Partial<Row>) {
  state[slice] = state[slice].map((r) => (r.id === rowId ? { ...r, ...patch } : r));
  emit();
}

export function removeRow(slice: SliceKey, rowId: string) {
  state[slice] = state[slice].filter((r) => r.id !== rowId);
  emit();
}

export function updateSettings(patch: Partial<AdminState["settings"]>) {
  state.settings = { ...state.settings, ...patch };
  applyDesignSettings(state.settings);
  emit();
}
