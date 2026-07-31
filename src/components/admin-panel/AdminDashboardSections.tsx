import {
  Trophy,
  Newspaper,
  Shield,
  UserCircle,
  Image,
  Video,
  CreditCard,
  Handshake,
  Calendar,
  Activity,
} from "lucide-react";

type SectionsProps = {
  onNavigateTab: (tabId: string) => void;
};

const RECENT_MATCHES = [
  { home: "CD Aves", homeScore: 3, away: "SC Braga", awayScore: 1, date: "27 Jul", comp: "Liga Portugal", result: "V" },
  { home: "FC Porto", homeScore: 2, away: "CD Aves", awayScore: 1, date: "20 Jul", comp: "Liga Portugal", result: "D" },
  { home: "CD Aves", homeScore: 2, away: "Benfica", awayScore: 2, date: "13 Jul", comp: "Taça de Portugal", result: "E" },
  { home: "Sporting", homeScore: 0, away: "CD Aves", awayScore: 4, date: "6 Jul", comp: "Liga Portugal", result: "V" },
];

const RECENT_ARTICLES = [
  { title: "Pré-época 2025/26: Plantel apresentado", views: "4.820", date: "28 Jul 2026" },
  { title: "Renovação de contrato: João Ferreira assina por 3 anos", views: "3.210", date: "25 Jul 2026" },
  { title: "Academia: 12 jovens promovidos ao plantel B", views: "1.980", date: "22 Jul 2026" },
  { title: "Patrocínio histórico com NovoBanco confirmado", views: "2.740", date: "18 Jul 2026" },
];

const UPCOMING_MATCHES = [
  { comp: "Liga Portugal", home: "CD Aves", away: "Gil Vicente", date: "3 Ago", time: "21:00" },
  { comp: "Taça de Portugal", home: "CD Aves", away: "Académica", date: "10 Ago", time: "18:00" },
  { comp: "Liga Portugal", home: "Arouca", away: "CD Aves", date: "17 Ago", time: "20:15" },
];

export function AdminQuickAccess({ onNavigateTab }: SectionsProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
      <p className="text-xs font-mono font-bold uppercase tracking-widest text-primary">Acesso Rápido</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 font-mono text-xs">
        {[
          { icon: <Trophy size={16} />, label: "Jogos", id: "jogos" },
          { icon: <Newspaper size={16} />, label: "Artigos", id: "artigos" },
          { icon: <Shield size={16} />, label: "Equipas", id: "futebol-equipas" },
          { icon: <UserCircle size={16} />, label: "Atletas", id: "futebol-atletas" },
          { icon: <Image size={16} />, label: "Fotos", id: "fotos" },
          { icon: <Video size={16} />, label: "Vídeos", id: "videos" },
          { icon: <CreditCard size={16} />, label: "Sócios", id: "socios" },
          { icon: <Handshake size={16} />, label: "Patrocínios", id: "patrocinios" },
        ].map((q) => (
          <button
            key={q.label}
            onClick={() => onNavigateTab(q.id)}
            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-secondary hover:bg-primary/10 hover:text-primary transition-colors border border-border"
          >
            <span>{q.icon}</span>
            <span className="font-semibold">{q.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function AdminRecentAndUpcoming({ onNavigateTab }: SectionsProps) {
  return (
    <div className="space-y-6">
      {/* Últimos Resultados e Artigos Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-primary">Últimos Resultados</p>
            <button onClick={() => onNavigateTab("jogos")} className="text-xs text-primary font-mono font-bold hover:underline">Ver todos</button>
          </div>
          <div className="divide-y divide-border text-xs font-mono">
            {RECENT_MATCHES.map((m, i) => (
              <div key={i} className="py-2.5 flex items-center justify-between">
                <span className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[11px] ${m.result === "V" ? "bg-primary/10 text-primary" : m.result === "E" ? "bg-slate-100 text-slate-700" : "bg-destructive/10 text-destructive"}`}>
                  {m.result}
                </span>
                <div className="flex-1 text-center font-bold text-foreground">
                  {m.home} {m.homeScore} — {m.awayScore} {m.away}
                </div>
                <div className="text-right text-muted-foreground">
                  <p>{m.date}</p>
                  <p className="text-[10px]">{m.comp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-primary">Artigos Recentes</p>
            <button onClick={() => onNavigateTab("artigos")} className="text-xs text-primary font-mono font-bold hover:underline">Ver todos</button>
          </div>
          <div className="divide-y divide-border text-xs font-mono">
            {RECENT_ARTICLES.map((a, i) => (
              <div key={i} className="py-2.5 flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-sans font-semibold truncate">{a.title}</p>
                  <p className="text-muted-foreground text-[10px]">{a.date}</p>
                </div>
                <div className="text-muted-foreground text-[11px] flex items-center gap-1">
                  <Activity size={12} /> {a.views}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Próximos Jogos */}
      <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Calendar size={15} className="text-primary" />
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-primary">Próximos Jogos</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          {UPCOMING_MATCHES.map((g, i) => (
            <div key={i} className="flex items-center gap-4 p-3.5 bg-secondary border border-border rounded-lg">
              <div className="text-center font-bold text-foreground">
                <p className="font-display text-base leading-none text-primary">{g.date}</p>
                <p className="text-[10px] text-muted-foreground">{g.time}</p>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground truncate">{g.home} vs {g.away}</p>
                <p className="text-muted-foreground text-[10px]">{g.comp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
