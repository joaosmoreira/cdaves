import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdmin } from "@/admin/store";

type Props = {
  eyebrow?: string;
  title?: string;
  text?: string;
  action?: string;
  to?: string;
  variant?: "primary" | "gold" | "dark";
  slug?: string;
};

const bgClasses = {
  primary: "bg-primary text-primary-foreground",
  gold: "bg-accent text-accent-foreground",
  dark: "bg-foreground text-background",
};

export function CTA({ eyebrow, title, text, action, to = "/socios", variant = "primary", slug = "lugar-anual" }: Props) {
  const ctas = useAdmin((s) => s.ctas ?? []);
  const ctaData = ctas.find((c) => String(c.slug) === slug);

  // Valores de texto (leitura dinâmica ou fallback para props originais)
  const displayEyebrow = String(ctaData?.eyebrow ?? eyebrow ?? "CD Aves");
  const displayTitle = String(ctaData?.titulo ?? title ?? "Garante o teu lugar na bancada");
  const displayText = String(ctaData?.descricao ?? text ?? "");
  const displayAction = String(ctaData?.textoBotao ?? action ?? "Saber Mais");
  const displayTo = String(ctaData?.linkBotao ?? to);

  // Apenas aplica estilos inline quando usCoresCustomizadas === "sim"
  const isCustom = String(ctaData?.usarCoresCustomizadas) === "sim";
  const customBg = String(ctaData?.corFundo ?? "");
  const customText = String(ctaData?.corTexto ?? "");
  const customBtnBg = String(ctaData?.corBotaoFundo ?? "");
  const customBtnText = String(ctaData?.corBotaoTexto ?? "");

  return (
    <section
      className={`relative overflow-hidden ${!isCustom ? bgClasses[variant] : ""}`}
      style={isCustom ? { backgroundColor: customBg, color: customText } : undefined}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-14 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] opacity-80">{displayEyebrow}</p>
          <h2 className="mt-2 font-display text-3xl uppercase leading-none tracking-tight md:text-5xl">{displayTitle}</h2>
          <p className="mt-3 text-sm opacity-90 md:text-base">{displayText}</p>
        </div>

        <Button
          asChild
          variant={isCustom ? undefined : variant === "gold" ? "default" : "gold"}
          size="lg"
          className="shrink-0"
          style={isCustom ? { backgroundColor: customBtnBg, color: customBtnText } : undefined}
        >
          <Link to={displayTo}>{displayAction}</Link>
        </Button>
      </div>
    </section>
  );
}

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const ctas = useAdmin((s) => s.ctas ?? []);
  const ctaData = ctas.find((c) => String(c.slug) === "newsletter");

  const displayEyebrow = String(ctaData?.eyebrow ?? "Newsletter");
  const displayTitle = String(ctaData?.titulo ?? "Recebe as notícias primeiro");
  const displayText = String(ctaData?.descricao ?? "Convocatórias, bastidores e campanhas de sócio directamente no teu email.");
  const displayAction = String(ctaData?.textoBotao ?? "Subscrever");

  const isCustom = String(ctaData?.usarCoresCustomizadas) === "sim";
  const customBg = String(ctaData?.corFundo ?? "");
  const customText = String(ctaData?.corTexto ?? "");
  const customBtnBg = String(ctaData?.corBotaoFundo ?? "");
  const customBtnText = String(ctaData?.corBotaoTexto ?? "");

  return (
    <section
      className={!isCustom ? "bg-foreground text-background" : ""}
      style={isCustom ? { backgroundColor: customBg, color: customText } : undefined}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-14 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] opacity-70">{displayEyebrow}</p>
          <h2 className="mt-2 font-display text-3xl uppercase leading-none tracking-tight md:text-5xl">
            {displayTitle}
          </h2>
          <p className="mt-3 text-sm opacity-80">
            {displayText}
          </p>
        </div>
        <form
          className="flex w-full max-w-md gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!email) return;
            toast.success("Subscrição registada!", { description: `Enviámos uma confirmação para ${email}.` });
            setEmail("");
          }}
        >
          <Input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="o.teu@email.pt"
            className="h-12 border-background/30 bg-background/10 text-background placeholder:text-background/50"
          />
          <Button
            type="submit"
            variant={isCustom ? undefined : "gold"}
            size="lg"
            style={isCustom ? { backgroundColor: customBtnBg, color: customBtnText } : undefined}
          >
            {displayAction}
          </Button>
        </form>
      </div>
    </section>
  );
}
