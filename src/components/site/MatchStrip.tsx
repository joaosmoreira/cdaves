import { CalendarDays, MapPin } from "lucide-react";
import logo from "@/assets/logo-cd.png";
import { useAdmin } from "@/admin/store";
import { CLUB } from "@/data/club";

// Só o logo — sem nome
function TeamLogo({ src, name }: { src?: string; name: string }) {
  return src ? (
    <img src={src} alt={`Emblema ${name}`} width={80} height={80} className="h-12 w-12 object-contain sm:h-14 sm:w-14 md:h-16 md:w-16" />
  ) : (
    <div className="grid h-12 w-12 place-items-center rounded-full border border-white/30 font-display text-base sm:h-14 sm:w-14 md:h-16 md:w-16">
      {name.slice(0, 2).toUpperCase()}
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

  const BADGE_W = "w-[5.5rem] sm:w-[6.5rem] md:w-[8.5rem]";

  return (
    <div className="w-full bg-transparent border-t border-white/15 text-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:py-5 md:py-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.3em] text-accent">
            {isNext ? "Próximo jogo" : "Último jogo"}
          </p>
          <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-white/70">{String(featured.competicao ?? "")}</p>
        </div>

        {/* Linha 1 — Logos e HORA/RESULTADO perfeitamente alinhados no mesmo eixo horizontal */}
        <div className="mt-3 sm:mt-4 flex items-center justify-center gap-3 sm:gap-4 md:gap-14">
          <div className={`${BADGE_W} flex justify-center shrink-0`}>
            <TeamLogo src={left.src} name={left.name} />
          </div>

          <div className="text-center shrink-0">
            {isNext ? (
              <p className="font-display text-3xl sm:text-4xl md:text-6xl text-white leading-none">{String(featured.hora ?? "")}</p>
            ) : (
              <p className="font-display text-3xl sm:text-4xl md:text-6xl text-white leading-none">{String(featured.resultado ?? "-")}</p>
            )}
          </div>

          <div className={`${BADGE_W} flex justify-center shrink-0`}>
            <TeamLogo src={right.src} name={right.name} />
          </div>
        </div>

        {/* Data do Jogo centralizada logo abaixo da hora */}
        {isNext && (
          <p className="mt-1.5 text-center text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-widest text-white/70 font-semibold">
            {String(featured.data ?? "")}
          </p>
        )}

        {/* Linha 2 — Nomes das equipas alinhados na mesma linha horizontal */}
        <div className="mt-2 sm:mt-3 flex items-start justify-center gap-3 sm:gap-4 md:gap-14">
          <p className={`${BADGE_W} text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-widest leading-tight break-words text-center text-white/90`}>
            {left.name}
          </p>
          {/* Espaço central equivalente ao marcador para manter simetria */}
          <div className="invisible text-center shrink-0">
            <p className="font-display text-3xl sm:text-4xl md:text-6xl leading-none">00:00</p>
          </div>
          <p className={`${BADGE_W} text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-widest leading-tight break-words text-center text-white/90`}>
            {right.name}
          </p>
        </div>

        {/* Detalhes de Estádio e Local */}
        <div className="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-widest text-white/75">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3 text-accent" /> {String(featured.estadio ?? "")}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3 w-3 text-accent" /> {String(featured.data ?? "")} · {home ? "Em casa" : "Fora"}
          </span>
        </div>
      </div>
    </div>
  );
}
