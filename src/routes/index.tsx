import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Trophy, Users } from "lucide-react";
import heroImg from "@/assets/hero-stadium.jpg";
import teamImg from "@/assets/team-photo.jpg";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { MatchStrip } from "@/components/site/MatchStrip";
import { CTA, NewsletterCTA } from "@/components/site/CTA";
import { Button } from "@/components/ui/button";
import { CLUB, NEWS, MODALIDADES } from "@/data/club";

import { useAdmin } from "@/admin/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CD Aves — Site Oficial do Clube" },
      { name: "description", content: "Notícias, futebol, modalidades, sócios e lugares anuais do Clube Desportivo das Aves." },
      { property: "og:title", content: "CD Aves — Site Oficial do Clube" },
      { property: "og:description", content: "Notícias, futebol, modalidades, sócios e lugares anuais do Clube Desportivo das Aves." },
    ],
  }),
  component: Index,
});

function Index() {
  const heroUrl = useAdmin((s) => s.settings?.heroUrl ?? heroImg);

  return (
    <main>
      <section className="relative flex h-screen min-h-[600px] items-end overflow-hidden">
        <img
          src={heroUrl}
          alt="Estádio do CD Aves cheio numa noite de jogo"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover object-center"
          style={{ objectPosition: "center 30%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-12 md:pb-20">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-accent md:text-xs">Desde {CLUB.founded}</p>
          <h1 className="mt-3 max-w-4xl font-display text-4xl uppercase leading-[0.88] tracking-tight text-background sm:text-5xl md:text-8xl">
            Vermelho e branco <span className="text-accent">no coração</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm text-background/80 md:text-lg">
            {CLUB.fullName}. Uma cidade, um clube, milhares de famílias. Junta-te a nós na bancada.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-8">
            <Button asChild variant="hero" size="lg">
              <Link to="/socios">Tornar-me Sócio</Link>
            </Button>
            <Button asChild variant="gold" size="lg">
              <Link to="/futebol">Ver Plantel</Link>
            </Button>
          </div>
        </div>
      </section>

      <MatchStrip />

      <Breadcrumbs items={[{ label: "Início" }]} />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 py-10 md:grid-cols-4">
          {[
            { icon: Trophy, value: "27", label: "Títulos conquistados" },
            { icon: Users, value: "8.420", label: "Sócios activos" },
            { icon: Calendar, value: "107", label: "Anos de história" },
            { icon: Users, value: "612", label: "Atletas formados" },
          ].map((s) => (
            <div key={s.label} className="px-2 py-4">
              <s.icon className="h-5 w-5 text-primary" />
              <p className="mt-3 font-display text-4xl leading-none">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-3xl uppercase md:text-5xl">Últimas notícias</h2>
          <Link to="/noticias" className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary">
            Ver todas <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {NEWS.slice(0, 9).map((n) => (
            <Link
              key={n.slug}
              to="/noticias/$slug"
              params={{ slug: n.slug }}
              className="group border border-border transition-colors hover:border-primary"
            >
              <img src={n.image} alt={n.title} width={1600} height={900} loading="lazy" className="h-44 w-full object-cover" />
              <div className="p-6">
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary">{n.category} · {n.date}</p>
                <h3 className="mt-3 font-display text-xl uppercase leading-tight">{n.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{n.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CTA
        eyebrow="Lugar Anual 2026/27"
        title="Garante o teu lugar na bancada"
        text="Todos os jogos em casa, o mesmo lugar, preço fechado para a época inteira."
        action="Comprar Lugar Anual"
        to="/socios"
      />

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        <img
          src={teamImg}
          alt="Plantel do CD Aves alinhado no relvado"
          width={1600}
          height={900}
          loading="lazy"
          className="w-full object-cover"
        />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Modalidades</p>
          <h2 className="mt-3 font-display text-3xl uppercase md:text-5xl">Muito mais do que futebol</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Seis modalidades, centenas de atletas e um único emblema. O clube vive todos os dias
            dentro e fora do relvado.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-2 text-sm">
            {MODALIDADES.map((m) => (
              <li key={m.name} className="border-l-2 border-accent pl-3">{m.name}</li>
            ))}
          </ul>
          <Button asChild className="mt-8">
            <Link to="/modalidades">Conhecer as modalidades</Link>
          </Button>
        </div>
      </section>

      <NewsletterCTA />
    </main>
  );
}
