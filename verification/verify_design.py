
from playwright.sync_api import sync_playwright, expect
import time

def verify_site():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to home
        page.goto("http://localhost:8000")
        time.sleep(1) # Wait for canvas and animations

        # Screenshot Home
        page.screenshot(path="verification/home.png")

        # Click Projects
        page.click("a[href='#projects']")
        time.sleep(1)
        page.screenshot(path="verification/projects.png")

        # Click Contact
        page.click("a[href='#contact']")
        time.sleep(1)
        page.screenshot(path="verification/contact.png")

        browser.close()

if __name__ == "__main__":
    verify_site()
