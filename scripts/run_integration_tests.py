import http.client
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

BASE_URL = "http://localhost:3000"
HOST = "localhost"
PORT = 3000
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

test_results = []

def record_test(name, passed, details, latency_ms=0):
    status_str = "PASS" if passed else "FAIL"
    test_results.append({
        "name": name,
        "status": status_str,
        "details": details,
        "latency_ms": latency_ms
    })
    print(f"[{status_str}] {name}: {details} ({latency_ms}ms)")

def run_integration_suite():
    print("=" * 65)
    print("EJECUTANDO SUITE COMPLETA DE PRUEBAS DE INTEGRACIÓN: AVANZA")
    print("=" * 65)

    # -------------------------------------------------------------
    # GRUPO 1: Disponibilidad y Rendimiento de Endpoints Públicos
    # -------------------------------------------------------------
    print("\n--- GRUPO 1: Rutas Públicas y Latencias de Servidor ---")
    public_endpoints = [
        ("/", "Página de Inicio (Home)", "AVANZA"),
        ("/servicios", "Catálogo de Servicios", "Servicios"),
        ("/metodologia", "Metodología SCRUM", "SCRUM"),
        ("/nosotros", "Nosotros / Equipo", "Manuel"),
        ("/contacto", "Contacto y Cotizaciones", "WhatsApp"),
        ("/login", "Portal Administrativo", "password"),
    ]

    for route, label, expected_keyword in public_endpoints:
        try:
            t0 = time.time()
            req = urllib.request.Request(f"{BASE_URL}{route}", headers={"User-Agent": "AVANZA-Integration-Suite/1.0"})
            with urllib.request.urlopen(req, timeout=5) as resp:
                t1 = time.time()
                latency = int((t1 - t0) * 1000)
                body = resp.read().decode("utf-8", errors="ignore")
                has_keyword = expected_keyword.lower() in body.lower()
                passed = (resp.status == 200) and has_keyword
                details = f"Status {resp.status} OK · Keyword '{expected_keyword}' confirmada" if passed else f"Fallo: Status {resp.status}"
                record_test(f"Integración Ruta {route} ({label})", passed, details, latency)
        except Exception as e:
            record_test(f"Integración Ruta {route} ({label})", False, str(e))

    # -------------------------------------------------------------
    # GRUPO 2: Middleware SSR y Aislamiento de Rutas Protegidas
    # -------------------------------------------------------------
    print("\n--- GRUPO 2: Middleware SSR y Aislamiento de Rutas Restringidas ---")
    protected_endpoints = [
        ("/dashboard", "Panel de Control"),
        ("/leads", "Gestión de Prospectos"),
        ("/clients", "Directorio de Clientes"),
        ("/projects", "Administración de Proyectos"),
        ("/finances", "Hitos Financieros"),
        ("/sprints", "Control de Sprints SCRUM")
    ]

    for route, label in protected_endpoints:
        try:
            t0 = time.time()
            conn = http.client.HTTPConnection(HOST, PORT, timeout=5)
            conn.request("GET", route, headers={"User-Agent": "AVANZA-Integration-Suite/1.0"})
            resp = conn.getresponse()
            t1 = time.time()
            latency = int((t1 - t0) * 1000)
            is_redirect = resp.status in (301, 302, 307, 308)
            location = resp.getheader("Location") or ""
            conn.close()

            passed = is_redirect and ("/login" in location)
            details = f"Status {resp.status} interceptado correctamente · Redirige a '{location}'"
            record_test(f"Middleware SSR: {route} ({label})", passed, details, latency)
        except Exception as e:
            record_test(f"Middleware SSR: {route} ({label})", False, str(e))

    # -------------------------------------------------------------
    # GRUPO 3: Manejo Defensivo y Rutas 404
    # -------------------------------------------------------------
    print("\n--- GRUPO 3: Manejo Defensivo y Rutas 404 Inexistentes ---")
    invalid_routes = [
        ("/coordenada-falsa-404", "Ruta Inválida Web"),
        ("/api/endpoint-inexistente", "Ruta Inválida API")
    ]

    for route, label in invalid_routes:
        try:
            t0 = time.time()
            conn = http.client.HTTPConnection(HOST, PORT, timeout=5)
            conn.request("GET", route, headers={"User-Agent": "AVANZA-Integration-Suite/1.0"})
            resp = conn.getresponse()
            t1 = time.time()
            latency = int((t1 - t0) * 1000)
            body = resp.read().decode("utf-8", errors="ignore")
            conn.close()

            passed = (resp.status == 404)
            details = f"Status 404 retornado defensivamente ({latency}ms)"
            record_test(f"Manejo 404: {route} ({label})", passed, details, latency)
        except Exception as e:
            record_test(f"Manejo 404: {route} ({label})", False, str(e))

    # -------------------------------------------------------------
    # GRUPO 4: Cabeceras de Ciberseguridad HTTP
    # -------------------------------------------------------------
    print("\n--- GRUPO 4: Cabeceras de Ciberseguridad HTTP ---")
    try:
        t0 = time.time()
        req = urllib.request.Request(f"{BASE_URL}/", headers={"User-Agent": "AVANZA-Integration-Suite/1.0"})
        with urllib.request.urlopen(req, timeout=5) as resp:
            t1 = time.time()
            latency = int((t1 - t0) * 1000)
            headers = dict(resp.headers)

            h_xframe = headers.get("X-Frame-Options") == "DENY"
            record_test("Cabecera X-Frame-Options (Anti-Clickjacking)", h_xframe, f"Valor: {headers.get('X-Frame-Options')}", latency)

            h_nosniff = headers.get("X-Content-Type-Options") == "nosniff"
            record_test("Cabecera X-Content-Type-Options (Anti-MIME Sniff)", h_nosniff, f"Valor: {headers.get('X-Content-Type-Options')}", latency)

            h_perm = "camera=()" in headers.get("Permissions-Policy", "")
            record_test("Cabecera Permissions-Policy (Hardware Sandbox)", h_perm, f"Valor: {headers.get('Permissions-Policy')}", latency)
    except Exception as e:
        record_test("Cabeceras de Ciberseguridad HTTP", False, str(e))

    # -------------------------------------------------------------
    # GRUPO 5: Directivas SEO Dinámicas (Robots & Sitemap)
    # -------------------------------------------------------------
    print("\n--- GRUPO 5: Directivas SEO Dinámicas ---")
    try:
        # robots.txt
        t0 = time.time()
        with urllib.request.urlopen(f"{BASE_URL}/robots.txt", timeout=5) as resp:
            t1 = time.time()
            latency = int((t1 - t0) * 1000)
            body = resp.read().decode("utf-8", errors="ignore")
            has_sitemap = "sitemap.xml" in body.lower() and "user-agent:" in body.lower()
            record_test("SEO Dinámico: /robots.txt", resp.status == 200 and has_sitemap, f"Status {resp.status} OK · Directiva sitemap presente", latency)

        # sitemap.xml
        t0 = time.time()
        with urllib.request.urlopen(f"{BASE_URL}/sitemap.xml", timeout=5) as resp:
            t1 = time.time()
            latency = int((t1 - t0) * 1000)
            body = resp.read().decode("utf-8", errors="ignore")
            has_xml = "<urlset" in body and "https://avanza.dev" in body
            record_test("SEO Dinámico: /sitemap.xml", resp.status == 200 and has_xml, f"Status {resp.status} OK · XML bien formado con URLs canónicas", latency)
    except Exception as e:
        record_test("Directivas SEO Dinámicas", False, str(e))

    # Resumen y Guardado
    total = len(test_results)
    passed_count = sum(1 for t in test_results if t["status"] == "PASS")
    rate = (passed_count / total) * 100 if total > 0 else 0

    print("\n" + "=" * 65)
    print(f"RESUMEN FINAL: {passed_count}/{total} PRUEBAS SUPERADAS ({rate:.1f}%)")
    print("=" * 65)

    output_path = os.path.join(ROOT_DIR, "screenshots", "integration_results.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(test_results, f, indent=2, ensure_ascii=False)
    print(f"Resultados de integración guardados en: {output_path}")

    return passed_count == total

if __name__ == "__main__":
    success = run_integration_suite()
    sys.exit(0 if success else 1)
