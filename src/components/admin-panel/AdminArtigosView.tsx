import { useState, useRef } from "react";
import { Plus, Search, Filter, Edit2, Trash2, Image, Upload, Check, FolderOpen, ArrowLeft, Save, X } from "lucide-react";
import { toast } from "sonner";
import { addRow, removeRow, updateRow, useAdmin, Row } from "@/admin/store";
import { InlineField } from "./InlineFormEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const fields: InlineField[] = [
  { key: "titulo", label: "Título do Artigo" },
  { key: "categoria", label: "Categoria", type: "select", options: ["Equipa A", "Mercado", "Modalidades", "Sócios", "Clube", "Corporate"] },
  { key: "autor", label: "Autor / Utilizador", type: "select", options: ["Ana Silva (Editora)", "Carlos Mendes (Redator)", "Gabinete de Imprensa", "Admin Geral"] },
  { key: "estado", label: "Estado", type: "select", options: ["Publicado", "Rascunho", "Pendente Revisão"] },
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
    autor: "Ana Silva (Editora)",
    estado: "Publicado",
    data: new Date().toISOString().split("T")[0],
    resumo: "",
    imagem_capa: "",
  });

  const filtered = noticias.filter((n) => {
    const matchSearch = String(n.titulo ?? "").toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === "Todas" || String(n.categoria) === selectedCat;
    return matchSearch && matchCat;
  });

  function openNew() {
    setEditingRow(null);
    setDraft({
      titulo: "",
      categoria: "Equipa A",
      autor: "Ana Silva (Editora)",
      estado: "Publicado",
      data: new Date().toISOString().split("T")[0],
      resumo: "",
      imagem_capa: "",
    });
    setIsEditing(true);
  }

  function openEdit(row: Row) {
    setEditingRow(row);
    setDraft({
      titulo: String(row.titulo ?? ""),
      categoria: String(row.categoria ?? "Equipa A"),
      autor: String(row.autor ?? "Gabinete de Imprensa"),
      estado: String(row.estado ?? "Publicado"),
      data: String(row.data ?? ""),
      resumo: String(row.resumo ?? ""),
      imagem_capa: String(row.imagem_capa ?? ""),
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
      toast.success("Artigo atualizado com sucesso.");
    } else {
      addRow("noticias", draft);
      toast.success("Artigo criado com sucesso.");
    }
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <ArticleEditorForm
        title={editingRow ? "Editar Artigo" : "Novo Artigo"}
        subtitle="Preencha os dados da publicação e selecione ou carregue a imagem de capa."
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
              <th className="p-4">Capa</th>
              <th className="p-4">Título</th>
              <th className="p-4">Categoria</th>
              <th className="p-4">Autor / Utilizador</th>
              <th className="p-4">Data</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((art) => (
              <tr key={String(art.id)} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  {art.imagem_capa ? (
                    <img src={String(art.imagem_capa)} alt="" className="h-10 w-14 object-cover rounded border border-border" />
                  ) : (
                    <div className="h-10 w-14 bg-secondary border border-border rounded flex items-center justify-center text-muted-foreground">
                      <Image size={16} />
                    </div>
                  )}
                </td>
                <td className="p-4 font-sans font-semibold text-slate-900">{String(art.titulo)}</td>
                <td className="p-4"><span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full text-[11px] font-bold">{String(art.categoria)}</span></td>
                <td className="p-4 text-slate-700 font-semibold">{String(art.autor ?? "Gabinete de Imprensa")}</td>
                <td className="p-4 text-muted-foreground">{String(art.data)}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    String(art.estado) === "Publicado" ? "bg-emerald-100 text-emerald-800" :
                    String(art.estado) === "Rascunho" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
                  }`}>
                    {String(art.estado ?? "Publicado")}
                  </span>
                </td>
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

// Form personalizado para Artigos com Seletor de Imagem da Pasta "noticias" ou Upload
function ArticleEditorForm({
  title,
  subtitle,
  fields,
  draft,
  setDraft,
  onSave,
  onCancel,
}: {
  title: string;
  subtitle: string;
  fields: InlineField[];
  draft: Record<string, string>;
  setDraft: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onSave: () => void;
  onCancel: () => void;
}) {
  const newsImages = useAdmin((s) => (s.media ?? []).filter((m) => String(m.pasta) === "noticias"));
  const [activeImageTab, setActiveImageTab] = useState<"library" | "upload">("library");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleUploadNewImage(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor selecione um ficheiro de imagem válido.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      const fileName = file.name.replace(/\.[^/.]+$/, "");

      // 1. Encaminhar diretamente para a pasta "noticias" na Biblioteca de Media
      addRow("media", {
        titulo: `Notícia: ${fileName}`,
        pasta: "noticias",
        url: dataUrl,
        tamanho: `${Math.round(file.size / 1024)} KB`,
        formato: file.type.split("/")[1]?.toUpperCase() || "JPG",
        data: new Date().toISOString().split("T")[0],
      });

      // 2. Definir como a imagem de capa do artigo em edição
      setDraft((p) => ({ ...p, imagem_capa: dataUrl }));
      toast.success(`Nova imagem carregada diretamente para a pasta "Notícias e Artigos"!`);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 text-xs font-mono font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} /> Voltar à lista de artigos
        </button>
      </div>

      <div>
        <h1 className="font-display text-2xl uppercase tracking-tight text-foreground">{title}</h1>
        <p className="text-xs font-mono text-muted-foreground mt-1">{subtitle}</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
        {/* SECTOR DE IMAGEM DA CAPA DO ARTIGO */}
        <div className="bg-secondary/40 border border-border rounded-xl p-5 space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase text-primary block">IMAGEM DE CAPA DO ARTIGO</span>
              <h3 className="font-display text-base uppercase text-foreground">Escolher ou Carregar Imagem</h3>
            </div>
            <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded text-[10px] font-bold">
              Pasta: noticias
            </span>
          </div>

          {/* Pré-visualização da Capa Selecionada */}
          {draft.imagem_capa && (
            <div className="flex items-center gap-4 bg-card border border-border rounded-lg p-3">
              <img src={draft.imagem_capa} alt="" className="h-16 w-24 object-cover rounded border border-border shrink-0" />
              <div className="flex-1 space-y-1">
                <p className="font-bold text-foreground">Imagem de Capa Selecionada</p>
                <p className="text-[10px] text-emerald-600 font-bold">✓ Pronta para publicação</p>
              </div>
              <button
                type="button"
                onClick={() => setDraft((p) => ({ ...p, imagem_capa: "" }))}
                className="text-muted-foreground hover:text-destructive p-1 rounded"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Tabs de Seleção: Existentes em "noticias" VS Carregar Nova */}
          <div className="flex items-center gap-3 pt-1 border-b border-border pb-2">
            <button
              type="button"
              onClick={() => setActiveImageTab("library")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${
                activeImageTab === "library"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <FolderOpen size={14} /> Selecionar da Pasta 'Notícias e Artigos'
            </button>
            <button
              type="button"
              onClick={() => setActiveImageTab("upload")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${
                activeImageTab === "upload"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              <Upload size={14} /> Carregar Nova Imagem
            </button>
          </div>

          {/* ABA 1: Selecionar de Imagens Existentes na Pasta "noticias" */}
          {activeImageTab === "library" && (
            <div className="space-y-2">
              <p className="text-[11px] text-muted-foreground">Clique numa imagem da pasta 'noticias' para definir como capa:</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-48 overflow-y-auto p-1 bg-card border border-border rounded-lg">
                {newsImages.length === 0 ? (
                  <div className="col-span-full py-6 text-center text-muted-foreground italic">
                    Sem imagens na pasta 'noticias'. Carregue uma nova imagem na aba ao lado.
                  </div>
                ) : (
                  newsImages.map((img) => {
                    const isSelected = draft.imagem_capa === img.url;
                    return (
                      <button
                        key={String(img.id)}
                        type="button"
                        onClick={() => setDraft((p) => ({ ...p, imagem_capa: String(img.url) }))}
                        className={`relative aspect-video rounded overflow-hidden border-2 transition-all ${
                          isSelected ? "border-primary ring-2 ring-primary/40 scale-105" : "border-border hover:border-primary/50 opacity-80 hover:opacity-100"
                        }`}
                      >
                        <img src={String(img.url)} alt="" className="w-full h-full object-cover" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-primary/30 flex items-center justify-center">
                            <Check size={16} className="text-white font-bold" />
                          </div>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* ABA 2: Upload de Nova Imagem (Encaminha diretamente para "noticias") */}
          {activeImageTab === "upload" && (
            <div className="space-y-3">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border hover:border-primary/60 bg-card rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors text-center"
              >
                <Upload size={24} className="text-primary mb-2" />
                <p className="font-bold text-foreground text-xs">Arraste e largue a nova imagem aqui ou clique para procurar</p>
                <p className="text-[10px] text-muted-foreground mt-1">A imagem será guardada diretamente na pasta 'Notícias e Artigos'.</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleUploadNewImage(file);
                }}
              />
            </div>
          )}
        </div>

        {/* OUTROS CAMPOS DO ARTIGO */}
        {fields.map((f) => (
          <div key={f.key} className="space-y-1.5 font-mono text-xs">
            <Label className="uppercase text-slate-500 font-bold">{f.label}</Label>
            {f.type === "textarea" ? (
              <Textarea
                rows={5}
                value={draft[f.key] ?? ""}
                onChange={(e) => setDraft((p) => ({ ...p, [f.key]: e.target.value }))}
                className="bg-secondary border-border text-foreground font-mono"
              />
            ) : f.type === "select" ? (
              <select
                value={draft[f.key] ?? f.options?.[0] ?? ""}
                onChange={(e) => setDraft((p) => ({ ...p, [f.key]: e.target.value }))}
                className="w-full bg-secondary border-border rounded-md p-2 text-foreground font-mono"
              >
                {f.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <Input
                type="text"
                value={draft[f.key] ?? ""}
                onChange={(e) => setDraft((p) => ({ ...p, [f.key]: e.target.value }))}
                className="bg-secondary border-border text-foreground font-mono"
              />
            )}
          </div>
        ))}

        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Button onClick={onSave} className="text-xs font-semibold flex items-center gap-2">
            <Save size={14} /> Guardar Artigo
          </Button>
          <Button variant="outline" onClick={onCancel} className="text-xs font-semibold">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
