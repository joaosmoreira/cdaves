import { GameRecord } from "./types";
import { Trophy } from "lucide-react";

type TableProps = {
  games: GameRecord[];
};

export function AdminJogosHistoryTable({ games }: TableProps) {
  return (
    <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden space-y-4 p-6 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg uppercase text-foreground">JOGOS ANTERIORES — ÉPOCA 2025/26</h3>
          <p className="text-muted-foreground text-xs font-mono">Registo de encontros e resultados da época atual</p>
        </div>
        <span className="flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold font-mono">
          <Trophy size={13} /> Época 2025/26
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-secondary/60 border-b border-border text-primary font-bold uppercase text-[11px]">
            <tr>
              <th className="p-3">Competição</th>
              <th className="p-3">Data</th>
              <th className="p-3">Jogo (Casa vs Fora)</th>
              <th className="p-3 text-center">Local</th>
              <th className="p-3 text-center">Resultado</th>
              <th className="p-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {games.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-muted-foreground italic">
                  Nenhum jogo anterior registado para a época atual.
                </td>
              </tr>
            ) : (
              games.map((g) => {
                const homeTeam = g.isHome ? "CD Aves" : g.opponent;
                const awayTeam = g.isHome ? g.opponent : "CD Aves";
                const isWinner = g.isHome
                  ? (g.homeScore ?? 0) > (g.awayScore ?? 0)
                  : (g.awayScore ?? 0) > (g.homeScore ?? 0);
                const isDraw = (g.homeScore ?? 0) === (g.awayScore ?? 0);

                const badge = isDraw ? "E" : isWinner ? "V" : "D";
                const badgeCls = isWinner
                  ? "bg-emerald-500/15 text-emerald-600 font-bold"
                  : isDraw
                  ? "bg-amber-500/15 text-amber-600 font-bold"
                  : "bg-red-500/15 text-red-600 font-bold";

                return (
                  <tr key={g.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-semibold text-foreground">{g.competition}</td>
                    <td className="p-3 text-muted-foreground">{g.date}</td>
                    <td className="p-3 font-sans font-medium text-slate-900">
                      <span className={homeTeam === "CD Aves" ? "font-bold text-primary" : ""}>{homeTeam}</span>
                      <span className="text-muted-foreground mx-1.5">vs</span>
                      <span className={awayTeam === "CD Aves" ? "font-bold text-primary" : ""}>{awayTeam}</span>
                    </td>
                    <td className="p-3 text-center">
                      <span className="bg-secondary px-2 py-0.5 rounded text-[11px]">
                        {g.isHome ? "Casa" : "Fora"}
                      </span>
                    </td>
                    <td className="p-3 text-center font-bold font-display text-sm text-foreground">
                      {g.homeScore !== null && g.awayScore !== null ? `${g.homeScore} — ${g.awayScore}` : "-"}
                    </td>
                    <td className="p-3 text-right">
                      <span className={`inline-flex w-6 h-6 items-center justify-center rounded text-xs font-bold ${badgeCls}`}>
                        {badge}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
