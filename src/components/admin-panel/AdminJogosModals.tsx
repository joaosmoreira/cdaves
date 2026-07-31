import { useState } from "react";
import { X, CheckCircle, Plus } from "lucide-react";
import { GameRecord } from "./types";

export type NewGameForm = {
  opponent: string;
  date: string;
  time: string;
  stadium: string;
  competition: string;
  isHome: boolean;
};

export function ResultModal({
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
  const homeTeam = game.isHome ? "CD Aves" : game.opponent;
  const awayTeam = game.isHome ? game.opponent : "CD Aves";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-sm p-6 text-foreground">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X size={16} />
        </button>
        <p className="text-xs font-mono font-medium uppercase tracking-widest text-primary font-bold mb-1">Resultado Final</p>
        <h2 className="font-display text-xl uppercase mb-5">{homeTeam} vs {awayTeam}</h2>

        <form onSubmit={(e) => { e.preventDefault(); onConfirm(parseInt(hs) || 0, parseInt(as_) || 0); }} className="space-y-4 font-mono text-xs">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-slate-500 font-bold mb-1 uppercase">{homeTeam}</label>
              <input type="number" min={0} value={hs} onChange={(e) => setHs(e.target.value)} className="w-full bg-secondary border border-border rounded-md p-2 text-center text-xl font-bold font-display text-foreground" />
            </div>
            <span className="text-muted-foreground font-bold text-lg mt-5">—</span>
            <div className="flex-1">
              <label className="block text-slate-500 font-bold mb-1 uppercase">{awayTeam}</label>
              <input type="number" min={0} value={as_} onChange={(e) => setAs(e.target.value)} className="w-full bg-secondary border border-border rounded-md p-2 text-center text-xl font-bold font-display text-foreground" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2 rounded-md border border-border text-slate-600 font-medium">Cancelar</button>
            <button type="submit" className="flex-1 py-2 rounded-md bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2">
              <CheckCircle size={14} /> Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function NewGameModal({
  onConfirm,
  onClose,
}: {
  onConfirm: (form: NewGameForm) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<NewGameForm>({
    opponent: "",
    date: new Date().toISOString().split("T")[0],
    time: "20:00",
    stadium: "Estádio do Clube Desportivo das Aves",
    competition: "Liga Portugal",
    isHome: true,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-md p-6 text-foreground font-mono text-xs">
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X size={16} />
        </button>
        <p className="text-xs font-mono font-medium uppercase tracking-widest text-primary font-bold mb-1">Novo Jogo</p>
        <h2 className="font-display text-xl uppercase mb-5">Agendar Próximo Jogo</h2>

        <form onSubmit={(e) => { e.preventDefault(); if (form.opponent) onConfirm(form); }} className="space-y-4">
          <div>
            <label className="block text-slate-500 font-bold mb-1 uppercase">Adversário</label>
            <input required placeholder="Ex: FC Porto" value={form.opponent} onChange={(e) => setForm((p) => ({ ...p, opponent: e.target.value }))} className="w-full bg-secondary border border-border rounded-md p-2 text-foreground" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-500 font-bold mb-1 uppercase">Data</label>
              <input type="date" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} className="w-full bg-secondary border border-border rounded-md p-2 text-foreground" />
            </div>
            <div>
              <label className="block text-slate-500 font-bold mb-1 uppercase">Hora</label>
              <input type="time" value={form.time} onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))} className="w-full bg-secondary border border-border rounded-md p-2 text-foreground" />
            </div>
          </div>

          <div>
            <label className="block text-slate-500 font-bold mb-1 uppercase">Estádio</label>
            <input value={form.stadium} onChange={(e) => setForm((p) => ({ ...p, stadium: e.target.value }))} className="w-full bg-secondary border border-border rounded-md p-2 text-foreground" />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2 rounded-md border border-border text-slate-600 font-medium">Cancelar</button>
            <button type="submit" className="flex-1 py-2 rounded-md bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2">
              <Plus size={14} /> Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
