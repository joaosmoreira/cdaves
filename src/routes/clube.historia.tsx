import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHeader } from "@/components/site/PageHeader";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/clube/historia")({
  head: () => ({
    meta: [
      { title: "História — Mais de um século de clube · CD Aurirrubro" },
      { name: "description", content: "A história do CD Aurirrubro desde 1919: fundação, títulos, momentos marcantes e a identidade vermelha e branca." },
      { property: "og:title", content: "História do CD Aurirrubro" },
      { property: "og:description", content: "Desde 1919 a escrever a história do vermelho e branco." },
    ],
  }),
  component: Historia,
});

const MARCOS = [
  { ano: "1919", titulo: "Fundação", texto: "Um grupo de operários funda o clube na sede da Rua Nova, com camisola vermelha e branca." },
  { ano: "1954", titulo: "Casa própria", texto: "Inauguração do estádio municipal, que passa a ser a casa do clube em todos os jogos oficiais." },
  { ano: "1978", titulo: "Primeiro título nacional", texto: "A equipa principal conquista o primeiro troféu de âmbito nacional da sua história." },
  { ano: "1996", titulo: "Clube eclético", texto: "Criação dos departamentos de futsal, andebol e basquetebol no pavilhão do clube." },
  { ano: "2011", titulo: "Academia", texto: "Abertura da academia de formação, com seis campos e residência para atletas." },
  { ano: "2026", titulo: "Século e meio de adeptos", texto: "Mais de 12.000 sócios ativos e uma das maiores massas associativas da região." },
];

function Historia() {
  return (
    <main>
      <PageHeader eyebrow="Clube" title="História" text="Desde 1919 que o vermelho e branco atravessa gerações da nossa cidade." />
      <Breadcrumbs items={[{ label: "Clube" }, { label: "História" }]} />

      <section className="mx-auto max-w-4xl px-4 py-14">
        <p className="text-lg leading-relaxed text-muted-foreground">
          O CD Aurirrubro nasceu do desporto de bairro e cresceu como projeto de comunidade. Mais de cem anos depois, o
          clube mantém a mesma ideia fundadora: representar a cidade em todas as modalidades e formar atletas em casa.
        </p>

        <ol className="mt-12 space-y-px bg-border">
          {MARCOS.map((m) => (
            <li key={m.ano} className="bg-background p-7 md:flex md:gap-10">
              <p className="font-display text-4xl leading-none text-primary md:w-32">{m.ano}</p>
              <div className="mt-3 md:mt-0">
                <h2 className="font-display text-xl uppercase leading-none">{m.titulo}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{m.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <CTA
        eyebrow="Faz parte da história"
        title="Torna-te sócio do clube"
        text="Quota de 8€ por mês, com descontos até 15% em pagamentos antecipados."
        action="Ser sócio"
        to="/socios"
      />
    </main>
  );
}
