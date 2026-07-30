import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHeader } from "@/components/site/PageHeader";
import { CTA } from "@/components/site/CTA";
import { Button } from "@/components/ui/button";
import { MEMBERSHIPS, SEATS } from "@/data/club";

export const Route = createFileRoute("/socios")({
  head: () => ({
    meta: [
      { title: "Sócios e Lugar Anual — CD Aurirrubro" },
      { name: "description", content: "Quotas, benefícios de sócio e campanha de lugares anuais 2026/27 do CD Aurirrubro." },
      { property: "og:title", content: "Sócios e Lugar Anual — CD Aurirrubro" },
      { property: "og:description", content: "Torna-te sócio e garante o teu lugar na bancada toda a época." },
    ],
  }),
  component: Socios;
});

function Socios() {
  return (
    <main>
      <PageHeader eyebrow="Ser Aurirrubro" title="Sócios" text="Informações gerais, quotas, benefícios e lugar anual." />
      <Breadcrumbs items={[{ label: "Sócios" }]} />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="font-display text-2xl uppercase">Informações gerais</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            { t: "Como me torno sócio", d: "Preenche a inscrição online ou na secretaria do estádio. O cartão digital é emitido em 48 horas." },
            { t: "Pagamento de quotas", d: "Débito direto mensal, anual ou pagamento na loja do clube. Quotas em dia dão acesso a todos os benefícios." },
            { t: "Assembleia Geral", d: "Sócios com mais de um ano de antiguidade e quotas em dia têm direito de voto." },
          ].map((i) => (
            <div key={i.t} className="border-l-2 border-primary pl-5">
              <h3 className="font-display text-lg uppercase">{i.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.d}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-16 font-display text-2xl uppercase">Modalidades de sócio</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {MEMBERSHIPS.map((m, i) => (
            <div key={m.name} className={`border p-7 ${i === 1 ? "border-primary bg-secondary" : "border-border"}`}>
              <h3 className="font-display text-xl uppercase">{m.name}</h3>
              <p className="mt-2 font-display text-4xl leading-none text-primary">{m.price}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {m.perks.map((p) => (
                  <li key={p} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {p}
                  </li>
                ))}
              </ul>
              <Button
                className="mt-6 w-full"
                variant={i === 1 ? "hero" : "outline"}
                onClick={() => toast.success(`Inscrição ${m.name} iniciada!`, { description: "Vamos contactar-te para concluir a adesão." })}
              >
                Aderir
              </Button>
            </div>
          ))}
        </div>

        <h2 className="mt-16 font-display text-2xl uppercase">Lugar anual 2026/27</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          O mesmo lugar em todos os jogos em casa, com prioridade de renovação e desconto para sócios.
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SEATS.map((s) => (
            <div key={s.zone} className="border border-border p-6">
              <h3 className="font-display text-lg uppercase">{s.zone}</h3>
              <p className="mt-2 font-display text-3xl leading-none text-accent-foreground">{s.price}</p>
              <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">Época completa</p>
              <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
              <Button
                variant="gold"
                className="mt-5 w-full"
                onClick={() => toast.success(`Lugar reservado: ${s.zone}`, { description: "Recebeste um email com os passos de pagamento." })}
              >
                Comprar
              </Button>
            </div>
          ))}
        </div>
      </section>

      <CTA
        eyebrow="Campanha de renovação"
        title="Renova até 31 de agosto e poupa 15%"
        text="Sócios com quota em dia mantêm o lugar da época passada com prioridade absoluta."
        action="Falar com a secretaria"
        to="/contactos"
      />
    </main>
  );
}
