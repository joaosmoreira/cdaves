import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHeader } from "@/components/site/PageHeader";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/clube/presidente")({
  head: () => ({
    meta: [
      { title: "Presidente — Mensagem aos sócios · CD Aves" },
      { name: "description", content: "Mensagem do presidente do CD Aves aos sócios e adeptos, com as prioridades do mandato em curso." },
      { property: "og:title", content: "Presidente do CD Aves" },
      { property: "og:description", content: "Mensagem do presidente aos sócios e adeptos do clube." },
    ],
  }),
  component: Presidente,
});

function Presidente() {
  return (
    <main>
      <PageHeader eyebrow="Clube" title="Presidente" text="Mensagem aos sócios, adeptos e parceiros do clube." />
      <Breadcrumbs items={[{ label: "Clube" }, { label: "Presidente" }]} />

      <section className="mx-auto max-w-4xl px-4 py-14">
        <blockquote className="border-l-4 border-primary pl-6 font-display text-2xl uppercase leading-tight md:text-3xl">
          “Este clube pertence a quem o sustenta todos os dias: os sócios.”
        </blockquote>
        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
          Assumimos este mandato com três prioridades claras: equilibrar as contas do clube, investir na formação e
          devolver ao estádio o ambiente que sempre nos distinguiu. Cada decisão é tomada a pensar na sustentabilidade
          desportiva e financeira das próximas épocas.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          O crescimento das modalidades é parte central deste projeto. Queremos um clube eclético, com condições iguais
          para todos os atletas e com a academia como principal fornecedora das equipas séniores.
        </p>

        <div className="mt-10 border border-border p-7">
          <p className="font-display text-xl uppercase leading-none">Manuel Aurélio Costa</p>
          <p className="mt-2 text-[11px] uppercase tracking-widest text-muted-foreground">Presidente da Direção · Mandato 2025—2029</p>
        </div>
      </section>

      <CTA
        eyebrow="Recebe as decisões em primeira mão"
        title="Subscreve a newsletter do clube"
        text="Comunicados oficiais, convocatórias e notícias enviadas diretamente para o teu email."
        action="Subscrever newsletter"
        to="/noticias"
      />
    </main>
  );
}
