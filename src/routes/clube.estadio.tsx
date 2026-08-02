import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHeader } from "@/components/site/PageHeader";
import { CTA } from "@/components/site/CTA";
import { useAdmin, Row } from "@/admin/store";

export const Route = createFileRoute("/clube/estadio")({
  head: () => ({
    meta: [
      { title: "Estádio & Instalações · CD Aves" },
      { name: "description", content: "Conheça o estádio e pavilhões do CD Aves: capacidade, bancadas, relvados e recintos desportivos." },
      { property: "og:title", content: "Estádio & Instalações do CD Aves" },
    ],
  }),
  component: Estadio,
});

function Estadio() {
  const instalacoes = useAdmin((s) => s.instalacoes ?? []);

  return (
    <main>
      <PageHeader eyebrow="Clube" title="Estádio & Instalações" text="A casa do CD Aves e os recintos desportivos do clube em Vila das Aves." />
      <Breadcrumbs items={[{ label: "Clube" }, { label: "Estádio & Instalações" }]} />

      <section className="mx-auto max-w-7xl px-4 py-14 space-y-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {instalacoes.map((item: Row) => (
            <div key={String(item.id)} className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-3">
              <h2 className="font-display text-xl uppercase text-foreground">{String(item.nome || "Instalação Desportiva")}</h2>
              <div className="space-y-1.5 font-mono text-xs text-muted-foreground border-t border-border pt-3">
                <p><span className="text-slate-400">Capacidade:</span> <strong className="text-primary font-bold">{String(item.capacidade || "N/D")}</strong></p>
                <p><span className="text-slate-400">Piso / Recinto:</span> <strong className="text-foreground">{String(item.recinto || "N/D")}</strong></p>
                <p><span className="text-slate-400">Localização:</span> <strong className="text-foreground">{String(item.localizacao || "Vila das Aves")}</strong></p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTA
        slug="clube-estadio"
        eyebrow="Lugar anual"
        title="Garante o teu lugar na bancada central coberta"
        text="Acesso prioritário e lugares reservados para todos os sócios do clube."
        action="Ver lugar anual"
        to="/socios"
      />
    </main>
  );
}
