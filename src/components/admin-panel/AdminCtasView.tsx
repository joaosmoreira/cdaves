import { useState } from "react";
import { Layers, Plus, Edit2, Trash2, ArrowLeft, Check, Palette, Sparkles, ExternalLink } from "lucide-react";
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

export function AdminCtasView() {
  const ctas = useAdmin((s) => s.ctas ?? []);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRow, setEditingRow] = useState<Row | null>(null);

  const [nome, setNome] = useState("");
  const [slug, setSlug] = useState("");
  const [eyebrow, setEyebrow] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [textoBotao, setTextoBotao] = useState("");
  const [linkBotao, setLinkBotao] = useState("");

  const [usarCoresCustomizadas, setUsarCoresCustomizadas] = useState<"sim" | "nao">("nao");
  const [corFundo, setCorFundo] = useState("#D90429");
  const [corTexto, setCorTexto] = useState("#FFFFFF");
  const [corBotaoFundo, setCorBotaoFundo] = useState("#F77F00");
  const [corBotaoTexto, setCorBotaoTexto] = useState("#000000");

  function openNew() {
    setEditingRow(null);
    setNome("");
    setSlug("");
    setEyebrow("");
    setTitulo("");
    setDescricao("");
    setTextoBotao("");
    setLinkBotao("/socios");
    setUsarCoresCustomizadas("nao");
    setCorFundo("#D90429");
    setCorTexto("#FFFFFF");
    setCorBotaoFundo("#F77F00");
    setCorBotaoTexto("#000000");
    setIsEditing(true);
  }

  function openEdit(row: Row) {
    setEditingRow(row);
    setNome(String(row.nome ?? ""));
    setSlug(String(row.slug ?? ""));
    setEyebrow(String(row.eyebrow ?? ""));
    setTitulo(String(row.titulo ?? ""));
    setDescricao(String(row.descricao ?? ""));
    setTextoBotao(String(row.textoBotao ?? ""));
    setLinkBotao(String(row.linkBotao ?? ""));

    setUsarCoresCustomizadas(String(row.usarCoresCustomizadas) === "sim" ? "sim" : "nao");
    setCorFundo(String(row.corFundo ?? "#D90429"));
    setCorTexto(String(row.corTexto ?? "#FFFFFF"));
    setCorBotaoFundo(String(row.corBotaoFundo ?? "#F77F00"));
    setCorBotaoTexto(String(row.corBotaoTexto ?? "#000000"));
    setIsEditing(true);
  }

  function handleDelete(id: string, name: string) {
    if (confirm(`Tem a certeza que deseja eliminar o bloco CTA "${name}"?`)) {
      removeRow("ctas", id);
      toast.success(`Bloco CTA "${name}" eliminado.`);
    }
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo.trim()) {
      toast.error("O título do CTA é obrigatório.");
      return;
    }

    const finalSlug = slug.trim() ? slugify(slug) : slugify(nome || titulo);

    const payload = {
      nome: nome.trim() || titulo.trim(),
      slug: finalSlug,
      eyebrow: eyebrow.trim(),
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      textoBotao: textoBotao.trim(),
      linkBotao: linkBotao.trim() || "/socios",
      usarCoresCustomizadas,
      corFundo,
      corTexto,
      corBotaoFundo,
      corBotaoTexto,
    };

    if (editingRow) {
      updateRow("ctas", editingRow.id, payload);
      toast.success("Bloco CTA atualizado com sucesso.");
    } else {
      addRow("ctas", payload);
      toast.success("Novo Bloco CTA criado com sucesso.");
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
            <ArrowLeft size={16} /> Voltar à lista de CTAs
          </button>
        </div>

        <div>
          <h1 className="font-display text-2xl uppercase tracking-tight text-foreground">
            {editingRow ? "Editar Bloco CTA" : "Novo Bloco CTA Personalizado"}
          </h1>
          <p className="text-xs font-mono text-muted-foreground mt-1">
            Defina o texto, o link e opcionalmente atribua cores exclusivas a esta instância de CTA.
          </p>
        </div>

        <form onSubmit={handleSave} className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          {/* DADOS GERAIS DO CTA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs">
            <div className="space-y-1.5">
              <label className="uppercase text-slate-500 font-bold block">Nome de Identificação Interna</label>
              <input
                type="text"
                required
                placeholder="Ex: Banner Lugar Anual, CTA Newsletter"
                value={nome}
                onChange={(e) => {
                  setNome(e.target.value);
                  if (!editingRow) setSlug(slugify(e.target.value));
                }}
                className="w-full bg-secondary border border-border rounded-md p-2.5 text-foreground font-sans font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="uppercase text-slate-500 font-bold block">Identificador Único (Slug)</label>
              <input
                type="text"
                required
                placeholder="lugar-anual"
                value={slug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                className="w-full bg-secondary border border-border rounded-md p-2.5 text-primary font-mono font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="uppercase text-slate-500 font-bold block">Subtítulo (Eyebrow)</label>
              <input
                type="text"
                placeholder="Ex: Lugar Anual 2026/27, Sócio CD Aves"
                value={eyebrow}
                onChange={(e) => setEyebrow(e.target.value)}
                className="w-full bg-secondary border border-border rounded-md p-2.5 text-foreground"
              />
            </div>

            <div className="space-y-1.5">
              <label className="uppercase text-slate-500 font-bold block">Título Principal do Banner</label>
              <input
                type="text"
                required
                placeholder="Ex: Garante o teu lugar na bancada"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full bg-secondary border border-border rounded-md p-2.5 text-foreground font-sans font-bold"
              />
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="uppercase text-slate-500 font-bold block">Descrição do Apelo à Ação</label>
              <textarea
                rows={3}
                placeholder="Ex: Todos os jogos em casa, o mesmo lugar, preço fechado para a época inteira."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full bg-secondary border border-border rounded-md p-2.5 text-foreground font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="uppercase text-slate-500 font-bold block">Texto do Botão de Ação</label>
              <input
                type="text"
                required
                placeholder="Ex: Comprar Lugar Anual, Subscrever"
                value={textoBotao}
                onChange={(e) => setTextoBotao(e.target.value)}
                className="w-full bg-secondary border border-border rounded-md p-2.5 text-foreground font-sans font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="uppercase text-slate-500 font-bold block">Link de Destino do Botão</label>
              <input
                type="text"
                required
                placeholder="Ex: /socios, /noticias, https://..."
                value={linkBotao}
                onChange={(e) => setLinkBotao(e.target.value)}
                className="w-full bg-secondary border border-border rounded-md p-2.5 text-foreground font-mono"
              />
            </div>
          </div>

          {/* SECÇÃO DE CORES DA INSTÂNCIA DE CTA (ESCALÁVEL) */}
          <div className="bg-secondary/50 border border-border rounded-xl p-5 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Palette size={16} className="text-primary" />
                <h3 className="font-bold text-foreground uppercase">Personalização Visual Exclusiva deste CTA</h3>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="radio"
                    name="customColors"
                    checked={usarCoresCustomizadas === "nao"}
                    onChange={() => setUsarCoresCustomizadas("nao")}
                  />
                  <span>Usar Cores Padrão do Design</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold text-primary">
                  <input
                    type="radio"
                    name="customColors"
                    checked={usarCoresCustomizadas === "sim"}
                    onChange={() => setUsarCoresCustomizadas("sim")}
                  />
                  <span>Atribuir Cores Exclusivas</span>
                </label>
              </div>
            </div>

            {usarCoresCustomizadas === "sim" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                <div className="space-y-2">
                  <label className="font-bold uppercase text-muted-foreground block">Fundo deste CTA</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={corFundo}
                      onChange={(e) => setCorFundo(e.target.value)}
                      className="h-9 w-12 rounded border border-border cursor-pointer bg-transparent"
                    />
                    <span className="font-bold text-foreground uppercase">{corFundo}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-bold uppercase text-muted-foreground block">Texto deste CTA</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={corTexto}
                      onChange={(e) => setCorTexto(e.target.value)}
                      className="h-9 w-12 rounded border border-border cursor-pointer bg-transparent"
                    />
                    <span className="font-bold text-foreground uppercase">{corTexto}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-bold uppercase text-muted-foreground block">Fundo do Botão</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={corBotaoFundo}
                      onChange={(e) => setCorBotaoFundo(e.target.value)}
                      className="h-9 w-12 rounded border border-border cursor-pointer bg-transparent"
                    />
                    <span className="font-bold text-foreground uppercase">{corBotaoFundo}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-bold uppercase text-muted-foreground block">Texto do Botão</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={corBotaoTexto}
                      onChange={(e) => setCorBotaoTexto(e.target.value)}
                      className="h-9 w-12 rounded border border-border cursor-pointer bg-transparent"
                    />
                    <span className="font-bold text-foreground uppercase">{corBotaoTexto}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-muted-foreground italic">
                Este CTA irá herdar automaticamente as cores padrão configuradas no menu <strong>Design</strong>.
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <button
              type="submit"
              className="bg-primary text-primary-foreground text-xs font-semibold px-5 py-2.5 rounded-md flex items-center gap-2 font-mono hover:bg-primary/90 shadow-sm"
            >
              <Check size={15} /> Guardar Bloco CTA
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
            <Layers className="text-primary" size={24} /> GESTÃO DE CTAS & BANNERS DE APELO À AÇÃO
          </h1>
          <p className="text-muted-foreground text-xs font-mono">
            Gestão escalável de blocos CTA com suporte a cores globais do Design ou cores customizadas por CTA
          </p>
        </div>
        <button
          onClick={openNew}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-md hover:bg-primary/90 font-mono shadow-sm"
        >
          <Plus size={14} /> Novo Bloco CTA
        </button>
      </div>

      {/* Grelha de CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ctas.map((item) => {
          const isCustom = String(item.usarCoresCustomizadas) === "sim";
          const bg = String(item.corFundo ?? "#D90429");
          const textC = String(item.corTexto ?? "#FFFFFF");
          const btnBg = String(item.corBotaoFundo ?? "#F77F00");
          const btnText = String(item.corBotaoTexto ?? "#000000");

          return (
            <div
              key={String(item.id)}
              className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary flex items-center gap-1.5">
                    <Sparkles size={14} /> {String(item.nome)}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(item)}
                      className="p-1.5 text-muted-foreground hover:text-foreground"
                      title="Editar CTA"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(String(item.id), String(item.nome))}
                      className="p-1.5 text-muted-foreground hover:text-destructive"
                      title="Eliminar CTA"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Pré-visualização Realista do CTA */}
                <div
                  className="rounded-lg p-4 space-y-2 border border-border/50 shadow-inner"
                  style={
                    isCustom
                      ? { backgroundColor: bg, color: textC }
                      : { backgroundColor: "var(--cta-bg, var(--primary))", color: "var(--cta-text, #fff)" }
                  }
                >
                  <p className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-80">
                    {String(item.eyebrow ?? "Subtítulo")}
                  </p>
                  <h3 className="font-display text-lg uppercase leading-tight">
                    {String(item.titulo)}
                  </h3>
                  <p className="text-xs opacity-90 line-clamp-2">
                    {String(item.descricao)}
                  </p>
                  <div className="pt-2">
                    <span
                      className="inline-block px-3 py-1.5 rounded text-xs font-mono font-bold uppercase shadow-sm"
                      style={
                        isCustom
                          ? { backgroundColor: btnBg, color: btnText }
                          : { backgroundColor: "var(--btn-gold-bg, #F77F00)", color: "var(--btn-gold-text, #000)" }
                      }
                    >
                      {String(item.textoBotao)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground">Estilo de Cores:</span>
                {isCustom ? (
                  <span className="bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                    <Palette size={11} /> Cores Exclusivas deste CTA
                  </span>
                ) : (
                  <span className="bg-secondary text-muted-foreground font-bold px-2 py-0.5 rounded text-[10px]">
                    🌐 Herda do Design Global
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
