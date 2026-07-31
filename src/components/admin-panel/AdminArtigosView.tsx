import { useState } from "react";
import { Plus, Search, Filter, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { addRow, removeRow, updateRow, useAdmin, Row } from "@/admin/store";
import { InlineFormEditor, InlineField } from "./InlineFormEditor";

const fields: InlineField[] = [
  { key: "titulo", label: "Título do Artigo" },
  { key: "categoria", label: "Categoria", type: "select", options: ["Equipa A", "Mercado", "Modalidades", "Sócios", "Clube", "Corporate"] },
  { key: "data", label: "Data de Publicação" },
  { key: "resumo", label: "Resumo / Conteúdo", type: "textarea" },
];

export function AdminArtigosView() {
  const noticias = useAdmin((s) => s.noticias ?? []);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("Todas");
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState<Row | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({
    titulo: "",
    categoria: "Equipa A",
    data: new Date().toISOString().split("T")[0],
    resumo: "",
  });

  const filtered = noticias.filter((n) => {
    const matchSearch = String(n.titulo ?? "").toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === "Todas" || String(n.categoria) === selectedCat;
    return matchSearch && matchCat;
  });

  function openNew() {
    setEditingRow(null);
    setDraft({ titulo: "", categoria: "Equipa A", data: new Date().toISOString().split("T")[0], resumo: "" });
    setIsEditing(true);
  }

  function openEdit(row: Row) {
    setEditingRow(row);
    setDraft({
      titulo: String(row.titulo ?? ""),
      categoria: String(row.categoria ?? "Equipa A"),
      data: String(row.data ?? ""),
      resumo: String(row.resumo ?? ""),
    });
    setIsEditing(true);
  }

  function handleDelete(id: string) {
    removeRow("noticias", id);
    toast.success("Artigo eliminado.");
  }

  function handleSave() {
    if (!draft.titulo?.trim()) {
      toast.error("O título do artigo é obrigatório.");
      return;
    }
    if (editingRow) {
      updateRow("noticias", editingRow.id, draft);
      toast.success("Artigo atualizado.");
    } else {
      addRow("noticias", draft);
      toast.success("Artigo criado.");
    }
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <InlineFormEditor
        title={editingRow ? "Editar Artigo" : "Novo Artigo"}
        subtitle="Preencha os dados da publicação abaixo."
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground font-display text-2xl uppercase tracking-tight">ARTIGOS E NOTÍCIAS</h1>
          <p className="text-muted-foreground text-xs font-mono">Gestão de publicações e comunicados do CD Aves</p>
        </div>
        <button onClick={openNew} className="flex items-center justify-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-md hover:bg-primary/90">
          <Plus size={14} /> Novo Artigo
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 bg-card border border-border p-4 rounded-xl shadow-sm">
        <div className="relative flex-1 w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Pesquisar artigos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-secondary border border-border rounded-md pl-9 pr-3 py-1.5 text-xs text-foreground font-mono focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto font-mono text-xs">
          <Filter size={14} className="text-muted-foreground" />
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="bg-secondary border border-border rounded-md px-3 py-1.5 text-foreground focus:outline-none"
          >
            <option value="Todas">Todas as Categorias</option>
            <option value="Equipa A">Equipa A</option>
            <option value="Mercado">Mercado</option>
            <option value="Modalidades">Modalidades</option>
            <option value="Sócios">Sócios</option>
            <option value="Clube">Clube</option>
          </select>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-secondary/60 border-b border-border text-primary font-bold uppercase">
            <tr>
              <th className="p-4">Título</th>
              <th className="p-4">Categoria</th>
              <th className="p-4">Data</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((art) => (
              <tr key={String(art.id)} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-sans font-semibold text-slate-900">{String(art.titulo)}</td>
                <td className="p-4"><span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full text-[11px] font-bold">{String(art.categoria)}</span></td>
                <td className="p-4 text-muted-foreground">{String(art.data)}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => openEdit(art)} className="p-1.5 text-muted-foreground hover:text-foreground"><Edit2 size={14} /></button>
                  <button onClick={() => handleDelete(art.id)} className="p-1.5 text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
