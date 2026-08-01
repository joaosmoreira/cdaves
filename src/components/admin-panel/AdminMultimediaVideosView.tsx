import { useState } from "react";
import { Video, Plus, Edit2, Trash2, Play, Search, Filter, ExternalLink, X, Check, Copy, Film } from "lucide-react";
import { toast } from "sonner";
import { addRow, removeRow, updateRow, useAdmin, Row } from "@/admin/store";
import { InlineFormEditor, InlineField } from "./InlineFormEditor";

const fields: InlineField[] = [
  { key: "titulo", label: "Título do Vídeo" },
  { key: "categoria", label: "Categoria", type: "select", options: ["Jogos", "Entrevistas", "Institucional", "Modalidades", "Formação"] },
  { key: "url", label: "Link do Vídeo (YouTube/Vimeo)" },
  { key: "data", label: "Data de Publicação" },
];

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

export function AdminMultimediaVideosView() {
  const allMedia = useAdmin((s) => s.media ?? []);
  
  // Filtrar vídeos (seja pelo tipo "Vídeo" ou pasta "videos")
  const videos = allMedia.filter(
    (m) =>
      String(m.tipo).toLowerCase() === "vídeo" ||
      String(m.tipo).toLowerCase() === "video" ||
      String(m.pasta) === "videos"
  );

  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("Todas");
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState<Row | null>(null);
  const [playingVideoUrl, setPlayingVideoUrl] = useState<string | null>(null);

  const [draft, setDraft] = useState<Record<string, string>>({
    titulo: "",
    tipo: "Vídeo",
    pasta: "videos",
    categoria: "Jogos",
    url: "",
    data: new Date().toISOString().split("T")[0],
  });

  const filtered = videos.filter((v) => {
    const matchSearch = String(v.titulo ?? "").toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === "Todas" || String(v.categoria) === selectedCat;
    return matchSearch && matchCat;
  });

  function openNew() {
    setEditingRow(null);
    setDraft({
      titulo: "",
      tipo: "Vídeo",
      pasta: "videos",
      categoria: "Jogos",
      url: "",
      data: new Date().toISOString().split("T")[0],
    });
    setIsEditing(true);
  }

  function openEdit(row: Row) {
    setEditingRow(row);
    setDraft({
      titulo: String(row.titulo ?? ""),
      tipo: "Vídeo",
      pasta: "videos",
      categoria: String(row.categoria ?? "Jogos"),
      url: String(row.url ?? ""),
      data: String(row.data ?? ""),
    });
    setIsEditing(true);
  }

  function handleDelete(id: string, title: string) {
    if (confirm(`Tem a certeza que deseja eliminar o vídeo "${title}"?`)) {
      removeRow("media", id);
      toast.success("Vídeo eliminado com sucesso.");
    }
  }

  function handleSave() {
    if (!draft.titulo?.trim()) {
      toast.error("O título do vídeo é obrigatório.");
      return;
    }
    if (editingRow) {
      updateRow("media", editingRow.id, { ...draft, tipo: "Vídeo", pasta: "videos" });
      toast.success("Vídeo atualizado.");
    } else {
      addRow("media", { ...draft, tipo: "Vídeo", pasta: "videos" });
      toast.success("Vídeo adicionado à galeria.");
    }
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <InlineFormEditor
        title={editingRow ? "Editar Vídeo" : "Novo Vídeo"}
        subtitle="Preencha as informações do vídeo e introduza o link do YouTube/Vimeo abaixo."
        fields={fields}
        draft={draft}
        setDraft={setDraft}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground font-display text-2xl uppercase tracking-tight flex items-center gap-2">
            <Film className="text-primary" size={24} /> GALERIA & GESTOR DE VÍDEOS
          </h1>
          <p className="text-muted-foreground text-xs font-mono">
            Vídeos oficiais, resumos de jogos, conferências de imprensa e reportagens do CD Aves
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-md hover:bg-primary/90 font-mono shadow-sm"
        >
          <Plus size={14} /> Adicionar Vídeo
        </button>
      </div>

      {/* Barra de Pesquisa e Filtro de Categoria */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-card border border-border p-4 rounded-xl shadow-sm">
        <div className="relative flex-1 w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Pesquisar vídeos por título..."
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
            <option value="Jogos">Jogos & Resumos</option>
            <option value="Entrevistas">Entrevistas & Imprensa</option>
            <option value="Institucional">Institucional & Bastidores</option>
            <option value="Modalidades">Modalidades</option>
            <option value="Formação">Formação</option>
          </select>
        </div>
      </div>

      {/* Grelha de Vídeos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground font-mono text-xs bg-card border border-border rounded-xl">
            Nenhum vídeo encontrado. Clique em "+ Adicionar Vídeo" para publicar o primeiro conteúdo.
          </div>
        ) : (
          filtered.map((item) => {
            const videoUrl = String(item.url ?? "");
            const ytId = getYouTubeId(videoUrl);
            const thumbUrl = ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : null;

            return (
              <div
                key={String(item.id)}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Thumbnail do Vídeo com Botão Play */}
                <div
                  onClick={() => setPlayingVideoUrl(videoUrl)}
                  className="aspect-video w-full bg-secondary relative cursor-pointer group flex items-center justify-center overflow-hidden"
                >
                  {thumbUrl ? (
                    <img src={thumbUrl} alt={String(item.titulo)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Video size={36} />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={20} className="fill-current ml-0.5" />
                    </div>
                  </div>

                  <span className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                    VÍDEO
                  </span>
                </div>

                {/* Dados do Vídeo */}
                <div className="p-4 space-y-3 font-mono text-xs flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                        {String(item.categoria ?? "Jogos")}
                      </span>
                      <span className="text-[11px] text-muted-foreground">{String(item.data)}</span>
                    </div>
                    <h3 className="font-bold text-foreground text-sm font-sans line-clamp-2" title={String(item.titulo)}>
                      {String(item.titulo)}
                    </h3>
                  </div>

                  {/* Ações */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    {videoUrl ? (
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-primary flex items-center gap-1 text-[11px]"
                      >
                        <ExternalLink size={12} /> Abrir Link
                      </a>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">—</span>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEdit(item)}
                        className="p-1 text-muted-foreground hover:text-foreground"
                        title="Editar Vídeo"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(String(item.id), String(item.titulo))}
                        className="p-1 text-muted-foreground hover:text-destructive"
                        title="Eliminar Vídeo"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal de Reprodução de Vídeo */}
      {playingVideoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setPlayingVideoUrl(null)} />
          <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden font-mono text-xs">
            <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/50">
              <h2 className="font-display text-base uppercase text-foreground">Reproduzir Vídeo</h2>
              <button onClick={() => setPlayingVideoUrl(null)} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>
            <div className="aspect-video w-full bg-black">
              {getYouTubeId(playingVideoUrl) ? (
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(playingVideoUrl)}?autoplay=1`}
                  title="Vídeo CD Aves"
                  className="w-full h-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground p-6 text-center">
                  Link de vídeo não compatível com o leitor direto. <br />
                  <a href={playingVideoUrl} target="_blank" rel="noreferrer" className="text-primary underline ml-1">
                    Clique aqui para abrir externamente.
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
