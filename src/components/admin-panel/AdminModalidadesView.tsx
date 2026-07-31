import { useState } from "react";
import { Layers, Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { addRow, removeRow, updateRow, useAdmin, Row } from "@/admin/store";
import { InlineFormEditor, InlineField } from "./InlineFormEditor";

const fields: InlineField[] = [
  { key: "nome", label: "Nome da Modalidade" },
  { key: "descricao", label: "Descrição Detalhada", type: "textarea" },
  { key: "recinto", label: "Instalação / Pavilhão" },
];

export function AdminModalidadesView() {
  const modalidades = useAdmin((s) => s.modalidades ?? []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState<Row | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({
    nome: "",
    descricao: "",
    recinto: "",
  });

  function openNew() {
    setEditingRow(null);
    setDraft({ nome: "", descricao: "", recinto: "" });
    setIsEditing(true);
  }

  function openEdit(row: Row) {
    setEditingRow(row);
    setDraft({
      nome: String(row.nome ?? ""),
      descricao: String(row.descricao ?? ""),
      recinto: String(row.recinto ?? ""),
    });
    setIsEditing(true);
  }

  function handleDelete(id: string) {
    removeRow("modalidades", id);
    toast.success("Modalidade eliminada.");
  }

  function handleSave() {
    if (!draft.nome?.trim()) {
      toast.error("O nome da modalidade é obrigatório.");
      return;
    }
    if (editingRow) {
      updateRow("modalidades", editingRow.id, draft);
      toast.success("Modalidade atualizada.");
    } else {
      addRow("modalidades", draft);
      toast.success("Modalidade criada.");
    }
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <InlineFormEditor
        title={editingRow ? "Editar Modalidade" : "Nova Modalidade"}
        subtitle="Preencha os dados da secção desportiva abaixo."
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground font-display text-2xl uppercase tracking-tight">MODALIDADES DESPORTIVAS</h1>
          <p className="text-muted-foreground text-xs font-mono">Secções e modalidades praticadas no CD Aves</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-md hover:bg-primary/90">
          <Plus size={14} /> Nova Modalidade
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {modalidades.map((m) => (
          <div key={String(m.id)} className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary">
                  <Layers size={18} />
                </div>
                <h3 className="font-display text-lg uppercase text-foreground">{String(m.nome)}</h3>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(m)} className="text-muted-foreground hover:text-foreground p-1"><Edit2 size={14} /></button>
                <button onClick={() => handleDelete(m.id)} className="text-muted-foreground hover:text-destructive p-1"><Trash2 size={14} /></button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{String(m.descricao ?? "")}</p>
            <div className="text-xs font-mono text-muted-foreground border-t border-border pt-3 space-y-1">
              <p><span className="text-slate-400">Instalação:</span> <strong className="text-foreground">{String(m.recinto ?? "Pavilhão do Clube")}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
