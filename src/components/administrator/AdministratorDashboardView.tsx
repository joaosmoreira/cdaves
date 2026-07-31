import { useState, useEffect } from "react";
import { Users, Newspaper, Trophy, TrendingUp, Calendar } from "lucide-react";
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

const MEMBER_GROWTH = [
  { month: "Jan", socios: 1820 },
  { month: "Fev", socios: 1934 },
  { month: "Mar", socios: 2010 },
  { month: "Abr", socios: 2145 },
  { month: "Mai", socios: 2280 },
  { month: "Jun", socios: 2390 },
  { month: "Jul", socios: 2512 },
];

const MATCH_STATS = [
  { match: "J01", marcados: 3, sofridos: 1 },
  { match: "J02", marcados: 1, sofridos: 0 },
  { match: "J03", marcados: 2, sofridos: 2 },
  { match: "J04", marcados: 4, sofridos: 0 },
  { match: "J05", marcados: 2, sofridos: 1 },
];

type Props = {
  onNavigateTab: (tabId: string) => void;
};

export function AdministratorDashboardView({ onNavigateTab }: Props) {
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
        <p className="mt-1 text-sm text-muted-foreground">
          Resumo de desempenho, crescimento de sócios e conteúdos ativos no sistema.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sócios Ativos</span>
            <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary">
              <Users size={18} />
            </div>
          </div>
          <p className="mt-3 font-display text-3xl text-foreground">2.512</p>
          <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <TrendingUp size={14} />
            <span>+12.4% este mês</span>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Notícias Publicadas</span>
            <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary">
              <Newspaper size={18} />
            </div>
          </div>
          <p className="mt-3 font-display text-3xl text-foreground">{noticias.length}</p>
          <p className="mt-2 text-xs text-muted-foreground">Artigos ativos</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Atletas Inscritos</span>
            <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary">
              <Trophy size={18} />
            </div>
          </div>
          <p className="mt-3 font-display text-3xl text-foreground">{jogadores.length}</p>
          <p className="mt-2 text-xs text-muted-foreground">Equipa A & Formação</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Jogos Registados</span>
            <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary">
              <Calendar size={18} />
            </div>
          </div>
          <p className="mt-3 font-display text-3xl text-foreground">{jogos.length}</p>
          <p className="mt-2 text-xs text-muted-foreground">Época 2025/26</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-display text-lg uppercase text-foreground">Evolução de Sócios</h3>
          <p className="text-xs text-muted-foreground">Crescimento total no ano civil em curso.</p>
          <div className="mt-6 h-64 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MEMBER_GROWTH}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="month" stroke="currentColor" className="text-xs text-muted-foreground" />
                  <YAxis stroke="currentColor" className="text-xs text-muted-foreground" />
                  <Tooltip />
                  <Area type="monotone" dataKey="socios" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.2} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full animate-pulse rounded bg-muted/20" />
            )}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-display text-lg uppercase text-foreground">Golos na Época</h3>
          <p className="text-xs text-muted-foreground">Golos marcados vs sofridos nos últimos encontros.</p>
          <div className="mt-6 h-64 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MATCH_STATS}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="match" stroke="currentColor" className="text-xs text-muted-foreground" />
                  <YAxis stroke="currentColor" className="text-xs text-muted-foreground" />
                  <Tooltip />
                  <Bar dataKey="marcados" fill="var(--color-primary)" name="Marcados" />
                  <Bar dataKey="sofridos" fill="var(--color-muted-foreground)" name="Sofridos" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full animate-pulse rounded bg-muted/20" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
