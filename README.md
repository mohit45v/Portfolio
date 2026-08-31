# Portfolio — Mohit Sonu Dhangar

Source for my personal site: a single-page portfolio built with React 19, Vite 7 and Tailwind v4.

**Live:** _set `VITE_SITE_URL` in `.env` and add the link here_

---

## Running locally

```bash
npm install
npm run dev
```

| Script            | Purpose                                      |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Vite dev server with HMR                     |
| `npm run build`   | Production build to `dist/`                  |
| `npm run preview` | Serve the production build locally           |
| `npm run lint`    | ESLint — must exit clean before a commit     |

## Configuration

Copy the values in `.env` and set them for your deployment:

| Variable         | Required | Purpose                                                                 |
| ---------------- | -------- | ----------------------------------------------------------------------- |
| `VITE_SITE_URL`  | yes      | Absolute origin. Drives `canonical`, `og:url`, `og:image`, `robots.txt`, `sitemap.xml`. |
| `VITE_API_URL`   | no       | Base URL of the portfolio API. When set, the view counter reads from `${VITE_API_URL}/v1/views`. |

`robots.txt` and `sitemap.xml` are generated at build time from `VITE_SITE_URL`
by a small plugin in `vite.config.js`, so the origin is defined in exactly one place.

## Structure

```
src/
  App.jsx                       # page composition + content data
  index.css                     # Tailwind theme tokens and base styles
  hooks/useMediaQuery.js        # matchMedia subscription + prefers-reduced-motion
  components/
    ArchitectureDiagram.jsx     # per-project system diagram
    PageViews.jsx               # footer view counter
public/
  og-image.png                  # 1200x630 social preview
```

## Notes on choices

- **Content lives as plain data at the top of `App.jsx`.** Small enough that a CMS
  would cost more than it saves; the arrays are the single source of truth.
- **Motion is opt-out.** `MotionConfig reducedMotion="user"` covers Framer Motion,
  Lenis smooth scroll is skipped entirely under `prefers-reduced-motion`, and the
  looping diagram animation falls back to a static marker.
- **The view counter shows the real number.** No offsets, no padding.

## Roadmap

- [ ] Move content behind a NestJS API (`/v1/projects`, `/v1/experience`, `/v1/views`)
      with a published OpenAPI spec, and consume it here with a static fallback.
- [ ] Case studies rewritten around constraint → decision → tradeoff → measured result.
- [ ] Pull in published writing from Hashnode / Medium.

## License

MIT
