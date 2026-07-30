import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTA, NewsletterCTA } from "@/components/site/CTA";
import { NEWS } from "@/data/club";

export const Route = createFileRoute("/noticias/$slug")({
  loader: ({ params }) => {
    const item = NEWS.find((n) => n.slug === params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Notícia indisponível · CD Aurirrubro" }, { name: "robots", content: "noindex" }] };
    }
    const { item } = loaderData;
    return {
      meta: [
        { title: `${item.title} · CD Aurirrubro` },
        { name: "description", content: item.excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:title", content: item.title },
        { property: "og:description", content: item.excerpt },
      ],
    };
  },
  notFoundComponent: NoticiaNotFound,
  component: Noticia,
});

function NoticiaNotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl uppercase">Notícia não encontrada</h1>
      <Link to="/noticias" className="mt-6 inline-block text-xs font-bold uppercase tracking-widest text-primary">
        Voltar às notícias
      </Link>
    </main>
  );
}

const KIND_LABEL = {
  jogo: "Relato de jogo",
  geral: "Notícia",
  administracao: "Comunicado oficial",
} as const;

function Noticia() {
  const { item } = Route.useLoaderData();
  const related = NEWS.filter((n) => n.slug !== item.slug && n.kind === item.kind).slice(0, 3);

  return (
    <main>
      <section className="relative">
        <img
          src={item.image}
          alt={item.title}
          width={1600}
          height={900}
          className="h-[46vh] min-h-[280px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-4 pb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
            {KIND_LABEL[item.kind]} · {item.category} · {item.date}
          </p>
          <h1 className="mt-3 font-display text-3xl uppercase leading-[0.95] text-background md:text-5xl">{item.title}</h1>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Notícias", to: "/noticias" }, { label: item.title }]} />

      <article className="mx-auto max-w-4xl px-4 py-14">
        {item.kind === "jogo" && item.match && (
          <div className="mb-10 border border-border">
            <div className="h-2 w-full bg-primary" />
            <div className="grid gap-6 p-7 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <p className="font-display text-2xl uppercase leading-none md:text-right">{item.match.home}</p>
              <p className="font-display text-5xl leading-none text-primary md:text-center">{item.match.score}</p>
              <p className="font-display text-2xl uppercase leading-none">{item.match.away}</p>
            </div>
            <div className="grid gap-4 border-t border-border p-7 text-sm md:grid-cols-3">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Competição</p>
                <p className="mt-1">{item.match.competition}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Estádio</p>
                <p className="mt-1">{item.match.venue}</p>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Marcadores</p>
                <ul className="mt-1 space-y-1">
                  {item.match.scorers.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {item.kind === "administracao" && (
          <p className="mb-8 border-l-4 border-primary bg-secondary/60 p-5 text-sm">
            Comunicado emitido pela Direção do {`Clube Desportivo Aurirrubro`}. Documentação complementar disponível na
            secretaria e na área Institucional.
          </p>
        )}

        <p className="font-display text-xl uppercase leading-tight md:text-2xl">{item.excerpt}</p>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
          {item.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        {item.kind === "administracao" && (
          <Link
            to="/clube/institucional"
            className="mt-8 inline-block text-xs font-bold uppercase tracking-widest text-primary"
          >
            Ver área institucional
          </Link>
        )}

        {related.length > 0 && (
          <div className="mt-14 border-t border-border pt-10">
            <h2 className="font-display text-2xl uppercase">Mais notícias</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {related.map((n) => (
                <Link
                  key={n.slug}
                  to="/noticias/$slug"
                  params={{ slug: n.slug }}
                  className="group border border-border transition-colors hover:border-primary"
                >
                  <img src={n.image} alt={n.title} width={1600} height={900} loading="lazy" className="h-36 w-full object-cover" />
                  <div className="p-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-primary">{n.date}</p>
                    <h3 className="mt-2 font-display text-lg uppercase leading-tight">{n.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>

      {item.kind === "jogo" ? (
        <CTA
          eyebrow="Lugar Anual 2026/27"
          title="Vê todos os jogos em casa"
          text="O mesmo lugar na bancada central coberta, época inteira."
          action="Comprar Lugar Anual"
          to="/socios"
        />
      ) : item.kind === "administracao" ? (
        <CTA
          eyebrow="Sê parte das decisões"
          title="Torna-te sócio do clube"
          text="Quota de 8€/mês com direito de voto na Assembleia Geral."
          action="Quero ser sócio"
          to="/socios"
        />
      ) : (
        <NewsletterCTA />
      )}
    </main>
  );
}
