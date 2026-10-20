// Every page the site can show, one route per URL. The build writes an HTML file for each
// (scripts/prerender.js) and lists them in sitemap.xml (vite.config.js). Plain JS, no JSX.
import { SITEMAP_PATHS, pathFor, routeFor } from './paths.js'
import HW_DATA from '../design/site-data.js'
import HW_ARTICLES from '../design/articles-data.js'
import { CLIPS, slugOf } from '../design/news-data.js'
import { VEHICLES } from '../design/investment-data.js'

const ALL = [
  ...SITEMAP_PATHS.map(routeFor),
  ...HW_DATA.projects.map((p) => 'properties/' + p.slug),
  ...HW_ARTICLES.map((a) => 'insights/perspectives/' + a.slug),
  ...CLIPS.filter((c) => !c.url).map((c) => 'insights/news/' + slugOf(c)),
  ...HW_DATA.issues.filter((i) => i.live).map((i) => 'insights/newsletter/' + i.no),
  ...VEHICLES.map((v) => 'investment/' + v.slug),
  'investment/advisors',
  'investment/portal',
  'insights/learn',
  'legal/terms',
]

// Some routes share a URL (investment/flexible is /investors/direct-investments); keep one each.
export const PAGE_ROUTES = ALL.filter((r, i) => ALL.findIndex((o) => pathFor(o) === pathFor(r)) === i)
