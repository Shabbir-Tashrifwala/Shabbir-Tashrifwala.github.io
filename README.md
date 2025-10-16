# Shabbir Tashrifwala — Portfolio (Auto-List Projects & Blogs)

**Add a new project or blog by simply dropping an HTML file into `projects/` or `blogs/`.**
The homepage lists them automatically on GitHub Pages.

## One-time setup
1. Edit `site.config.json` (or the same JSON embedded in `index.html` under `#site-config`)

   - Set `"repo": "YOUR_GITHUB_USERNAME/YOUR_REPO_NAME"` (e.g., `"shabbirtashrifwala/shabbir-portfolio"`)

   - Set `"branch": "main"` (or your default)

2. Deploy to GitHub Pages (Settings → Pages → Source: `main` → Folder: `/ (root)`).

## How auto-listing works
- On GitHub Pages, the site uses the public GitHub API to **list directory contents** for `/projects` and `/blogs`.

- For each `.html` file, it fetches the file and reads:

  - `<title>…</title>` → shown as the card title

  - `<meta name="description" content="…">` → shown as the card description

  - `<meta name="date" content="YYYY-MM-DD">` → shown as the meta line (used for sorting)

- Locally (not on `github.io`), it falls back to `projects/manifest.json` and `blogs/manifest.json` for preview.

## Create a new Project/Blog
1. Create a new `.html` file in the right folder (e.g., `projects/my-cool-project.html`).

2. Include at least `<title>` and `<meta name="description">` (optional: `<meta name="date">`).

3. Push to GitHub — it will **appear automatically** on the homepage (no other changes needed).

## Notes

- Rate limits: GitHub API unauthenticated limit is ~60 req/hour per IP; this site makes 1 listing request per folder + N lightweight fetches to read metadata.

- If you prefer not to use the API, keep the manifests updated or switch to a static generator.

- Home remains non-scrollable; individual sections scroll. Navigation uses hash routing between sections.