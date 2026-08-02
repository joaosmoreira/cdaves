import { useState } from "react";
import { Plus, MapPin, Calendar, Clock, Trophy, X, Save } from "lucide-react";
import { toast } from "sonner";
import logoCd from "@/assets/logo-cd.png";
import { updateRow, addRow, useAdmin, Row } from "@/admin/store";
import { AdminJogosHistoryTable } from "./AdminJogosHistoryTable";
import { GameRecord } from "./types";
import { formatDateDDMMYYYY } from "@/lib/formatters";

function formatDateForDisplay(dateStr: string): string {
  return formatDateDDMMYYYY(dateStr);
}

export function AdminJogosView() {
  const jogos = useAdmin((s) => s.jogos);

  // Encontrar o Próximo Jogo e o Último Jogo no store
  const nextGameRow = jogos.find((j) => String(j.tipo ?? "").startsWith("Próximo"));
  const lastGameRow = jogos.find((j) => String(j.tipo ?? "").startsWith("Último"));

  // Encontrar todos os jogos históricos / anteriores
  const historyRows = jogos.filter((j) => String(j.tipo ?? "").startsWith("Histórico"));

  // Form Inline State (sem modais!)
  const [showInlineForm, setShowInlineForm] = useState(false);

  // Form Inputs
  const [lastHomeScore, setLastHomeScore] = useState("2");
  const [lastAwayScore, setLastAwayScore] = useState("1");

  const [newOpponent, setNewOpponent] = useState("SC Marítimo do Vale");
  const [newIsHome, setNewIsHome] = useState(true);
  const [newDate, setNewDate] = useState("09 Ago 2026");
  const [newTime, setNewTime] = useState("20:30");
  const [newStadium, setNewStadium] = useState("Estádio Municipal do CD Aves");
  const [newCompetition, setNewCompetition] = useState("Liga Portugal");

  function handleHomeToggle(isHome: boolean) {
    setNewIsHome(isHome);
    if (isHome) {
      setNewStadium("Estádio Municipal do CD Aves");
    } else {
      setNewStadium("Estádio do Adversário");
    }
  }

  function handleSaveAll(e: React.FormEvent) {
    e.preventDefault();

    if (!newOpponent.trim()) {
      toast.error("Por favor insira o nome do adversário para o próximo jogo.");
      return;
    }

    const finalHomeScore = parseInt(lastHomeScore) || 0;
    const finalAwayScore = parseInt(lastAwayScore) || 0;

    // 1. O jogo que era o "Último jogo" transita para o "Histórico"
    if (lastGameRow) {
      updateRow("jogos", String(lastGameRow.id), {
        tipo: "Histórico",
      });
    }

    // 2. O jogo que era o "Próximo jogo" passa a ser o "Último jogo" finalizado
    if (nextGameRow) {
      updateRow("jogos", String(nextGameRow.id), {
        tipo: "Último jogo",
        resultado: `${finalHomeScore} — ${finalAwayScore}`,
        resultado_guardado_em: Date.now(),
      });
    }

    // 3. O novo jogo inserido passa a ser o "Próximo jogo"
    const nextPayload = {
      tipo: "Próximo jogo",
      adversario: newOpponent.trim(),
      local: newIsHome ? "Casa" : "Fora",
      data: formatDateForDisplay(newDate),
      hora: newTime,
      estadio: newStadium,
      competicao: newCompetition,
      resultado: "",
    };

    addRow("jogos", nextPayload);

    setShowInlineForm(false);
    toast.success("Resultado guardado, histórico atualizado e novo jogo agendado!");
  }

  // Dados para exibição nos cartões
  const displayNext = {
    opponent: String(nextGameRow?.adversario ?? "SC Marítimo do Vale"),
    isHome: String(nextGameRow?.local ?? "Casa") === "Casa",
    date: String(nextGameRow?.data ?? "09 Ago 2026"),
    time: String(nextGameRow?.hora ?? "20:30"),
    stadium: String(nextGameRow?.estadio ?? "Estádio Municipal do CD Aves"),
    competition: String(nextGameRow?.competicao ?? "Liga Portugal"),
    score: String(nextGameRow?.resultado ?? "-"),
  };

  const displayLast = {
    opponent: String(lastGameRow?.adversario ?? "SC Braga"),
    isHome: String(lastGameRow?.local ?? "Casa") === "Casa",
    date: String(lastGameRow?.data ?? "28 Jul 2026"),
    time: String(lastGameRow?.hora ?? "21:00"),
    stadium: String(lastGameRow?.estadio ?? "Estádio Municipal do CD Aves"),
    competition: String(lastGameRow?.competicao ?? "Liga Portugal"),
    score: String(lastGameRow?.resultado ?? "3 — 1"),
  };

  // Mapear rows do histórico para o formato da tabela AdminJogosHistoryTable
  const historyGames: GameRecord[] = historyRows.map((r, i) => {
    const rawRes = String(r.resultado ?? "0 — 0");
    const parts = rawRes.split("—").map((s) => parseInt(s.trim()));
    const isHome = String(r.local ?? "Casa") === "Casa";
    const homeScore = !isNaN(parts[0]) ? parts[0] : 0;
    const awayScore = !isNaN(parts[1]) ? parts[1] : 0;

    return {
      id: String(r.id ?? i),
      opponent: String(r.adversario ?? "Adversário"),
      date: String(r.data ?? ""),
      time: String(r.hora ?? ""),
      stadium: String(r.estadio ?? ""),
      competition: String(r.competicao ?? "Liga Portugal"),
      homeScore: homeScore,
      awayScore: awayScore,
      isHome: isHome,
    };
  });

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground font-display text-2xl uppercase tracking-tight">JOGOS E RESULTADOS</h1>
          <p className="text-muted-foreground text-xs font-mono">Gestão de jogos e resultados oficiais do CD Aves</p>
        </div>
        {!showInlineForm && (
          <button
            onClick={() => setShowInlineForm(true)}
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            <Plus size={14} /> Atualizar Próximo Jogo / Resultado
          </button>
        )}
      </div>

      {/* Cartões dos Jogos Atuais (Último e Próximo) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cartão Último Jogo */}
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between gap-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono uppercase tracking-widest text-primary font-bold">Último Jogo</p>
            <span className="bg-secondary text-foreground px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold">
              {displayLast.competition}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 py-2">
            <div className="flex-1 flex flex-col items-center text-center gap-2">
              {displayLast.isHome ? (
                <img src={logoCd} alt="CD Aves" className="h-14 w-14 object-contain" />
              ) : (
                <div className="h-14 w-14 rounded-full border border-border bg-secondary flex items-center justify-center font-display text-lg font-bold text-foreground">
                  {displayLast.opponent.substring(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <span className="text-[10px] font-mono uppercase text-muted-foreground block">
                  {displayLast.isHome ? "Casa" : "Fora"}
                </span>
                <p className="text-foreground font-bold text-sm font-sans">{displayLast.isHome ? "CD Aves" : displayLast.opponent}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center px-2">
              <span className="text-foreground font-bold font-display text-3xl tracking-tight">
                {displayLast.score}
              </span>
            </div>

            <div className="flex-1 flex flex-col items-center text-center gap-2">
              {!displayLast.isHome ? (
                <img src={logoCd} alt="CD Aves" className="h-14 w-14 object-contain" />
              ) : (
                <div className="h-14 w-14 rounded-full border border-border bg-secondary flex items-center justify-center font-display text-lg font-bold text-foreground">
                  {displayLast.opponent.substring(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <span className="text-[10px] font-mono uppercase text-muted-foreground block">
                  {!displayLast.isHome ? "Casa" : "Fora"}
                </span>
                <p className="text-foreground font-bold text-sm font-sans">{!displayLast.isHome ? "CD Aves" : displayLast.opponent}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border text-xs font-mono">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar size={13} />
              <span className="text-foreground">{displayLast.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock size={13} />
              <span className="text-foreground">{displayLast.time || "21:00"}</span>
            </div>
            <div className="col-span-2 flex items-center gap-1.5 text-muted-foreground truncate">
              <MapPin size={13} className="shrink-0" />
              <span className="text-foreground truncate">{displayLast.stadium}</span>
            </div>
          </div>
        </div>

        {/* Cartão Próximo Jogo */}
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between gap-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono uppercase tracking-widest text-primary font-bold">Próximo Jogo</p>
            <span className="bg-secondary text-foreground px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold">
              {displayNext.competition}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 py-2">
            <div className="flex-1 flex flex-col items-center text-center gap-2">
              {displayNext.isHome ? (
                <img src={logoCd} alt="CD Aves" className="h-14 w-14 object-contain" />
              ) : (
                <div className="h-14 w-14 rounded-full border border-border bg-secondary flex items-center justify-center font-display text-lg font-bold text-foreground">
                  {displayNext.opponent.substring(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <span className="text-[10px] font-mono uppercase text-muted-foreground block">
                  {displayNext.isHome ? "Casa" : "Fora"}
                </span>
                <p className="text-foreground font-bold text-sm font-sans">{displayNext.isHome ? "CD Aves" : displayNext.opponent}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center px-2">
              <span className="text-muted-foreground font-bold text-xl font-display uppercase tracking-widest">VS</span>
            </div>

            <div className="flex-1 flex flex-col items-center text-center gap-2">
              {!displayNext.isHome ? (
                <img src={logoCd} alt="CD Aves" className="h-14 w-14 object-contain" />
              ) : (
                <div className="h-14 w-14 rounded-full border border-border bg-secondary flex items-center justify-center font-display text-lg font-bold text-foreground">
                  {displayNext.opponent.substring(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <span className="text-[10px] font-mono uppercase text-muted-foreground block">
                  {!displayNext.isHome ? "Casa" : "Fora"}
                </span>
                <p className="text-foreground font-bold text-sm font-sans">{!displayNext.isHome ? "CD Aves" : displayNext.opponent}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border text-xs font-mono">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar size={13} />
              <span className="text-foreground">{displayNext.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock size={13} />
              <span className="text-foreground">{displayNext.time}</span>
            </div>
            <div className="col-span-2 flex items-center gap-1.5 text-muted-foreground truncate">
              <MapPin size={13} className="shrink-0" />
              <span className="text-foreground truncate">{displayNext.stadium}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário In-Page de Edição do Jogo */}
      {showInlineForm && (
        <form onSubmit={handleSaveAll} className="bg-card border-2 border-primary/40 rounded-xl p-6 shadow-md space-y-6 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h2 className="text-foreground font-display text-lg uppercase tracking-tight flex items-center gap-2">
                <Trophy size={18} className="text-primary" /> Editar Próximo Jogo & Resultado
              </h2>
              <p className="text-muted-foreground text-xs font-mono mt-0.5">
                Os dados inseridos aqui atualizam a MatchStrip do site e arquivam o jogo anterior no Histórico.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowInlineForm(false)}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Lado Esquerdo: Novo Jogo Agendado */}
            <div className="space-y-4 border-b md:border-b-0 md:border-r border-border pb-6 md:pb-0 md:pr-6">
              <h3 className="text-xs font-mono uppercase tracking-wider text-primary font-bold flex items-center gap-2">
                <Calendar size={14} /> Dados do Próximo Jogo
              </h3>

              <div className="space-y-1">
                <label className="text-xs font-mono text-muted-foreground">Nome do Adversário *</label>
                <input
                  type="text"
                  required
                  value={newOpponent}
                  onChange={(e) => setNewOpponent(e.target.value)}
                  placeholder="Ex: SC Marítimo do Vale, Vitória SC"
                  className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-xs font-sans text-foreground focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-muted-foreground">Local do Jogo</label>
                  <div className="flex rounded-md overflow-hidden border border-border">
                    <button
                      type="button"
                      onClick={() => handleHomeToggle(true)}
                      className={`flex-1 py-1.5 text-xs font-mono font-bold transition-colors ${
                        newIsHome ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      Em Casa
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHomeToggle(false)}
                      className={`flex-1 py-1.5 text-xs font-mono font-bold transition-colors ${
                        !newIsHome ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      Fora
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-muted-foreground">Competição</label>
                  <input
                    type="text"
                    value={newCompetition}
                    onChange={(e) => setNewCompetition(e.target.value)}
                    className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-xs font-sans text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-muted-foreground">Data do Jogo (Calendário) *</label>
                  <input
                    type="date"
                    required
                    value={newDate.includes("-") ? newDate : "2026-08-09"}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-muted-foreground">Hora de Início</label>
                  <input
                    type="time"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-xs font-mono text-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-muted-foreground">Estádio / Recinto</label>
                <input
                  type="text"
                  value={newStadium}
                  onChange={(e) => setNewStadium(e.target.value)}
                  className="w-full bg-secondary/50 border border-border rounded-md px-3 py-2 text-xs font-sans text-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            {/* Lado Direito: Resultado do Jogo Anterior */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-primary font-bold flex items-center gap-2">
                  <Trophy size={14} /> Resultado do Jogo Anterior
                </h3>
                <p className="text-xs text-muted-foreground">
                  Regista os golos marcados. O jogo transita automaticamente para a tabela de Histórico da Época.
                </p>

                <div className="grid grid-cols-2 gap-4 bg-secondary/30 p-4 rounded-lg border border-border">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-foreground font-semibold block">
                      Golos CD Aves
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={lastHomeScore}
                      onChange={(e) => setLastHomeScore(e.target.value)}
                      className="w-full bg-card border border-border rounded-md px-3 py-2 text-base font-bold font-mono text-center text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-foreground font-semibold block">
                      Golos Adversário
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={lastAwayScore}
                      onChange={(e) => setLastAwayScore(e.target.value)}
                      className="w-full bg-card border border-border rounded-md px-3 py-2 text-base font-bold font-mono text-center text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowInlineForm(false)}
                  className="px-4 py-2 rounded-md border border-border text-muted-foreground text-xs font-semibold hover:bg-secondary transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 rounded-md bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors shadow-sm"
                >
                  <Save size={14} /> Guardar & Publicar no Site
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Tabela do Histórico de Jogos Anteriores */}
      <AdminJogosHistoryTable games={historyGames} />
    </div>
  );
}
