import { useEffect, useRef, useState } from 'react'
import { Hv, sx } from '../design/ui.jsx'
import PagePlatform from './PagePlatform.jsx'

// Ported from ui_kits/website/PageHowWeBuild.dc.html (Development › How We Build).
// A sticky chapter index sits beside the sections; it hides below 900px (site.css).
// The design's showExecution tweak (off by default) adds an "Our execution" chapter; its
// foundation tweak picks how the data foundation band is drawn. Only 'Ports' (the default)
// and 'Black box' are ported; the other foundation variants are design explorations.

const chaptersFor = (showExecution) => [
  ['approach', 'Our approach'],
  ['intelligence', 'Our intelligence'],
  ['system', 'Our system'],
  ...(showExecution ? [['execution', 'Our execution']] : []),
]

const PTS = [
  { n: '01', k: 'An owner’s perspective', v: 'From site selection to design decisions, we focus on how each asset will perform beyond construction and lease-up.' },
  { n: '02', k: 'Quality as strategy', v: 'We treat quality as an investment strategy: durable buildings with low operating costs make for resilient, long-term investments.' },
  { n: '03', k: 'One connected process', v: 'Investment, design, construction oversight and operations working as one system.' },
  { n: '04', k: 'Future built', fb: true, v: 'Designed for 2050: climate-ready, enduring in value and desirable places to live for the long term.' },
]

const R = '/assets/project-renders/'

const STEPS = [
  { k: 'Source', t: 'Data-driven site sourcing', v: 'Zoning and local market data give us a full picture of risk before we commit to a site.' },
  { k: 'Design', t: 'System-based design', v: 'One system of repeatable building components, adapted to each site rather than reinvented.' },
  { k: 'Build', t: 'Efficient construction', v: 'Prefabricated envelopes and one consistent build sequence mean better quality and fewer delays.' },
  { k: 'Lease & Commission', t: 'Commissioned rigorously, verified continuously', v: 'Every building system is tested at handover, then monitored and tuned as the building operates to keep energy, comfort and costs on target.' },
  { k: 'Operate', t: 'Intentional hospitality', v: 'Healthy, well-located homes and hospitality-led management keep residents longer.' },
  { k: 'Report', t: 'Measured performance, reported', v: 'Every building is tracked against its energy model and reported to investors each quarter.' },
]

// Intelligence infographic: data in (top row) flows through one data foundation into decisions out
// (bottom row). <hw-intel-flow> draws the dots over the [data-zone] boxes inside [data-intel].
// Each input label takes the colour its dots keep on the way through (the dark-dots variant).
const INTEL_IN = [
  ['Financial models', 'var(--hw-terracotta)'],
  ['Construction budgets', 'var(--hw-teal)'],
  ['Market & census data', 'var(--hw-landscape)'],
  ['Building operations', 'var(--hw-hemlock)'],
  ['Energy reporting', 'var(--hw-cool-grey)'],
]
const INTEL_OUT = ['Market intelligence', 'Cost intelligence', 'Portfolio analytics', 'Building performance', 'Energy benchmarking']
const INTEL_LABEL = 'font-family:var(--font-subhead);font-weight:500;font-size:clamp(10px,1vw,12px);text-transform:uppercase;text-align:center;line-height:1.3;padding:0 4px'

// Foundation band, 'Ports' variant: five ports top and bottom line up with the five columns.
const PORT = 'justify-self:center;width:clamp(28px,3vw,40px);height:10px;background:var(--hw-black)'
const PORTS = 'position:absolute;left:0;right:0;display:grid;grid-template-columns:repeat(5,minmax(0,1fr))'

function FoundationBand({ variant }) {
  if (variant === 'Black box') {
    return (
      <div data-zone="band" style={sx('position:relative;background:var(--hw-black);height:clamp(150px,17vw,220px);margin-top:clamp(24px,3vw,40px)')}>
        <span style={sx('position:absolute;left:clamp(16px,2vw,24px);top:clamp(14px,1.6vw,20px);font-family:var(--font-display);font-weight:500;font-size:clamp(20px,2vw,28px);letter-spacing:-.015em;color:var(--hw-white)')}>One data foundation</span>
      </div>
    )
  }
  return (
    <div data-zone="band" data-screen-label="How we build — Foundation · Ports" style={sx('position:relative;height:clamp(130px,11vw,170px);margin-top:clamp(16px,2vw,28px);border:1.5px solid var(--hw-black);background:var(--hw-white);display:flex;align-items:center;justify-content:center')}>
      {['top:-1.5px', 'bottom:-1.5px'].map((edge) => (
        <div key={edge} style={sx(`${PORTS};${edge}`)}>
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} style={sx(PORT)} />
          ))}
        </div>
      ))}
      <span style={sx('position:relative;background:var(--hw-white);padding:6px 16px;font-family:var(--font-display);font-weight:500;font-size:clamp(28px,3.4vw,48px);letter-spacing:-.02em')}>One data foundation</span>
    </div>
  )
}

const PROJECTS = [
  ['3385-lawrence', '3385 Lawrence Avenue East', 'HW_Render_3385-Lawrence.jpg'],
  ['308-parkside', '308 Parkside Drive', '../photography/HW_Photo_308-Parkside_Townhomes-Day.jpg'],
  ['353-sherbourne', '353 Sherbourne Street', 'HW_Render_353-Sherbourne.jpg'],
]

const EYEBROW = 'margin:0;font-family:var(--font-subhead);font-weight:500;font-size:15px;text-transform:uppercase;color:var(--hw-terracotta)'
const H2 = 'margin:0;max-width:820px;font-family:var(--font-display);font-weight:500;font-size:clamp(32px,3.6vw,46px);line-height:1.04;letter-spacing:-.02em;text-wrap:balance'
const BODY = 'margin:0;font-size:18px;line-height:1.55;text-wrap:pretty'
const SECTION = 'padding:clamp(56px,7vw,88px) 0;border-top:1.5px solid var(--hw-terracotta);display:flex;flex-direction:column;gap:32px'

function PageHowWeBuild({ go, showExecution = false, foundation = 'Ports' }) {
  const CHAPTERS = chaptersFor(showExecution)
  const refs = { approach: useRef(null), intelligence: useRef(null), system: useRef(null), execution: useRef(null) }
  // The black box keeps light-blue dots in the band; every other foundation uses dark dots in the input colours.
  const darkDots = foundation !== 'Black box'
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
  }, [showExecution])

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
            <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(24px,3vw,48px);align-items:center')}>
              <p style={sx('margin:0;max-width:680px;font-size:clamp(20px,1.8vw,24px);line-height:1.4;text-wrap:pretty')}>
                We develop a new generation of purpose-built rental housing using modern methods of construction, such as mass timber and prefabricated facades. This lets us cost-effectively deliver energy-efficient, resilient homes that create long-term value for our investors and the people who live in them.
              </p>
              <div role="img" aria-label="Heartwood mass timber townhomes and courtyard" style={sx("min-height:360px;background:var(--hw-cool-grey) url('/assets/photography/HW_Photo_Timber-Townhomes-Courtyard.jpg') center/cover no-repeat")} />
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

          <section ref={refs.intelligence} data-screen-label="How we build — Our intelligence" style={sx('padding:clamp(56px,7vw,88px) 0;border-top:1.5px solid var(--hw-terracotta);display:flex;flex-direction:column;gap:clamp(32px,4vw,48px)')}>
            <p style={sx(EYEBROW)}>02 · Our intelligence</p>
            <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:24px 48px;align-items:start')}>
              <h2 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(30px,3vw,38px);line-height:1.05;letter-spacing:-.02em;text-wrap:balance')}>Decisions made with the whole picture.</h2>
              <div style={sx('display:flex;flex-direction:column;gap:16px')}>
                <p style={sx(BODY)}>Every decision is only as good as the data behind it. Our proprietary platform connects financial models, construction budgets, market data and building performance in one place, so every acquisition, design and operating decision draws on the whole picture.</p>
              </div>
            </div>
            <div data-intel="" data-screen-label="How we build — Intelligence infographic" style={sx('position:relative;display:flex;flex-direction:column')}>
              <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:12px;text-transform:uppercase;color:#555;margin-bottom:12px')}>Data in</span>
              <div style={sx('display:grid;grid-template-columns:repeat(5,minmax(0,1fr));padding-bottom:12px;border-bottom:1px solid var(--hw-black)')}>
                {INTEL_IN.map(([t, c]) => (
                  <span key={t} style={sx(`${INTEL_LABEL};color:${c}`)}>{t}</span>
                ))}
              </div>
              <div data-zone="in" style={sx('height:clamp(80px,10vw,130px);margin:16px 0')} />
              <FoundationBand variant={foundation} />
              <div data-zone="out" style={sx('height:clamp(90px,11vw,150px);margin:clamp(32px,4vw,48px) 0 16px')} />
              <div style={sx('display:grid;grid-template-columns:repeat(5,minmax(0,1fr));padding-top:12px;border-top:1px solid var(--hw-black)')}>
                {INTEL_OUT.map((t) => (
                  <span key={t} style={sx(INTEL_LABEL)}>{t}</span>
                ))}
              </div>
              <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:12px;text-transform:uppercase;color:#555;margin-top:12px;text-align:right')}>Decisions out</span>
              {darkDots ? (
                <hw-intel-flow key="dark" mid="#212121" colors="#BC532D|#2697AA|#617954|#B28951|#C5DCEA" icons="GRAPH|CONSTRUCTION|PEOPLE|THERMOSTAT|SOLAR ENERGY" style={sx('position:absolute;inset:0;z-index:1')} />
              ) : (
                <hw-intel-flow key="light" icons="GRAPH|CONSTRUCTION|PEOPLE|THERMOSTAT|SOLAR ENERGY" style={sx('position:absolute;inset:0;z-index:1')} />
              )}
            </div>
          </section>

          <section ref={refs.system} data-screen-label="How we build — Our system" style={sx(SECTION)}>
            <p style={sx(EYEBROW)}>03 · Our system</p>
            <h2 style={sx(H2)}>Well-considered, durable and standardized systems.</h2>
            <p style={sx(`${BODY};max-width:720px`)}>Each one is chosen for its lifecycle cost, its resilience and its ability to create great communities.</p>
            <div style={sx('margin:0 calc(-1 * clamp(20px,3vw,40px))')}>
              <PagePlatform go={go} only="innovation" hideIntro />
            </div>
          </section>

          {showExecution && (
            <section ref={refs.execution} data-screen-label="How we build — Our execution" style={sx(SECTION)}>
              <p style={sx(EYEBROW)}>04 · Our execution</p>
              <h2 style={sx(H2)}>One team, from sourcing to stabilization and long-term management.</h2>
              <p style={sx(`${BODY};max-width:720px`)}>Our investment, design, construction oversight and management teams work from one data-rich development system and shared information, so each stage strengthens the next, delivering resilient, desirable buildings that drive long-term investment returns.</p>
              <div data-exec-row="" style={sx('display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:40px 0;margin-top:8px')}>
                {STEPS.map((l, i) => (
                  <div key={l.k} style={sx('display:flex;flex-direction:column;gap:14px;min-width:0;padding-right:clamp(14px,1.6vw,24px)')}>
                    <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:13px;text-transform:uppercase;color:var(--hw-terracotta)')}>0{i + 1} · {l.k}</span>
                    <div style={sx('position:relative;height:16px;margin-right:calc(-1 * clamp(14px,1.6vw,24px));display:flex;align-items:center')}>
                      <span style={sx('position:absolute;left:0;right:0;top:50%;border-top:1.5px solid var(--hw-black)')} />
                      <span style={sx('position:relative;width:16px;height:16px;border-radius:50%;background:var(--hw-terracotta);border:3px solid var(--hw-white);box-shadow:0 0 0 1.5px var(--hw-black)')} />
                      {i === STEPS.length - 1 && <span style={sx('position:absolute;right:-1px;top:50%;width:10px;height:10px;border-top:1.5px solid var(--hw-black);border-right:1.5px solid var(--hw-black);transform:translateY(-50%) rotate(45deg)')} />}
                    </div>
                    <h3 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(20px,1.7vw,24px);line-height:1.1;letter-spacing:-.015em;text-wrap:balance')}>{l.t}</h3>
                    <p style={sx('margin:0;font-size:15px;line-height:1.5;text-wrap:pretty')}>{l.v}</p>
                  </div>
                ))}
              </div>
              <div data-screen-label="How we build — Feedback loop" style={sx('display:flex;flex-direction:column;gap:16px;margin-top:-8px')}>
                <div style={sx('position:relative;height:28px;margin:0 8px;border:1.5px solid var(--hw-terracotta);border-top:0')}>
                  <span style={sx('position:absolute;left:-6.5px;top:-2px;width:0;height:0;border-left:5.5px solid transparent;border-right:5.5px solid transparent;border-bottom:9px solid var(--hw-terracotta)')} />
                </div>
                <div style={sx('display:flex;align-items:center;gap:16px')}>
                  <span style={sx('flex:none;width:44px;height:44px;border-radius:50%;border:1.5px solid var(--hw-terracotta);color:var(--hw-terracotta);display:flex;align-items:center;justify-content:center;font-size:20px')}>↺</span>
                  <p style={sx('margin:0;max-width:640px;font-size:17px;line-height:1.55;text-wrap:pretty')}>
                    <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:13px;text-transform:uppercase;color:var(--hw-terracotta)')}>Back to 01 · </span>
                    Reporting closes the loop. Energy use, rents and resident turnover flow into our intelligence platform and sharpen the next acquisition.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      <section data-screen-label="How we build — Projects" style={sx('margin:0 clamp(20px,3vw,40px);padding:56px 0 clamp(56px,7vw,88px);border-top:1.5px solid var(--hw-terracotta);display:flex;flex-direction:column;gap:32px')}>
        <div style={sx('display:flex;justify-content:space-between;align-items:flex-end;gap:24px;flex-wrap:wrap')}>
          <h2 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(30px,3vw,38px);line-height:1.05;letter-spacing:-.02em')}>The system, in practice.</h2>
          <Hv as="button" type="button" onClick={() => go('development/projects')} s="padding:14px 22px;border:0;background:var(--hw-black);color:var(--hw-white);font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase;cursor:pointer" h="background:var(--hw-terracotta)">
            View all projects →
          </Hv>
        </div>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:16px')}>
          {PROJECTS.map(([slug, name, img]) => (
            <Hv key={slug} as="button" type="button" onClick={() => go('properties/' + slug)} s="background:none;border:0;padding:0;cursor:pointer;text-align:left;color:var(--hw-black);display:flex;flex-direction:column;gap:10px" h="color:var(--hw-terracotta)">
              <div style={sx(`width:100%;aspect-ratio:4/3;background:var(--hw-brown) url('${R + img}') ${slug === '353-sherbourne' ? 'center 85%/cover' : 'center/cover'} no-repeat`)} />
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:20px;line-height:1.15')}>{name}</span>
            </Hv>
          ))}
        </div>
      </section>
    </div>
  )
}

export default PageHowWeBuild
