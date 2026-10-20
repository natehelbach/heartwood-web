import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { pathFor, DEFAULT_SITE_URL } from './src/site/paths.js'
import { PAGE_ROUTES } from './src/site/routes.js'

// Writes sitemap.xml and robots.txt into the build from the site's route table.
// Set VITE_SITE_URL (e.g. in Vercel) to the production domain once it is live.
function seoFiles(siteUrl) {
  const base = siteUrl.replace(/\/$/, '')
  return {
    name: 'heartwood-seo-files',
    generateBundle() {
      const urls = PAGE_ROUTES.map(pathFor).map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n` })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), seoFiles(env.VITE_SITE_URL || DEFAULT_SITE_URL)],
  }
})
