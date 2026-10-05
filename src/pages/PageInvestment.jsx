import { useRef, useState } from 'react'
import { Hv, sx, DotField, RULE_BG, HubspotNote } from '../design/ui.jsx'
import DotIcon from '../design/DotIcon.jsx'
import HW_DATA from '../design/site-data.js'

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
const FIELD = 'padding:12px 14px;border:1px solid var(--hw-black);background:var(--hw-white);font-family:var(--font-subhead);font-size:14px;color:var(--hw-black);border-radius:0'

const GROWTH = {
  name: 'Heartwood Residential Growth Trust', kind: 'Growth strategy · Build to hold', dot: '#BC532D',
  logo: '/assets/logos/HW_Growth_Logo_Black.png', img: '/assets/project-renders/HW_Render_3385-Lawrence.jpg',
  pitch: 'Builds resilient, beautiful, well-located buildings designed for long-term growth — developing purpose-built rental and holding through stabilization.',
  intro: 'The Growth Fund provides access to an institutional Build-to-Hold strategy developing purpose-built rental housing in supply-constrained Canadian markets and holding through stabilization.',
  targets: [{ v: '18–20%', k: 'Target 10-year average annual return¹' }, { v: '4.5–5.5x', k: 'Target 10-year equity multiple¹' }, { v: '7.0–8.0%', k: 'Target annual distribution upon stabilization²' }],
  footnote: '¹ Series I returns. ² Substantially return of capital; not expected until a significant portion of the portfolio is developed and stabilized. See offering memorandum.',
  delivers: ['Development value creation with reduced entitlement risk', 'Long-term appreciation and recurring income', 'Exposure to structural housing undersupply', 'Significant public incentives for rental development', 'Climate-resilient, institutional-quality assets', 'Experienced manager with a proven track record'],
  strategy: [
    { k: 'Build in prime markets', v: 'Purpose-built rental in well-located, supply-constrained markets close to transit and amenities — energy-efficient, future-proofed design that protects margins and value.' },
    { k: 'De-risked entitlement access', v: 'Assets transfer to the Growth Fund at cost once entitlements are secured. A $40M interest-free loan lowers the cost of capital.' },
    { k: 'Development value today, income tomorrow', v: 'Investors capture development value from entitlement through stabilization, then durable income once assets are leased.' },
  ],
}
const INCOME = {
  name: 'Heartwood Residential Income Trust', kind: 'Income strategy · Buy and hold', dot: '#2697AA',
  logo: '/assets/logos/HW_Income_Logo_Black.png', img: '/assets/imagery/HW_TOC_Building.png',
  pitch: 'Buys modern, efficient, stabilized assets already generating cash flow — at today’s reset pricing, with no legacy assets.',
  intro: 'HRIT seeks to build a diversified portfolio of modern, institutional-quality purpose-built rental communities in Canada’s high-growth, supply-constrained markets.',
  targets: [{ v: '8–10%', k: 'Target levered 5-year annualized return²' }, { v: '5–6%', k: 'Target annual distribution, paid monthly¹' }, { v: '40–50%', k: 'Target portfolio loan-to-value' }],
  footnote: '¹ On trading NAV; intended to commence 12 months following the first asset acquisition; primarily return of capital. ² Net, levered IRR over a five-year hold (net of fees, gross of tax), Series B Units. See offering memorandum.',
  delivers: ['Resilient monthly income', 'Long-term capital appreciation', 'Conservative capital structure', 'High-quality, inflation-resistant real estate', 'Attractive market timing at a cyclical entry point'],
  strategy: [
    { k: 'Modern, stabilized assets', v: 'Well-leased, institutional-quality multifamily properties that generate immediate income, with low near-term capital requirements.' },
    { k: 'No legacy assets', v: 'HRIT holds no assets from the prior cycle peak — every acquisition is made at today’s reset pricing.' },
    { k: 'Prudent leverage', v: '40–50% LTV, capped at 50% once Trust NAV exceeds $100M, using lower-cost CMHC-insured financing.' },
  ],
}
const FUNDS = [
  { ...GROWTH, color: '#617954', short: 'Growth Trust', whyLabel: 'Why growth', why: 'Taking on development lets us design every building for resilience from the start.', r: 'investment/growth' },
  { ...INCOME, color: '#2697AA', short: 'Income Trust', whyLabel: 'Why income', why: 'What we learn building and operating efficient, healthy buildings, we apply to every acquisition.', r: 'investment/income' },
]

const VEHICLES = [
  {
    slug: 'funds', title: 'Our funds', sub: 'Commingled vehicles', runtime: '2 min', cta: 'Explore our funds', poster: '/assets/project-renders/HW_Render_3385-Lawrence.jpg',
    for: ['Private wealth', 'Wealth managers', 'Institutions', 'Family offices'],
    items: [{ k: 'Heartwood Residential Growth Trust', v: 'Build-to-hold purpose-built rental' }, { k: 'Heartwood Residential Income Trust', v: 'Modern, stabilized, income-producing assets' }],
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
  { no: '01', title: 'Built-in inflation protection', body: 'Residential rents can reset every year, rather than being locked into the long fixed escalations typical of office, industrial and retail leases.' },
  { no: '02', title: 'Structural demand', body: 'Canada needs an additional 3.5 million homes by 2030 to restore affordability. That shortage should sustain occupancy and rental growth for years to come.' },
  { no: '03', title: 'A shortage of durable buildings', body: 'There is too little well-built purpose-built rental — and growing demand for beautiful, healthy, community-centred buildings. That is what we build and buy.' },
]
const MARKET_GROUPS = [
  { country: 'Canada', mark: 'MAPLE LEAF', cities: ['Greater Toronto Area', 'Ottawa', 'Montreal', 'Halifax', 'Vancouver', 'Calgary', 'Edmonton'] },
  { country: 'United States', mark: 'STAR', cities: ['Seattle', 'Bay Area', 'San Diego', 'Boston', 'Charlotte', 'Durham'] },
]
const PROOF = [
  { big: '65%', label: 'Typical reduction in energy use intensity for Growth Trust buildings vs. a code-minimum equivalent' },
  { big: '1.5°C', label: 'Portfolio carbon intensity targeted to align with a 1.5°C pathway (CRREM)' },
  { big: 'Zero Carbon', label: 'Growth Trust prioritizes CaGBC Zero Carbon Building–certified projects' },
  { big: 'NZAM · PRI · GRESB', label: 'Net Zero Asset Managers signatory, PRI signatory and annual GRESB reporting' },
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
              <Hv key={f.r} as="button" onClick={() => go(f.r)} s="text-align:left;cursor:pointer;background:var(--hw-white);border:1.5px solid var(--hw-black);color:var(--hw-black);padding:0;display:flex;flex-direction:column" h="background:var(--hw-cool-grey)">
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

function Overview({ go, showSustainability }) {
  const [instSent, setInstSent] = useState(false)
  const market = HW_DATA.market.map((m, i, arr) => {
    const last = i === arr.length - 1
    return {
      ...m,
      bg: last ? 'var(--hw-terracotta)' : 'transparent',
      fg: last ? 'var(--hw-white)' : 'var(--hw-black)',
      ic: last ? '#F9F9F9' : '#BC532D',
      rule: last ? 'rgba(249,249,249,.6)' : 'var(--hw-black)',
      pl: last ? 'clamp(20px,2.4vw,36px)' : '0',
    }
  })

  return (
    <>
      <section data-screen-label="Investment — Hero" style={sx("position:relative;overflow:hidden;min-height:clamp(520px,54vw,800px);background:var(--hw-brown) url('/assets/project-renders/HW_Render_360-Kennedy-Lane.jpg') center/cover no-repeat;display:flex;align-items:flex-end")}>
        <div style={sx('position:absolute;inset:0;background:var(--overlay-brown)')} />
        <div style={sx('position:absolute;top:0;bottom:0;right:0;width:min(100%,max(46%,380px));pointer-events:none')}>
          <DotField preset="icons" icons="MONEY|EQUITY|DEBT|RETURNS" iconSize=".6" interval="6300" color="#B28951" />
        </div>
        <div style={sx('position:relative;padding:clamp(32px,4vw,56px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:20px;color:var(--hw-white)')}>
          <p style={sx(`margin:0;${MONO};font-size:clamp(14px,1.2vw,18px)`)}>Investments</p>
          <h1 style={sx('margin:0;max-width:980px;font-family:var(--font-display);font-weight:500;font-size:clamp(36px,4.8vw,76px);line-height:1;letter-spacing:-.02em;text-wrap:balance')}>Two strategies. Many ways to invest alongside us.</h1>
          <p style={sx('margin:0;max-width:640px;font-size:clamp(18px,1.5vw,22px);line-height:1.5;text-wrap:pretty')}>
            We focus on the living sector — building and owning sustainable, healthy, beautiful rental housing that generates accretive risk-adjusted returns.
          </p>
        </div>
      </section>

      <section data-screen-label="Investment — Why living" style={sx(`${RULED_SECTION};padding-bottom:0`)}>
        <div style={sx('display:flex;flex-direction:column;gap:20px')}>
          <p style={sx(EYEBROW)}>Why living</p>
          <h2 style={sx(H2)}>Why we focus on rental housing.</h2>
        </div>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:clamp(20px,3vw,48px)')}>
          {WHY_LIVING.map((w) => (
            <div key={w.no} style={sx('display:flex;flex-direction:column;gap:12px;border-top:1px solid var(--hw-black);padding-top:18px')}>
              <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:clamp(36px,3.4vw,52px);line-height:1;color:var(--hw-terracotta)')}>{w.no}</span>
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(20px,1.8vw,26px);line-height:1.15')}>{w.title}</span>
              <p style={sx('margin:0;font-size:18px;line-height:1.5;text-wrap:pretty')}>{w.body}</p>
            </div>
          ))}
        </div>
        <p style={sx('margin:0;font-family:var(--font-subhead);font-size:12px;text-transform:uppercase')}>Sources: CMHC, Canada’s Housing Supply Shortages; National Multifamily Housing Council.</p>
      </section>

      <section data-screen-label="Investment — Why now" style={sx(RULED_SECTION)}>
        <div style={sx(SPLIT_HEAD)}>
          <div style={sx('display:flex;flex-direction:column;gap:20px')}>
            <p style={sx(EYEBROW)}>Why now</p>
            <h2 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(40px,5vw,76px);line-height:1;letter-spacing:-.02em')}>
              Rising demand.
              <br />
              Shrinking supply.
            </h2>
          </div>
          <p style={sx(LEDE)}>
            In Canada and the United States, more people need rental homes while new construction falls. Even after a record wave of completions, vacancy remains low. That points to a shortage that is structural, not cyclical.
          </p>
        </div>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));border-top:1px solid var(--hw-black)')}>
          {market.map((m) => (
            <div key={m.theme} style={sx(`position:relative;display:flex;flex-direction:column;gap:18px;padding:clamp(24px,3vw,36px) clamp(20px,2.4vw,36px) clamp(24px,3vw,36px) 0;background:${m.bg};color:${m.fg};padding-left:${m.pl}`)}>
              <div style={sx('display:flex;justify-content:space-between;align-items:flex-start;gap:12px')}>
                <DotIcon name={m.icon} color={m.ic} size={44} />
                <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:clamp(36px,3.6vw,56px);line-height:.8;color:var(--hw-terracotta)')}>{m.op}</span>
              </div>
              <div style={sx('display:flex;flex-direction:column;gap:8px')}>
                <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(26px,2.4vw,36px);line-height:1.05')}>{m.theme}</span>
                <p style={sx('margin:0;font-size:18px;line-height:1.45;max-width:320px;text-wrap:pretty')}>{m.note}</p>
              </div>
              <div style={sx(`display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:16px;border-top:1.5px solid ${m.rule};padding-top:18px;margin-top:auto`)}>
                {[
                  ['Canada', m.ca],
                  ['United States', m.us],
                ].map(([label, d]) => (
                  <div key={label} style={sx('display:flex;flex-direction:column;gap:6px')}>
                    <span style={sx(`${MONO};font-size:12px`)}>{label}</span>
                    <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(36px,3.6vw,56px);line-height:1;letter-spacing:-.02em')}>{d.big}</span>
                    <span style={sx('font-size:18px;line-height:1.4')}>{d.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p style={sx('margin:0;font-size:14px;line-height:1.4')}>
          Sources: Statistics Canada; CMHC 2025 Rental Market Report; Urbanation 2025; Realtor.com 2026 Housing Supply Gap Report; CoStar, Q1 2026; CBRE, Q1 2026.
        </p>
      </section>

      <section data-screen-label="Investment — Where we invest" style={sx(RULED_SECTION)}>
        <div style={sx(SPLIT_HEAD)}>
          <div style={sx('display:flex;flex-direction:column;gap:20px')}>
            <p style={sx(EYEBROW)}>Where we invest</p>
            <h2 style={sx(H2)}>High-growth, supply-constrained North American markets.</h2>
          </div>
          <p style={sx(LEDE)}>
            Canada is our founding market, where the condo slowdown has deepened the shortage in cities already short on purpose-built rental. In the United States, we focus on select markets where durable demand meets a sharp decline in new apartment supply.
          </p>
        </div>
        <div style={sx('display:flex;flex-direction:column;gap:clamp(28px,3vw,40px)')}>
          {MARKET_GROUPS.map((g) => (
            <div key={g.country} style={sx('display:flex;flex-direction:column;gap:12px')}>
              <div style={sx('display:flex;flex-wrap:wrap;align-items:center;gap:6px 14px')}>
                <DotIcon name={g.mark} color="#BC532D" size={30} />
                <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.2vw,32px)')}>{g.country}</span>
              </div>
              <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));border-top:1px solid var(--hw-black)')}>
                {g.cities.map((c) => (
                  <span key={c} style={sx('padding:18px 16px 18px 0;border-bottom:1px solid var(--hw-black);font-family:var(--font-display);font-weight:500;font-size:clamp(20px,1.8vw,26px)')}>{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section data-screen-label="Investment — Ways to invest" style={sx('background:var(--hw-cool-grey);padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:clamp(28px,3vw,48px)')}>
        <div style={sx('display:flex;flex-direction:column;gap:20px')}>
          <p style={sx(EYEBROW)}>Ways to invest</p>
          <h2 style={sx(H2)}>One platform, several vehicles.</h2>
          <p style={sx('margin:0;max-width:680px;font-size:clamp(17px,1.35vw,20px);line-height:1.5;text-wrap:pretty')}>
            Our strategies are broader than our funds. Investors can access them through commingled trusts, custom mandates or deal-level partnerships.
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

      {showSustainability && (
        <section data-screen-label="Investment — Sustainability proof" style={sx('padding:clamp(40px,5vw,64px) clamp(20px,3vw,40px);background:var(--hw-white);display:flex;flex-direction:column;gap:24px;border-top:1.5px solid var(--hw-terracotta)')}>
          <p style={sx(EYEBROW)}>Our environmental standards</p>
          <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:clamp(20px,3vw,40px)')}>
            {PROOF.map((p) => (
              <div key={p.big} style={sx('display:flex;flex-direction:column;gap:10px')}>
                <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:clamp(32px,3.4vw,52px);line-height:1;letter-spacing:-.02em;color:var(--hw-terracotta)')}>{p.big}</span>
                <p style={sx('margin:0;font-size:18px;line-height:1.45;text-wrap:pretty')}>{p.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section data-screen-label="Investment — Invest your way" style={sx('background:var(--hw-cool-grey);padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:clamp(28px,3vw,48px)')}>
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
    </>
  )
}

function Fund({ f }) {
  const formRef = useRef(null)
  const [sent, setSent] = useState(false)
  const scrollForm = () => {
    const el = formRef.current
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' })
  }
  return (
    <>
      <section data-screen-label="Fund — Hero" style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))')}>
        <div style={sx('position:relative;overflow:hidden;padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:28px;justify-content:flex-end;min-height:clamp(520px,48vw,720px)')}>
          <img src={f.logo} alt={f.name} style={sx('position:relative;width:min(100%,760px);height:auto;align-self:center;display:block;margin:auto 0;padding:clamp(24px,3vw,40px) 0')} />
          <h1 style={sx('position:relative;margin:0 auto;max-width:680px;text-align:center;font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.4vw,34px);line-height:1.15;letter-spacing:-.01em;text-wrap:pretty')}>{f.intro}</h1>
          <div style={sx('position:relative;display:flex;gap:14px;flex-wrap:wrap;justify-content:center')}>
            <Hv as="button" onClick={scrollForm} s={`padding:14px 22px;background:var(--hw-black);color:var(--hw-white);border:0;cursor:pointer;${MONO};font-size:14px`} h="background:var(--hw-teal)">
              Request the deck
            </Hv>
          </div>
        </div>
        <img src={f.img} alt="" style={sx('width:100%;height:100%;min-height:420px;object-fit:cover;display:block;background:var(--hw-brown)')} />
      </section>

      <section data-screen-label="Fund — Targets" style={sx('background:var(--hw-white);color:var(--hw-black);padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(32px,4vw,72px);align-items:stretch')}>
        <div style={sx('display:flex;flex-direction:column;gap:clamp(20px,2.4vw,32px)')}>
          <p style={sx(`margin:0;${MONO};font-size:clamp(14px,1.2vw,18px);color:var(--hw-teal)`)}>Target investment metrics</p>
          <div style={sx('display:flex;flex-direction:column')}>
            {f.targets.map((t) => (
              <div key={t.k} style={sx('border-top:1px solid rgba(33,33,33,.5);padding:20px 0;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:20px;align-items:baseline')}>
                <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:clamp(44px,4.8vw,76px);line-height:1;letter-spacing:-.02em;color:var(--hw-terracotta)')}>{t.v}</span>
                <p style={sx('margin:0;font-size:18px;line-height:1.4')}>{t.k}</p>
              </div>
            ))}
          </div>
          <p style={sx('margin:0;font-family:var(--font-subhead);font-size:12px;text-transform:uppercase;color:var(--hw-black);max-width:640px;line-height:1.5')}>{f.footnote}</p>
        </div>
        <div style={sx('position:relative;min-height:clamp(320px,34vw,520px);pointer-events:none')}>
          <DotField key={f.name} preset="icons" icons="RETURNS|EQUITY|MONEY|HOUSE" iconSize=".7" interval="4200" color={f.dot} />
        </div>
      </section>

      <section style={sx('padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(32px,5vw,80px)')}>
        <div style={sx('display:flex;flex-direction:column;gap:18px')}>
          <p style={sx(EYEBROW)}>Designed to deliver</p>
          <div style={sx('display:flex;flex-direction:column')}>
            {f.delivers.map((v, i) => (
              <div key={v} style={sx('border-top:1px solid var(--hw-black);padding:16px 0;display:grid;grid-template-columns:48px minmax(0,1fr);gap:12px;font-size:20px;line-height:1.35')}>
                <span style={sx('font-family:var(--font-subhead);font-weight:500;color:var(--hw-terracotta)')}>{'0' + (i + 1)}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={sx('display:flex;flex-direction:column;gap:18px')}>
          <p style={sx(`margin:0;${MONO};font-size:clamp(14px,1.2vw,18px);color:var(--hw-landscape)`)}>Strategy</p>
          {f.strategy.map((s) => (
            <div key={s.k} style={sx('border-top:1px solid var(--hw-black);padding-top:16px;display:flex;flex-direction:column;gap:10px')}>
              <h3 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(22px,2vw,28px);line-height:1.15')}>{s.k}</h3>
              <p style={sx('margin:0;font-size:18px;line-height:1.5')}>{s.v}</p>
            </div>
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

function PageInvestment({ sub, go, showSustainability = true }) {
  const s = sub || 'overview'
  const veh = VEHICLES.find((v) => v.slug === s)
  return (
    <div style={sx('background:var(--hw-white);color:var(--hw-black);font-family:var(--font-body)')}>
      {veh && <Vehicle veh={veh} isFunds={s === 'funds'} go={go} />}
      {s === 'overview' && <Overview go={go} showSustainability={showSustainability} />}
      {(s === 'growth' || s === 'income') && <Fund key={s} f={s === 'income' ? INCOME : GROWTH} />}
    </div>
  )
}

export default PageInvestment
