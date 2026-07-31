import { useState, useEffect } from "react";
import { Users, Newspaper, Trophy, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react";
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
import { useAdmin } from "@/admin/store";
import { AdminQuickAccess, AdminRecentAndUpcoming } from "./AdminDashboardSections";

const MEMBER_GROWTH = [
  { month: "Jan", socios: 1820 },
  { month: "Fev", socios: 1934 },
  { month: "Mar", socios: 2010 },
  { month: "Abr", socios: 2145 },
  { month: "Mai", socios: 2280 },
  { month: "Jun", socios: 2390 },
  { month: "Jul", socios: 2512 },
];

const MATCH_RESULTS = [
  { match: "SC Braga", marcados: 3, sofridos: 1 },
  { match: "FC Porto", marcados: 1, sofridos: 2 },
  { match: "Benfica", marcados: 2, sofridos: 2 },
  { match: "Sporting", marcados: 4, sofridos: 0 },
  { match: "Vitória SC", marcados: 2, sofridos: 1 },
];

function StatCard({ label, value, delta, positive, icon }: {
  label: string; value: string; delta: string; positive: boolean; icon: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-xs font-mono font-medium uppercase tracking-widest">{label}</span>
        <span className="text-primary">{icon}</span>
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="text-foreground text-3xl font-bold font-display leading-none">{value}</span>
        <span className={`flex items-center gap-0.5 text-xs font-mono font-medium mb-0.5 ${positive ? "text-emerald-600" : "text-destructive"}`}>
          {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
          {delta}
        </span>
      </div>
    </div>
  );
}

type DashboardProps = {
  onNavigateTab?: (tabId: string) => void;
};

export function AdminDashboardView({ onNavigateTab = () => {} }: DashboardProps) {
  const [mounted, setMounted] = useState(false);
  const noticias = useAdmin((s) => s.noticias ?? []);
  const jogos = useAdmin((s) => s.jogos ?? []);
  const jogadores = useAdmin((s) => s.jogadores ?? []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl uppercase tracking-tight text-foreground">
          Visão Geral do Clube
        </h2>
        <p className="mt-1 text-xs font-mono text-muted-foreground">
          Estatísticas, acesso rápido e indicadores em tempo real do CD Aves.
        </p>
      </div>

      {/* 1. Stat Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Sócios Ativos" value="2.512" delta="+12.4%" positive icon={<Users size={18} />} />
        <StatCard label="Artigos Notícias" value={String(noticias.length)} delta="+4 este mês" positive icon={<Newspaper size={18} />} />
        <StatCard label="Atletas Registados" value={String(jogadores.length)} delta="+3 inscritos" positive icon={<Trophy size={18} />} />
        <StatCard label="Jogos da Época" value={String(jogos.length)} delta="Época 2025/26" positive icon={<Calendar size={18} />} />
      </div>

      {/* 2. Acessos Rápido (posicionado entre os cards e a evolução de sócios) */}
      <AdminQuickAccess onNavigateTab={onNavigateTab} />

      {/* 3. Gráficos de Evolução de Sócios e Golos */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="font-display text-lg uppercase text-foreground">Evolução de Sócios</h3>
          <p className="text-xs font-mono text-muted-foreground">Novas adesões no ano em curso.</p>
          <div className="mt-6 h-64 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MEMBER_GROWTH}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" stroke="#64748b" className="text-xs font-mono" />
                  <YAxis stroke="#64748b" className="text-xs font-mono" />
                  <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", color: "#0f172a" }} />
                  <Area type="monotone" dataKey="socios" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.15} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full animate-pulse rounded bg-muted/20" />
            )}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h3 className="font-display text-lg uppercase text-foreground">Golos nos Últimos Jogos</h3>
          <p className="text-xs font-mono text-muted-foreground">Golos marcados vs sofridos.</p>
          <div className="mt-6 h-64 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MATCH_RESULTS}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="match" stroke="#64748b" className="text-xs font-mono" />
                  <YAxis stroke="#64748b" className="text-xs font-mono" />
                  <Tooltip contentStyle={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", color: "#0f172a" }} />
                  <Bar dataKey="marcados" fill="var(--color-primary)" name="Marcados" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="sofridos" fill="#cbd5e1" name="Sofridos" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full animate-pulse rounded bg-muted/20" />
            )}
          </div>
        </div>
      </div>

      {/* 4. Últimos Resultados, Artigos Recentes e Próximos Jogos */}
      <AdminRecentAndUpcoming onNavigateTab={onNavigateTab} />
    </div>
  );
}
