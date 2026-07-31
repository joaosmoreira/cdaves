import { useState } from "react";
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
  Phone,
  ChevronRight,
  Bell,
  Search,
  TrendingUp,
  Calendar,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  X,
  Shield,
  Plus,
  MapPin,
  Clock,
  Edit2,
  CheckCircle,
  Tag,
  Trash2,
  Eye,
  EyeOff,
  Filter,
  LayoutList,
  Globe,
  Lock,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

// ─── Types ───────────────────────────────────────────────────────────────────

type NavItem = { label: string; icon: React.ReactNode; id: string };
type NavGroup = { group: string; items: NavItem[] };

type GameRecord = {
  id: number;
  opponent: string;
  date: string;
  time: string;
  stadium: string;
  competition: string;
  homeScore: number | null;
  awayScore: number | null;
  isHome: boolean;
};

// ─── Navigation ───────────────────────────────────────────────────────────────

const navigation: NavGroup[] = [
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
    group: "Contactos",
    items: [{ label: "Dados de Contacto", icon: <Phone size={16} />, id: "contactos" }],
  },
];

// ─── Static data ──────────────────────────────────────────────────────────────

const memberGrowth = [
  { month: "Jan", socios: 1820 },
  { month: "Fev", socios: 1934 },
  { month: "Mar", socios: 2010 },
  { month: "Abr", socios: 2145 },
  { month: "Mai", socios: 2280 },
  { month: "Jun", socios: 2390 },
  { month: "Jul", socios: 2512 },
];

const matchResults = [
  { match: "SC Braga", goalsFor: 3, goalsAgainst: 1 },
  { match: "FC Porto", goalsFor: 1, goalsAgainst: 2 },
  { match: "Benfica", goalsFor: 2, goalsAgainst: 2 },
  { match: "Sporting", goalsFor: 4, goalsAgainst: 0 },
  { match: "Vitória SC", goalsFor: 2, goalsAgainst: 1 },
];

const recentMatches = [
  { home: "Clube", homeScore: 3, away: "SC Braga", awayScore: 1, date: "27 Jul", comp: "Liga Portugal" },
  { home: "FC Porto", homeScore: 2, away: "Clube", awayScore: 1, date: "20 Jul", comp: "Liga Portugal" },
  { home: "Clube", homeScore: 2, away: "Benfica", awayScore: 2, date: "13 Jul", comp: "Taça de Portugal" },
  { home: "Sporting", homeScore: 0, away: "Clube", awayScore: 4, date: "6 Jul", comp: "Liga Portugal" },
];

const recentArticles = [
  { title: "Pré-época 2025/26: Plantel apresentado", views: 4820, date: "28 Jul 2026" },
  { title: "Renovação de contrato: João Ferreira assina por 3 anos", views: 3210, date: "25 Jul 2026" },
  { title: "Academia: 12 jovens promovidos ao plantel B", views: 1980, date: "22 Jul 2026" },
  { title: "Patrocínio histórico com NovoBanco confirmado", views: 2740, date: "18 Jul 2026" },
];

const initialLastGame: GameRecord = {
  id: 0,
  opponent: "SC Braga",
  date: "2026-07-27",
  time: "21:00",
  stadium: "Estádio Municipal",
  competition: "Liga Portugal",
  homeScore: 3,
  awayScore: 1,
  isHome: true,
};

const initialNextGame: GameRecord = {
  id: 1,
  opponent: "Gil Vicente",
  date: "2026-08-03",
  time: "21:00",
  stadium: "Estádio Cidade de Barcelos",
  competition: "Liga Portugal",
  homeScore: null,
  awayScore: null,
  isHome: false,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  return `${d} ${months[parseInt(m) - 1]} ${y}`;
}

function resultBadge(record: GameRecord) {
  if (record.homeScore === null || record.awayScore === null) return null;
  const clubScore = record.isHome ? record.homeScore : record.awayScore;
  const oppScore = record.isHome ? record.awayScore : record.homeScore;
  if (clubScore > oppScore) return { label: "V", cls: "bg-primary/20 text-primary" };
  if (clubScore === oppScore) return { label: "E", cls: "bg-secondary text-muted-foreground" };
  return { label: "D", cls: "bg-destructive/20 text-destructive" };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, delta, positive, icon }: {
  label: string; value: string; delta: string; positive: boolean; icon: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-xs font-medium uppercase tracking-widest font-mono">{label}</span>
        <span className="text-muted-foreground">{icon}</span>
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="text-foreground text-3xl font-bold leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          {value}
        </span>
        <span className={`flex items-center gap-0.5 text-xs font-medium font-mono mb-0.5 ${positive ? "text-primary" : "text-destructive"}`}>
          {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {delta}
        </span>
      </div>
    </div>
  );
}

// ─── Field helper ─────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-secondary border border-border rounded-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/60 transition-colors font-mono";

// ─── Result Popup ─────────────────────────────────────────────────────────────

function ResultModal({
  game,
  onConfirm,
  onClose,
}: {
  game: GameRecord;
  onConfirm: (homeScore: number, awayScore: number) => void;
  onClose: () => void;
}) {
  const [hs, setHs] = useState("0");
  const [as_, setAs] = useState("0");

  const homeTeam = game.isHome ? "Clube" : game.opponent;
  const awayTeam = game.isHome ? game.opponent : "Clube";

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onConfirm(parseInt(hs) || 0, parseInt(as_) || 0);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-sm mx-4 p-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
          <X size={16} />
        </button>

        <p className="text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground mb-1">
          Resultado Final
        </p>
        <h2 className="text-foreground font-bold mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.4rem" }}>
          {homeTeam} vs {awayTeam}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center gap-4">
            <Field label={homeTeam}>
              <input
                type="number"
                min={0}
                value={hs}
                onChange={(e) => setHs(e.target.value)}
                className={`${inputCls} text-center text-2xl font-bold`}
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              />
            </Field>
            <span className="text-muted-foreground font-bold text-lg mt-6 flex-shrink-0">—</span>
            <Field label={awayTeam}>
              <input
                type="number"
                min={0}
                value={as_}
                onChange={(e) => setAs(e.target.value)}
                className={`${inputCls} text-center text-2xl font-bold`}
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              />
            </Field>
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2 rounded-md border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors font-medium">
              Cancelar
            </button>
            <button type="submit"
              className="flex-1 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <CheckCircle size={14} /> Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── New Game Modal ───────────────────────────────────────────────────────────

type NewGameForm = {
  opponent: string;
  date: string;
  time: string;
  stadium: string;
  competition: string;
  isHome: boolean;
};

const emptyForm: NewGameForm = {
  opponent: "",
  date: "",
  time: "",
  stadium: "",
  competition: "",
  isHome: true,
};

function NewGameModal({
  onConfirm,
  onClose,
}: {
  onConfirm: (form: NewGameForm) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<NewGameForm>(emptyForm);

  function set(key: keyof NewGameForm, val: string | boolean) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.opponent || !form.date || !form.time || !form.stadium || !form.competition) return;
    onConfirm(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
          <X size={16} />
        </button>

        <p className="text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground mb-1">Novo Jogo</p>
        <h2 className="text-foreground font-bold mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.4rem" }}>
          Próximo Jogo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Adversário">
            <input required placeholder="Ex: FC Porto" value={form.opponent}
              onChange={(e) => set("opponent", e.target.value)} className={inputCls} />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Data">
              <input required type="date" value={form.date}
                onChange={(e) => set("date", e.target.value)} className={inputCls} />
            </Field>
            <Field label="Hora">
              <input required type="time" value={form.time}
                onChange={(e) => set("time", e.target.value)} className={inputCls} />
            </Field>
          </div>

          <Field label="Estádio">
            <input required placeholder="Ex: Estádio Municipal" value={form.stadium}
              onChange={(e) => set("stadium", e.target.value)} className={inputCls} />
          </Field>

          <Field label="Competição">
            <input required placeholder="Ex: Liga Portugal" value={form.competition}
              onChange={(e) => set("competition", e.target.value)} className={inputCls} />
          </Field>

          <Field label="Local">
            <div className="flex rounded-md overflow-hidden border border-border">
              <button type="button"
                onClick={() => set("isHome", true)}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${form.isHome ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                Casa
              </button>
              <button type="button"
                onClick={() => set("isHome", false)}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${!form.isHome ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                Fora
              </button>
            </div>
          </Field>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2 rounded-md border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors font-medium">
              Cancelar
            </button>
            <button type="submit"
              className="flex-1 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <Plus size={14} /> Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Edit Game Modal ──────────────────────────────────────────────────────────

function EditGameModal({
  game,
  title,
  withResult,
  onConfirm,
  onClose,
}: {
  game: GameRecord;
  title: string;
  withResult: boolean;
  onConfirm: (g: GameRecord) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<GameRecord>(game);

  function set(key: keyof GameRecord, val: string | number | boolean | null) {
    setForm((p) => ({ ...p, [key]: val }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onConfirm(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
          <X size={16} />
        </button>

        <p className="text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground mb-1">Editar</p>
        <h2 className="text-foreground font-bold mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.4rem" }}>
          {title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Adversário">
            <input required value={form.opponent}
              onChange={(e) => set("opponent", e.target.value)} className={inputCls} />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Data">
              <input required type="date" value={form.date}
                onChange={(e) => set("date", e.target.value)} className={inputCls} />
            </Field>
            <Field label="Hora">
              <input required type="time" value={form.time}
                onChange={(e) => set("time", e.target.value)} className={inputCls} />
            </Field>
          </div>

          <Field label="Estádio">
            <input required value={form.stadium}
              onChange={(e) => set("stadium", e.target.value)} className={inputCls} />
          </Field>

          <Field label="Competição">
            <input required value={form.competition}
              onChange={(e) => set("competition", e.target.value)} className={inputCls} />
          </Field>

          <Field label="Local">
            <div className="flex rounded-md overflow-hidden border border-border">
              <button type="button" onClick={() => set("isHome", true)}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${form.isHome ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                Casa
              </button>
              <button type="button" onClick={() => set("isHome", false)}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${!form.isHome ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                Fora
              </button>
            </div>
          </Field>

          {withResult && (
            <div className="flex items-center gap-4 pt-1">
              <Field label={form.isHome ? "Golos Casa" : "Golos Fora"}>
                <input type="number" min={0}
                  value={form.homeScore ?? ""}
                  onChange={(e) => set("homeScore", e.target.value === "" ? null : parseInt(e.target.value))}
                  className={`${inputCls} text-center`} />
              </Field>
              <span className="text-muted-foreground font-bold mt-6 flex-shrink-0">—</span>
              <Field label={form.isHome ? "Golos Fora" : "Golos Casa"}>
                <input type="number" min={0}
                  value={form.awayScore ?? ""}
                  onChange={(e) => set("awayScore", e.target.value === "" ? null : parseInt(e.target.value))}
                  className={`${inputCls} text-center`} />
              </Field>
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2 rounded-md border border-border text-sm text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors font-medium">
              Cancelar
            </button>
            <button type="submit"
              className="flex-1 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <CheckCircle size={14} /> Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Game Card ────────────────────────────────────────────────────────────────

function GameCard({
  label,
  game,
  onEdit,
  action,
}: {
  label: string;
  game: GameRecord;
  onEdit: () => void;
  action?: React.ReactNode;
}) {
  const badge = resultBadge(game);
  const homeTeam = game.isHome ? "Clube" : game.opponent;
  const awayTeam = game.isHome ? game.opponent : "Clube";

  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground">{label}</p>
        <button onClick={onEdit}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-2.5 py-1">
          <Edit2 size={11} /> Editar
        </button>
      </div>

      {/* Score / VS */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 text-center">
          <p className="text-muted-foreground text-xs font-mono mb-1">{homeTeam === "Clube" ? "Casa" : "Fora"}</p>
          <p className="text-foreground font-bold text-sm">{homeTeam}</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          {badge && game.homeScore !== null && game.awayScore !== null ? (
            <>
              <span className="text-foreground font-bold tabular-nums" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "2.2rem", lineHeight: 1 }}>
                {game.homeScore} — {game.awayScore}
              </span>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${badge.cls}`}>{badge.label === "V" ? "Vitória" : badge.label === "E" ? "Empate" : "Derrota"}</span>
            </>
          ) : (
            <span className="text-muted-foreground font-bold text-2xl" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>vs</span>
          )}
        </div>
        <div className="flex-1 text-center">
          <p className="text-muted-foreground text-xs font-mono mb-1">{awayTeam === "Clube" ? "Casa" : "Fora"}</p>
          <p className="text-foreground font-bold text-sm">{awayTeam}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="grid grid-cols-3 gap-3 pt-1 border-t border-border">
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground/60 text-xs font-mono">Data</span>
          <span className="text-foreground text-xs font-mono">{formatDate(game.date)}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground/60 text-xs font-mono flex items-center gap-1"><Clock size={10} /> Hora</span>
          <span className="text-foreground text-xs font-mono">{game.time}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-muted-foreground/60 text-xs font-mono">Competição</span>
          <span className="text-foreground text-xs font-mono truncate">{game.competition}</span>
        </div>
        <div className="col-span-3 flex flex-col gap-1">
          <span className="text-muted-foreground/60 text-xs font-mono flex items-center gap-1"><MapPin size={10} /> Estádio</span>
          <span className="text-foreground text-xs font-mono">{game.stadium}</span>
        </div>
      </div>

      {action && <div className="pt-1">{action}</div>}
    </div>
  );
}

// ─── Jogos View ───────────────────────────────────────────────────────────────

function JogosView() {
  const [lastGame, setLastGame] = useState<GameRecord>(initialLastGame);
  const [nextGame, setNextGame] = useState<GameRecord>(initialNextGame);
  const [history, setHistory] = useState<GameRecord[]>([]);
  const [nextId, setNextId] = useState(100);

  const [showNewGame, setShowNewGame] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [pendingGame, setPendingGame] = useState<GameRecord | null>(null);
  const [editTarget, setEditTarget] = useState<"last" | "next" | null>(null);

  function handleAddGame() {
    setShowNewGame(true);
  }

  function handleNewGameConfirm(form: NewGameForm) {
    const newNext: GameRecord = {
      id: nextId,
      ...form,
      homeScore: null,
      awayScore: null,
    };
    setNextId((n) => n + 1);
    setShowNewGame(false);
    setPendingGame(newNext);
    setShowResult(true);
  }

  function handleResultConfirm(homeScore: number, awayScore: number) {
    const finishedGame: GameRecord = { ...nextGame, homeScore, awayScore };
    setHistory((h) => [lastGame, ...h]);
    setLastGame(finishedGame);
    if (pendingGame) setNextGame(pendingGame);
    setPendingGame(null);
    setShowResult(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground font-bold leading-none mb-1"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.75rem" }}>
            JOGOS E RESULTADOS
          </h1>
          <p className="text-muted-foreground text-sm font-mono">Gestão de jogos da equipa principal</p>
        </div>
        <button onClick={handleAddGame}
          className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
          <Plus size={14} /> Novo Jogo
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <GameCard
          label="Último Jogo"
          game={lastGame}
          onEdit={() => setEditTarget("last")}
        />
        <GameCard
          label="Próximo Jogo"
          game={nextGame}
          onEdit={() => setEditTarget("next")}
          action={
            <button onClick={handleAddGame}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-md border border-primary/40 text-primary text-sm font-medium hover:bg-primary/10 transition-colors">
              <Plus size={13} /> Adicionar resultado e definir novo jogo
            </button>
          }
        />
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6">
          <p className="text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground mb-4">
            Histórico de Jogos
          </p>
          <div className="space-y-1">
            {history.map((g) => {
              const badge = resultBadge(g);
              const homeT = g.isHome ? "Clube" : g.opponent;
              const awayT = g.isHome ? g.opponent : "Clube";
              return (
                <div key={g.id} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
                  {badge && (
                    <span className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 ${badge.cls}`}>
                      {badge.label}
                    </span>
                  )}
                  <div className="flex-1 flex items-center justify-center gap-2 text-sm">
                    <span className={homeT === "Clube" ? "text-foreground font-medium" : "text-muted-foreground"}>{homeT}</span>
                    <span className="font-mono font-bold text-foreground tabular-nums">
                      {g.homeScore} — {g.awayScore}
                    </span>
                    <span className={awayT === "Clube" ? "text-foreground font-medium" : "text-muted-foreground"}>{awayT}</span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-muted-foreground font-mono">{formatDate(g.date)}</p>
                    <p className="text-xs text-muted-foreground/60 font-mono">{g.competition}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modals */}
      {showNewGame && (
        <NewGameModal
          onConfirm={handleNewGameConfirm}
          onClose={() => { setShowNewGame(false); setPendingGame(null); }}
        />
      )}

      {showResult && pendingGame && (
        <ResultModal
          game={nextGame}
          onConfirm={handleResultConfirm}
          onClose={() => { setShowResult(false); setPendingGame(null); }}
        />
      )}

      {editTarget === "last" && (
        <EditGameModal
          game={lastGame}
          title="Último Jogo"
          withResult
          onConfirm={(g) => { setLastGame(g); setEditTarget(null); }}
          onClose={() => setEditTarget(null)}
        />
      )}

      {editTarget === "next" && (
        <EditGameModal
          game={nextGame}
          title="Próximo Jogo"
          withResult={false}
          onConfirm={(g) => { setNextGame(g); setEditTarget(null); }}
          onClose={() => setEditTarget(null)}
        />
      )}
    </div>
  );
}

// ─── Articles types ───────────────────────────────────────────────────────────

type CategoryType = "jogos" | "generalista" | "administrativo" | "custom";

type ArticleCategory = {
  id: string;
  name: string;
  type: CategoryType;
  color: string;
  description: string;
};

type Article = {
  id: string;
  title: string;
  excerpt: string;
  categoryId: string;
  status: "published" | "draft";
  date: string;
  author: string;
  views: number;
  matchOpponent?: string;
  matchHomeScore?: number | null;
  matchAwayScore?: number | null;
  matchIsHome?: boolean;
  matchCompetition?: string;
};

const categoryTypeLabels: Record<CategoryType, string> = {
  jogos: "Notícias de Jogos",
  generalista: "Notícias Generalistas",
  administrativo: "Notícias Administrativas",
  custom: "Personalizada",
};

const categoryTypeColors: Record<CategoryType, string> = {
  jogos: "#22c55e",
  generalista: "#3b82f6",
  administrativo: "#f59e0b",
  custom: "#a855f7",
};

const initialCategories: ArticleCategory[] = [
  {
    id: "cat-jogos",
    name: "Notícias de Jogos",
    type: "jogos",
    color: "#22c55e",
    description: "Cobertura de jogos, relatórios pós-jogo e análises de resultados.",
  },
  {
    id: "cat-geral",
    name: "Notícias Generalistas",
    type: "generalista",
    color: "#3b82f6",
    description: "Informação geral sobre o dia a dia do clube.",
  },
  {
    id: "cat-admin",
    name: "Notícias Administrativas",
    type: "administrativo",
    color: "#f59e0b",
    description: "Assembleias, eleições, órgãos sociais e comunicados oficiais.",
  },
];

const initialArticles: Article[] = [
  {
    id: "a1",
    title: "Vitória sobre o SC Braga: análise completa do jogo",
    excerpt: "Análise táctica e estatísticas do jogo de sábado em que vencemos por 3-1.",
    categoryId: "cat-jogos",
    status: "published",
    date: "2026-07-27",
    author: "Redação Desportiva",
    views: 4820,
    matchOpponent: "SC Braga",
    matchHomeScore: 3,
    matchAwayScore: 1,
    matchIsHome: true,
    matchCompetition: "Liga Portugal",
  },
  {
    id: "a2",
    title: "João Ferreira renova contrato por mais 3 anos",
    excerpt: "O médio internacional assinou esta tarde a renovação do seu vínculo com o clube até 2029.",
    categoryId: "cat-geral",
    status: "published",
    date: "2026-07-25",
    author: "Comunicação",
    views: 3210,
  },
  {
    id: "a3",
    title: "Assembleia Geral Ordinária — Convocatória",
    excerpt: "Ficam convocados todos os sócios para a Assembleia Geral Ordinária a realizar no dia 15 de Agosto.",
    categoryId: "cat-admin",
    status: "published",
    date: "2026-07-22",
    author: "Mesa da Assembleia",
    views: 1980,
  },
  {
    id: "a4",
    title: "Derrota em Porto: reflexão e caminho a seguir",
    excerpt: "Apesar do resultado negativo, a equipa técnica mantém a confiança no grupo de trabalho.",
    categoryId: "cat-jogos",
    status: "published",
    date: "2026-07-20",
    author: "Redação Desportiva",
    views: 2740,
    matchOpponent: "FC Porto",
    matchHomeScore: 2,
    matchAwayScore: 1,
    matchIsHome: false,
    matchCompetition: "Liga Portugal",
  },
  {
    id: "a5",
    title: "Eleições para os Órgãos Sociais 2026-2028",
    excerpt: "Candidaturas abertas até 30 de Agosto. Consulte o regulamento eleitoral no documento em anexo.",
    categoryId: "cat-admin",
    status: "draft",
    date: "2026-07-18",
    author: "Mesa da Assembleia",
    views: 0,
  },
  {
    id: "a6",
    title: "Academia: 12 jovens sobem ao plantel B",
    excerpt: "A formação do clube volta a dar frutos com mais uma leva de talentos a integrar o plantel profissional.",
    categoryId: "cat-geral",
    status: "published",
    date: "2026-07-15",
    author: "Comunicação",
    views: 1540,
  },
];

// ─── Category badge ───────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: ArticleCategory | undefined }) {
  if (!category) return null;
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-mono font-medium px-2 py-0.5 rounded-full"
      style={{ background: `${category.color}22`, color: category.color }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: category.color }} />
      {category.name}
    </span>
  );
}

// ─── Category Modal ───────────────────────────────────────────────────────────

function CategoryModal({
  initial,
  onConfirm,
  onClose,
}: {
  initial?: ArticleCategory;
  onConfirm: (c: Omit<ArticleCategory, "id">) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [type, setType] = useState<CategoryType>(initial?.type ?? "custom");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [color, setColor] = useState(initial?.color ?? categoryTypeColors.custom);

  function handleTypeChange(t: CategoryType) {
    setType(t);
    setColor(categoryTypeColors[t]);
    if (!initial) setName(categoryTypeLabels[t]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onConfirm({ name, type, color, description });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-md mx-4 p-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
          <X size={16} />
        </button>
        <p className="text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground mb-1">
          {initial ? "Editar Categoria" : "Nova Categoria"}
        </p>
        <h2 className="text-foreground font-bold mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.4rem" }}>
          {initial ? initial.name : "Definir Categoria"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Tipo de Categoria">
            <div className="grid grid-cols-2 gap-2">
              {(["jogos", "generalista", "administrativo", "custom"] as CategoryType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleTypeChange(t)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm transition-colors text-left ${
                    type === t ? "border-primary/60 bg-primary/10 text-primary" : "border-border bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: categoryTypeColors[t] }} />
                  <span className="text-xs font-mono">{categoryTypeLabels[t]}</span>
                </button>
              ))}
            </div>
          </Field>

          <Field label="Nome">
            <input required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Nome da categoria" className={inputCls} />
          </Field>

          <Field label="Descrição">
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="Breve descrição (opcional)" rows={2}
              className={`${inputCls} resize-none`} />
          </Field>

          <Field label="Cor">
            <div className="flex items-center gap-3">
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)}
                className="w-10 h-9 rounded-md border border-border bg-secondary cursor-pointer p-1" />
              <span className="text-sm font-mono text-muted-foreground">{color}</span>
            </div>
          </Field>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2 rounded-md border border-border text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
              Cancelar
            </button>
            <button type="submit"
              className="flex-1 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <CheckCircle size={14} /> {initial ? "Guardar" : "Criar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Article Modal ────────────────────────────────────────────────────────────

type ArticleForm = Omit<Article, "id" | "views">;

function ArticleModal({
  initial,
  categories,
  onConfirm,
  onClose,
}: {
  initial?: Article;
  categories: ArticleCategory[];
  onConfirm: (a: ArticleForm) => void;
  onClose: () => void;
}) {
  const defaultCat = categories[0]?.id ?? "";
  const [form, setForm] = useState<ArticleForm>({
    title: initial?.title ?? "",
    excerpt: initial?.excerpt ?? "",
    categoryId: initial?.categoryId ?? defaultCat,
    status: initial?.status ?? "draft",
    date: initial?.date ?? new Date().toISOString().split("T")[0],
    author: initial?.author ?? "",
    matchOpponent: initial?.matchOpponent ?? "",
    matchHomeScore: initial?.matchHomeScore ?? null,
    matchAwayScore: initial?.matchAwayScore ?? null,
    matchIsHome: initial?.matchIsHome ?? true,
    matchCompetition: initial?.matchCompetition ?? "",
  });

  const activeCat = categories.find((c) => c.id === form.categoryId);
  const isJogos = activeCat?.type === "jogos";

  function set<K extends keyof ArticleForm>(k: K, v: ArticleForm[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.categoryId) return;
    onConfirm(form);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-lg mx-4 p-6 max-h-[92vh] overflow-y-auto scrollbar-hide">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
          <X size={16} />
        </button>
        <p className="text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground mb-1">
          {initial ? "Editar Artigo" : "Novo Artigo"}
        </p>
        <h2 className="text-foreground font-bold mb-5" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.4rem" }}>
          {initial ? initial.title : "Criar Artigo"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Título">
            <input required value={form.title} onChange={(e) => set("title", e.target.value)}
              placeholder="Título do artigo" className={inputCls} />
          </Field>

          <Field label="Categoria">
            <div className="relative">
              <select
                value={form.categoryId}
                onChange={(e) => set("categoryId", e.target.value)}
                className={`${inputCls} appearance-none pr-8`}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </Field>

          <Field label="Resumo / Excerto">
            <textarea value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)}
              placeholder="Breve descrição do artigo..." rows={3}
              className={`${inputCls} resize-none`} />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Autor">
              <input value={form.author} onChange={(e) => set("author", e.target.value)}
                placeholder="Ex: Redação" className={inputCls} />
            </Field>
            <Field label="Data de Publicação">
              <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)}
                className={inputCls} />
            </Field>
          </div>

          <Field label="Estado">
            <div className="flex rounded-md overflow-hidden border border-border">
              <button type="button" onClick={() => set("status", "published")}
                className={`flex-1 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-1.5 ${form.status === "published" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                <Globe size={13} /> Publicado
              </button>
              <button type="button" onClick={() => set("status", "draft")}
                className={`flex-1 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-1.5 ${form.status === "draft" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                <Lock size={13} /> Rascunho
              </button>
            </div>
          </Field>

          {isJogos && (
            <div className="border border-border rounded-lg p-4 space-y-3">
              <p className="text-xs font-mono font-medium uppercase tracking-widest text-primary flex items-center gap-1.5">
                <Trophy size={11} /> Resultado do Jogo
              </p>
              <Field label="Adversário">
                <input value={form.matchOpponent ?? ""} onChange={(e) => set("matchOpponent", e.target.value)}
                  placeholder="Ex: FC Porto" className={inputCls} />
              </Field>
              <Field label="Competição">
                <input value={form.matchCompetition ?? ""} onChange={(e) => set("matchCompetition", e.target.value)}
                  placeholder="Ex: Liga Portugal" className={inputCls} />
              </Field>
              <Field label="Local">
                <div className="flex rounded-md overflow-hidden border border-border">
                  <button type="button" onClick={() => set("matchIsHome", true)}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${form.matchIsHome ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                    Casa
                  </button>
                  <button type="button" onClick={() => set("matchIsHome", false)}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${!form.matchIsHome ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                    Fora
                  </button>
                </div>
              </Field>
              <div className="flex items-center gap-3">
                <Field label={form.matchIsHome ? "Golos Casa" : "Golos Fora"}>
                  <input type="number" min={0}
                    value={form.matchHomeScore ?? ""}
                    onChange={(e) => set("matchHomeScore", e.target.value === "" ? null : parseInt(e.target.value))}
                    className={`${inputCls} text-center`} />
                </Field>
                <span className="text-muted-foreground font-bold mt-6 flex-shrink-0">—</span>
                <Field label={form.matchIsHome ? "Golos Fora" : "Golos Casa"}>
                  <input type="number" min={0}
                    value={form.matchAwayScore ?? ""}
                    onChange={(e) => set("matchAwayScore", e.target.value === "" ? null : parseInt(e.target.value))}
                    className={`${inputCls} text-center`} />
                </Field>
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className="flex-1 py-2 rounded-md border border-border text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
              Cancelar
            </button>
            <button type="submit"
              className="flex-1 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <CheckCircle size={14} /> {initial ? "Guardar" : "Criar Artigo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Articles View ────────────────────────────────────────────────────────────

function ArticlesView() {
  const [categories, setCategories] = useState<ArticleCategory[]>(initialCategories);
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [tab, setTab] = useState<"articles" | "categories">("articles");
  const [filterCat, setFilterCat] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all");
  const [search, setSearch] = useState("");

  const [showArticleModal, setShowArticleModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | undefined>();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ArticleCategory | undefined>();
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  let counter = 1000;
  function newId() { return `id-${Date.now()}-${counter++}`; }

  function handleSaveArticle(form: ArticleForm) {
    if (editingArticle) {
      setArticles((prev) => prev.map((a) => a.id === editingArticle.id ? { ...a, ...form } : a));
    } else {
      setArticles((prev) => [{ id: newId(), views: 0, ...form }, ...prev]);
    }
    setShowArticleModal(false);
    setEditingArticle(undefined);
  }

  function handleSaveCategory(data: Omit<ArticleCategory, "id">) {
    if (editingCategory) {
      setCategories((prev) => prev.map((c) => c.id === editingCategory.id ? { ...c, ...data } : c));
    } else {
      setCategories((prev) => [...prev, { id: newId(), ...data }]);
    }
    setShowCategoryModal(false);
    setEditingCategory(undefined);
  }

  function handleDeleteArticle(id: string) {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    setConfirmDelete(null);
  }

  function handleDeleteCategory(id: string) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setArticles((prev) => prev.filter((a) => a.id !== id));
    setConfirmDelete(null);
  }

  function toggleStatus(id: string) {
    setArticles((prev) => prev.map((a) => a.id === id ? { ...a, status: a.status === "published" ? "draft" : "published" } : a));
  }

  const filtered = articles.filter((a) => {
    if (filterCat !== "all" && a.categoryId !== filterCat) return false;
    if (filterStatus !== "all" && a.status !== filterStatus) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const categoryCount = (catId: string) => articles.filter((a) => a.categoryId === catId).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground font-bold leading-none mb-1"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.75rem" }}>
            ARTIGOS
          </h1>
          <p className="text-muted-foreground text-sm font-mono">
            {articles.length} artigos · {categories.length} categorias
          </p>
        </div>
        <div className="flex items-center gap-2">
          {tab === "articles" ? (
            <button onClick={() => { setEditingArticle(undefined); setShowArticleModal(true); }}
              className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              <Plus size={14} /> Novo Artigo
            </button>
          ) : (
            <button onClick={() => { setEditingCategory(undefined); setShowCategoryModal(true); }}
              className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
              <Plus size={14} /> Nova Categoria
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        {([
          { id: "articles", label: "Artigos", icon: <LayoutList size={14} /> },
          { id: "categories", label: "Categorias", icon: <Tag size={14} /> },
        ] as const).map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Articles tab */}
      {tab === "articles" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-secondary rounded-md px-3 py-1.5 flex-1 min-w-[200px] max-w-xs">
              <Search size={13} className="text-muted-foreground flex-shrink-0" />
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar artigos..." className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full font-mono" />
            </div>

            <div className="relative">
              <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)}
                className="bg-secondary border border-border rounded-md pl-3 pr-8 py-1.5 text-sm text-foreground outline-none font-mono appearance-none cursor-pointer">
                <option value="all">Todas as categorias</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <Filter size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>

            <div className="flex rounded-md overflow-hidden border border-border">
              {(["all", "published", "draft"] as const).map((s) => (
                <button key={s} onClick={() => setFilterStatus(s)}
                  className={`px-3 py-1.5 text-xs font-mono transition-colors ${filterStatus === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                  {s === "all" ? "Todos" : s === "published" ? "Publicados" : "Rascunhos"}
                </button>
              ))}
            </div>

            <span className="text-xs text-muted-foreground font-mono ml-auto">{filtered.length} resultado{filtered.length !== 1 ? "s" : ""}</span>
          </div>

          {/* Articles list */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <AlertCircle size={24} className="text-muted-foreground mb-3" />
                <p className="text-muted-foreground text-sm font-mono">Nenhum artigo encontrado</p>
              </div>
            ) : (
              <div>
                {filtered.map((article, idx) => {
                  const cat = categories.find((c) => c.id === article.categoryId);
                  const isJogosCat = cat?.type === "jogos";
                  const hasResult = isJogosCat && article.matchOpponent;
                  const clubScore = article.matchIsHome ? article.matchHomeScore : article.matchAwayScore;
                  const oppScore = article.matchIsHome ? article.matchAwayScore : article.matchHomeScore;
                  const resultBadgeLabel =
                    hasResult && clubScore !== null && clubScore !== undefined && oppScore !== null && oppScore !== undefined
                      ? clubScore > oppScore ? "V" : clubScore === oppScore ? "E" : "D"
                      : null;
                  const resultBadgeCls = resultBadgeLabel === "V"
                    ? "bg-primary/20 text-primary"
                    : resultBadgeLabel === "E"
                    ? "bg-secondary text-muted-foreground"
                    : "bg-destructive/20 text-destructive";

                  return (
                    <div key={article.id}
                      className={`flex items-start gap-4 p-4 ${idx !== filtered.length - 1 ? "border-b border-border" : ""} hover:bg-secondary/40 transition-colors group`}>

                      {/* Status dot */}
                      <div className="mt-1 flex-shrink-0">
                        <span className={`w-2 h-2 rounded-full block mt-0.5 ${article.status === "published" ? "bg-primary" : "bg-muted-foreground/40"}`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <CategoryBadge category={cat} />
                          {hasResult && resultBadgeLabel && (
                            <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${resultBadgeCls}`}>
                              {resultBadgeLabel}
                            </span>
                          )}
                          {article.status === "draft" && (
                            <span className="text-xs font-mono text-muted-foreground/60 border border-border rounded px-1.5 py-0.5">Rascunho</span>
                          )}
                        </div>
                        <p className="text-foreground font-medium text-sm mb-0.5 truncate">{article.title}</p>
                        <p className="text-muted-foreground text-xs font-mono truncate">{article.excerpt}</p>

                        {/* Match result inline */}
                        {hasResult && (
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1.5 bg-secondary rounded px-2 py-1 text-xs font-mono">
                              <Trophy size={10} className="text-muted-foreground" />
                              <span className="text-foreground font-medium">
                                {article.matchIsHome ? "Clube" : article.matchOpponent}
                              </span>
                              <span className="text-foreground font-bold tabular-nums">
                                {article.matchHomeScore} — {article.matchAwayScore}
                              </span>
                              <span className="text-foreground font-medium">
                                {article.matchIsHome ? article.matchOpponent : "Clube"}
                              </span>
                              {article.matchCompetition && (
                                <span className="text-muted-foreground">· {article.matchCompetition}</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Meta */}
                      <div className="flex-shrink-0 text-right hidden sm:block">
                        <p className="text-xs text-muted-foreground font-mono">{formatDate(article.date)}</p>
                        <p className="text-xs text-muted-foreground/60 font-mono">{article.author}</p>
                        {article.status === "published" && (
                          <p className="text-xs text-muted-foreground/60 font-mono flex items-center justify-end gap-1 mt-0.5">
                            <Eye size={10} /> {article.views.toLocaleString("pt-PT")}
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => toggleStatus(article.id)}
                          className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          title={article.status === "published" ? "Despublicar" : "Publicar"}>
                          {article.status === "published" ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button onClick={() => { setEditingArticle(article); setShowArticleModal(true); }}
                          className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => setConfirmDelete(article.id)}
                          className="p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Categories tab */}
      {tab === "categories" && (
        <div className="space-y-3">
          {categories.map((cat) => {
            const count = categoryCount(cat.id);
            const typeLabel = categoryTypeLabels[cat.type];
            const isProtected = ["cat-jogos", "cat-geral", "cat-admin"].includes(cat.id);
            return (
              <div key={cat.id} className="bg-card border border-border rounded-xl p-5 flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: `${cat.color}22` }}>
                  <Tag size={18} style={{ color: cat.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <span className="text-foreground font-medium text-sm">{cat.name}</span>
                    <span className="text-xs font-mono px-1.5 py-0.5 rounded-full"
                      style={{ background: `${cat.color}22`, color: cat.color }}>
                      {typeLabel}
                    </span>
                    {isProtected && (
                      <span className="text-xs font-mono text-muted-foreground/50 border border-border rounded px-1.5 py-0.5">Padrão</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-mono">{cat.description}</p>
                  <p className="text-xs text-muted-foreground/60 font-mono mt-1">
                    {count} artigo{count !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditingCategory(cat); setShowCategoryModal(true); }}
                    className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                    <Edit2 size={14} />
                  </button>
                  {!isProtected && (
                    <button onClick={() => setConfirmDelete(cat.id)}
                      className="p-1.5 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          <button onClick={() => { setEditingCategory(undefined); setShowCategoryModal(true); }}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors text-sm font-medium">
            <Plus size={14} /> Adicionar Categoria
          </button>
        </div>
      )}

      {/* Modals */}
      {showArticleModal && (
        <ArticleModal
          initial={editingArticle}
          categories={categories}
          onConfirm={handleSaveArticle}
          onClose={() => { setShowArticleModal(false); setEditingArticle(undefined); }}
        />
      )}

      {showCategoryModal && (
        <CategoryModal
          initial={editingCategory}
          onConfirm={handleSaveCategory}
          onClose={() => { setShowCategoryModal(false); setEditingCategory(undefined); }}
        />
      )}

      {/* Confirm delete */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setConfirmDelete(null)} />
          <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-sm mx-4 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-destructive/15 flex items-center justify-center">
                <Trash2 size={16} className="text-destructive" />
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">Confirmar eliminação</p>
                <p className="text-muted-foreground text-xs font-mono">Esta acção não pode ser desfeita.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2 rounded-md border border-border text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
                Cancelar
              </button>
              <button onClick={() => {
                const isArticle = articles.find((a) => a.id === confirmDelete);
                if (isArticle) handleDeleteArticle(confirmDelete);
                else handleDeleteCategory(confirmDelete);
              }}
                className="flex-1 py-2 rounded-md bg-destructive text-white text-sm font-medium hover:bg-destructive/90 transition-colors">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const activeLabel =
    navigation.flatMap((g) => g.items).find((i) => i.id === active)?.label ?? "Dashboard";

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar */}
      <aside
        className={`flex flex-col flex-shrink-0 border-r border-border transition-all duration-300 overflow-hidden ${sidebarOpen ? "w-60" : "w-0 lg:w-16"}`}
        style={{ background: "var(--sidebar)" }}
      >
        <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border min-w-max">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center flex-shrink-0">
            <Shield size={16} className="text-primary-foreground" />
          </div>
          {sidebarOpen && (
            <div className="flex flex-col leading-none">
              <span className="text-foreground font-bold tracking-tight" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1rem" }}>
                SPORTING FC
              </span>
              <span className="text-muted-foreground text-xs font-mono">Administração</span>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-3 scrollbar-hide">
          {navigation.map((group) => (
            <div key={group.group} className="mb-1">
              {sidebarOpen && (
                <p className="px-4 pt-4 pb-1.5 text-[10px] font-mono font-medium uppercase tracking-widest text-muted-foreground/60 select-none">
                  {group.group}
                </p>
              )}
              {!sidebarOpen && <div className="pt-4 pb-1 mx-2 border-t border-sidebar-border/40" />}
              {group.items.map((item) => {
                const isActive = active === item.id;
                return (
                  <button key={item.id} onClick={() => setActive(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors duration-150 relative group ${isActive ? "text-primary" : "text-sidebar-foreground hover:text-foreground"}`}>
                    {isActive && <span className="absolute left-0 top-1 bottom-1 w-0.5 rounded-r-full bg-primary" />}
                    <span className={`flex-shrink-0 transition-colors ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
                      {item.icon}
                    </span>
                    {sidebarOpen && <span className="font-medium text-sm leading-none">{item.label}</span>}
                    {isActive && sidebarOpen && <ChevronRight size={12} className="ml-auto text-primary/60" />}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <UserCircle size={14} className="text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">Admin Geral</p>
                <p className="text-xs text-muted-foreground truncate font-mono">admin@sportingfc.pt</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <header className="flex items-center gap-4 px-6 py-4 border-b border-border bg-background/80 backdrop-blur-sm flex-shrink-0">
          <button onClick={() => setSidebarOpen((v) => !v)} className="text-muted-foreground hover:text-foreground transition-colors">
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="flex-1 flex items-center gap-2 max-w-xs">
            <div className="flex items-center gap-2 bg-secondary rounded-md px-3 py-1.5 w-full">
              <Search size={14} className="text-muted-foreground flex-shrink-0" />
              <input type="text" placeholder="Pesquisar..."
                className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full font-mono" />
            </div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
            </button>
            <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center">
              <UserCircle size={15} className="text-primary-foreground" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          {active === "dashboard" && <DashboardView />}
          {active === "jogos" && <JogosView />}
          {active === "artigos" && <ArticlesView />}
          {active !== "dashboard" && active !== "jogos" && active !== "artigos" && <PlaceholderView label={activeLabel} />}
        </main>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

function DashboardView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground font-bold leading-none mb-1"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.75rem" }}>
            DASHBOARD
          </h1>
          <p className="text-muted-foreground text-sm font-mono">Quarta-feira, 30 de Julho de 2026</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
          <Activity size={14} /> Relatório Semanal
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Sócios" value="2.512" delta="+5.1%" positive icon={<Users size={15} />} />
        <StatCard label="Atletas" value="187" delta="+3" positive icon={<UserCircle size={15} />} />
        <StatCard label="Jogos (época)" value="38" delta="+2" positive icon={<Trophy size={15} />} />
        <StatCard label="Artigos publicados" value="124" delta="-4%" positive={false} icon={<Newspaper size={15} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground">Crescimento de Sócios</p>
              <p className="text-foreground font-bold mt-0.5" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.25rem" }}>Jan — Jul 2026</p>
            </div>
            <span className="flex items-center gap-1 text-primary text-xs font-mono font-medium"><TrendingUp size={13} /> +38%</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={memberGrowth} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fill: "#6b7694", fontSize: 11, fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7694", fontSize: 11, fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", color: "#e8eaf0", fontSize: 12, fontFamily: "DM Mono" }} cursor={{ stroke: "rgba(255,255,255,0.1)" }} />
              <Area isAnimationActive={false} type="monotone" dataKey="socios" name="Sócios" stroke="#22c55e" strokeWidth={2} fill="url(#greenGrad)" dot={false} activeDot={{ r: 4, fill: "#22c55e" }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <div className="mb-5">
            <p className="text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground">Golos por Jogo</p>
            <p className="text-foreground font-bold mt-0.5" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.25rem" }}>Últimos 5 Jogos</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={matchResults} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="match" tick={{ fill: "#6b7694", fontSize: 10, fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7694", fontSize: 11, fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", color: "#e8eaf0", fontSize: 12, fontFamily: "DM Mono" }} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
              <Bar isAnimationActive={false} dataKey="goalsFor" name="Marcados" fill="#22c55e" radius={[3, 3, 0, 0]} />
              <Bar isAnimationActive={false} dataKey="goalsAgainst" name="Sofridos" fill="#1e2736" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground">Últimos Resultados</p>
            <button className="text-xs text-primary font-mono hover:underline">Ver todos</button>
          </div>
          <div className="space-y-1">
            {recentMatches.map((m, i) => {
              const won = m.home === "Clube" ? m.homeScore > m.awayScore : m.awayScore > m.homeScore;
              const drew = m.homeScore === m.awayScore;
              const badge = drew ? "E" : won ? "V" : "D";
              const badgeColor = drew ? "bg-secondary text-muted-foreground" : won ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive";
              return (
                <div key={i} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
                  <span className={`w-5 h-5 rounded flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 ${badgeColor}`}>{badge}</span>
                  <div className="flex-1 flex items-center justify-center gap-2 text-sm">
                    <span className={m.home === "Clube" ? "text-foreground font-medium" : "text-muted-foreground"}>{m.home}</span>
                    <span className="font-mono font-bold text-foreground tabular-nums">{m.homeScore} — {m.awayScore}</span>
                    <span className={m.away === "Clube" ? "text-foreground font-medium" : "text-muted-foreground"}>{m.away}</span>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-muted-foreground font-mono">{m.date}</p>
                    <p className="text-xs text-muted-foreground/60 font-mono">{m.comp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground">Artigos Recentes</p>
            <button className="text-xs text-primary font-mono hover:underline">Ver todos</button>
          </div>
          <div className="space-y-1">
            {recentArticles.map((a, i) => (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
                <div className="w-7 h-7 rounded bg-secondary flex items-center justify-center flex-shrink-0 text-muted-foreground">
                  <Newspaper size={13} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground font-medium truncate">{a.title}</p>
                  <p className="text-xs text-muted-foreground font-mono">{a.date}</p>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground text-xs font-mono flex-shrink-0">
                  <Activity size={11} />
                  {a.views.toLocaleString("pt-PT")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-5">
        <p className="text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground mb-4">Acesso Rápido</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {[
            { icon: <Trophy size={16} />, label: "Jogos" },
            { icon: <Newspaper size={16} />, label: "Artigos" },
            { icon: <Shield size={16} />, label: "Equipas" },
            { icon: <UserCircle size={16} />, label: "Atletas" },
            { icon: <Image size={16} />, label: "Fotos" },
            { icon: <Video size={16} />, label: "Vídeos" },
            { icon: <CreditCard size={16} />, label: "Sócios" },
            { icon: <Handshake size={16} />, label: "Patrocínios" },
          ].map((q) => (
            <button key={q.label} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors group">
              <span className="text-muted-foreground group-hover:text-primary transition-colors">{q.icon}</span>
              <span className="text-xs text-muted-foreground font-mono group-hover:text-foreground transition-colors">{q.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-5">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={14} className="text-muted-foreground" />
          <p className="text-xs font-mono font-medium uppercase tracking-widest text-muted-foreground">Próximos Jogos</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { comp: "Liga Portugal", home: "Clube", away: "Gil Vicente", date: "3 Ago", time: "21:00" },
            { comp: "Taça de Portugal", home: "Clube", away: "Académica", date: "10 Ago", time: "18:00" },
            { comp: "Liga Portugal", home: "Arouca", away: "Clube", date: "17 Ago", time: "20:15" },
          ].map((g, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-secondary rounded-lg">
              <div className="text-center flex-shrink-0">
                <p className="text-foreground font-bold leading-none" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.1rem" }}>{g.date}</p>
                <p className="text-muted-foreground text-xs font-mono">{g.time}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-foreground text-sm font-medium truncate">{g.home} <span className="text-muted-foreground font-normal">vs</span> {g.away}</p>
                <p className="text-muted-foreground text-xs font-mono">{g.comp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Placeholder ──────────────────────────────────────────────────────────────

function PlaceholderView({ label }: { label: string }) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-foreground font-bold leading-none mb-1"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.75rem" }}>
          {label.toUpperCase()}
        </h1>
        <p className="text-muted-foreground text-sm font-mono">Secção em desenvolvimento</p>
      </div>
      <div className="flex-1 flex items-center justify-center border border-dashed border-border rounded-lg">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-3">
            <Layers size={20} className="text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-sm font-mono">Conteúdo disponível em breve</p>
        </div>
      </div>
    </div>
  );
}
