import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHeader } from "@/components/site/PageHeader";
import { NewsletterCTA } from "@/components/site/CTA";
import { NEWS } from "@/data/club";

export const Route = createFileRoute("/noticias/")({
  head: () => ({
    meta: [
      { title: "Notícias — CD Aurirrubro" },
      { name: "description", content: "Todas as notícias do CD Aurirrubro: relatos de jogo, vida do clube e comunicados oficiais da administração." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Notícias — CD Aurirrubro" },
      { property: "og:description", content: "Acompanha o dia a dia do clube, jogo a jogo." },
    ],
  }),
  component: Noticias,
});

const KIND_LABEL = { jogo: "Jogo", geral: "Notícia", administracao: "Comunicado" } as const;

function Noticias() {
  const [lead, ...rest] = NEWS;
  return (
    <main>
      <PageHeader eyebrow="Sala de Imprensa" title="Notícias" text="Tudo o que acontece no clube, primeiro aqui." />
      <Breadcrumbs items={[{ label: "Notícias" }]} />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <Link to="/noticias/$slug" params={{ slug: lead.slug }} className="group block border border-border transition-colors hover:border-primary">
          <img src={lead.image} alt={lead.title} width={1600} height={900} className="h-[38vh] min-h-[240px] w-full object-cover" />
          <div className="p-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
              {KIND_LABEL[lead.kind]} · {lead.category} · {lead.date}
            </p>
            <h2 className="mt-3 font-display text-3xl uppercase leading-tight md:text-5xl">{lead.title}</h2>
            <p className="mt-4 max-w-3xl text-muted-foreground">{lead.excerpt}</p>
          </div>
        </Link>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((n) => (
            <Link
              key={n.slug}
              to="/noticias/$slug"
              params={{ slug: n.slug }}
              className="group border border-border transition-colors hover:border-primary"
            >
              <img src={n.image} alt={n.title} width={1600} height={900} loading="lazy" className="h-44 w-full object-cover" />
              <div className="p-6">
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary">
                  {KIND_LABEL[n.kind]} · {n.category} · {n.date}
                </p>
                <h3 className="mt-3 font-display text-xl uppercase leading-tight">{n.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <NewsletterCTA />
    </main>
  );
}
