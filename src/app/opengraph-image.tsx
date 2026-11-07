import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/site-config";

export const alt = "AVANZA | AI & Software Studio de Alto Rendimiento";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "70px 80px",
          backgroundColor: "#ffffff",
          backgroundImage:
            "radial-gradient(circle at 10% 10%, rgba(37, 99, 235, 0.08) 0%, transparent 40%), radial-gradient(circle at 90% 90%, rgba(2, 23, 97, 0.06) 0%, transparent 45%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top Header Badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                backgroundColor: "#021761",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ffffff",
                fontWeight: 900,
                fontSize: "26px",
              }}
            >
              A
            </div>
            <div
              style={{
                fontSize: "32px",
                fontWeight: 900,
                color: "#0f172a",
                letterSpacing: "-0.03em",
              }}
            >
              AVANZA
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 18px",
              backgroundColor: "rgba(37, 99, 235, 0.08)",
              borderRadius: "999px",
              border: "1px solid rgba(37, 99, 235, 0.25)",
              color: "#2563eb",
              fontSize: "16px",
              fontWeight: 700,
            }}
          >
            {SITE_CONFIG.domain}
          </div>
        </div>

        {/* Main Content Center */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "58px",
              fontWeight: 900,
              lineHeight: 1.1,
              color: "#021761",
              letterSpacing: "-0.04em",
              maxWidth: "980px",
            }}
          >
            Software de Alto Rendimiento & Automatización con IA
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#475569",
              lineHeight: 1.4,
              maxWidth: "920px",
            }}
          >
            Sistemas a medida, aplicaciones móviles y agentes inteligentes. Sprints ágiles de 7 a 14 días con código 100% transferido a tu empresa.
          </div>
        </div>

        {/* Footer Technical Highlights */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            paddingTop: "24px",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              display: "flex",
              padding: "8px 16px",
              borderRadius: "10px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              fontSize: "15px",
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            Next.js 16 + React 19
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 16px",
              borderRadius: "10px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              fontSize: "15px",
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            Supabase PostgreSQL RLS
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 16px",
              borderRadius: "10px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              fontSize: "15px",
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            120 FPS High Refresh
          </div>
          <div
            style={{
              display: "flex",
              padding: "8px 16px",
              borderRadius: "10px",
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              fontSize: "15px",
              fontWeight: 700,
              color: "#021761",
            }}
          >
            Lima, Perú · Sprints 7-14 Días
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
