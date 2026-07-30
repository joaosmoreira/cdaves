import { createFileRoute, Link } from "@tanstack/react-router";
import { Handshake, Megaphone, Ticket } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { PARTNERS } from "@/data/club";

export const Route = createFileRoute("/corporate")({
  head: () => ({
    meta: [
      { title: "Corporate — Parceiros e Patrocínios · CD Aurirrubro" },
      { name: "description", content: "Parcerias, patrocínios e hospitalidade empresarial no CD Aurirrubro. Associe a sua marca ao clube." },
      { property: "og:title", content: "Corporate — Parceiros e Patrocínios · CD Aurirrubro" },
      { property: "og:description", content: "Ative a sua marca junto de milhares de adeptos todas as semanas." },
    ],
  }),
  component: Corporate,
});

function Corporate() {
  return (
    <main>
      <PageHeader eyebrow="Corporate" title="Parceiros e Patrocínios" text="As marcas que caminham connosco e as oportunidades para a sua empresa." />
      <Breadcrumbs items={[{ label: "Corporate" }]} />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="font-display text-2xl uppercase">Os nossos parceiros</h2>
        <div className="mt-8 grid grid-cols-2 gap-px bg-border md:grid-cols-4">
          {PARTNERS.map((p) => (
            <div key={p.name} className="bg-background p-8 text-center">
              <p className="font-display text-xl uppercase leading-none">{p.name}</p>
              <p className="mt-2 text-[11px] uppercase tracking-widest text-primary">{p.tier}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-16 font-display text-2xl uppercase">Como podemos trabalhar juntos</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { icon: Megaphone, title: "Visibilidade", text: "Publicidade LED, backdrop de imprensa, redes sociais e conteúdos digitais do clube." },
            { icon: Ticket, title: "Hospitalidade", text: "Camarotes, business seats e experiências de jogo para clientes e equipas." },
            { icon: Handshake, title: "Comunidade", text: "Projetos conjuntos com a academia e ações de responsabilidade social." },
          ].map((c) => (
            <div key={c.title} className="border border-border p-7">
              <c.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-display text-xl uppercase">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-14 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] opacity-70">Torne-se parceiro</p>
            <h2 className="mt-2 font-display text-3xl uppercase leading-none md:text-5xl">A sua marca no nosso emblema</h2>
            <p className="mt-3 text-sm opacity-80">Peça o dossier comercial 2026/27 e conheça todos os pacotes disponíveis.</p>
          </div>
          <Button asChild variant="gold" size="lg">
            <Link to="/contactos">Pedir dossier comercial</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
