import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHeader } from "@/components/site/PageHeader";
import { CTA } from "@/components/site/CTA";

export const Route = createFileRoute("/clube/estadio")({
  head: () => ({
    meta: [
      { title: "Estádio — A nossa casa · CD Aves" },
      { name: "description", content: "Conheça o estádio do CD Aves: capacidade, bancadas, acessos, estacionamento e serviços em dia de jogo." },
      { property: "og:title", content: "Estádio do CD Aves" },
      { property: "og:description", content: "Capacidade, bancadas e acessos ao estádio do clube." },
    ],
  }),
  component: Estadio,
});

const DADOS = [
  { label: "Capacidade", value: "8.560" },
  { label: "Inauguração", value: "8 de dezembro de 1981" },
  { label: "Relvado", value: "105 × 68 m" },
  { label: "Bancadas", value: "4" },
];

function Estadio() {
  return (
    <main>
      <PageHeader eyebrow="Clube" title="Estádio" text="A casa do clube desde 8 de dezembro de 1981, na Vila das Aves." />
      <Breadcrumbs items={[{ label: "Clube" }, { label: "Estádio" }]} />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {DADOS.map((d) => (
            <div key={d.label} className="bg-background p-7">
              <p className="font-display text-4xl leading-none text-primary">{d.value}</p>
              <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{d.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl uppercase">Bancadas</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              A bancada central coberta acolhe os lugares anuais, business seats e camarotes. As bancadas topo norte e sul
              são as zonas de claque e a topo poente recebe as famílias e os sócios juvenis.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl uppercase">Acessos e serviços</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Estacionamento com 900 lugares, entradas dedicadas para mobilidade reduzida, bilheteira aberta três horas
              antes do jogo e loja oficial junto à porta principal.
            </p>
          </div>
        </div>
      </section>

      <CTA
        slug="clube-estadio"
        eyebrow="Lugar anual"
        title="Garante o teu lugar na bancada central coberta"
        text="Duas modalidades disponíveis: futebol de 11 ou acesso a todas as competições do clube."
        action="Ver lugar anual"
        to="/socios"
      />
    </main>
  );
}
