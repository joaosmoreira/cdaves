import { useState } from "react";
import { Video, Plus, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { addRow, removeRow, updateRow, useAdmin, Row } from "@/admin/store";
import { InlineFormEditor, InlineField } from "./InlineFormEditor";

const fields: InlineField[] = [
  { key: "titulo", label: "Título do Vídeo" },
  { key: "categoria", label: "Categoria", type: "select", options: ["Jogos", "Entrevistas", "Institucional", "Formação"] },
  { key: "url", label: "Link do Vídeo (YouTube/Vimeo)" },
  { key: "data", label: "Data de Publicação" },
];

export function AdminMultimediaVideosView() {
  const videos = useAdmin((s) => (s.media ?? []).filter((m) => String(m.tipo).toLowerCase() === "vídeo" || String(m.tipo).toLowerCase() === "video"));
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState<Row | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({
    titulo: "",
    tipo: "Vídeo",
    categoria: "Jogos",
    url: "",
    data: new Date().toISOString().split("T")[0],
  });

  function openNew() {
    setEditingRow(null);
    setDraft({ titulo: "", tipo: "Vídeo", categoria: "Jogos", url: "", data: new Date().toISOString().split("T")[0] });
    setIsEditing(true);
  }

  function openEdit(row: Row) {
    setEditingRow(row);
    setDraft({
      titulo: String(row.titulo ?? ""),
      tipo: "Vídeo",
      categoria: String(row.categoria ?? "Jogos"),
      url: String(row.url ?? ""),
      data: String(row.data ?? ""),
    });
    setIsEditing(true);
  }

  function handleDelete(id: string) {
    removeRow("media", id);
    toast.success("Vídeo eliminado.");
  }

  function handleSave() {
    if (!draft.titulo?.trim()) {
      toast.error("O título do vídeo é obrigatório.");
      return;
    }
    if (editingRow) {
      updateRow("media", editingRow.id, { ...draft, tipo: "Vídeo" });
      toast.success("Vídeo atualizado.");
    } else {
      addRow("media", { ...draft, tipo: "Vídeo" });
      toast.success("Vídeo adicionado.");
    }
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <InlineFormEditor
        title={editingRow ? "Editar Vídeo" : "Novo Vídeo"}
        subtitle="Preencha as informações do vídeo abaixo."
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
          <h1 className="text-foreground font-display text-2xl uppercase tracking-tight">GALERIA DE VÍDEOS</h1>
          <p className="text-muted-foreground text-xs font-mono">Vídeos oficiais, resumos e conferências de imprensa</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-md hover:bg-primary/90">
          <Plus size={14} /> Adicionar Vídeo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {videos.map((item) => (
          <div key={String(item.id)} className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-3">
            <div className="aspect-video w-full rounded-md bg-secondary flex items-center justify-center text-primary">
              <Video size={32} />
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
