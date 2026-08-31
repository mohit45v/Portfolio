import { execSync } from 'node:child_process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Real facts about this build, injected as a compile-time constant so the status
 * pet can report something verifiable without needing a backend. Vercel exposes
 * the commit SHA as an env var; locally we ask git directly.
 */
const buildInfo = () => {
  let sha = process.env.VERCEL_GIT_COMMIT_SHA || ''

  if (!sha) {
    try {
      sha = execSync('git rev-parse HEAD', { stdio: ['ignore', 'pipe', 'ignore'] })
        .toString()
        .trim()
    } catch {
      sha = ''
    }
  }

  return {
    sha: sha ? sha.slice(0, 7) : 'dev',
    builtAt: new Date().toISOString(),
  }
}

/**
 * Emits robots.txt and sitemap.xml at build time so the absolute origin is
 * defined once (VITE_SITE_URL) instead of being hardcoded in three files.
 */
const seoFiles = (origin) => ({
  name: 'emit-seo-files',
  apply: 'build',
  generateBundle() {
    const lastmod = new Date().toISOString().split('T')[0]

    this.emitFile({
      type: 'asset',
      fileName: 'robots.txt',
      source: `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
    })

    this.emitFile({
      type: 'asset',
      fileName: 'sitemap.xml',
      source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
    })
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL || 'https://example.com'

  if (siteUrl.includes('example.com')) {
    console.warn(
      '\n[seo] VITE_SITE_URL is still the placeholder. Set it in .env — ' +
        'canonical, og:url and og:image must be absolute for link previews to work.\n'
    )
  }

  const origin = siteUrl.replace(/\/+$/, '')

  return {
    define: {
      __BUILD_INFO__: JSON.stringify(buildInfo()),
    },
    plugins: [
      react(),
      tailwindcss(),
      seoFiles(origin),
      {
        // Vite's built-in %VAR% substitution injects the raw .env value, so a stray
        // trailing slash would yield "https://site.com//" in canonical and og:url.
        // Doing the replacement here means the origin is normalised no matter what
        // is written in .env.
        name: 'inject-site-origin',
        transformIndexHtml: (html) => html.replaceAll('%VITE_SITE_URL%', origin),
      },
    ],
  }
})
