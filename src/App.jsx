import SiteHeader from './components/SiteHeader.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import PageHome from './pages/PageHome.jsx'
import PageAbout from './pages/PageAbout.jsx'
import PageDevOverview from './pages/PageDevOverview.jsx'
import PageHowWeBuild from './pages/PageHowWeBuild.jsx'
import PageManagement from './pages/PageManagement.jsx'
import PageProperties from './pages/PageProperties.jsx'
import PageInvestment from './pages/PageInvestment.jsx'
import PageInsights, { insightsNotFound } from './pages/PageInsights.jsx'
import PageLanding from './pages/PageLanding.jsx'
import PageLegal from './pages/PageLegal.jsx'
import NotFound from './components/NotFound.jsx'
import HW_DATA from './design/site-data.js'
import { VEHICLES } from './design/investment-data.js'
import useRoute from './site/useRoute.js'
import { usePageMeta } from './site/meta.js'
import { parseRoute } from './site/sitemap.js'

const KNOWN = ['devoverview', 'home', 'about', 'properties', 'investment', 'insights', 'legal', 'platform', 'management']

// Sub-pages each section can show; anything else under it is a 404. Insights checks its own.
const SUBS = {
  about: ['', 'who', 'leadership', 'standards', 'contact', 'careers'],
  investment: ['', 'overview', 'growth', 'income', ...VEHICLES.map((v) => v.slug)],
  legal: ['privacy', 'disclosures', 'terms'],
  management: ['', 'asset'],
  properties: ['', ...HW_DATA.projects.map((p) => p.slug)],
}

// Page routing mirrors the <main> of ui_kits/website/Heartwood Website.dc.html.
function App() {
  const [navRoute, go] = useRoute()
  const { route, section, sub, navSection, activeSub, propsOnly, landing } = parseRoute(navRoute)
  // Unknown sections, and unknown pages within a section, show the 404 page.
  const notFound = !landing && (!KNOWN.includes(section) || (SUBS[section] && !SUBS[section].includes(sub)) || (!SUBS[section] && !!sub && section !== 'insights'))
  const is = (k) => section === k && !landing && !notFound
  usePageMeta(navRoute, notFound || (is('insights') && insightsNotFound(sub)))

  return (
    <div className="site">
      <SiteHeader route={route} section={section} navSection={navSection} activeSub={activeSub} go={go} />
      <main className="site__main">
        {is('home') && <PageHome go={go} />}
        {is('about') && <PageAbout sub={sub} go={go} />}
        {is('devoverview') && <PageDevOverview go={go} />}
        {is('platform') && <PageHowWeBuild go={go} />}
        {is('management') && <PageManagement go={go} />}
        {is('properties') && <PageProperties sub={sub} only={propsOnly} go={go} />}
        {is('investment') && <PageInvestment sub={sub} go={go} />}
        {is('insights') && <PageInsights sub={sub} go={go} />}
        {landing && <PageLanding sub={landing} go={go} />}
        {is('legal') && <PageLegal sub={sub} />}
        {notFound && <NotFound actions={[{ label: 'Go to home', go: () => go('home') }, { label: 'View properties', go: () => go('properties') }]} />}
      </main>
      <SiteFooter go={go} />
    </div>
  )
}

export default App
