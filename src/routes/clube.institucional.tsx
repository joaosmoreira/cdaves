import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHeader } from "@/components/site/PageHeader";
import { CTA } from "@/components/site/CTA";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/clube/institucional")({
  head: () => ({
    meta: [
      { title: "Institucional — Órgãos sociais e documentos · CD Aves" },
      { name: "description", content: "Informação institucional do CD Aves: órgãos sociais, estatutos, assembleias gerais, relatórios e contas e comunicados." },
      { property: "og:title", content: "Institucional · CD Aves" },
      { property: "og:description", content: "Órgãos sociais, estatutos, assembleias, relatórios e comunicados oficiais." },
    ],
  }),
  component: Institucional,
});

const SECCOES = [
  { titulo: "Órgãos Sociais", texto: "Composição da Direção, da Mesa da Assembleia Geral e do Conselho Fiscal para o mandato 2025—2029, com as respetivas competências estatutárias." },
  { titulo: "Estatutos e Regulamentos", texto: "Estatutos em vigor, regulamento eleitoral, regulamento disciplinar e regulamento de utilização das instalações desportivas." },
  { titulo: "Assembleias gerais", texto: "Convocatórias, ordens de trabalho, atas aprovadas e calendário das próximas assembleias gerais ordinárias e extraordinárias." },
  { titulo: "Relatórios e contas", texto: "Relatórios e contas das últimas épocas desportivas, pareceres do Conselho Fiscal e orçamentos aprovados em assembleia." },
  { titulo: "Informação privilegiada e comunicados", texto: "Comunicados oficiais do clube, informação privilegiada e esclarecimentos públicos da Direção." },
  { titulo: "Outras empresas do grupo", texto: "Sociedades participadas e entidades associadas ao clube, incluindo a área comercial, a academia e a fundação social." },
];

function Institucional() {
  return (
    <main>
      <PageHeader eyebrow="Clube" title="Institucional" text="Transparência, documentos oficiais e informação geral do clube." />
      <Breadcrumbs items={[{ label: "Clube" }, { label: "Institucional" }]} />

      <section className="mx-auto max-w-4xl px-4 py-14">
        <h2 className="mb-6 border-b-2 border-primary pb-2 font-display text-2xl uppercase">Informação geral</h2>
        <Accordion type="single" collapsible className="w-full">
          {SECCOES.map((s) => (
            <AccordionItem key={s.titulo} value={s.titulo}>
              <AccordionTrigger className="text-left font-display text-lg uppercase">{s.titulo}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{s.texto}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <CTA
        slug="clube-institucional"
        eyebrow="Participa na vida do clube"
        title="Sócios votam nas assembleias gerais"
        text="Com a quota em dia participas e votas nas decisões estruturantes do clube."
        action="Ser sócio"
        to="/socios"
      />
    </main>
  );
}
