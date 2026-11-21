/**
 * Agenda del asistente ARM: videollamadas de 25 minutos con 15 de margen,
 * de lunes a viernes, en hora de Lima (UTC-5 todo el año, Perú no cambia de horario).
 * Funciones puras: la reserva real y el bloqueo de doble reserva viven en la base de datos.
 */

export const LIMA_UTC_OFFSET_HOURS = 5;
export const MEETING_MINUTES = 25;
export const BOOKING_WINDOW_DAYS = 21;
/** Antelación mínima para reservar un horario del mismo día. */
export const MIN_LEAD_TIME_MINUTES = 120;

export const SLOT_TIMES = [
  "10:00", "10:40", "11:20", "12:00",
  "14:00", "14:40", "15:20", "16:00", "16:40", "17:20", "18:00",
] as const;

// Feriados nacionales fijos (verificar cada año en gob.pe).
const FIXED_HOLIDAYS = [
  "01-01", "05-01", "06-07", "06-29", "07-23", "07-28", "07-29",
  "08-06", "08-30", "10-08", "11-01", "12-08", "12-09", "12-25",
];

/** Domingo de Pascua (algoritmo de Meeus/Jones/Butcher). */
function easterSunday(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day));
}

function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function holyWeek(year: number): string[] {
  const easter = easterSunday(year).getTime();
  const day = 86_400_000;
  return [isoDate(new Date(easter - 3 * day)), isoDate(new Date(easter - 2 * day))];
}

export function parseDate(dateStr: string): { y: number; m: number; d: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr);
  if (!match) return null;
  const [y, m, d] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const check = new Date(Date.UTC(y, m - 1, d));
  if (check.getUTCMonth() !== m - 1 || check.getUTCDate() !== d) return null;
  return { y, m, d };
}

export function isBusinessDay(dateStr: string): { valid: boolean; reason?: string } {
  const p = parseDate(dateStr);
  if (!p) return { valid: false, reason: "Fecha inválida." };
  const weekday = new Date(Date.UTC(p.y, p.m - 1, p.d)).getUTCDay();
  if (weekday === 0 || weekday === 6) {
    return { valid: false, reason: "Atendemos de lunes a viernes. Elige un día hábil." };
  }
  const mmdd = dateStr.slice(5);
  if (FIXED_HOLIDAYS.includes(mmdd) || holyWeek(p.y).includes(dateStr)) {
    return { valid: false, reason: "Ese día es feriado en el Perú. Elige otro día." };
  }
  return { valid: true };
}

/** Fecha y hora de Lima → instante UTC. */
export function limaToUtc(dateStr: string, time: string): Date {
  const p = parseDate(dateStr);
  const [hh, mm] = time.split(":").map(Number);
  if (!p || Number.isNaN(hh) || Number.isNaN(mm)) throw new Error("Fecha u hora inválida");
  return new Date(Date.UTC(p.y, p.m - 1, p.d, hh + LIMA_UTC_OFFSET_HOURS, mm));
}

/** Instante → fecha (YYYY-MM-DD) y hora (HH:mm) en Lima. */
export function utcToLima(instant: Date | string): { date: string; time: string } {
  const t = new Date(typeof instant === "string" ? instant : instant.getTime());
  const lima = new Date(t.getTime() - LIMA_UTC_OFFSET_HOURS * 3_600_000);
  return { date: isoDate(lima), time: lima.toISOString().slice(11, 16) };
}

export function todayInLima(now: Date = new Date()): string {
  return utcToLima(now).date;
}

function addDays(dateStr: string, days: number): string {
  const p = parseDate(dateStr)!;
  return isoDate(new Date(Date.UTC(p.y, p.m - 1, p.d + days)));
}

/** Próximos días hábiles con al menos un horario libre posible (desde hoy en Lima). */
export function upcomingBusinessDays(count: number, now: Date = new Date()): string[] {
  const days: string[] = [];
  let cursor = todayInLima(now);
  for (let i = 0; i <= BOOKING_WINDOW_DAYS && days.length < count; i++) {
    if (isBusinessDay(cursor).valid && openSlots(cursor, [], now).length > 0) days.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return days;
}

/**
 * Horarios libres de un día. `bookedUtc` son los inicios ya ocupados (ISO).
 * Descarta los horarios pasados o con menos de 2 horas de antelación.
 */
export function openSlots(dateStr: string, bookedUtc: readonly string[], now: Date = new Date()): string[] {
  if (!isBusinessDay(dateStr).valid) return [];
  const taken = new Set(bookedUtc.map((iso) => new Date(iso).getTime()));
  const earliest = now.getTime() + MIN_LEAD_TIME_MINUTES * 60_000;
  const latest = now.getTime() + (BOOKING_WINDOW_DAYS + 1) * 86_400_000;
  return SLOT_TIMES.filter((time) => {
    const start = limaToUtc(dateStr, time).getTime();
    return start >= earliest && start <= latest && !taken.has(start);
  });
}

export function isValidSlot(dateStr: string, time: string, now: Date = new Date()): boolean {
  return (SLOT_TIMES as readonly string[]).includes(time) && openSlots(dateStr, [], now).includes(time);
}

const WEEKDAYS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

export function formatLimaDate(dateStr: string): string {
  const p = parseDate(dateStr);
  if (!p) return dateStr;
  const weekday = WEEKDAYS[new Date(Date.UTC(p.y, p.m - 1, p.d)).getUTCDay()];
  return `${weekday} ${p.d} de ${MONTHS[p.m - 1]}`;
}

export function formatTime12h(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "p. m." : "a. m.";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** Enlace "Agregar a Google Calendar" (no requiere integración ni claves). */
export function googleCalendarUrl(opts: { title: string; details: string; startUtc: Date; minutes?: number }): string {
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const end = new Date(opts.startUtc.getTime() + (opts.minutes ?? MEETING_MINUTES) * 60_000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: opts.title,
    details: opts.details,
    dates: `${fmt(opts.startUtc)}/${fmt(end)}`,
    ctz: "America/Lima",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
