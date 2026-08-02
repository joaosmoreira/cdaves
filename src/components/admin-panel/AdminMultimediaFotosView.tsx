import { useState, useRef } from "react";
import {
  UploadCloud,
  Folder,
  Trash2,
  Search,
  Eye,
  Copy,
  Check,
  HardDrive,
  FileImage,
  FolderOpen,
  X,
  Plus,
  Shield,
  Newspaper,
  UserCheck,
  Handshake,
} from "lucide-react";
import { toast } from "sonner";
import { addRow, removeRow, updateRow, useAdmin, Row } from "@/admin/store";

type FolderKey = "all" | "site_static" | "noticias" | "atletas" | "patrocinadores";

const FOLDERS: { key: FolderKey; name: string; icon: React.ReactNode; desc: string }[] = [
  { key: "all", name: "Todas as Imagens", icon: <FolderOpen size={16} />, desc: "Todos os ficheiros de imagem armazenados" },
  { key: "site_static", name: "Ficheiros Fixos do Site", icon: <Shield size={16} />, desc: "Logo oficial, hero do estádio e gráficos estruturais" },
  { key: "noticias", name: "Notícias & Artigos", icon: <Newspaper size={16} />, desc: "Fotografias e destaques de comunicados" },
  { key: "atletas", name: "Fotos de Jogadores", icon: <UserCheck size={16} />, desc: "Fotografias oficiais dos plantéis e atletas" },
  { key: "patrocinadores", name: "Patrocinadores & Parceiros", icon: <Handshake size={16} />, desc: "Logótipos das marcas parceiras" },
];

export function AdminMultimediaFotosView() {
  const media = useAdmin((s) => s.media ?? []);
  const mediaCategorias = useAdmin((s) => s.mediaCategorias ?? []);

  // Construção dinâmica das pastas a partir do store + a opção "all"
  const dynamicFolders = [
    { key: "all", name: "Todas as Imagens", icon: <FolderOpen size={16} />, desc: "Todos os ficheiros de imagem armazenados" },
    ...mediaCategorias.map((cat) => ({
      key: String(cat.pasta ?? "outros"),
      name: String(cat.nome),
      icon: <Folder size={16} />,
      desc: String(cat.descricao ?? "Pasta de armazenamento"),
    })),
  ];

  const [selectedFolder, setSelectedFolder] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Drag & Drop / Upload State
  const [isDragging, setIsDragging] = useState(false);
  const [uploadFolder, setUploadFolder] = useState<string>("site_static");
  const [uploadTitle, setUploadTitle] = useState("");
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string>("120 KB");
  const [fileFormat, setFileFormat] = useState<string>("PNG");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Image Modal Details
  const [selectedImage, setSelectedImage] = useState<Row | null>(null);

  // Filtragem por Pasta e Pesquisa
  const filteredMedia = media.filter((m) => {
    const matchFolder =
      selectedFolder === "all"
        ? true
        : String(m.pasta ?? "site_static") === selectedFolder;
    const matchSearch = String(m.titulo ?? "")
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchFolder && matchSearch;
  });

  // Estatísticas de Armazenamento
  const totalCount = media.length;
  const folderCounts = FOLDERS.reduce((acc, f) => {
    if (f.key === "all") {
      acc[f.key] = media.length;
    } else {
      acc[f.key] = media.filter((m) => String(m.pasta ?? "site_static") === f.key).length;
    }
    return acc;
  }, {} as Record<FolderKey, number>);

  function handleFileSelect(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Por favor selecione um ficheiro de imagem válido (PNG, JPG, SVG, WebP).");
      return;
    }

    const sizeKb = Math.round(file.size / 1024);
    const format = file.type.split("/")[1]?.toUpperCase() || "PNG";
    setFileSize(`${sizeKb} KB`);
    setFileFormat(format);
    if (!uploadTitle) {
      setUploadTitle(file.name.replace(/\.[^/.]+$/, ""));
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewDataUrl(String(reader.result));
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  }

  function handleConfirmUpload() {
    if (!previewDataUrl) {
      toast.error("Selecione uma imagem para carregar.");
      return;
    }

    const title = uploadTitle.trim() || "Nova Imagem";
    addRow("media", {
      titulo: title,
      pasta: uploadFolder,
      url: previewDataUrl,
      tamanho: fileSize,
      formato: fileFormat,
      data: new Date().toISOString().split("T")[0],
    });

    toast.success(`Imagem "${title}" carregada com sucesso para a pasta "${uploadFolder}"!`);
    setPreviewDataUrl(null);
    setUploadTitle("");
  }

  function handleDeleteImage(id: string, title: string) {
    if (confirm(`Tem a certeza que deseja eliminar permanentemente a imagem "${title}" do servidor?`)) {
      removeRow("media", id);
      if (selectedImage?.id === id) setSelectedImage(null);
      toast.success(`Imagem "${title}" eliminada. Espaço em disco libertado.`);
    }
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("URL da imagem copiado!");
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground font-display text-2xl uppercase tracking-tight">
            BIBLIOTECA DE MEDIA & GESTOR DE FICHEIROS
          </h1>
          <p className="text-muted-foreground text-xs font-mono">
            Gestão de imagens por pastas com upload drag & drop e libertação de espaço
          </p>
        </div>

        <div className="flex items-center gap-2 bg-card border border-border px-3 py-1.5 rounded-lg text-xs font-mono text-muted-foreground">
          <HardDrive size={14} className="text-primary" />
          <span>Total: <strong className="text-foreground">{totalCount} ficheiros</strong> (~4.2 MB)</span>
        </div>
      </div>

      {/* Zona de Upload Drag & Drop (Estilo WordPress) */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-6 transition-all bg-card ${
          isDragging ? "border-primary bg-primary/5 scale-[1.005]" : "border-border hover:border-primary/50"
        }`}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <UploadCloud size={24} />
            </div>
            <div>
              <h3 className="font-display text-base uppercase text-foreground">Carregar Novas Imagens</h3>
              <p className="text-xs font-mono text-muted-foreground">
                Arraste e largue o ficheiro de imagem para aqui ou selecione a pasta de destino abaixo.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto font-mono text-xs">
            <select
              value={uploadFolder}
              onChange={(e) => setUploadFolder(e.target.value)}
              className="bg-secondary border border-border rounded-md px-3 py-2 text-foreground focus:outline-none"
            >
              {mediaCategorias.map((c) => (
                <option key={String(c.id)} value={String(c.pasta)}>
                  📁 Pasta: {String(c.nome)} (./imagens/{String(c.pasta)}/)
                </option>
              ))}
            </select>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <Plus size={14} /> Selecionar Ficheiro
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />
          </div>
        </div>

        {/* Pré-visualização do Ficheiro Selecionado antes de guardar */}
        {previewDataUrl && (
          <div className="mt-5 pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 bg-secondary/50 p-4 rounded-lg animate-in fade-in duration-150">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <img src={previewDataUrl} alt="Preview" className="h-16 w-16 object-contain rounded bg-card border border-border p-1" />
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="Nome do Ficheiro"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="bg-background border border-border rounded px-2.5 py-1 text-xs font-mono text-foreground font-bold w-full sm:w-64"
                />
                <p className="text-[11px] font-mono text-muted-foreground">
                  Pasta: <strong className="text-primary uppercase">{uploadFolder}</strong> · Tamanho: {fileSize} · Formato: {fileFormat}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setPreviewDataUrl(null)}
                className="px-3 py-1.5 rounded text-xs font-mono border border-border text-muted-foreground hover:text-foreground"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmUpload}
                className="px-4 py-1.5 rounded text-xs font-mono font-bold bg-primary text-primary-foreground flex items-center gap-1.5 hover:bg-primary/90"
              >
                <Check size={14} /> Guardar na Biblioteca
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navegação por Pastas (Tabs de Pastas Dinâmicas) */}
      <div className="flex items-center gap-2 border-b border-border overflow-x-auto pb-2 scrollbar-none">
        {dynamicFolders.map((f) => {
          const active = selectedFolder === f.key;
          const count = f.key === "all" ? media.length : media.filter((m) => String(m.pasta) === f.key).length;
          return (
            <button
              key={f.key}
              onClick={() => setSelectedFolder(f.key)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {f.icon}
              <span>{f.name}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${active ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Barra de Pesquisa e Filtros */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-card border border-border p-3 rounded-xl shadow-sm">
        <div className="relative flex-1 w-full">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Pesquisar ficheiros por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-secondary border border-border rounded-md pl-9 pr-3 py-1.5 text-xs text-foreground font-mono focus:outline-none"
          />
        </div>
      </div>

      {selectedFolder === "site_static" && (
        <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 flex items-center justify-between font-mono text-xs text-foreground">
          <div className="flex items-center gap-2">
            <Shield className="text-primary shrink-0" size={16} />
            <span>
              <strong>Ficheiros Fixos do Site:</strong> Para alterar a imagem oficial do Logo ou a foto Hero do Estádio, utilize o menu <strong>Design</strong> no menu lateral.
            </span>
          </div>
        </div>
      )}

      {/* Grelha de Ficheiros de Imagem */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMedia.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground font-mono text-xs bg-card border border-border rounded-xl">
            Nenhum ficheiro de imagem encontrado nesta pasta.
          </div>
        ) : (
          filteredMedia.map((item) => {
            const pastaName = String(item.pasta ?? "site_static");
            return (
              <div
                key={String(item.id)}
                className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Imagem Thumbnail */}
                <div
                  onClick={() => setSelectedImage(item)}
                  className="aspect-square w-full bg-secondary/60 flex items-center justify-center p-3 relative cursor-pointer overflow-hidden"
                >
                  {item.url ? (
                    <img
                      src={String(item.url)}
                      alt={String(item.titulo)}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <FileImage size={32} className="text-muted-foreground" />
                  )}

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <span className="bg-white/90 text-slate-900 text-[10px] font-mono font-bold px-2 py-1 rounded flex items-center gap-1 shadow">
                      <Eye size={12} /> Ver Detalhes
                    </span>
                  </div>
                </div>

                {/* Dados da Imagem */}
                <div className="p-3 space-y-2 border-t border-border">
                  <h3 className="font-bold text-foreground text-xs font-sans truncate" title={String(item.titulo)}>
                    {String(item.titulo)}
                  </h3>

                  <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                    <span className="uppercase font-semibold text-primary">{pastaName}</span>
                    <span>{String(item.tamanho ?? "150 KB")}</span>
                  </div>

                  {/* Ações: Editar Pasta/Título, Copiar URL e Eliminar */}
                  <div className="flex items-center justify-between pt-1 border-t border-border text-[11px]">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => copyToClipboard(String(item.url || ""), String(item.id))}
                        className="text-muted-foreground hover:text-foreground flex items-center gap-1"
                        title="Copiar URL do Ficheiro"
                      >
                        {copiedId === String(item.id) ? (
                          <Check size={12} className="text-emerald-500" />
                        ) : (
                          <Copy size={12} />
                        )}
                        <span className="text-[10px]">{copiedId === String(item.id) ? "Copiado" : "Copiar"}</span>
                      </button>

                      <button
                        onClick={() => setSelectedImage(item)}
                        className="text-muted-foreground hover:text-primary flex items-center gap-1"
                        title="Editar Nome ou Mover de Pasta"
                      >
                        <FolderOpen size={12} />
                        <span className="text-[10px]">Mover/Editar</span>
                      </button>
                    </div>

                    <button
                      onClick={() => handleDeleteImage(String(item.id), String(item.titulo))}
                      className="text-muted-foreground hover:text-destructive p-1 rounded"
                      title="Eliminar imagem e libertar espaço"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal de Detalhes & Edição da Imagem (Visualizador Estilo WordPress) */}
      {selectedImage && (
        <ImageDetailsModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onDelete={handleDeleteImage}
          onCopy={copyToClipboard}
          copiedId={copiedId}
        />
      )}
    </div>
  );
}

function ImageDetailsModal({
  image,
  onClose,
  onDelete,
  onCopy,
  copiedId,
}: {
  image: Row;
  onClose: () => void;
  onDelete: (id: string, title: string) => void;
  onCopy: (text: string, id: string) => void;
  copiedId: string | null;
}) {
  const [editTitle, setEditTitle] = useState(String(image.titulo ?? ""));
  const [editFolder, setEditFolder] = useState<Exclude<FolderKey, "all">>(
    (image.pasta as any) ?? "site_static"
  );
  const [isSaved, setIsSaved] = useState(false);

  function handleSaveChanges() {
    if (!editTitle.trim()) {
      toast.error("O título do ficheiro não pode estar vazio.");
      return;
    }

    updateRow("media", image.id, {
      titulo: editTitle.trim(),
      pasta: editFolder,
    });

    setIsSaved(true);
    toast.success(`Ficheiro atualizado! Movido para a pasta "${editFolder}".`);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden font-mono text-xs animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/50">
          <div>
            <span className="text-[10px] uppercase font-bold text-primary block">EDIÇÃO & DETALHES DO FICHEIRO</span>
            <h2 className="font-display text-lg uppercase text-foreground truncate max-w-md">
              {String(image.titulo)}
            </h2>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="bg-secondary/40 border border-border rounded-lg p-4 flex flex-col items-center justify-center min-h-[220px]">
            <img src={String(image.url)} alt="" className="max-h-56 max-w-full object-contain rounded shadow-sm" />
            <span className="mt-3 text-[11px] text-muted-foreground font-mono">
              {String(image.tamanho ?? "150 KB")} · {String(image.formato ?? "PNG")}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[11px] uppercase font-bold text-slate-500 block mb-1">Nome / Título do Ficheiro</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-foreground font-sans font-bold text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-[11px] uppercase font-bold text-slate-500 block mb-1">Pasta / Categoria de Destino</label>
              <select
                value={editFolder}
                onChange={(e) => setEditFolder(e.target.value as any)}
                className="w-full bg-secondary border border-border rounded-md px-3 py-2 text-foreground font-mono font-bold focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="site_static">📁 Ficheiros Fixos do Site (Logo, Hero)</option>
                <option value="noticias">📁 Notícias & Artigos</option>
                <option value="atletas">📁 Fotos de Jogadores</option>
                <option value="patrocinadores">📁 Patrocinadores & Parceiros</option>
              </select>
              <p className="text-[10px] text-muted-foreground mt-1">
                Se te enganaste na categoria, seleciona a nova pasta para mover a imagem.
              </p>
            </div>

            <div className="pt-3 border-t border-border space-y-2">
              <button
                onClick={handleSaveChanges}
                className="w-full py-2.5 rounded-md bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors shadow-sm"
              >
                <Check size={14} /> {isSaved ? "Alterações Guardadas!" : "Guardar Alterações"}
              </button>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => onCopy(String(image.url || ""), String(image.id))}
                  className="flex-1 py-1.5 rounded border border-border text-muted-foreground hover:text-foreground text-[11px] flex items-center justify-center gap-1"
                >
                  <Copy size={12} /> {copiedId === String(image.id) ? "URL Copiado!" : "Copiar URL"}
                </button>
                <button
                  onClick={() => onDelete(String(image.id), String(image.titulo))}
                  className="py-1.5 px-3 rounded bg-destructive/10 text-destructive text-[11px] font-bold flex items-center justify-center gap-1 hover:bg-destructive/20"
                >
                  <Trash2 size={12} /> Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
