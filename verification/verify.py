from playwright.sync_api import sync_playwright

def verify_layout():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:8000")

        # Wait for the hero section to be visible and active
        page.wait_for_selector(".hero.active")

        # Take a screenshot
        page.screenshot(path="verification/screenshot.png")

        # Also check computed style of .hero.active to ensure it is flex
        hero = page.locator(".hero.active")
        display = hero.evaluate("element => window.getComputedStyle(element).display")
        print(f"Display property of .hero.active is: {display}")

        browser.close()

if __name__ == "__main__":
    verify_layout()
