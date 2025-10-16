
# Shabbir Tashrifwala — Portfolio (Auto-Listing, Final)

**Add new projects/blogs by dropping HTML files into `projects/` and `blogs/`.** The homepage lists them automatically.

## One-time setup
1. Edit `site.config.json` (or the same JSON in `index.html` with id `site-config`):
   - `"repo": "YOUR_GITHUB_USERNAME/YOUR_REPO_NAME"` (e.g., `"shabbirtashrifwala/shabbir-portfolio"`)
   - `"branch": "main"`
   - Keep `"use_api": true` and `"fallback_to_manifest": true` (recommended).
2. Push everything to your repo root and enable GitHub Pages (Settings → Pages → Source: `main` → Folder: `/ (root)`).

## How it works
- On GitHub Pages, the site uses the **GitHub API** to list `/projects` & `/blogs` and fetch metadata from each HTML file.
- Locally or if API fails, it **falls back** to `projects/manifest.json` & `blogs/manifest.json`.
- For each `.html`, include at least:
  ```html
  <title>My Page</title>
  <meta name="description" content="Short card line.">
  <meta name="date" content="YYYY-MM-DD">
  ```
- Cards are sorted by date (newest first). Clicking opens the file.

## Notes
- Home remains non-scrollable; other sections scroll. Hash-based nav only (top-right buttons).
- If you prefer not to use the API, just keep the `manifest.json` files updated.
