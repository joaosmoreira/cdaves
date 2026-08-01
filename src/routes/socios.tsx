import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHeader } from "@/components/site/PageHeader";
import { CTA } from "@/components/site/CTA";
import { Button } from "@/components/ui/button";
import { MEMBER_PERKS, MONTHLY_FEE, PAYMENT_PLANS, SEATS, planTotals } from "@/data/club";

export const Route = createFileRoute("/socios")({
  head: () => ({
    meta: [
      { title: "Sócios e Lugar Anual — CD Aves" },
      { name: "description", content: "Quota única de 8€/mês com descontos até 15% e duas modalidades de lugar anual na bancada central coberta." },
      { property: "og:title", content: "Sócios e Lugar Anual — CD Aves" },
      { property: "og:description", content: "Torna-te sócio por 8€/mês e garante o teu lugar na bancada central coberta." },
    ],
  }),
  component: Socios,
});

const euro = (v: number) =>
  Number.isInteger(v) ? `${v}€` : `${v.toFixed(2).replace(".", ",")}€`;

function Socios() {
  return (
    <main>
      <PageHeader eyebrow="Ser Avense" title="Sócios" text="Quota única de 8€ por mês. Escolhe apenas a forma de pagamento." />
      <Breadcrumbs items={[{ label: "Sócios" }]} />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="font-display text-2xl uppercase">Informações gerais</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            { t: "Como me torno sócio", d: "Preenche a inscrição online ou na secretaria do estádio. O cartão digital é emitido em 48 horas." },
            { t: "Quota única", d: `Todos os sócios pagam ${MONTHLY_FEE}€ por mês, sem escalões. Só muda a periodicidade do pagamento.` },
            { t: "Assembleia Geral", d: "Sócios com mais de um ano de antiguidade e quotas em dia têm direito de voto." },
          ].map((i) => (
            <div key={i.t} className="border-l-2 border-primary pl-5">
              <h3 className="font-display text-lg uppercase">{i.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <h2 className="font-display text-2xl uppercase">Modalidades de pagamento</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              A quota é sempre de {MONTHLY_FEE}€/mês. Quanto mais meses pagares de uma vez, maior o desconto.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {PAYMENT_PLANS.map((plan) => {
                const { gross, total, saving, perMonth } = planTotals(plan);
                const highlight = plan.months === 12;
                return (
                  <div
                    key={plan.name}
                    className={`flex flex-col border p-6 ${highlight ? "border-primary bg-secondary" : "border-border"}`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl uppercase">{plan.name}</h3>
                      {plan.discount > 0 && (
                        <span className="bg-accent px-2 py-0.5 text-[11px] font-bold uppercase tracking-widest text-accent-foreground">
                          -{plan.discount * 100}%
                        </span>
                      )}
                    </div>
                    <p className="mt-3 font-display text-4xl leading-none text-primary">{euro(total)}</p>
                    <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                      {plan.months === 1 ? "por mês" : `por ${plan.months} meses`}
                    </p>
                    {plan.discount > 0 && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        <span className="line-through">{euro(gross)}</span> · poupas {euro(saving)}
                      </p>
                    )}
                    <p className="mt-2 text-sm font-semibold">{euro(perMonth)} / mês</p>
                    <p className="mt-3 flex-1 text-sm text-muted-foreground">{plan.note}</p>
                    <Button
                      className="mt-6 w-full"
                      variant={highlight ? "hero" : "outline"}
                      onClick={() =>
                        toast.success(`Adesão ${plan.name.toLowerCase()} iniciada!`, {
                          description: `Total a pagar: ${euro(total)}. Vamos contactar-te para concluir.`,
                        })
                      }
                    >
                      Aderir
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="border border-border p-7">
            <h3 className="font-display text-xl uppercase">Benefícios de sócio</h3>
            <ul className="mt-5 space-y-2 text-sm">
              {MEMBER_PERKS.map((p) => (
                <li key={p} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {p}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <h2 className="mt-16 font-display text-2xl uppercase">Lugar anual 2026/27</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Duas modalidades, sempre na Bancada Central Coberta, com o mesmo lugar em toda a época e prioridade de renovação.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {SEATS.map((s, i) => (
            <div key={s.slug} className={`border p-7 ${i === 1 ? "border-primary bg-secondary" : "border-border"}`}>
              <p className="text-[11px] uppercase tracking-widest text-primary">{s.stand}</p>
              <h3 className="mt-2 font-display text-2xl uppercase">{s.zone}</h3>
              <p className="mt-2 font-display text-4xl leading-none text-primary">{s.price}</p>
              <p className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">Época completa</p>
              <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {s.includes.map((inc) => (
                  <li key={inc} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {inc}
                  </li>
                ))}
              </ul>
              <Button
                variant={i === 1 ? "hero" : "outline"}
                className="mt-6 w-full"
                onClick={() => toast.success(`Lugar reservado: ${s.zone}`, { description: "Recebeste um email com os passos de pagamento." })}
              >
                Comprar
              </Button>
            </div>
          ))}
        </div>
      </section>

      <CTA
        slug="campanha-socios"
        eyebrow="Campanha de renovação"
        title="Renova até 31 de agosto e mantém o teu lugar"
        text="Sócios com quota em dia mantêm o lugar da época passada com prioridade absoluta."
        action="Falar com a secretaria"
        to="/contactos"
      />
    </main>
  );
}
