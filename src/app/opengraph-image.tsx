import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/site-config";

export const alt = "AVANZA Software Studio | Quiet Luxury Software & IA";
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
          backgroundColor: "#000000",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo with 3 beams */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "5px",
                height: "36px",
              }}
            >
              <div
                style={{
                  width: "7px",
                  height: "20px",
                  backgroundColor: "#ffffff",
                }}
              />
              <div
                style={{
                  width: "7px",
                  height: "28px",
                  backgroundColor: "#ffffff",
                }}
              />
              <div
                style={{
                  width: "7px",
                  height: "36px",
                  backgroundColor: "#ffffff",
                }}
              />
            </div>
            <div
              style={{
                fontSize: "26px",
                fontWeight: 600,
                color: "#ffffff",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              AVANZA
            </div>
          </div>

          <div
            style={{
              fontSize: "14px",
              color: "#a3a3a3",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {SITE_CONFIG.domain}
          </div>
        </div>

        {/* Main Content Center */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "14px",
              color: "#a3a3a3",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Software Studio · Arquitectura de Ingeniería
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 400,
              lineHeight: 1.08,
              color: "#ffffff",
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
            }}
          >
            Construimos el software que tu empresa merece
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#a3a3a3",
              lineHeight: 1.4,
              maxWidth: "900px",
              fontWeight: 300,
            }}
          >
            Páginas web editoriales, sistemas CRM y agentes de Inteligencia Artificial. Sprints ágiles de 7 a 14 días con código 100% de tu propiedad.
          </div>
        </div>

        {/* Footer Technical Highlights */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid #262626",
            fontSize: "14px",
            color: "#737373",
          }}
        >
          <div>Next.js 16 · React 19 · Supabase · TypeScript</div>
          <div>Lima, Perú · Entregas Semanales</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
