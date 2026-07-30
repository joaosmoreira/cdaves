import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Landmark, ScrollText, UserRound } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHeader } from "@/components/site/PageHeader";
import { CTA } from "@/components/site/CTA";
import { CLUB } from "@/data/club";

export const Route = createFileRoute("/clube/")({
  head: () => ({
    meta: [
      { title: "O Clube — História, Estádio, Presidente e Institucional · CD Aurirrubro" },
      { name: "description", content: "Conhece o CD Aurirrubro: a história desde 1919, o estádio, a mensagem do presidente e toda a informação institucional." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "O Clube · CD Aurirrubro" },
      { property: "og:description", content: "História, estádio, presidente e informação institucional do clube." },
    ],
  }),
  component: ClubeIndex,
});

const SECTIONS = [
  { to: "/clube/historia", icon: ScrollText, label: "História", text: `Mais de um século de vida desportiva desde ${CLUB.founded}.` },
  { to: "/clube/estadio", icon: Landmark, label: "Estádio", text: `${CLUB.stadium}: bancadas, acessos e dias de jogo.` },
  { to: "/clube/presidente", icon: UserRound, label: "Presidente", text: "Mensagem aos sócios e prioridades do mandato." },
  { to: "/clube/institucional", icon: Building2, label: "Institucional", text: "Órgãos sociais, estatutos, assembleias e relatórios." },
] as const;

function ClubeIndex() {
  return (
    <main>
      <PageHeader eyebrow="O Clube" title="Clube" text="Tudo sobre a instituição: história, casa, liderança e informação oficial." />
      <Breadcrumbs items={[{ label: "Clube" }]} />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-px bg-border md:grid-cols-2">
          {SECTIONS.map((s) => (
            <Link key={s.to} to={s.to} className="group bg-background p-8 transition-colors hover:bg-secondary/60">
              <s.icon className="h-6 w-6 text-primary" />
              <h2 className="mt-4 font-display text-2xl uppercase leading-none">{s.label}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{s.text}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-primary">
                Abrir <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CTA
        eyebrow="Faz parte da instituição"
        title="Torna-te sócio do clube"
        text="8€ por mês, com direito de voto na Assembleia Geral e descontos em bilheteira."
        action="Quero ser sócio"
        to="/socios"
      />
    </main>
  );
}
