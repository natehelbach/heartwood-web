import { useEffect, useRef, useState } from 'react'
import { Hv, sx, DotField } from '../design/ui.jsx'

// Ported from ui_kits/website/PagePlatform.dc.html. The site embeds it in About › Who we are
// (PageWhoB) with only="innovation", which shows just the innovation map.

const IH = '/assets/project-renders/innovation/'

export const HOTSPOTS = [
  { x: '52%', y: '9%', title: 'Rooftop Solar PV', img: IH + 'HW_Innovation_Rooftop-Solar-PV.png', body: 'Reduces energy costs for building operations and improves resilience to changes in the electrical grid.' },
  { x: '74%', y: '24%', title: 'Green Roofs', img: IH + 'HW_Innovation_Green-Roof.jpg', body: 'Improving insulation, passively managing stormwater, and reducing urban heat island effects.' },
  { x: '58%', y: '32%', title: 'Prefabrication ready building envelopes', img: IH + 'HW_Innovation_Prefab-Envelope_1.jpg', body: 'Shortens construction timeframe and improves performance, saving costs in construction and operations. Decreases energy usage intensity, improves comfort and tenant satisfaction.', note: 'Image permission pending' },
  { x: '20%', y: '44%', title: 'Smart and Connected Building Control', img: IH + 'HW_Innovation_Smart-Building-Controls.png', body: 'From energy and security to mechanical systems, Heartwood utilizes cloud-based controls to monitor, operate, and automate our buildings, improving performance and reducing operating costs.' },
  { x: '44%', y: '56%', title: 'Low-energy, durable heating and cooling', img: IH + 'HW_Innovation_Heating-Cooling-Geothermal.jpg', body: 'Heat pump-based systems deliver 3–4 times greater energy efficiency than traditional gas boiler systems, while also reducing maintenance and operating costs.' },
  { x: '82%', y: '46%', title: 'Prefabricated Mass Timber', img: IH + 'HW_Innovation_Mass-Timber.png', body: 'Repeatable mass-timber structures improve construction speed and reduce costs. Mass timber is also a natural, biophilic building material that is local, beautiful, long-lasting, and desirable to our residents.' },
  { x: '64%', y: '58%', title: 'Community Space', img: IH + 'HW_Innovation_Community-Space.jpg', body: 'In an age of technology and increasing social isolation, we intentionally design shared space that brings people together and fosters connection.' },
  { x: '30%', y: '82%', title: 'Playgrounds & Gardens', img: IH + 'HW_Innovation_Playground-Garden.jpg', body: 'Access to the outdoors and fresh food should be part of every child’s and adult’s life, which is why we are intentional about designing playgrounds using natural materials and gardens that yield fresh food for our residents to enjoy.' },
  { x: '38%', y: '90%', title: 'Walkable Access to Everyday Essentials', img: IH + 'HW_Innovation_Walkable-Main-Street.jpg', pos: '50% 50%', body: 'Walkable neighborhoods promote physical and mental well-being while creating more desirable places to live and supporting long-term resident retention.' },
]
const HOTSPOT_GROUP = ['building', 'building', 'building', 'building', 'building', 'building', 'community', 'community', 'community']

const STEPS = [
  { n: '01', k: 'Source', v: 'We source using advanced analytics from internal and external data sources, so we underwrite more accurately and make better acquisition decisions.' },
  { n: '02', k: 'Build', v: 'We build to a single standard: smart systems, repeatable component-based design, well-programmed amenities, and one integrated technological system to manage the process.' },
  { n: '03', k: 'Operate', v: 'We operate efficiently and with prevention in mind. In-house teams and live building data catch the small problems before they become big ones.' },
]

const FILTERS = [
  ['all', 'All'],
  ['building', 'Building systems'],
  ['community', 'Community'],
]

const MONO_LABEL = 'font-family:var(--font-subhead);font-weight:500;font-size:clamp(11px,.9vw,13px);letter-spacing:.04em;text-transform:uppercase;color:#212121;white-space:nowrap;background:#F9F9F9;padding:2px 4px'
const CHIP_LABEL = 'color:var(--hw-black);background:var(--hw-cool-grey);padding:4px 9px;font-family:var(--font-display);font-weight:500;font-size:clamp(12px,1vw,15px);line-height:1.2;letter-spacing:-.005em;white-space:nowrap'
const CHIP_LABEL_WRAP = CHIP_LABEL.replace('white-space:nowrap', 'white-space:normal;width:max-content;max-width:min(240px,40vw)')

const canHover = () => !window.matchMedia?.('(hover: none)').matches

// A vertical leader line with a label at its top or bottom end, used on the two diagrams.
function Leader({ left, top, height, side, end, label, labelStyle }) {
  const pos = `position:absolute;${side}:10px;${end}:0;transform:translateY(${end === 'top' ? '-50%' : '50%'})`
  return (
    <div style={sx(`position:absolute;left:${left};top:${top};height:${height};border-left:1px solid #212121;pointer-events:none`)}>
      <span style={sx(`${pos};${labelStyle}`)}>{label}</span>
    </div>
  )
}

const TREE_RINGS = "position:absolute;inset:0;border-radius:50%;background:#3A2316 url('/assets/brand/HW_Tree-Rings-Texture.png') 49% 49%/165% no-repeat;box-shadow:inset 0 0 0 clamp(4px,.6vw,8px) #3A2316"

// Two-panel "heartwood of a tree / of our platform" illustration. Lays out as a row when the
// container is at least 820px wide, otherwise stacks with the arrow turned down.
// `tree` is the CSS for the tree slice; `wrap` the outer padding; `rowPad` the cell side padding in a row.
export function Illustration({ tree = TREE_RINGS, wrap = 'padding:clamp(24px,3vw,48px) clamp(20px,3vw,40px);overflow:hidden', rowPad = ['56px', '104px'] }) {
  const ref = useRef(null)
  const [row, setRow] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => setRow(el.clientWidth >= 820))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  const ill = row
    ? { dir: 'row', cellFlex: '1 1 0', cellW: 'auto', padL: rowPad[0], padR: rowPad[1], rot: '0deg' }
    : { dir: 'column', cellFlex: 'none', cellW: '100%', padL: '56px', padR: '104px', rot: '90deg' }
  const cell = `flex:${ill.cellFlex};width:${ill.cellW};box-sizing:border-box;padding:64px ${ill.padR} 88px ${ill.padL};display:flex;flex-direction:column;align-items:center;gap:clamp(64px,6vw,88px)`

  return (
    <div ref={ref} style={sx(wrap)}>
      <div style={sx(`display:flex;flex-direction:${ill.dir};align-items:center;justify-content:center`)}>
        <div style={sx(cell)}>
          <div style={sx('position:relative;aspect-ratio:1/1;width:100%;max-width:340px')}>
            <div style={sx(tree)} />
            <Leader left="70.7%" top="-14%" height="19.6%" side="left" end="top" label="Bark" labelStyle={MONO_LABEL} />
            <Leader left="32.7%" top="-6%" height="18.8%" side="right" end="top" label="Sapwood" labelStyle={MONO_LABEL} />
            <Leader left="35.5%" top="75.1%" height="34.9%" side="right" end="bottom" label="Growth rings" labelStyle={MONO_LABEL} />
            <Leader left="50%" top="50%" height="68%" side="left" end="bottom" label="Heartwood" labelStyle={MONO_LABEL} />
          </div>
          <div style={sx('display:flex;flex-direction:column;align-items:center;gap:10px')}>
            <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:12px;text-transform:uppercase;text-align:center;color:#212121')}>The heartwood of a tree</span>
            <p style={sx('margin:0;max-width:340px;font-size:18px;line-height:1.5;text-align:center;text-wrap:pretty')}>
              The dense, inner core of a tree formed slowly, strengthened by growth, and steady enough to hold the living system around it.
            </p>
          </div>
        </div>
        <div style={sx('flex:none;width:104px;height:104px;position:relative')}>
          <div style={sx(`position:absolute;left:50%;top:50%;width:96px;height:3px;background:var(--hw-terracotta);transform:translate(-50%,-50%) rotate(${ill.rot})`)}>
            <span style={sx('position:absolute;right:-4px;top:-9px;border-left:20px solid var(--hw-terracotta);border-top:10.5px solid transparent;border-bottom:10.5px solid transparent')} />
          </div>
        </div>
        <div style={sx(cell)}>
          <div style={sx('position:relative;aspect-ratio:1/1;width:100%;max-width:340px')}>
            <hw-dots mode="rings" count="380" seed="9" color="#212121" size=".6" style={sx('position:absolute;inset:0;pointer-events:none')} />
            <Leader left="69.3%" top="-14%" height="22.7%" side="left" end="top" label="Performance" labelStyle={CHIP_LABEL} />
            <Leader left="36.2%" top="-6%" height="26.5%" side="right" end="top" label="Resilient real estate" labelStyle={CHIP_LABEL} />
            <Leader left="39.9%" top="67.5%" height="42.5%" side="right" end="bottom" label="Investment value" labelStyle={CHIP_LABEL} />
            <Leader left="50%" top="50%" height="68%" side="left" end="bottom" label="Expertise · Intelligence · Innovation" labelStyle={CHIP_LABEL_WRAP} />
          </div>
          <div style={sx('display:flex;flex-direction:column;align-items:center;gap:10px')}>
            <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:12px;text-transform:uppercase;text-align:center;color:#212121')}>The heartwood of our platform</span>
            <p style={sx('margin:0;max-width:340px;font-size:18px;line-height:1.5;text-align:center;text-wrap:pretty')}>
              At our core: expertise, intelligence and innovation. From there we ask one question, how do we create lasting investment value? Our answer is to build and own resilient real estate, which leads to performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Outcome({ text, stacked }) {
  return (
    <div
      className={stacked ? 'hw-outcome-st' : 'hw-outcome-ov'}
      style={sx(
        stacked
          ? 'margin-top:calc(-1 * clamp(24px,3vw,40px));background:var(--hw-cool-grey);padding:24px 24px 28px;display:flex;flex-direction:column;gap:12px'
          : 'position:absolute;z-index:2;left:clamp(16px,2vw,28px);top:clamp(16px,2vw,28px);width:min(520px,calc(100% - 460px));background:rgba(249,249,249,.94);padding:24px 28px;display:flex;flex-direction:column;gap:12px',
      )}
    >
      <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:13px;text-transform:uppercase;color:var(--hw-terracotta)')}>01 + 02 + 03 + 04 + 05 =</span>
      <p style={sx(`margin:0;font-family:var(--font-display);font-weight:500;font-size:${stacked ? 'clamp(22px,5vw,30px)' : 'clamp(22px,2vw,30px)'};line-height:1.18;letter-spacing:-.01em;text-wrap:balance`)}>{text}</p>
    </div>
  )
}

function InnovationMap({ showIntro, outcome }) {
  const [filter, setFilter] = useState('all')
  const [hot, setHot] = useState(4)
  const [zoom, setZoom] = useState(false)
  const cur = { note: '', pos: '50% 50%', ...HOTSPOTS[hot] }
  const pick = (i) => {
    setHot(i)
    setZoom(false)
  }

  return (
    <section data-screen-label="Platform — Innovation map" style={sx('width:100%;box-sizing:border-box;max-width:1440px;margin:0 auto;padding:0 clamp(20px,3vw,40px) clamp(48px,6vw,88px);display:flex;flex-direction:column;gap:clamp(24px,3vw,40px)')}>
      {showIntro && (
        <div style={sx('display:flex;flex-direction:column;gap:10px;padding:24px 0 4px')}>
          <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:15px;color:var(--hw-terracotta)')}>05</span>
          <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(22px,1.9vw,28px);line-height:1.15;letter-spacing:-.01em')}>Building systems</span>
          <p style={sx('margin:0;max-width:820px;font-size:18px;line-height:1.5;text-wrap:pretty')}>
            That thinking shapes every system we put into our buildings. Each one is chosen for how it lowers operating costs, improves resident comfort, creates community and keeps the building competitive for decades.
          </p>
        </div>
      )}
      <div style={sx('display:flex;flex-wrap:wrap;gap:10px')}>
        {FILTERS.map(([k, label]) => (
          <button
            key={k}
            type="button"
            aria-pressed={filter === k}
            onClick={() => setFilter(k)}
            style={sx(`padding:10px 16px;border:1.5px solid var(--hw-black);background:${filter === k ? 'var(--hw-black)' : 'transparent'};color:${filter === k ? 'var(--hw-white)' : 'var(--hw-black)'};cursor:pointer;font-family:var(--font-subhead);font-weight:500;font-size:13px;text-transform:uppercase`)}
          >
            {label}
          </button>
        ))}
      </div>
      <div style={sx("position:relative;width:100%;max-width:100%;box-sizing:border-box;aspect-ratio:3/2;min-height:460px;background:var(--hw-brown) url('/assets/project-renders/innovation/HW_Innovation_Hero-Render.jpg') center/cover no-repeat;overflow:hidden")}>
        <div style={sx('position:absolute;inset:0;background:var(--overlay-brown)')} />
        {outcome && <Outcome text={outcome} />}
        {HOTSPOTS.map((h, i) => {
          const on = i === hot
          const dim = filter === 'all' || HOTSPOT_GROUP[i] === filter ? 1 : 0.2
          return (
            <button
              key={h.title}
              type="button"
              onClick={() => pick(i)}
              onMouseEnter={() => pick(i)}
              aria-label={h.title}
              aria-pressed={on}
              style={sx(`position:absolute;left:${h.x};top:${h.y};transform:translate(-50%,-50%);width:36px;height:36px;padding:0;border:0;background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:${dim};transition:opacity .3s`)}
            >
              <span style={sx(`width:${on ? 16 : 12}px;height:${on ? 16 : 12}px;border-radius:50%;background:#C5DCEA;outline:1.5px solid rgba(197,220,234,${on ? 0.8 : 0});outline-offset:4px;display:block`)} />
            </button>
          )
        })}
        <div style={sx(`position:absolute;right:clamp(16px,2vw,28px);bottom:clamp(16px,2vw,28px);width:min(400px,calc(100% - 32px));background:rgba(249,249,249,.9);display:grid;grid-template-columns:${cur.img ? '140px minmax(0,1fr)' : 'minmax(0,1fr)'};gap:0`)}>
          {zoom && cur.img && (
            <div style={sx('position:absolute;z-index:3;right:0;bottom:calc(100% + 12px);width:100%;aspect-ratio:4/3;max-height:calc(100vh - var(--nav-h,82px) - 340px);min-height:160px;background:var(--hw-cool-grey);pointer-events:none;box-shadow:0 12px 32px rgba(33,33,33,.22)')}>
              <img src={cur.img} alt={cur.title} style={sx(`width:100%;height:100%;object-fit:cover;object-position:${cur.pos};display:block`)} />
            </div>
          )}
          {cur.img && (
            <button
              type="button"
              aria-label="Enlarge image"
              onMouseEnter={() => canHover() && setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onClick={() => (canHover() ? setZoom(true) : setZoom((z) => !z))}
              style={sx('position:relative;display:block;width:140px;height:100%;min-height:150px;padding:0;border:0;background:var(--hw-cool-grey);cursor:zoom-in;overflow:hidden')}
            >
              <img
                src={cur.img}
                alt=""
                style={sx(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${cur.pos};display:block;filter:${zoom ? 'none' : 'sepia(.22) saturate(.88) contrast(1.06) brightness(1.02)'};transform:scale(${zoom ? 1.04 : 1});transition:filter .25s ease,transform .4s ease`)}
              />
              <span style={sx('position:absolute;right:6px;bottom:6px;width:24px;height:24px;display:flex;align-items:center;justify-content:center;background:rgba(249,249,249,.92);color:var(--hw-black);font-size:14px;line-height:1')}>+</span>
            </button>
          )}
          <div style={sx('padding:18px 20px;display:flex;flex-direction:column;gap:8px')}>
            <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:13px;letter-spacing:.02em;text-transform:uppercase')}>{cur.title}</span>
            <p style={sx('margin:0;font-size:18px;line-height:1.45;text-wrap:pretty')}>{cur.body}</p>
            <span style={sx('font-family:var(--font-subhead);font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:var(--hw-black)')}>{cur.note}</span>
          </div>
        </div>
        <span style={sx('position:absolute;right:clamp(16px,2vw,28px);top:clamp(16px,2vw,28px);color:var(--hw-white);font-family:var(--font-subhead);font-size:12px;letter-spacing:.04em;text-transform:uppercase')}>
          {`0${hot + 1} / 0${HOTSPOTS.length}`} · Tap a dot
        </span>
      </div>
      {outcome && <Outcome text={outcome} stacked />}
    </section>
  )
}

function PagePlatform({ go, hideHero, only, hideIntro, outcome }) {
  const innovationOnly = only === 'innovation'
  const showHero = !hideHero && !innovationOnly
  const showRest = !innovationOnly

  return (
    <div style={sx('background:var(--hw-white);color:var(--hw-black);font-family:var(--font-body)')}>
      {showHero && (
        <section data-screen-label="Platform — Hero" style={sx('background:#F9F9F9;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));align-items:center;min-height:clamp(480px,46vw,680px)')}>
          <div style={sx('position:relative;padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:24px;justify-content:center')}>
            <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(18px,1.4vw,22px);text-transform:uppercase;color:var(--hw-terracotta)')}>Platform · What we’re working on</p>
            <h1 style={sx('margin:0;max-width:900px;font-family:var(--font-display);font-weight:500;font-size:clamp(34px,4.4vw,64px);line-height:1.05;letter-spacing:-.02em;text-wrap:balance')}>
              Responsive intelligence and systems-level real estate innovations.
            </h1>
            <p style={sx('margin:0;max-width:560px;font-size:clamp(17px,1.35vw,20px);line-height:1.5')}>
              Our Platform integrates real estate expertise, data intelligence and a drive toward innovation.
            </p>
          </div>
          <Illustration />
        </section>
      )}

      {showRest && (
        <div style={{ position: 'relative' }}>
          <section style={sx('position:relative;height:100vh;height:100svh;min-height:560px;overflow:clip')}>
            <div data-screen-label="Platform — A Resilient Approach" style={sx('position:absolute;inset:0;z-index:2;overflow:clip;background:#F9F9F9')}>
              <div style={sx('position:absolute;top:82px;bottom:0;right:30px;left:calc(30px + (100% - 390px) / 12 * 4 + 120px)')}>
                <DotField preset="approach" />
              </div>
              <div style={sx('position:relative;z-index:1;height:100%;box-sizing:border-box;padding:calc(82px + clamp(1rem,4vh,3rem)) 30px clamp(1rem,4vh,3rem);display:flex;flex-direction:column;justify-content:center;pointer-events:none')}>
                <div style={sx('max-width:calc((100vw - 390px) / 12 * 5 + 120px);min-width:min(100%,320px)')}>
                  <p style={sx('margin:0 0 clamp(1rem,2.5vh,1.75rem);font-family:var(--font-subhead);font-weight:500;text-transform:uppercase;font-size:clamp(0.875rem,1.15vw,1.5rem);line-height:1.2;color:#BC532D')}>A resilient approach</p>
                  <h2 style={sx('margin:0;font-family:var(--font-display);font-weight:500;line-height:1.25;font-size:clamp(1.65rem,2.5vw,3.25rem);text-wrap:pretty;color:#212121')}>Responsive intelligence and systems-based discipline.</h2>
                  <p style={sx('margin:clamp(1rem,3vh,2.25rem) 0 0;font-family:var(--font-body);line-height:1.35;font-size:clamp(1rem,2.2vh,1.25rem);text-wrap:balance;color:#212121')}>
                    Our platform integrates real estate expertise, data intelligence and a drive toward innovation.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      <InnovationMap showIntro={!hideIntro} outcome={outcome} />

      {showRest && (
        <>
          <section data-screen-label="Platform — Source Build Operate" style={sx('position:relative;overflow:hidden;background:var(--hw-white);color:var(--hw-black)')}>
            <div style={sx('position:relative;padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:clamp(32px,4vw,56px)')}>
              <div style={sx('display:flex;flex-direction:column;gap:20px')}>
                <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(18px,1.4vw,22px);text-transform:uppercase;color:var(--hw-terracotta)')}>Expertise</p>
                <h2 style={sx('margin:0;max-width:760px;font-family:var(--font-display);font-weight:500;font-size:clamp(32px,3.6vw,52px);line-height:1.08;letter-spacing:-.015em;text-wrap:balance')}>Vertically integrated, from acquisition to disposition.</h2>
                <p style={sx('margin:0;max-width:640px;font-size:clamp(17px,1.35vw,20px);line-height:1.5')}>
                  Our systems-based approach touches every point of the process, from sourcing through operations, across our income and growth strategies. Investing, building and actively managing to create value and reduce risk. Specialists in each discipline work side by side on shared systems, keeping the work consistent throughout the life cycle. One integrated team, united by one goal: to protect and grow investor capital and deliver durable returns.
                </p>
              </div>
              <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));border-top:1.5px solid rgba(33,33,33,.3)')}>
                {STEPS.map((s) => (
                  <div key={s.n} style={sx('padding:24px 28px 8px 0;display:flex;flex-direction:column;gap:12px')}>
                    <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:14px;color:var(--hw-black)')}>{s.n}</span>
                    <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(36px,4vw,60px);line-height:1;letter-spacing:-.02em')}>{s.k}</span>
                    <p style={sx('margin:0;font-size:18px;line-height:1.5;max-width:400px')}>{s.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section data-screen-label="Platform — Intelligence" style={sx('background:#F9F9F9;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));align-items:center')}>
            <div style={sx('padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:24px')}>
              <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(14px,1.2vw,18px);text-transform:uppercase;color:var(--hw-teal)')}>Intelligence</p>
              <h2 style={sx('margin:0;max-width:560px;font-family:var(--font-display);font-weight:500;font-size:clamp(32px,3.6vw,52px);line-height:1.08;letter-spacing:-.015em;text-wrap:balance')}>
                Real-time market, cost, demographic, climate, and building performance data in one place.
              </h2>
              <p style={sx('margin:0;max-width:520px;font-size:clamp(17px,1.35vw,20px);line-height:1.5;text-wrap:pretty')}>
                Our intelligence platform consolidates, validates, and organizes these sources into a single environment, resolved to a specific site across neighbourhood, municipal, and metro geographies — so our team can make decisions with a holistic picture rather than fragments.
              </p>
            </div>
          </section>

          <section style={sx('padding:clamp(40px,5vw,72px) clamp(20px,3vw,40px);display:flex;flex-wrap:wrap;gap:20px;justify-content:space-between;align-items:center;background:var(--hw-cool-grey)')}>
            <p style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.4vw,36px)')}>See the platform at work.</p>
            <Hv as="button" onClick={() => go('properties')} s="padding:14px 22px;background:var(--hw-black);color:var(--hw-white);border:0;cursor:pointer;font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase" h="background:var(--hw-teal)">
              Our properties →
            </Hv>
          </section>
        </>
      )}
    </div>
  )
}

export default PagePlatform
