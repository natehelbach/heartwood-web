import { useEffect, useRef, useState } from 'react'
import { Hv, sx } from '../design/ui.jsx'
import PagePlatform from './PagePlatform.jsx'

// Ported from ui_kits/website/PageHowWeBuild.dc.html (Development › How We Build).
// A sticky chapter index sits beside four sections; it hides below 900px (site.css).

const CHAPTERS = [
  ['approach', 'Our approach'],
  ['system', 'Our system'],
  ['execution', 'Our execution'],
  ['intelligence', 'Our intelligence'],
]

const PTS = [
  { n: '01', k: 'An owner’s perspective', v: 'Sites chosen for how they will perform beyond construction and lease-up.' },
  { n: '02', k: 'Quality as strategy', v: 'Building decisions made for lifetime operating cost and durability.' },
  { n: '03', k: 'One connected process', v: 'Investment, design, construction and operations working as one system.' },
  { n: '04', k: 'Future built', fb: true, v:'Designed for a 2050 climate, changing mobility and lower leverage.' },
]

const R = '/assets/project-renders/'
const I = R + 'innovation/'

const LIFE = [
  {
    k: 'Source',
    t: 'Data-Driven Site Sourcing',
    v: [
      'When we begin sourcing and underwriting new sites, we gather the latest data to understand the risks more holistically. We use a mapping platform a Geographic Information System (“GIS”) to check each site’s zoning and see what we can build there today, and what would require a rezoning through the entitlement process.',
      'The platform then places the site in its local market context and pulls in key data for that area: rents at nearby rental and condo buildings, CMHC market benchmarks, population and demographic trends, what renters can afford, how quickly new buildings have filled up, and which competing projects are in the pipeline. Together, this gives us a full picture of the risks before we commit to a deal.',
      'This holistic approach lets us target growth markets, and supply-constrained submarkets within them, where tenant demand and rent fundamentals support the building well beyond lease-up.',
    ],
    imgs: [{ src: '/assets/photography/HW_Photo_Market-Intelligence-Screen.png', f: 1 }],
  },
  {
    k: 'Design',
    t: 'System-based design',
    v: [
      'Traditional real estate developers treats every building as a new project. Each design starts from scratch, each site brings its own risks, and costs and timelines are hard to predict. Lessons from one building rarely carry over to the next.',
      'We take a product-based approach. Every building we develop uses the same system of standardized, flexible building components and follows the same development and design process. We adapt the system to each site instead of reinventing the building we build over and over again.',
      'This lowers investment risk, sharpens our cost estimates and speeds up construction. And because each building improves on the last, the value compounds across every site we develop, delivering more durable, well-built and efficient buildings.',
    ],
    imgs: [{ src: '/assets/photography/HW_Photo_Design-Review-Plans.png', f: 1 }],
  },
  {
    k: 'Build',
    t: 'Efficient Construction',
    v: [
      'Our product-based approach carries through from design into construction. Many of our construction methods aren’t new. What makes us more efficient is that we build every project using the same rigorous system, with one consistent sequence from start to finish.',
      'We also prefabricate parts of the building where it makes sense. Wall and envelope panels are built in a factory, where they are insulated, wrapped and fitted with windows before they arrive on site. On select projects, we use mass timber, which is made almost entirely of factory-built components. Building in controlled conditions means better quality, less waste, faster schedules and fewer weather delays.',
      'Because each project builds on the last, we carry forward what works and fix what doesn’t. We don’t make the same mistake twice, and the result is more resilient buildings that are delivered on time.',
    ],
    imgs: [{ src: I + 'HW_Innovation_Prefab-Envelope_1.jpg', f: 1 }, { src: I + 'HW_Innovation_Componentization-Site.png', f: 2, pos: '100% 100%' }],
  },
  {
    k: 'Leasing & Commissioning',
    t: 'Commissioned, then welcoming people home',
    v: [
      'Before the first resident moves in, every building system is tested and tuned against its design targets. Heating and cooling, ventilation, solar, metering and smart controls are verified to work together as designed, so the building performs from day one.',
      'Commissioning doesn’t stop at handover. Our management workflow includes continuous commissioning: we monitor systems as the building operates and adjust them over time to keep energy use, comfort and operating costs on target.',
      'Leasing is led by a team of property management professionals focused on hospitality, working from an office in the building. They welcome residents from the first tour and stay with them through every renewal, building a clear path to stabilized income.',
    ],
    cx: true,
  },
  {
    k: 'Operate',
    t: 'Homes people don’t want to leave',
    v: [
      'We build homes we would want our own families to live in. Every building is designed with intention: healthy materials, natural light and fresh air, in well-located neighborhoods where daily needs are within walking distance. The goal is simple: spaces that support the overall wellbeing of the people who live there.',
      'That same care shapes how we operate. We approach property management with intentional hospitality, treating residents as neighbors rather than tenants. When people feel at home, they stay longer, and our buildings see higher resident retention as a result.',
    ],
    imgs: [{ src: '/assets/photography/HW_MassTimber_Living-Room.jpg', f: 1 }],
  },
  {
    k: 'Report',
    t: 'Measured performance, reported',
    v: [
      'Every building is energy modelled before it is built. Each project’s model sets targets for energy use, heating demand, solar production and carbon emissions, and we track the building against them for its life.',
      'Once a building is operating, our proprietary data platform and on-site metering continuously track electricity, gas and water use. Connected building automation systems send live data from equipment such as air handlers and pumps, so we can catch faults early, plan maintenance and understand each building’s resilience to extreme weather.',
      'Investors see the results in every quarterly report. Alongside the financial statements, our Responsible Investing section, based on the Canadian Sustainability Disclosure Standards, reports each project’s targeted emissions, energy use, heating demand and solar production, its alignment with the CRREM 1.5°C pathway, and the share of units addressing core housing need. The Growth Trust also reports to GRESB each year.',
    ],
    rp: true,
  },
]

// Intelligence infographic: data in (top row) flows through one data foundation into decisions out
// (bottom row). <hw-intel-flow> draws the dots over the [data-zone] boxes inside [data-intel].
const INTEL_IN = ['Financial models', 'Construction budgets', 'Market & census data', 'Building operations', 'Energy reporting']
const INTEL_OUT = ['Market intelligence', 'Cost intelligence', 'Portfolio analytics', 'Building performance', 'Energy benchmarking']
const INTEL_LABEL = 'font-family:var(--font-subhead);font-weight:500;font-size:clamp(10px,1vw,12px);text-transform:uppercase;text-align:center;line-height:1.3;padding:0 4px'

// Data panels shown in place of an image for Leasing & Commissioning (cx) and Report (rp).
const PANEL = 'border:1.5px solid var(--hw-black);background:var(--hw-white);display:flex;flex-direction:column'
const PANEL_HEAD = 'font-family:var(--font-subhead);font-weight:500;font-size:13px;text-transform:uppercase'
const PANEL_BIG = 'font-family:var(--font-display);font-weight:500;font-size:28px;letter-spacing:-.02em;line-height:1'
const PANEL_UNIT = 'font-family:var(--font-body);font-size:13px;letter-spacing:0'
const PANEL_ROW = 'display:flex;justify-content:space-between;align-items:baseline;gap:12px'
const PANEL_TRACK = 'position:relative;height:10px;background:var(--hw-cool-grey)'
const PANEL_STATS = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))'
const STAT = 'padding:16px 20px;display:flex;flex-direction:column;gap:4px'
const STAT_N = 'font-family:var(--font-display);font-weight:500;font-size:24px;letter-spacing:-.02em'
const STAT_T = 'font-size:13px;line-height:1.4'

const CX_BARS = [
  ['Heating demand (TEDI)', '18', 'kWh/m²/yr', '15%', 'Reference building 122 · 85% below'],
  ['Energy use (EUI)', '69', 'kWh/m²/yr', '31%', 'Reference building 222 · 69% below'],
]
const CX_SPLIT = [
  [27, 'background:var(--hw-black)', 'Plug loads 27%'],
  [20, 'background:var(--hw-terracotta)', 'Hot water 20%'],
  [20, 'background:var(--hw-teal)', 'Ventilation 20%'],
  [15, 'background:var(--hw-hemlock)', 'Lighting 15%'],
  [10, 'background:var(--hw-cool-grey)', 'Heating 10%'],
  [8, 'background:var(--hw-white);border:1px solid var(--hw-black)', 'Cooling 8%'],
]
const CX_STATS = [
  ['0.12', 'Air leakage at 5 Pa. Code default is 0.25.', 'L/s·m²'],
  ['87%', 'Heat recovered by the ventilation system.'],
  ['22%', 'Of annual energy use produced by rooftop solar.'],
]
const RP_BARS = [
  ['Energy use (EUI)', '70', 'vs. 286 kWh/m²/yr', '24.5%'],
  ['Operating emissions', '3.6', 'vs. 26.6 kgCO₂e/m²/yr', '13.5%'],
]
const RP_SOLAR = [['’26', '16.4%'], ['’27', '20.4%'], ['’28', '48.2%'], ['’29', '65.8%'], ['’30', '87.3%'], ['’31', '90.4%'], ['’32', '96.7%'], ['’33', '96.7%']]
const RP_STATS = [
  ['0', 'On-site combustion emissions. Every project is all-electric.'],
  ['246', 'Embodied carbon, kgCO₂e/m². A typical new mid-rise is 500.'],
  ['20–30%', 'Of units at non-market rents to address core housing need.'],
]

function PanelStats({ stats }) {
  return (
    <div style={sx(PANEL_STATS)}>
      {stats.map(([n, t, u], i) => (
        <div key={n} style={sx(i < stats.length - 1 ? `${STAT};border-right:1px solid var(--hw-black)` : STAT)}>
          <span style={sx(STAT_N)}>{n}{u && <> <span style={sx(PANEL_UNIT)}>{u}</span></>}</span>
          <span style={sx(STAT_T)}>{t}</span>
        </div>
      ))}
    </div>
  )
}

function CommissioningPanel() {
  return (
    <div data-screen-label="How we build — Commissioning panel" style={sx(PANEL)}>
      <div style={sx('display:flex;justify-content:space-between;align-items:baseline;gap:8px 16px;flex-wrap:wrap;padding:16px 20px;border-bottom:1px solid var(--hw-black)')}>
        <span style={sx(PANEL_HEAD)}>Commissioning targets · Example project</span>
      </div>
      <div style={sx('padding:20px;display:flex;flex-direction:column;gap:18px;border-bottom:1px solid var(--hw-black)')}>
        {CX_BARS.map(([k, n, u, w, lim]) => (
          <div key={k} style={sx('display:flex;flex-direction:column;gap:8px')}>
            <div style={sx(PANEL_ROW)}>
              <span style={sx('font-size:15px')}>{k}</span>
              <span style={sx(PANEL_BIG)}>{n} <span style={sx(PANEL_UNIT)}>{u}</span></span>
            </div>
            <div style={sx(PANEL_TRACK)}>
              <div style={sx(`position:absolute;left:0;top:0;bottom:0;width:${w};background:var(--hw-teal)`)} />
              <div style={sx('position:absolute;left:100%;top:-4px;bottom:-4px;border-left:2px solid var(--hw-black);transform:translateX(-2px)')} />
            </div>
            <span style={sx('align-self:flex-end;font-family:var(--font-subhead);font-size:12px;text-transform:uppercase')}>{lim}</span>
          </div>
        ))}
      </div>
      <div style={sx('padding:20px;display:flex;flex-direction:column;gap:12px;border-bottom:1px solid var(--hw-black)')}>
        <span style={sx(PANEL_HEAD)}>Where the energy goes · 88 MWh/yr</span>
        <div style={sx('display:flex;height:28px;gap:2px')}>
          {CX_SPLIT.map(([f, bg, t]) => (
            <div key={t} style={sx(`flex:${f};${bg}`)} />
          ))}
        </div>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:6px 16px;font-size:13px')}>
          {CX_SPLIT.map(([, bg, t]) => (
            <span key={t} style={sx('display:flex;align-items:center;gap:8px')}>
              <span style={sx(`width:10px;height:10px;flex:none;${bg}`)} />
              {t}
            </span>
          ))}
        </div>
      </div>
      <PanelStats stats={CX_STATS} />
    </div>
  )
}

function ReportingPanel() {
  return (
    <div data-screen-label="How we build — Reporting panel" style={sx(PANEL)}>
      <div style={sx('padding:16px 20px;border-bottom:1px solid var(--hw-black)')}>
        <span style={sx(PANEL_HEAD)}>Portfolio targets</span>
      </div>
      <div style={sx('padding:20px;display:flex;flex-direction:column;gap:18px;border-bottom:1px solid var(--hw-black)')}>
        <span style={sx(PANEL_HEAD)}>Heartwood vs. average Ontario apartment</span>
        {RP_BARS.map(([k, n, u, w]) => (
          <div key={k} style={sx('display:flex;flex-direction:column;gap:6px')}>
            <div style={sx(PANEL_ROW)}>
              <span style={sx('font-size:15px')}>{k}</span>
              <span style={sx(PANEL_BIG)}>{n} <span style={sx(PANEL_UNIT)}>{u}</span></span>
            </div>
            <div style={sx(PANEL_TRACK)}>
              <div style={sx(`position:absolute;left:0;top:0;bottom:0;width:${w};background:var(--hw-teal)`)} />
            </div>
          </div>
        ))}
      </div>
      <div style={sx('padding:20px;display:flex;flex-direction:column;gap:12px;border-bottom:1px solid var(--hw-black)')}>
        <div style={sx('display:flex;justify-content:space-between;align-items:baseline;gap:8px 16px;flex-wrap:wrap')}>
          <span style={sx(PANEL_HEAD)}>Projected solar production · MWh/yr</span>
          <span style={sx('font-family:var(--font-display);font-weight:500;font-size:22px;letter-spacing:-.02em')}>148 → 870</span>
        </div>
        <div style={sx('display:flex;align-items:flex-end;gap:6px;height:110px;border-bottom:1px solid var(--hw-black)')}>
          {RP_SOLAR.map(([y, h]) => (
            <div key={y} style={sx(`flex:1;height:${h};background:var(--hw-terracotta)`)} />
          ))}
        </div>
        <div style={sx('display:flex;gap:6px;font-family:var(--font-subhead);font-size:11px;text-align:center')}>
          {RP_SOLAR.map(([y]) => (
            <span key={y} style={sx('flex:1')}>{y}</span>
          ))}
        </div>
      </div>
      <PanelStats stats={RP_STATS} />
    </div>
  )
}

const PROJECTS = [
  ['3385-lawrence', '3385 Lawrence Avenue East', 'HW_Render_3385-Lawrence.jpg'],
  ['360-kennedy', '360 Kennedy Lane', 'HW_Render_360-Kennedy-Lane.jpg'],
  ['353-sherbourne', '353 Sherbourne Street', 'HW_Render_353-Sherbourne.jpg'],
]

const EYEBROW = 'margin:0;font-family:var(--font-subhead);font-weight:500;font-size:15px;text-transform:uppercase;color:var(--hw-terracotta)'
const H2 = 'margin:0;max-width:820px;font-family:var(--font-display);font-weight:500;font-size:clamp(32px,3.6vw,46px);line-height:1.04;letter-spacing:-.02em;text-wrap:balance'
const BODY = 'margin:0;font-size:18px;line-height:1.55;text-wrap:pretty'
const SECTION = 'padding:clamp(56px,7vw,88px) 0;border-top:1.5px solid var(--hw-terracotta);display:flex;flex-direction:column;gap:32px'

function PageHowWeBuild({ go }) {
  const refs = { approach: useRef(null), system: useRef(null), execution: useRef(null), intelligence: useRef(null) }
  const [active, setActive] = useState('approach')

  // The active chapter is the last one whose top has passed 40% of the viewport.
  useEffect(() => {
    const onScroll = () => {
      let cur = 'approach'
      for (const [k] of CHAPTERS) {
        const el = refs[k].current
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = k
      }
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const jump = (k) => () => {
    const el = refs[k].current
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' })
  }

  return (
    <div style={sx('background:var(--hw-white);color:var(--hw-black);font-family:var(--font-body)')}>
      <section data-screen-label="How we build — Hero" style={sx("position:relative;min-height:clamp(420px,50vw,640px);display:flex;align-items:flex-end;padding:clamp(40px,5vw,56px) clamp(20px,3vw,40px);color:var(--hw-white);background:var(--hw-brown) url('/assets/photography/HW_Wood-Slice-Rings.jpg') 30% 40%/cover no-repeat")}>
        <div style={sx('position:absolute;inset:0;background:linear-gradient(180deg,rgba(33,33,33,0) 30%,rgba(33,33,33,.7))')} />
        <div style={sx('position:relative;display:flex;flex-direction:column;gap:18px;max-width:900px')}>
          <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase')}>Development · How we build</p>
          <h1 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(40px,6vw,76px);line-height:.98;letter-spacing:-.025em;text-wrap:balance')}>Designed to perform for decades.</h1>
        </div>
      </section>

      <div data-hwb-grid="" style={sx('display:grid;grid-template-columns:220px minmax(0,1fr);gap:48px;padding:0 clamp(20px,3vw,40px)')}>
        <nav data-hwb-nav="" aria-label="Chapters" style={sx('position:sticky;top:96px;align-self:start;padding-top:88px;display:flex;flex-direction:column;gap:14px')}>
          {CHAPTERS.map(([k, label], i) => (
            <Hv
              key={k}
              as="button"
              type="button"
              onClick={jump(k)}
              aria-current={active === k ? 'true' : undefined}
              s={`background:none;border:0;padding:0;cursor:pointer;text-align:left;color:var(--hw-black);font-family:var(--font-subhead);font-weight:500;font-size:13px;text-transform:uppercase;display:grid;grid-template-columns:30px 1fr;opacity:${active === k ? 1 : 0.45};transition:opacity .2s`}
              h="opacity:1"
            >
              <span style={sx('color:var(--hw-terracotta)')}>0{i + 1}</span>
              {label}
            </Hv>
          ))}
        </nav>
        <div style={sx('min-width:0')}>
          <section ref={refs.approach} data-screen-label="How we build — Our approach" style={sx('padding:clamp(56px,7vw,88px) 0;display:flex;flex-direction:column;gap:40px')}>
            <p style={sx(EYEBROW)}>01 · Our approach</p>
            <p style={sx('margin:0;max-width:860px;font-size:clamp(20px,1.8vw,24px);line-height:1.4;text-wrap:pretty')}>
              We don’t develop buildings simply to complete construction or reach lease-up and turn around to sell them as merchants. We develop assets we intend to own for the long term.
            </p>
            <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:28px 48px')}>
              <p style={sx(BODY)}>Every project starts with the long-term owner in mind. We select sites in supply-constrained markets where the fundamentals support decades of ownership, not just a successful lease-up.</p>
              <p style={sx(BODY)}>For us, building quality is an investment decision. Energy-efficient systems, durable materials, high-performing walls and windows, and componentization lower operating costs and keep a building competitive long after it opens.</p>
              <p style={sx(BODY)}>Because we stay involved beyond development, every decision is connected. Investment goals inform design. Design shapes construction. Construction determines operating costs. Operating performance drives asset value and investor returns.</p>
              <div style={sx("aspect-ratio:4/3;background:var(--hw-brown) url('/assets/photography/HW_Photo_517-W-Main_Work-Nook.jpg') center/cover no-repeat")} />
            </div>
            <div style={sx('display:flex;flex-direction:column;border-bottom:1px solid var(--hw-black)')}>
              {PTS.map((q) => (
                <div key={q.n} data-m-stack="" style={sx('display:grid;grid-template-columns:56px minmax(0,300px) minmax(0,1fr);gap:20px;padding:20px 0;border-top:1px solid var(--hw-black)')}>
                  <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:15px;color:var(--hw-terracotta)')}>{q.n}</span>
                  <div style={sx('display:flex;flex-direction:column;align-items:flex-start')}>
                    {q.fb ? (
                      <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:clamp(18px,1.6vw,22px);line-height:1.2;text-transform:uppercase')}>
                        Future
                        <br />
                        built.
                      </span>
                    ) : (
                      <span style={sx('font-family:var(--font-display);font-weight:500;font-size:24px;line-height:1.15;letter-spacing:-.01em')}>{q.k}</span>
                    )}
                  </div>
                  <span style={sx('font-size:18px;line-height:1.55')}>{q.v}</span>
                </div>
              ))}
            </div>
          </section>

          <section ref={refs.system} data-screen-label="How we build — Our system" style={sx(SECTION)}>
            <p style={sx(EYEBROW)}>02 · Our system</p>
            <h2 style={sx(H2)}>Every system earns its place.</h2>
            <p style={sx(`${BODY};max-width:720px`)}>Each one is chosen for how it lowers operating costs, improves comfort, creates community and keeps the building competitive.</p>
            <div style={sx('margin:0 calc(-1 * clamp(20px,3vw,40px))')}>
              <PagePlatform go={go} only="innovation" hideIntro />
            </div>
          </section>

          <section ref={refs.execution} data-screen-label="How we build — Our execution" style={sx(SECTION)}>
            <p style={sx(EYEBROW)}>03 · Our execution</p>
            <h2 style={sx(H2)}>One team, from sourcing to stabilization.</h2>
            <p style={sx(`${BODY};max-width:720px`)}>Our investment, design, construction and management teams work inside one data-driven development system. Every discipline draws on the same information and builds on the same process, so each stage strengthens the next, delivering resilient buildings that drive long-term investment returns.</p>
            <div style={sx('display:flex;flex-direction:column')}>
              {LIFE.map((l, i) => (
                <div key={l.k} data-proc-row="" style={sx('display:grid;grid-template-columns:56px minmax(0,1fr) minmax(0,1.15fr);gap:0 clamp(20px,3vw,40px)')}>
                  <div style={sx('position:relative;display:flex;justify-content:center')}>
                    <span style={sx('position:relative;z-index:1;width:44px;height:44px;border-radius:50%;background:var(--hw-black);color:var(--hw-white);display:flex;align-items:center;justify-content:center;font-family:var(--font-subhead);font-weight:500;font-size:14px')}>0{i + 1}</span>
                    <span style={sx('position:absolute;top:44px;bottom:0;left:50%;border-left:1.5px solid var(--hw-black)')} />
                  </div>
                  <div style={sx('display:flex;flex-direction:column;gap:12px;padding:6px 0 clamp(40px,5vw,64px)')}>
                    <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:13px;text-transform:uppercase;color:var(--hw-terracotta)')}>{l.k}</span>
                    <h3 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.4vw,32px);line-height:1.1;letter-spacing:-.015em;text-wrap:balance')}>{l.t}</h3>
                    {l.v.map((p) => (
                      <p key={p} style={sx('margin:0;font-size:17px;line-height:1.55;text-wrap:pretty')}>{p}</p>
                    ))}
                  </div>
                  <div data-proc-img="" style={sx('padding-bottom:clamp(40px,5vw,64px);min-width:0')}>
                    {l.imgs ? (
                      <div style={sx('display:flex;gap:6px;height:clamp(240px,24vw,340px)')}>
                        {l.imgs.map((im) => (
                          <div key={im.src} style={sx(`flex:${im.f};min-width:0;background:var(--hw-brown) url('${im.src}') ${im.pos || 'center'}/cover no-repeat`)} />
                        ))}
                      </div>
                    ) : l.cx ? (
                      <CommissioningPanel />
                    ) : l.rp ? (
                      <ReportingPanel />
                    ) : (
                      <div style={sx('height:clamp(240px,24vw,340px);border:1.5px dashed rgba(33,33,33,.45);display:flex;align-items:center;justify-content:center;padding:20px;text-align:center;font-family:var(--font-subhead);font-size:12px;text-transform:uppercase;line-height:1.5')}>{l.ph}</div>
                    )}
                  </div>
                </div>
              ))}
              <div data-proc-row="" style={sx('display:grid;grid-template-columns:56px minmax(0,1fr);gap:0 clamp(20px,3vw,40px);align-items:center')}>
                <div style={sx('display:flex;justify-content:center')}>
                  <span style={sx('width:44px;height:44px;border-radius:50%;border:1.5px solid var(--hw-terracotta);color:var(--hw-terracotta);display:flex;align-items:center;justify-content:center;font-size:20px')}>↺</span>
                </div>
                <p style={sx('margin:0;max-width:640px;font-size:17px;line-height:1.55;text-wrap:pretty')}>
                  <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:13px;text-transform:uppercase;color:var(--hw-terracotta)')}>Back to 01 · </span>
                  Reporting closes the loop. Energy use, rents and resident turnover flow into our intelligence platform and sharpen the next acquisition.
                </p>
              </div>
            </div>
          </section>

          <section ref={refs.intelligence} data-screen-label="How we build — Our intelligence" style={sx('padding:clamp(56px,7vw,88px) 0;border-top:1.5px solid var(--hw-terracotta);display:flex;flex-direction:column;gap:clamp(32px,4vw,48px)')}>
            <p style={sx(EYEBROW)}>04 · Our intelligence</p>
            <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:24px 48px;align-items:start')}>
              <h2 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(30px,3vw,38px);line-height:1.05;letter-spacing:-.02em;text-wrap:balance')}>Decisions made with the whole picture.</h2>
              <div style={sx('display:flex;flex-direction:column;gap:16px')}>
                <p style={sx(BODY)}>A decision is only as good as the data behind it. We built our own platform that brings financial models, construction budgets, market data and building operations into one connected foundation.</p>
                <p style={sx(BODY)}>Each project is defined once and recognized the same way everywhere, so a figure in a cost benchmark, a portfolio dashboard and a sustainability report all describe the same asset. Every number can be traced, trusted and compared.</p>
              </div>
            </div>
            <div data-intel="" data-screen-label="How we build — Intelligence infographic" style={sx('position:relative;display:flex;flex-direction:column')}>
              <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:12px;text-transform:uppercase;color:#555;margin-bottom:12px')}>Data in</span>
              <div style={sx('display:grid;grid-template-columns:repeat(5,minmax(0,1fr));padding-bottom:12px;border-bottom:1px solid var(--hw-black)')}>
                {INTEL_IN.map((t) => (
                  <span key={t} style={sx(INTEL_LABEL)}>{t}</span>
                ))}
              </div>
              <div data-zone="in" style={sx('height:clamp(80px,10vw,130px);margin:16px 0')} />
              <div data-zone="band" style={sx('position:relative;background:var(--hw-black);height:clamp(150px,17vw,220px);margin-top:clamp(24px,3vw,40px)')}>
                <span style={sx('position:absolute;left:clamp(16px,2vw,24px);top:clamp(14px,1.6vw,20px);font-family:var(--font-display);font-weight:500;font-size:clamp(20px,2vw,28px);letter-spacing:-.015em;color:var(--hw-white)')}>One data foundation</span>
              </div>
              <div data-zone="out" style={sx('height:clamp(90px,11vw,150px);margin:clamp(32px,4vw,48px) 0 16px')} />
              <div style={sx('display:grid;grid-template-columns:repeat(5,minmax(0,1fr));padding-top:12px;border-top:1px solid var(--hw-black)')}>
                {INTEL_OUT.map((t) => (
                  <span key={t} style={sx(INTEL_LABEL)}>{t}</span>
                ))}
              </div>
              <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:12px;text-transform:uppercase;color:#555;margin-top:12px;text-align:right')}>Decisions out</span>
              <hw-intel-flow icons="GRAPH|CONSTRUCTION|PEOPLE|THERMOSTAT|SOLAR ENERGY" style={sx('position:absolute;inset:0;z-index:1')} />
            </div>
          </section>
        </div>
      </div>

      <section data-screen-label="How we build — Projects" style={sx('margin:0 clamp(20px,3vw,40px);padding:56px 0 clamp(56px,7vw,88px);border-top:1.5px solid var(--hw-terracotta);display:flex;flex-direction:column;gap:32px')}>
        <div style={sx('display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap')}>
          <h2 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(30px,3vw,38px);line-height:1.05;letter-spacing:-.02em')}>See it in our projects.</h2>
          <Hv as="button" type="button" onClick={() => go('development/projects')} s="padding:14px 22px;border:0;background:var(--hw-black);color:var(--hw-white);font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase;cursor:pointer" h="background:var(--hw-terracotta)">
            View all projects →
          </Hv>
        </div>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:16px')}>
          {PROJECTS.map(([slug, name, img]) => (
            <Hv key={slug} as="button" type="button" onClick={() => go('properties/' + slug)} s="background:none;border:0;padding:0;cursor:pointer;text-align:left;color:var(--hw-black);display:flex;flex-direction:column;gap:10px" h="color:var(--hw-terracotta)">
              <div style={sx(`width:100%;aspect-ratio:4/3;background:var(--hw-brown) url('${R + img}') center/cover no-repeat`)} />
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:20px;line-height:1.15')}>{name}</span>
            </Hv>
          ))}
        </div>
      </section>
    </div>
  )
}

export default PageHowWeBuild
