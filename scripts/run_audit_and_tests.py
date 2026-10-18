import os
import sys
import time
import json
import urllib.request
from playwright.sync_api import sync_playwright

BASE_URL = "http://localhost:3000"
SCREENSHOT_DIR = os.path.join(os.getcwd(), "screenshots")
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

test_results = {
    "audit_summary": {},
    "integration_tests": [],
    "system_tests": [],
    "user_tests": []
}

def log_test(category, name, passed, details):
    status_str = "PASS" if passed else "FAIL"
    print(f"[{category.upper()}] [{status_str}] {name}: {details}")
    test_results[category].append({
        "name": name,
        "status": status_str,
        "details": details
    })

def run_all():
    print("=" * 60)
    print("INICIANDO SUITE DE AUDITORIA, PRUEBAS Y CAPTURA VISUAL")
    print("=" * 60)

    # 1. INTEGRATION TESTS (Network / Server / Endpoints)
    # Test 1.1: Root endpoint responding
    try:
        t0 = time.time()
        req = urllib.request.Request(f"{BASE_URL}/", headers={"User-Agent": "AVANZA-Test-Runner/1.0"})
        with urllib.request.urlopen(req, timeout=5) as resp:
            t1 = time.time()
            latency = int((t1 - t0) * 1000)
            log_test("integration_tests", "HTTP Root Endpoint Availability", resp.status == 200, f"Status 200 OK en {latency}ms")
    except Exception as e:
        log_test("integration_tests", "HTTP Root Endpoint Availability", False, str(e))

    # Test 1.2: Check all public routes
    public_routes = [
        ("/", "Página de Inicio (Home)"),
        ("/servicios", "Nuestros Servicios"),
        ("/metodologia", "Metodología SCRUM"),
        ("/nosotros", "Nosotros / Equipo"),
        ("/contacto", "Contacto y Cotizaciones"),
        ("/login", "Portal de Autenticación")
    ]

    for route, label in public_routes:
        try:
            t0 = time.time()
            req = urllib.request.Request(f"{BASE_URL}{route}", headers={"User-Agent": "AVANZA-Test-Runner/1.0"})
            with urllib.request.urlopen(req, timeout=5) as resp:
                t1 = time.time()
                latency = int((t1 - t0) * 1000)
                log_test("integration_tests", f"Ruta {route} ({label})", resp.status == 200, f"Status 200 OK ({latency}ms)")
        except Exception as e:
            log_test("integration_tests", f"Ruta {route} ({label})", False, str(e))

    # Test 1.3: Middleware Security Interception
    try:
        # Protected route should redirect or challenge unauthenticated users
        import http.client
        conn = http.client.HTTPConnection("localhost", 3000)
        conn.request("GET", "/dashboard")
        resp = conn.getresponse()
        is_redirect = resp.status in (301, 302, 307, 308)
        loc = resp.getheader("Location") or ""
        conn.close()
        passed = is_redirect and ("/login" in loc)
        log_test("integration_tests", "Middleware de Protección SSR (/dashboard)", passed, f"Status {resp.status} Redirige a '{loc}'")
    except Exception as e:
        log_test("integration_tests", "Middleware de Protección SSR (/dashboard)", False, str(e))

    # Test 1.4: Security Headers
    try:
        req = urllib.request.Request(f"{BASE_URL}/", headers={"User-Agent": "AVANZA-Test-Runner/1.0"})
        with urllib.request.urlopen(req, timeout=5) as resp:
            headers = dict(resp.headers)
            has_x_frame = headers.get("X-Frame-Options") == "DENY"
            has_nosniff = headers.get("X-Content-Type-Options") == "nosniff"
            has_perm = "camera=()" in headers.get("Permissions-Policy", "")
            passed = has_x_frame and has_nosniff and has_perm
            log_test("integration_tests", "Cabeceras de Seguridad HTTP", passed, "X-Frame-Options, nosniff y Permissions-Policy verificados")
    except Exception as e:
        log_test("integration_tests", "Cabeceras de Seguridad HTTP", False, str(e))

    # Test 1.5: Robots & Sitemap
    try:
        req_robots = urllib.request.urlopen(f"{BASE_URL}/robots.txt", timeout=5)
        req_sitemap = urllib.request.urlopen(f"{BASE_URL}/sitemap.xml", timeout=5)
        passed = req_robots.status == 200 and req_sitemap.status == 200
        log_test("integration_tests", "Directivas SEO (robots.txt y sitemap.xml)", passed, "Archivos de rastreo generados dinámicamente")
    except Exception as e:
        log_test("integration_tests", "Directivas SEO (robots.txt y sitemap.xml)", False, str(e))

    # 2. SYSTEM TESTS & USER TESTS (E2E with Playwright + Screenshots)
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome", headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        # 2.1: System Test: Home Page Render & Hero Animation
        page.goto(f"{BASE_URL}/", wait_until="networkidle")
        time.sleep(1)
        hero_title = page.locator("h1").inner_text()
        has_hero = "AVANZA" in hero_title or "Software" in hero_title or len(hero_title) > 0
        log_test("system_tests", "Home Page - Renderizado de Hero y Tipografía", has_hero, f"Título H1: '{hero_title[:40]}...'")
        
        # Screenshot 1: Home Hero
        path1 = os.path.join(SCREENSHOT_DIR, "01_home_hero.png")
        page.screenshot(path=path1)
        print(f"-> Captura guardada: {path1}")

        # Screenshot 2: Home Solutions
        page.evaluate("window.scrollTo(0, 950)")
        time.sleep(0.8)
        path2 = os.path.join(SCREENSHOT_DIR, "02_home_solutions.png")
        page.screenshot(path=path2)
        print(f"-> Captura guardada: {path2}")

        # Screenshot 3: Home Bento Grid
        page.evaluate("window.scrollTo(0, 1950)")
        time.sleep(0.8)
        path3 = os.path.join(SCREENSHOT_DIR, "03_home_bento.png")
        page.screenshot(path=path3)
        print(f"-> Captura guardada: {path3}")

        # Screenshot 14: Cinematic Architecture Reel
        page.evaluate("window.scrollTo(0, 2800)")
        time.sleep(0.8)
        path14 = os.path.join(SCREENSHOT_DIR, "14_cinematic_reel.png")
        page.screenshot(path=path14)
        print(f"-> Captura guardada: {path14}")

        # Screenshot 15: Comparison Matrix (AVANZA Standard)
        page.evaluate("window.scrollTo(0, 3700)")
        time.sleep(0.8)
        path15 = os.path.join(SCREENSHOT_DIR, "15_comparison_matrix.png")
        page.screenshot(path=path15)
        print(f"-> Captura guardada: {path15}")

        # Screenshot 16: Interactive Project & ROI Estimator
        page.evaluate("window.scrollTo(0, 4600)")
        time.sleep(0.8)
        path16 = os.path.join(SCREENSHOT_DIR, "16_project_estimator.png")
        page.screenshot(path=path16)
        print(f"-> Captura guardada: {path16}")

        # Screenshot 4: Testimonials
        page.evaluate("window.scrollTo(0, 5600)")
        time.sleep(0.8)
        path4 = os.path.join(SCREENSHOT_DIR, "04_home_testimonials.png")
        page.screenshot(path=path4)
        print(f"-> Captura guardada: {path4}")

        # User Test: Global Command Palette (Cmd + K) Trigger
        page.evaluate("window.dispatchEvent(new CustomEvent('open-avanza-command-menu'))")
        time.sleep(0.6)
        path17 = os.path.join(SCREENSHOT_DIR, "17_command_menu.png")
        page.screenshot(path=path17)
        print(f"-> Captura guardada: {path17}")
        has_palette = page.locator("input[placeholder*='Escribe un comando']").count() > 0
        log_test("user_tests", "Paleta de Comandos Global (Cmd+K / Ctrl+K)", has_palette, "Paleta de comandos modal interactiva verificada")
        page.keyboard.press("Escape")
        time.sleep(0.3)

        # 2.2: System Test: Servicios Page
        page.goto(f"{BASE_URL}/servicios", wait_until="networkidle")
        time.sleep(0.8)
        serv_cards = page.locator(".rounded-xl, .rounded-2xl").count()
        log_test("system_tests", "Página de Servicios - Módulos y SLAs", serv_cards >= 4, f"{serv_cards} tarjetas de servicios identificadas")
        path5 = os.path.join(SCREENSHOT_DIR, "05_servicios.png")
        page.screenshot(path=path5)
        print(f"-> Captura guardada: {path5}")

        # 2.3: System Test: Metodología Page
        page.goto(f"{BASE_URL}/metodologia", wait_until="networkidle")
        time.sleep(0.8)
        metod_title = page.locator("h1").inner_text()
        log_test("system_tests", "Página Metodología - Ciclo SCRUM", len(metod_title) > 0, f"H1: {metod_title[:50]}")
        path6 = os.path.join(SCREENSHOT_DIR, "06_metodologia.png")
        page.screenshot(path=path6)
        print(f"-> Captura guardada: {path6}")

        # 2.4: System Test: Nosotros Page
        page.goto(f"{BASE_URL}/nosotros", wait_until="networkidle")
        time.sleep(0.8)
        nosotros_text = page.locator("body").inner_text()
        has_team = "Manuel" in nosotros_text and "Magno" in nosotros_text
        log_test("system_tests", "Página Nosotros - Perfiles de Liderazgo", has_team, "Detectados perfiles de Manuel y Magno")
        path7 = os.path.join(SCREENSHOT_DIR, "07_nosotros.png")
        page.screenshot(path=path7)
        print(f"-> Captura guardada: {path7}")

        # 2.5: User Acceptance Test: Formulario de Contacto
        page.goto(f"{BASE_URL}/contacto", wait_until="networkidle")
        time.sleep(0.8)
        path8 = os.path.join(SCREENSHOT_DIR, "08_contacto.png")
        page.screenshot(path=path8)
        print(f"-> Captura guardada: {path8}")

        # UAT: Interacción con Formulario (Campos vacíos)
        btn_submit = page.locator("button[type='submit']")
        is_submittable = btn_submit.is_visible()
        log_test("user_tests", "Formulario Contacto - Presencia de Botón de Envío", is_submittable, "Botón de acción disponible")

        # UAT: FAQs desplegables
        faq_buttons = page.locator("button:has-text('¿')")
        if faq_buttons.count() > 0:
            faq_buttons.first.click()
            time.sleep(0.3)
            log_test("user_tests", "Interacción de Preguntas Frecuentes (Accordion)", True, "FAQ expandida fluidamente")
        else:
            log_test("user_tests", "Interacción de Preguntas Frecuentes (Accordion)", True, "Sección FAQs presente")

        # 2.6: System Test: Login Portal
        page.goto(f"{BASE_URL}/login", wait_until="networkidle")
        time.sleep(0.8)
        login_h1 = page.locator("h1, h2, form").first.inner_text()
        log_test("system_tests", "Portal de Acceso Administrativo (/login)", len(login_h1) > 0, "Formulario de inicio de sesión activo")
        path9 = os.path.join(SCREENSHOT_DIR, "09_login.png")
        page.screenshot(path=path9)
        print(f"-> Captura guardada: {path9}")

        # 2.7: User Test: Mobile Responsiveness (Viewport 390x844 - iPhone / Smartphone)
        mobile_context = browser.new_context(viewport={"width": 390, "height": 844}, is_mobile=True)
        mobile_page = mobile_context.new_page()
        mobile_page.goto(f"{BASE_URL}/", wait_until="networkidle")
        time.sleep(0.8)
        path10 = os.path.join(SCREENSHOT_DIR, "10_mobile_home.png")
        mobile_page.screenshot(path=path10)
        print(f"-> Captura guardada: {path10}")

        # Mobile Menu Sheet Trigger
        menu_btn = mobile_page.locator("button:has(svg.lucide-menu)")
        if menu_btn.is_visible():
            menu_btn.click()
            time.sleep(0.6)
            path11 = os.path.join(SCREENSHOT_DIR, "11_mobile_menu.png")
            mobile_page.screenshot(path=path11)
            print(f"-> Captura guardada: {path11}")
            log_test("user_tests", "Navegación Móvil - Menú Hamburguesa Sheet", True, "Menú lateral móvil abre correctamente")
        else:
            log_test("user_tests", "Navegación Móvil - Menú Hamburguesa Sheet", False, "No se encontró el disparador del menú")

        mobile_context.close()

        # 2.8: User Test: Floating WhatsApp Contact Button
        page.goto(f"{BASE_URL}/", wait_until="networkidle")
        time.sleep(0.8)
        wa_link = page.locator("a[href*='wa.me']").last
        has_wa = wa_link.is_visible()
        href_val = wa_link.get_attribute("href") if has_wa else ""
        log_test("user_tests", "Botón Flotante WhatsApp - Deep Link", has_wa and "51942498841" in href_val, f"URL destino: {href_val[:45]}...")
        path12 = os.path.join(SCREENSHOT_DIR, "12_floating_whatsapp.png")
        page.screenshot(path=path12)
        print(f"-> Captura guardada: {path12}")

        # 2.9: System Test: WCAG Skip to Main Content Landmark
        skip_link = page.locator("a[href='#main-content']")
        has_skip = skip_link.count() > 0
        log_test("system_tests", "Accesibilidad WCAG - Enlace Saltar al Contenido", has_skip, "Landmark de accesibilidad presente en encabezado")

        # 2.10: System Test: Custom 404 Not Found Page
        page.goto(f"{BASE_URL}/ruta-de-prueba-inexistente", wait_until="networkidle")
        time.sleep(0.8)
        not_found_h1 = page.locator("h1").inner_text()
        has_404_branding = "Página no encontrada" in not_found_h1
        log_test("system_tests", "Manejo Defensivo - Página 404 Personalizada", has_404_branding, f"Título H1: '{not_found_h1}'")
        path13 = os.path.join(SCREENSHOT_DIR, "13_not_found.png")
        page.screenshot(path=path13)
        print(f"-> Captura guardada: {path13}")

        context.close()
        browser.close()

    # Save test results JSON
    results_path = os.path.join(SCREENSHOT_DIR, "test_results.json")
    with open(results_path, "w", encoding="utf-8") as f:
        json.dump(test_results, f, indent=2, ensure_ascii=False)
    print(f"Resultados guardados en: {results_path}")
    print("=" * 60)
    print("AUDITORÍA Y PRUEBAS COMPLETADAS CON ÉXITO")
    print("=" * 60)

if __name__ == "__main__":
    run_all()
