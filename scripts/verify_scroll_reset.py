from playwright.sync_api import sync_playwright
import time
import os

def test_scroll_restoration():
    print("Iniciando prueba de scroll reset tras navegacion entre paginas...")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        # 1. Visitar /nosotros
        page.goto("http://localhost:3000/nosotros", wait_until="networkidle")
        time.sleep(1)

        # 2. Scroll hasta el fondo de /nosotros
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        for _ in range(10):
            page.mouse.wheel(0, 300)
            time.sleep(0.05)
        time.sleep(1)

        scroll_nosotros = page.evaluate("window.scrollY")
        print(f"[PASO 1] Scroll al final de /nosotros: {scroll_nosotros}px (debe ser > 1000px)")
        assert scroll_nosotros > 1000, f"Error: no se llego al fondo de nosotros (scrollY={scroll_nosotros})"

        # 3. Navegar a /contacto haciendo clic en el enlace del header
        print("[PASO 2] Clic en enlace a '/contacto' en el header...")
        contacto_link = page.locator("header nav a[href='/contacto']")
        contacto_link.click()
        
        # Esperar la navegacion y estabilizacion de animacion
        time.sleep(0.8)

        scroll_contacto_header = page.evaluate("window.scrollY")
        print(f"[PASO 3] Scroll tras navegar a /contacto: {scroll_contacto_header}px (debe ser 0px)")
        assert scroll_contacto_header == 0, f"Fallo: El scroll en /contacto es {scroll_contacto_header}px en vez de 0px"

        # Captura de pantalla de /contacto en el tope
        screenshot_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "screenshots", "verify_scroll_reset_contacto.png")
        page.screenshot(path=screenshot_path)
        print(f"[EVIDENCIA] Captura guardada en: {screenshot_path}")

        # 4. Ahora en /contacto, scrollear hasta el fondo
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        for _ in range(10):
            page.mouse.wheel(0, 300)
            time.sleep(0.05)
        time.sleep(1)
        scroll_contacto_bottom = page.evaluate("window.scrollY")
        print(f"[PASO 4] Scroll al final de /contacto: {scroll_contacto_bottom}px (debe ser > 800px)")
        assert scroll_contacto_bottom > 800, f"Error: no se llego al fondo de contacto (scrollY={scroll_contacto_bottom})"

        # 5. Navegar desde el footer a /servicios
        print("[PASO 5] Clic en enlace a '/servicios' desde el footer...")
        footer_servicios = page.locator("footer a[href='/servicios']").first
        footer_servicios.click()
        time.sleep(0.8)

        scroll_servicios_footer = page.evaluate("window.scrollY")
        print(f"[PASO 6] Scroll tras navegar a /servicios desde el footer: {scroll_servicios_footer}px (debe ser 0px)")
        assert scroll_servicios_footer == 0, f"Fallo: El scroll en /servicios es {scroll_servicios_footer}px en vez de 0px"

        # 6. Navegar desde /servicios (scrolleando al final) de vuelta a /nosotros
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        time.sleep(0.5)
        footer_nosotros = page.locator("footer a[href='/nosotros']").first
        footer_nosotros.click()
        time.sleep(0.8)

        scroll_nosotros_final = page.evaluate("window.scrollY")
        print(f"[PASO 7] Scroll tras navegar a /nosotros desde el footer: {scroll_nosotros_final}px (debe ser 0px)")
        assert scroll_nosotros_final == 0, f"Fallo: El scroll en /nosotros es {scroll_nosotros_final}px en vez de 0px"

        print("\n=======================================================")
        print("TODAS LAS PRUEBAS DE RESTAURACION DE SCROLL: 100% PASS!")
        print("=======================================================")
        browser.close()

if __name__ == "__main__":
    test_scroll_restoration()
