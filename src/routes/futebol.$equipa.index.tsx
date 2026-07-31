import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHeader } from "@/components/site/PageHeader";
import { CTA } from "@/components/site/CTA";
import { SQUAD, TEAMS } from "@/data/club";

export const Route = createFileRoute("/futebol/$equipa/")({
  loader: ({ params }) => {
    const team = TEAMS.find((t) => t.slug === params.equipa);
    if (!team) throw notFound();
    return { team };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.team.name ?? "Plantel";
    return {
      meta: [
        { title: `${name} — Plantel · CD Aves` },
        { name: "description", content: `Plantel completo da ${name} do CD Aves com idades, posições e números.` },
        { property: "og:title", content: `${name} — Plantel · CD Aves` },
        { property: "og:description", content: `Fotos e dados de todos os jogadores da ${name}.` },
      ],
    };
  },
  component: Plantel,
});

function Plantel() {
  const { team } = Route.useLoaderData();
  const groups = ["Guarda-redes", "Defesa", "Médio", "Extremo", "Avançado"];

  return (
    <main>
      <PageHeader
        eyebrow={team.competition}
        title={team.name}
        text={`Treinador: ${team.coach} · Época 2026/27`}
      />
      <Breadcrumbs items={[{ label: "Futebol", to: "/futebol" }, { label: team.name }]} />

      <section className="mx-auto max-w-7xl px-4 py-14">
        {groups.map((g) => {
          const players = SQUAD.filter((p) => p.position.startsWith(g) || (g === "Defesa" && p.position.includes("Lateral")));
          if (!players.length) return null;
          return (
            <div key={g} className="mb-12">
              <h2 className="mb-6 border-b-2 border-primary pb-2 font-display text-2xl uppercase">{g}s</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {players.map((p) => (
                  <Link
                    key={p.slug}
                    to="/futebol/$equipa/$jogador"
                    params={{ equipa: team.slug, jogador: p.slug }}
                    className="group relative block overflow-hidden border border-border bg-secondary"
                  >
                    <img
                      src={p.photo}
                      alt={`Fotografia de ${p.name}`}
                      width={800}
                      height={1000}
                      loading="lazy"
                      className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-0 top-0 bg-primary px-3 py-1 font-display text-xl text-primary-foreground">
                      {p.number}
                    </span>
                    <div className="bg-background p-4">
                      <h3 className="font-display text-lg uppercase leading-none">{p.name}</h3>
                      <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                        {p.position} · {p.age} anos
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <CTA
        eyebrow="Lugar Anual"
        title="Vê-os jogar em todos os jogos"
        text="Com o lugar anual poupas até 35% face ao bilhete jogo a jogo."
        action="Comprar Lugar Anual"
        to="/socios"
        variant="gold"
      />
    </main>
  );
}
