import { useState } from "react";
import { Plus } from "lucide-react";
import { GameRecord } from "./types";
import { NewGameModal, ResultModal, NewGameForm } from "./AdminJogosModals";
import { AdminJogosHistoryTable } from "./AdminJogosHistoryTable";

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
  const homeTeam = game.isHome ? "CD Aves" : game.opponent;
  const awayTeam = game.isHome ? game.opponent : "CD Aves";

  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono font-medium uppercase tracking-widest text-primary font-bold">{label}</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 text-center">
          <p className="text-muted-foreground text-xs font-mono mb-1">{homeTeam === "CD Aves" ? "Casa" : "Fora"}</p>
          <p className="text-foreground font-bold text-sm">{homeTeam}</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          {game.homeScore !== null && game.awayScore !== null ? (
            <span className="text-foreground font-bold font-display text-3xl">
              {game.homeScore} — {game.awayScore}
            </span>
          ) : (
            <span className="text-muted-foreground font-bold text-xl font-display">vs</span>
          )}
        </div>
        <div className="flex-1 text-center">
          <p className="text-muted-foreground text-xs font-mono mb-1">{awayTeam === "CD Aves" ? "Casa" : "Fora"}</p>
          <p className="text-foreground font-bold text-sm">{awayTeam}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border text-xs font-mono">
        <div><span className="text-muted-foreground">Data: </span><span className="text-foreground">{game.date}</span></div>
        <div><span className="text-muted-foreground">Hora: </span><span className="text-foreground">{game.time}</span></div>
        <div className="col-span-2"><span className="text-muted-foreground">Estádio: </span><span className="text-foreground">{game.stadium}</span></div>
      </div>

      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}

export function AdminJogosView() {
  const [lastGame, setLastGame] = useState<GameRecord>(initialLastGame);
  const [nextGame, setNextGame] = useState<GameRecord>(initialNextGame);
  const [history, setHistory] = useState<GameRecord[]>(initialHistory);

  const [showNewGame, setShowNewGame] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [pendingGame, setPendingGame] = useState<GameRecord | null>(null);

  function handleNewGameConfirm(form: NewGameForm) {
    const newNext: GameRecord = {
      id: Date.now(),
      ...form,
      homeScore: null,
      awayScore: null,
    };
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground font-display text-2xl uppercase tracking-tight">JOGOS E RESULTADOS</h1>
          <p className="text-muted-foreground text-xs font-mono">Gestão de jogos e resultados oficiais do CD Aves</p>
        </div>
        <button onClick={() => setShowNewGame(true)} className="flex items-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-md hover:bg-primary/90">
          <Plus size={14} /> Novo Jogo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GameCard label="Último Jogo" game={lastGame} />
        <GameCard
          label="Próximo Jogo"
          game={nextGame}
          action={
            <button onClick={() => setShowNewGame(true)} className="w-full flex items-center justify-center gap-2 py-2 rounded-md border border-primary/40 text-primary text-xs font-semibold hover:bg-primary/10 transition-colors">
              <Plus size={13} /> Adicionar resultado e definir novo jogo
            </button>
          }
        />
      </div>

      {/* Tabela de Jogos Anteriores da Época Atual */}
      <AdminJogosHistoryTable games={[lastGame, ...history]} />

      {showNewGame && <NewGameModal onConfirm={handleNewGameConfirm} onClose={() => setShowNewGame(false)} />}
      {showResult && pendingGame && <ResultModal game={nextGame} onConfirm={handleResultConfirm} onClose={() => setShowResult(false)} />}
    </div>
  );
}
