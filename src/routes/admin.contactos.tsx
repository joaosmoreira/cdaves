import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { ResourceManager } from "@/components/admin/ResourceManager";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { updateSettings, useAdmin } from "@/admin/store";

export const Route = createFileRoute("/admin/contactos")({
  head: () => ({
    meta: [
      { title: "Gestão de contactos · CD Aurirrubro" },
      { name: "description", content: "Definir emails por departamento, morada e horários de funcionamento do clube." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Gestão de contactos · CD Aurirrubro" },
      { property: "og:description", content: "Backoffice dos contactos do clube." },
    ],
  }),
  component: ContactosAdmin,
});

function ContactosAdmin() {
  const settings = useAdmin((s) => s.settings);

  return (
    <div className="space-y-14">
      <section>
        <h1 className="font-display text-3xl uppercase leading-none">Contactos</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Dados apresentados na página de contactos e no rodapé do site.
        </p>

        <form
          className="mt-8 grid max-w-3xl gap-5 border border-border p-6 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Contactos guardados.");
          }}
        >
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="morada">Morada</Label>
            <Textarea id="morada" rows={2} value={settings.morada} onChange={(e) => updateSettings({ morada: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input id="telefone" value={settings.telefone} onChange={(e) => updateSettings({ telefone: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="emailGeral">Email geral</Label>
            <Input id="emailGeral" type="email" value={settings.emailGeral} onChange={(e) => updateSettings({ emailGeral: e.target.value })} />
          </div>
          <div className="md:col-span-2">
            <Button type="submit">Guardar</Button>
          </div>
        </form>
      </section>

      <ResourceManager
        slice="emails"
        title="Emails por departamento"
        singular="Email"
        fields={[
          { key: "departamento", label: "Departamento" },
          { key: "email", label: "Endereço de email" },
        ]}
      />

      <ResourceManager
        slice="horarios"
        title="Horários de funcionamento"
        singular="Horário"
        fields={[
          { key: "servico", label: "Serviço" },
          { key: "dias", label: "Dias" },
          { key: "horario", label: "Horário" },
        ]}
      />
    </div>
  );
}
