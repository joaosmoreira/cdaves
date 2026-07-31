import { createFileRoute, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTA } from "@/components/site/CTA";
import { MODALIDADES } from "@/data/club";

export const Route = createFileRoute("/modalidades/$modalidade/$atleta")({
  loader: ({ params }) => {
    const modalidade = MODALIDADES.find((m) => m.slug === params.modalidade);
    const atleta = modalidade?.roster.find((a) => a.slug === params.atleta);
    if (!modalidade || !atleta) throw notFound();
    return { modalidade, atleta };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.atleta;
    const title = a ? `${a.name} · #${a.number} — CD Aves` : "Atleta — CD Aves";
    const desc = a
      ? `${a.fullName}, ${a.position}, ${a.age} anos. Dados pessoais do atleta no CD Aves.`
      : "Ficha de atleta do CD Aves.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: Atleta,
});

function Atleta() {
  const { modalidade, atleta } = Route.useLoaderData();

  const data = [
    ["Nome completo", atleta.fullName],
    ["Data de nascimento", atleta.birth],
    ["Idade", `${atleta.age} anos`],
    ["Nacionalidade", atleta.nationality],
    ["Modalidade", modalidade.name],
    ["Posição", atleta.position],
    ["Altura", atleta.height],
    ["No clube desde", atleta.since],
    ["Recinto", modalidade.venue],
  ];

  return (
    <main>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[320px_1fr] md:py-16">
          <img
            src={atleta.photo}
            alt={`Fotografia de ${atleta.fullName}`}
            width={800}
            height={1000}
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="self-center">
            <p className="text-xs font-bold uppercase tracking-[0.3em] opacity-80">
              {modalidade.name} · {atleta.position}
            </p>
            <p className="mt-4 font-display text-7xl leading-none md:text-9xl">{atleta.number}</p>
            <h1 className="mt-2 font-display text-4xl uppercase leading-none md:text-6xl">{atleta.name}</h1>
            <p className="mt-6 max-w-lg text-sm opacity-90">{modalidade.competition}</p>
          </div>
        </div>
      </section>

      <Breadcrumbs
        items={[
          { label: "Modalidades", to: "/modalidades" },
          { label: modalidade.name, to: "/modalidades/$modalidade", params: { modalidade: modalidade.slug } },
          { label: atleta.name },
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
          <p className="mt-6 text-muted-foreground">{atleta.bio}</p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <img src={atleta.photo} alt={`${atleta.name} em competição`} width={800} height={1000} loading="lazy" className="aspect-square w-full object-cover" />
            <img src={atleta.photo} alt={`${atleta.name} no recinto`} width={800} height={1000} loading="lazy" className="aspect-square w-full object-cover grayscale" />
          </div>
        </div>
      </section>

      <CTA
        eyebrow="Apoia as modalidades"
        title={`Apoia o ${modalidade.name} do clube`}
        text="Sócios com quota em dia têm entrada com desconto em todos os jogos do pavilhão."
        action="Tornar-me sócio"
        to="/socios"
      />
    </main>
  );
}
