import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  eyebrow: string;
  title: string;
  text: string;
  action: string;
  to?: string;
  variant?: "primary" | "gold" | "dark";
};

const bg = {
  primary: "bg-primary text-primary-foreground",
  gold: "bg-accent text-accent-foreground",
  dark: "bg-foreground text-background",
};

export function CTA({ eyebrow, title, text, action, to = "/socios", variant = "primary" }: Props) {
  return (
    <section className={`${bg[variant]} relative overflow-hidden`}>
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-14 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] opacity-70">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl uppercase leading-none tracking-tight md:text-5xl">{title}</h2>
          <p className="mt-3 text-sm opacity-90 md:text-base">{text}</p>
        </div>
        <Button asChild variant={variant === "gold" ? "default" : "gold"} size="lg" className="shrink-0">
          <Link to={to}>{action}</Link>
        </Button>
      </div>
    </section>
  );
}

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  return (
    <section className="bg-foreground text-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-14 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] opacity-70">Newsletter</p>
          <h2 className="mt-2 font-display text-3xl uppercase leading-none tracking-tight md:text-5xl">
            Recebe as notícias primeiro
          </h2>
          <p className="mt-3 text-sm opacity-80">
            Convocatórias, bastidores e campanhas de sócio directamente no teu email.
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
          <Button type="submit" variant="gold" size="lg">
            Subscrever
          </Button>
        </form>
      </div>
    </section>
  );
}
