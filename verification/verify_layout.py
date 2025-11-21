from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 720})
        page.goto("http://localhost:8000")

        # Wait for hero section
        hero = page.locator(".hero")
        expect(hero).to_be_visible()

        # Check if nav is sticky
        nav = page.locator(".nav")
        expect(nav).to_have_css("position", "sticky")

        # Take screenshot
        page.screenshot(path="verification/homepage_fixed.png")

        browser.close()

if __name__ == "__main__":
    run()
