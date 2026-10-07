import { Fragment, useEffect, useRef, useState } from 'react'
import { Hv, sx } from '../design/ui.jsx'
import DotIcon from '../design/DotIcon.jsx'
import PagePlatform, { Illustration } from './PagePlatform.jsx'

// Ported from ui_kits/website/PageWhoB.dc.html: About › Who we are, layout B ("Editorial index"),
// the design's default. A sticky chapter index sits beside five sections on wide screens.

const CHAPTERS = [
  ['who', 'Who we are'],
  ['what', 'What we do'],
  ['build', 'How we build'],
  ['buy', 'How we buy'],
  ['hold', 'Why we hold'],
]

const TIERS = [
  { n: '01', w: 'Build', k: 'Build-to-hold development', p: 'Our building strategy is focused on purpose-built rental communities in supply-constrained markets, built in an efficient and innovative manner to create resilient assets designed for the future.', f: 'Growth strategy', r: 'investment/growth' },
  { n: '02', w: 'Buy', k: 'Core acquisition', p: 'We acquire well-located, modern, stabilized, institutional-quality rental properties at attractive entry points. Through our management system and operating efficiency, we increase rental income, reduce expenses by optimizing building operations, and hold for the long term to capture cash flow and appreciation.', f: 'Income strategy', r: 'investment/income' },
  { n: '03', w: 'Hold', k: 'Long-term ownership', p: 'We hold to capture development value on what we build, and income and appreciation on what we buy.', f: 'Subscribe to The Long View', r: 'insights/newsletter' },
]

const T = 'var(--hw-terracotta)'
const TL = 'var(--hw-teal)'
const pt = (q, ic, c = T) => ({ ...q, ic, c, icC: c, nC: c, nT: 'none', boxBg: 'var(--hw-white)', isQ: false })

const BUILD_FLOW = [
  pt({ n: '01', k: 'An owner’s perspective', v: 'Sites chosen for how they will perform beyond construction and lease-up.' }, 'PEOPLE'),
  pt({ n: '02', k: 'Quality as strategy', v: 'Building decisions made for lifetime operating cost and durability.' }, 'BRICK'),
  pt({ n: '03', k: 'One connected process', v: 'Investment, design, construction and operations working as a single operating system within our company.' }, 'ASSET MANAGEMENT'),
  pt({ n: '04', k: 'Future built', v: 'We design for the decades ahead: for a 2050 climate, for how mobility will change over the coming century, and for a portfolio structured with lower leverage to support accretive risk-adjusted returns.' }, 'FUTURE BUILT'),
  pt({ n: '05', k: 'Building systems', v: 'Every system we choose lowers operating costs, improves comfort, creates community and keeps the building competitive. Explore them below.' }, 'BUILDING', TL),
]

const BUY_FLOW = [
  pt({ n: '01', k: 'The Heartwood standard', v: 'Asset quality, location and long-term competitiveness that match what we build.' }, 'STAR'),
  pt({ n: '02', k: 'Underwritten for today', v: 'Current income and fundamentals, not legacy assumptions.' }, 'RETURNS'),
  pt({ n: '03', k: 'Improved through ownership', v: 'Continuous capital, operational and intellectual investment in the assets we acquire.' }, 'PEOPLE'),
  { n: 'The objective', k: '', v: 'Whether we build an asset ourselves or acquire it from another owner, the objective is the same: own high-quality residential real estate that can generate durable income and appreciate over time.', ic: 'ARROW RIGHT', c: 'var(--hw-brown)', icC: '#F9F9F9', nC: T, nT: 'uppercase', boxBg: 'var(--hw-brown)', isQ: true },
]

const HOLD = [
  { n: '01', k: 'Planning for an uncertain future', ps: ['Our podcast and newsletter, The Long View, take their name from Peter Schwartz’s The Art of the Long View, a book about making good decisions when the future cannot be predicted. Schwartz’s lesson is that even the Warren Buffetts of investing cannot reliably forecast a single outcome. The better approach is to consider a range of plausible futures and choose strategies that hold up across all of them, separating variable risk from our factual reality.', 'We apply that thinking to how we approach real estate investing. Interest rates, policy and the pace of population growth will move in ways no one can reliably predict. Other things are far more certain: people need homes, more households are renting for longer, and a well-built building will stand for decades. We don’t try to time the cycle. We own assets designed to perform across many possible futures, and when the opportune moment to sell an asset presents itself, we capitalize on it.'] },
  { n: '02', k: 'Aligned by ownership', ps: ['Because we intend to hold, we can prioritize durable building quality, make investments whose benefits accrue over many years, focus on resident retention and community quality, and improve operating performance rather than optimize for a near-term exit.', 'We don’t merchant build, and we don’t buy simply to flip. This mentality creates alignment between Heartwood, our investors, our assets and the residents who call them home.'] },
  { n: '03', k: 'Built ring by ring', ps: ['Like the heartwood of a tree, lasting strength develops slowly, layer by layer, and becomes the core that holds everything else up.', 'We believe real estate works the same way. Durable assets, strong communities and investment value are built through disciplined decisions and long-term ownership.'] },
]

const CHAPTER = 'padding:clamp(48px,6vw,96px) 0;display:flex;flex-direction:column;gap:clamp(24px,3vw,40px)'
const CHAPTER_RULED = `${CHAPTER};border-bottom:1px solid var(--hw-black)`
const EYEBROW = 'margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(16px,1.2vw,20px);text-transform:uppercase;color:var(--hw-terracotta)'
const H2 = 'margin:0;max-width:880px;font-family:var(--font-display);font-weight:500;font-size:clamp(36px,4.4vw,72px);line-height:1.02;letter-spacing:-.025em;text-wrap:balance'
const LEDE = 'margin:0;max-width:820px;font-size:clamp(20px,1.8vw,28px);line-height:1.4;text-wrap:pretty'
const BODY = 'margin:0;max-width:680px;font-size:clamp(18px,1.3vw,20px);line-height:1.6;text-wrap:pretty'
const BODY_GRID = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:20px clamp(24px,3vw,48px)'

const TREE_SLICE = "position:absolute;inset:0;border-radius:50%;background:#F9F9F9 url('/assets/brand/HW_Tree-Slice-Bark_HR.jpg') 50% 43%/186% auto no-repeat"

// Watches an element's width and reports whether it is at least `min` pixels wide.
function useWiderThan(ref, min, initial) {
  const [wide, setWide] = useState(initial)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => setWide(el.clientWidth >= min))
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref, min])
  return wide
}

// Numbered steps joined by a dotted line: a row of columns when wide, a vertical list otherwise.
function Flow({ items, row, cols }) {
  const fl = row
    ? { nd: 'flex', ng: '16px', pb: '0', gg: 'clamp(20px,2vw,32px)', lr: '44px', lb: 'auto', bt: '2px dotted var(--hw-black)', bl: '0', cols }
    : { nd: 'grid', ng: '0 20px', pb: '28px', gg: '0', lr: 'auto', lb: '120px', bt: '0', bl: '2px dotted var(--hw-black)', cols: 'minmax(0,1fr)' }
  return (
    <div style={sx(`position:relative;display:grid;grid-template-columns:${fl.cols};gap:${fl.gg};align-items:start;padding-top:8px`)}>
      <span style={sx(`position:absolute;z-index:0;left:44px;top:52px;right:${fl.lr};bottom:${fl.lb};border-top:${fl.bt};border-left:${fl.bl}`)} />
      {items.map((q) => (
        <div key={q.n} style={sx(`position:relative;z-index:1;display:${fl.nd};grid-template-columns:88px minmax(0,1fr);flex-direction:column;gap:${fl.ng};padding-bottom:${fl.pb}`)}>
          <div style={sx(`width:88px;height:88px;box-sizing:border-box;flex:none;display:flex;align-items:center;justify-content:center;background:${q.boxBg};border:1.5px solid ${q.c}`)}>
            <DotIcon name={q.ic} color={q.icC} size={50} />
          </div>
          <div style={sx('display:flex;flex-direction:column;gap:10px;min-width:0')}>
            <span style={sx(`font-family:var(--font-subhead);font-weight:500;font-size:15px;text-transform:${q.nT};color:${q.nC}`)}>{q.n}</span>
            {q.isQ ? (
              <p style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.1vw,32px);line-height:1.18;letter-spacing:-.01em;text-wrap:balance')}>{q.v}</p>
            ) : (
              <>
                <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(22px,1.8vw,26px);line-height:1.15;letter-spacing:-.01em')}>{q.k}</span>
                <span style={sx('font-size:18px;line-height:1.5;text-wrap:pretty')}>{q.v}</span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function PageWhoB({ go }) {
  const wrapRef = useRef(null)
  const buildRef = useRef(null)
  const refs = { who: useRef(null), what: useRef(null), build: buildRef, buy: useRef(null), hold: useRef(null) }
  const wide = useWiderThan(wrapRef, 960, true)
  const flowRow = useWiderThan(buildRef, 900, true)
  const [active, setActive] = useState('who')

  // Highlight the chapter crossing the middle of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return
          const k = Object.keys(refs).find((key) => refs[key].current === e.target)
          if (k) setActive(k)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    Object.values(refs).forEach((r) => r.current && io.observe(r.current))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const jump = (k) => () => {
    const el = refs[k].current
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' })
  }

  return (
    <div style={sx('background:var(--hw-white);color:var(--hw-black);font-family:var(--font-body)')}>
      <section data-screen-label="Who we are B — Hero" style={sx('background:var(--hw-brown);color:var(--hw-white);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,460px),1fr));align-items:stretch;min-height:clamp(560px,50vw,800px)')}>
        <div style={sx('padding:clamp(56px,7vw,112px) clamp(20px,3vw,40px);display:flex;flex-direction:column;justify-content:space-between;gap:clamp(40px,6vw,96px)')}>
          <h1 style={sx('margin:0;max-width:9ch;font-family:var(--font-display);font-weight:500;font-size:clamp(56px,7.6vw,144px);line-height:.92;letter-spacing:-.035em;text-wrap:balance')}>Investments that grow over time.</h1>
          <div style={sx('display:flex;flex-direction:column;gap:18px;max-width:520px;border-top:1.5px solid var(--hw-terracotta);padding-top:20px')}>
            <p style={sx('margin:0;font-size:clamp(18px,1.5vw,22px);line-height:1.5')}>
              Like the heartwood of a tree, lasting value forms slowly, year by year and ring by ring. We take the long view, building, buying and holding real estate for the decades ahead.
            </p>
          </div>
        </div>
        <div style={sx('padding:clamp(40px,5vw,80px) clamp(20px,3vw,40px);display:flex;align-items:center;justify-content:center')}>
          <div style={sx("width:100%;max-width:600px;aspect-ratio:1/1;border-radius:50%;background:radial-gradient(circle closest-side,transparent 96.5%,var(--hw-brown) 97.5%) center/100% 100% no-repeat,url('/assets/brand/HW_Tree-Slice_HR.jpg') 48.7% 44%/215% auto no-repeat var(--hw-brown)")} />
        </div>
      </section>

      <div ref={wrapRef} style={sx(`display:grid;grid-template-columns:${wide ? 'minmax(0,220px) minmax(0,1fr)' : 'minmax(0,1fr)'};gap:clamp(32px,5vw,96px);padding:0 clamp(20px,3vw,40px)`)}>
        {wide && (
          <nav aria-label="Chapters" style={sx('position:sticky;top:110px;align-self:start;padding-top:clamp(48px,6vw,96px);display:flex;flex-direction:column')}>
            {CHAPTERS.map(([k, label], i) => (
              <Hv
                key={k}
                as="button"
                type="button"
                onClick={jump(k)}
                aria-current={active === k ? 'true' : undefined}
                s={`display:grid;grid-template-columns:36px minmax(0,1fr);gap:8px;align-items:baseline;padding:14px 0;background:none;border:0;border-top:1px solid rgba(33,33,33,.3);cursor:pointer;text-align:left;color:var(--hw-black);opacity:${active === k ? 1 : 0.45}`}
                h="opacity:1"
              >
                <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:14px;color:var(--hw-terracotta)')}>0{i + 1}</span>
                <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase;line-height:1.3')}>{label}</span>
              </Hv>
            ))}
          </nav>
        )}
        <div style={sx('min-width:0')}>
          <div ref={refs.who} data-screen-label="Who we are B — Who we are" style={sx(CHAPTER_RULED)}>
            <p style={sx(EYEBROW)}>01 · Who we are</p>
            <h2 style={sx(H2)}>A real estate platform built for long-term ownership.</h2>
            <p style={sx(LEDE)}>Heartwood is a next-generation real estate platform focused on enduring buildings, healthier homes, stronger communities, and durable investment returns.</p>
            <div style={sx(BODY_GRID)}>
              <p style={sx(BODY)}>We bring investment, development, construction and asset management together in one vertically integrated platform. That lets us build, buy, and own residential real estate from a single, consistent perspective: that of a long view.</p>
              <p style={sx(BODY)}>We believe real estate value is created over long periods of time. The best investments are not simply the ones that work at acquisition or at stabilization. They are the ones that keep performing across economic cycles, through demographic trends, and amidst a changing world. That requires alignment between how we design, what we develop, what we acquire and how we own it.</p>
            </div>
            <Illustration tree={TREE_SLICE} wrap="padding:clamp(16px,2vw,32px) 0;overflow:hidden;background:#F9F9F9" rowPad={['24px', '24px']} />
            <p style={sx('margin:0;max-width:900px;padding-left:clamp(20px,2.4vw,36px);border-left:3px solid var(--hw-terracotta);font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.4vw,38px);line-height:1.2;letter-spacing:-.01em;text-wrap:balance')}>
              That belief is organized around three simple words: Build. Buy. Hold.
            </p>
          </div>

          <div ref={refs.what} data-screen-label="Who we are B — What we do" style={sx(CHAPTER_RULED)}>
            <p style={sx(EYEBROW)}>02 · What we do</p>
            <h2 style={sx(H2)}>Build. Buy. Hold.</h2>
            <p style={sx(LEDE)}>Heartwood’s living platform develops high-quality, energy-efficient communities, buys modern stabilized core properties, and holds them for long-term appreciation.</p>
            <p style={sx(BODY)}>Building is part of our growth strategy, buying is part of our income strategy, and holding is a philosophy about a long view with the future in mind.</p>
            <div style={sx('display:flex;flex-direction:column;border-top:1px solid var(--hw-black)')}>
              {TIERS.map((t) => (
                <div key={t.n} style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:16px clamp(24px,3vw,48px);padding:clamp(24px,3vw,40px) 0;border-bottom:1px solid var(--hw-black);align-items:start')}>
                  <div style={sx('display:flex;gap:16px;align-items:baseline')}>
                    <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:15px;color:var(--hw-terracotta)')}>{t.n}</span>
                    <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(56px,6.4vw,104px);line-height:.9;letter-spacing:-.03em')}>{t.w}</span>
                  </div>
                  <div style={sx('display:flex;flex-direction:column;gap:12px;align-items:flex-start')}>
                    <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase')}>{t.k}</span>
                    <p style={sx('margin:0;font-size:18px;line-height:1.55;text-wrap:pretty')}>{t.p}</p>
                    <Hv as="button" type="button" onClick={() => go(t.r)} s="margin-top:6px;padding:12px 18px;background:transparent;color:var(--hw-black);border:1.5px solid var(--hw-black);cursor:pointer;font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase" h="background:var(--hw-black);color:var(--hw-white)">
                      {t.f} →
                    </Hv>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div ref={refs.build} data-screen-label="Who we are B — How we build" style={sx(CHAPTER_RULED)}>
            <p style={sx(EYEBROW)}>03 · How we build · Growth strategy</p>
            <h2 style={sx(H2)}>Designed to perform for decades.</h2>
            <p style={sx(LEDE)}>We don’t develop buildings simply to complete construction or reach lease-up and turn around to sell them as merchants. We develop assets we intend to own for the long term.</p>
            <div style={sx(BODY_GRID)}>
              <p style={sx(BODY)}>Every project starts with the long-term owner in mind. We evaluate locations based on long-term rental demand and supply, and we select sites in supply-constrained markets where the underlying fundamentals support decades of ownership, not just a successful lease-up.</p>
              <p style={sx(BODY)}>For us, building quality is an investment decision. Energy-efficient systems, durable materials, high-performing walls and windows, and efficient design using prefabrication all lower operating and maintenance costs and keep a building competitive long after it opens.</p>
              <p style={sx(BODY)}>Because we stay involved beyond development, every decision is connected. Investment goals inform design. Design shapes construction. Construction determines operating costs. And operating performance ultimately drives asset value and investor returns.</p>
              <p style={sx(BODY)}>We evaluate each choice through the lens of the owner who will live with it for decades to come.</p>
            </div>
            <Flow items={BUILD_FLOW} row={flowRow} cols="repeat(5,minmax(0,1fr))" />
            <div style={sx('margin:calc(-1 * clamp(24px,3vw,40px)) calc(-1 * clamp(20px,3vw,40px)) 0;min-width:0;overflow:hidden')}>
              <PagePlatform
                go={go}
                only="innovation"
                hideIntro
                outcome="The objective is not simply to deliver a building. It is to create a durable, income-producing asset that can remain competitive for decades."
              />
            </div>
          </div>

          <div ref={refs.buy} data-screen-label="Who we are B — How we buy" style={sx(CHAPTER_RULED)}>
            <p style={sx(EYEBROW)}>04 · How we buy · Income strategy</p>
            <h2 style={sx(H2)}>Institutional discipline. Entrepreneurial pace.</h2>
            <p style={sx(LEDE)}>We bring an institutional investor’s rigour to every acquisition, with the speed and flexibility of an entrepreneur to act when the right opportunity appears.</p>
            <div style={sx(BODY_GRID)}>
              <p style={sx(BODY)}>We acquire modern, purpose-built rental communities with institutional-quality construction, strong locations, stable occupancy and limited near-term capital requirements: assets capable of producing durable income from the day we own them.</p>
              <p style={sx(BODY)}>We underwrite for today. Each acquisition is priced on current rents and operating fundamentals, not on assumptions carried over from a prior market cycle, and we focus on assets where the existing income stream supports the investment.</p>
              <p style={sx(BODY)}>Ownership doesn’t end at acquisition. We apply our development, construction and operating capabilities to improve the properties we buy, supporting resident experience, operating efficiency and long-term value.</p>
            </div>
            <Flow items={BUY_FLOW} row={flowRow} cols="repeat(3,minmax(0,1fr)) minmax(0,1.5fr)" />
          </div>

          <div ref={refs.hold} data-screen-label="Who we are B — Why we hold" style={sx(CHAPTER)}>
            <p style={sx(EYEBROW)}>05 · Why we hold · Across the platform</p>
            <h2 style={sx(H2)}>Real estate rewards the long view.</h2>
            <p style={sx(LEDE)}>Holding is an active strategy, and the long view is where the value compounds and alpha is created.</p>
            <p style={sx(BODY)}>Over time, real estate compounds: rental income grows, debt gets paid down, operating efficiencies accumulate, communities mature, and well-built assets can become more valuable as they age. These benefits can be capitalized on by investors who are not myopically focused on short-term gain, but rather have a long view.</p>
            <div style={sx('display:flex;flex-direction:column;border-top:1px solid var(--hw-black)')}>
              {HOLD.map((c) => (
                <div key={c.n} style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:16px clamp(24px,3vw,48px);padding:clamp(24px,3vw,40px) 0;border-bottom:1px solid rgba(33,33,33,.3)')}>
                  <div style={sx('display:flex;gap:14px;align-items:baseline')}>
                    <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:15px;color:var(--hw-terracotta)')}>{c.n}</span>
                    <h3 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.2vw,34px);line-height:1.12;letter-spacing:-.01em')}>{c.k}</h3>
                  </div>
                  <div style={sx('display:flex;flex-direction:column;gap:16px')}>
                    {c.ps.map((p, i) => (
                      <Fragment key={i}>
                        <p style={sx('margin:0;font-size:18px;line-height:1.6;text-wrap:pretty')}>{p}</p>
                      </Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section data-screen-label="Who we are B — Close" style={sx('background:#3A2316;color:var(--hw-white);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(32px,5vw,80px);align-items:center;padding:clamp(56px,7vw,112px) clamp(20px,3vw,40px)')}>
        <div style={sx('display:flex;flex-direction:column;gap:20px')}>
          <p style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(48px,6.4vw,112px);line-height:.95;letter-spacing:-.03em')}>Build. Buy. Hold.</p>
          <p style={sx('margin:0;max-width:520px;font-size:clamp(18px,1.5vw,22px);line-height:1.5')}>A simple model built around a long view of real estate.</p>
        </div>
        <div style={sx('display:flex;flex-direction:column;gap:20px;align-items:flex-start;border-top:1.5px solid var(--hw-terracotta);padding-top:24px')}>
          <p style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.2vw,34px)')}>Meet the specialists behind the platform.</p>
          <Hv as="button" type="button" onClick={() => go('about/leadership')} s="padding:14px 22px;background:var(--hw-white);color:var(--hw-black);border:0;cursor:pointer;font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase" h="background:var(--hw-terracotta);color:var(--hw-white)">
            Our team →
          </Hv>
        </div>
      </section>
    </div>
  )
}

export default PageWhoB
