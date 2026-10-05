// Site structure, ported from ui_kits/website/Heartwood Website.dc.html.
// Routes are slash paths ("investment/growth") carried in the URL hash.

// TODO: point at the production investor portal. The design links to a prototype.
export const LOGIN_URL = 'https://heartwood.sgggfsi.com/'

export const LINKEDIN_URL = 'https://www.linkedin.com/company/heartwood-investments'

export const ADDRESS = '25 King St W, Toronto, Ontario M5L 2A1'

// Top-level menus. `g` groups items in the dropdown and the section sub-nav.
export const SECTIONS = {
  investment: {
    label: 'Investments',
    items: [
      { label: 'Overview', r: 'investment/overview' },
      { label: 'Growth', r: 'investment/growth', g: 'Strategies' },
      { label: 'Income', r: 'investment/income', g: 'Strategies' },
      { label: 'Funds', r: 'investment/funds', g: 'Ways to invest' },
      { label: 'Project investments', r: 'investment/flexible', g: 'Ways to invest' },
      { label: 'Services', r: 'investment/services', g: 'Ways to invest' },
      { label: 'Advisors', r: 'investment/advisors', g: 'Who we serve' },
      { label: 'Private wealth', r: 'investment/hnw', g: 'Who we serve' },
      { label: 'Institutional', r: 'investment/institutional', g: 'Who we serve' },
      { label: 'Schedule a meeting', r: 'investment/meeting', g: 'Next steps' },
      { label: 'Investor portal', r: 'investment/portal', g: 'Next steps' },
    ],
  },
  properties: { label: 'Properties', r: 'properties' },
  insights: {
    label: 'Insights',
    items: [
      { label: 'Perspectives', r: 'insights/perspectives' },
      { label: 'News', r: 'insights/news' },
      { label: 'Podcast', r: 'insights/podcast' },
      { label: 'The Long View', r: 'insights/newsletter', tag: 'Newsletter' },
    ],
  },
  about: {
    label: 'About',
    items: [
      { label: 'Who we are', r: 'about/who' },
      { label: 'Team', r: 'about/leadership' },
      { label: 'Careers', r: 'about/careers' },
      { label: 'Contact', r: 'about/contact' },
    ],
  },
}

export const FOOTER_COLUMNS = [
  {
    label: 'Investments',
    items: [
      ['Overview', 'investment/overview'],
      ['Strategies', 'investment/growth'],
      ['Ways to invest', 'investment/funds'],
      ['Who we serve', 'investment/advisors'],
      ['Next steps', 'investment/meeting'],
    ],
  },
  { label: 'Properties', items: [['All properties', 'properties']] },
  {
    label: 'Insights',
    items: [
      ['Perspectives', 'insights/perspectives'],
      ['News', 'insights/news'],
      ['Podcast', 'insights/podcast'],
      ['The Long View', 'insights/newsletter'],
    ],
  },
  {
    label: 'About',
    items: [
      ['Who we are', 'about/who'],
      ['Team', 'about/leadership'],
      ['Careers', 'about/careers'],
      ['Contact', 'about/contact'],
    ],
  },
]

export const LEGAL_LINKS = [
  ['Privacy policy', 'legal/privacy'],
  ['Legal and disclosures (Canada and United States)', 'legal/disclosures'],
]

const ALIASES = { platform: 'about/who', about: 'about/who', 'insights/events': 'insights' }

// Routes rendered by the design's PageLanding rather than their section page.
const LANDING_ROUTES = {
  'insights/learn': 'learn',
  'insights/podcast': 'podcast',
  'investment/meeting': 'meeting',
  'investment/portal': 'portal',
  'investment/advisors': 'advisors',
  'investment/hnw': 'hnw',
  'investment/institutional': 'institutional',
}

export function normalizeRoute(route) {
  const r = route || 'home'
  return ALIASES[r] || r
}

// Splits a route into the pieces the shell and pages need.
export function parseRoute(route) {
  const parts = route.split('/')
  return {
    route,
    section: parts[0],
    sub: parts.slice(1).join('/'),
    landing: LANDING_ROUTES[route] || '',
  }
}

// The sub-nav item a route highlights: articles and newsletter issues light up their index.
export function activeSubRoute(route, section, sub) {
  if (section === 'insights' && sub.startsWith('newsletter')) return 'insights/newsletter'
  if (route === 'insights/learn' || route.startsWith('insights/perspectives/')) return 'insights/perspectives'
  return route
}

const TITLES = Object.fromEntries([
  ...Object.values(SECTIONS).flatMap((s) => (s.items || []).map((it) => [it.r, it.label])),
  ...LEGAL_LINKS.map(([label, r]) => [r, label]),
  ['properties', 'Properties'],
  ['insights', 'Insights'],
])

export function routeTitle(route) {
  if (TITLES[route]) return TITLES[route]
  const last = route.split('/').pop().replace(/-/g, ' ')
  return last.charAt(0).toUpperCase() + last.slice(1)
}
