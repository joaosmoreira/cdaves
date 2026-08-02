import { useState } from "react";
import { Plus, Search, Filter, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { addRow, removeRow, updateRow, useAdmin, Row } from "@/admin/store";
import { InlineFormEditor, InlineField } from "./InlineFormEditor";

const fields: InlineField[] = [
  { key: "nome", label: "Nome Público" },
  { key: "equipa", label: "Equipa", type: "select", options: ["Equipa A", "Sub-23", "Sub-19", "Equipa Feminina"] },
  { key: "numero", label: "Número (Dorsal)", type: "number" },
  { key: "posicao", label: "Posição em Campo" },
  { key: "idade", label: "Idade", type: "number" },
  { key: "nacionalidade", label: "Nacionalidade" },
];

export function AdminFutebolAtletasView() {
  const modalidades = useAdmin((s) => s.modalidades ?? []);
  const futebolMod = modalidades.find((m) => String(m.slug) === "futebol" || String(m.nome).toLowerCase().includes("futebol profissional"));
  const isFutebolActive = futebolMod ? String(futebolMod.activa) === "sim" || String(futebolMod.activa) === "true" : false;

  const jogadores = useAdmin((s) => s.jogadores ?? []);
  const [search, setSearch] = useState("");
  const [posFilter, setPosFilter] = useState("Todas");
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState<Row | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({
    nome: "",
    equipa: "Equipa A",
    numero: "",
    posicao: "",
    idade: "",
    nacionalidade: "Portugal",
  });

  const filtered = jogadores.filter((j) => {
    const matchSearch = String(j.nome ?? "").toLowerCase().includes(search.toLowerCase());
    const matchPos = posFilter === "Todas" || String(j.posicao).toLowerCase().includes(posFilter.toLowerCase());
    return matchSearch && matchPos;
  });

  function openNew() {
    setEditingRow(null);
    setDraft({ nome: "", equipa: "Equipa A", numero: "", posicao: "", idade: "", nacionalidade: "Portugal" });
    setIsEditing(true);
  }

  function openEdit(row: Row) {
    setEditingRow(row);
    setDraft({
      nome: String(row.nome ?? ""),
      equipa: String(row.equipa ?? "Equipa A"),
      numero: String(row.numero ?? ""),
      posicao: String(row.posicao ?? ""),
      idade: String(row.idade ?? ""),
      nacionalidade: String(row.nacionalidade ?? "Portugal"),
    });
    setIsEditing(true);
  }

  function handleDelete(id: string) {
    removeRow("jogadores", id);
    toast.success("Atleta eliminado.");
  }

  function handleSave() {
    if (!draft.nome?.trim()) {
      toast.error("O nome do atleta é obrigatório.");
      return;
    }
    if (editingRow) {
      updateRow("jogadores", editingRow.id, draft);
      toast.success("Atleta atualizado.");
    } else {
      addRow("jogadores", draft);
      toast.success("Atleta criado.");
    }
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <InlineFormEditor
        title={editingRow ? "Editar Atleta" : "Novo Atleta"}
        subtitle="Preencha a ficha do jogador abaixo."
        fields={fields}
        draft={draft}
        setDraft={setDraft}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {!isFutebolActive && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 flex items-center gap-3 text-xs font-mono text-amber-900 shadow-sm">
          <span className="bg-amber-200 text-amber-900 px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0">
            Futebol Inativo
          </span>
          <p>
            <strong>Futebol Profissional atualmente Inativo no CD Aves.</strong> Esta secção está ocultada no site público. O código e registos foram salvaguardados e permanecem inutilizáveis até reativação no separador <em>Gestão de Modalidades</em>.
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground font-display text-2xl uppercase tracking-tight">ATLETAS DE FUTEBOL</h1>
          <p className="text-muted-foreground text-xs font-mono">Plantel e jogadores inscritos no CD Aves</p>
        </div>
        <button onClick={openNew} className="flex items-center justify-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-md hover:bg-primary/90">
          <Plus size={14} /> Novo Atleta
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 bg-card border border-border p-4 rounded-xl shadow-sm">
        <div className="relative flex-1 w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Pesquisar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-secondary border border-border rounded-md pl-9 pr-3 py-1.5 text-xs text-foreground font-mono focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto font-mono text-xs">
          <Filter size={14} className="text-muted-foreground" />
          <select
            value={posFilter}
            onChange={(e) => setPosFilter(e.target.value)}
            className="bg-secondary border border-border rounded-md px-3 py-1.5 text-foreground focus:outline-none"
          >
            <option value="Todas">Todas as Posições</option>
            <option value="Guarda">Guarda-Redes</option>
            <option value="Defesa">Defesa</option>
            <option value="Médio">Médio</option>
            <option value="Avançado">Avançado</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((j) => (
          <div key={String(j.id)} className="bg-card border border-border rounded-xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-display text-xl text-primary font-bold">#{String(j.numero ?? "-")}</span>
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-mono font-bold bg-secondary text-slate-700 px-2 py-0.5 rounded">{String(j.posicao)}</span>
                <button onClick={() => openEdit(j)} className="p-1 text-muted-foreground hover:text-foreground"><Edit2 size={13} /></button>
                <button onClick={() => handleDelete(j.id)} className="p-1 text-muted-foreground hover:text-destructive"><Trash2 size={13} /></button>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-foreground text-sm font-sans">{String(j.nome)}</h3>
              <p className="text-xs text-muted-foreground font-mono">{String(j.equipa)} · {String(j.nacionalidade)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
