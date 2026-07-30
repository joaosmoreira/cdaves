import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHeader } from "@/components/site/PageHeader";
import { NewsletterCTA } from "@/components/site/CTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CLUB } from "@/data/club";

export const Route = createFileRoute("/contactos")({
  head: () => ({
    meta: [
      { title: "Contactos — CD Aurirrubro" },
      { name: "description", content: "Contactos, morada do estádio e horários da secretaria do CD Aurirrubro." },
      { property: "og:title", content: "Contactos — CD Aurirrubro" },
      { property: "og:description", content: "Fala com a secretaria, o departamento comercial ou a imprensa do clube." },
    ],
  }),
  component: Contactos,
});

function Contactos() {
  const [sent, setSent] = useState(false);

  return (
    <main>
      <PageHeader eyebrow="Fala connosco" title="Contactos" text="Secretaria, departamento comercial e imprensa." />
      <Breadcrumbs items={[{ label: "Contactos" }]} />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-14 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl uppercase">{CLUB.stadium}</h2>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex gap-3"><MapPin className="h-5 w-5 text-primary" />{CLUB.address}</li>
            <li className="flex gap-3"><Phone className="h-5 w-5 text-primary" />{CLUB.phone}</li>
            <li className="flex gap-3"><Mail className="h-5 w-5 text-primary" />{CLUB.email}</li>
            <li className="flex gap-3"><Clock className="h-5 w-5 text-primary" />Segunda a sexta, 10h–19h · Sábado, 10h–13h</li>
          </ul>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { t: "Secretaria de sócios", e: "socios@cdaurirrubro.pt" },
              { t: "Departamento comercial", e: "comercial@cdaurirrubro.pt" },
              { t: "Imprensa", e: "imprensa@cdaurirrubro.pt" },
              { t: "Formação", e: "academia@cdaurirrubro.pt" },
            ].map((c) => (
              <div key={c.t} className="border border-border p-4">
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">{c.t}</p>
                <p className="mt-1 text-sm font-semibold">{c.e}</p>
              </div>
            ))}
          </div>
        </div>

        <form
          className="border border-border p-7"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("Mensagem enviada!", { description: "Respondemos normalmente em 2 dias úteis." });
          }}
        >
          <h2 className="font-display text-2xl uppercase">Envia-nos uma mensagem</h2>
          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" required className="mt-1" placeholder="O teu nome" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required className="mt-1" placeholder="o.teu@email.pt" />
            </div>
            <div>
              <Label htmlFor="msg">Mensagem</Label>
              <Textarea id="msg" required rows={5} className="mt-1" placeholder="Como podemos ajudar?" />
            </div>
            <Button type="submit" variant="hero" className="w-full">
              {sent ? "Mensagem enviada" : "Enviar mensagem"}
            </Button>
          </div>
        </form>
      </section>

      <NewsletterCTA />
    </main>
  );
}
