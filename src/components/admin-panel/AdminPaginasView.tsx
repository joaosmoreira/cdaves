import { useState } from "react";
import { FileText, Plus, Edit2, Trash2, ExternalLink, Globe, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { addRow, removeRow, updateRow, useAdmin, Row } from "@/admin/store";
import { InlineFormEditor, InlineField } from "./InlineFormEditor";
import { Link } from "@tanstack/react-router";

const fields: InlineField[] = [
  { key: "titulo", label: "Título da Página" },
  { key: "slug", label: "Slug da URL (ex: hospitalidade -> /paginas/hospitalidade)" },
  { key: "resumo", label: "Resumo / Subtítulo Meta SEO", type: "textarea" },
  { key: "conteudo", label: "Conteúdo Detalhado da Página", type: "textarea" },
  { key: "bannerUrl", label: "URL da Imagem Banner Hero (Opcional)" },
];

export function AdminPaginasView() {
  const paginas = useAdmin((s) => s.paginas ?? []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState<Row | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({
    titulo: "",
    slug: "",
    resumo: "",
    conteudo: "",
    bannerUrl: "",
    publicado: "sim",
  });

  function openNew() {
    setEditingRow(null);
    setDraft({
      titulo: "",
      slug: "",
      resumo: "",
      conteudo: "",
      bannerUrl: "",
      publicado: "sim",
    });
    setIsEditing(true);
  }

  function openEdit(row: Row) {
    setEditingRow(row);
    setDraft({
      titulo: String(row.titulo ?? ""),
      slug: String(row.slug ?? ""),
      resumo: String(row.resumo ?? ""),
      conteudo: String(row.conteudo ?? ""),
      bannerUrl: String(row.bannerUrl ?? ""),
      publicado: String(row.publicado ?? "sim"),
    });
    setIsEditing(true);
  }

  function handleDelete(id: string) {
    removeRow("paginas", id);
    toast.success("Página eliminada.");
  }

  function togglePublishStatus(row: Row) {
    const isCurrentlyPublished = String(row.publicado) === "sim" || String(row.publicado) === "true";
    const nextState = isCurrentlyPublished ? "nao" : "sim";

    updateRow("paginas", row.id, { publicado: nextState });

    if (isCurrentlyPublished) {
      toast.warning(`Página "${row.titulo}" foi desativada e guardada como rascunho.`);
    } else {
      toast.success(`Página "${row.titulo}" foi publicada no site!`);
    }
  }

  function handleSave() {
    if (!draft.titulo?.trim()) {
      toast.error("O título da página é obrigatório.");
      return;
    }
    const cleanSlug = (draft.slug || draft.titulo)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const payload = {
      ...draft,
      slug: cleanSlug,
      criadoEm: draft.criadoEm || new Date().toISOString().split("T")[0],
    };

    if (editingRow) {
      updateRow("paginas", editingRow.id, payload);
      toast.success("Página atualizada.");
    } else {
      addRow("paginas", payload);
      toast.success("Página criada com sucesso!");
    }
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <InlineFormEditor
        title={editingRow ? "Editar Página Customizada" : "Criar Nova Página no Site"}
        subtitle="Defina o título, URL amigável e conteúdo formatado da nova página do CD Aves."
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
          <h1 className="text-foreground font-display text-2xl uppercase tracking-tight">MOTOR DE PÁGINAS DINÂMICAS (CMS)</h1>
          <p className="text-muted-foreground text-xs font-mono">
            Criar e gerir novas páginas públicas herdeiras dos componentes padrão (Navbar, Breadcrumbs, Layout e Footer)
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus size={14} /> + Criar Nova Página
        </button>
      </div>

      {/* Grelha de Páginas Dinâmicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {paginas.map((pag) => {
          const isPublished = String(pag.publicado) === "sim" || String(pag.publicado) === "true";
          const pageUrl = `/paginas/${pag.slug}`;

          return (
            <div key={String(pag.id)} className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-base uppercase text-foreground leading-tight">{String(pag.titulo)}</h3>
                    <span className="text-[11px] font-mono text-muted-foreground block mt-0.5">/paginas/{String(pag.slug)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button onClick={() => openEdit(pag)} className="text-muted-foreground hover:text-foreground p-1 rounded hover:bg-secondary">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete(pag.id)} className="text-muted-foreground hover:text-destructive p-1 rounded hover:bg-secondary">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-2">{String(pag.resumo || pag.conteudo || "")}</p>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase ${
                    isPublished ? "bg-emerald-500/10 text-emerald-700 border border-emerald-500/30" : "bg-slate-200 text-slate-600 border border-slate-300"
                  }`}
                >
                  {isPublished ? <Eye size={12} /> : <EyeOff size={12} />}
                  {isPublished ? "Publicada" : "Rascunho"}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => togglePublishStatus(pag)}
                    className="text-[11px] font-mono font-semibold text-muted-foreground hover:text-foreground underline"
                  >
                    {isPublished ? "Desativar" : "Publicar"}
                  </button>

                  {isPublished && (
                    <Link
                      to={pageUrl}
                      target="_blank"
                      className="flex items-center gap-1 bg-secondary hover:bg-slate-200 border border-border text-foreground text-xs font-semibold px-2.5 py-1 rounded transition-colors"
                    >
                      <span>Ver</span>
                      <ExternalLink size={12} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
