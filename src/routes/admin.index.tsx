import { createFileRoute, Link } from "@tanstack/react-router";
import { useAdmin } from "@/admin/store";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Painel de administração · CD Aurirrubro" },
      { name: "description", content: "Resumo dos conteúdos geridos no backoffice do CD Aurirrubro." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Painel de administração · CD Aurirrubro" },
      { property: "og:description", content: "Resumo dos conteúdos do clube." },
    ],
  }),
  component: AdminHome,
});

function AdminHome() {
  const s = useAdmin((st) => st);

  const cards = [
    { label: "Notícias", value: s.noticias.length, to: "/admin/noticias" },
    { label: "Equipas de futebol", value: s.equipas.length, to: "/admin/futebol/equipas" },
    { label: "Atletas de futebol", value: s.jogadores.length, to: "/admin/futebol/atletas" },
    { label: "Modalidades", value: s.modalidades.length, to: "/admin/modalidades" },
    { label: "Atletas de modalidades", value: s.atletas.length, to: "/admin/modalidades/atletas" },
    { label: "Patrocínios", value: s.patrocinios.length, to: "/admin/corporate" },
    { label: "Itens multimédia", value: s.media.length, to: "/admin/multimedia" },
    { label: "Secções institucionais", value: s.institucional.length, to: "/admin/clube" },
  ];

  return (
    <section>
      <h1 className="font-display text-3xl uppercase leading-none">Painel</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Gestão de conteúdos do site do clube. As alterações feitas aqui ficam ativas nesta sessão.
      </p>

      <div className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className="bg-background p-6 transition-colors hover:bg-secondary/60">
            <p className="font-display text-5xl leading-none text-primary">{c.value}</p>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{c.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
