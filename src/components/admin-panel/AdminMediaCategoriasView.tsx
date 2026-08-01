import { useState } from "react";
import { FolderPlus, Folder, Edit2, Trash2, Plus, ArrowLeft, Save, HardDrive, ShieldAlert, Check } from "lucide-react";
import { toast } from "sonner";
import { addRow, removeRow, updateRow, useAdmin, Row } from "@/admin/store";

function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function AdminMediaCategoriasView() {
  const categorias = useAdmin((s) => s.mediaCategorias ?? []);
  const media = useAdmin((s) => s.media ?? []);

  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState<Row | null>(null);

  const [nome, setNome] = useState("");
  const [pastaSlug, setPastaSlug] = useState("");
  const [descricao, setDescricao] = useState("");

  function openNew() {
    setEditingRow(null);
    setNome("");
    setPastaSlug("");
    setDescricao("");
    setIsEditing(true);
  }

  function openEdit(row: Row) {
    setEditingRow(row);
    setNome(String(row.nome ?? ""));
    setPastaSlug(String(row.pasta ?? ""));
    setDescricao(String(row.descricao ?? ""));
    setIsEditing(true);
  }

  function handleNomeChange(val: string) {
    setNome(val);
    if (!editingRow) {
      setPastaSlug(slugify(val));
    }
  }

  function handleDelete(id: string, pasta: string, nomeCat: string) {
    // Verificar se existem ficheiros armazenados nesta pasta
    const count = media.filter((m) => String(m.pasta) === pasta).length;
    if (count > 0) {
      toast.error(`Não é possível eliminar a categoria "${nomeCat}" porque contém ${count} ficheiro(s) armazenado(s). Mova ou elimine as imagens primeiro.`);
      return;
    }

    if (confirm(`Tem a certeza que deseja eliminar a categoria e pasta "${nomeCat}" (${pasta})?`)) {
      removeRow("mediaCategorias", id);
      toast.success(`Categoria "${nomeCat}" e pasta associada eliminadas.`);
    }
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) {
      toast.error("O nome da categoria é obrigatório.");
      return;
    }

    const finalSlug = pastaSlug.trim() ? slugify(pastaSlug) : slugify(nome);

    if (editingRow) {
      updateRow("mediaCategorias", editingRow.id, {
        nome: nome.trim(),
        pasta: finalSlug,
        descricao: descricao.trim(),
      });
      toast.success(`Categoria "${nome}" e caminho da pasta atualizados.`);
    } else {
      addRow("mediaCategorias", {
        nome: nome.trim(),
        pasta: finalSlug,
        descricao: descricao.trim(),
      });
      toast.success(`Categoria "${nome}" criada! Pasta física criada em ./imagens/${finalSlug}/`);
    }

    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="space-y-6 font-sans">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2 text-xs font-mono font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} /> Voltar à lista de categorias
          </button>
        </div>

        <div>
          <h1 className="font-display text-2xl uppercase tracking-tight text-foreground">
            {editingRow ? "Editar Categoria / Pasta" : "Nova Categoria de Multimédia"}
          </h1>
          <p className="text-xs font-mono text-muted-foreground mt-1">
            Ao guardar, é associada uma pasta de sistema para organização física dos ficheiros.
          </p>
        </div>

        <form onSubmit={handleSave} className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-5">
          <div className="space-y-1.5 font-mono text-xs">
            <label className="uppercase text-slate-500 font-bold block">Nome da Categoria</label>
            <input
              type="text"
              required
              placeholder="Ex: Comidas e Bebidas, Eventos, Formação"
              value={nome}
              onChange={(e) => handleNomeChange(e.target.value)}
              className="w-full bg-secondary border border-border rounded-md p-2.5 text-foreground font-sans font-bold"
            />
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            <label className="uppercase text-slate-500 font-bold block">Caminho da Pasta Física (Slug)</label>
            <div className="flex items-center gap-2">
              <span className="bg-secondary border border-border rounded-md px-3 py-2 text-muted-foreground font-mono text-xs shrink-0">
                ./imagens/
              </span>
              <input
                type="text"
                required
                placeholder="comidas-e-bebidas"
                value={pastaSlug}
                onChange={(e) => setPastaSlug(slugify(e.target.value))}
                className="w-full bg-secondary border border-border rounded-md p-2.5 text-primary font-mono font-bold"
              />
              <span className="bg-secondary border border-border rounded-md px-3 py-2 text-muted-foreground font-mono text-xs shrink-0">
                /
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              Estrutura de pasta gerada automaticamente para armazenamento dos ficheiros.
            </p>
          </div>

          <div className="space-y-1.5 font-mono text-xs">
            <label className="uppercase text-slate-500 font-bold block">Descrição da Categoria</label>
            <textarea
              rows={3}
              placeholder="Descrição do tipo de conteúdos armazenados nesta pasta..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full bg-secondary border border-border rounded-md p-2.5 text-foreground font-mono"
            />
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <button
              type="submit"
              className="bg-primary text-primary-foreground text-xs font-semibold px-5 py-2.5 rounded-md flex items-center gap-2 font-mono hover:bg-primary/90 shadow-sm"
            >
              <Check size={15} /> Guardar Categoria e Criar Pasta
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="border border-border text-muted-foreground text-xs font-semibold px-4 py-2.5 rounded-md font-mono hover:text-foreground"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground font-display text-2xl uppercase tracking-tight flex items-center gap-2">
            <FolderPlus className="text-primary" size={24} /> GESTÃO DE CATEGORIAS E PASTAS DE MEDIA
          </h1>
          <p className="text-muted-foreground text-xs font-mono">
            Gestão da estrutura de pastas de armazenamento do servidor (sem upload de fotos nesta secção)
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-md hover:bg-primary/90 font-mono shadow-sm"
        >
          <Plus size={14} /> Nova Categoria / Pasta
        </button>
      </div>

      {/* Aviso de Regra */}
      <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 text-xs font-mono text-muted-foreground">
        <ShieldAlert size={18} className="text-primary shrink-0" />
        <span>
          <strong>Nota de Arquitetura:</strong> Nesta secção apenas cria e edita as <strong>categorias e a estrutura física das pastas</strong>. O upload de imagens é efetuado na página <strong>Fotos</strong>.
        </span>
      </div>

      {/* Lista de Categorias / Pastas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {categorias.map((cat) => {
          const pastaName = String(cat.pasta ?? slugify(String(cat.nome)));
          const fileCount = media.filter((m) => String(m.pasta) === pastaName).length;

          return (
            <div
              key={String(cat.id)}
              className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary flex items-center gap-1.5">
                    <Folder size={16} /> {String(cat.nome)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(cat)}
                      className="p-1.5 text-muted-foreground hover:text-foreground"
                      title="Editar Categoria"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(String(cat.id), pastaName, String(cat.nome))}
                      className="p-1.5 text-muted-foreground hover:text-destructive"
                      title="Eliminar Categoria"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <div className="bg-secondary/60 border border-border rounded-lg p-3 space-y-1 font-mono text-xs">
                  <span className="text-[10px] text-muted-foreground uppercase font-bold block">Caminho da Pasta no Servidor</span>
                  <p className="text-foreground font-bold tracking-tight text-xs flex items-center gap-1">
                    <HardDrive size={13} className="text-muted-foreground" />
                    ./imagens/<span className="text-primary">{pastaName}</span>/
                  </p>
                </div>

                {cat.descricao && (
                  <p className="text-xs text-muted-foreground font-mono leading-relaxed">
                    {String(cat.descricao)}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
                <span>Ficheiros na pasta:</span>
                <span className="font-bold text-foreground bg-secondary px-2.5 py-0.5 rounded">
                  {fileCount} imagem(ns)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
