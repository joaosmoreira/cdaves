import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHeader } from "@/components/site/PageHeader";
import { CTA } from "@/components/site/CTA";
import { useAdmin, Row } from "@/admin/store";

export const Route = createFileRoute("/clube/historia")({
  head: () => ({
    meta: [
      { title: "História — Mais de um século de clube · CD Aves" },
      { name: "description", content: "A história do CD Aves desde 1930: fundação, títulos, momentos marcantes e a identidade vermelha e branca." },
      { property: "og:title", content: "História do CD Aves" },
      { property: "og:description", content: "Desde 1930 a escrever a história do vermelho e branco." },
    ],
  }),
  component: Historia,
});

const DEFAULT_MARCOS = [
  { ano: "1930", titulo: "Fundação", texto: "Fundado a 12 de novembro de 1930 em Vila das Aves por um grupo de entusiastas desportivos locais." },
  { ano: "1954", titulo: "Casa própria", texto: "Inauguração do estádio municipal, que passa a ser a casa do clube em todos os jogos oficiais." },
  { ano: "1978", titulo: "Primeiro título nacional", texto: "A equipa principal conquista o primeiro troféu de âmbito nacional da sua história." },
  { ano: "2018", titulo: "Conquista da Taça de Portugal", texto: "Histórica vitória na final da Taça de Portugal no Estádio Nacional perante o Sporting CP (2-1)." },
  { ano: "2026", titulo: "Século de história e eclecismo", texto: "Presente em 5 modalidades desportivas ativas promovendo o desporto na região." },
];

function Historia() {
  const storeHistoria = useAdmin((s) => s.historia ?? []);

  const list = storeHistoria.length > 0
    ? storeHistoria.map((h: Row) => ({
        ano: String(h.ano || "1930"),
        titulo: String(h.titulo || "Marco Histórico"),
        texto: String(h.descricao || h.texto || ""),
      }))
    : DEFAULT_MARCOS;

  return (
    <main>
      <PageHeader eyebrow="Clube" title="História" text="Desde 1930 que o vermelho e branco atravessa gerações da nossa cidade." />
      <Breadcrumbs items={[{ label: "Clube" }, { label: "História" }]} />

      <section className="mx-auto max-w-4xl px-4 py-14">
        <p className="text-lg leading-relaxed text-muted-foreground font-mono">
          O CD Aves nasceu do desporto de bairro e cresceu como projeto de comunidade. Mais de cem anos depois, o
          clube mantém a mesma ideia fundadora: representar a cidade em todas as modalidades e formar atletas em casa.
        </p>

        <ol className="mt-12 space-y-px bg-border">
          {list.map((m, idx) => (
            <li key={m.ano + idx} className="bg-background p-7 md:flex md:gap-10">
              <p className="font-display text-4xl leading-none text-primary md:w-32">{m.ano}</p>
              <div className="mt-3 md:mt-0">
                <h2 className="font-display text-xl uppercase leading-none">{m.titulo}</h2>
                <p className="mt-2 text-sm text-muted-foreground font-mono">{m.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <CTA
        slug="clube-historia"
        eyebrow="Faz parte da história"
        title="Torna-te sócio do clube"
        text="Quota de 8€ por mês, com descontos até 15% em pagamentos antecipados."
        action="Ser sócio"
        to="/socios"
      />
    </main>
  );
}
