import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTA, NewsletterCTA } from "@/components/site/CTA";
import { NEWS, type NewsItem } from "@/data/club";
import { useAdmin, getState, Row } from "@/admin/store";
import { formatDateDDMMYYYY } from "@/lib/formatters";

function getEmbedVideoUrl(url: string): string {
  if (!url) return "";
  if (url.includes("youtube.com/watch?v=")) {
    const id = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("vimeo.com/")) {
    const id = url.split("vimeo.com/")[1]?.split("?")[0];
    return `https://player.vimeo.com/video/${id}`;
  }
  return url;
}

export const Route = createFileRoute("/noticias/$slug")({
  loader: ({ params }) => {
    const item = NEWS.find((n) => n.slug === params.slug);
    // Also check the admin store for articles created or edited there
    let fromStore: any = undefined;
    try {
      const storeNoticias = getState().noticias ?? [];
      fromStore = storeNoticias.find((n: Row) => String(n.slug) === params.slug || String(n.id) === params.slug);
    } catch (_) {
      // store may not be hydrated in SSR context
    }
    if (!item && !fromStore) throw notFound();
    return { item, slug: params.slug };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Notícia indisponível · CD Aves" }, { name: "robots", content: "noindex" }] };
    }
    const { item, slug } = loaderData;
    const storeNoticias = getState().noticias ?? [];
    const fromStore = storeNoticias.find((n: Row) => String(n.slug) === slug || String(n.id) === slug);
    const title = String(fromStore?.titulo ?? item?.title ?? "Notícia CD Aves");
    const excerpt = String(fromStore?.resumo ?? item?.excerpt ?? "");

    return {
      meta: [
        { title: `${title} · CD Aves` },
        { name: "description", content: excerpt },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:title", content: title },
        { property: "og:description", content: excerpt },
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
  const { item, slug } = Route.useLoaderData() as { item?: NewsItem; slug: string };
  const storeNoticias = useAdmin((s) => s.noticias ?? []);
  const fromStore = storeNoticias.find((n: Row) => String(n.slug) === slug || String(n.id) === slug);

  const title = String(fromStore?.titulo ?? item?.title ?? "Notícia CD Aves");
  const category = String(fromStore?.categoria ?? item?.category ?? "Equipa A");
  const date = formatDateDDMMYYYY(String(fromStore?.data ?? item?.date ?? ""));
  const image = String(fromStore?.imagem_capa || item?.image || "");
  const excerpt = String(fromStore?.resumo ?? item?.excerpt ?? "");
  const kind = (item?.kind ?? "geral") as keyof typeof KIND_LABEL;

  const related = NEWS.filter((n) => n.slug !== slug).slice(0, 3);

  // Parse dos blocos ricos do artigo
  let blocks: any[] = [];
  try {
    if (fromStore?.conteudo_blocos) {
      const parsed = JSON.parse(String(fromStore.conteudo_blocos));
      if (Array.isArray(parsed)) blocks = parsed;
    }
  } catch (e) {
    console.error("Erro ao analisar blocos de conteúdo:", e);
  }
  // Fallback: usar blocks directamente do NEWS (evita dependência do store estar hidratado)
  if (blocks.length === 0 && item?.blocks?.length) {
    blocks = item.blocks;
  }

  return (
    <main>
      <section className="relative">
        <img
          src={image}
          alt={title}
          width={1600}
          height={900}
          className="h-[46vh] min-h-[280px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-4xl px-4 pb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
            {KIND_LABEL[kind]} · {category} · {date}
          </p>
          <h1 className="mt-3 font-display text-3xl uppercase leading-[0.95] text-background md:text-5xl">{title}</h1>
        </div>
      </section>

      <Breadcrumbs items={[{ label: "Notícias", to: "/noticias" }, { label: title }]} />

      <article className="mx-auto max-w-4xl px-4 py-14">
        {item?.kind === "jogo" && item.match && (
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

        {kind === "administracao" && (
          <p className="mb-8 border-l-4 border-primary bg-secondary/60 p-5 text-sm">
            Comunicado emitido pela Direção do Clube Desportivo das Aves. Documentação complementar disponível na
            secretaria e na área Institucional.
          </p>
        )}

        <p className="font-display text-xl uppercase leading-tight md:text-2xl">{excerpt}</p>

        {/* RENDERIZAÇÃO DOS BLOCOS DO ARTIGO (FORMATO WORDPRESS) */}
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground font-sans">
          {blocks.length > 0
            ? blocks.map((b, i) => {
                if (b.type === "heading") {
                  return (
                    <h2 key={i} className="font-display text-2xl uppercase leading-tight text-foreground pt-4 border-t border-border/40">
                      {b.text}
                    </h2>
                  );
                }
                if (b.type === "image" && b.url) {
                  return (
                    <figure key={i} className="my-6 space-y-2">
                      <img src={b.url} alt={b.caption || ""} className="w-full rounded-xl border border-border object-cover max-h-[500px]" />
                      {b.caption && (
                        <figcaption className="text-center text-xs italic font-mono text-muted-foreground">
                          {b.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }
                if (b.type === "video" && b.url) {
                  const embedUrl = getEmbedVideoUrl(b.url);
                  return (
                    <div key={i} className="my-8 space-y-2">
                      <div className="aspect-video w-full max-w-3xl mx-auto bg-black rounded-xl overflow-hidden shadow-lg border border-border">
                        <iframe
                          src={embedUrl}
                          title={b.title || "Vídeo do Jogo"}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      {b.title && (
                        <p className="text-center font-mono text-xs font-bold text-foreground">
                          🎬 {b.title}
                        </p>
                      )}
                    </div>
                  );
                }
                if (b.type === "quote") {
                  return (
                    <blockquote key={i} className="my-6 border-l-4 border-accent bg-secondary/40 p-5 rounded-r-xl italic space-y-1">
                      <p className="text-base text-foreground font-display uppercase tracking-wide">"{b.text}"</p>
                      {b.author && <cite className="block text-xs font-mono font-bold text-primary uppercase not-italic">— {b.author}</cite>}
                    </blockquote>
                  );
                }
                return (
                  <p key={i} className="leading-relaxed">
                    {b.text}
                  </p>
                );
              })
            : (item?.body ?? []).map((p, i) => <p key={i}>{p}</p>)}
        </div>

        {kind === "administracao" && (
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

      <NewsletterCTA />
    </main>
  );
}
