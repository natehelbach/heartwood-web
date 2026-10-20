import { useState } from 'react'
import { Hv, sx, DotField, HubspotNote } from '../design/ui.jsx'
import HW_DATA from '../design/site-data.js'
import HW_ARTICLES from '../design/articles-data.js'
import PageArticle from './PageArticle.jsx'
import NotFound from '../components/NotFound.jsx'
import { HONEYPOT, useNewsletter } from '../site/forms.js'

// Ported from ui_kits/website/PageInsights.dc.html. `sub` is '' (overview) | perspectives |
// perspectives/<slug> | news | news/<release> | newsletter | newsletter/<no>.

const MONO = 'font-family:var(--font-subhead);font-weight:500;text-transform:uppercase'

const TOPIC = {
  'nation-of-renters': 'Market', 'supply-cliff': 'Market',
  'tax-efficient-income': 'Tax & income',
  'private-real-estate-portfolio': 'Portfolio & risk', 'low-leverage': 'Portfolio & risk', 'nimble-fund': 'Portfolio & risk',
}
const TOPICS = ['All', 'Market', 'Tax & income', 'Portfolio & risk', 'Sustainability']

const PAPERS = [
  { kind: 'White paper', slug: 'private-real-estate-portfolio', img: '/assets/photography/HW_MassTimber_Coffee-Table.jpg', title: 'Private real estate in a modern portfolio', dek: 'Why Canada’s largest pension funds hold alternatives, and what private rental housing adds to client portfolios.' },
  { kind: 'White paper', slug: 'low-leverage', img: '/assets/photography/HW_MassTimber_Lounge-Corner.jpg', title: 'Low leverage, lower risk', dek: 'Why we keep debt conservative, and what that means for investors when rates or values move.' },
  { kind: 'White paper', slug: 'nimble-fund', img: '/assets/photography/HW_MassTimber_Studio.jpg', title: 'A nimble fund with no legacy assets', dek: 'A newer portfolio with no older assets to fix, so capital goes into new, efficient buildings.' },
].map((a) => ({ ...a, dot: 'var(--hw-black)', more: 'Read →' }))

const PERSP = [
  { kind: 'Perspective', slug: 'nation-of-renters', img: '/assets/photography/HW_Photo_Timber-Living-Room.jpg', title: 'Canada is becoming a nation of renters', dek: 'Renter households grew 35% between 2011 and 2025 — far faster than households overall.' },
  { kind: 'Perspective', slug: 'supply-cliff', img: '/assets/photography/HW_MassTimber_Living-Room-Window.jpg', title: 'The supply cliff: why cancelled condos matter for rental', dek: '7,243 condominium units were cancelled in 2025. What it leaves behind in Ontario’s largest markets.' },
]
  .map((a) => ({ ...a, dot: 'var(--hw-teal)', more: 'Read →' }))
  .concat(PAPERS)

const CLIPS = [
  { g: 'press', outlet: 'Heartwood Investments', type: 'Press release', date: 'November 2026', title: 'Heartwood launches the Heartwood Residential Income Trust, now open for investment', relCta: { label: 'Learn more about the Income Strategy', r: 'investment/income' }, dek: 'The Income Trust buys stabilized, modern purpose-built rental buildings in high-growth, supply-constrained Canadian markets, aiming for capital preservation, stable tax-efficient monthly income and long-term capital appreciation.', img: '', cta: 'Read the release →' },
  { g: 'press', outlet: 'Heartwood Investments', type: 'Press release', date: 'July 2026', title: 'Heartwood welcomes Dustin Buenaventura to our team', person: 'Dustin Buenaventura', role: 'Director, Business Development', dek: 'Dustin joins as Director, Business Development, bringing more than a decade in Canadian financial services from Equiton, Horizons ETFs and Sun Life Global Investments. He will lead our advisor and dealer relationships, helping EMDs and wealth managers bring the Growth and Income trusts to their clients.', img: '/assets/team/HW_Team_Dustin-Buenaventura.png', cta: 'Read the release →' },
  { g: 'media', outlet: 'Forbes', type: 'In the press', date: 'June 23, 2025', title: 'Future-proof investing: how Heartwood Trust is redefining real estate for a resilient economy', dek: 'Afdhel Aziz profiles co-founders David Constable and Tim Blair, and our view that design, climate performance and long-term value go hand in hand.', img: 'https://imageio.forbes.com/specials-images/imageserve/68596129797d872e0d01f701/0x0.jpg?format=jpg&height=900&width=1600&fit=bounds', cta: 'Read on Forbes ↗', url: 'https://www.forbes.com/sites/afdhelaziz/2025/06/23/future-proof-investing-how-heartwood-trust-is-redefining-real-estate-for-a-resilient-economy/' },
]
// Clips without an outside URL are our own releases, shown at insights/news/<slug>.
const slugOf = (c) => c.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60)
const RELEASE_FALLBACK = '/assets/photography/HW_Photo_517-W-Main_Facade-Trees.jpg'
const photoOf = (c) => c.img || RELEASE_FALLBACK
const posOf = (c) => (/HW_Team_/.test(c.img || '') ? 'center 20%' : 'center')
const linkOf = (c) => (c.url ? { href: c.url, target: '_blank' } : { href: '#insights/news/' + slugOf(c), target: '_self' })
const NEWS_FILTERS = [
  ['all', 'All'],
  ['press', 'Press releases'],
  ['media', 'In the press'],
]

const HEADS = {
  '': ['Insights', 'Thinking on housing, climate and capital.'],
  perspectives: ['Perspectives', 'How we see the market, and why.'],
  news: ['News', 'Heartwood in the news.'],
}

const LETTER = [
  'Dear partners and friends,',
  'We are launching this monthly newsletter to share our perspective on the real estate market economics, preview the projects we are building and acquiring, and give you a closer look at the latest from our team at Heartwood.',
  'The name is inspired by Peter Schwartz’s The Art of the Long View and its central idea: planning for the future in an uncertain world. We believe in taking a long-term perspective rather than being driven by short-term market conditions.',
  'In an era of macroeconomic uncertainty, mounting geopolitical headwinds and continued market volatility, we believe investors, particularly real estate investors, should keep a long-term outlook when evaluating investments and returns. Real estate is inherently a long-term asset class, and a disciplined, long-term approach is what can produce the most consistent returns over time.',
  'Our Growth and Income strategies are designed around this philosophy. Rather than chasing short-term opportunities, we seek to build and acquire assets that create durable value, generate long-term income and compound returns by being resilient assets over time.',
  'The Long View Newsletter is an extension of that philosophy. Each month, we will share our view of the markets we build and buy in, preview new projects, and highlight the latest developments across the Heartwood platform.',
  'We look forward to having you along for the journey as we continue to operate for the future, together.',
]
const SIGNERS = [
  { name: 'David Constable', photo: '/assets/website/HW_Team_David-Constable.jpg' },
  { name: 'Tim Blair', photo: '/assets/website/HW_Team_Tim-Blair.jpg' },
]
const TIERS = [
  { n: '01', w: 'Build', k: 'Ground-up development', p: 'Energy-efficient, purpose-built rental communities in supply-constrained markets.', f: 'Growth Strategy' },
  { n: '02', w: 'Buy', k: 'Core acquisition', p: 'Modern, stabilized, institutional-quality rental properties at today’s pricing.', f: 'Income Strategy' },
  { n: '03', w: 'Hold', k: 'Long-term ownership', p: 'Held for recurring income and long-term appreciation across cycles.', f: 'Across the platform' },
]
const FACTS = [
  { k: 'Location', v: 'Toronto, ON' },
  { k: 'Type', v: 'Purpose-built rental' },
  { k: 'Status', v: 'Pre-construction' },
  { k: 'Units', v: '155' },
]
const MARKET = [
  'Short-term headlines about Canadian housing move with interest rates and immigration policy. Slower population growth and a wave of new completions have softened rents in some markets this year. Our long view has not changed: more households are renting for longer, and the country’s largest cities remain structurally short of purpose-built rental. Today’s softer conditions are also discouraging new starts, which will only widen the supply gap in the years ahead.',
  'At the same time, the channel that has historically supplied much of our new rental stock (investor-owned condominiums) is closing. 7,243 condominium units were cancelled in 2025, double the prior year, and starts continue to slow.¹ Existing institutional-quality buildings are retaining occupancy and pricing power as a result.',
  'As builders, this is an unusually favorable window. Projects entering construction today benefit from less competition for land, greater availability of construction manpower, and CMHC-insured construction financing. Government-backed financing, tax relief and public incentives for purpose-built rental lower our cost of capital and help de-risk development and initial lease-up.',
  'As buyers and operators, we are seeing Canadian multifamily pricing reset. Institutional-quality rental assets are trading at roughly 4.0–5.5% capitalization rates, well above the 2021–2022 lows. With our newly launched Heartwood Residential Income Trust starting with no legacy assets, every acquisition we make is underwritten at today’s pricing rather than defended at yesterday’s.',
  'This is where our Growth and Income strategies meet the market: building into the supply gap, and acquiring modern, stabilized communities at reset pricing.',
]
const EVENTS = [
  { d: 'Oct 7, 2026', t: 'Investor webinar', p: 'Monthly live update with David and Tim, followed by Q&A.', c: 'Register' },
  { d: 'Oct 14, 2026', t: 'Site tour — Waterdown', p: 'A small-group walk-through for investors and advisors.', c: 'Request a spot' },
  { d: 'Nov 1, 2026', t: 'Wine tasting', p: 'An evening with the Heartwood team and fellow investors.', c: 'RSVP' },
  { d: 'Nov 4, 2026', t: 'Investor webinar', p: 'Monthly live update with David and Tim, followed by Q&A.', c: 'Register' },
  { d: 'Dec 2, 2026', t: 'Investor webinar', p: 'Monthly live update with David and Tim, followed by Q&A.', c: 'Register' },
]

const CHIP = (on) =>
  `padding:10px 16px;border:1.5px solid var(--hw-black);background:${on ? 'var(--hw-black)' : 'transparent'};color:${on ? 'var(--hw-white)' : 'var(--hw-black)'};cursor:pointer;${MONO};font-size:12px;letter-spacing:.03em`
const ROW_LINK = 'display:grid;grid-template-columns:140px minmax(0,1fr);gap:20px;align-items:start;padding:20px 0 0;border:0;border-top:1px solid var(--hw-black);background:none;text-align:left;cursor:pointer;color:var(--hw-black);font:inherit'
const SECTION_LABEL = `margin:0;${MONO};font-size:clamp(18px,1.4vw,22px);color:var(--hw-terracotta)`
const ISSUE_SECTION = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:clamp(20px,4vw,72px);padding:clamp(40px,5vw,64px) 0;border-top:1px solid var(--hw-black)'
const ISSUE_H2 = 'font-family:var(--font-display);font-weight:500;font-size:clamp(32px,4vw,52px);line-height:1.05;letter-spacing:-.015em'
const BODY20 = 'font-size:20px;line-height:1.55'

function IssueLabel({ n, label }) {
  return (
    <div style={sx(`display:flex;flex-direction:column;gap:8px;${MONO};font-size:13px`)}>
      <span style={{ color: 'var(--hw-terracotta)' }}>{n}</span>
      <span>{label}</span>
    </div>
  )
}

function Perspectives({ go }) {
  const [topic, setTopic] = useState('All')
  const all = HW_ARTICLES.map((a) => ({ ...a, topic: TOPIC[a.slug] || 'Market', author: a.author ? a.author.name : '' })).filter((a) => topic === 'All' || a.topic === topic)
  const persp = all
  const feat = persp[0]
  const open = (slug) => () => go('insights/perspectives/' + slug)

  return (
    <section data-screen-label="Perspectives — Library" style={sx('padding:0 clamp(20px,3vw,40px) clamp(56px,7vw,104px);display:flex;flex-direction:column;gap:clamp(48px,6vw,88px)')}>
      <div style={sx('display:flex;flex-wrap:wrap;gap:8px;border-top:1.5px solid var(--hw-terracotta);padding-top:20px')}>
        {TOPICS.map((l) => (
          <button key={l} aria-pressed={l === topic} onClick={() => setTopic(l)} style={sx(CHIP(l === topic))}>{l}</button>
        ))}
      </div>
      {feat && (
        <Hv as="button" onClick={open(feat.slug)} s="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(24px,4vw,64px);align-items:center;padding:0;border:0;background:none;text-align:left;cursor:pointer;color:var(--hw-black);font:inherit" h="color:var(--hw-teal)">
          <img src={feat.img} alt="" style={sx('width:100%;aspect-ratio:4/3;object-fit:cover;display:block;background:var(--hw-cool-grey)')} />
          <span style={sx('display:flex;flex-direction:column;gap:18px')}>
            <span style={sx(`display:flex;gap:10px;align-items:center;${MONO};font-size:12px`)}>
              <span style={sx('width:8px;height:8px;border-radius:50%;background:var(--hw-teal);display:block')} />
              Featured perspective · {feat.topic}
            </span>
            <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(32px,3.6vw,54px);line-height:1.04;letter-spacing:-.015em;text-wrap:balance')}>{feat.title}</span>
            <span style={sx('font-size:clamp(17px,1.4vw,20px);line-height:1.5;max-width:560px;text-wrap:pretty')}>{feat.dek}</span>
            <span style={sx(`${MONO};font-size:13px`)}>{feat.author} · {feat.read} · Read →</span>
          </span>
        </Hv>
      )}
      {persp.length > 1 && (
        <div style={sx('display:flex;flex-direction:column;gap:20px')}>
          <p style={sx(SECTION_LABEL)}>More perspectives</p>
          <div style={sx('display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,420px),1fr));gap:clamp(20px,2.5vw,36px)')}>
            {persp.slice(1).map((m) => (
              <Hv key={m.slug} as="button" onClick={open(m.slug)} data-m-stack="" s={ROW_LINK} h="color:var(--hw-teal)">
                <img src={m.img} alt="" style={sx('width:140px;aspect-ratio:1/1;object-fit:cover;display:block;background:var(--hw-cool-grey)')} />
                <span style={sx('display:flex;flex-direction:column;gap:8px')}>
                  <span style={sx(`${MONO};font-size:12px`)}>{m.topic} · {m.read}</span>
                  <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(21px,1.8vw,26px);line-height:1.15;text-wrap:balance')}>{m.title}</span>
                </span>
              </Hv>
            ))}
          </div>
        </div>
      )}
      {all.length === 0 && <p style={sx('margin:0;font-size:18px')}>Nothing in this topic yet.</p>}
    </section>
  )
}

function News() {
  const [nf, setNf] = useState('all')
  const clips = CLIPS.filter((c) => nf === 'all' || c.g === nf).map((c) => ({ ...c, ...linkOf(c), dot: c.g === 'press' ? 'var(--hw-black)' : 'var(--hw-terracotta)' }))
  const lead = clips[0] && { ...clips[0], img: photoOf(clips[0]) }
  const rest = clips.slice(1)
  return (
    <section data-screen-label="News — Clippings" style={sx('padding:0 clamp(20px,3vw,40px) clamp(56px,7vw,104px);display:flex;flex-direction:column;gap:clamp(40px,5vw,72px)')}>
      <div style={sx('display:flex;flex-wrap:wrap;gap:8px;border-top:1.5px solid var(--hw-terracotta);padding-top:20px')}>
        {NEWS_FILTERS.map(([k, l]) => (
          <button key={k} aria-pressed={nf === k} onClick={() => setNf(k)} style={sx(CHIP(nf === k))}>{l}</button>
        ))}
      </div>
      {lead && (
        <Hv as="a" href={lead.href} target={lead.target} rel="noopener" s="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(24px,4vw,64px);align-items:center;color:var(--hw-black);text-decoration:none" h="color:var(--hw-teal)">
          {lead.img && <img src={lead.img} alt="" style={sx('width:100%;aspect-ratio:16/10;object-fit:cover;display:block;background:var(--hw-cool-grey)')} />}
          <span style={sx('display:flex;flex-direction:column;gap:18px')}>
            <span style={sx(`display:flex;gap:10px;align-items:center;${MONO};font-size:12px`)}>
              <span style={sx('width:8px;height:8px;border-radius:50%;background:var(--hw-terracotta);display:block')} />
              {lead.type} · {lead.date}
            </span>
            <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(20px,1.8vw,26px)')}>{lead.outlet}</span>
            <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(30px,3.4vw,50px);line-height:1.05;letter-spacing:-.015em;text-wrap:balance')}>{lead.title}</span>
            <span style={sx('font-size:clamp(17px,1.4vw,20px);line-height:1.5;max-width:580px;text-wrap:pretty')}>{lead.dek}</span>
            <span style={sx(`${MONO};font-size:13px`)}>{lead.cta}</span>
          </span>
        </Hv>
      )}
      {rest.length > 0 && (
        <div style={sx('display:flex;flex-direction:column;gap:20px')}>
          <p style={sx(SECTION_LABEL)}>{nf === 'press' ? 'More press releases' : nf === 'media' ? 'More coverage' : 'More news'}</p>
          <div style={sx('display:flex;flex-direction:column;border-bottom:1px solid var(--hw-black)')}>
            {rest.map((c) => (
              <Hv key={c.title} as="a" href={c.href} target={c.target} rel="noopener" s="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:clamp(10px,2vw,32px);align-items:start;padding:22px 0;border-top:1px solid var(--hw-black);color:var(--hw-black);text-decoration:none" h="background:var(--hw-cool-grey)">
                <span style={sx('display:flex;flex-direction:column;gap:6px')}>
                  <span style={sx('font-family:var(--font-display);font-weight:500;font-size:19px')}>{c.outlet}</span>
                  <span style={sx(`display:flex;gap:8px;align-items:center;${MONO};font-size:12px`)}>
                    <span style={sx(`width:7px;height:7px;border-radius:50%;background:${c.dot};display:block`)} />
                    {c.type} · {c.date}
                  </span>
                </span>
                <span style={sx('display:flex;flex-direction:column;gap:6px;grid-column:span 2')}>
                  <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(21px,1.8vw,26px);line-height:1.15;text-wrap:balance')}>{c.title}</span>
                  <span style={sx('font-size:18px;line-height:1.5;text-wrap:pretty')}>{c.dek}</span>
                </span>
                <span style={sx(`justify-self:end;${MONO};font-size:12px;white-space:nowrap`)}>{c.cta}</span>
              </Hv>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

function Release({ slug, go }) {
  const rel = CLIPS.find((c) => slugOf(c) === slug)
  const more = CLIPS.filter((c) => c.title !== rel.title).slice(0, 3).map((c) => ({ ...c, ...linkOf(c) }))
  const back = () => go('insights/news')
  return (
    <div data-screen-label="News — Release">
      <section style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,460px),1fr));background:var(--hw-cool-grey);border-bottom:1.5px solid var(--hw-terracotta)')}>
        <div style={sx('padding:clamp(40px,5vw,80px) clamp(20px,3vw,40px);display:flex;flex-direction:column;justify-content:space-between;gap:clamp(32px,4vw,56px)')}>
          <Hv as="button" onClick={back} s={`align-self:flex-start;padding:0;border:0;background:none;cursor:pointer;${MONO};font-size:13px;color:var(--hw-black)`} h="color:var(--hw-terracotta)">
            ← All news
          </Hv>
          <div style={sx('display:flex;flex-direction:column;gap:22px')}>
            <p style={sx(`margin:0;display:flex;align-items:center;gap:10px;${MONO};font-size:14px;color:var(--hw-terracotta)`)}>
              <span style={sx('width:8px;height:8px;border-radius:50%;background:var(--hw-terracotta);display:block')} />
              {rel.type}
            </p>
            <h1 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(36px,4.2vw,62px);line-height:1.02;letter-spacing:-.02em;text-wrap:balance')}>{rel.title}</h1>
          </div>
          <div style={sx('display:flex;gap:clamp(20px,3vw,40px);flex-wrap:wrap;padding-top:16px;border-top:1px solid var(--hw-black)')}>
            {[['Date', rel.date], ['From', rel.outlet]].map(([k, v]) => (
              <span key={k} style={sx('display:flex;flex-direction:column;gap:4px')}>
                <span style={sx(`${MONO};font-size:11px`)}>{k}</span>
                <span style={sx('font-size:17px')}>{v}</span>
              </span>
            ))}
          </div>
        </div>
        {rel.person ? (
          <div style={sx('padding:clamp(40px,5vw,80px) clamp(20px,3vw,40px);display:flex;align-items:flex-end;justify-content:center')}>
            <figure style={sx('margin:0;width:100%;max-width:400px;display:flex;flex-direction:column;gap:14px')}>
              <img src={photoOf(rel)} alt={rel.person} style={sx('width:100%;aspect-ratio:4/5;object-fit:cover;object-position:center 20%;display:block;filter:grayscale(1)')} />
              <figcaption style={sx('display:flex;flex-direction:column;gap:4px;padding-top:12px;border-top:1px solid var(--hw-black)')}>
                <span style={sx('font-family:var(--font-display);font-weight:500;font-size:22px')}>{rel.person}</span>
                <span style={sx(`${MONO};font-size:12px`)}>{rel.role}</span>
              </figcaption>
            </figure>
          </div>
        ) : (
          <div style={sx(`min-height:clamp(320px,38vw,560px);background:var(--hw-brown) url('${photoOf(rel)}') ${posOf(rel)}/cover`)} />
        )}
      </section>

      <section style={sx('padding:clamp(48px,6vw,96px) clamp(20px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:clamp(32px,5vw,80px)')}>
        <aside style={sx('display:flex;flex-direction:column;gap:14px;max-width:300px')}>
          <span style={sx(`${MONO};font-size:12px`)}>Media enquiries</span>
          <a href="mailto:info@heartwoodinvestments.ca" style={sx('font-size:17px')}>info@heartwoodinvestments.ca</a>
        </aside>
        <article style={sx('grid-column:span 2;display:flex;flex-direction:column;gap:28px;max-width:720px')}>
          <p style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.2vw,32px);line-height:1.25;letter-spacing:-.01em;text-wrap:pretty')}>{rel.dek}</p>
          {rel.relCta && (
            <Hv as="button" onClick={() => go(rel.relCta.r)} s={`align-self:flex-start;padding:14px 22px;border:0;background:var(--hw-black);color:var(--hw-white);${MONO};font-size:14px;cursor:pointer`} h="background:var(--hw-terracotta)">
              {rel.relCta.label} →
            </Hv>
          )}
          {!rel.url && rel.g === 'media' && <p style={sx(`margin:0;${MONO};font-size:13px`)}>Link to the full article coming soon.</p>}
          <div style={sx('display:flex;flex-direction:column;gap:12px;padding-top:24px;border-top:1px solid var(--hw-black)')}>
            <span style={sx(`${MONO};font-size:12px;color:var(--hw-terracotta)`)}>About Heartwood Investments</span>
            <p style={sx('margin:0;font-size:17px;line-height:1.6;text-wrap:pretty')}>
              Heartwood Investments is a real estate investment platform that builds, owns and operates high-quality, purpose-built rental housing in North America’s supply-constrained markets, through the Heartwood Residential Growth Trust and Heartwood Residential Income Trust.
            </p>
          </div>
        </article>
      </section>

      <section style={sx('padding:0 clamp(20px,3vw,40px) clamp(56px,7vw,112px);display:flex;flex-direction:column;gap:20px')}>
        <div style={sx('display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding-top:18px;border-top:1.5px solid var(--hw-black)')}>
          <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.2vw,32px)')}>More news</span>
          <Hv as="button" onClick={back} s={`padding:0;border:0;background:none;cursor:pointer;${MONO};font-size:13px`} h="color:var(--hw-terracotta)">
            All news →
          </Hv>
        </div>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:24px')}>
          {more.map((m) => (
            <Hv key={m.title} as="a" href={m.href} target={m.target} rel="noopener" s="display:flex;flex-direction:column;gap:14px;text-decoration:none;color:var(--hw-black)" h="color:var(--hw-terracotta)">
              <span style={sx(`display:block;aspect-ratio:4/3;background:var(--hw-brown) url('${photoOf(m)}') ${posOf(m)}/cover`)} />
              <span style={sx(`${MONO};font-size:12px`)}>{m.type} · {m.date}</span>
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:22px;line-height:1.15')}>{m.title}</span>
            </Hv>
          ))}
        </div>
      </section>
    </div>
  )
}

function NewsletterLanding({ go }) {
  const issues = HW_DATA.issues
  return (
    <>
      <section data-screen-label="The Long View — Landing" style={sx('position:relative;overflow:hidden;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));min-height:clamp(480px,46vw,700px)')}>
        <div style={sx('padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:24px;justify-content:flex-end;position:relative;z-index:1')}>
          <p style={sx(`margin:0;${MONO};font-size:clamp(18px,1.4vw,22px);color:var(--hw-terracotta)`)}>The Long View Newsletter · Monthly</p>
          <h1 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(64px,10vw,160px);line-height:.92;letter-spacing:-.03em')}>The Long View</h1>
          <p style={sx('margin:0;max-width:560px;font-size:clamp(18px,1.5vw,22px);line-height:1.5')}>
            Our view of the markets we build and buy in, previews of new projects, and the latest across the Heartwood platform — from the desks of our founders.
          </p>
        </div>
        <div style={sx("min-height:380px;background:var(--hw-cool-grey) url('/assets/photography/HW_MassTimber_Coffee-Table.jpg') center 60%/cover no-repeat")} />
      </section>
      <section style={sx('padding:0 clamp(20px,3vw,40px) clamp(40px,5vw,72px);display:flex;flex-direction:column')}>
        <div style={sx(`display:flex;justify-content:space-between;padding:14px 0;border-top:1px solid var(--hw-black);${MONO};font-size:13px`)}>
          <span>Editions</span>
          <span>{issues.filter((i) => i.live).length} published</span>
        </div>
        {issues.map((i) => (
          <Hv
            key={i.no}
            as="button"
            onClick={i.live ? () => go('insights/newsletter/' + i.no) : undefined}
            disabled={!i.live}
            data-m-stack=""
            s={`display:grid;grid-template-columns:minmax(0,120px) minmax(0,1fr) minmax(0,220px) auto;gap:clamp(16px,3vw,40px);align-items:center;padding:clamp(18px,2vw,28px) 0;border:0;border-top:1px solid var(--hw-black);background:none;color:var(--hw-black);text-align:left;cursor:${i.live ? 'pointer' : 'default'};opacity:${i.live ? 1 : 0.45}`}
            h={i.live ? 'color:var(--hw-teal)' : undefined}
          >
            <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(40px,4.4vw,64px);line-height:1;color:var(--hw-terracotta)')}>No. {i.no}</span>
            <span style={sx('display:flex;flex-direction:column;gap:6px')}>
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(22px,2.2vw,32px);line-height:1.1')}>{i.title}</span>
              <span style={sx('font-size:18px;line-height:1.45')}>{i.dek}</span>
            </span>
            <span style={sx(`${MONO};font-size:13px`)}>{i.date}</span>
            <span style={sx(`${MONO};font-size:13px;white-space:nowrap`)}>{i.live ? 'Read →' : 'Coming soon'}</span>
          </Hv>
        ))}
      </section>
    </>
  )
}

function Issue({ go }) {
  return (
    <article data-screen-label="The Long View — No. 01" style={sx('padding:0 clamp(20px,3vw,40px)')}>
      <header style={sx('padding:clamp(40px,6vw,88px) 0 32px;display:flex;flex-direction:column;gap:24px')}>
        <Hv as="button" onClick={() => go('insights/newsletter')} s={`align-self:flex-start;background:none;border:0;padding:0;cursor:pointer;${MONO};font-size:13px;color:var(--hw-black)`} h="color:var(--hw-teal)">
          ← All editions
        </Hv>
        <h1 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(64px,11vw,168px);line-height:.92;letter-spacing:-.03em')}>The Long View</h1>
        <div style={sx(`display:flex;gap:32px;flex-wrap:wrap;border-top:1px solid var(--hw-black);padding-top:16px;${MONO};font-size:13px`)}>
          <span style={{ color: 'var(--hw-terracotta)' }}>No. 01</span>
          <span>October 2026</span>
          <span>From the desks of David Constable &amp; Tim Blair</span>
        </div>
      </header>
      <figure style={sx('margin:0 0 clamp(40px,5vw,72px)')}>
        <img src="/assets/website/HW_3385-Lawrence-Av-E_1.png" alt="Rendering of 3385 Lawrence Avenue East" style={sx('width:100%;aspect-ratio:16/8;object-fit:cover;display:block;background:var(--hw-cool-grey)')} />
        <figcaption style={sx('margin-top:12px;font-family:var(--font-subhead);font-size:12px;text-transform:uppercase')}>3385 Lawrence Avenue East, Toronto — rendering</figcaption>
      </figure>

      <section style={sx(ISSUE_SECTION)}>
        <IssueLabel n="01" label="A letter from our founders" />
        <div style={sx('grid-column:span 2;max-width:720px;min-width:0')}>
          <h2 style={sx(`margin:0 0 28px;${ISSUE_H2};text-wrap:balance`)}>Why we take the long view in real estate</h2>
          {LETTER.map((p) => (
            <p key={p} style={sx(`margin:0 0 1.1em;${BODY20};text-wrap:pretty`)}>{p}</p>
          ))}
          <p style={sx('margin:8px 0 0;font-family:var(--font-display);font-weight:500;font-size:28px')}>Future Built.</p>
          <div style={sx('display:flex;gap:40px;flex-wrap:wrap;margin-top:32px')}>
            {SIGNERS.map((s) => (
              <div key={s.name} style={sx('display:flex;gap:16px;align-items:center')}>
                <img src={s.photo} alt={s.name} style={sx('width:72px;height:72px;object-fit:cover;display:block;filter:grayscale(1)')} />
                <span style={sx('display:flex;flex-direction:column;gap:2px;font-size:18px')}>
                  {s.name}
                  <span style={sx('font-family:var(--font-subhead);font-size:12px;text-transform:uppercase')}>Founding Partner</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={sx(ISSUE_SECTION)}>
        <IssueLabel n="02" label="The platform" />
        <div style={sx('grid-column:span 2;min-width:0')}>
          <h2 style={sx(`margin:0 0 20px;${ISSUE_H2}`)}>Build. Buy. Hold.</h2>
          <p style={sx(`margin:0 0 32px;max-width:680px;${BODY20}`)}>
            Heartwood’s living platform develops high-quality, energy-efficient communities, buys modern stabilized core properties, and holds them for long-term appreciation.
          </p>
          <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));border-top:1px solid var(--hw-black)')}>
            {TIERS.map((t) => (
              <div key={t.n} style={sx('padding:24px 24px 28px 0;display:flex;flex-direction:column;gap:10px')}>
                <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:13px;color:var(--hw-black)')}>{t.n}</span>
                <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(44px,5vw,72px);line-height:1;letter-spacing:-.025em')}>{t.w}</span>
                <span style={sx(`${MONO};font-size:12px`)}>{t.k}</span>
                <p style={sx('margin:0;font-size:18px;line-height:1.45')}>{t.p}</p>
                <span style={sx(`padding-top:10px;border-top:1px solid var(--hw-black);${MONO};font-size:12px`)}>{t.f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={sx(ISSUE_SECTION)}>
        <IssueLabel n="03" label="Featured project" />
        <div style={sx('grid-column:span 2;min-width:0')}>
          <img src="/assets/website/HW_Render_3385-Lawrence-Courtyard.jpg" alt="Courtyard at 3385 Lawrence Avenue East" style={sx('width:100%;aspect-ratio:3/2;object-fit:cover;display:block;margin-bottom:28px')} />
          <h2 style={sx(`margin:0 0 20px;${ISSUE_H2}`)}>3385 Lawrence Avenue East</h2>
          <p style={sx(`margin:0 0 1.1em;max-width:680px;${BODY20}`)}>
            A purpose-built rental community in Scarborough, organised around a shared landscaped courtyard. The project reflects how we approach resilience: building systems chosen for long-term operating cost, generous amenity space residents actually use, and a design intended to age well rather than simply lease up quickly.
          </p>
          <p style={sx(`margin:0 0 24px;max-width:680px;${BODY20}`)}>We will be starting construction updates in the coming months on this project.</p>
          <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:20px;border-top:1px solid var(--hw-black);padding-top:18px')}>
            {FACTS.map((f) => (
              <div key={f.k} style={sx('display:flex;flex-direction:column;gap:6px;font-size:18px')}>
                <span style={sx(`${MONO};font-size:12px`)}>{f.k}</span>
                {f.v}
              </div>
            ))}
          </div>
          <Hv as="button" onClick={() => go('properties/3385-lawrence')} s={`margin-top:24px;padding:0 0 4px;background:none;border:0;border-bottom:1.5px solid currentColor;cursor:pointer;color:var(--hw-black);${MONO};font-size:13px`} h="color:var(--hw-teal)">
            View the project →
          </Hv>
        </div>
      </section>

      <section style={sx(ISSUE_SECTION)}>
        <IssueLabel n="04" label="Market perspective" />
        <div style={sx('grid-column:span 2;max-width:720px;min-width:0')}>
          <h2 style={sx(`margin:0 0 16px;${ISSUE_H2}`)}>
            Structural demand.
            <br />
            Shrinking supply.
          </h2>
          <p style={sx('margin:0 0 1.1em;font-size:26px;line-height:1.4')}>That gap is why now is the time to invest in Canadian multifamily.</p>
          {MARKET.map((p) => (
            <p key={p} style={sx(`margin:0 0 1.1em;${BODY20};text-wrap:pretty`)}>{p}</p>
          ))}
          <p style={sx('margin:12px 0 0;font-size:18px;line-height:1.45')}>1. Urbanation, Year-End 2025 Condominium Market Survey.</p>
        </div>
      </section>

      <section style={sx(ISSUE_SECTION)}>
        <IssueLabel n="05" label="Upcoming" />
        <div style={sx('grid-column:span 2;min-width:0;border-top:1px solid var(--hw-black)')}>
          {EVENTS.map((e) => (
            <div key={e.d + e.t} data-m-stack="" style={sx('display:grid;grid-template-columns:minmax(0,150px) minmax(0,1fr) auto;gap:24px;align-items:baseline;padding:20px 0;border-bottom:1px solid var(--hw-black)')}>
              <span style={sx(`${MONO};font-size:13px`)}>{e.d}</span>
              <span style={sx('display:flex;flex-direction:column;gap:4px')}>
                <span style={sx('font-family:var(--font-display);font-weight:500;font-size:24px')}>{e.t}</span>
                <span style={sx('font-size:18px')}>{e.p}</span>
              </span>
              <span style={sx(`${MONO};font-size:13px;color:var(--hw-teal)`)}>{e.c}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={sx('position:relative;overflow:hidden;background:var(--hw-black);color:var(--hw-white);border-top:6px solid var(--hw-terracotta);padding:clamp(40px,6vw,72px);display:flex;flex-direction:column;gap:22px;margin:clamp(32px,4vw,64px) 0')}>
        <div style={sx('position:absolute;top:0;bottom:0;right:0;width:min(100%,max(46%,380px));pointer-events:none;opacity:.6')}>
          <DotField preset="icons" icons="MONEY|EQUITY|RETURNS" iconSize=".6" interval="5700" color="#F9F9F9" />
        </div>
        <span style={sx(`position:relative;${MONO};font-size:13px`)}>Speak with our team</span>
        <h2 style={sx('position:relative;margin:0;max-width:760px;font-family:var(--font-display);font-weight:500;font-size:clamp(32px,4vw,48px);line-height:1.05;text-wrap:balance')}>Interested in investing alongside us?</h2>
        <p style={sx('position:relative;margin:0;max-width:620px;font-size:19px;line-height:1.5')}>
          Our Capital Markets team works with investors and advisors to walk through our funds, strategy and offering documents.
        </p>
        <div style={{ position: 'relative' }}>
          <Hv as="button" onClick={() => go('investment/overview')} s={`padding:14px 22px;background:var(--hw-white);color:var(--hw-black);border:0;cursor:pointer;${MONO};font-size:14px`} h="background:var(--hw-black);color:var(--hw-white)">
            Explore our funds
          </Hv>
        </div>
      </section>
      <p style={sx('margin:0;padding:0 0 clamp(40px,5vw,64px);font-size:14px;line-height:1.55;max-width:1000px')}>
        This newsletter is provided by HW Management Inc. (together with its affiliates, “Heartwood”) for general information purposes only. It is not a prospectus, offering memorandum, advertisement or public offering of securities, and does not constitute an offer to sell or a solicitation of an offer to buy any securities. Targets and forward-looking statements are estimates only, are not guaranteed, and actual results may differ materially. All dollar amounts are in Canadian dollars.
      </p>
    </article>
  )
}

function Subscribe() {
  const news = useNewsletter()
  return (
    <section style={sx('margin:0 clamp(20px,3vw,40px) clamp(48px,6vw,88px);background:var(--hw-black);color:var(--hw-white);border-top:6px solid var(--hw-terracotta);padding:clamp(28px,4vw,56px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:24px;align-items:end')}>
      <div style={sx('display:flex;flex-direction:column;gap:12px')}>
        <span style={sx(`${MONO};font-size:14px`)}>Subscribe</span>
        <p style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(26px,2.6vw,40px);line-height:1.1')}>Get The Long View in your inbox each month.</p>
      </div>
      <div style={sx('display:flex;flex-direction:column;gap:12px;min-width:0')}>
        <HubspotNote label="The Long View newsletter" />
        <form
          onSubmit={news.onSubmit}
          noValidate
          aria-label="The Long View newsletter sign-up"
          style={sx(`position:relative;display:flex;border:1.5px solid ${news.invalid ? 'var(--hw-terracotta)' : 'var(--hw-white)'};min-width:0`)}
        >
          <input name="email" type="email" required autoComplete="email" aria-label="Email address" aria-invalid={news.invalid || undefined} aria-describedby="newsletter-subscribe-status" onChange={news.onChange} className="hw-input-on-dark" placeholder="Enter your email" style={sx('flex:1;min-width:0;padding:14px 18px;background:transparent;border:0;color:var(--hw-white);font-family:var(--font-subhead);font-size:14px;text-transform:uppercase')} />
          <input {...HONEYPOT} />
          <button type="submit" disabled={news.sending} style={sx(`padding:14px 22px;background:var(--hw-white);color:var(--hw-black);border:0;cursor:${news.sending ? 'progress' : 'pointer'};${MONO};font-size:14px`)}>{news.button}</button>
        </form>
        <p id="newsletter-subscribe-status" role="status" aria-live="polite" style={sx(`margin:0;min-height:18px;${MONO};font-size:12px;letter-spacing:.04em;line-height:1.5;color:var(--hw-white)`)}>
          {news.message}
        </p>
      </div>
    </section>
  )
}

function insightsPage(sub) {
  const isLanding = sub === 'newsletter'
  const isIssue = sub.startsWith('newsletter/')
  const artSlug = sub.startsWith('perspectives/') ? sub.slice(13) : ''
  const isArticle = !!artSlug && HW_ARTICLES.some((a) => a.slug === artSlug)
  const isRelease = sub.startsWith('news/') && CLIPS.some((c) => slugOf(c) === sub.slice(5))
  // Unknown articles, releases and sub-pages show the 404 page.
  const notFound = (sub.startsWith('news/') && !isRelease) || (!!artSlug && !isArticle) || (!!sub && !isLanding && !isIssue && !sub.startsWith('news/') && !artSlug && !['perspectives', 'news'].includes(sub))
  return { isLanding, isIssue, artSlug, isArticle, isRelease, notFound }
}

// Whether an Insights sub-route is a 404, so the shell can mark the page noindex.
export const insightsNotFound = (sub = '') => insightsPage(sub).notFound

function PageInsights({ sub = '', go }) {
  const { isLanding, isIssue, artSlug, isArticle, isRelease, notFound } = insightsPage(sub)
  const isHub = !isLanding && !isIssue && !isArticle && !isRelease && !notFound
  const [eyebrow, title] = HEADS[sub] || HEADS['']
  const isNews = sub === 'news'
  const notNews = sub !== 'news' && sub !== 'perspectives' && isHub
  const items = sub === 'perspectives'
    ? PERSP
    : PERSP.concat(CLIPS.slice(0, 3).map((c) => ({ kind: 'News · ' + c.outlet, title: c.title, dek: c.dek, dot: 'var(--hw-terracotta)', more: c.cta, url: c.url, release: slugOf(c) })))

  if (notFound) return <NotFound actions={[{ label: 'Browse perspectives', go: () => go('insights/perspectives') }, { label: 'Go to home', go: () => go('home') }]} />
  if (isArticle) return <PageArticle slug={artSlug} go={go} />

  return (
    <div style={sx('background:var(--hw-white);color:var(--hw-black);font-family:var(--font-body)')}>
      {isHub && (
        <>
          {sub === 'news' || sub === 'perspectives' ? (
            <section data-screen-label={eyebrow + ' — Header'} style={sx('position:relative;overflow:hidden;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));min-height:clamp(480px,46vw,700px)')}>
              <div style={sx('padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:24px;justify-content:flex-end;position:relative;z-index:1')}>
                <p style={sx(`margin:0;${MONO};font-size:clamp(18px,1.4vw,22px);color:var(--hw-terracotta)`)}>Insights · {eyebrow}</p>
                <h1 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(48px,6.4vw,120px);line-height:.92;letter-spacing:-.03em')}>{eyebrow}</h1>
                <p style={sx('margin:0;max-width:560px;font-size:clamp(18px,1.5vw,22px);line-height:1.5')}>{title}</p>
              </div>
              {sub === 'news' ? (
                <div style={sx("min-height:380px;background:var(--hw-cool-grey) url('/assets/photography/HW_MassTimber_Suite-415.jpg') 70% 82%/cover no-repeat")} />
              ) : (
                <div style={sx("min-height:380px;background:var(--hw-cool-grey) url('/assets/photography/HW_MassTimber_Studio-Lounge.jpg') center 60%/cover no-repeat")} />
              )}
            </section>
          ) : (
            <section data-screen-label="Insights — Hero" style={sx('position:relative;overflow:hidden;min-height:clamp(480px,48vw,720px);background:var(--hw-brown);display:flex;align-items:flex-end')}>
              <div style={sx("position:absolute;inset:0;background:url('/assets/photography/HW_MassTimber_Dining.jpg') center 40%/cover no-repeat")} />
              <div style={sx('position:absolute;inset:0;background:var(--overlay-brown)')} />
              <div style={sx('position:relative;padding:clamp(40px,5vw,72px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:20px;color:var(--hw-white)')}>
                <p style={sx(`margin:0;${MONO};font-size:clamp(14px,1.2vw,18px)`)}>{eyebrow}</p>
                <h1 style={sx('margin:0;max-width:880px;font-family:var(--font-display);font-weight:500;font-size:clamp(34px,4.4vw,64px);line-height:1.05;letter-spacing:-.02em;text-wrap:balance')}>{title}</h1>
              </div>
            </section>
          )}
          {sub === '' && (
            <section style={sx('padding:0 clamp(20px,3vw,40px) clamp(40px,5vw,72px)')}>
              <Hv as="button" onClick={() => go('insights/newsletter/01')} s="width:100%;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));gap:0;background:var(--hw-white);color:var(--hw-black);border:0;padding:0;cursor:pointer;text-align:left" h="background:var(--hw-cool-grey)">
                <img src="/assets/website/HW_3385-Lawrence-Av-E_1.png" alt="" style={sx('width:100%;height:100%;min-height:340px;object-fit:cover;display:block')} />
                <span style={sx('padding:clamp(24px,3vw,48px);display:flex;flex-direction:column;gap:16px;justify-content:center')}>
                  <span style={sx(`${MONO};font-size:13px;color:var(--hw-black)`)}>The Long View · No. 01 · October 2026</span>
                  <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(28px,3vw,46px);line-height:1.05;letter-spacing:-.015em')}>Why we take the long view in real estate</span>
                  <span style={sx('font-size:18px;line-height:1.5;color:var(--hw-black)')}>Our monthly letter from David Constable &amp; Tim Blair.</span>
                  <span style={sx(`${MONO};font-size:13px`)}>Read the edition →</span>
                </span>
              </Hv>
            </section>
          )}
          {sub === 'perspectives' && <Perspectives go={go} />}
          {notNews && (
            <section style={sx('padding:0 clamp(20px,3vw,40px) clamp(48px,6vw,88px);display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr));gap:clamp(28px,3vw,44px) clamp(20px,2.5vw,36px)')}>
              {items.map((a) => (
                <Hv
                  key={a.title}
                  as="button"
                  onClick={() => (a.slug ? go('insights/perspectives/' + a.slug) : a.url ? window.open(a.url, '_blank', 'noopener') : go('insights/news/' + a.release))}
                  s="display:flex;flex-direction:column;gap:12px;border:0;border-top:1px solid var(--hw-black);padding:16px 0 0;background:none;text-align:left;color:var(--hw-black);cursor:pointer;font:inherit"
                  h="color:var(--hw-teal)"
                >
                  <span style={sx(`display:flex;gap:10px;align-items:center;${MONO};font-size:12px`)}>
                    <span style={sx(`width:8px;height:8px;border-radius:50%;background:${a.dot};display:block`)} />
                    {a.kind}
                  </span>
                  <h3 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(22px,2vw,28px);line-height:1.15;text-wrap:balance')}>{a.title}</h3>
                  <p style={sx('margin:0;font-size:18px;line-height:1.5;text-wrap:pretty')}>{a.dek}</p>
                  <span style={sx(`${MONO};font-size:13px`)}>{a.more}</span>
                </Hv>
              ))}
            </section>
          )}
          {isNews && <News />}
        </>
      )}
      {isRelease && <Release slug={sub.slice(5)} go={go} />}
      {isLanding && <NewsletterLanding go={go} />}
      {isIssue && <Issue go={go} />}
      {(isLanding || isHub) && <Subscribe />}
    </div>
  )
}

export default PageInsights
