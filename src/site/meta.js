import { useEffect } from 'react'
import { routeTitle, LINKEDIN_URL } from './sitemap.js'
import { pathFor, DEFAULT_SITE_URL } from './paths.js'
import HW_ARTICLES from '../design/articles-data.js'
import HW_DATA from '../design/site-data.js'
import { CLIPS, slugOf } from '../design/news-data.js'
import { VEHICLES } from '../design/investment-data.js'

// Production origin for canonical links, Open Graph URLs and structured data. Set VITE_SITE_URL
// (e.g. in Vercel) to the live domain.
export const SITE_URL = (import.meta.env?.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '')

const SITE = 'Heartwood Investments'
const DEFAULT_DESCRIPTION = 'Heartwood develops, owns and manages new, climate-safe purpose-built rental housing, and offers investors access through its Growth and Income Trusts.'
const DEFAULT_IMAGE = '/assets/photography/HW_MassTimber_Exterior.jpg'
const RELEASE_IMAGE = '/assets/photography/HW_Photo_517-W-Main_Facade-Trees.jpg'
const ORG_ID = `${SITE_URL}/#organization`

// Page titles and meta descriptions. Draft copy, written from the site's own text.
const META = {
  home: [SITE, DEFAULT_DESCRIPTION],
  'development/overview': ['Development', 'How Heartwood develops new purpose-built rental housing designed to be held for the long term.'],
  'development/design': ['How We Build', 'Heartwood’s approach to designing and building low-carbon, mass timber and high-performance rental buildings.'],
  'development/projects': ['Projects', 'The rental communities Heartwood is developing across its pipeline.'],
  'development/standards': ['Standards', 'The design, energy and climate-resilience standards every Heartwood building is built to.'],
  'management/asset': ['Asset Management', 'How Heartwood operates and manages its rental buildings once they are leased and stabilized.'],
  properties: ['Properties', 'Heartwood’s portfolio of purpose-built rental properties, in development and in operation.'],
  'investment/overview': ['For Investors', 'Ways to invest with Heartwood: the Residential Growth Trust, the Residential Income Trust and direct investments.'],
  'investment/growth-strategy': ['Growth Trust', 'Heartwood Residential Growth Trust develops and holds new purpose-built rental housing under a Build-to-Hold strategy.'],
  'investment/income-strategy': ['Income Trust', 'Heartwood Residential Income Trust owns stabilized, income-producing purpose-built rental buildings.'],
  'investment/direct': ['Direct Investments', 'Separately managed accounts, mandates and partnerships built on Heartwood’s development and operating platform.'],
  insights: ['Insights', 'Perspectives, news, The Long View podcast and newsletter from the Heartwood team.'],
  'insights/perspectives': ['Perspectives', 'Research and perspectives on Canadian rental housing and real estate investing from the Heartwood team.'],
  'insights/news': ['News', 'News and press releases from Heartwood Investments.'],
  'insights/podcast': ['The Long View Podcast', 'The Long View, Heartwood’s podcast on housing, real estate and long-term investing.'],
  'insights/newsletter': ['The Long View Newsletter', 'The Long View, Heartwood’s monthly newsletter on the real estate market, our projects and our team.'],
  'about/who': ['Who We Are', 'Heartwood Investments is a Toronto-based developer, owner and manager of purpose-built rental housing.'],
  'about/leadership': ['Team', 'The partners, advisors and team behind Heartwood Investments.'],
  'about/careers': ['Careers', 'Careers at Heartwood Investments.'],
  'about/contact': ['Contact', 'Get in touch with Heartwood Investments in Toronto.'],
  'investment/advisors': ['For Advisors', 'Resources and direct access for EMDs, RIAs, wealth managers and advisor platforms bringing Heartwood’s rental housing trusts to clients.'],
  'investment/portal': ['Investor Portal', 'Create an account to review Heartwood fund materials, start a subscription and track your investment.'],
  'insights/learn': ['Learn', 'Webinar replays, research, market outlooks and case studies on purpose-built rental housing from the Heartwood team.'],
  'investment/meeting': ['Book a Call', 'Schedule a meeting with one of Heartwood’s investment experts.'],
  'legal/privacy': ['Privacy Policy', 'How Heartwood collects, uses, discloses and protects your personal information.'],
  'legal/disclosures': ['Legal and Disclosures', 'Legal information and important disclosures for investors in Canada and the United States.'],
  'legal/terms': ['Terms & Conditions', 'The terms governing use of the Heartwood Investments website.'],
}

const abs = (p) => (/^https?:/.test(p) ? p : SITE_URL + p)

// Shortens body copy to a meta description of about 160 characters, ending on a whole word.
function clip(text, max = 160) {
  const t = (text || '').replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  return t.slice(0, t.lastIndexOf(' ', max - 1)).replace(/[,;:]$/, '') + '…'
}

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

// "October 2026" → "2026-10", "June 23, 2025" → "2025-06-23" (ISO 8601 for structured data).
function isoDate(text) {
  const m = (text || '').toLowerCase().match(/([a-z]+)\s+(?:(\d{1,2}),\s*)?(\d{4})/)
  const mi = m ? MONTHS.indexOf(m[1]) : -1
  if (mi < 0) return undefined
  const mm = String(mi + 1).padStart(2, '0')
  return m[2] ? `${m[3]}-${mm}-${m[2].padStart(2, '0')}` : `${m[3]}-${mm}`
}

const ORGANIZATION = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE,
  url: SITE_URL + '/',
  logo: abs('/assets/logos/Heartwood_Logo_Black.png'),
  address: { '@type': 'PostalAddress', streetAddress: '25 King St W', addressLocality: 'Toronto', addressRegion: 'ON', postalCode: 'M5L 2A1', addressCountry: 'CA' },
  sameAs: [LINKEDIN_URL],
}

const personId = (t) => `${SITE_URL}${pathFor('about/leadership')}#${t.id}`

function person(t) {
  return {
    '@type': 'Person',
    '@id': personId(t),
    name: t.name,
    jobTitle: t.title,
    image: t.photo ? abs(t.photo) : undefined,
    description: t.bio ? t.bio.replace(/\s+/g, ' ') : undefined,
    worksFor: { '@id': ORG_ID },
    sameAs: t.linkedin ? [t.linkedin] : undefined,
  }
}

// Article authors link to the matching team bio when there is one.
function author(p) {
  const t = HW_DATA.team.find((m) => m.name === p.name)
  return t ? { '@type': 'Person', '@id': personId(t), name: p.name, jobTitle: p.role } : { '@type': 'Person', name: p.name, jobTitle: p.role }
}

function article(type, url, { title, description, image, date, authors }) {
  return {
    '@type': type,
    headline: title,
    description,
    image: [abs(image)],
    datePublished: isoDate(date),
    author: authors,
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: url,
    inLanguage: 'en-CA',
  }
}

// Title, description, preview image and structured data for one route.
export function pageHead(route, notFound) {
  const path = pathFor(route)
  const url = SITE_URL + (path === '/' ? '/' : path)
  let title = routeTitle(route)
  let description = DEFAULT_DESCRIPTION
  let image = DEFAULT_IMAGE
  let type = 'website'
  const graph = [ORGANIZATION]

  if (notFound) {
    title = 'Page not found'
  } else if (META[route]) {
    ;[title, description] = META[route]
  }

  const slugAfter = (prefix) => (route.startsWith(prefix) ? route.slice(prefix.length) : '')
  const art = HW_ARTICLES.find((a) => a.slug === slugAfter('insights/perspectives/'))
  const release = CLIPS.find((c) => !c.url && slugOf(c) === slugAfter('insights/news/'))
  const project = HW_DATA.projects.find((p) => p.slug === slugAfter('properties/'))
  const issue = HW_DATA.issues.find((i) => i.no === slugAfter('insights/newsletter/'))
  const vehicle = VEHICLES.find((v) => v.slug === slugAfter('investment/'))

  if (notFound) {
    // No page-specific data for a 404.
  } else if (art) {
    title = art.title
    description = clip(art.dek)
    image = art.img || image
    type = 'article'
    const people = art.author ? art.author.people || [art.author] : []
    graph.push(article('Article', url, { title, description, image, date: art.date, authors: people.map(author) }))
  } else if (release) {
    title = release.title
    description = clip(release.dek)
    image = release.img || RELEASE_IMAGE
    type = 'article'
    graph.push(article('NewsArticle', url, { title, description, image, date: release.date, authors: [{ '@id': ORG_ID }] }))
  } else if (project) {
    title = project.name
    description = clip(project.body) || DEFAULT_DESCRIPTION
    image = project.img || image
  } else if (issue) {
    title = `The Long View No. ${issue.no}: ${issue.title}`
    description = clip(issue.dek)
    image = issue.img || image
  } else if (vehicle && !META[route]) {
    title = vehicle.title
    description = clip(vehicle.intro)
  } else if (route === 'about/leadership') {
    graph.push(...HW_DATA.team.map(person))
  }

  if (route === 'home') {
    graph.push({ '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL + '/', name: SITE, inLanguage: 'en-CA', publisher: { '@id': ORG_ID } })
  }

  return {
    title: title === SITE ? SITE : `${title} | ${SITE}`,
    description,
    url,
    image: abs(image),
    type,
    robots: notFound ? 'noindex' : 'index, follow',
    jsonLd: notFound ? null : { '@context': 'https://schema.org', '@graph': graph },
  }
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// The <head> tags for a page, as HTML. Written into each pre-rendered page by scripts/prerender.js.
export function headHtml(head) {
  const tags = [
    `<title>${esc(head.title)}</title>`,
    `<meta name="description" content="${esc(head.description)}" />`,
    `<meta name="robots" content="${head.robots}" />`,
    `<meta property="og:type" content="${head.type}" />`,
    `<meta property="og:site_name" content="${SITE}" />`,
    `<meta property="og:locale" content="en_CA" />`,
    `<meta property="og:title" content="${esc(head.title)}" />`,
    `<meta property="og:description" content="${esc(head.description)}" />`,
    `<meta property="og:image" content="${esc(head.image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(head.title)}" />`,
    `<meta name="twitter:description" content="${esc(head.description)}" />`,
    `<meta name="twitter:image" content="${esc(head.image)}" />`,
  ]
  if (head.robots !== 'noindex') tags.splice(3, 0, `<link rel="canonical" href="${esc(head.url)}" />`, `<meta property="og:url" content="${esc(head.url)}" />`)
  // "<" is escaped so text in the data can't close the script tag.
  if (head.jsonLd) tags.push(`<script type="application/ld+json" id="ld-json">${JSON.stringify(head.jsonLd).replace(/</g, '\\u003c')}</script>`)
  return tags.join('\n  ')
}

function setTag(selector, make, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = make()
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

const metaTag = (key, name) => () => {
  const m = document.createElement('meta')
  m.setAttribute(key, name)
  return m
}

// Keeps the head in step with the route as the reader navigates without a page load. The first
// page arrives with these tags already in its HTML.
export function usePageMeta(route, notFound) {
  useEffect(() => {
    const head = pageHead(route, notFound)
    document.title = head.title
    const named = { description: head.description, robots: head.robots, 'twitter:title': head.title, 'twitter:description': head.description, 'twitter:image': head.image }
    for (const [k, v] of Object.entries(named)) setTag(`meta[name="${k}"]`, metaTag('name', k), 'content', v)
    const og = { 'og:type': head.type, 'og:title': head.title, 'og:description': head.description, 'og:url': head.url, 'og:image': head.image }
    for (const [k, v] of Object.entries(og)) setTag(`meta[property="${k}"]`, metaTag('property', k), 'content', v)
    setTag(
      'link[rel="canonical"]',
      () => {
        const l = document.createElement('link')
        l.rel = 'canonical'
        return l
      },
      'href',
      head.url,
    )
    let ld = document.getElementById('ld-json')
    if (head.jsonLd) {
      if (!ld) {
        ld = document.createElement('script')
        ld.type = 'application/ld+json'
        ld.id = 'ld-json'
        document.head.appendChild(ld)
      }
      ld.textContent = JSON.stringify(head.jsonLd)
    } else if (ld) {
      ld.remove()
    }
  }, [route, notFound])
}
