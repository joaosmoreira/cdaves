import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHeader } from "@/components/site/PageHeader";
import { useAdmin, Row } from "@/admin/store";

export const Route = createFileRoute("/$slug")({
  head: () => ({
    meta: [
      { title: "Página Oficial · CD Aves" },
      { name: "description", content: "Página oficial do Clube Desportivo das Aves." },
    ],
  }),
  loader: ({ params }) => {
    return { slug: params.slug };
  },
  component: TopLevelDynamicCustomPage,
});

function TopLevelDynamicCustomPage() {
  const { slug } = Route.useParams();
  const paginas = useAdmin((s) => s.paginas ?? []);

  const page = paginas.find(
    (p: Row) => String(p.slug).toLowerCase() === slug.toLowerCase() || String(p.id) === slug
  );

  if (!page) {
    return (
      <main className="py-24 text-center">
        <div className="mx-auto max-w-md px-4 space-y-4">
          <h1 className="font-display text-3xl uppercase text-foreground">Página Não Encontrada</h1>
          <p className="text-sm text-muted-foreground font-mono">
            A página "{slug}" não existe ou foi removida pelo administrador.
          </p>
        </div>
      </main>
    );
  }

  const titulo = String(page.titulo || "Página CD Aves");
  const resumo = String(page.resumo || "");
  const conteudo = String(page.conteudo || "");
  const eyebrow = String(page.categoria || page.eyebrow || "Páginas do Clube");

  return (
    <main>
      <PageHeader eyebrow={eyebrow} title={titulo} text={resumo} />
      <Breadcrumbs items={[{ label: "Páginas", to: "/clube" }, { label: titulo }]} />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="mx-auto max-w-4xl space-y-6 text-foreground font-sans text-base leading-relaxed">
          {conteudo.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="text-slate-800 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
