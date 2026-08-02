/**
 * Converte qualquer formato de data (YYYY-MM-DD ou DD MMM YYYY) para o formato padrão estrito DD/MM/YYYY.
 * Exemplo:
 * - "2026-08-02" -> "02/08/2026"
 * - "30 Jul 2026" -> "30/07/2026"
 * - "02/08/2026" -> "02/08/2026"
 */
export function formatDateDDMMYYYY(dateInput?: string): string {
  if (!dateInput) return "";
  const trimmed = String(dateInput).trim();

  // Já em formato DD/MM/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed)) {
    return trimmed;
  }

  // Formato ISO YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [y, m, d] = trimmed.split("-");
    return `${d}/${m}/${y}`;
  }

  // Formato com mês por extenso/abreviado (ex: "30 Jul 2026", "02 Ago 2026")
  const monthMap: Record<string, string> = {
    jan: "01",
    fev: "02",
    mar: "03",
    abr: "04",
    mai: "05",
    jun: "06",
    jul: "07",
    ago: "08",
    set: "09",
    out: "10",
    nov: "11",
    dez: "12",
  };

  const parts = trimmed.split(/\s+/);
  if (parts.length === 3) {
    const day = parts[0].padStart(2, "0");
    const monthStr = parts[1].toLowerCase().substring(0, 3);
    const year = parts[2];
    if (monthMap[monthStr]) {
      return `${day}/${monthMap[monthStr]}/${year}`;
    }
  }

  return trimmed;
}

/**
 * Converte um formato DD/MM/YYYY ou texto para YYYY-MM-DD consumível por um <input type="date">.
 */
export function dateToInputFormat(dateInput?: string): string {
  if (!dateInput) return new Date().toISOString().split("T")[0];
  const trimmed = String(dateInput).trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(trimmed)) {
    const [d, m, y] = trimmed.split("/");
    return `${y}-${m}-${d}`;
  }

  return new Date().toISOString().split("T")[0];
}
