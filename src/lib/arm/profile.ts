import {
  detectIntents,
  detectObjections,
  detectService,
  extractBudget,
  extractBusinessType,
  extractCompany,
  extractEmail,
  extractName,
  extractPhone,
  extractTimeline,
} from "./extract";
import type { Objection, Timeline } from "./extract";
import type { ServiceId } from "./catalog";

/**
 * Perfil comercial de una conversación, reconstruido en cada turno a partir de
 * los mensajes del cliente. El servidor no guarda estado entre mensajes.
 */
export interface ArmProfile {
  serviceId?: ServiceId;
  businessType?: string;
  budgetPEN?: number;
  /** El cliente respondió "Aún no lo sé" al presupuesto. */
  budgetUnknown: boolean;
  timeline?: Timeline;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  objections: Objection[];
  wantsMeeting: boolean;
  userMessageCount: number;
  needSummary?: string;
}

export function buildProfile(userMessages: readonly string[]): ArmProfile {
  const profile: ArmProfile = {
    objections: [],
    wantsMeeting: false,
    budgetUnknown: false,
    userMessageCount: userMessages.length,
  };

  for (const raw of userMessages) {
    const text = raw.slice(0, 1000);
    profile.serviceId = detectService(text) ?? profile.serviceId;
    profile.businessType = extractBusinessType(text) ?? profile.businessType;
    profile.budgetPEN = extractBudget(text) ?? profile.budgetPEN;
    profile.timeline = extractTimeline(text) ?? profile.timeline;
    profile.name = extractName(text) ?? profile.name;
    profile.company = extractCompany(text) ?? profile.company;
    profile.email = extractEmail(text) ?? profile.email;
    profile.phone = extractPhone(text) ?? profile.phone;
    if (/a[uú]n no lo s[eé]|no tengo (un )?presupuesto|no s[eé] cu[aá]nto/i.test(text)) profile.budgetUnknown = true;
    if (detectIntents(text).wantsMeeting) profile.wantsMeeting = true;
    for (const o of detectObjections(text)) {
      if (!profile.objections.includes(o)) profile.objections.push(o);
    }
  }

  const substantive = userMessages
    .filter((m) => m.trim().length >= 25 && !extractPhone(m) && !extractEmail(m))
    .sort((a, b) => b.length - a.length)[0];
  if (substantive) profile.needSummary = substantive.trim().slice(0, 280);

  return profile;
}

export function hasContact(profile: Pick<ArmProfile, "email" | "phone">): boolean {
  return Boolean(profile.email || profile.phone);
}
