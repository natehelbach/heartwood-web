import { useEffect } from 'react'
import { routeTitle } from './sitemap.js'
import { pathFor } from './paths.js'
import HW_ARTICLES from '../design/articles-data.js'
import HW_DATA from '../design/site-data.js'

const SITE = 'Heartwood Investments'
const DEFAULT_DESCRIPTION = 'Heartwood develops, owns and manages new, climate-safe purpose-built rental housing, and offers investors access through its Growth and Income Trusts.'

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
  'investment/meeting': ['Book a Call', 'Schedule a meeting with one of Heartwood’s investment experts.'],
  'legal/privacy': ['Privacy Policy', 'How Heartwood collects, uses and protects personal information shared through this website.'],
  'legal/disclosures': ['Legal and Disclosures', 'Legal information and important disclosures for investors in Canada and the United States.'],
}

function pageMeta(route) {
  if (META[route]) return META[route]
  const [, slug] = route.match(/^insights\/perspectives\/(.+)/) || []
  const article = slug && HW_ARTICLES.find((a) => a.slug === slug)
  if (article) return [article.title, article.dek || DEFAULT_DESCRIPTION]
  const [, prop] = route.match(/^properties\/(.+)/) || []
  const project = prop && HW_DATA.projects.find((p) => p.slug === prop)
  if (project) return [project.name, DEFAULT_DESCRIPTION]
  return [routeTitle(route), DEFAULT_DESCRIPTION]
}

function setHead(selector, make, attr, value) {
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

// Keeps the document title, description, canonical link and Open Graph tags in step with the route.
export function usePageMeta(route, notFound) {
  useEffect(() => {
    const [title, description] = notFound ? ['Page not found', DEFAULT_DESCRIPTION] : pageMeta(route)
    const full = title === SITE ? SITE : `${title} | ${SITE}`
    const url = window.location.origin + pathFor(route)
    document.title = full
    setHead('meta[name="description"]', metaTag('name', 'description'), 'content', description)
    setHead('meta[property="og:title"]', metaTag('property', 'og:title'), 'content', full)
    setHead('meta[property="og:description"]', metaTag('property', 'og:description'), 'content', description)
    setHead('meta[property="og:url"]', metaTag('property', 'og:url'), 'content', url)
    setHead('meta[name="robots"]', metaTag('name', 'robots'), 'content', notFound ? 'noindex' : 'index, follow')
    setHead(
      'link[rel="canonical"]',
      () => {
        const l = document.createElement('link')
        l.rel = 'canonical'
        return l
      },
      'href',
      url,
    )
  }, [route, notFound])
}
