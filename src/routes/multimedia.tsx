import { createFileRoute } from "@tanstack/react-router";
import { Play, Camera } from "lucide-react";
import heroImg from "@/assets/hero-stadium.jpg";
import teamImg from "@/assets/team-photo.jpg";
import p1 from "@/assets/player-1.jpg";
import p2 from "@/assets/player-2.jpg";
import p3 from "@/assets/player-3.jpg";
import p4 from "@/assets/player-4.jpg";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageHeader } from "@/components/site/PageHeader";
import { NewsletterCTA } from "@/components/site/CTA";

export const Route = createFileRoute("/multimedia")({
  head: () => ({
    meta: [
      { title: "Multimédia — Fotos e Vídeos · CD Aurirrubro" },
      { name: "description", content: "Galeria de fotografias, vídeos de jogos e bastidores do CD Aurirrubro." },
      { property: "og:title", content: "Multimédia — Fotos e Vídeos · CD Aurirrubro" },
      { property: "og:description", content: "Revive os melhores momentos do clube em imagem e vídeo." },
    ],
  }),
  component: Multimedia,
});

const GALLERY = [
  { src: heroImg, alt: "Estádio cheio numa noite de jogo" },
  { src: teamImg, alt: "Equipa alinhada antes do jogo" },
  { src: p1, alt: "Retrato de jogador do plantel" },
  { src: p2, alt: "Retrato de jogador do plantel" },
  { src: p3, alt: "Retrato do guarda-redes" },
  { src: p4, alt: "Retrato de jogador da formação" },
];

export function Multimedia() {
  return (
    <main>
      <PageHeader eyebrow="Galeria" title="Multimédia" text="Fotografia, vídeo e bastidores da vida aurirrubra." />
      <Breadcrumbs items={[{ label: "Multimédia" }]} />

      <section className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="flex items-center gap-2 font-display text-2xl uppercase">
          <Play className="h-5 w-5 text-primary" /> Vídeos em destaque
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {["Resumo: Aurirrubro 2-1 Rivais", "Bastidores do balneário", "Academia: um dia na formação"].map((t) => (
            <div key={t} className="group relative overflow-hidden border border-border">
              <img src={teamImg} alt={t} width={1600} height={900} loading="lazy" className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-0 grid place-items-center bg-foreground/40">
                <Play className="h-10 w-10 text-background" />
              </span>
              <p className="p-4 font-display text-lg uppercase leading-tight">{t}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-16 flex items-center gap-2 font-display text-2xl uppercase">
          <Camera className="h-5 w-5 text-primary" /> Fotogaleria
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {GALLERY.map((g, i) => (
            <img
              key={i}
              src={g.src}
              alt={g.alt}
              width={1200}
              height={900}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-opacity hover:opacity-85"
            />
          ))}
        </div>
      </section>

      <NewsletterCTA />
    </main>
  );
}
