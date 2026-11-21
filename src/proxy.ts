import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

/**
 * Las direcciones *.vercel.app (vistas previas y alias del despliegue de producción)
 * no deben aparecer en Google: solo el dominio oficial se indexa.
 */
function isVercelHost(request: NextRequest): boolean {
  return (request.headers.get("host") ?? "").endsWith(".vercel.app");
}

export async function proxy(request: NextRequest) {
  if (isVercelHost(request) && request.nextUrl.pathname === "/robots.txt") {
    return new NextResponse("User-agent: *\nDisallow: /\n", { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }
  const response = await updateSession(request);
  if (isVercelHost(request)) response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public asset extensions (svg, png, jpg, jpeg, gif, webp)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
