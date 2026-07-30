import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHeader } from "@/components/site/PageHeader";
import { CTA } from "@/components/site/CTA";
import { MODALIDADES } from "@/data/club";

export const Route = createFileRoute("/modalidades")({
  head: () => ({
    meta: [
      { title: "Modalidades — CD Aurirrubro" },
      { name: "description", content: "Futsal, andebol, basquetebol, atletismo, natação e ténis de mesa no CD Aurirrubro." },
      { property: "og:title", content: "Modalidades — CD Aurirrubro" },
      { property: "og:description", content: "Seis modalidades e centenas de atletas com o mesmo emblema." },
    ],
  }),
  component: Modalidades,
});

function Modalidades() {
  return (
    <main>
      <PageHeader eyebrow="Departamentos" title="Modalidades" text="Um clube eclético, com competição e formação em seis modalidades." />
      <Breadcrumbs items={[{ label: "Modalidades" }]} />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MODALIDADES.map((m) => (
            <article key={m.name} className="border border-border p-7 transition-colors hover:border-primary">
              <p className="font-display text-5xl leading-none text-accent">{m.athletes}</p>
              <h2 className="mt-4 font-display text-2xl uppercase">{m.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{m.desc}</p>
              <p className="mt-4 text-[11px] uppercase tracking-widest text-primary">Atletas inscritos</p>
            </article>
          ))}
        </div>
      </section>

      <CTA
        eyebrow="Inscrições abertas"
        title="Treina no clube da tua cidade"
        text="Sócios têm mensalidades reduzidas em todas as escolas de formação das modalidades."
        action="Ser sócio e inscrever"
        to="/socios"
        variant="gold"
      />
    </main>
  );
}
