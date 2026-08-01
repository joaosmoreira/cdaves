import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import teamImg from "@/assets/team-photo.jpg";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHeader } from "@/components/site/PageHeader";
import { CTA } from "@/components/site/CTA";
import { TEAMS } from "@/data/club";

export const Route = createFileRoute("/futebol/")({
  head: () => ({
    meta: [
      { title: "Futebol — Equipas do CD Aves" },
      { name: "description", content: "Equipa A, Sub-23, Sub-19 e equipa feminina do CD Aves. Plantéis, treinadores e competições." },
      { property: "og:title", content: "Futebol — Equipas do CD Aves" },
      { property: "og:description", content: "Conhece todos os plantéis de futebol do clube." },
    ],
  }),
  component: Futebol,
});

function Futebol() {
  return (
    <main>
      <PageHeader eyebrow="Departamento de Futebol" title="Equipas" text="Do plantel principal à formação, o mesmo emblema ao peito." />
      <Breadcrumbs items={[{ label: "Futebol" }]} />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <img
          src={teamImg}
          alt="Equipa principal do CD Aves"
          width={1600}
          height={900}
          loading="lazy"
          className="mb-12 h-64 w-full object-cover md:h-96"
        />
        <div className="grid gap-6 md:grid-cols-2">
          {TEAMS.map((t) => (
            <Link
              key={t.slug}
              to="/futebol/$equipa"
              params={{ equipa: t.slug }}
              className="group flex items-center justify-between border border-border p-8 transition-colors hover:border-primary"
            >
              <div>
                <h2 className="font-display text-2xl uppercase md:text-3xl">{t.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{t.competition}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  Treinador: {t.coach} · {t.players} atletas
                </p>
              </div>
              <ArrowRight className="h-6 w-6 text-primary transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      <CTA
        slug="futebol-apoio"
        eyebrow="Apoia a equipa"
        title="Estádio cheio, equipa mais forte"
        text="Sócios têm acesso prioritário a bilhetes e descontos em todos os jogos em casa."
        action="Quero ser sócio"
        to="/socios"
        variant="primary"
      />
    </main>
  );
}
