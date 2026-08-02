import { useState } from "react";
import { Layers, Plus, Edit2, Trash2, Power, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { toast } from "sonner";
import { addRow, removeRow, updateRow, useAdmin, Row } from "@/admin/store";
import { InlineFormEditor, InlineField } from "./InlineFormEditor";

const fields: InlineField[] = [
  { key: "nome", label: "Nome da Modalidade" },
  { key: "descricao", label: "Descrição Detalhada", type: "textarea" },
  { key: "recinto", label: "Instalação / Pavilhão / Recinto" },
  { key: "treinador", label: "Treinador Principal" },
  { key: "competicao", label: "Competição Principal" },
];

export function AdminModalidadesView() {
  const modalidades = useAdmin((s) => s.modalidades ?? []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState<Row | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({
    nome: "",
    descricao: "",
    recinto: "",
    treinador: "",
    competicao: "",
  });

  function openNew() {
    setEditingRow(null);
    setDraft({ nome: "", descricao: "", recinto: "", treinador: "", competicao: "" });
    setIsEditing(true);
  }

  function openEdit(row: Row) {
    setEditingRow(row);
    setDraft({
      nome: String(row.nome ?? ""),
      descricao: String(row.descricao ?? ""),
      recinto: String(row.recinto ?? ""),
      treinador: String(row.treinador ?? ""),
      competicao: String(row.competicao ?? ""),
    });
    setIsEditing(true);
  }

  function handleDelete(id: string) {
    removeRow("modalidades", id);
    toast.success("Modalidade eliminada.");
  }

  function toggleModalityActive(row: Row) {
    const isCurrentlyActive = String(row.activa) === "sim" || String(row.activa) === "true";
    const nextState = isCurrentlyActive ? "nao" : "sim";

    updateRow("modalidades", row.id, {
      activa: nextState,
    });

    if (isCurrentlyActive) {
      toast.warning(`Modalidade "${row.nome}" foi desativada e ocultada no site público.`);
    } else {
      toast.success(`Modalidade "${row.nome}" foi ativada e está visível no site público!`);
    }
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
      addRow("modalidades", { ...draft, activa: "sim" });
      toast.success("Modalidade criada e ativada.");
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
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground font-display text-2xl uppercase tracking-tight">GESTÃO DE MODALIDADES & PÁGINAS</h1>
          <p className="text-muted-foreground text-xs font-mono">
            Ativar ou desativar modalidades refletidas em tempo real no site público do CD Aves
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus size={14} /> Nova Modalidade
        </button>
      </div>

      {/* Alerta Informativo */}
      <div className="bg-card border border-border rounded-xl p-4 flex items-start gap-3 text-xs font-mono">
        <ShieldAlert size={18} className="text-accent shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-foreground uppercase">Gestão Dinâmica de Páginas e Navegação</p>
          <p className="text-muted-foreground mt-0.5">
            Ao ativar ou desativar uma modalidade nesta lista, o menu de navegação do site público é atualizado instantaneamente. O Futebol Profissional está inativo por defeito mantendo todo o código preservado.
          </p>
        </div>
      </div>

      {/* Grid de Modalidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {modalidades.map((m) => {
          const isActive = String(m.activa) === "sim" || String(m.activa) === "true";
          const isFutebol = String(m.slug) === "futebol" || String(m.nome).toLowerCase().includes("futebol profissional");

          return (
            <div
              key={String(m.id)}
              className={`bg-card border rounded-xl p-5 shadow-sm space-y-4 transition-all ${
                isActive ? "border-border" : "border-slate-300 opacity-85 bg-slate-50/50"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`grid h-9 w-9 place-items-center rounded-lg ${
                      isActive ? "bg-primary/10 text-primary" : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    <Layers size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-base uppercase text-foreground leading-tight">{String(m.nome)}</h3>
                    {isFutebol && (
                      <span className="text-[10px] font-mono text-amber-600 font-bold uppercase block mt-0.5">
                        Inativo no Clube (Código Preservado)
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEdit(m)}
                    className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-secondary"
                    title="Editar dados"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="text-muted-foreground hover:text-destructive p-1 rounded hover:bg-secondary"
                    title="Eliminar modalidade"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2">{String(m.descricao ?? "")}</p>

              <div className="text-xs font-mono text-muted-foreground border-t border-border pt-3 space-y-1.5">
                <p>
                  <span className="text-slate-400">Instalação:</span>{" "}
                  <strong className="text-foreground">{String(m.recinto ?? "Pavilhão do Clube")}</strong>
                </p>
                {m.competicao && (
                  <p>
                    <span className="text-slate-400">Competição:</span>{" "}
                    <strong className="text-foreground">{String(m.competicao)}</strong>
                  </p>
                )}
              </div>

              {/* Botão de Toggle Ativa / Inativa */}
              <div className="pt-2 flex items-center justify-between border-t border-border">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono font-bold uppercase ${
                    isActive
                      ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/30"
                      : "bg-slate-200 text-slate-600 border border-slate-300"
                  }`}
                >
                  {isActive ? <Eye size={12} /> : <EyeOff size={12} />}
                  {isActive ? "Ativa no Site" : "Inativa / Oculta"}
                </span>

                <button
                  type="button"
                  onClick={() => toggleModalityActive(m)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
                    isActive
                      ? "bg-secondary text-foreground hover:bg-slate-200 border border-border"
                      : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                  }`}
                >
                  <Power size={13} />
                  {isActive ? "Desativar" : "Ativar no Site"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
