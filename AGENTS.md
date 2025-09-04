# Repository Guidelines

## Project Structure & Module Organization
- Root-level static site: `index.html`, `report.html`, `CNAME`, `README.md`.
- No build system or backend; GitHub Pages serves directly from `main`.
- Add assets under `assets/` with subfolders like `assets/css/`, `assets/js/`, `assets/img/` as the site grows.

## Build, Test, and Development Commands
- Run locally (simple HTTP): `python -m http.server 8000` then open `http://localhost:8000`.
- Quick HTML preview: open `index.html` directly in a browser (may bypass relative path checks).
- Optional link check (Node): `npx linkinator .` to catch broken links.

## Coding Style & Naming Conventions
- Indentation: 2 spaces for HTML/CSS/JS; no tabs.
- Filenames: lowercase, hyphen-separated (e.g., `landing-page.html`, `site-header.css`).
- HTML: semantic tags, minimal inline styles; prefer external CSS/JS in `assets/`.
- JS: keep scripts small and in modules; avoid global variables.
- Formatting: keep lines readable; run a formatter if available (e.g., Prettier) before committing.

## Testing Guidelines
- Manual checks: load pages locally, verify navigation, images, and relative links.
- Validation: use the W3C HTML/CSS validators; ensure console has no JS errors.
- Screens: test in at least Chrome and Firefox; verify mobile layout.
- Naming: if adding tests/tools later, place in `tests/` with descriptive names (e.g., `links.spec.*`).

## Commit & Pull Request Guidelines
- Commits: imperative mood, concise subject (≤50 chars), details in body if needed.
  - Example: `fix: correct broken nav link` or `docs: update README with local setup`.
- PRs: include clear description, motivation, and screenshots for UI changes.
- Link related issues (e.g., `Closes #12`).
- Keep diffs focused; prefer smaller PRs for easier review.

## Security & Configuration Tips
- Keep `CNAME` intact for custom domain; verify GitHub Pages settings after DNS changes.
- No secrets in the repo; this is a public static site.
- Validate all external script URLs and use HTTPS.
