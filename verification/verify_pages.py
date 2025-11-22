from playwright.sync_api import Page, expect, sync_playwright

def verify_project_pages(page: Page):
    # Verify Deepfake Detection page
    page.goto("http://localhost:8000/projects/Deepfake-detection-html-1.html")
    expect(page).to_have_title("Adversarially Robust Deepfake Detection")
    page.screenshot(path="verification/deepfake.png")

    # Verify ASL Fingerspelling page
    page.goto("http://localhost:8000/projects/ASL-fingerspelling-text.html")
    expect(page).to_have_title("Transformer-Based ASL Fingerspelling to Text")
    page.screenshot(path="verification/asl.png")

    # Verify Churn Prevention page
    page.goto("http://localhost:8000/projects/churn-prevention.html")
    expect(page).to_have_title("Churn Prevention Using Survival Analysis and Next-Best-Action Modeling")
    page.screenshot(path="verification/churn.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_project_pages(page)
        finally:
            browser.close()
