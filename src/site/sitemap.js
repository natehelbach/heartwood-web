// Site structure, ported from ui_kits/website/Heartwood Website.dc.html.
// Routes are slash paths ("investment/growth") carried in the URL hash.

export const LOGIN_URL = 'https://heartwood.sgggfsi.com/'

export const LINKEDIN_URL = 'https://www.linkedin.com/company/heartwood-investments'

export const ADDRESS = '25 King St W, Toronto, Ontario M5L 2A1'

// Top-level menus. `g` groups items in the dropdown and the section sub-nav.
export const SECTIONS = {
  investment: {
    label: 'Investment',
    items: [
      { label: 'Overview', r: 'investment/overview' },
      { label: 'Growth Strategy', r: 'investment/growth-strategy', g: 'Strategies' },
      { label: 'Income Strategy', r: 'investment/income-strategy', g: 'Strategies' },
      { label: 'Growth Fund', r: 'investment/growth-fund', g: 'Investment solutions' },
      { label: 'Income Fund', r: 'investment/income-fund', g: 'Investment solutions' },
      { label: 'Direct Investments', r: 'investment/direct', g: 'Investment solutions' },
    ],
  },
  development: {
    label: 'Development',
    items: [
      { label: 'Standards', r: 'development/standards' },
      { label: 'How We Build', r: 'development/design' },
      { label: 'Projects', r: 'development/projects' },
    ],
  },
  management: {
    label: 'Management',
    items: [
      { label: 'Asset Management', r: 'management/asset' },
      { label: 'Properties', r: 'properties' },
    ],
  },
  investors: {
    label: 'For Investors',
    items: [
      { label: 'Private Wealth', r: 'investors/private-wealth' },
      { label: 'Institutional', r: 'investors/institutional' },
    ],
  },
  insights: {
    label: 'Insights',
    items: [
      { label: 'Perspectives', r: 'insights/perspectives' },
      { label: 'News', r: 'insights/news' },
      { label: 'The Long View', r: 'insights/podcast', tag: 'Podcast' },
      { label: 'The Long View', r: 'insights/newsletter', tag: 'Newsletter' },
    ],
  },
  about: {
    label: 'About',
    items: [
      { label: 'Who we are', r: 'about/who' },
      { label: 'Team', r: 'about/leadership' },
      { label: 'Contact', r: 'about/contact' },
    ],
  },
}

export const FOOTER_COLUMNS = [
  {
    label: 'Investment',
    items: [
      ['Growth Strategy', 'investment/growth-strategy'],
      ['Income Strategy', 'investment/income-strategy'],
      ['Growth Fund', 'investment/growth-fund'],
      ['Income Fund', 'investment/income-fund'],
      ['Direct Investments', 'investment/direct'],
    ],
  },
  {
    label: 'Development',
    items: [
      ['Standards', 'development/standards'],
      ['How We Build', 'development/design'],
      ['Projects', 'development/projects'],
    ],
  },
  {
    label: 'Management',
    items: [
      ['Asset Management', 'management/asset'],
      ['Properties', 'properties'],
    ],
  },
  {
    label: 'For Investors',
    items: [
      ['Private Wealth', 'investors/private-wealth'],
      ['Institutional', 'investors/institutional'],
    ],
  },
  {
    label: 'Insights',
    items: [
      ['Perspectives', 'insights/perspectives'],
      ['News', 'insights/news'],
      ['The Long View Podcast', 'insights/podcast'],
      ['The Long View Newsletter', 'insights/newsletter'],
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

const ALIASES = { about: 'about/who', 'insights/events': 'insights' }

// Menu routes that show an existing page. The URL keeps the menu route, so the
// header can highlight the menu it came from.
const PAGE_OF = {
  'investment/growth-strategy': 'investment/growth',
  'investment/income-strategy': 'investment/income',
  'investment/growth-fund': 'investment/funds',
  'investment/income-fund': 'investment/funds',
  'investment/direct': 'investment/flexible',
  development: 'properties',
  'development/projects': 'properties',
  'development/design': 'platform',
  'development/standards': 'about/standards',
  management: 'management/asset',
  investors: 'investment/hnw',
  'investors/private-wealth': 'investment/hnw',
  'investors/institutional': 'investment/institutional',
}

// Pages that sit under a different menu than their route's first segment.
const MENU_OF = {
  properties: 'management',
  'investment/advisors': 'investors',
  'investment/hnw': 'investors',
  'investment/institutional': 'investors',
}

// The menu item a page lights up when it was reached by its own route.
const MENU_ITEM_OF = {
  'investment/growth': 'investment/growth-strategy',
  'investment/income': 'investment/income-strategy',
  'investment/flexible': 'investment/direct',
  'investment/hnw': 'investors/private-wealth',
  'investment/advisors': 'investors/private-wealth',
  'investment/institutional': 'investors/institutional',
  platform: 'development/design',
}

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

// Tag colour in menus: the podcast is teal, everything else terracotta.
export const tagColor = (tag) => (tag === 'Podcast' ? 'var(--hw-teal)' : 'var(--hw-terracotta)')

export function normalizeRoute(route) {
  const r = route || 'home'
  return ALIASES[r] || r
}

// Splits a route into the pieces the shell and pages need. `navRoute` is the route in the URL;
// `route` is the page it shows.
export function parseRoute(navRoute) {
  const route = PAGE_OF[navRoute] || navRoute
  const parts = route.split('/')
  const section = parts[0]
  const sub = parts.slice(1).join('/')
  const fromDevelopment = navRoute.startsWith('development')
  const navSection = (fromDevelopment && 'development') || MENU_OF[route] || (section === 'platform' && 'development') || navRoute.split('/')[0]
  return {
    route,
    section,
    sub,
    navSection,
    activeSub: activeSubRoute(navRoute, route, section, sub),
    propsOnly: fromDevelopment ? 'Growth' : '',
    landing: LANDING_ROUTES[route] || '',
  }
}

// The sub-nav item a route highlights: articles and newsletter issues light up their index.
function activeSubRoute(navRoute, route, section, sub) {
  if (section === 'properties' && navRoute.startsWith('development')) return 'development/projects'
  if (PAGE_OF[navRoute] && navRoute.includes('/')) return navRoute
  if (MENU_ITEM_OF[route]) return MENU_ITEM_OF[route]
  if (section === 'insights' && sub.startsWith('newsletter')) return 'insights/newsletter'
  if (route === 'insights/learn' || route.startsWith('insights/perspectives/')) return 'insights/perspectives'
  return route
}

const TITLES = Object.fromEntries([
  ...Object.values(SECTIONS).flatMap((s) => (s.items || []).map((it) => [it.r, it.label])),
  ...LEGAL_LINKS.map(([label, r]) => [r, label]),
  ['insights/podcast', 'The Long View Podcast'],
  ['insights/newsletter', 'The Long View Newsletter'],
  ['properties', 'Properties'],
  ['insights', 'Insights'],
])

export function routeTitle(route) {
  if (TITLES[route]) return TITLES[route]
  const last = route.split('/').pop().replace(/-/g, ' ')
  return last.charAt(0).toUpperCase() + last.slice(1)
}
