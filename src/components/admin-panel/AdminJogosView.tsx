import { useState } from "react";
import { Plus, Check, Shield, MapPin, Calendar, Clock, Trophy, X, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import logoCd from "@/assets/logo-cd.png";
import { GameRecord } from "./types";
import { AdminJogosHistoryTable } from "./AdminJogosHistoryTable";
import { updateRow, useAdmin } from "@/admin/store";

const initialLastGame: GameRecord = {
  id: 0,
  opponent: "SC Braga",
  date: "2026-07-27",
  time: "21:00",
  stadium: "Estádio do Clube Desportivo das Aves",
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

const initialHistory: GameRecord[] = [
  { id: 10, opponent: "FC Porto", date: "2026-07-20", time: "18:00", stadium: "Estádio do Dragão", competition: "Liga Portugal", homeScore: 2, awayScore: 1, isHome: false },
  { id: 11, opponent: "Benfica", date: "2026-07-13", time: "20:45", stadium: "Estádio do Clube Desportivo das Aves", competition: "Taça de Portugal", homeScore: 2, awayScore: 2, isHome: true },
  { id: 12, opponent: "Sporting CP", date: "2026-07-06", time: "20:30", stadium: "Estádio José Alvalade", competition: "Liga Portugal", homeScore: 0, awayScore: 4, isHome: false },
];

function GameCard({ label, game, action }: { label: string; game: GameRecord; action?: React.ReactNode }) {
  const isHome = game.isHome;

  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between gap-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono uppercase tracking-widest text-primary font-bold">{label}</p>
        <span className="bg-secondary text-foreground px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold">
          {game.competition}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 py-2">
        {/* Lado Esquerdo (Equipa da Casa) */}
        <div className="flex-1 flex flex-col items-center text-center gap-2">
          {isHome ? (
            <img src={logoCd} alt="CD Aves" className="h-14 w-14 object-contain" />
          ) : (
            <div className="h-14 w-14 rounded-full border border-border bg-secondary flex items-center justify-center font-display text-lg font-bold text-foreground">
              {game.opponent.substring(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <span className="text-[10px] font-mono uppercase text-muted-foreground block">
              {isHome ? "Casa" : "Fora"}
            </span>
            <p className="text-foreground font-bold text-sm font-sans">{isHome ? "CD Aves" : game.opponent}</p>
          </div>
        </div>

        {/* Marcador ou VS */}
        <div className="flex flex-col items-center justify-center px-2">
          {game.homeScore !== null && game.awayScore !== null ? (
            <span className="text-foreground font-bold font-display text-3xl tracking-tight">
              {game.homeScore} — {game.awayScore}
            </span>
          ) : (
            <span className="text-muted-foreground font-bold text-xl font-display uppercase tracking-widest">VS</span>
          )}
        </div>

        {/* Lado Direito (Equipa Visitante) */}
        <div className="flex-1 flex flex-col items-center text-center gap-2">
          {!isHome ? (
            <img src={logoCd} alt="CD Aves" className="h-14 w-14 object-contain" />
          ) : (
            <div className="h-14 w-14 rounded-full border border-border bg-secondary flex items-center justify-center font-display text-lg font-bold text-foreground">
              {game.opponent.substring(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <span className="text-[10px] font-mono uppercase text-muted-foreground block">
              {!isHome ? "Fora" : "Fora"}
            </span>
            <p className="text-foreground font-bold text-sm font-sans">{!isHome ? "CD Aves" : game.opponent}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border text-xs font-mono">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar size={13} />
          <span className="text-foreground">{game.date}</span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={13} />
          <span className="text-foreground">{game.time}</span>
        </div>
        <div className="col-span-2 flex items-center gap-1.5 text-muted-foreground truncate">
          <MapPin size={13} className="shrink-0" />
          <span className="text-foreground truncate">{game.stadium}</span>
        </div>
      </div>

      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}

export function AdminJogosView() {
  const [lastGame, setLastGame] = useState<GameRecord>(initialLastGame);
  const [nextGame, setNextGame] = useState<GameRecord>(initialNextGame);
  const [history, setHistory] = useState<GameRecord[]>(initialHistory);

  // Form Inline State (sem modais!)
  const [showInlineForm, setShowInlineForm] = useState(false);

  // Form Inputs
  const [lastHomeScore, setLastHomeScore] = useState("0");
  const [lastAwayScore, setLastAwayScore] = useState("0");

  const [newOpponent, setNewOpponent] = useState("FC Porto");
  const [newIsHome, setNewIsHome] = useState(true);
  const [newDate, setNewDate] = useState("2026-08-10");
  const [newTime, setNewTime] = useState("20:30");
  const [newStadium, setNewStadium] = useState("Estádio do Clube Desportivo das Aves");
  const [newCompetition, setNewCompetition] = useState("Liga Portugal");

  function handleHomeToggle(isHome: boolean) {
    setNewIsHome(isHome);
    if (isHome) {
      setNewStadium("Estádio do Clube Desportivo das Aves");
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

    // 1. O jogo "nextGame" atual é finalizado com os golos inseridos e passa a "lastGame"
    const finishedGame: GameRecord = {
      ...nextGame,
      homeScore: finalHomeScore,
      awayScore: finalAwayScore,
    };

    // 2. O novo jogo agendado passa a ser o "nextGame"
    const newlyCreatedGame: GameRecord = {
      id: Date.now(),
      opponent: newOpponent.trim(),
      date: newDate,
      time: newTime,
      stadium: newStadium,
      competition: newCompetition,
      homeScore: null,
      awayScore: null,
      isHome: newIsHome,
    };

    // 3. Atualizar estado local
    setHistory((h) => [lastGame, ...h]);
    setLastGame(finishedGame);
    setNextGame(newlyCreatedGame);

    // 4. Atualizar o Store do Admin (que reflete instantaneamente em todo o site como na MatchStrip)
    updateRow("jogos", "r1", {
      tipo: "Próximo jogo",
      adversario: newlyCreatedGame.opponent,
      local: newlyCreatedGame.isHome ? "Casa" : "Fora",
      data: newlyCreatedGame.date,
      hora: newlyCreatedGame.time,
      estadio: newlyCreatedGame.stadium,
      competicao: newlyCreatedGame.competition,
      resultado: "",
    });

    updateRow("jogos", "r2", {
      tipo: "Último jogo",
      adversario: finishedGame.opponent,
      local: finishedGame.isHome ? "Casa" : "Fora",
      data: finishedGame.date,
      hora: finishedGame.time,
      estadio: finishedGame.stadium,
      competicao: finishedGame.competition,
      resultado: `${finalHomeScore} — ${finalAwayScore}`,
    });

    setShowInlineForm(false);
    toast.success("Resultado guardado e próximo jogo agendado com sucesso!");
  }

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
            <Plus size={14} /> Novo Jogo / Adicionar Resultado
          </button>
        )}
      </div>

      {/* Cartões dos Jogos Atuais (Último e Próximo) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GameCard label="Último Jogo Finalizado" game={lastGame} />
        <GameCard
          label="Próximo Jogo Agendado"
          game={nextGame}
          action={
            !showInlineForm ? (
              <button
                onClick={() => setShowInlineForm(true)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-primary/10 border border-primary/30 text-primary text-xs font-bold hover:bg-primary/20 transition-all"
              >
                <Plus size={14} /> Adicionar resultado e definir novo jogo
              </button>
            ) : undefined
          }
        />
      </div>

      {/* Formulário In-Page no MAIN (Sem Modais!) */}
      {showInlineForm && (
        <div className="bg-card border-2 border-primary/40 rounded-xl p-6 shadow-md space-y-6 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-primary block">
                ATUALIZAÇÃO DE JOGOS & RESULTADOS
              </span>
              <h2 className="font-display text-xl uppercase text-foreground">
                Registar Resultado & Agendar Próximo Encontro
              </h2>
            </div>
            <button
              onClick={() => setShowInlineForm(false)}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSaveAll} className="space-y-6">
            {/* ETAPA 1: Resultado Final do Jogo Próximo */}
            <div className="bg-secondary/40 border border-border rounded-lg p-4 space-y-3">
              <p className="text-xs font-mono font-bold uppercase text-foreground flex items-center gap-2">
                <Check size={14} className="text-emerald-500" />
                1. Registar Resultado do Jogo: <span className="text-primary">{nextGame.isHome ? `CD Aves vs ${nextGame.opponent}` : `${nextGame.opponent} vs CD Aves`}</span>
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-[11px] font-mono font-bold text-muted-foreground uppercase mb-1">
                    Golos {nextGame.isHome ? "CD Aves (Casa)" : `${nextGame.opponent} (Casa)`}
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={lastHomeScore}
                    onChange={(e) => setLastHomeScore(e.target.value)}
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-center text-lg font-bold font-display text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono font-bold text-muted-foreground uppercase mb-1">
                    Golos {nextGame.isHome ? `${nextGame.opponent} (Fora)` : "CD Aves (Fora)"}
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={lastAwayScore}
                    onChange={(e) => setLastAwayScore(e.target.value)}
                    className="w-full bg-background border border-border rounded-md px-3 py-2 text-center text-lg font-bold font-display text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* ETAPA 2: Definir o Próximo Jogo */}
            <div className="space-y-4">
              <p className="text-xs font-mono font-bold uppercase text-foreground flex items-center gap-2">
                <ArrowRight size={14} className="text-primary" />
                2. Agendar o Próximo Jogo a Seguir
              </p>

              {/* Seletor de Casa vs Fora */}
              <div>
                <label className="block text-[11px] font-mono font-bold text-muted-foreground uppercase mb-2">
                  Local do Jogo (Casa ou Fora)
                </label>
                <div className="grid grid-cols-2 gap-3 max-w-md font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => handleHomeToggle(true)}
                    className={`py-2.5 px-4 rounded-md font-bold flex items-center justify-center gap-2 border transition-all ${
                      newIsHome
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    🏠 Jogo em Casa
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHomeToggle(false)}
                    className={`py-2.5 px-4 rounded-md font-bold flex items-center justify-center gap-2 border transition-all ${
                      !newIsHome
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-secondary border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    ✈️ Jogo Fora
                  </button>
                </div>
              </div>

              {/* Visual Preview da Disposição dos Logos */}
              <div className="bg-secondary/60 border border-border rounded-lg p-3 flex items-center justify-between max-w-md font-mono text-xs">
                <div className="flex items-center gap-2">
                  {newIsHome ? (
                    <>
                      <img src={logoCd} alt="CD Aves" className="h-6 w-6 object-contain" />
                      <span className="font-bold text-primary">CD Aves (Casa)</span>
                    </>
                  ) : (
                    <>
                      <div className="h-6 w-6 rounded-full border border-border bg-card flex items-center justify-center text-[10px] font-bold">
                        {newOpponent.substring(0, 2).toUpperCase() || "ADV"}
                      </div>
                      <span className="font-bold text-foreground">{newOpponent || "Adversário"} (Casa)</span>
                    </>
                  )}
                </div>

                <span className="font-display font-bold text-muted-foreground">VS</span>

                <div className="flex items-center gap-2">
                  {!newIsHome ? (
                    <>
                      <span className="font-bold text-primary">CD Aves (Fora)</span>
                      <img src={logoCd} alt="CD Aves" className="h-6 w-6 object-contain" />
                    </>
                  ) : (
                    <>
                      <span className="font-bold text-foreground">{newOpponent || "Adversário"} (Fora)</span>
                      <div className="h-6 w-6 rounded-full border border-border bg-card flex items-center justify-center text-[10px] font-bold">
                        {newOpponent.substring(0, 2).toUpperCase() || "ADV"}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Campos do Formulário */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                    Adversário
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: FC Porto, Vitória SC, Rio Ave"
                    value={newOpponent}
                    onChange={(e) => setNewOpponent(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                    Data do Jogo
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                    Hora do Jogo
                  </label>
                  <input
                    type="time"
                    required
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                    Estádio / Recinto
                  </label>
                  <input
                    type="text"
                    required
                    value={newStadium}
                    onChange={(e) => setNewStadium(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-muted-foreground uppercase mb-1">
                    Competição
                  </label>
                  <select
                    value={newCompetition}
                    onChange={(e) => setNewCompetition(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Liga Portugal">Liga Portugal</option>
                    <option value="Taça de Portugal">Taça de Portugal</option>
                    <option value="Taça da Liga">Taça da Liga</option>
                    <option value="Jogo Amigável">Jogo Amigável</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={() => setShowInlineForm(false)}
                className="px-4 py-2 rounded-md border border-border text-muted-foreground hover:text-foreground text-xs font-mono font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-md bg-primary text-primary-foreground text-xs font-mono font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Check size={14} /> Guardar Resultado e Agendar Novo Jogo
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabela de Histórico de Jogos Anteriores */}
      <AdminJogosHistoryTable games={[lastGame, ...history]} />
    </div>
  );
}
