import { CalendarDays, MapPin } from "lucide-react";
import logo from "@/assets/logo-cd.png";
import { useAdmin } from "@/admin/store";
import { CLUB } from "@/data/club";

function Badge({ src, name }: { src?: string; name: string }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      {src ? (
        <img src={src} alt={`Emblema ${name}`} width={80} height={80} className="h-16 w-16 object-contain md:h-20 md:w-20" />
      ) : (
        <div className="grid h-16 w-16 place-items-center rounded-full border border-current/30 font-display text-xl md:h-20 md:w-20">
          {name.slice(0, 2).toUpperCase()}
        </div>
      )}
      <p className="w-[7rem] text-[11px] font-bold uppercase tracking-widest leading-tight break-words text-center md:w-[9rem]">{name}</p>
    </div>
  );
}

export function MatchStrip() {
  const jogos = useAdmin((s) => s.jogos);
  const next = jogos.find((j) => String(j.tipo).startsWith("Próximo"));
  const last = jogos.find((j) => String(j.tipo).startsWith("Último"));
  const featured = next ?? last;
  if (!featured) return null;

  const isNext = featured === next;
  const home = String(featured.local) === "Casa";
  const club = { name: CLUB.name, src: logo };
  const rival = { name: String(featured.adversario ?? "Adversário"), src: String(featured.logo ?? "") || undefined };
  const left = home ? club : rival;
  const right = home ? rival : club;

  return (
    <section className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
            {isNext ? "Próximo jogo" : "Último jogo"}
          </p>
          <p className="text-[11px] font-bold uppercase tracking-widest opacity-70">{String(featured.competicao ?? "")}</p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 md:gap-16">
          <Badge src={left.src} name={left.name} />
          <div className="text-center">
            {isNext ? (
              <>
                <p className="font-display text-4xl leading-none md:text-6xl">{String(featured.hora ?? "")}</p>
                <p className="mt-2 text-[11px] uppercase tracking-widest opacity-70">{String(featured.data ?? "")}</p>
              </>
            ) : (
              <p className="font-display text-5xl leading-none md:text-7xl">{String(featured.resultado ?? "-")}</p>
            )}
          </div>
          <Badge src={right.src} name={right.name} />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[11px] uppercase tracking-widest opacity-80">
          <span className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" /> {String(featured.estadio ?? "")}
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays className="h-3.5 w-3.5" /> {String(featured.data ?? "")} · {home ? "Em casa" : "Fora"}
          </span>
        </div>
      </div>
    </section>
  );
}
