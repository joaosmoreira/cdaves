import { createFileRoute, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTA } from "@/components/site/CTA";
import { SQUAD, TEAMS } from "@/data/club";

export const Route = createFileRoute("/futebol/$equipa/$jogador")({
  loader: ({ params }) => {
    const team = TEAMS.find((t) => t.slug === params.equipa);
    const player = SQUAD.find((p) => p.slug === params.jogador);
    if (!team || !player) throw notFound();
    return { team, player };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.player;
    const title = p ? `${p.name} · #${p.number} — CD Aves` : "Jogador — CD Aves";
    const desc = p
      ? `${p.fullName}, ${p.position}, ${p.age} anos. Dados pessoais e estatísticas no CD Aves.`
      : "Ficha de jogador do CD Aves.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: Jogador,
});

function Jogador() {
  const { team, player } = Route.useLoaderData();

  const data = [
    ["Nome completo", player.fullName],
    ["Data de nascimento", player.birth],
    ["Idade", `${player.age} anos`],
    ["Nacionalidade", player.nationality],
    ["Posição", player.position],
    ["Altura", player.height],
    ["Peso", player.weight],
    ["Pé preferido", player.foot],
    ["No clube desde", player.since],
  ];

  return (
    <main>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[320px_1fr] md:py-16">
          <img
            src={player.photo}
            alt={`Fotografia de ${player.fullName}`}
            width={800}
            height={1000}
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="self-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">{team.name} · {player.position}</p>
            <p className="mt-4 font-display text-7xl leading-none md:text-9xl">{player.number}</p>
            <h1 className="mt-2 font-display text-4xl uppercase leading-none md:text-6xl">{player.name}</h1>
            <div className="mt-8 grid max-w-lg grid-cols-4 gap-4 border-t border-primary-foreground/25 pt-6">
              {[
                ["Jogos", player.stats.games],
                ["Golos", player.stats.goals],
                ["Assist.", player.stats.assists],
                ["Minutos", player.stats.minutes],
              ].map(([label, value]) => (
                <div key={label as string}>
                  <p className="font-display text-2xl leading-none">{value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest opacity-75">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Breadcrumbs
        items={[
          { label: "Futebol", to: "/futebol" },
          { label: team.name, to: "/futebol/$equipa", params: { equipa: team.slug } },
          { label: player.name },
        ]}
      />

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-14 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl uppercase">Dados pessoais</h2>
          <dl className="mt-6 divide-y divide-border border-y border-border">
            {data.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-3 text-sm">
                <dt className="uppercase tracking-widest text-muted-foreground">{k}</dt>
                <dd className="font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h2 className="font-display text-2xl uppercase">Biografia</h2>
          <p className="mt-6 text-muted-foreground">{player.bio}</p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <img src={player.photo} alt={`${player.name} em ação`} width={800} height={1000} loading="lazy" className="aspect-square w-full object-cover" />
            <img src={player.photo} alt={`${player.name} no estádio`} width={800} height={1000} loading="lazy" className="aspect-square w-full object-cover grayscale" />
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Camisola oficial"
        title={`Veste o ${player.number} de ${player.name}`}
        text="Sócios têm 15% de desconto em toda a loja oficial do clube."
        action="Tornar-me sócio"
        to="/socios"
      />
    </main>
  );
}
