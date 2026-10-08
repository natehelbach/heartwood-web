import { useRef, useState } from 'react'
import { Hv, sx, RULE_BG, HubspotNote } from '../design/ui.jsx'
import DotIcon from '../design/DotIcon.jsx'
import { StandardLogos } from './PageAbout.jsx'

// Ported from ui_kits/website/PageInvestment.dc.html. `sub` is overview | growth | income |
// funds | flexible | services.

const MONO = 'font-family:var(--font-subhead);font-weight:500;text-transform:uppercase'
const EYEBROW = `margin:0;${MONO};font-size:clamp(18px,1.4vw,22px);color:var(--hw-terracotta)`
const H2 = 'margin:0;max-width:820px;font-family:var(--font-display);font-weight:500;font-size:clamp(32px,3.6vw,52px);line-height:1.08;letter-spacing:-.015em;text-wrap:balance'
const LEDE = 'margin:0;max-width:560px;font-size:clamp(17px,1.35vw,20px);line-height:1.5;text-wrap:pretty'
const SPLIT_HEAD = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:clamp(24px,4vw,72px);align-items:end'
const RULED_SECTION = `padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:clamp(28px,3vw,48px);background:${RULE_BG}`
const TAG = `padding:5px 9px;border:1px solid var(--hw-black);${MONO};font-size:12px`
const FIELD_LABEL = `${MONO};font-size:13px`
const OUTLINE_SM = `padding:13px 20px;background:transparent;color:var(--hw-black);border:1.5px solid var(--hw-black);cursor:pointer;${MONO};font-size:13px`
const WHY_NOW_P = 'margin:0;max-width:600px;font-size:clamp(17px,1.35vw,20px);line-height:1.55;text-wrap:pretty'
const STRAT_SECTION = `padding:clamp(56px,6vw,96px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:clamp(28px,3vw,48px);background:${RULE_BG}`
const STRAT_SPLIT = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(28px,5vw,96px);align-items:start'
const STRAT_EYEBROW = `margin:0;${MONO};font-size:clamp(16px,1.3vw,20px);color:var(--hw-terracotta)`
const STRAT_H2 = 'margin:0;max-width:880px;font-family:var(--font-display);font-weight:500;font-size:clamp(34px,4vw,64px);line-height:1.04;letter-spacing:-.025em;text-wrap:balance'
const STRAT_P = 'margin:0;max-width:560px;font-size:clamp(18px,1.4vw,21px);line-height:1.55;text-wrap:pretty'
const COMPARE_ROW = 'display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1fr) minmax(0,1fr);gap:16px clamp(16px,2vw,32px)'
const FIELD = 'padding:12px 14px;border:1px solid var(--hw-black);background:var(--hw-white);font-family:var(--font-subhead);font-size:14px;color:var(--hw-black);border-radius:0'

const GROWTH = {
  name: 'Growth strategy', word: 'Growth', kind: 'Growth strategy · Build to hold', dot: '#617954',
  ringW: '/assets/logos/HW_Growth_Ring_White.png', img: '/assets/project-renders/HW_Render_3385-Lawrence.jpg', imgPos: 'center',
  intro: 'We develop new purpose-built rental communities in supply-constrained markets, then hold them for the long term to produce stabilized income for our investors.',
  why: {
    label: 'Why growth', h: 'We build what we intend to own.',
    p: ['Taking on development, construction and lease-up risk lets us design every building for resilience from the first drawing: lower operating costs, healthier homes and assets that stay competitive for decades.', 'The goal is a durable, modern portfolio of resilient buildings, built with the future in mind, and to keep getting better at building them, project by project.'],
    quote: 'Good design and quality construction aren’t a cost to cut. They are how a building stays relevant, and valuable, for decades.', by: 'David Constable, Founding Partner',
  },
  deliversH: 'Development value today. Stabilized income tomorrow.',
  delivers: ['Construction and lease-up value creation', 'Long-term capital appreciation', 'De-risked entitlement access at cost', 'Climate-resilient, future-proof assets', 'Residual income upon stabilization'],
  path: {
    label: 'How it works', h: 'From entitlement to income.',
    steps: [
      { n: '01', t: 'Funded outside the fund', k: 'Planning & entitlement', v: 'Entitlements are advanced with outside capital, delivering shovel-ready projects and mitigating planning risk.' },
      { n: '02', t: 'Entry point', k: 'At-cost transfer', v: 'Once entitled, assets transfer in at cost, with no embedded developer markup and a low cost basis.' },
      { n: '03', t: 'Development upside', k: 'Construction & lease-up', v: 'Fixed-price contracts limit cost overruns, and CMHC-insured construction financing lowers the cost of capital.' },
      { n: '04', t: 'Income return', k: 'Stabilization & operations', v: 'Projects stabilize into institutional-quality rental communities that we hold and operate for the long term.' },
    ],
  },
  compare: null,
  stats: { label: 'Pipeline', h: 'A defined, scalable development pipeline.', items: [{ v: '14', k: 'Projects' }, { v: '2,600', k: 'Potential homes' }, { v: '$1.5B', k: 'Development budget' }, { v: '$40M', k: 'Interest-free, forgivable CMHC seed loan' }] },
  targets: [{ v: '18–20%', k: 'Target 10-year average annual return¹' }, { v: '4.5–5.5x', k: 'Target 10-year equity multiple¹' }, { v: '7.0–8.0%', k: 'Target annual distribution upon stabilization²' }],
  footnote: '¹ Series I returns. ² Substantially return of capital; not expected until a significant portion of the portfolio is developed and stabilized. Targets are not guaranteed. See offering memorandum.',
  own: {
    label: 'Resilience as a financial strategy', h: 'Saving energy to drive NOI.',
    p: 'Every design and operating decision is made through the lens of economic utility. Sustainability does not have to cost more: it lowers operating costs and protects long-term value.',
    items: [{ v: '65%+', k: 'Targeted reduction in energy use versus a code-built project' }, { v: '~$300K', k: 'Estimated annual savings to NOI on a representative project' }, { v: '~$7.5M', k: 'Of added asset value at a 4% cap rate' }, { v: 'Zero Carbon', k: 'Targeting Canada Green Building Council Zero Carbon certification' }],
    note: 'Illustrative, based on a representative Heartwood project compared with a code-minimum building.',
  },
  accessP: 'Our Growth strategy is broader than our Growth Fund. Investors can access it through a commingled trust, project partnerships or a mandate built around them.',
  access: [
    { k: 'Heartwood Residential Growth Trust', v: 'Our open-ended build-to-hold trust for Canadian purpose-built rental.', r: 'investment/funds' },
    { k: 'Joint ventures / Co-GP', v: 'Project-level partnerships that share risk and reward.', r: 'investment/flexible' },
    { k: 'Separately managed accounts', v: 'Development mandates built around your goals and timeline.', r: 'investment/flexible' },
    { k: 'Development services', v: 'Our development team, working on your land.', r: 'investment/services' },
  ],
  marketsLabel: 'Where we build', markets: ['Toronto', 'Vancouver', 'Halifax', 'Calgary'],
}
const INCOME = {
  name: 'Income strategy', word: 'Income', kind: 'Income strategy · Buy and hold', dot: '#2697AA',
  ringW: '/assets/logos/HW_Income_Ring_White.png', img: '/assets/photography/HW_Photo_517-W-Main_Facade-Trees.jpg', imgPos: 'center 30%',
  intro: 'We acquire modern, well-located, institutional-quality rental communities at today’s reset pricing, and apply our operating systems to grow income and value over time.',
  why: {
    label: 'Why income', h: 'Contrarian to buy. Disciplined to hold.',
    p: ['Real estate moves in cycles. We are patient opportunists who buy high-quality, modern, sustainable assets in tier-one growth markets when pricing is attractive, and who are equally content to hold, generate cash flow and let appreciation compound when it is not.', 'Our work on the Growth strategy means we know exactly what it takes to run an efficient, healthy building. We bring that same expertise to every asset we acquire.'],
    quote: 'A great building bought at the wrong price is still a poor investment. We wait for quality and value to meet.', by: 'Tim Blair, Founding Partner',
  },
  deliversH: 'Durable income, built on quality.',
  delivers: ['Resilient, tax-efficient income', 'Long-term capital appreciation', 'A conservative capital structure with low leverage', 'High-quality, inflation-resistant real estate', 'Beautiful buildings that create community and well-being'],
  path: {
    label: 'What we buy', h: 'Modern, stabilized communities in prime markets.',
    steps: [
      { n: '01', t: 'Asset quality', k: 'Modern and stabilized', v: 'Well-leased, institutional-quality properties that produce income from day one, close to transit and amenities.' },
      { n: '02', t: 'Capital profile', k: 'Low capital requirements', v: 'Modern assets need less near-term capex, so more operating income is available to distribute.' },
      { n: '03', t: 'Cost basis', k: 'No legacy assets', v: 'Every acquisition is priced on today’s rents and fundamentals. Nothing bought at the prior cycle peak weighs on returns.' },
      { n: '04', t: 'Capital structure', k: 'Prudent leverage', v: '40–50% loan-to-value at the portfolio level, capped at 50% once trust NAV exceeds $100M.' },
    ],
  },
  compare: {
    a: 'Typical older stock', b: 'Heartwood target assets',
    rows: [
      { k: 'Building capital expenditure', a: 'Recurring and lumpy, as major systems reach end of life.', b: 'Low and predictable for years to come.' },
      { k: 'Free cash flow after capex', a: 'A meaningful share of NOI is retained for maintenance.', b: 'More of NOI is available to distribute to investors.' },
      { k: 'Suite features residents want', a: 'In-suite laundry, A/C and dishwashers often can’t be retrofitted.', b: 'Built in from day one, supporting rent and retention.' },
    ],
  },
  stats: { label: 'Why now', h: 'An attractive point in the cycle.', items: [{ v: '+1.4M', k: 'Renter households added in Canada, 2011–2025' }, { v: '3.1%', k: 'National purpose-built rental vacancy, 2025' }, { v: '7,243', k: 'Condo units cancelled in 2025, limiting future supply' }, { v: '$1,338', k: 'Average extra monthly cost to own versus rent in the GTHA' }] },
  targets: [{ v: '8–10%', k: 'Target levered 5-year annualized return²' }, { v: '5–6%', k: 'Target annual distribution, paid monthly¹' }, { v: '40–50%', k: 'Target portfolio loan-to-value' }],
  footnote: '¹ On trading NAV; intended to commence 12 months following the first asset acquisition; primarily return of capital. ² Net, levered IRR over a five-year hold (net of fees, gross of tax), Series B Units. Targets are not guaranteed. See offering memorandum.',
  own: {
    label: 'Improved through ownership', h: 'We operate every building like we built it.',
    p: 'After acquisition, we apply the same systems thinking that shapes our new buildings, supporting resident experience, operating efficiency and long-term value.',
    items: [{ v: 'Spaces', k: 'Common areas redesigned for connection and community' }, { v: 'Well-being', k: 'Health and well-being features added for residents' }, { v: '2 years', k: 'To create a carbon reduction plan for each property, aligned with a 1.5°C pathway' }, { v: 'Systems', k: 'Our management workflow and building data applied from day one' }],
    note: '',
  },
  accessP: 'Our Income strategy is broader than our Income Fund. Investors can access it through a commingled trust, deal-level co-investment or a mandate built around them.',
  access: [
    { k: 'Heartwood Residential Income Trust', v: 'Our open-ended trust of modern, stabilized, income-producing rental.', r: 'investment/funds' },
    { k: 'Co-investments', v: 'Deal-level access to individual acquisitions, alongside our trust.', r: 'investment/flexible' },
    { k: 'Separately managed accounts', v: 'Core acquisition mandates built around your goals.', r: 'investment/flexible' },
    { k: 'Asset management services', v: 'Our operating platform, working for your buildings.', r: 'investment/services' },
  ],
  marketsLabel: 'Where we buy', markets: ['Greater Toronto Area', 'Ottawa', 'Montreal', 'Halifax', 'Vancouver', 'Calgary', 'Edmonton'],
}
// The two trusts, as shown on Investments › Our funds.
const FUNDS = [
  { name: 'Heartwood Residential Growth Trust', kind: GROWTH.kind, logo: '/assets/logos/HW_Growth_Logo_Black.png', pitch: 'Builds resilient, beautiful, well-located buildings designed for long-term growth — developing purpose-built rental and holding through stabilization.', color: 'var(--hw-cool-grey)', short: 'Growth Trust', whyLabel: 'Why growth', why: 'Taking on development lets us design every building for resilience from the start.', r: 'investment/growth' },
  { name: 'Heartwood Residential Income Trust', kind: INCOME.kind, logo: '/assets/logos/HW_Income_Logo_Black.png', pitch: 'Buys modern, efficient, stabilized assets already generating cash flow — at today’s reset pricing, with no legacy assets.', color: 'var(--hw-hemlock)', short: 'Income Trust', whyLabel: 'Why income', why: 'What we learn building and operating efficient, healthy buildings, we apply to every acquisition.', r: 'investment/income' },
]

const VEHICLES = [
  {
    slug: 'funds', title: 'Our funds', sub: 'Commingled vehicles', runtime: '2 min', cta: 'Explore our funds', poster: '/assets/project-renders/HW_Render_3385-Lawrence.jpg',
    for: ['Private wealth', 'Wealth managers', 'Institutions', 'Family offices'],
    items: [{ k: 'Heartwood Residential Growth Trust · Build', v: 'Build-to-hold purpose-built rental' }, { k: 'Heartwood Residential Income Trust · Buy', v: 'Modern, stabilized, income-producing assets' }],
    intro: 'Two trusts, one discipline. Invest alongside other investors in a diversified portfolio of purpose-built rental housing, managed by one team from start to finish.', heading: 'Two strategies',
    rows: [{ no: '01', k: 'Heartwood Residential Growth Trust', body: 'We develop new purpose-built rental communities in supply-constrained markets, then hold them for the long term.' }, { no: '02', k: 'Heartwood Residential Income Trust', body: 'We own modern, stabilized buildings that pay regular distributions.' }, { no: '03', k: 'Or both', body: 'Many investors hold both: growth from new buildings, income from stabilized ones.' }],
    ctaLine: 'Find the right trust for your portfolio.',
  },
  {
    slug: 'flexible', title: 'Flexible capital', sub: 'Direct & custom mandates', runtime: '2 min', cta: 'Explore flexible capital', poster: '/assets/project-renders/HW_Render_360-Kennedy-Lane.jpg',
    for: ['Institutions', 'Family offices', 'Sovereign wealth funds'],
    items: [{ k: 'Separately managed accounts', v: 'Client-specific mandates' }, { k: 'Joint ventures / Co-GP', v: 'Partnerships with other living-sector managers' }, { k: 'Co-investments', v: 'Deal-level access alongside our funds' }],
    intro: 'For investors who want a mandate built around them. We apply the same development and operating expertise that runs our trusts to your goals, timeline and risk profile.', heading: 'Three ways to partner',
    rows: [{ no: '01', k: 'Separately managed accounts', body: 'A portfolio built and managed to your specific mandate.' }, { no: '02', k: 'Joint ventures / Co-GP', body: 'Partnerships with other living-sector managers, sharing risk and reward.' }, { no: '03', k: 'Co-investments', body: 'Deal-level access to individual projects, alongside our funds.' }],
    ctaLine: 'Tell us about your mandate.',
  },
  {
    slug: 'services', title: 'Services', sub: 'Operational & asset services', runtime: '2 min', cta: 'Explore our services', poster: '/assets/project-renders/HW_Render_353-Sherbourne.jpg',
    for: ['Institutions', 'Family offices', 'Real estate companies'],
    items: [{ k: 'Development services', v: 'For land owners and non-developer real estate companies' }, { k: 'Asset management services', v: 'Portfolio operations for high-quality assets' }],
    intro: 'Our platform, working for your buildings. We bring our development and asset management teams to land owners and real estate companies who want institutional-quality results.', heading: 'What we offer',
    rows: [{ no: '01', k: 'Development services', body: 'From entitlement to completion, for land owners and real estate companies that don’t develop in-house.' }, { no: '02', k: 'Asset management services', body: 'Leasing, operations and building performance for high-quality rental assets.' }],
    ctaLine: 'Put our platform to work on your buildings.',
  },
]

const WHY_LIVING = [
  { no: '01', title: 'Built-in inflation protection', body: 'Residential rents can be reset every year, rather than being locked into the long-term fixed escalations typical of office, industrial and retail leases.' },
  { no: '02', title: 'Structural demand', body: 'Canada needs an additional 3.5 million homes by 2030 to restore affordability, and the United States is short an estimated 4.03 million homes. This shortage will sustain occupancy and rental growth for the next several years.' },
  { no: '03', title: 'A shortage of durable buildings', body: 'There is too little well-built housing across North America and growing demand for beautiful, healthy, community-centred buildings. That is why our mandate is to build and buy great quality homes that residents love to live in.' },
]
const WHY_NOW = [
  { op: '+', k: 'Demand', theme: 'More renters', ca: { big: '+539,900', label: 'New renter households across Canada, 2021–2026 (5.06 million to 5.60 million), vs. +478,200 owner households.' }, us: { big: '+898,000', label: 'New renter households in 2025 alone (to a record 46.1 million), vs. +234,000 owner households.' } },
  { op: '−', k: 'Supply', theme: 'Less new supply', ca: { big: '−33%', label: 'Condo apartment starts across Canada, from the 2023 peak to 2025 (69,300 to 46,600). Investor-owned condos have long supplied much of Canada’s rental stock.' }, us: { big: '−34%', label: 'Apartments under construction (5+ unit buildings), from the July 2023 peak of 1.02 million to 670,000 at the end of 2025.' } },
  { op: '=', k: 'The gap', theme: 'Long-term shortfall', ca: { big: '3.5M', label: 'Additional homes needed by 2030 to restore affordability.' }, us: { big: '4.3M', label: 'New apartments needed by 2035 to meet demand.' } },
]
const MARKET_GROUPS = [
  { country: 'Canada', mark: 'CA FLAG', cities: ['Greater Toronto Area', 'Ottawa', 'Montreal', 'Halifax', 'Vancouver', 'Calgary', 'Edmonton'] },
  { country: 'United States', mark: 'US FLAG', cities: ['Greater Bay Area', 'Seattle', 'San Diego', 'Boston', 'Charlotte', 'Durham'] },
]
const STRATEGIES = [
  {
    word: 'Growth', color: 'var(--hw-cool-grey)', ring: '/assets/logos/HW_Growth_Ring_Black.png', h: 'Build to hold.',
    lead: 'We develop energy-efficient, community-centric, healthy residential communities in supply-constrained markets.',
    points: [
      { k: 'Risk reduction', v: 'Our vertically integrated platform lets us underwrite hard and soft costs more accurately, so actual results vary less from our financial assumptions.' },
      { k: 'Value creation', v: 'Construction and lease-up create significant value. We take a site and build its highest and best use, which then delivers long-term capital appreciation and stabilized income.' },
      { k: 'Performance efficiency', v: 'Energy efficiency is more than a set of climate benchmarks. We view it as a financial opportunity to drive asset value and performance.' },
    ],
    access: 'Heartwood Residential Growth Trust, joint ventures, Co-GP, co-investments and separately managed accounts.', r: 'investment/growth',
  },
  {
    word: 'Income', color: 'var(--hw-hemlock)', ring: '/assets/logos/HW_Income_Ring_Black.png', h: 'Buy to hold.',
    lead: 'We acquire modern, stabilized, institutional-quality rental communities at today’s pricing, then improve them through ownership.',
    points: [
      { k: 'Designed to deliver', v: 'Resilient, tax-efficient monthly income, long-term capital appreciation and a conservative capital structure.' },
      { k: 'Prudent leverage', v: 'Leverage of no more than 50% loan-to-value and disciplined underwriting enhance risk-adjusted returns while protecting investor capital.' },
      { k: 'Operational efficiency', v: 'Because we build, we understand building operations from first principles, allowing us to create value through acquisitions by recommissioning assets to improve operational efficiency.' },
    ],
    access: 'Heartwood Residential Income Trust, joint ventures, co-investments and separately managed accounts.', r: 'investment/income',
  },
]
const ROUTES = [
  { title: 'Private wealth', body: 'Family offices and high-net-worth investors. Invest directly in either trust from $25,000, or co-invest alongside us.', cta: 'For private wealth', r: 'investment/hnw' },
  { title: 'Advisors', body: 'Materials, education and a dedicated contact for EMDs, RIAs and wealth managers.', cta: 'For advisors', r: 'investment/advisors' },
  { title: 'Institutional investors', body: 'Pension funds, foundations, endowments and insurers. Fund commitments, mandates and partnerships.', cta: 'For institutions', r: 'investment/institutional' },
]
const INST_TYPES = ['Pension', 'Foundation or endowment', 'Insurer', 'Family office', 'Asset manager', 'Other']
const INST_INTEREST = ['Our funds', 'Separately managed account', 'Joint venture / Co-GP', 'Co-investment', 'Development or asset management services']

function Field({ label, children }) {
  return (
    <label style={sx('display:flex;flex-direction:column;gap:8px')}>
      <span style={sx(FIELD_LABEL)}>{label}</span>
      {children}
    </label>
  )
}

function Vehicle({ veh, isFunds, go }) {
  const rows = isFunds ? [] : veh.rows
  return (
    <>
      <section data-screen-label="Investment — Vehicle hero" style={sx('padding:clamp(40px,5vw,72px) clamp(20px,3vw,40px) 0;display:flex;flex-direction:column;gap:clamp(24px,3vw,40px)')}>
        <Hv as="button" onClick={() => go('investment/overview')} s={`align-self:flex-start;background:none;border:0;padding:0;cursor:pointer;${MONO};font-size:13px;color:var(--hw-black)`} h="color:var(--hw-terracotta)">
          ← Ways to invest
        </Hv>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(24px,4vw,64px);align-items:end')}>
          <div style={sx('display:flex;flex-direction:column;gap:16px')}>
            <p style={sx(EYEBROW)}>{veh.sub}</p>
            <h1 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(44px,6vw,96px);line-height:1;letter-spacing:-.03em')}>{veh.title}</h1>
          </div>
          <p style={sx('margin:0;font-size:clamp(17px,1.35vw,20px);line-height:1.55;text-wrap:pretty')}>{veh.intro}</p>
        </div>
        <div style={sx(`position:relative;width:100%;aspect-ratio:16/9;background:#212121 url('${veh.poster}') center/cover no-repeat`)}>
          <div style={sx('position:absolute;inset:0;background:rgba(33,33,33,.25)')} />
          <div style={sx(`position:absolute;left:clamp(16px,2vw,32px);bottom:clamp(16px,2vw,32px);display:flex;align-items:center;gap:14px;padding:12px 18px 12px 12px;background:var(--hw-white);${MONO};font-size:14px`)}>
            <span style={sx('width:40px;height:40px;border-radius:50%;background:var(--hw-terracotta);color:var(--hw-white);display:flex;align-items:center;justify-content:center;padding-left:3px')}>▶</span>
            Watch the film · {veh.runtime}
          </div>
          <span style={sx(`position:absolute;top:16px;right:16px;padding:6px 10px;border:1.5px dashed var(--hw-white);color:var(--hw-white);${MONO};font-size:12px`)}>Video placeholder</span>
        </div>
      </section>

      {isFunds && (
        <section data-screen-label="Our funds — Strategies" style={sx('background:var(--hw-white);color:var(--hw-black);padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:clamp(28px,3vw,48px)')}>
          <div style={sx('display:flex;flex-direction:column;gap:20px')}>
            <p style={sx(`margin:0;${MONO};font-size:clamp(14px,1.2vw,18px);color:var(--hw-hemlock)`)}>Two strategies</p>
            <h2 style={sx('margin:0;max-width:720px;font-family:var(--font-display);font-weight:500;font-size:clamp(32px,3.6vw,52px);line-height:1.08;letter-spacing:-.015em;text-wrap:balance')}>Growth and Income.</h2>
            <p style={sx('margin:0;max-width:680px;font-size:clamp(17px,1.35vw,20px);line-height:1.5;text-wrap:pretty')}>
              Two core strategies: Growth develops and holds new purpose-built rental; Income acquires modern, stabilized buildings. Our trusts are the most direct way in.
            </p>
          </div>
          <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));gap:clamp(16px,2vw,28px)')}>
            {FUNDS.map((f) => (
              <Hv key={f.r} as="button" onClick={() => go(f.r)} s="text-align:left;cursor:pointer;background:var(--hw-white);border:1.5px solid var(--hw-black);color:var(--hw-black);padding:0;display:flex;flex-direction:column" h="background:rgba(197,220,234,.35)">
                <div style={sx('display:flex;align-items:center;justify-content:center;padding:clamp(40px,6vw,88px) clamp(28px,4vw,64px);min-height:clamp(220px,22vw,320px);box-sizing:border-box;width:100%')}>
                  <img src={f.logo} alt={f.name} style={sx('width:100%;max-width:440px;height:auto;display:block')} />
                </div>
                <div style={sx(`height:6px;background:${f.color};width:100%`)} />
                <div style={sx('padding:clamp(24px,3vw,36px);display:flex;flex-direction:column;gap:16px;flex:1')}>
                  <span style={sx(`${MONO};font-size:13px`)}>{f.kind}</span>
                  <span style={sx('font-size:clamp(17px,1.35vw,20px);line-height:1.5;text-wrap:pretty')}>{f.pitch}</span>
                  <span style={sx('font-size:18px;line-height:1.5;text-wrap:pretty;padding-top:14px;border-top:1px solid rgba(33,33,33,.25)')}>
                    <span style={sx(`${MONO};font-size:12px`)}>{f.whyLabel} · </span>
                    {f.why}
                  </span>
                  <span style={sx(`margin-top:auto;${MONO};font-size:13px`)}>Explore the {f.short} →</span>
                </div>
              </Hv>
            ))}
          </div>
        </section>
      )}

      <section data-screen-label="Investment — Vehicle options" style={sx(`padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:28px;background:${RULE_BG}`)}>
        <div style={sx('height:1.5px;background:var(--hw-terracotta)')} />
        {!isFunds && <h2 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(30px,3.2vw,46px);line-height:1.05')}>{veh.heading}</h2>}
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:clamp(20px,3vw,48px)')}>
          {rows.map((x) => (
            <div key={x.no} style={sx('display:flex;flex-direction:column;gap:10px;border-top:1px solid var(--hw-black);padding-top:16px')}>
              <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:clamp(36px,3.4vw,52px);line-height:1;color:var(--hw-terracotta)')}>{x.no}</span>
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:22px')}>{x.k}</span>
              <span style={sx('font-size:18px;line-height:1.5;text-wrap:pretty')}>{x.body}</span>
            </div>
          ))}
        </div>
        <div style={sx('display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding-top:12px')}>
          <span style={sx(`${MONO};font-size:13px`)}>Available to</span>
          {veh.for.map((t) => (
            <span key={t} style={sx(TAG)}>{t}</span>
          ))}
        </div>
      </section>

      <section data-screen-label="Investment — Vehicle CTA" style={sx('background:var(--hw-terracotta);color:var(--hw-white);padding:clamp(48px,5vw,72px) clamp(20px,3vw,40px);display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:24px 40px')}>
        <p style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(28px,3vw,44px);line-height:1.1;max-width:720px;text-wrap:balance')}>{veh.ctaLine}</p>
        <Hv as="button" onClick={() => go('investment/meeting')} s={`padding:16px 24px;background:var(--hw-white);color:var(--hw-black);border:1.5px solid var(--hw-white);cursor:pointer;${MONO};font-size:14px`} h="background:var(--hw-black);color:var(--hw-white);border-color:var(--hw-black)">
          Book a call
        </Hv>
      </section>
    </>
  )
}

function Overview({ go }) {
  const [instSent, setInstSent] = useState(false)

  return (
    <>
      <section data-screen-label="Investment — Hero" style={sx("position:relative;overflow:hidden;min-height:clamp(520px,54vw,800px);background:var(--hw-brown) url('/assets/photography/HW_Photo_Bakers-Place_Garden.jpg') center 60%/cover no-repeat;display:flex;align-items:flex-end")}>
        <div style={sx('position:absolute;inset:0;background:var(--overlay-brown)')} />
        <div style={sx('position:relative;padding:clamp(32px,4vw,56px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:20px;color:var(--hw-white)')}>
          <p style={sx(`margin:0;${MONO};font-size:clamp(14px,1.2vw,18px)`)}>Investments</p>
          <h1 style={sx('margin:0;max-width:980px;font-family:var(--font-display);font-weight:500;font-size:clamp(40px,5.4vw,88px);line-height:1;letter-spacing:-.02em;text-wrap:balance')}>Two strategies. One long view.</h1>
          <p style={sx('margin:0;max-width:680px;font-size:clamp(18px,1.5vw,22px);line-height:1.5;text-wrap:pretty')}>
            We focus on the living sector: purpose-built rental housing in supply-constrained North American markets. Our Growth strategy builds it. Our Income strategy buys it. Both are designed to hold for the long term, for durable income and appreciation.
          </p>
        </div>
      </section>

      <section data-screen-label="Investment — Why living" style={sx(RULED_SECTION)}>
        <div style={sx('display:flex;flex-direction:column;gap:20px')}>
          <p style={sx(EYEBROW)}>Why living</p>
          <h2 style={sx(H2)}>Why we focus on rental housing.</h2>
        </div>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:clamp(20px,3vw,48px)')}>
          {WHY_LIVING.map((w) => (
            <div key={w.no} style={sx('display:flex;flex-direction:column;gap:12px;border-top:1px solid var(--hw-black);padding-top:18px')}>
              <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:clamp(36px,3.4vw,52px);line-height:1;color:var(--hw-terracotta)')}>{w.no}</span>
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(20px,1.8vw,26px);line-height:1.15')}>{w.title}</span>
              <p style={sx('margin:0;font-size:18px;line-height:1.5;text-wrap:pretty')}>{w.body}</p>
            </div>
          ))}
        </div>
        <p style={sx('margin:0;font-family:var(--font-subhead);font-size:12px;text-transform:uppercase;line-height:1.5')}>
          Sources: CMHC, Canada’s Housing Supply Shortages: Moving to a New Framework; Realtor.com, 2026 Housing Supply Gap Report (March 2026).
        </p>
      </section>

      <section data-screen-label="Investment — Why now" style={sx(RULED_SECTION)}>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:clamp(24px,4vw,72px);align-items:start')}>
          <div style={sx('display:flex;flex-direction:column;gap:20px')}>
            <p style={sx(EYEBROW)}>Why now</p>
            <h2 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(40px,5vw,76px);line-height:1;letter-spacing:-.02em')}>
              Rising demand.
              <br />
              Shrinking supply.
            </h2>
          </div>
          <div style={sx('display:flex;flex-direction:column;gap:18px')}>
            <p style={sx(WHY_NOW_P)}>
              We are seeing an economic sea change in the rental housing market across North America. Demand continues to grow while new supply remains constrained, creating a generational opportunity to build and acquire high-quality assets.
            </p>
            <p style={sx(WHY_NOW_P)}>
              With new supply pulling back in both countries and pricing reset from 2022 levels, we believe today’s environment creates an attractive entry point for long-term investors. We do not need to predict when rates will fall or cap rates will compress. We invest based on fundamentals that make sense today. That is the long view: build and buy quality assets, hold through the cycles, and remain patient until the right opportunity to sell emerges. We cannot predict when the cycle will turn, but we can position ourselves to benefit when it does.
            </p>
          </div>
        </div>
        <div style={sx('display:flex;flex-direction:column;border-bottom:1px solid var(--hw-black)')}>
          {WHY_NOW.map((r) => (
            <div key={r.k} style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:16px clamp(20px,3vw,48px);padding:clamp(22px,2.6vw,32px) 0;border-top:1px solid var(--hw-black)')}>
              <div style={sx('display:flex;gap:16px;align-items:flex-start')}>
                <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:clamp(36px,3.6vw,56px);line-height:.8;color:var(--hw-terracotta);width:.8em;flex:none')}>{r.op}</span>
                <div style={sx('display:flex;flex-direction:column;gap:6px')}>
                  <span style={sx(`${MONO};font-size:13px;color:var(--hw-terracotta)`)}>{r.k}</span>
                  <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.2vw,32px);line-height:1.05')}>{r.theme}</span>
                </div>
              </div>
              {[
                ['Canada', r.ca],
                ['United States', r.us],
              ].map(([label, d]) => (
                <div key={label} style={sx('display:flex;flex-direction:column;gap:8px')}>
                  <span style={sx(`${MONO};font-size:12px`)}>{label}</span>
                  <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(36px,3.6vw,56px);line-height:1;letter-spacing:-.02em')}>{d.big}</span>
                  <span style={sx('font-size:17px;line-height:1.45;max-width:420px;text-wrap:pretty')}>{d.label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <p style={sx('margin:0;font-size:14px;line-height:1.5;max-width:1100px')}>
          Sources: Canada demand: Environics Analytics, household tenure, all ten provinces, 2021–2026. US demand: U.S. Census Bureau data, via Arbor Realty Trust and Chandan Economics, Renters Now Represent 80% of Household Growth (2026). Canada supply: CMHC Starts and Completions Survey, condominium apartment starts, all ten provinces, 2021–2025. US supply: U.S. Census Bureau and HUD, New Residential Construction, via NAHB and Multifamily Dive. Long-term gap: CMHC, Canada’s Housing Supply Shortages; National Multifamily Housing Council.
        </p>
        <div style={sx('display:flex;gap:12px;flex-wrap:wrap')}>
          <Hv as="button" onClick={() => go('about/who')} s={OUTLINE_SM} h="background:var(--hw-black);color:var(--hw-white)">Why we hold →</Hv>
          <Hv as="button" onClick={() => go('insights/newsletter')} s={OUTLINE_SM} h="background:var(--hw-black);color:var(--hw-white)">Subscribe to The Long View →</Hv>
        </div>
      </section>

      <section data-screen-label="Investment — Where we invest" style={sx(RULED_SECTION)}>
        <div style={sx(SPLIT_HEAD)}>
          <div style={sx('display:flex;flex-direction:column;gap:20px')}>
            <p style={sx(EYEBROW)}>Where we invest</p>
            <h2 style={sx(H2)}>High-growth, supply-constrained North American markets.</h2>
          </div>
          <p style={sx(LEDE)}>
            Canada is our founding market, where the condo slowdown has deepened the shortage in cities already short on well-built housing, causing more households to rent. In the United States, we focus on select markets where durable demand is coupled with a decline in new apartment supply.
          </p>
        </div>
        <div style={sx('display:flex;flex-direction:column;gap:clamp(28px,3vw,40px)')}>
          {MARKET_GROUPS.map((g) => (
            <div key={g.country} style={sx('display:flex;flex-direction:column;gap:12px')}>
              <div style={sx('display:flex;flex-wrap:wrap;align-items:center;gap:6px 14px')}>
                <DotIcon name={g.mark} color="#BC532D" size={40} />
                <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.2vw,32px)')}>{g.country}</span>
              </div>
              <div style={sx('display:flex;flex-wrap:wrap;gap:12px clamp(28px,3vw,48px);padding:18px 0;border-top:1px solid var(--hw-black);border-bottom:1px solid var(--hw-black)')}>
                {g.cities.map((c) => (
                  <span key={c} style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(20px,1.8vw,26px);white-space:nowrap')}>{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section data-screen-label="Investment — Our strategies" style={sx(RULED_SECTION)}>
        <div style={sx(SPLIT_HEAD)}>
          <div style={sx('display:flex;flex-direction:column;gap:20px')}>
            <p style={sx(EYEBROW)}>Our strategies</p>
            <h2 style={sx(H2)}>Two strategies, built to hold.</h2>
          </div>
          <p style={sx(WHY_NOW_P)}>Each strategy plays a different role in our portfolios. However, they share the same standard of quality and the same long-term ownership approach.</p>
        </div>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));gap:clamp(20px,2.4vw,36px)')}>
          {STRATEGIES.map((s) => (
            <div key={s.word} style={sx(`display:flex;flex-direction:column;border-top:4px solid ${s.color};background:var(--hw-white)`)}>
              <div role="img" aria-label={`${s.word} strategy`} style={sx('position:relative;display:flex;align-items:center;justify-content:center;height:clamp(200px,20vw,260px);margin:24px 0 4px;border-bottom:1px solid var(--hw-black);padding-bottom:24px')}>
                <img src={s.ring} alt="" style={sx('position:absolute;top:0;left:50%;transform:translateX(-50%);height:calc(100% - 24px);width:auto')} />
                <span style={sx('position:relative;margin-top:-24px;font-family:var(--font-display);font-weight:900;font-size:clamp(40px,4.2vw,58px);line-height:.85;text-transform:uppercase;background:var(--hw-white);padding:6px 12px 2px')}>{s.word}</span>
              </div>
              <div style={sx('display:flex;flex-direction:column;gap:14px;padding:24px 0')}>
                <h3 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(28px,2.6vw,38px);line-height:1.05;letter-spacing:-.015em')}>{s.h}</h3>
                <p style={sx('margin:0;font-size:clamp(18px,1.4vw,20px);line-height:1.5;text-wrap:pretty')}>{s.lead}</p>
              </div>
              <div style={sx('display:flex;flex-direction:column')}>
                {s.points.map((pt) => (
                  <div key={pt.k} style={sx('display:flex;flex-direction:column;gap:6px;padding:16px 0;border-top:1px solid rgba(33,33,33,.3)')}>
                    <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(19px,1.6vw,22px);line-height:1.2')}>{pt.k}</span>
                    <span style={sx('font-size:17px;line-height:1.5;text-wrap:pretty')}>{pt.v}</span>
                  </div>
                ))}
              </div>
              <div style={sx('display:flex;flex-direction:column;gap:16px;margin-top:auto;padding:18px 0 0;border-top:1px solid var(--hw-black)')}>
                <p style={sx('margin:0;font-size:16px;line-height:1.5')}>
                  <span style={sx(`${MONO};font-size:12px;margin-right:8px`)}>Access through</span>
                  {s.access}
                </p>
                <Hv as="button" onClick={() => go(s.r)} s={`align-self:flex-start;padding:14px 20px;background:var(--hw-black);color:var(--hw-white);border:0;cursor:pointer;${MONO};font-size:13px`} h={`background:${s.color}`}>
                  Explore the {s.word} strategy →
                </Hv>
              </div>
            </div>
          ))}
        </div>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:clamp(20px,4vw,72px);align-items:center;background:var(--hw-white);color:var(--hw-black);border-top:4px solid var(--hw-terracotta);border-bottom:1px solid var(--hw-black);padding:clamp(28px,3.6vw,52px) 0')}>
          <div style={sx('display:flex;flex-direction:column;gap:12px')}>
            <span style={sx(`${MONO};font-size:13px;color:var(--hw-terracotta)`)}>03 · Hold · Across both</span>
            <h3 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(30px,3vw,46px);line-height:1.05;letter-spacing:-.015em')}>Owned for the long view.</h3>
          </div>
          <div style={sx('display:flex;flex-direction:column;gap:18px;align-items:flex-start')}>
            <p style={sx('margin:0;font-size:clamp(17px,1.35vw,20px);line-height:1.55;text-wrap:pretty')}>
              Hold isn’t a third product. It’s how both strategies are managed. What we build becomes tomorrow’s income-producing portfolio, and what we buy we keep improving while we own it. Investors in either strategy benefit from the same patient ownership.
            </p>
            <Hv as="button" onClick={() => go('about/who')} s={OUTLINE_SM} h="background:var(--hw-black);color:var(--hw-white)">
              Why we hold →
            </Hv>
          </div>
        </div>
      </section>

      <section data-screen-label="Investment — Ways to invest" style={sx('background:var(--hw-white);border-top:1.5px solid var(--hw-terracotta);padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:clamp(28px,3vw,48px)')}>
        <div style={sx('display:flex;flex-direction:column;gap:20px')}>
          <p style={sx(EYEBROW)}>Ways to invest</p>
          <h2 style={sx(H2)}>One platform, several vehicles.</h2>
          <p style={sx('margin:0;max-width:680px;font-size:clamp(17px,1.35vw,20px);line-height:1.5;text-wrap:pretty')}>
            Our strategies are broader than our funds. Investors can access them through commingled trusts, specific mandates or deal-level partnerships.
          </p>
        </div>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:clamp(20px,2.4vw,36px)')}>
          {VEHICLES.map((v) => (
            <Hv key={v.slug} as="button" onClick={() => go('investment/' + v.slug)} s="display:flex;flex-direction:column;gap:16px;border:0;border-top:3px solid var(--hw-black);padding:20px 0 0;background:none;text-align:left;cursor:pointer;color:var(--hw-black);font-family:var(--font-body)" h="color:var(--hw-terracotta)">
              <span style={sx(`position:relative;display:block;width:100%;aspect-ratio:16/9;background:#212121 url('${v.poster}') center/cover no-repeat`)}>
                <span style={sx(`position:absolute;left:14px;bottom:14px;display:flex;align-items:center;gap:10px;padding:8px 12px 8px 8px;background:var(--hw-white);color:var(--hw-black);${MONO};font-size:12px`)}>
                  <span style={sx('width:28px;height:28px;border-radius:50%;background:var(--hw-terracotta);color:var(--hw-white);display:flex;align-items:center;justify-content:center;font-size:14px;padding-left:2px')}>▶</span>
                  Watch · {v.runtime}
                </span>
              </span>
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.2vw,32px);line-height:1.1')}>{v.title}</span>
              <span style={sx(`${MONO};font-size:12px`)}>{v.sub}</span>
              <span style={sx('display:flex;flex-direction:column;width:100%')}>
                {v.items.map((it) => (
                  <span key={it.k} style={sx('display:flex;flex-direction:column;gap:3px;padding:12px 0;border-top:1px solid rgba(33,33,33,.3)')}>
                    <span style={sx('font-size:18px;line-height:1.3')}>{it.k}</span>
                    <span style={sx('font-size:18px;line-height:1.45')}>{it.v}</span>
                  </span>
                ))}
              </span>
              <span style={sx('display:flex;flex-wrap:wrap;gap:6px;margin-top:auto')}>
                {v.for.map((t) => (
                  <span key={t} style={sx(`${TAG};color:var(--hw-black)`)}>{t}</span>
                ))}
              </span>
              <span style={sx(`align-self:flex-start;margin-top:8px;padding:14px 20px;border:1.5px solid var(--hw-black);color:var(--hw-black);${MONO};font-size:13px`)}>{v.cta} →</span>
            </Hv>
          ))}
        </div>
      </section>

      <section data-screen-label="Investment — Invest your way" style={sx('background:var(--hw-white);border-top:1.5px solid var(--hw-terracotta);padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:clamp(28px,3vw,48px)')}>
        <div style={sx(SPLIT_HEAD)}>
          <div style={sx('display:flex;flex-direction:column;gap:20px')}>
            <p style={sx(EYEBROW)}>Invest with us</p>
            <h2 style={sx(H2)}>Own the future of real estate with us.</h2>
          </div>
          <p style={sx(LEDE)}>Start the conversation that fits you. Each path connects you with the team that works with investors like you.</p>
        </div>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:clamp(20px,2.4vw,36px)')}>
          {ROUTES.map((r) => (
            <Hv key={r.r} as="button" onClick={() => go(r.r)} s="display:flex;flex-direction:column;gap:14px;padding:20px 0 0;background:none;border:0;border-top:3px solid var(--hw-black);cursor:pointer;color:var(--hw-black);text-align:left;font-family:var(--font-body)" h="color:var(--hw-terracotta)">
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.2vw,32px);line-height:1.1')}>{r.title}</span>
              <span style={sx('font-size:18px;line-height:1.5;color:var(--hw-black);text-wrap:pretty')}>{r.body}</span>
              <span style={sx(`align-self:flex-start;margin-top:8px;padding:14px 20px;border:1.5px solid var(--hw-black);color:var(--hw-black);${MONO};font-size:13px`)}>{r.cta} →</span>
            </Hv>
          ))}
        </div>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(24px,4vw,64px);padding-top:clamp(32px,4vw,56px);border-top:1px solid var(--hw-black)')}>
          <div style={sx('display:flex;flex-direction:column;gap:14px')}>
            <span style={sx(`${MONO};font-size:13px;color:var(--hw-black)`)}>Institutional enquiries</span>
            <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(26px,2.6vw,38px);line-height:1.1')}>Talk to our institutional team.</span>
            <p style={sx('margin:0;max-width:480px;font-size:18px;line-height:1.5;text-wrap:pretty')}>
              For pensions, foundations, endowments, insurers and family offices exploring our funds, separately managed accounts, joint ventures or co-investments.
            </p>
          </div>
          <div style={sx('background:var(--hw-white);padding:clamp(24px,3vw,40px)')}>
            {instSent ? (
              <p style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.4vw,34px);line-height:1.15')}>
                Thank you — our institutional team will be in touch within two business days.
              </p>
            ) : (
              <>
                <HubspotNote label="Institutional enquiry" style={{ marginBottom: 16 }} />
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setInstSent(true)
                  }}
                  data-hubspot-form="institutional-enquiry"
                  style={sx('display:flex;flex-direction:column;gap:16px')}
                >
                  <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px')}>
                    <Field label="Name"><input required placeholder="ENTER YOUR NAME" style={sx(FIELD)} /></Field>
                    <Field label="Organization"><input required placeholder="ENTER YOUR ORGANIZATION" style={sx(FIELD)} /></Field>
                    <Field label="Email"><input type="email" required placeholder="ENTER YOUR EMAIL" style={sx(FIELD)} /></Field>
                    <Field label="Investor type">
                      <select required style={sx(FIELD)}>
                        {INST_TYPES.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field label="Interested in">
                    <select style={sx(FIELD)}>
                      {INST_INTEREST.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="Message"><textarea rows={4} placeholder="TELL US ABOUT YOUR MANDATE" style={sx(`${FIELD};resize:vertical`)} /></Field>
                  <div>
                    <Hv as="button" type="submit" s={`padding:12px 18px;background:var(--hw-black);color:var(--hw-white);border:0;cursor:pointer;${MONO};font-size:14px`} h="background:var(--hw-terracotta)">
                      Send enquiry
                    </Hv>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <section data-screen-label="Investment — Standards" style={sx('padding:clamp(40px,5vw,64px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:24px;border-top:1.5px solid var(--hw-terracotta)')}>
        <div style={sx('display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:16px 40px')}>
          <div style={sx('display:flex;flex-direction:column;gap:10px')}>
            <p style={sx(EYEBROW)}>Signatories and frameworks</p>
            <p style={sx('margin:0;font-size:clamp(18px,1.4vw,21px);line-height:1.45')}>We design, measure and report against recognized standards.</p>
          </div>
          <Hv as="button" onClick={() => go('about/standards')} s={OUTLINE_SM} h="background:var(--hw-black);color:var(--hw-white)">
            Our standards →
          </Hv>
        </div>
        <StandardLogos />
      </section>
    </>
  )
}

function Fund({ f, go }) {
  const formRef = useRef(null)
  const [sent, setSent] = useState(false)
  const scrollForm = () => {
    const el = formRef.current
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' })
  }
  return (
    <>
      <section data-screen-label="Strategy — Hero" style={sx(`position:relative;overflow:hidden;min-height:clamp(560px,60vw,840px);background:var(--hw-brown) url('${f.img}') ${f.imgPos}/cover no-repeat;color:var(--hw-white);display:flex;flex-direction:column;justify-content:space-between;padding:clamp(28px,3.4vw,48px) clamp(20px,3vw,40px) clamp(32px,4.4vw,56px);box-sizing:border-box`)}>
        <div style={sx('position:absolute;inset:0;background:rgba(58,35,22,.55)')} />
        <p style={sx(`position:relative;margin:0;${MONO};font-size:clamp(13px,1.1vw,15px)`)}>Investments · {f.kind}</p>
        <div style={sx('position:relative;display:flex;flex-direction:column;gap:clamp(20px,2.2vw,28px);max-width:860px')}>
          <div role="img" aria-label={`${f.word} strategy`} style={sx('display:flex;align-items:center;gap:clamp(16px,2.8vw,36px)')}>
            <img src={f.ringW} alt="" style={sx('height:clamp(96px,16vw,210px);width:auto;display:block;flex:none')} />
            <span style={sx('font-family:var(--font-display);font-weight:900;font-size:clamp(44px,8.6vw,112px);line-height:.85;letter-spacing:-.01em;text-transform:uppercase')}>{f.word}</span>
          </div>
          <h1 style={sx('margin:0;max-width:640px;font-family:var(--font-display);font-weight:500;font-size:clamp(22px,2.3vw,30px);line-height:1.18;letter-spacing:-.01em;text-wrap:pretty')}>{f.intro}</h1>
          <div style={sx('display:flex;gap:12px;flex-wrap:wrap')}>
            <Hv as="button" onClick={scrollForm} s={`padding:14px 22px;background:var(--hw-white);color:var(--hw-black);border:0;cursor:pointer;${MONO};font-size:14px`} h="background:var(--hw-cool-grey)">
              Request the deck
            </Hv>
            <Hv as="button" onClick={() => go('investment/meeting')} s={`padding:12.5px 20px;background:transparent;color:var(--hw-white);border:1.5px solid var(--hw-white);cursor:pointer;${MONO};font-size:14px`} h="background:var(--hw-white);color:var(--hw-black)">
              Book a call
            </Hv>
          </div>
        </div>
      </section>

      <section data-screen-label="Strategy — Why" style={sx(STRAT_SECTION)}>
        <p style={sx(STRAT_EYEBROW)}>{f.why.label}</p>
        <div style={sx(STRAT_SPLIT)}>
          <div style={sx('display:flex;flex-direction:column;gap:24px')}>
            <h2 style={sx(STRAT_H2)}>{f.why.h}</h2>
            {f.why.p.map((p) => (
              <p key={p} style={sx('margin:0;max-width:640px;font-size:clamp(18px,1.4vw,21px);line-height:1.55;text-wrap:pretty')}>{p}</p>
            ))}
          </div>
          <figure style={sx('margin:0;padding:clamp(24px,3vw,40px);background:var(--hw-cool-grey);display:flex;flex-direction:column;gap:18px')}>
            <blockquote style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(22px,2vw,30px);line-height:1.22;letter-spacing:-.01em;text-wrap:pretty')}>“{f.why.quote}”</blockquote>
            <figcaption style={sx(`${MONO};font-size:13px`)}>{f.why.by}</figcaption>
          </figure>
        </div>
      </section>

      <section data-screen-label="Strategy — Delivers" style={sx(STRAT_SECTION)}>
        <div style={sx(STRAT_SPLIT)}>
          <div style={sx('display:flex;flex-direction:column;gap:20px')}>
            <p style={sx(STRAT_EYEBROW)}>Designed to deliver</p>
            <h2 style={sx(STRAT_H2)}>{f.deliversH}</h2>
          </div>
          <div style={sx('display:flex;flex-direction:column;border-bottom:1px solid var(--hw-black)')}>
            {f.delivers.map((v, i) => (
              <div key={v} style={sx('border-top:1px solid var(--hw-black);padding:18px 0;display:grid;grid-template-columns:48px minmax(0,1fr);gap:12px;font-size:clamp(19px,1.5vw,22px);line-height:1.35')}>
                <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:15px;color:var(--hw-terracotta);padding-top:4px')}>{'0' + (i + 1)}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-screen-label="Strategy — How it works" style={sx(`padding:clamp(56px,6vw,96px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:clamp(28px,3vw,48px);background:${f.dot};color:var(--hw-white)`)}>
        <div style={sx('display:flex;flex-direction:column;gap:20px')}>
          <p style={sx(`${STRAT_EYEBROW};color:var(--hw-white)`)}>{f.path.label}</p>
          <h2 style={sx(STRAT_H2)}>{f.path.h}</h2>
        </div>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:clamp(20px,2vw,32px)')}>
          {f.path.steps.map((s) => (
            <div key={s.n} style={sx('display:flex;flex-direction:column;gap:12px;border-top:3px solid var(--hw-white);padding-top:18px')}>
              <span style={sx(`${MONO};font-size:13px;color:var(--hw-white)`)}>{s.n} · {s.t}</span>
              <h3 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(22px,1.9vw,28px);line-height:1.15;letter-spacing:-.01em')}>{s.k}</h3>
              <p style={sx('margin:0;font-size:18px;line-height:1.5;text-wrap:pretty')}>{s.v}</p>
            </div>
          ))}
        </div>
        {f.compare && (
          <div style={sx('display:flex;flex-direction:column;border-bottom:1px solid var(--hw-white)')}>
            <div style={sx(`${COMPARE_ROW};padding:0 0 12px;${MONO};font-size:13px`)}>
              <span />
              <span>{f.compare.a}</span>
              <span>{f.compare.b}</span>
            </div>
            {f.compare.rows.map((r) => (
              <div key={r.k} style={sx(`${COMPARE_ROW};padding:18px 0;border-top:1px solid var(--hw-white);align-items:start`)}>
                <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(18px,1.5vw,22px);line-height:1.2')}>{r.k}</span>
                <span style={sx('font-size:17px;line-height:1.45')}>{r.a}</span>
                <span style={sx('font-size:17px;line-height:1.45')}>{r.b}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section data-screen-label="Strategy — By the numbers" style={sx('background:var(--hw-white);border-top:1.5px solid var(--hw-terracotta);padding:clamp(56px,6vw,96px) clamp(20px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(32px,5vw,96px);align-items:start')}>
        <div style={sx('display:flex;flex-direction:column;gap:20px')}>
          <p style={sx(STRAT_EYEBROW)}>{f.stats.label}</p>
          <h2 style={sx(STRAT_H2)}>{f.stats.h}</h2>
          <div style={sx('display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 24px')}>
            {f.stats.items.map((x) => (
              <div key={x.k} style={sx('border-top:1px solid var(--hw-black);padding:18px 0 22px;display:flex;flex-direction:column;gap:8px')}>
                <span style={sx(`font-family:var(--font-display);font-weight:500;font-size:clamp(36px,3.6vw,56px);line-height:1;letter-spacing:-.02em;color:${f.dot}`)}>{x.v}</span>
                <span style={sx('font-size:17px;line-height:1.4')}>{x.k}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={sx('display:flex;flex-direction:column;gap:20px')}>
          <p style={sx(STRAT_EYEBROW)}>Target investment metrics</p>
          <div style={sx('display:flex;flex-direction:column')}>
            {f.targets.map((t) => (
              <div key={t.k} style={sx('border-top:1px solid var(--hw-black);padding:20px 0;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:20px;align-items:baseline')}>
                <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:clamp(40px,4.4vw,68px);line-height:1;letter-spacing:-.02em;color:var(--hw-terracotta)')}>{t.v}</span>
                <p style={sx('margin:0;font-size:18px;line-height:1.4')}>{t.k}</p>
              </div>
            ))}
          </div>
          <p style={sx('margin:0;font-family:var(--font-subhead);font-size:12px;text-transform:uppercase;max-width:640px;line-height:1.5')}>{f.footnote}</p>
        </div>
      </section>

      <section data-screen-label="Strategy — Value through ownership" style={sx(STRAT_SECTION)}>
        <div style={sx(`${STRAT_SPLIT};align-items:end`)}>
          <div style={sx('display:flex;flex-direction:column;gap:20px')}>
            <p style={sx(STRAT_EYEBROW)}>{f.own.label}</p>
            <h2 style={sx(STRAT_H2)}>{f.own.h}</h2>
          </div>
          <p style={sx(STRAT_P)}>{f.own.p}</p>
        </div>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:clamp(20px,2vw,32px)')}>
          {f.own.items.map((o) => (
            <div key={o.k} style={sx('border-top:1px solid var(--hw-black);padding-top:18px;display:flex;flex-direction:column;gap:10px')}>
              <span style={sx(`font-family:var(--font-display);font-weight:500;font-size:clamp(30px,3vw,46px);line-height:1;letter-spacing:-.02em;color:${f.dot}`)}>{o.v}</span>
              <span style={sx('font-size:17px;line-height:1.45;text-wrap:pretty')}>{o.k}</span>
            </div>
          ))}
        </div>
        {f.own.note && <p style={sx('margin:0;font-family:var(--font-subhead);font-size:12px;text-transform:uppercase')}>{f.own.note}</p>}
      </section>

      <section data-screen-label="Strategy — Ways to access" style={sx(STRAT_SECTION)}>
        <div style={sx(`${STRAT_SPLIT};align-items:end`)}>
          <div style={sx('display:flex;flex-direction:column;gap:20px')}>
            <p style={sx(STRAT_EYEBROW)}>Ways to access</p>
            <h2 style={sx(STRAT_H2)}>One strategy, several vehicles.</h2>
          </div>
          <p style={sx(STRAT_P)}>{f.accessP}</p>
        </div>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:clamp(20px,2vw,32px)')}>
          {f.access.map((a) => (
            <Hv key={a.k} as="button" onClick={() => go(a.r)} s="display:flex;flex-direction:column;gap:12px;align-items:flex-start;text-align:left;background:none;border:0;border-top:3px solid var(--hw-black);padding:18px 0 0;cursor:pointer;color:var(--hw-black);font-family:var(--font-body)" h="color:var(--hw-terracotta)">
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(22px,1.9vw,28px);line-height:1.15;letter-spacing:-.01em')}>{a.k}</span>
              <span style={sx('font-size:18px;line-height:1.5;text-wrap:pretty')}>{a.v}</span>
              <span style={sx(`${MONO};font-size:13px`)}>Learn more →</span>
            </Hv>
          ))}
        </div>
        <div style={sx('display:flex;flex-wrap:wrap;align-items:baseline;gap:10px 28px;padding-top:24px;border-top:1px solid var(--hw-black)')}>
          <span style={sx(`${MONO};font-size:13px;color:var(--hw-terracotta)`)}>{f.marketsLabel}</span>
          {f.markets.map((c) => (
            <span key={c} style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(20px,1.8vw,26px)')}>{c}</span>
          ))}
        </div>
      </section>

      <section ref={formRef} data-screen-label="Investment — Form" style={sx('padding:0 clamp(20px,3vw,40px) clamp(40px,5vw,72px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));gap:clamp(32px,4vw,64px);align-items:stretch')}>
        <div style={sx('display:flex;flex-direction:column;gap:20px;padding-top:clamp(40px,5vw,72px)')}>
          <p style={sx(`margin:0;${MONO};font-size:clamp(14px,1.2vw,18px);color:var(--hw-hemlock)`)}>Invest with us</p>
          <h2 style={sx('margin:0;max-width:560px;font-family:var(--font-display);font-weight:500;font-size:clamp(32px,3.6vw,52px);line-height:1.08;letter-spacing:-.015em;text-wrap:balance')}>Own the future of real estate with us.</h2>
        </div>
        <div style={sx('background:var(--hw-hemlock);padding:clamp(28px,3vw,44px);margin-top:clamp(40px,5vw,72px);display:flex;flex-direction:column;gap:22px')}>
          <p style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(26px,2.6vw,38px);line-height:1.1;letter-spacing:-.01em;max-width:480px')}>Build the next generation of real estate with us.</p>
          {/* The design embeds the live HubSpot "investment deck" form; the fallback form below
              shows only if HubSpot never loads. */}
          <hw-hubspot-form portal="343688725" form="ca449e76-cdb2-413e-9ea0-51baf9f9f13f" region="na3" data-hubspot-form="investment-deck">
            {sent ? (
              <p style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(26px,2.6vw,38px);line-height:1.1')}>Thank you. Our team will be in touch shortly.</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSent(true)
                }}
                style={sx('display:flex;flex-direction:column;gap:22px')}
              >
                <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:18px')}>
                  <Field label="Name"><input required placeholder="ENTER YOUR NAME" style={sx(FIELD)} /></Field>
                  <Field label="Email"><input type="email" required placeholder="ENTER YOUR EMAIL" style={sx(FIELD)} /></Field>
                </div>
                <div>
                  <Hv as="button" type="submit" s={`padding:12px 18px;background:var(--hw-black);color:var(--hw-white);border:0;cursor:pointer;${MONO};font-size:14px`} h="background:var(--hw-teal)">
                    Learn more
                  </Hv>
                </div>
              </form>
            )}
          </hw-hubspot-form>
        </div>
      </section>
    </>
  )
}

function PageInvestment({ sub, go }) {
  const s = sub || 'overview'
  const veh = VEHICLES.find((v) => v.slug === s)
  return (
    <div style={sx('background:var(--hw-white);color:var(--hw-black);font-family:var(--font-body)')}>
      {veh && <Vehicle veh={veh} isFunds={s === 'funds'} go={go} />}
      {s === 'overview' && <Overview go={go} />}
      {(s === 'growth' || s === 'income') && <Fund key={s} f={s === 'income' ? INCOME : GROWTH} go={go} />}
    </div>
  )
}

export default PageInvestment
