import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateSettings, useAdmin } from "@/admin/store";

export const Route = createFileRoute("/admin/socios")({
  head: () => ({
    meta: [
      { title: "Gestão de sócios · CD Aurirrubro" },
      { name: "description", content: "Definir a quota mensal, planos de pagamento e lugares anuais do clube." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Gestão de sócios · CD Aurirrubro" },
      { property: "og:description", content: "Backoffice de preços e pagamentos de sócios." },
    ],
  }),
  component: SociosAdmin,
});

function SociosAdmin() {
  const settings = useAdmin((s) => s.settings);

  return (
    <div className="space-y-14">
      <section>
        <h1 className="font-display text-3xl uppercase leading-none">Sócios</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Valor da quota e informação de pagamento apresentados na página de sócios.
        </p>

        <form
          className="mt-8 grid max-w-3xl gap-5 border border-border p-6 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Dados de sócios guardados.");
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="quota">Quota mensal</Label>
            <Input
              id="quota"
              type="number"
              step="0.01"
              value={settings.quota}
              onChange={(e) => updateSettings({ quota: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="moeda">Moeda</Label>
            <Input id="moeda" value={settings.moeda} onChange={(e) => updateSettings({ moeda: e.target.value })} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="nota">Métodos de pagamento</Label>
            <Textarea
              id="nota"
              rows={3}
              value={settings.notaPagamento}
              onChange={(e) => updateSettings({ notaPagamento: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </section>

      <ResourceManager
        slice="planos"
        title="Modalidades de pagamento"
        singular="Plano"
        description="Periodicidades disponíveis e respetivos descontos sobre a quota mensal."
        fields={[
          { key: "nome", label: "Nome do plano" },
          { key: "meses", label: "Meses", type: "number" },
          { key: "desconto", label: "Desconto" },
          { key: "nota", label: "Nota", type: "textarea" },
        ]}
      />

      <ResourceManager
        slice="lugares"
        title="Lugares anuais"
        singular="Lugar anual"
        description="Opções de lugar anual na bancada central coberta."
        fields={[
          { key: "nome", label: "Designação" },
          { key: "bancada", label: "Bancada" },
          { key: "preco", label: "Preço", type: "number" },
          { key: "descricao", label: "Descrição", type: "textarea" },
        ]}
      />
    </div>
  );
}
