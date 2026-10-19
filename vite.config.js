import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { SITEMAP_PATHS, pathFor } from './src/site/paths.js'
import HW_DATA from './src/design/site-data.js'
import HW_ARTICLES from './src/design/articles-data.js'

// Writes sitemap.xml and robots.txt into the build from the site's route table, and fills
// %SITE_URL% in index.html (Open Graph tags need absolute URLs).
// Set VITE_SITE_URL (e.g. in Vercel) to the production domain once it is live.
function seoFiles(siteUrl) {
  const base = siteUrl.replace(/\/$/, '')
  return {
    name: 'heartwood-seo-files',
    transformIndexHtml: (html) => html.replaceAll('%SITE_URL%', base),
    generateBundle() {
      const paths = [
        ...SITEMAP_PATHS,
        ...HW_DATA.projects.map((p) => pathFor('properties/' + p.slug)),
        ...HW_ARTICLES.map((a) => pathFor('insights/perspectives/' + a.slug)),
      ]
      const urls = [...new Set(paths)].map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n')
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
    plugins: [react(), seoFiles(env.VITE_SITE_URL || 'https://heartwood-web-one.vercel.app')],
  }
})
