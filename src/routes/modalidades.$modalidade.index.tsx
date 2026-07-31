import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHeader } from "@/components/site/PageHeader";
import { CTA } from "@/components/site/CTA";
import { MODALIDADES, type Athlete } from "@/data/club";

export const Route = createFileRoute("/modalidades/$modalidade/")({
  loader: ({ params }) => {
    const modalidade = MODALIDADES.find((m) => m.slug === params.modalidade);
    if (!modalidade) throw notFound();
    return { modalidade };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.modalidade.name ?? "Modalidade";
    const title = `${name} — Equipa e atletas · CD Aves`;
    const desc = `Plantel de ${name} do CD Aves: atletas, posições, idades e equipa técnica.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: ModalidadeEquipa,
});

function ModalidadeEquipa() {
  const { modalidade } = Route.useLoaderData();

  return (
    <main>
      <PageHeader
        eyebrow={modalidade.competition}
        title={modalidade.name}
        text={`Treinador: ${modalidade.coach} · ${modalidade.venue} · ${modalidade.athletes} atletas inscritos`}
      />
      <Breadcrumbs items={[{ label: "Modalidades", to: "/modalidades" }, { label: modalidade.name }]} />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="mb-6 border-b-2 border-primary pb-2 font-display text-2xl uppercase">Plantel sénior</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {modalidade.roster.map((a: Athlete) => (
            <Link
              key={a.slug}
              to="/modalidades/$modalidade/$atleta"
              params={{ modalidade: modalidade.slug, atleta: a.slug }}
              className="group relative block overflow-hidden border border-border bg-secondary"
            >
              <img
                src={a.photo}
                alt={`Fotografia de ${a.name}`}
                width={800}
                height={1000}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-0 top-0 bg-primary px-3 py-1 font-display text-xl text-primary-foreground">
                {a.number}
              </span>
              <div className="bg-background p-4">
                <h3 className="font-display text-lg uppercase leading-none">{a.name}</h3>
                <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                  {a.position} · {a.age} anos
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTA
        eyebrow="Lugar Anual Clube Total"
        title="Vê todas as modalidades no pavilhão"
        text="O lugar anual Clube Total dá acesso a todas as competições do clube com bilhete pago."
        action="Ver lugar anual"
        to="/socios"
      />
    </main>
  );
}
