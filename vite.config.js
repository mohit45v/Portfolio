import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Emits robots.txt and sitemap.xml at build time so the absolute origin is
 * defined once (VITE_SITE_URL) instead of being hardcoded in three files.
 */
const seoFiles = (siteUrl) => ({
  name: 'emit-seo-files',
  apply: 'build',
  generateBundle() {
    const origin = siteUrl.replace(/\/$/, '')
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

  return {
    plugins: [react(), tailwindcss(), seoFiles(siteUrl)],
  }
})
