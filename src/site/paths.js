// Public URL paths for the site's routes. Pages and menus keep navigating by route key
// ("investment/growth-strategy"); this table turns a route into the path shown in the address
// bar ("/investors/growth-trust") and back. Plain JS with no imports from the page code, so
// vite.config.js can read it to build sitemap.xml.

// The live site until VITE_SITE_URL names the production domain.
export const DEFAULT_SITE_URL = 'https://heartwood-web-one.vercel.app'

// [path, route, ...other routes that show the same page]. The first route is the one a path opens.
const PATHS = [
  ['/', 'home'],
  ['/development', 'development/overview', 'development', 'devoverview'],
  ['/development/how-we-build', 'development/design', 'platform'],
  ['/development/projects', 'development/projects'],
  ['/development/standards', 'development/standards', 'about/standards'],
  ['/management', 'management/asset', 'management'],
  ['/management/properties', 'properties'],
  ['/investors', 'investment/overview', 'investment', 'investors', 'investors/private-wealth', 'investors/institutional'],
  ['/investors/growth-trust', 'investment/growth-strategy', 'investment/growth'],
  ['/investors/income-trust', 'investment/income-strategy', 'investment/income'],
  ['/investors/direct-investments', 'investment/direct', 'investment/flexible'],
  ['/insights', 'insights', 'insights/events'],
  ['/insights/perspectives', 'insights/perspectives'],
  ['/insights/news', 'insights/news'],
  ['/insights/podcast', 'insights/podcast'],
  ['/insights/newsletter', 'insights/newsletter'],
  ['/about', 'about/who', 'about'],
  ['/about/team', 'about/leadership'],
  ['/about/careers', 'about/careers'],
  ['/contact', 'about/contact'],
  ['/book-a-call', 'investment/meeting'],
  ['/privacy', 'legal/privacy'],
  ['/disclosures', 'legal/disclosures'],
]

// Routes under these prefixes (property pages, other investor pages) keep their tail:
// "properties/308-parkside" ↔ "/management/properties/308-parkside".
const PREFIXES = [
  ['properties/', '/management/properties/'],
  ['investment/', '/investors/'],
]

const PATH_OF = {}
const ROUTE_OF = {}
for (const [path, route, ...aliases] of PATHS) {
  ROUTE_OF[path] = route
  for (const r of [route, ...aliases]) PATH_OF[r] = path
}

export function pathFor(route) {
  const r = route || 'home'
  if (PATH_OF[r]) return PATH_OF[r]
  const pre = PREFIXES.find(([rp]) => r.startsWith(rp))
  return pre ? pre[1] + r.slice(pre[0].length) : '/' + r
}

export function routeFor(pathname) {
  let p = pathname || '/'
  try {
    p = decodeURIComponent(p)
  } catch {
    // Keep the raw path; it will show the 404 page.
  }
  p = p.replace(/\/+$/, '') || '/'
  if (ROUTE_OF[p]) return ROUTE_OF[p]
  const pre = PREFIXES.find(([, pp]) => p.startsWith(pp))
  return pre ? pre[0] + p.slice(pre[1].length) : p.slice(1)
}

// Paths listed in sitemap.xml.
export const SITEMAP_PATHS = PATHS.map(([path]) => path)

// Props that make an <a> navigate in-app: a real href for new tabs, crawlers and screen
// readers, and a plain left click handled without a page load.
export function linkProps(go, route, before) {
  return {
    href: pathFor(route),
    onClick: (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      e.preventDefault()
      if (before) before()
      go(route)
    },
  }
}
