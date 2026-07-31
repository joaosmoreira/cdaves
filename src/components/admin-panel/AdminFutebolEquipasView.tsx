import { useState } from "react";
import { Shield, Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { addRow, removeRow, updateRow, useAdmin, Row } from "@/admin/store";
import { InlineFormEditor, InlineField } from "./InlineFormEditor";

const fields: InlineField[] = [
  { key: "nome", label: "Nome da Equipa" },
  { key: "competicao", label: "Competição" },
  { key: "treinador", label: "Treinador Principal" },
];

export function AdminFutebolEquipasView() {
  const equipas = useAdmin((s) => s.equipas ?? []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState<Row | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({
    nome: "",
    competicao: "",
    treinador: "",
  });

  function openNew() {
    setEditingRow(null);
    setDraft({ nome: "", competicao: "", treinador: "" });
    setIsEditing(true);
  }

  function openEdit(row: Row) {
    setEditingRow(row);
    setDraft({
      nome: String(row.nome ?? ""),
      competicao: String(row.competicao ?? ""),
      treinador: String(row.treinador ?? ""),
    });
    setIsEditing(true);
  }

  function handleDelete(id: string) {
    removeRow("equipas", id);
    toast.success("Equipa eliminada.");
  }

  function handleSave() {
    if (!draft.nome?.trim()) {
      toast.error("O nome da equipa é obrigatório.");
      return;
    }
    if (editingRow) {
      updateRow("equipas", editingRow.id, draft);
      toast.success("Equipa atualizada.");
    } else {
      addRow("equipas", draft);
      toast.success("Equipa criada.");
    }
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <InlineFormEditor
        title={editingRow ? "Editar Equipa" : "Nova Equipa"}
        subtitle="Preencha os dados da equipa abaixo."
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
          <h1 className="text-foreground font-display text-2xl uppercase tracking-tight">EQUIPAS DE FUTEBOL</h1>
          <p className="text-muted-foreground text-xs font-mono">Escalões e equipas de futebol do CD Aves</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-md hover:bg-primary/90">
          <Plus size={14} /> Nova Equipa
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {equipas.map((eq) => (
          <div key={String(eq.id)} className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary">
                  <Shield size={18} />
                </div>
                <h3 className="font-display text-lg uppercase text-foreground">{String(eq.nome)}</h3>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(eq)} className="text-muted-foreground hover:text-foreground p-1"><Edit2 size={14} /></button>
                <button onClick={() => handleDelete(eq.id)} className="text-muted-foreground hover:text-destructive p-1"><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="space-y-1 text-xs font-mono text-muted-foreground border-t border-border pt-3">
              <p><span className="text-slate-400">Competição:</span> <strong className="text-foreground">{String(eq.competicao)}</strong></p>
              <p><span className="text-slate-400">Treinador:</span> <strong className="text-foreground">{String(eq.treinador)}</strong></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
