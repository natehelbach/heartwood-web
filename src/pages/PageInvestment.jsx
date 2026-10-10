import { useEffect, useRef, useState } from 'react'
import { Hv, sx, RULE_BG, HubspotNote } from '../design/ui.jsx'
import DotIcon from '../design/DotIcon.jsx'
import { StandardLogos } from './PageAbout.jsx'
import { GROWTH, INCOME, VEHICLES, TRUSTS } from '../design/investment-data.js'

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
const COMPARE_ROW = 'display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1fr) minmax(0,1fr);gap:24px'
const CH_SECTION = 'padding:clamp(56px,6vw,80px) 0;border-top:1.5px solid var(--hw-terracotta);display:flex;flex-direction:column;gap:clamp(24px,2.6vw,32px);scroll-margin-top:110px'
const CH_H2 = 'margin:0;max-width:880px;font-family:var(--font-display);font-weight:500;font-size:clamp(32px,3.6vw,52px);line-height:1.04;letter-spacing:-.025em;text-wrap:balance'
const CH_P = 'margin:0;max-width:720px;font-size:clamp(18px,1.4vw,20px);line-height:1.55;text-wrap:pretty'
const CH_ROW_K = 'font-family:var(--font-display);font-weight:500;font-size:clamp(20px,1.7vw,24px);line-height:1.2;letter-spacing:-.01em'
const TRUST_LABEL = `${MONO};font-size:12px;letter-spacing:.02em;color:var(--hw-terracotta);padding-top:8px`
const FIELD = 'padding:12px 14px;border:1px solid var(--hw-black);background:var(--hw-white);font-family:var(--font-subhead);font-size:14px;color:var(--hw-black);border-radius:0'

// The two trusts, as shown on Investments › Our funds: strategy data plus the per-trust card and key terms.
const FUNDS = [
  { ...GROWTH, name: 'Heartwood Residential Growth Trust', logoW: '/assets/logos/HW_Growth_Logo_White.png', color: 'var(--hw-cool-grey)', short: 'Growth Trust', r: 'investment/growth', ...TRUSTS[0] },
  { ...INCOME, name: 'Heartwood Residential Income Trust', logoW: '/assets/logos/HW_Income_Logo_White.png', color: 'var(--hw-hemlock)', short: 'Income Trust', r: 'investment/income', ...TRUSTS[1] },
]
const TERMS_DISCLAIMER = 'The key terms above are a summary only, are provided for information purposes and are qualified in their entirety by the offering memorandum, declaration of trust and subscription documents of the applicable trust, which prevail in the event of any inconsistency. This is not an offer to sell, or a solicitation of an offer to buy, any securities. Units are offered only to eligible investors in reliance on exemptions from the prospectus requirements of applicable Canadian securities laws, and only by way of the offering memorandum. Minimum investments, eligibility, fees, distributions, redemption rights, leverage limits and other terms vary by series and jurisdiction and are subject to change without notice. Distributions are not guaranteed, may be reduced or suspended, and may include a return of capital, which reduces the adjusted cost base of units. Redemptions may be subject to notice periods, early-redemption fees, monthly or aggregate limits, and suspension in certain circumstances. Target leverage and other targets reflect current intentions only and are not guaranteed. An investment in the trusts is speculative, involves a high degree of risk, including the possible loss of the entire investment, and is suitable only for investors who can bear that risk and do not require liquidity. Past performance is not indicative of future results. Investors should read the offering memorandum, including its risk factors, and consult their own financial, legal and tax advisors before investing.'

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
    word: 'Growth', color: 'var(--hw-cool-grey)', ring: '/assets/logos/HW_Growth_Ring_Black.png', h: 'Build to Hold.',
    lead: 'We develop energy-efficient, community-centric, healthy residential communities in supply-constrained markets.',
    points: [
      { k: 'Risk reduction', v: 'Our vertically integrated platform lets us underwrite hard and soft costs more accurately, so actual results vary less from our financial assumptions.' },
      { k: 'Value creation', v: 'Construction and lease-up create significant value. We take a site and build its highest and best use, which then delivers long-term capital appreciation and stabilized income.' },
      { k: 'Performance efficiency', v: 'Energy efficiency is more than a set of climate benchmarks. We view it as a financial opportunity to drive asset value and performance.' },
    ],
    access: 'Heartwood Residential Growth Trust, joint ventures, Co-GP, co-investments and separately managed accounts.', r: 'investment/growth',
  },
  {
    word: 'Income', color: 'var(--hw-hemlock)', ring: '/assets/logos/HW_Income_Ring_Black.png', h: 'Buy to Hold.',
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

function NumList({ items }) {
  return (
    <div style={sx('display:flex;flex-direction:column;gap:14px')}>
      {items.map((v, i) => (
        <div key={v} style={sx('display:grid;grid-template-columns:36px minmax(0,1fr);gap:12px;align-items:baseline')}>
          <span style={sx('font-family:var(--font-mono);font-size:18px;color:var(--hw-terracotta)')}>{'0' + (i + 1)}</span>
          <span style={sx('font-size:18px;line-height:1.45;text-wrap:pretty')}>{v}</span>
        </div>
      ))}
    </div>
  )
}

function Vehicle({ veh, isFunds, go }) {
  const rows = isFunds ? [] : veh.rows
  return (
    <>
      <section data-screen-label="Investment — Vehicle hero" style={sx(`position:relative;min-height:clamp(480px,44vw,720px);padding:clamp(40px,5vw,72px) clamp(20px,3vw,40px);box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between;gap:clamp(40px,6vw,96px);background:var(--hw-brown) url('${veh.hero}') ${veh.heroPos}/cover no-repeat;color:${veh.heroFg}`)}>
        <div style={sx(`position:absolute;inset:0;background:${veh.heroOv}`)} />
        <Hv as="button" onClick={() => go('investment/overview')} s={`position:relative;align-self:flex-start;background:none;border:0;padding:0;cursor:pointer;${MONO};font-size:13px;color:inherit`} h="color:var(--hw-terracotta)">
          ← Ways to invest
        </Hv>
        <div style={sx('position:relative;display:flex;flex-direction:column;gap:clamp(20px,2.4vw,32px);max-width:880px')}>
          <div style={sx('display:flex;flex-direction:column;gap:16px')}>
            <p style={sx(`margin:0;${MONO};font-size:clamp(18px,1.4vw,22px)`)}>{veh.sub}</p>
            <h1 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(44px,6vw,96px);line-height:1;letter-spacing:-.03em')}>{veh.title}</h1>
          </div>
          <p style={sx('margin:0;font-size:clamp(18px,1.4vw,21px);line-height:1.55;text-wrap:pretty;max-width:760px')}>{veh.intro}</p>
        </div>
      </section>

      {!isFunds && (
        <section data-screen-label="Investment — Vehicle film" style={sx('padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px) 0')}>
          <div style={sx(`position:relative;width:100%;aspect-ratio:16/9;background:#212121 url('${veh.poster}') center/cover no-repeat`)}>
            <div style={sx('position:absolute;inset:0;background:rgba(33,33,33,.25)')} />
            <div style={sx(`position:absolute;left:clamp(16px,2vw,32px);bottom:clamp(16px,2vw,32px);display:flex;align-items:center;gap:14px;padding:12px 18px 12px 12px;background:var(--hw-white);${MONO};font-size:14px`)}>
              <span style={sx('width:40px;height:40px;border-radius:50%;background:var(--hw-terracotta);color:var(--hw-white);display:flex;align-items:center;justify-content:center;padding-left:3px')}>▶</span>
              Watch the film · {veh.runtime}
            </div>
            <span style={sx(`position:absolute;top:16px;right:16px;padding:6px 10px;border:1.5px dashed var(--hw-white);color:var(--hw-white);${MONO};font-size:12px`)}>Video placeholder</span>
          </div>
        </section>
      )}

      {isFunds && (
        <section data-screen-label="Our funds — Trusts" style={sx('padding:clamp(40px,4vw,56px) clamp(20px,3vw,40px) clamp(48px,6vw,88px);border-top:1.5px solid var(--hw-terracotta);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,max(440px,calc(50% - 16px))),1fr));gap:clamp(48px,5vw,64px) clamp(12px,1.5vw,20px)')}>
          {FUNDS.map((f) => (
            <div key={f.r} style={sx('display:flex;flex-direction:column')}>
              <div style={sx(`background:${f.color};color:var(--hw-white);padding:clamp(32px,4vw,48px) clamp(24px,3vw,40px) clamp(24px,2.5vw,32px);display:flex;flex-direction:column;gap:12px`)}>
                <p style={sx(`margin:0;${MONO};font-size:14px`)}>{f.short} · {f.tag}</p>
                <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(72px,9vw,128px);line-height:.9;letter-spacing:-.03em')}>{f.big}</span>
              </div>
              <div style={sx(`position:relative;aspect-ratio:16/10;background:var(--hw-brown) url('${f.img}') ${f.pos}/cover no-repeat;display:flex;align-items:flex-end;padding:clamp(24px,3vw,40px)`)}>
                <div style={sx('position:absolute;inset:0;background:linear-gradient(to top,rgba(33,33,33,.6),rgba(33,33,33,0) 60%)')} />
                <img src={f.logoW} alt={f.name} style={sx('position:relative;width:100%;max-width:380px;height:auto;display:block')} />
              </div>
              <div style={sx('padding:44px 0 0;display:flex;flex-direction:column;gap:22px;flex:1')}>
                <p style={sx(`margin:0;${MONO};font-size:16px;color:var(--hw-terracotta)`)}>{f.kind}</p>
                <h2 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(30px,3vw,44px);line-height:1.05;letter-spacing:-.02em;text-wrap:balance')}>{f.name}</h2>
                <p style={sx('margin:0;font-size:19px;line-height:1.55;text-wrap:pretty')}>{f.intro}</p>
                <span style={sx(TRUST_LABEL)}>How it works</span>
                <NumList items={f.how} />
                <span style={sx(TRUST_LABEL)}>Designed to deliver</span>
                <NumList items={f.del} />
                <div style={sx('margin-top:auto;padding-top:8px;display:flex;flex-wrap:wrap;gap:12px')}>
                  <Hv as="button" onClick={() => go(f.r)} s={`padding:14px 22px;background:var(--hw-black);color:var(--hw-white);border:0;cursor:pointer;${MONO};font-size:14px`} h="background:var(--hw-terracotta)">
                    Explore the {f.word} strategy →
                  </Hv>
                  <Hv as="button" onClick={() => go('investment/meeting')} s={`padding:12.5px 20px;background:transparent;color:var(--hw-black);border:1.5px solid var(--hw-black);cursor:pointer;${MONO};font-size:14px`} h="background:var(--hw-black);color:var(--hw-white)">
                    Book a meeting
                  </Hv>
                </div>
              </div>
            </div>
          ))}
          <div style={sx('grid-column:1/-1;display:flex;flex-direction:column;gap:14px;padding-top:40px;border-top:1.5px solid var(--hw-terracotta)')}>
            <span style={sx(TRUST_LABEL.replace(';padding-top:8px', ''))}>Key terms</span>
            <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,max(440px,calc(50% - 32px))),1fr));gap:0 clamp(32px,4vw,48px)')}>
              {FUNDS.map((f) => (
                <div key={f.r} style={sx('display:flex;flex-direction:column;gap:10px')}>
                  <span style={sx(`${MONO};font-size:12px`)}>{f.short}</span>
                  <div style={sx('display:flex;flex-direction:column')}>
                    {f.terms.map(([k, v]) => (
                      <div key={k} style={sx('display:flex;flex-direction:column;gap:4px;padding:14px 0;border-top:1px solid var(--hw-black)')}>
                        <span style={sx(`${MONO};font-size:12px`)}>{k}</span>
                        <span style={sx('font-size:18px;line-height:1.35')}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p style={sx('margin:0;max-width:1100px;font-size:13px;line-height:1.55;text-wrap:pretty')}>{TERMS_DISCLAIMER}</p>
          </div>
        </section>
      )}

      {!isFunds && (
        <section data-screen-label="Investment — Vehicle options" style={sx(`padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:28px;background:${RULE_BG}`)}>
          <div style={sx('height:1.5px;background:var(--hw-terracotta)')} />
          <h2 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(30px,3.2vw,46px);line-height:1.05')}>{veh.heading}</h2>
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
      )}

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
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(28px,4vw,64px);align-items:center')}>
          <div style={sx('display:flex;flex-direction:column;gap:20px')}>
            <p style={sx(EYEBROW)}>Ways to invest</p>
            <h2 style={sx(H2)}>One platform, several vehicles.</h2>
            <p style={sx('margin:0;max-width:680px;font-size:clamp(17px,1.35vw,20px);line-height:1.5;text-wrap:pretty')}>
              Our strategies are broader than our funds. Investors can access them through commingled trusts, specific mandates or deal-level partnerships.
            </p>
          </div>
          <div style={sx("aspect-ratio:4/3;background:var(--hw-cool-grey) url('/assets/photography/HW_MassTimber_Coffee-Table.jpg') center 55%/cover no-repeat")} />
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

function Chapter({ id, n, label, h, children }) {
  return (
    <section data-chapter={id} data-screen-label={`Strategy — ${id}`} style={sx(CH_SECTION)}>
      <div style={sx('display:flex;gap:16px;align-items:baseline')}>
        <span style={sx(`${MONO};font-size:15px;color:var(--hw-terracotta)`)}>{n}</span>
        <p style={sx(`margin:0;${MONO};font-size:clamp(16px,1.3vw,20px);color:var(--hw-black)`)}>{label}</p>
      </div>
      {h && <h2 style={sx(CH_H2)}>{h}</h2>}
      {children}
    </section>
  )
}

function KeyRows({ items, k = 'k', v = 'v' }) {
  return (
    <div style={sx('display:flex;flex-direction:column;border-bottom:1px solid var(--hw-black)')}>
      {items.map((it) => (
        <div key={it[k]} style={sx('display:flex;flex-wrap:wrap;gap:8px 32px;padding:20px 0;border-top:1px solid var(--hw-black)')}>
          <span style={sx(`${CH_ROW_K};flex:0 0 min(100%,240px)`)}>{it[k]}</span>
          <p style={sx(`${CH_P};font-size:18px;flex:1 1 300px`)}>{it[v]}</p>
        </div>
      ))}
    </div>
  )
}

function Fund({ f, go }) {
  const formRef = useRef(null)
  const wrapRef = useRef(null)
  const [sent, setSent] = useState(false)
  const [chap, setChap] = useState('why')
  const [wide, setWide] = useState(true)

  const all = [['why', f.why.label], ['now', f.hasWhyNow && f.whyNow.label], ['path', f.path.label], ['buy', f.hasHowBuy && f.howBuy.label], ['own', f.own.label], ['del', 'What it delivers'], ['cmp', f.hasCompare && 'Comparison'], ['acc', 'Ways to access']].filter((x) => x[1])
  const cn = {}
  all.forEach(([k], i) => { cn[k] = '0' + (i + 1) })
  const jump = (k) => {
    const el = document.querySelector(`[data-chapter="${k}"]`)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' })
  }

  // Sidebar shows only when the chapter area is at least 900px wide; the active chapter follows scroll.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return undefined
    const ro = new ResizeObserver(() => setWide(el.clientWidth >= 900))
    ro.observe(el)
    const io = new IntersectionObserver((es) => {
      es.forEach((x) => { if (x.isIntersecting) setChap(x.target.getAttribute('data-chapter')) })
    }, { rootMargin: '-30% 0px -60% 0px' })
    el.querySelectorAll('[data-chapter]').forEach((s) => io.observe(s))
    return () => { ro.disconnect(); io.disconnect() }
  }, [f])

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
            <Hv as="button" onClick={() => go('investment/meeting')} s={`padding:14px 22px;background:var(--hw-white);color:var(--hw-black);border:0;cursor:pointer;${MONO};font-size:14px`} h="background:var(--hw-cool-grey)">
              Book a meeting
            </Hv>
          </div>
        </div>
      </section>

      <div ref={wrapRef} style={sx(`display:grid;grid-template-columns:${wide ? 'minmax(0,220px) minmax(0,1fr)' : 'minmax(0,1fr)'};gap:clamp(32px,5vw,72px);padding:0 clamp(20px,3vw,40px) clamp(40px,5vw,72px)`)}>
        {wide && (
          <nav style={sx('position:sticky;top:110px;align-self:start;padding-top:clamp(56px,6vw,80px);display:flex;flex-direction:column')}>
            {all.map(([k, l]) => (
              <Hv key={k} as="button" onClick={() => jump(k)} s={`display:grid;grid-template-columns:32px minmax(0,1fr);gap:6px;padding:12px 0;background:none;border:0;border-top:1px solid rgba(33,33,33,.25);text-align:left;cursor:pointer;color:var(--hw-black);${MONO};font-size:13px;line-height:1.3;opacity:${chap === k ? '1' : '.45'}`} h="opacity:1">
                <span style={sx('color:var(--hw-terracotta)')}>{cn[k]}</span>
                <span>{l}</span>
              </Hv>
            ))}
          </nav>
        )}
        <div style={sx('min-width:0')}>
          <Chapter id="why" n={cn.why} label={f.why.label} h={f.why.h}>
            <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:clamp(24px,3vw,40px);align-items:stretch')}>
              <div style={sx('display:flex;flex-direction:column;gap:20px')}>
                {f.why.p.map((p) => (
                  <p key={p} style={sx(CH_P)}>{p}</p>
                ))}
              </div>
              <figure style={sx('margin:0;padding:clamp(28px,3vw,40px);background:var(--hw-terracotta);color:var(--hw-white);display:flex;flex-direction:column;gap:20px;justify-content:flex-start;align-self:start')}>
                <blockquote style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.2vw,32px);line-height:1.2;letter-spacing:-.01em;text-wrap:pretty')}>“{f.why.quote}”</blockquote>
                <figcaption style={sx(`${MONO};font-size:13px`)}>{f.why.by}</figcaption>
              </figure>
            </div>
          </Chapter>

          {f.hasWhyNow && (
            <Chapter id="now" n={cn.now} label={f.whyNow.label} h={f.whyNow.h}>
              <KeyRows items={f.whyNow.items} />
            </Chapter>
          )}

          <Chapter id="path" n={cn.path} label={f.path.label} h={f.path.h}>
            <div style={sx('display:flex;flex-direction:column;border-bottom:1px solid var(--hw-black)')}>
              {f.path.steps.map((s) => (
                <div key={s.n} style={sx('display:flex;flex-wrap:wrap;gap:12px 24px;padding:22px 0;border-top:1px solid var(--hw-black)')}>
                  <span style={sx('flex:0 0 60px;font-family:var(--font-display);font-weight:500;font-size:clamp(32px,3vw,40px);line-height:1;color:var(--hw-terracotta)')}>{s.n}</span>
                  <div style={sx('flex:0 0 min(100%,220px);display:flex;flex-direction:column;gap:6px')}>
                    <span style={sx(`${MONO};font-size:13px`)}>{s.t}</span>
                    <span style={sx(CH_ROW_K)}>{s.k}</span>
                  </div>
                  <p style={sx(`${CH_P};font-size:18px;flex:1 1 260px`)}>{s.v}</p>
                </div>
              ))}
            </div>
          </Chapter>

          {f.hasHowBuy && (
            <Chapter id="buy" n={cn.buy} label={f.howBuy.label} h={f.howBuy.h}>
              <KeyRows items={f.howBuy.items} />
            </Chapter>
          )}

          <Chapter id="own" n={cn.own} label={f.own.label} h={f.own.h}>
            <p style={sx(CH_P)}>{f.own.p}</p>
            <KeyRows items={f.own.items} k="v" v="k" />
            {f.own.note && <p style={sx(`margin:0;${MONO};font-size:12px;line-height:1.5`)}>{f.own.note}</p>}
          </Chapter>

          <Chapter id="del" n={cn.del} label="What it delivers" h={f.deliversH}>
            <div style={sx('display:flex;flex-direction:column;border-bottom:1px solid var(--hw-black)')}>
              {f.delivers.map((v, i) => (
                <div key={v} style={sx('display:flex;gap:24px;padding:16px 0;border-top:1px solid var(--hw-black);align-items:baseline')}>
                  <span style={sx(`${MONO};font-size:13px;color:var(--hw-terracotta)`)}>{'0' + (i + 1)}</span>
                  <span style={sx(CH_ROW_K)}>{v}</span>
                </div>
              ))}
            </div>
          </Chapter>

          {f.hasCompare && (
            <Chapter id="cmp" n={cn.cmp} label="Comparison">
              <p style={sx(CH_P)}>{f.compareIntro}</p>
              <div style={sx('overflow-x:auto')}>
                <div style={sx('min-width:600px;display:flex;flex-direction:column;border-bottom:1px solid var(--hw-black)')}>
                  <div style={sx(`${COMPARE_ROW};padding-bottom:12px;${MONO};font-size:13px`)}>
                    <span />
                    <span>{f.compare.a}</span>
                    <span style={sx('color:var(--hw-terracotta)')}>{f.compare.b}</span>
                  </div>
                  {f.compare.rows.map((r) => (
                    <div key={r.k} style={sx(`${COMPARE_ROW};padding:18px 0;border-top:1px solid var(--hw-black)`)}>
                      <span style={sx(`${CH_ROW_K};font-size:20px`)}>{r.k}</span>
                      <span style={sx('font-size:17px;line-height:1.45')}>{r.a}</span>
                      <span style={sx('font-size:17px;line-height:1.45')}>{r.b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Chapter>
          )}

          <Chapter id="acc" n={cn.acc} label="Ways to access">
            <p style={sx(CH_P)}>{f.accessP}</p>
            <div style={sx('display:flex;flex-direction:column;border-bottom:1px solid var(--hw-black)')}>
              {f.access.map((a) => (
                <Hv key={a.k} as="button" onClick={() => go(a.r)} s="display:flex;flex-wrap:wrap;gap:8px 32px;padding:20px 0;border:0;border-top:1px solid var(--hw-black);background:none;text-align:left;cursor:pointer;color:var(--hw-black);font-family:var(--font-body)" h="color:var(--hw-terracotta)">
                  <span style={sx(`${CH_ROW_K};flex:0 0 min(100%,240px)`)}>{a.k} →</span>
                  <span style={sx('font-size:18px;line-height:1.5;flex:1 1 300px')}>{a.v}</span>
                </Hv>
              ))}
            </div>
            <span style={sx(`${MONO};font-size:13px;color:var(--hw-terracotta)`)}>{f.marketsLabel}</span>
            <div style={sx('display:flex;flex-wrap:wrap;gap:8px')}>
              {f.markets.map((m) => (
                <span key={m} style={sx(`padding:7px 11px;border:1px solid var(--hw-black);${MONO};font-size:13px`)}>{m}</span>
              ))}
            </div>
          </Chapter>
        </div>
      </div>

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
