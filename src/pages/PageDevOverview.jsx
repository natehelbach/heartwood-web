import { Hv, sx } from '../design/ui.jsx'

// Ported from ui_kits/website/PageDevOverview.dc.html (Development › Overview).

const MONO = 'font-family:var(--font-subhead);font-weight:500;text-transform:uppercase'
const SECTION = 'padding:clamp(56px,7vw,88px) clamp(20px,3vw,40px);border-top:1.5px solid var(--hw-terracotta)'
const SECTION_COL = `${SECTION};display:flex;flex-direction:column;gap:clamp(32px,4vw,44px)`
const TWO_COL = 'display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px 64px;align-items:end'
const EYEBROW = `margin:0;${MONO};font-size:15px;color:var(--hw-terracotta)`
const H2 = 'margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(30px,3.4vw,48px);line-height:1.05;letter-spacing:-.025em;text-wrap:balance'
const LEAD = 'margin:0;font-size:clamp(17px,1.35vw,18px);line-height:1.5;text-wrap:pretty'
const LINK_BTN = `min-width:min(100%,300px);display:flex;justify-content:space-between;gap:24px;padding:14px 0 12px;background:none;border:0;border-bottom:1.5px solid var(--hw-black);color:var(--hw-black);cursor:pointer;${MONO};font-size:14px`
const LINK_BTN_HOVER = 'color:var(--hw-terracotta);border-color:var(--hw-terracotta)'

const R = '/assets/project-renders/'
const P = '/assets/photography/'

const STEPS = [
  ['01', 'Source', 'Data-Driven Site Sourcing'],
  ['02', 'Design', 'System-based design'],
  ['03', 'Build', 'Efficient Construction'],
  ['04', 'Operate', 'Homes people don’t want to leave'],
  ['05', 'Report', 'Measured performance, reported'],
]


const PROJECTS = [
  { name: '3385 Lawrence Avenue East', loc: 'Toronto, Ontario · 155 homes', img: R + 'HW_Render_3385-Lawrence.jpg', pos: 'center', r: 'properties/3385-lawrence' },
  { name: '360 Kennedy Lane', loc: 'Ottawa, Ontario · 81 homes', img: R + 'HW_Render_360-Kennedy-Lane.jpg', pos: 'center', r: 'properties/360-kennedy' },
  { name: '175 Oxford Street', loc: 'Orillia, Ontario · 48 homes', img: P + 'HW_Photo_175-Oxford_Townhomes-Sky.jpg', pos: 'center 85%', r: 'properties/175-oxford' },
]

function SectionHead({ eyebrow, title, lead, cta, onCta }) {
  return (
    <div data-do-2="" style={sx(TWO_COL)}>
      <div style={sx('display:flex;flex-direction:column;gap:18px')}>
        <p style={sx(EYEBROW)}>{eyebrow}</p>
        <h2 style={sx(H2)}>{title}</h2>
      </div>
      <div style={sx('display:flex;flex-direction:column;gap:24px;align-items:flex-start')}>
        <p style={sx(LEAD)}>{lead}</p>
        <Hv as="button" onClick={onCta} s={LINK_BTN} h={LINK_BTN_HOVER}>
          <span>{cta}</span>
          <span>→</span>
        </Hv>
      </div>
    </div>
  )
}

function PageDevOverview({ go }) {
  return (
    <div style={sx('background:var(--hw-white);color:var(--hw-black);font-family:var(--font-body)')}>
      <section data-screen-label="Development — Hero" style={sx(`position:relative;overflow:hidden;min-height:clamp(480px,50vw,720px);background:var(--hw-brown) url('${P}HW_Photo_Construction-Aerial-Dusk.jpg') center 55%/cover no-repeat;display:flex;align-items:flex-end`)}>
        <div style={sx('position:absolute;inset:0;background:rgba(58,35,22,.5)')} />
        <div style={sx('position:relative;padding:clamp(32px,4vw,56px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:18px;max-width:820px;color:var(--hw-white)')}>
          <p style={sx(`margin:0;${MONO};font-size:clamp(14px,1.2vw,18px)`)}>Development</p>
          <h1 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(40px,5vw,72px);line-height:1;letter-spacing:-.025em;text-wrap:balance')}>Rental housing, built for the long term.</h1>
          <p style={sx('margin:0;max-width:640px;font-size:clamp(18px,1.5vw,22px);line-height:1.5;text-wrap:pretty')}>
            New purpose-built rental communities in supply-constrained North American markets, designed and built for decades of ownership.
          </p>
        </div>
      </section>

      <section data-screen-label="Development — Overview" style={sx(SECTION)}>
        <div data-do-2="" style={sx(TWO_COL)}>
          <div style={sx('display:flex;flex-direction:column;gap:18px')}>
            <p style={sx(EYEBROW)}>01 · Overview</p>
            <h2 style={sx(H2)}>One integrated team, from site to stabilized building.</h2>
          </div>
          <p style={sx(LEAD)}>
            We are not merchant builders. Investment, design, construction and operations sit on one platform, so every decision is made for the decades a building will stand: lower operating costs, healthier homes and a building that stays competitive long after it opens.
          </p>
        </div>
      </section>

      <section data-screen-label="Development — How we build" style={sx(SECTION_COL)}>
        <SectionHead
          eyebrow="02 · How we build"
          title="One system, from sourcing to stabilization."
          lead="Every building follows the same development and design process, so each one improves on the last."
          cta="Explore how we build"
          onCta={() => go('development/design')}
        />
        <div style={sx(`width:100%;aspect-ratio:21/9;background:var(--hw-brown) url('${P}HW_Photo_Design-Review-Plans.jpg') center 40%/cover no-repeat`)} />
        <div data-do-steps="" style={sx('display:grid;grid-template-columns:repeat(5,minmax(0,1fr));border-top:1px solid var(--hw-black)')}>
          {STEPS.map(([n, k, t], i) => (
            <div key={n} style={sx(`padding:20px 20px 0;border-left:${i ? '1px solid var(--hw-black)' : '0'};display:flex;flex-direction:column;gap:10px`)}>
              <span style={sx('font-family:var(--font-subhead);font-size:32px;color:var(--hw-terracotta)')}>{n}</span>
              <span style={sx(`${MONO};font-size:13px;opacity:.7`)}>{k}</span>
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(18px,1.6vw,21px);line-height:1.15')}>{t}</span>
            </div>
          ))}
        </div>
      </section>

      <section data-screen-label="Development — Standards" style={sx(SECTION_COL)}>
        <SectionHead
          eyebrow="03 · Our standards"
          title="Built to last. Designed to perform."
          lead="Efficient, durable and healthy buildings cost less to run, stay competitive for longer and are better to live in."
          cta="See our standards"
          onCta={() => go('development/standards')}
        />
      </section>

      <section data-screen-label="Development — Projects" style={sx(SECTION_COL)}>
        <SectionHead
          eyebrow="04 · Projects"
          title="Communities in our pipeline."
          lead="From approvals to completion, a look at what we are building across Canada and the United States."
          cta="View all projects"
          onCta={() => go('development/projects')}
        />
        <div data-do-3="" style={sx('display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px')}>
          {PROJECTS.map((p) => (
            <button key={p.r} type="button" onClick={() => go(p.r)} style={sx('display:flex;flex-direction:column;gap:12px;background:none;border:0;padding:0;cursor:pointer;text-align:left;color:var(--hw-black);font-family:var(--font-body)')}>
              <div style={sx(`width:100%;aspect-ratio:4/3;background:var(--hw-brown) url('${p.img}') ${p.pos}/cover no-repeat`)} />
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:22px')}>{p.name}</span>
              <span style={sx(`${MONO};font-size:12px;color:var(--hw-teal)`)}>{p.loc}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default PageDevOverview
