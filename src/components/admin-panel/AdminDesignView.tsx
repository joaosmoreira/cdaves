import { useState, useEffect } from "react";
import {
  Palette,
  Shield,
  Image as ImageIcon,
  Upload,
  Check,
  Type,
  Lock,
  ExternalLink,
  MousePointer,
  Layers,
  Layout,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import logoCd from "@/assets/logo-cd.png";
import heroStadium from "@/assets/hero-stadium.jpg";
import { addRow, updateSettings, useAdmin } from "@/admin/store";

import { AdminCtasView } from "./AdminCtasView";

const GOOGLE_FONTS = [
  { id: "Inter", name: "Inter (Moderna & Clean)", category: "Sans-Serif", sample: "Clube Desportivo das Aves 1919" },
  { id: "Poppins", name: "Poppins (Geométrica)", category: "Sans-Serif", sample: "Clube Desportivo das Aves 1919" },
  { id: "Outfit", name: "Outfit (Desportiva / Bold)", category: "Display", sample: "Clube Desportivo das Aves 1919" },
  { id: "Roboto", name: "Roboto (Clássica / Versátil)", category: "Sans-Serif", sample: "Clube Desportivo das Aves 1919" },
  { id: "Montserrat", name: "Montserrat (Impacto & Branding)", category: "Display", sample: "Clube Desportivo das Aves 1919" },
  { id: "Plus Jakarta Sans", name: "Plus Jakarta Sans (Contemporânea)", category: "Sans-Serif", sample: "Clube Desportivo das Aves 1919" },
  { id: "Bebas Neue", name: "Bebas Neue (Títulos Desportivos)", category: "Display", sample: "CLUBE DESPORTIVO DAS AVES 1919" },
  { id: "Space Grotesk", name: "Space Grotesk (Tech / Moderna)", category: "Monospace", sample: "Clube Desportivo das Aves 1919" },
];

export function AdminDesignView() {
  const settings = useAdmin((s) => s.settings);
  const [activeTab, setActiveTab] = useState<"design" | "ctas">("design");

  // Fonte e Imagens Fixas
  const [googleFont, setGoogleFont] = useState(settings?.googleFont ?? "Inter");
  const [logoUrl, setLogoUrl] = useState<string>(settings?.logoUrl ?? logoCd);
  const [heroUrl, setHeroUrl] = useState<string>(settings?.heroUrl ?? heroStadium);

  // 🔤 Cores de Fontes & Texto do Site
  const [textColor, setTextColor] = useState(settings?.textColor ?? "#0F172A");
  const [textMutedColor, setTextMutedColor] = useState(settings?.textMutedColor ?? "#64748B");
  const [headingColor, setHeadingColor] = useState(settings?.headingColor ?? "#000000");
  const [linkColor, setLinkColor] = useState(settings?.linkColor ?? "#D90429");

  // 🔘 Cores de Todos os Botões do Site
  const [btnGoldBg, setBtnGoldBg] = useState(settings?.btnGoldBg ?? "#F77F00");
  const [btnGoldText, setBtnGoldText] = useState(settings?.btnGoldText ?? "#000000");

  const [btnHeroBg, setBtnHeroBg] = useState(settings?.btnHeroBg ?? "#D90429");
  const [btnHeroText, setBtnHeroText] = useState(settings?.btnHeroText ?? "#FFFFFF");

  const [btnPrimaryBg, setBtnPrimaryBg] = useState(settings?.btnPrimaryBg ?? "#D90429");
  const [btnPrimaryText, setBtnPrimaryText] = useState(settings?.btnPrimaryText ?? "#FFFFFF");

  const [btnSecondaryBg, setBtnSecondaryBg] = useState(settings?.btnSecondaryBg ?? "#F1F5F9");
  const [btnSecondaryText, setBtnSecondaryText] = useState(settings?.btnSecondaryText ?? "#0F172A");

  const [btnDangerBg, setBtnDangerBg] = useState(settings?.btnDangerBg ?? "#EF4444");

  // 🚀 CTAs & Destaques
  const [ctaBgColor, setCtaBgColor] = useState(settings?.ctaBgColor ?? "#D90429");
  const [ctaTextColor, setCtaTextColor] = useState(settings?.ctaTextColor ?? "#FFFFFF");
  const [accentColor, setAccentColor] = useState(settings?.accentColor ?? "#F77F00");

  // 🖼️ Fundo & Superfícies do Site
  const [bgColor, setBgColor] = useState(settings?.bgColor ?? "#FFFFFF");
  const [cardBgColor, setCardBgColor] = useState(settings?.cardBgColor ?? "#FFFFFF");
  const [borderColor, setBorderColor] = useState(settings?.borderColor ?? "#E2E8F0");

  // 📑 Menu de Navegação do Site (Navbar)
  const [headerBgColor, setHeaderBgColor] = useState(settings?.headerBgColor ?? "#FFFFFF");
  const [headerTextColor, setHeaderTextColor] = useState(settings?.headerTextColor ?? "#0F172A");
  const [headerHoverColor, setHeaderHoverColor] = useState(settings?.headerHoverColor ?? "#D90429");

  useEffect(() => {
    if (settings) {
      setGoogleFont(settings.googleFont ?? "Inter");
      setLogoUrl(settings.logoUrl ?? logoCd);
      setHeroUrl(settings.heroUrl ?? heroStadium);

      setTextColor(settings.textColor ?? "#0F172A");
      setTextMutedColor(settings.textMutedColor ?? "#64748B");
      setHeadingColor(settings.headingColor ?? "#000000");
      setLinkColor(settings.linkColor ?? "#D90429");

      setBtnGoldBg(settings.btnGoldBg ?? "#F77F00");
      setBtnGoldText(settings.btnGoldText ?? "#000000");

      setBtnHeroBg(settings.btnHeroBg ?? "#D90429");
      setBtnHeroText(settings.btnHeroText ?? "#FFFFFF");

      setBtnPrimaryBg(settings.btnPrimaryBg ?? "#D90429");
      setBtnPrimaryText(settings.btnPrimaryText ?? "#FFFFFF");

      setBtnSecondaryBg(settings.btnSecondaryBg ?? "#F1F5F9");
      setBtnSecondaryText(settings.btnSecondaryText ?? "#0F172A");

      setBtnDangerBg(settings.btnDangerBg ?? "#EF4444");

      setCtaBgColor(settings.ctaBgColor ?? "#D90429");
      setCtaTextColor(settings.ctaTextColor ?? "#FFFFFF");
      setAccentColor(settings.accentColor ?? "#F77F00");

      setBgColor(settings.bgColor ?? "#FFFFFF");
      setCardBgColor(settings.cardBgColor ?? "#FFFFFF");
      setBorderColor(settings.borderColor ?? "#E2E8F0");

      setHeaderBgColor(settings.headerBgColor ?? "#FFFFFF");
      setHeaderTextColor(settings.headerTextColor ?? "#0F172A");
      setHeaderHoverColor(settings.headerHoverColor ?? "#D90429");
    }
  }, [settings]);

  function applyAndSave(patch: Record<string, string>) {
    updateSettings(patch);
  }

  function handleSaveAll() {
    updateSettings({
      googleFont,
      logoUrl,
      heroUrl,
      textColor,
      textMutedColor,
      headingColor,
      linkColor,
      btnGoldBg,
      btnGoldText,
      btnHeroBg,
      btnHeroText,
      btnPrimaryBg,
      btnPrimaryText,
      btnSecondaryBg,
      btnSecondaryText,
      btnDangerBg,
      ctaBgColor,
      ctaTextColor,
      accentColor: btnGoldBg,
      bgColor,
      cardBgColor,
      borderColor,
      headerBgColor,
      headerTextColor,
      headerHoverColor,
    });
    toast.success("Todas as cores dos botões, fontes e elementos do site foram guardadas e aplicadas!");
  }

  function handleFileChange(type: "logo" | "hero", file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result);
      if (type === "logo") {
        setLogoUrl(dataUrl);
        updateSettings({ logoUrl: dataUrl });
        addRow("media", {
          titulo: `Novo Logótipo Oficial (${file.name})`,
          pasta: "site_static",
          url: dataUrl,
          tamanho: `${Math.round(file.size / 1024)} KB`,
          formato: file.type.split("/")[1]?.toUpperCase() || "PNG",
          data: new Date().toISOString().split("T")[0],
        });
        toast.success("Novo Logótipo do clube atualizado e aplicado no site!");
      } else {
        setHeroUrl(dataUrl);
        updateSettings({ heroUrl: dataUrl });
        addRow("media", {
          titulo: `Nova Imagem Hero Estádio (${file.name})`,
          pasta: "site_static",
          url: dataUrl,
          tamanho: `${Math.round(file.size / 1024)} KB`,
          formato: file.type.split("/")[1]?.toUpperCase() || "JPG",
          data: new Date().toISOString().split("T")[0],
        });
        toast.success("Nova Imagem Hero do Estádio atualizada e aplicada no site!");
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-foreground font-display text-2xl uppercase tracking-tight flex items-center gap-2.5">
            <Palette className="text-primary" size={24} /> DESIGN & PROPRIEDADES DO SITE OFICIAL
          </h1>
          <p className="text-muted-foreground text-xs font-mono">
            Personalização de fontes, cores de botões, imagens fixas e gestão completa de CTAs e Banners
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="border border-border text-foreground text-xs font-semibold px-4 py-2.5 rounded-md hover:bg-secondary flex items-center gap-1.5 font-mono"
          >
            <ExternalLink size={14} /> Ver Site Principal
          </a>
          {activeTab === "design" && (
            <button
              onClick={handleSaveAll}
              className="bg-primary text-primary-foreground text-xs font-semibold px-5 py-2.5 rounded-md hover:bg-primary/90 flex items-center gap-2 shadow-sm font-mono"
            >
              <Check size={15} /> Aplicar & Guardar Alterações
            </button>
          )}
        </div>
      </div>

      {/* SEPARADORES SUB-NAVEGAÇÃO INTERNA DO MENU DESIGN */}
      <div className="flex items-center gap-2 border-b border-border pb-3 font-mono text-xs">
        <button
          type="button"
          onClick={() => setActiveTab("design")}
          className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
            activeTab === "design"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          <Palette size={14} /> Cores, Fontes & Imagens Fixas
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("ctas")}
          className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
            activeTab === "ctas"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          <Layers size={14} /> CTAs & Banners de Apelo à Ação
        </button>
      </div>

      {/* CONTEÚDO DAS TABS */}
      {activeTab === "ctas" ? (
        <AdminCtasView />
      ) : (
        <>
      <div className="bg-card border-2 border-primary/30 rounded-xl p-6 shadow-sm space-y-5">
        <div className="border-b border-border pb-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary block">
            TODOS OS BOTÕES DA PLATAFORMA
          </span>
          <h2 className="font-display text-lg uppercase text-foreground flex items-center gap-2">
            <MousePointer size={18} className="text-primary" /> Cores de Botões & Ações do Site
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
          {/* BOTÃO AMARELO / GOLD DE DESTAQUE (HERO & HEADERS & CTAs) */}
          <div className="space-y-3 bg-amber-500/10 border-2 border-amber-500/40 p-4 rounded-xl">
            <h3 className="font-bold text-foreground uppercase flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-amber-700">
                <Sparkles size={14} /> Botão Amarelo (Gold / Hero / CTA)
              </span>
              <span
                className="px-2.5 py-1 rounded text-[10px] font-bold uppercase shadow-sm"
                style={{ backgroundColor: btnGoldBg, color: btnGoldText }}
              >
                Ver Plantel
              </span>
            </h3>

            <div className="space-y-2">
              <label className="text-[10px] text-muted-foreground uppercase block font-bold">Fundo do Botão Amarelo</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={btnGoldBg}
                  onChange={(e) => {
                    setBtnGoldBg(e.target.value);
                    applyAndSave({ btnGoldBg: e.target.value, accentColor: e.target.value });
                  }}
                  className="h-8 w-10 rounded border border-border cursor-pointer bg-transparent"
                />
                <span className="font-bold text-foreground uppercase">{btnGoldBg}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-muted-foreground uppercase block font-bold">Texto do Botão Amarelo</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={btnGoldText}
                  onChange={(e) => {
                    setBtnGoldText(e.target.value);
                    applyAndSave({ btnGoldText: e.target.value });
                  }}
                  className="h-8 w-10 rounded border border-border cursor-pointer bg-transparent"
                />
                <span className="font-bold text-foreground uppercase">{btnGoldText}</span>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground">
              Usado nos botões amarelos do Banner Hero ("Ver Plantel"), Header e CTAs de Destaque.
            </p>
          </div>

          {/* BOTÃO HERO PRINCIPAL */}
          <div className="space-y-3 bg-secondary/40 border border-border p-4 rounded-xl">
            <h3 className="font-bold text-foreground uppercase flex items-center justify-between">
              <span>Botão Hero Principal</span>
              <span
                className="px-2.5 py-1 rounded text-[10px] font-bold uppercase shadow-sm"
                style={{ backgroundColor: btnHeroBg, color: btnHeroText }}
              >
                Tornar-me Sócio
              </span>
            </h3>

            <div className="space-y-2">
              <label className="text-[10px] text-muted-foreground uppercase block font-bold">Fundo do Botão Hero</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={btnHeroBg}
                  onChange={(e) => {
                    setBtnHeroBg(e.target.value);
                    applyAndSave({ btnHeroBg: e.target.value });
                  }}
                  className="h-8 w-10 rounded border border-border cursor-pointer bg-transparent"
                />
                <span className="font-bold text-foreground uppercase">{btnHeroBg}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-muted-foreground uppercase block font-bold">Texto do Botão Hero</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={btnHeroText}
                  onChange={(e) => {
                    setBtnHeroText(e.target.value);
                    applyAndSave({ btnHeroText: e.target.value });
                  }}
                  className="h-8 w-10 rounded border border-border cursor-pointer bg-transparent"
                />
                <span className="font-bold text-foreground uppercase">{btnHeroText}</span>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground">
              Usado no botão principal de ação da secção inicial do site.
            </p>
          </div>

          {/* BOTÃO PRIMÁRIO PADRÃO */}
          <div className="space-y-3 bg-secondary/40 border border-border p-4 rounded-xl">
            <h3 className="font-bold text-foreground uppercase flex items-center justify-between">
              <span>Botão Primário Padrão</span>
              <span
                className="px-2.5 py-1 rounded text-[10px] font-bold shadow-sm"
                style={{ backgroundColor: btnPrimaryBg, color: btnPrimaryText }}
              >
                Guardar
              </span>
            </h3>

            <div className="space-y-2">
              <label className="text-[10px] text-muted-foreground uppercase block font-bold">Fundo do Botão</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={btnPrimaryBg}
                  onChange={(e) => {
                    setBtnPrimaryBg(e.target.value);
                    applyAndSave({ btnPrimaryBg: e.target.value, primaryColor: e.target.value });
                  }}
                  className="h-8 w-10 rounded border border-border cursor-pointer bg-transparent"
                />
                <span className="font-bold text-foreground uppercase">{btnPrimaryBg}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-muted-foreground uppercase block font-bold">Texto do Botão</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={btnPrimaryText}
                  onChange={(e) => {
                    setBtnPrimaryText(e.target.value);
                    applyAndSave({ btnPrimaryText: e.target.value });
                  }}
                  className="h-8 w-10 rounded border border-border cursor-pointer bg-transparent"
                />
                <span className="font-bold text-foreground uppercase">{btnPrimaryText}</span>
              </div>
            </div>
          </div>

          {/* BOTÃO SECUNDÁRIO */}
          <div className="space-y-3 bg-secondary/40 border border-border p-4 rounded-xl">
            <h3 className="font-bold text-foreground uppercase flex items-center justify-between">
              <span>Botão Secundário</span>
              <span
                className="px-2.5 py-1 rounded text-[10px] font-bold border border-border"
                style={{ backgroundColor: btnSecondaryBg, color: btnSecondaryText }}
              >
                Cancelar
              </span>
            </h3>

            <div className="space-y-2">
              <label className="text-[10px] text-muted-foreground uppercase block font-bold">Fundo do Botão</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={btnSecondaryBg}
                  onChange={(e) => {
                    setBtnSecondaryBg(e.target.value);
                    applyAndSave({ btnSecondaryBg: e.target.value });
                  }}
                  className="h-8 w-10 rounded border border-border cursor-pointer bg-transparent"
                />
                <span className="font-bold text-foreground uppercase">{btnSecondaryBg}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] text-muted-foreground uppercase block font-bold">Texto do Botão</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={btnSecondaryText}
                  onChange={(e) => {
                    setBtnSecondaryText(e.target.value);
                    applyAndSave({ btnSecondaryText: e.target.value });
                  }}
                  className="h-8 w-10 rounded border border-border cursor-pointer bg-transparent"
                />
                <span className="font-bold text-foreground uppercase">{btnSecondaryText}</span>
              </div>
            </div>
          </div>

          {/* BOTÃO PERIGO / AÇÃO CRÍTICA */}
          <div className="space-y-3 bg-secondary/40 border border-border p-4 rounded-xl">
            <h3 className="font-bold text-foreground uppercase flex items-center justify-between">
              <span>Botão Perigo (Eliminar)</span>
              <span
                className="px-2.5 py-1 rounded text-[10px] font-bold text-white"
                style={{ backgroundColor: btnDangerBg }}
              >
                Eliminar
              </span>
            </h3>
            <div className="space-y-2">
              <label className="text-[10px] text-muted-foreground uppercase block font-bold">Cor do Botão</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={btnDangerBg}
                  onChange={(e) => {
                    setBtnDangerBg(e.target.value);
                    applyAndSave({ btnDangerBg: e.target.value });
                  }}
                  className="h-8 w-10 rounded border border-border cursor-pointer bg-transparent"
                />
                <span className="font-bold text-foreground uppercase">{btnDangerBg}</span>
              </div>
            </div>
            <p className="text-[10px] text-muted-foreground">Usado em eliminação e ações de perigo.</p>
          </div>
        </div>
      </div>

      {/* PAINEL 2: 🔤 TIPOGRAFIA GOOGLE FONTS */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary block">
              GOOGLE FONTS OFICIAIS
            </span>
            <h2 className="font-display text-lg uppercase text-foreground">Fonte Oficial do Site</h2>
          </div>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-mono font-bold">
            Fonte Ativa: {googleFont}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          {GOOGLE_FONTS.map((font) => {
            const isSelected = googleFont === font.id;
            return (
              <button
                key={font.id}
                type="button"
                onClick={() => {
                  setGoogleFont(font.id);
                  updateSettings({ googleFont: font.id });
                }}
                className={`p-4 rounded-xl border text-left space-y-3 transition-all ${
                  isSelected
                    ? "bg-primary/10 border-primary text-foreground shadow-sm ring-2 ring-primary/30"
                    : "bg-secondary/40 border-border text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs flex items-center gap-1.5 text-foreground">
                    <Type size={14} className="text-primary" /> {font.name}
                  </span>
                  {isSelected && <Check size={16} className="text-primary" />}
                </div>

                <div className="bg-card border border-border p-3 rounded-lg overflow-hidden">
                  <p
                    className="text-sm font-bold text-foreground truncate"
                    style={{ fontFamily: `'${font.id}', sans-serif` }}
                  >
                    {font.sample}
                  </p>
                </div>

                <span className="text-[10px] text-muted-foreground block uppercase font-mono">
                  Google Font · {font.category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* PAINEL 3: 🔤 CORES DE FONTES & TEXTO DO SITE */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-5">
        <div className="border-b border-border pb-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary block">
            TIPOGRAFIA DO SITE
          </span>
          <h2 className="font-display text-lg uppercase text-foreground flex items-center gap-2">
            <Type size={18} className="text-primary" /> Cores de Texto do Site
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 font-mono text-xs">
          {/* Cor do Texto Principal */}
          <div className="space-y-2">
            <label className="font-bold uppercase text-muted-foreground block">Texto Principal</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={textColor}
                onChange={(e) => {
                  setTextColor(e.target.value);
                  applyAndSave({ textColor: e.target.value });
                }}
                className="h-10 w-12 rounded border border-border cursor-pointer bg-transparent"
              />
              <span className="font-bold text-foreground uppercase">{textColor}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Cor do corpo do texto e notícias.</p>
          </div>

          {/* Cor do Texto Secundário */}
          <div className="space-y-2">
            <label className="font-bold uppercase text-muted-foreground block">Texto Secundário / Descrições</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={textMutedColor}
                onChange={(e) => {
                  setTextMutedColor(e.target.value);
                  applyAndSave({ textMutedColor: e.target.value });
                }}
                className="h-10 w-12 rounded border border-border cursor-pointer bg-transparent"
              />
              <span className="font-bold text-foreground uppercase">{textMutedColor}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Subtítulos, datas e notas de rodapé.</p>
          </div>

          {/* Cor dos Títulos */}
          <div className="space-y-2">
            <label className="font-bold uppercase text-muted-foreground block">Títulos Principais (H1/H2)</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={headingColor}
                onChange={(e) => {
                  setHeadingColor(e.target.value);
                  applyAndSave({ headingColor: e.target.value });
                }}
                className="h-10 w-12 rounded border border-border cursor-pointer bg-transparent"
              />
              <span className="font-bold text-foreground uppercase">{headingColor}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Títulos principais de secções.</p>
          </div>

          {/* Cor dos Links */}
          <div className="space-y-2">
            <label className="font-bold uppercase text-muted-foreground block">Links & Destaque Hover</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={linkColor}
                onChange={(e) => {
                  setLinkColor(e.target.value);
                  applyAndSave({ linkColor: e.target.value });
                }}
                className="h-10 w-12 rounded border border-border cursor-pointer bg-transparent"
              />
              <span className="font-bold text-foreground uppercase">{linkColor}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Hiperlinks e texto com interação cursor.</p>
          </div>
        </div>
      </div>

      {/* PAINEL 4: 🚀 CORES DOS CTAS & APELO À AÇÃO */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-5">
        <div className="border-b border-border pb-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary block">
            BANNERS DE APELO À AÇÃO
          </span>
          <h2 className="font-display text-lg uppercase text-foreground flex items-center gap-2">
            <Layers size={18} className="text-primary" /> Cores dos CTAs & Banners de Destaque
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
          {/* Fundo do CTA */}
          <div className="space-y-2">
            <label className="font-bold uppercase text-muted-foreground block">Fundo dos Blocos CTA</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={ctaBgColor}
                onChange={(e) => {
                  setCtaBgColor(e.target.value);
                  applyAndSave({ ctaBgColor: e.target.value });
                }}
                className="h-10 w-12 rounded border border-border cursor-pointer bg-transparent"
              />
              <span className="font-bold text-foreground uppercase">{ctaBgColor}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Blocos de destaque (ex: "Seja Sócio").</p>
          </div>

          {/* Texto do CTA */}
          <div className="space-y-2">
            <label className="font-bold uppercase text-muted-foreground block">Texto nos Blocos CTA</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={ctaTextColor}
                onChange={(e) => {
                  setCtaTextColor(e.target.value);
                  applyAndSave({ ctaTextColor: e.target.value });
                }}
                className="h-10 w-12 rounded border border-border cursor-pointer bg-transparent"
              />
              <span className="font-bold text-foreground uppercase">{ctaTextColor}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Fontes dentro dos blocos CTA.</p>
          </div>

          {/* Accent Color */}
          <div className="space-y-2">
            <label className="font-bold uppercase text-muted-foreground block">Cor Accent / Destaque Secundário</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={accentColor}
                onChange={(e) => {
                  setAccentColor(e.target.value);
                  applyAndSave({ accentColor: e.target.value });
                }}
                className="h-10 w-12 rounded border border-border cursor-pointer bg-transparent"
              />
              <span className="font-bold text-foreground uppercase">{accentColor}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Etiquetas, badges e detalhes reluzentes.</p>
          </div>
        </div>
      </div>

      {/* PAINEL 5: 🖼️ CORES DE FUNDO & SUPERFÍCIES DO SITE */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-5">
        <div className="border-b border-border pb-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary block">
            ESTRUTURA E SUPERFÍCIES
          </span>
          <h2 className="font-display text-lg uppercase text-foreground flex items-center gap-2">
            <Layout size={18} className="text-primary" /> Cores de Fundo & Superfícies do Site
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
          {/* Fundo do Site */}
          <div className="space-y-2">
            <label className="font-bold uppercase text-muted-foreground block">Fundo Principal da Página</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => {
                  setBgColor(e.target.value);
                  applyAndSave({ bgColor: e.target.value });
                }}
                className="h-10 w-12 rounded border border-border cursor-pointer bg-transparent"
              />
              <span className="font-bold text-foreground uppercase">{bgColor}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Cor de fundo oficial do site.</p>
          </div>

          {/* Fundo dos Cartões */}
          <div className="space-y-2">
            <label className="font-bold uppercase text-muted-foreground block">Fundo de Cartões & Módulos</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={cardBgColor}
                onChange={(e) => {
                  setCardBgColor(e.target.value);
                  applyAndSave({ cardBgColor: e.target.value });
                }}
                className="h-10 w-12 rounded border border-border cursor-pointer bg-transparent"
              />
              <span className="font-bold text-foreground uppercase">{cardBgColor}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Fundo de caixas, notícias e tabelas.</p>
          </div>

          {/* Bordas */}
          <div className="space-y-2">
            <label className="font-bold uppercase text-muted-foreground block">Bordas & Linhas Divisórias</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={borderColor}
                onChange={(e) => {
                  setBorderColor(e.target.value);
                  applyAndSave({ borderColor: e.target.value });
                }}
                className="h-10 w-12 rounded border border-border cursor-pointer bg-transparent"
              />
              <span className="font-bold text-foreground uppercase">{borderColor}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">Linhas de contorno do site.</p>
          </div>
        </div>
      </div>

      {/* PAINEL 6: 📑 CORES DA BARRA DE NAVEGAÇÃO DO SITE (HEADER) */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-5">
        <div className="border-b border-border pb-3">
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary block">
            BARRA DE NAVEGAÇÃO SUPERIOR
          </span>
          <h2 className="font-display text-lg uppercase text-foreground flex items-center gap-2">
            <Shield size={18} className="text-primary" /> Cores do Menu do Site (Navbar)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
          {/* Header Fundo */}
          <div className="space-y-2">
            <label className="font-bold uppercase text-muted-foreground block">Fundo do Header Superior</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={headerBgColor}
                onChange={(e) => {
                  setHeaderBgColor(e.target.value);
                  applyAndSave({ headerBgColor: e.target.value });
                }}
                className="h-10 w-12 rounded border border-border cursor-pointer bg-transparent"
              />
              <span className="font-bold text-foreground uppercase">{headerBgColor}</span>
            </div>
          </div>

          {/* Header Texto */}
          <div className="space-y-2">
            <label className="font-bold uppercase text-muted-foreground block">Texto do Menu Superior</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={headerTextColor}
                onChange={(e) => {
                  setHeaderTextColor(e.target.value);
                  applyAndSave({ headerTextColor: e.target.value });
                }}
                className="h-10 w-12 rounded border border-border cursor-pointer bg-transparent"
              />
              <span className="font-bold text-foreground uppercase">{headerTextColor}</span>
            </div>
          </div>

          {/* Header Hover */}
          <div className="space-y-2">
            <label className="font-bold uppercase text-muted-foreground block">Destaque Hover no Menu</label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={headerHoverColor}
                onChange={(e) => {
                  setHeaderHoverColor(e.target.value);
                  applyAndSave({ headerHoverColor: e.target.value });
                }}
                className="h-10 w-12 rounded border border-border cursor-pointer bg-transparent"
              />
              <span className="font-bold text-foreground uppercase">{headerHoverColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* PAINEL 7: 🔒 FICHEIROS FIXOS DO SITE */}
      <div className="bg-card border-2 border-primary/30 rounded-xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
              <Lock size={12} /> Local Exclusivo de Alteração
            </span>
            <h2 className="font-display text-lg uppercase text-foreground">
              Ficheiros Fixos do Site (Logo & Hero Estádio)
            </h2>
          </div>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-mono font-bold">
            Pasta: site_static
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Logo Oficial do Clube */}
          <div className="bg-secondary/40 border border-border rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Shield size={16} className="text-primary" /> Logótipo Oficial do Clube
              </h3>
              <span className="text-[10px] font-mono text-muted-foreground uppercase">Formato PNG / SVG</span>
            </div>

            <div className="h-32 bg-card border border-border rounded-lg flex items-center justify-center p-4">
              <img src={logoUrl} alt="Logo CD Aves" className="max-h-full max-w-full object-contain" />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold text-muted-foreground uppercase">
                Alterar Logótipo Oficial
              </label>
              <div className="flex items-center gap-2">
                <label className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-xs font-mono text-foreground cursor-pointer hover:bg-secondary flex items-center justify-center gap-2">
                  <Upload size={14} className="text-primary" />
                  <span>Carregar Novo Logótipo</span>
                  <input
                    type="file"
                    accept="image/png,image/svg+xml,image/jpeg"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileChange("logo", file);
                    }}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Fotografia Hero do Estádio */}
          <div className="bg-secondary/40 border border-border rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <ImageIcon size={16} className="text-primary" /> Imagem Hero do Estádio
              </h3>
              <span className="text-[10px] font-mono text-muted-foreground uppercase">Alta Resolução JPG</span>
            </div>

            <div className="h-32 bg-card border border-border rounded-lg flex items-center justify-center p-2 overflow-hidden">
              <img src={heroUrl} alt="Estádio Hero" className="h-full w-full object-cover rounded" />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold text-muted-foreground uppercase">
                Alterar Imagem Hero da Homepage
              </label>
              <div className="flex items-center gap-2">
                <label className="flex-1 bg-background border border-border rounded-md px-3 py-2 text-xs font-mono text-foreground cursor-pointer hover:bg-secondary flex items-center justify-center gap-2">
                  <Upload size={14} className="text-primary" />
                  <span>Carregar Nova Imagem Hero</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileChange("hero", file);
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
}
