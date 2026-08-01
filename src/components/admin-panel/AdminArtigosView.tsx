import { useState, useRef } from "react";
import {
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Upload,
  Check,
  FolderOpen,
  ArrowLeft,
  Save,
  X,
  ArrowUp,
  ArrowDown,
  Video as VideoIcon,
  Quote,
  Type,
  FileText,
  Play,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { addRow, removeRow, updateRow, useAdmin, Row } from "@/admin/store";

export type ArticleBlock =
  | { id: string; type: "paragraph"; text: string }
  | { id: string; type: "heading"; text: string }
  | { id: string; type: "image"; url: string; caption: string }
  | { id: string; type: "video"; url: string; title: string }
  | { id: string; type: "quote"; text: string; author: string };

function generateId(): string {
  return Math.random().toString(36).substring(2, 9) + Date.now().toString(36).substring(4);
}

function getEmbedVideoUrl(rawUrl: string): string {
  if (!rawUrl || typeof rawUrl !== "string") return "";
  const url = rawUrl.trim();
  if (url.includes("youtube.com/watch?v=")) {
    const id = url.split("v=")[1]?.split("&")[0];
    if (id) return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    if (id) return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("vimeo.com/")) {
    const id = url.split("vimeo.com/")[1]?.split("?")[0];
    if (id) return `https://player.vimeo.com/video/${id}`;
  }
  return url;
}

export function AdminArtigosView() {
  const noticias = useAdmin((s) => s.noticias ?? []);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("Todas");

  // Estado do Editor
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState<Row | null>(null);

  // Campos do Artigo
  const [titulo, setTitulo] = useState("");
  const [categoria, setCategoria] = useState("Equipa A");
  const [autor, setAutor] = useState("Gabinete de Imprensa");
  const [estado, setEstado] = useState("Publicado");
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);
  const [resumo, setResumo] = useState("");
  const [imagemCapa, setImagemCapa] = useState("");
  const [blocks, setBlocks] = useState<ArticleBlock[]>([]);

  const filtered = noticias.filter((n) => {
    const matchSearch = String(n.titulo ?? "").toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === "Todas" || String(n.categoria) === selectedCat;
    return matchSearch && matchCat;
  });

  function openNew() {
    setEditingRow(null);
    setTitulo("");
    setCategoria("Equipa A");
    setAutor("Gabinete de Imprensa");
    setEstado("Publicado");
    setData(new Date().toISOString().split("T")[0]);
    setResumo("");
    setImagemCapa("");
    setBlocks([
      { id: generateId(), type: "paragraph", text: "Escreva aqui a introdução da notícia..." },
    ]);
    setIsEditing(true);
  }

  function openEdit(row: Row) {
    setEditingRow(row);
    setTitulo(String(row.titulo ?? ""));
    setCategoria(String(row.categoria ?? "Equipa A"));
    setAutor(String(row.autor ?? "Gabinete de Imprensa"));
    setEstado(String(row.estado ?? "Publicado"));
    setData(String(row.data ?? new Date().toISOString().split("T")[0]));
    setResumo(String(row.resumo ?? ""));
    setImagemCapa(String(row.imagem_capa ?? ""));

    let loadedBlocks: ArticleBlock[] = [];
    try {
      if (row.conteudo_blocos) {
        const parsed = JSON.parse(String(row.conteudo_blocos));
        if (Array.isArray(parsed) && parsed.length > 0) {
          loadedBlocks = parsed.map((b: any) => ({
            id: b.id || generateId(),
            type: b.type || "paragraph",
            text: String(b.text ?? ""),
            url: String(b.url ?? ""),
            caption: String(b.caption ?? ""),
            title: String(b.title ?? ""),
            author: String(b.author ?? ""),
          }));
        }
      }
    } catch (e) {
      console.error("Erro ao ler blocos do artigo:", e);
    }

    if (loadedBlocks.length === 0) {
      const bodyStr = String(row.resumo ?? "");
      loadedBlocks = [{ id: generateId(), type: "paragraph", text: bodyStr }];
    }

    setBlocks(loadedBlocks);
    setIsEditing(true);
  }

  function handleDelete(id: string, itemTitle: string) {
    if (confirm(`Tem a certeza que deseja eliminar a notícia "${itemTitle}"?`)) {
      removeRow("noticias", id);
      toast.success("Artigo eliminado com sucesso.");
    }
  }

  function handleSave(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!titulo.trim()) {
      toast.error("O título do artigo é obrigatório.");
      return;
    }

    const payload = {
      titulo: titulo.trim(),
      categoria,
      autor,
      estado,
      data,
      resumo: resumo.trim(),
      imagem_capa: imagemCapa,
      conteudo_blocos: JSON.stringify(blocks),
    };

    if (editingRow) {
      updateRow("noticias", editingRow.id, payload);
      toast.success("Artigo atualizado com sucesso no site!");
    } else {
      addRow("noticias", payload);
      toast.success("Novo artigo publicado com sucesso no site!");
    }

    setIsEditing(false);
  }

  // CONTROLO DE BLOCOS
  function addBlock(type: ArticleBlock["type"]) {
    let newBlock: ArticleBlock;
    if (type === "paragraph") {
      newBlock = { id: generateId(), type: "paragraph", text: "" };
    } else if (type === "heading") {
      newBlock = { id: generateId(), type: "heading", text: "Novo Sub-título da Notícia" };
    } else if (type === "image") {
      newBlock = { id: generateId(), type: "image", url: "", caption: "Legenda da fotografia" };
    } else if (type === "video") {
      newBlock = { id: generateId(), type: "video", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", title: "Resumo do Jogo e Melhores Momentos" };
    } else {
      newBlock = { id: generateId(), type: "quote", text: "Citação em destaque...", author: "Porta-voz do Clube" };
    }
    setBlocks((prev) => [...prev, newBlock]);
    toast.info(`Adicionado novo bloco de "${type.toUpperCase()}"`);
  }

  function updateBlock(id: string, patch: Partial<ArticleBlock>) {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? ({ ...b, ...patch } as ArticleBlock) : b))
    );
  }

  function removeBlock(id: string) {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  }

  function moveBlock(index: number, direction: "up" | "down") {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === blocks.length - 1) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...blocks];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setBlocks(updated);
  }

  // ----------------------------------------------------
  // VISTA 1: FORMULÁRIO DE EDIÇÃO INLINE NA PÁGINA MAIN
  // ----------------------------------------------------
  if (isEditing) {
    return (
      <div className="space-y-6 font-sans">
        {/* Cabeçalho de Ações */}
        <div className="flex items-center justify-between border-b border-border pb-4">
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="flex items-center gap-2 text-xs font-mono font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} /> Voltar à lista de notícias
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="border border-border text-foreground text-xs font-semibold px-4 py-2 rounded-md hover:bg-secondary font-mono"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => handleSave()}
              className="bg-primary text-primary-foreground text-xs font-semibold px-5 py-2 rounded-md hover:bg-primary/90 flex items-center gap-2 shadow-sm font-mono"
            >
              <Save size={15} /> {editingRow ? "Guardar Alterações" : "Publicar Notícia"}
            </button>
          </div>
        </div>

        <div>
          <h1 className="font-display text-2xl uppercase tracking-tight text-foreground">
            {editingRow ? `Editar: ${editingRow.titulo}` : "Criar Nova Notícia"}
          </h1>
          <p className="text-xs font-mono text-muted-foreground mt-1">
            Editor de notícias ao estilo WordPress com parágrafos, fotos no meio do texto e vídeos do YouTube.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-8">
          {/* INFORMÇÃO PRINCIPAL */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-5">
            <h2 className="font-display text-lg uppercase text-foreground border-b border-border pb-3 flex items-center gap-2">
              <FileText size={18} className="text-primary" /> Informação Principal da Notícia
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 font-mono text-xs">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="uppercase text-slate-500 font-bold block">Título Principal do Artigo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: CD Aves Vence no Estádio do Clube numa Noite de Gala"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-md p-2.5 text-foreground font-sans font-bold text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="uppercase text-slate-500 font-bold block">Categoria</label>
                <select
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-md p-2.5 text-foreground font-mono"
                >
                  <option value="Equipa A">Equipa A</option>
                  <option value="Mercado">Mercado</option>
                  <option value="Modalidades">Modalidades</option>
                  <option value="Sócios">Sócios</option>
                  <option value="Clube">Clube</option>
                  <option value="Corporate">Corporate</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="uppercase text-slate-500 font-bold block">Data de Publicação</label>
                <input
                  type="date"
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-md p-2.5 text-foreground font-mono"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="uppercase text-slate-500 font-bold block">Autor / Utilizador</label>
                <select
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-md p-2.5 text-foreground font-mono"
                >
                  <option value="Gabinete de Imprensa">Gabinete de Imprensa</option>
                  <option value="Ana Silva (Editora)">Ana Silva (Editora)</option>
                  <option value="Carlos Mendes (Redator)">Carlos Mendes (Redator)</option>
                  <option value="Admin Geral">Admin Geral</option>
                </select>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="uppercase text-slate-500 font-bold block">Estado da Publicação</label>
                <select
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-md p-2.5 text-foreground font-mono"
                >
                  <option value="Publicado">Publicado (Visível no site)</option>
                  <option value="Rascunho">Rascunho (Privado)</option>
                  <option value="Pendente Revisão">Pendente Revisão</option>
                </select>
              </div>

              <div className="space-y-1.5 sm:col-span-4">
                <label className="uppercase text-slate-500 font-bold block">Resumo / Excerto da Notícia</label>
                <textarea
                  rows={2}
                  placeholder="Resumo sumário da notícia..."
                  value={resumo}
                  onChange={(e) => setResumo(e.target.value)}
                  className="w-full bg-secondary border border-border rounded-md p-2.5 text-foreground font-sans"
                />
              </div>
            </div>
          </div>

          {/* SELETOR DE CAPA */}
          <CoverImageSection imagemCapa={imagemCapa} setImagemCapa={setImagemCapa} />

          {/* EDITOR DE BLOCOS */}
          <div className="bg-card border-2 border-primary/30 rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border pb-4 gap-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary block">
                  EDITOR DE NOTÍCIAS WORDPRESS
                </span>
                <h2 className="font-display text-lg uppercase text-foreground flex items-center gap-2">
                  <Sparkles size={18} className="text-primary" /> Corpo do Artigo & Conteúdo Intercalado
                </h2>
              </div>

              {/* Botões Rápidos */}
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => addBlock("paragraph")}
                  className="bg-secondary hover:bg-primary/10 border border-border text-foreground px-3 py-1.5 rounded-md flex items-center gap-1.5"
                >
                  <Plus size={13} className="text-primary" /> Texto
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("heading")}
                  className="bg-secondary hover:bg-primary/10 border border-border text-foreground px-3 py-1.5 rounded-md flex items-center gap-1.5"
                >
                  <Type size={13} className="text-primary" /> Sub-título
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("image")}
                  className="bg-secondary hover:bg-primary/10 border border-border text-foreground px-3 py-1.5 rounded-md flex items-center gap-1.5"
                >
                  <ImageIcon size={13} className="text-primary" /> Foto no Texto
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("video")}
                  className="bg-amber-500/10 border border-amber-500/30 text-amber-700 font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5"
                >
                  <VideoIcon size={13} /> Vídeo (YouTube)
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("quote")}
                  className="bg-secondary hover:bg-primary/10 border border-border text-foreground px-3 py-1.5 rounded-md flex items-center gap-1.5"
                >
                  <Quote size={13} className="text-primary" /> Citação
                </button>
              </div>
            </div>

            {/* Renderização dos Blocos */}
            <div className="space-y-4">
              {blocks.length === 0 ? (
                <div className="py-12 border-2 border-dashed border-border rounded-xl text-center font-mono text-xs text-muted-foreground space-y-3">
                  <FileText size={32} className="mx-auto text-muted-foreground/60" />
                  <p>O artigo ainda não tem blocos de conteúdo.</p>
                </div>
              ) : (
                blocks.map((block, index) => (
                  <div
                    key={block.id || index}
                    className="bg-secondary/40 border border-border rounded-xl p-4 transition-all hover:border-primary/40 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-border/60 pb-2 text-xs font-mono">
                      <span className="font-bold uppercase text-primary flex items-center gap-1.5">
                        {block.type === "paragraph" && <Type size={14} />}
                        {block.type === "heading" && <Type size={14} />}
                        {block.type === "image" && <ImageIcon size={14} />}
                        {block.type === "video" && <VideoIcon size={14} className="text-amber-600" />}
                        {block.type === "quote" && <Quote size={14} />}
                        Bloco #{index + 1} · {block.type === "paragraph" ? "Parágrafo de Texto" : block.type === "heading" ? "Sub-título (H2)" : block.type === "image" ? "Fotografia no Texto" : block.type === "video" ? "Vídeo Incorporado (YouTube)" : "Citação / Destaque"}
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => moveBlock(index, "up")}
                          className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30"
                          title="Mover para cima"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          type="button"
                          disabled={index === blocks.length - 1}
                          onClick={() => moveBlock(index, "down")}
                          className="p-1 rounded text-muted-foreground hover:text-foreground disabled:opacity-30"
                          title="Mover para baixo"
                        >
                          <ArrowDown size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeBlock(block.id)}
                          className="p-1 rounded text-muted-foreground hover:text-destructive ml-2"
                          title="Eliminar este bloco"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* EDICAO DE CADA BLOCO */}
                    {block.type === "paragraph" && (
                      <textarea
                        rows={3}
                        placeholder="Escreva aqui o parágrafo..."
                        value={block.text ?? ""}
                        onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                        className="w-full bg-card border border-border rounded-lg p-3 text-xs text-foreground font-sans leading-relaxed focus:outline-none focus:border-primary"
                      />
                    )}

                    {block.type === "heading" && (
                      <input
                        type="text"
                        placeholder="Sub-título da secção..."
                        value={block.text ?? ""}
                        onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                        className="w-full bg-card border border-border rounded-lg p-3 text-sm font-display uppercase tracking-tight text-foreground focus:outline-none focus:border-primary"
                      />
                    )}

                    {block.type === "image" && (
                      <InlineImageBlockEditor block={block} updateBlock={updateBlock} />
                    )}

                    {block.type === "video" && (
                      <InlineVideoBlockEditor block={block} updateBlock={updateBlock} />
                    )}

                    {block.type === "quote" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                        <textarea
                          rows={2}
                          placeholder="Texto da citação..."
                          value={block.text ?? ""}
                          onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                          className="w-full bg-card border border-border rounded-lg p-2.5 text-foreground italic font-sans sm:col-span-2"
                        />
                        <input
                          type="text"
                          placeholder="Autor da citação"
                          value={block.author ?? ""}
                          onChange={(e) => updateBlock(block.id, { author: e.target.value })}
                          className="w-full bg-card border border-border rounded-lg p-2 text-foreground font-mono"
                        />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="bg-primary text-primary-foreground text-xs font-semibold px-6 py-3 rounded-md hover:bg-primary/90 flex items-center gap-2 shadow-sm font-mono"
            >
              <Check size={16} /> {editingRow ? "Guardar Alterações do Artigo" : "Publicar Notícia"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="border border-border text-muted-foreground text-xs font-semibold px-5 py-3 rounded-md font-mono hover:text-foreground"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ----------------------------------------------------
  // VISTA 2: LISTA DE ARTIGOS NO MAIN DA PÁGINA
  // ----------------------------------------------------
  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground font-display text-2xl uppercase tracking-tight">ARTIGOS E NOTÍCIAS</h1>
          <p className="text-muted-foreground text-xs font-mono">
            Gestão de notícias, resumos de jogos com vídeo e comunicados oficiais do CD Aves
          </p>
        </div>
        <button
          type="button"
          onClick={openNew}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-md hover:bg-primary/90 font-mono shadow-sm"
        >
          <Plus size={14} /> Novo Artigo
        </button>
      </div>

      {/* Barra de Pesquisa */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-card border border-border p-4 rounded-xl shadow-sm">
        <div className="relative flex-1 w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Pesquisar notícias por título..."
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
            <option value="Corporate">Corporate</option>
          </select>
        </div>
      </div>

      {/* Tabela de Artigos */}
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
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-muted-foreground italic">
                  Nenhum artigo encontrado.
                </td>
              </tr>
            ) : (
              filtered.map((art) => (
                <tr key={String(art.id)} className="hover:bg-secondary/40 transition-colors">
                  <td className="p-4">
                    {art.imagem_capa ? (
                      <img src={String(art.imagem_capa)} alt="" className="h-10 w-14 object-cover rounded border border-border" />
                    ) : (
                      <div className="h-10 w-14 bg-secondary border border-border rounded flex items-center justify-center text-muted-foreground">
                        <ImageIcon size={16} />
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-sans font-semibold text-foreground">{String(art.titulo)}</td>
                  <td className="p-4">
                    <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-full text-[11px] font-bold">
                      {String(art.categoria)}
                    </span>
                  </td>
                  <td className="p-4 text-muted-foreground font-semibold">{String(art.autor ?? "Gabinete de Imprensa")}</td>
                  <td className="p-4 text-muted-foreground">{String(art.data)}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        String(art.estado) === "Publicado"
                          ? "bg-emerald-100 text-emerald-800"
                          : String(art.estado) === "Rascunho"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {String(art.estado ?? "Publicado")}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      type="button"
                      onClick={() => openEdit(art)}
                      className="p-1.5 text-muted-foreground hover:text-foreground rounded hover:bg-secondary"
                      title="Editar Artigo no Main"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(String(art.id), String(art.titulo))}
                      className="p-1.5 text-muted-foreground hover:text-destructive rounded hover:bg-secondary"
                      title="Eliminar Artigo"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// COMPONENTE: SELETOR DE IMAGEM PRINCIPAL DE CAPA
// ----------------------------------------------------
function CoverImageSection({
  imagemCapa,
  setImagemCapa,
}: {
  imagemCapa: string;
  setImagemCapa: (url: string) => void;
}) {
  const newsImages = useAdmin((s) => (s.media ?? []).filter((m) => String(m.pasta) === "noticias"));
  const [activeTab, setActiveTab] = useState<"library" | "upload">("library");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleUploadNewImage(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      const fileName = file.name.replace(/\.[^/.]+$/, "");

      addRow("media", {
        titulo: `Capa Notícia: ${fileName}`,
        pasta: "noticias",
        url: dataUrl,
        tamanho: `${Math.round(file.size / 1024)} KB`,
        formato: file.type.split("/")[1]?.toUpperCase() || "JPG",
        data: new Date().toISOString().split("T")[0],
      });

      setImagemCapa(dataUrl);
      toast.success(`Nova imagem de capa carregada diretamente para a pasta 'Notícias e Artigos'!`);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-4 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase text-primary block">IMAGEM DE CAPA DO ARTIGO</span>
          <h3 className="font-display text-base uppercase text-foreground">Fotografia Principal de Destaque</h3>
        </div>
        <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded text-[10px] font-bold">
          Pasta: noticias
        </span>
      </div>

      {imagemCapa && (
        <div className="flex items-center gap-4 bg-secondary/50 border border-border rounded-lg p-3">
          <img src={imagemCapa} alt="" className="h-16 w-24 object-cover rounded border border-border shrink-0" />
          <div className="flex-1 space-y-1">
            <p className="font-bold text-foreground">Imagem de Capa Selecionada</p>
            <p className="text-[10px] text-emerald-600 font-bold">✓ Definida para a publicação</p>
          </div>
          <button
            type="button"
            onClick={() => setImagemCapa("")}
            className="text-muted-foreground hover:text-destructive p-1 rounded"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className="flex items-center gap-3 pt-1 border-b border-border pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("library")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${
            activeTab === "library"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          <FolderOpen size={14} /> Selecionar da Pasta 'Notícias e Artigos'
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("upload")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold transition-all ${
            activeTab === "upload"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          <Upload size={14} /> Carregar Nova Imagem
        </button>
      </div>

      {activeTab === "library" && (
        <div className="space-y-2">
          <p className="text-[11px] text-muted-foreground">Clique numa imagem para definir como capa:</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-h-48 overflow-y-auto p-1 bg-secondary/30 border border-border rounded-lg">
            {newsImages.length === 0 ? (
              <div className="col-span-full py-6 text-center text-muted-foreground italic">
                Sem imagens na pasta 'noticias'. Carregue uma nova imagem na aba ao lado.
              </div>
            ) : (
              newsImages.map((img) => {
                const isSelected = imagemCapa === img.url;
                return (
                  <button
                    key={String(img.id)}
                    type="button"
                    onClick={() => setImagemCapa(String(img.url))}
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

      {activeTab === "upload" && (
        <div className="space-y-3">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border hover:border-primary/60 bg-secondary/30 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors text-center"
          >
            <Upload size={24} className="text-primary mb-2" />
            <p className="font-bold text-foreground text-xs">Arraste e largue a nova imagem aqui ou clique para procurar</p>
            <p className="text-[10px] text-muted-foreground mt-1">A imagem será guardada em 'noticias'.</p>
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
  );
}

// ----------------------------------------------------
// COMPONENTE: FOTOGRAFIA INCORPORADA
// ----------------------------------------------------
function InlineImageBlockEditor({
  block,
  updateBlock,
}: {
  block: ArticleBlock;
  updateBlock: (id: string, patch: Partial<ArticleBlock>) => void;
}) {
  const newsImages = useAdmin((s) => (s.media ?? []).filter((m) => String(m.pasta) === "noticias"));
  const fileRef = useRef<HTMLInputElement>(null);
  const blockUrl = "url" in block ? String(block.url ?? "") : "";
  const blockCaption = "caption" in block ? String(block.caption ?? "") : "";

  function handleUploadInline(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      addRow("media", {
        titulo: `Foto Notícia: ${file.name}`,
        pasta: "noticias",
        url: dataUrl,
        tamanho: `${Math.round(file.size / 1024)} KB`,
        formato: file.type.split("/")[1]?.toUpperCase() || "JPG",
        data: new Date().toISOString().split("T")[0],
      });
      updateBlock(block.id, { url: dataUrl });
      toast.success("Foto inserida no artigo e guardada em 'noticias'!");
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-3 font-mono text-xs bg-card border border-border p-3 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-2">
          <label className="font-bold text-muted-foreground block uppercase text-[10px]">Escolher Imagem</label>
          <div className="flex items-center gap-2">
            <select
              value={blockUrl}
              onChange={(e) => updateBlock(block.id, { url: e.target.value })}
              className="w-full bg-secondary border border-border rounded p-2 text-foreground truncate"
            >
              <option value="">-- Selecionar da pasta noticias --</option>
              {newsImages.map((m) => (
                <option key={String(m.id)} value={String(m.url)}>
                  {String(m.titulo)}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="bg-primary text-primary-foreground px-3 py-2 rounded text-xs font-bold shrink-0 flex items-center gap-1"
            >
              <Upload size={13} /> Carregar
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUploadInline(file);
              }}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-bold text-muted-foreground block uppercase text-[10px]">Legenda da Fotografia</label>
          <input
            type="text"
            placeholder="Ex: Aves a celebrar o golo no relvado..."
            value={blockCaption}
            onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
            className="w-full bg-secondary border border-border rounded p-2 text-foreground font-sans"
          />
        </div>
      </div>

      {blockUrl && (
        <div className="flex items-center gap-3 bg-secondary/40 p-2 rounded border border-border">
          <img src={blockUrl} alt="" className="h-14 w-20 object-cover rounded border border-border" />
          <div className="text-[11px] text-muted-foreground">
            <p className="font-bold text-foreground">Pré-visualização no Artigo</p>
            <p className="italic">{blockCaption || "Sem legenda"}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// COMPONENTE: VÍDEO INCORPORADO (YOUTUBE/VIMEO)
// ----------------------------------------------------
function InlineVideoBlockEditor({
  block,
  updateBlock,
}: {
  block: ArticleBlock;
  updateBlock: (id: string, patch: Partial<ArticleBlock>) => void;
}) {
  const blockUrl = "url" in block ? String(block.url ?? "") : "";
  const blockTitle = "title" in block ? String(block.title ?? "") : "";
  const embedUrl = getEmbedVideoUrl(blockUrl);

  return (
    <div className="space-y-3 font-mono text-xs bg-card border border-amber-500/30 p-3.5 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1.5 sm:col-span-2">
          <label className="font-bold text-amber-700 uppercase text-[10px] flex items-center gap-1.5">
            <Play size={12} /> Link do Vídeo (YouTube, Vimeo ou Resumo do Jogo)
          </label>
          <input
            type="text"
            placeholder="Ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            value={blockUrl}
            onChange={(e) => updateBlock(block.id, { url: e.target.value })}
            className="w-full bg-secondary border border-border rounded p-2 text-foreground font-mono"
          />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <label className="font-bold text-muted-foreground uppercase text-[10px]">Título / Legenda do Vídeo</label>
          <input
            type="text"
            placeholder="Ex: Resumo da Partida e Melhores Momentos"
            value={blockTitle}
            onChange={(e) => updateBlock(block.id, { title: e.target.value })}
            className="w-full bg-secondary border border-border rounded p-2 text-foreground font-sans font-bold"
          />
        </div>
      </div>

      {embedUrl && (
        <div className="space-y-2 pt-2 border-t border-border">
          <span className="text-[10px] font-bold uppercase text-muted-foreground flex items-center gap-1">
            <Play size={11} className="text-primary" /> Pré-visualização do Leitor de Vídeo:
          </span>
          <div className="aspect-video max-w-md w-full bg-black rounded-lg overflow-hidden border border-border">
            <iframe
              src={embedUrl}
              title={blockTitle || "Vídeo incorporado"}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}
