import { CalendarDays, MapPin } from "lucide-react";
import logo from "@/assets/logo-cd.png";
import { useAdmin, Row } from "@/admin/store";
import { CLUB } from "@/data/club";
import { formatDateDDMMYYYY } from "@/lib/formatters";

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

/**
 * Converte strings de data em formato português (ex: "01 Ago 2026", "2026-08-01") para objeto Date
 */
function parseMatchDate(dateStr: string): Date | null {
  if (!dateStr) return null;
  const clean = dateStr.trim().toLowerCase();

  // Formato ISO (ex: 2026-08-01)
  if (/^\d{4}-\d{2}-\d{2}/.test(clean)) {
    const d = new Date(clean);
    return isNaN(d.getTime()) ? null : d;
  }

  // Formato Português (ex: "01 ago 2026" ou "1 agosto 2026")
  const months: Record<string, number> = {
    jan: 0, fev: 1, mar: 2, abr: 3, mai: 4, jun: 5,
    jul: 6, ago: 7, set: 8, out: 9, nov: 10, dez: 11,
    janeiro: 0, fevereiro: 1, marco: 2, março: 2, abril: 3, maio: 4, junho: 5,
    julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11
  };

  const parts = clean.split(/\s+/);
  if (parts.length >= 3) {
    const day = parseInt(parts[0], 10);
    const monthKey = parts[1].substring(0, 3);
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && months[monthKey] !== undefined && !isNaN(year)) {
      return new Date(year, months[monthKey], day);
    }
  }

  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Avalia se o Último Jogo com resultado deve ser exibido no MatchStrip.
 * Regra: Exibe o resultado do jogo até ao final do dia seguinte ao jogo.
 * A partir do dia posterior, altera automaticamente para o Próximo Jogo.
 */
function shouldShowLastMatch(lastRow: Row | undefined): boolean {
  if (!lastRow || !lastRow.resultado) return false;

  const matchDate = parseMatchDate(String(lastRow.data ?? ""));
  const savedAt = lastRow.resultado_guardado_em ? new Date(Number(lastRow.resultado_guardado_em)) : null;
  const now = new Date();

  if (matchDate) {
    // Fim do dia seguinte (ex: jogo a 1 de Agosto -> expira a 3 de Agosto 00:00:00)
    const expirationDate = new Date(
      matchDate.getFullYear(),
      matchDate.getMonth(),
      matchDate.getDate() + 2,
      0, 0, 0, 0
    );

    // Se hoje ainda for o dia do jogo ou o dia a seguir ao jogo (ex: dia 1 ou dia 2)
    if (now < expirationDate) {
      return true;
    }
  }

  if (savedAt) {
    // Se foi guardado há menos de 36 horas (para o caso de ser adicionado no admin sem data padrão)
    const hoursSinceSave = (now.getTime() - savedAt.getTime()) / (1000 * 60 * 60);
    if (hoursSinceSave <= 36) {
      return true;
    }
  }

  return false;
}

export function MatchStrip() {
  const jogos = useAdmin((s) => s.jogos);
  const next = jogos.find((j) => String(j.tipo).startsWith("Próximo"));
  const last = jogos.find((j) => String(j.tipo).startsWith("Último"));

  // Decisão inteligente baseada na data do jogo e data atual
  const showLast = shouldShowLastMatch(last);
  const featured = (showLast ? last : next) ?? next ?? last;
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
          <span className="flex items-center gap-1.5 font-mono">
            <CalendarDays className="h-3 w-3 text-accent" /> {formatDateDDMMYYYY(String(featured.data ?? ""))} · {home ? "Em casa" : "Fora"}
          </span>
        </div>
      </div>
    </div>
  );
}
