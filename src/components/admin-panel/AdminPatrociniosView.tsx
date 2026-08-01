import { useState } from "react";
import { Plus, ExternalLink, Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { addRow, removeRow, updateRow, useAdmin, Row } from "@/admin/store";
import { InlineFormEditor, InlineField } from "./InlineFormEditor";

const fields: InlineField[] = [
  { key: "nome", label: "Nome da Empresa" },
  { key: "tipo", label: "Tipo de Parceria", type: "select", options: ["Main Sponsor", "Patrocinador Oficial", "Equipamento", "Parceiro Médico", "Media Partner", "Parceiro", "Parceiro Local"] },
  { key: "site", label: "Endereço Website" },
  { key: "logotipo", label: "Logótipo / Imagem da Marca", type: "image" },
];

export function AdminPatrociniosView() {
  const patrocinios = useAdmin((s) => s.patrocinios ?? []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState<Row | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({
    nome: "",
    tipo: "Patrocinador Oficial",
    site: "",
    logotipo: "",
  });

  function openNew() {
    setEditingRow(null);
    setDraft({ nome: "", tipo: "Patrocinador Oficial", site: "", logotipo: "" });
    setIsEditing(true);
  }

  function openEdit(row: Row) {
    setEditingRow(row);
    setDraft({
      nome: String(row.nome ?? ""),
      tipo: String(row.tipo ?? "Patrocinador Oficial"),
      site: String(row.site ?? ""),
      logotipo: String(row.logotipo ?? ""),
    });
    setIsEditing(true);
  }

  function handleDelete(id: string) {
    removeRow("patrocinios", id);
    toast.success("Patrocínio eliminado.");
  }

  function handleSave() {
    if (!draft.nome?.trim()) {
      toast.error("O nome da empresa é obrigatório.");
      return;
    }
    if (editingRow) {
      updateRow("patrocinios", editingRow.id, draft);
      toast.success("Patrocínio atualizado.");
    } else {
      addRow("patrocinios", draft);
      toast.success("Patrocínio criado.");
    }
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <InlineFormEditor
        title={editingRow ? "Editar Patrocínio" : "Novo Patrocínio"}
        subtitle="Preencha os dados da marca parceira e carregue o respetivo logótipo."
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
          <h1 className="text-foreground font-display text-2xl uppercase tracking-tight">PARCEIROS E PATROCÍNIOS</h1>
          <p className="text-muted-foreground text-xs font-mono">Gestão de marcas parceiras, patrocínios e logótipos da área Corporate</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-md hover:bg-primary/90">
          <Plus size={14} /> Novo Patrocinador
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {patrocinios.map((p) => (
          <div key={String(p.id)} className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-full">{String(p.tipo)}</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(p)} className="p-1 text-muted-foreground hover:text-foreground"><Edit2 size={14} /></button>
                  <button onClick={() => handleDelete(p.id)} className="p-1 text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
                </div>
              </div>

              {/* Logótipo / Imagem da Marca */}
              <div className="h-20 w-full bg-secondary/50 border border-border rounded-lg flex items-center justify-center p-3 overflow-hidden">
                {p.logotipo ? (
                  <img src={String(p.logotipo)} alt={String(p.nome)} className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="font-display font-bold text-lg text-muted-foreground tracking-wider uppercase">
                    {String(p.nome).substring(0, 3)}
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="font-display text-lg uppercase text-foreground">{String(p.nome)}</h3>
                {p.site && (
                  <a href={String(p.site)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-primary font-mono hover:underline">
                    <span>{String(p.site)}</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
