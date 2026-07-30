import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHeader } from "@/components/site/PageHeader";
import { NewsletterCTA } from "@/components/site/CTA";
import { NEWS } from "@/data/club";

export const Route = createFileRoute("/noticias")({
  head: () => ({
    meta: [
      { title: "Notícias — CD Aurirrubro" },
      { name: "description", content: "Todas as notícias do CD Aurirrubro: equipa A, formação, modalidades e vida do clube." },
      { property: "og:title", content: "Notícias — CD Aurirrubro" },
      { property: "og:description", content: "Acompanha o dia a dia do clube, jogo a jogo." },
    ],
  }),
  component: Noticias,
});

function Noticias() {
  const [lead, ...rest] = NEWS;
  return (
    <main>
      <PageHeader eyebrow="Sala de Imprensa" title="Notícias" text="Tudo o que acontece no clube, primeiro aqui." />
      <Breadcrumbs items={[{ label: "Notícias" }]} />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <article className="border border-border">
          <div className="h-2 w-full bg-accent" />
          <div className="p-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary">{lead.category} · {lead.date}</p>
            <h2 className="mt-3 font-display text-3xl uppercase leading-tight md:text-5xl">{lead.title}</h2>
            <p className="mt-4 max-w-3xl text-muted-foreground">{lead.excerpt}</p>
          </div>
        </article>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((n) => (
            <article key={n.slug} className="border border-border p-6 transition-colors hover:border-primary">
              <p className="text-[11px] font-bold uppercase tracking-widest text-primary">{n.category} · {n.date}</p>
              <h3 className="mt-3 font-display text-xl uppercase leading-tight">{n.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
            </article>
          ))}
        </div>
      </section>

      <NewsletterCTA />
    </main>
  );
}
