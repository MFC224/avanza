/**
 * AVANZA Lightweight Analytics & Conversion Tracking Helper
 * Dispatches conversion events safely to dataLayer (GTM/GA4) or custom providers.
 */

export type ConversionEvent =
  | "click_cotizar_proyecto"
  | "submit_estimator"
  | "open_arm_assistant"
  | "submit_contact_form"
  | "click_whatsapp_direct"
  | "arm_lead_captured"
  | "arm_booking_created"
  | "arm_whatsapp_handoff";

export function trackEvent(
  eventName: ConversionEvent,
  properties?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;

  try {
    // 1. Google Tag Manager / GA4 DataLayer
    const win = window as unknown as { dataLayer?: Array<Record<string, unknown>> };
    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({
        event: eventName,
        timestamp: new Date().toISOString(),
        ...properties,
      });
    }

    // 2. Dispatch custom DOM event for decoupled integrations
    window.dispatchEvent(
      new CustomEvent("avanza:analytics", {
        detail: { eventName, properties },
      })
    );

    // 3. Development logging
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics Event] ${eventName}:`, properties);
    }
  } catch (err) {
    // Analytics should never break user interactions
    console.warn("[Analytics Warning] Failed to dispatch event:", err);
  }
}
