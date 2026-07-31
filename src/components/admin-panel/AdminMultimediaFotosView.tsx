import { useState } from "react";
import { Image, Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { addRow, removeRow, updateRow, useAdmin, Row } from "@/admin/store";
import { InlineFormEditor, InlineField } from "./InlineFormEditor";

const fields: InlineField[] = [
  { key: "titulo", label: "Título da Fotografia" },
  { key: "categoria", label: "Categoria", type: "select", options: ["Geral", "Equipa A", "Modalidades", "Institucional", "Sócios"] },
  { key: "data", label: "Data de Captação" },
];

export function AdminMultimediaFotosView() {
  const media = useAdmin((s) => (s.media ?? []).filter((m) => String(m.tipo).toLowerCase() === "foto" || !m.tipo));
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState<Row | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({
    titulo: "",
    tipo: "Foto",
    categoria: "Geral",
    data: new Date().toISOString().split("T")[0],
  });

  function openNew() {
    setEditingRow(null);
    setDraft({ titulo: "", tipo: "Foto", categoria: "Geral", data: new Date().toISOString().split("T")[0] });
    setIsEditing(true);
  }

  function openEdit(row: Row) {
    setEditingRow(row);
    setDraft({
      titulo: String(row.titulo ?? ""),
      tipo: "Foto",
      categoria: String(row.categoria ?? "Geral"),
      data: String(row.data ?? ""),
    });
    setIsEditing(true);
  }

  function handleDelete(id: string) {
    removeRow("media", id);
    toast.success("Foto eliminada.");
  }

  function handleSave() {
    if (!draft.titulo?.trim()) {
      toast.error("O título da fotografia é obrigatório.");
      return;
    }
    if (editingRow) {
      updateRow("media", editingRow.id, { ...draft, tipo: "Foto" });
      toast.success("Fotografia atualizada.");
    } else {
      addRow("media", { ...draft, tipo: "Foto" });
      toast.success("Fotografia adicionada.");
    }
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <InlineFormEditor
        title={editingRow ? "Editar Fotografia" : "Nova Fotografia"}
        subtitle="Preencha os dados da fotografia abaixo."
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
          <h1 className="text-foreground font-display text-2xl uppercase tracking-tight">GALERIA DE FOTOGRAFIAS</h1>
          <p className="text-muted-foreground text-xs font-mono">Fotografias institucionais, eventos e jogos do CD Aves</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-md hover:bg-primary/90">
          <Plus size={14} /> Carregar Foto
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {media.map((item) => (
          <div key={String(item.id)} className="bg-card border border-border rounded-xl p-4 shadow-sm space-y-3">
            <div className="aspect-video w-full rounded-md bg-secondary flex items-center justify-center text-muted-foreground overflow-hidden">
              <Image size={24} />
            </div>
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-foreground text-sm font-sans truncate">{String(item.titulo)}</h3>
                <p className="text-xs text-muted-foreground font-mono">{String(item.categoria)} · {String(item.data)}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => openEdit(item)} className="p-1 text-muted-foreground hover:text-foreground"><Edit2 size={13} /></button>
                <button onClick={() => handleDelete(item.id)} className="p-1 text-muted-foreground hover:text-destructive"><Trash2 size={13} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
