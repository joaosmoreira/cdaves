import { useSyncExternalStore } from "react";
import { CLUB, MODALIDADES, NEWS, PARTNERS, PAYMENT_PLANS, SEATS, SQUAD, TEAMS } from "@/data/club";

export type Row = { id: string } & Record<string, string | number | undefined>;

export type AdminState = {
  noticias: Row[];
  equipas: Row[];
  jogadores: Row[];
  modalidades: Row[];
  modalidadeEquipas: Row[];
  atletas: Row[];
  patrocinios: Row[];
  mediaCategorias: Row[];
  media: Row[];
  planos: Row[];
  lugares: Row[];
  clubePaginas: Row[];
  institucional: Row[];
  horarios: Row[];
  emails: Row[];
  settings: {
    quota: string;
    moeda: string;
    morada: string;
    telefone: string;
    emailGeral: string;
    notaPagamento: string;
  };
};

export type SliceKey = Exclude<keyof AdminState, "settings">;

let uid = 0;
const id = () => `r${++uid}`;

const initial: AdminState = {
  noticias: NEWS.map((n) => ({ id: id(), titulo: n.title, data: n.date, categoria: n.category, resumo: n.excerpt })),
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
  patrocinios: PARTNERS.map((p) => ({ id: id(), nome: p.name, tipo: p.tier, site: "", logotipo: "" })),
  mediaCategorias: [
    { id: id(), nome: "Institucional", descricao: "Conteúdos oficiais do clube." },
    { id: id(), nome: "Assembleias", descricao: "Registo de assembleias gerais." },
    { id: id(), nome: "Jogos", descricao: "Galerias e vídeos de jogos." },
  ],
  media: [
    { id: id(), titulo: "Resumo do clássico", tipo: "Vídeo", categoria: "Jogos", url: "https://www.youtube.com/watch?v=exemplo", data: "28 Jul 2026" },
    { id: id(), titulo: "Assembleia Geral de Junho", tipo: "Foto", categoria: "Assembleias", url: "", data: "20 Jun 2026" },
    { id: id(), titulo: "Apresentação de equipamentos", tipo: "Foto", categoria: "Institucional", url: "", data: "10 Jul 2026" },
  ],
  planos: PAYMENT_PLANS.map((p) => ({ id: id(), nome: p.name, meses: p.months, desconto: `${p.discount * 100}%`, nota: p.note })),
  lugares: SEATS.map((s) => ({ id: id(), nome: s.zone, bancada: s.stand, preco: s.price, descricao: s.desc })),
  clubePaginas: [
    { id: id(), pagina: "História", resumo: "Fundado em 1919, o clube atravessa mais de um século de vida desportiva.", conteudo: "Texto completo da história do clube." },
    { id: id(), pagina: "Estádio", resumo: "Estádio Municipal do Aurirrubro, casa do clube desde 1954.", conteudo: "Capacidade, bancadas e acessos." },
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
    { id: id(), departamento: "Sócios", email: "socios@cdaurirrubro.pt" },
    { id: id(), departamento: "Comunicação", email: "imprensa@cdaurirrubro.pt" },
    { id: id(), departamento: "Corporate", email: "corporate@cdaurirrubro.pt" },
  ],
  settings: {
    quota: "8",
    moeda: "EUR",
    morada: CLUB.address,
    telefone: CLUB.phone,
    emailGeral: CLUB.email,
    notaPagamento: "Débito direto, MB Way, referência multibanco ou pagamento na secretaria.",
  },
};

let state: AdminState = initial;
const listeners = new Set<() => void>();

function emit() {
  state = { ...state };
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
  emit();
}
