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
| `VITE_API_URL`   | no       | Base URL of the portfolio API. When set, the view counter reads `${VITE_API_URL}/v1/views` and the status pet polls `${VITE_API_URL}/v1/health`. |

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
    StatusPet.jsx               # draggable status daemon (build info + live health)
public/
  og-image.png                  # 1200x630 social preview
```

## Notes on choices

- **Content lives as plain data at the top of `App.jsx`.** Small enough that a CMS
  would cost more than it saves; the arrays are the single source of truth.
- **Motion is opt-out.** `MotionConfig reducedMotion="user"` covers Framer Motion,
  Lenis smooth scroll is skipped entirely under `prefers-reduced-motion`, and the
  looping diagram animation falls back to a static marker.
- **The view counter shows the real number.** No offsets, no padding. It stays
  dormant until `VITE_API_URL` is set, rather than calling a dead endpoint.
- **The status pet reports facts, not flattery.** It shows the real commit SHA and
  deploy time (injected at build time from git / `VERCEL_GIT_COMMIT_SHA`), and once
  `VITE_API_URL` is set it polls `/v1/health` and turns its eyes green / amber / red
  with real uptime and p95 numbers.

## Roadmap

- [ ] Move content behind a NestJS API (`/v1/projects`, `/v1/experience`, `/v1/views`)
      with a published OpenAPI spec, and consume it here with a static fallback.
- [ ] Case studies rewritten around constraint → decision → tradeoff → measured result,
      with the shipped integrations (telephony, Meta/WhatsApp) as the substance of the
      Akashic entry.
- [ ] Pull in published writing from Hashnode / Medium.

## License

MIT
