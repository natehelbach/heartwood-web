import { Hv, sx, DotField } from '../design/ui.jsx'

// Ported from ui_kits/website/PageHome.dc.html.

const MONO = 'font-family:var(--font-subhead);font-weight:500;text-transform:uppercase'
const DISPLAY = 'margin:0;font-family:var(--font-display);font-weight:500;letter-spacing:-.025em;line-height:1.05;text-wrap:balance'
const EYEBROW = `margin:0;${MONO};font-size:15px;color:var(--hw-terracotta)`
const LINK_BTN = `min-width:min(100%,300px);display:flex;justify-content:space-between;gap:24px;padding:14px 0 12px;background:none;border:0;border-bottom:1.5px solid var(--hw-black);color:var(--hw-black);cursor:pointer;${MONO};font-size:14px`

// Labels stacked over the rings in the "How we think" panel; the last sits on the core.
const RING_LABEL = "position:absolute;left:50%;transform:translateX(-50%);font-family:var(--font-display);font-weight:500;font-size:16px;letter-spacing:-.01em;color:#F9F9F9;text-align:center;white-space:nowrap"
const RING_LABELS = [
  { t: 'Unstructured data', s: 'top:6%' },
  { t: 'Structured data', s: 'top:22%' },
  { t: 'Advanced analytics', s: 'top:38%' },
]

const TRIO = [
  { title: 'Resilient Buildings', img: '/assets/photography/HW_Photo_Timber-Open-Plan.jpg', tint: true, body: 'Homes that are comfortable, durable, and efficient to operate — clean air, natural light, and stable temperatures that make people want to stay.' },
  { title: 'Resilient Communities', img: '/assets/lifestyle/HW_Lifestyle_10.jpg', tint: false, body: 'Making community part of the place you live. Spaces and programming bringing humans together, so residents can thrive.' },
  { title: 'Resilient Investments', img: '/assets/project-renders/HW_Render_353-Sherbourne.jpg', tint: true, body: 'Investments focused on quality, desirability, and effective management are resilient through economic cycles. Places people want to live produce portfolios with durable value for investors.' },
]

const WHAT_WE_DO = [
  { n: '01', k: 'Investing', v: 'Growth and Income strategies for investors who want durable, long-term exposure to rental housing.', cta: 'For Investors', r: 'investment/overview' },
  { n: '02', k: 'Developing', v: 'New rental communities, sourced with data and built on a proven system of components.', cta: 'Development', r: 'development/design' },
  { n: '03', k: 'Managing', v: 'Hospitality-focused operations and measured performance across every building we own.', cta: 'Properties', r: 'properties' },
]

function PageHome({ go }) {
  return (
    <div style={sx('background:var(--hw-white);color:var(--hw-black);font-family:var(--font-body)')}>
      <div data-scroll-track="landing" data-screen-label="Home — Hero" style={sx('position:relative;height:200vh')}>
        <div style={sx("position:sticky;top:0;height:100vh;height:100svh;overflow:clip;background:#212121 url('/assets/website/landing-image.webp') center/cover no-repeat")}>
          <div style={sx('position:absolute;top:var(--nav-h,82px);left:0;right:0;bottom:0;overflow:hidden')}>
            <DotField preset="landing" />
            <p style={sx('position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:clamp(16rem,34vw,30rem);margin:0;font-family:var(--font-subhead);font-weight:500;text-transform:uppercase;font-size:clamp(0.875rem,1.15vw,1.5rem);line-height:1.5;color:#F9F9F9;text-align:center;text-wrap:pretty;pointer-events:none')}>
              Heartwood is a real estate investment manager focused on the living sector and owning high-quality assets.
            </p>
            <p style={sx('position:absolute;bottom:clamp(1.5rem,4vh,3rem);left:30px;margin:0;font-family:var(--font-subhead);font-weight:500;text-transform:uppercase;font-size:clamp(0.875rem,1.15vw,1.5rem);line-height:1.15;color:#F9F9F9;pointer-events:none')}>
              Future<br />built.
            </p>
          </div>
        </div>
      </div>

      <section data-screen-label="Home — Who we are" style={sx('padding:clamp(72px,9vw,112px) clamp(20px,3vw,40px) 0;display:flex;flex-direction:column;gap:28px')}>
        <p style={sx(EYEBROW)}>Who we are</p>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:24px 64px;align-items:end')}>
          <h1 style={sx(`${DISPLAY};font-size:clamp(34px,4.2vw,58px)`)}>One integrated team investing in, developing and managing rental housing for the long term.</h1>
          <div style={sx('display:flex;flex-direction:column;gap:24px;align-items:flex-start')}>
            <p style={sx('margin:0;max-width:520px;font-size:clamp(18px,1.4vw,20px);line-height:1.5;text-wrap:pretty')}>
              Heartwood is an investment manager focused on the living sector, building, managing and owning resilient buildings, communities and investments.
            </p>
            <Hv as="button" type="button" onClick={() => go('about/who')} s={LINK_BTN} h="color:var(--hw-terracotta);border-color:var(--hw-terracotta)">
              <span>Who we are</span>
              <span>→</span>
            </Hv>
          </div>
        </div>
        <div style={sx('position:relative;height:clamp(300px,34vw,440px);margin-top:clamp(8px,2vw,24px)')}>
          <DotField preset="approach" />
        </div>
      </section>

      <section data-screen-label="Home — How we think" style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,460px),1fr));min-height:clamp(560px,56vw,720px)')}>
        <div style={sx('padding:clamp(56px,7vw,96px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:22px')}>
          <p style={sx(`margin:0;${MONO};font-size:15px;color:var(--hw-teal)`)}>How we think about real estate</p>
          <h2 style={sx(`${DISPLAY};font-size:clamp(30px,3.4vw,48px)`)}>Real-time market, cost, demographic, climate, and building performance data in one place.</h2>
          <p style={sx('margin:0;max-width:520px;font-size:clamp(17px,1.3vw,18px);line-height:1.5;text-wrap:pretty')}>
            Our intelligence platform consolidates, validates, and organizes these sources into a single environment, resolved to a specific site across neighbourhood, municipal, and metro geographies. Letting our team see how a market, a site, and a building’s actual performance relate to one another, and make decisions with that holistic picture rather than fragments.
          </p>
          <div style={sx("width:100%;max-width:560px;aspect-ratio:16/9;margin-top:clamp(8px,1.5vw,16px);background:var(--hw-brown) url('/assets/photography/HW_Photo_Market-Intelligence-Screen.png') 35% center/cover no-repeat")} />
        </div>
        <div style={sx('position:relative;overflow:hidden;min-height:clamp(420px,48vw,720px);background:var(--hw-brown)')}>
          <div style={sx("position:absolute;inset:-20px;background:url('/assets/photography/HW_MassTimber_Suite-415_NoSign.jpg') center/cover;filter:blur(8px)")} />
          <div style={sx('position:absolute;inset:0;background:rgba(58,35,22,.25)')} />
          <hw-dots mode="rings" count="520" seed="4" color="#C5DCEA" size="1.05" style={sx('position:absolute;inset:0')} />
          {RING_LABELS.map((l) => (
            <span key={l.t} style={sx(`${RING_LABEL};${l.s}`)}>{l.t}</span>
          ))}
          <span style={sx(`${RING_LABEL};top:50%;transform:translate(-50%,-50%);color:#3A2316;white-space:normal;width:auto;line-height:1.15;font-size:17px`)}>
            Better<br />decisions
          </span>
        </div>
      </section>

      <section data-screen-label="Home — Resilience" data-hw-trio="" style={sx('margin-top:clamp(56px,7vw,96px);display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:2px')}>
        {TRIO.map((c) => (
          <div key={c.title} style={sx('position:relative;overflow:hidden;height:clamp(520px,56vw,720px);color:var(--hw-white)')}>
            <div style={sx(`position:absolute;inset:0;background:var(--hw-brown) url('${c.img}') center/cover no-repeat`)} />
            {c.tint && <div style={sx('position:absolute;inset:0;background:rgba(58,35,22,.25)')} />}
            <div style={sx('position:absolute;inset:0;background:linear-gradient(180deg,rgba(58,35,22,.35),rgba(33,33,33,.72))')} />
            <span style={sx(`position:absolute;left:28px;top:24px;${MONO};font-size:13px`)}>Resilience</span>
            <div style={sx('position:absolute;left:28px;right:28px;top:58%;display:flex;flex-direction:column;gap:16px')}>
              <h3 style={sx(`${DISPLAY};font-size:clamp(28px,2.6vw,36px)`)}>{c.title}</h3>
              <p style={sx('margin:0;font-size:clamp(16px,1.3vw,18px);line-height:1.5;text-wrap:pretty')}>{c.body}</p>
            </div>
          </div>
        ))}
      </section>

      <section data-screen-label="Home — What we do" style={sx('margin:clamp(72px,8vw,112px) clamp(20px,3vw,40px) clamp(72px,8vw,112px);display:flex;flex-direction:column;gap:clamp(32px,4vw,56px)')}>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:24px 64px;align-items:end')}>
          <div style={sx('display:flex;flex-direction:column;gap:20px')}>
            <p style={sx(EYEBROW)}>What we do</p>
            <h2 style={sx(`${DISPLAY};line-height:1;font-size:clamp(36px,4.2vw,60px)`)}>We invest in, develop and manage living assets.</h2>
          </div>
          <p style={sx('margin:0;max-width:560px;font-size:clamp(18px,1.4vw,20px);line-height:1.5;text-wrap:pretty')}>
            Investing, building, and actively managing to create value and reduce risk. Specialists in each discipline working side by side, on shared systems, maintaining consistency throughout the life cycle. One integrated team, united by one goal: to protect and grow investor capital and deliver durable returns.
          </p>
        </div>
        <div data-hw-trio="" style={sx('display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px')}>
          {WHAT_WE_DO.map((w) => (
            <Hv key={w.n} as="button" type="button" onClick={() => go(w.r)} s="background:var(--hw-cool-grey);padding:32px 28px 28px;display:flex;flex-direction:column;gap:20px;min-height:clamp(340px,30vw,420px);border:0;cursor:pointer;text-align:left;color:var(--hw-black);font-family:var(--font-body)" h="background:#b3d0e2">
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(88px,9vw,132px);line-height:.8;letter-spacing:-.05em;color:var(--hw-black)')}>{w.n}</span>
              <span style={sx('display:block;width:48px;height:3px;background:var(--hw-black);margin-top:12px')} />
              <span style={sx(`${DISPLAY};line-height:1;font-size:clamp(30px,2.8vw,40px)`)}>{w.k}</span>
              <span style={sx('flex:1;font-size:17px;line-height:1.5;text-wrap:pretty')}>{w.v}</span>
              <span style={sx(`align-self:flex-start;padding:16px 24px;background:var(--hw-black);color:var(--hw-white);${MONO};font-size:14px`)}>Go to {w.cta} →</span>
            </Hv>
          ))}
        </div>
      </section>

      <section data-screen-label="Home — Future built" style={sx('position:relative;overflow:hidden;min-height:clamp(560px,52vw,760px);color:var(--hw-white);background:var(--hw-brown)')}>
        <div style={sx("position:absolute;inset:-30px;background:url('/assets/lifestyle/HW_Lifestyle_02.jpg') center/cover no-repeat;filter:blur(12px) sepia(.45) saturate(.8) brightness(.85)")} />
        <div style={sx('position:absolute;inset:0;background:rgba(58,35,22,.28)')} />
        <hw-dots mode="scatter" count="60" seed="11" color="#C5DCEA" size=".85" style={sx('position:absolute;inset:0')} />
        <div style={sx('position:relative;padding:clamp(40px,5vw,64px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:clamp(24px,3vw,40px);max-width:760px')}>
          <h2 style={sx(`${DISPLAY};font-size:clamp(30px,3.4vw,48px)`)}>We are creating durable investment value through healthy, beautiful, and resilient real estate.</h2>
          <p style={sx(`${DISPLAY};font-size:clamp(30px,3.4vw,48px)`)}>This is the future, built.</p>
        </div>
        <p style={sx(`position:absolute;right:clamp(20px,6vw,140px);bottom:clamp(40px,6vw,96px);margin:0;${MONO};font-size:clamp(20px,2vw,28px);line-height:1.15;color:var(--hw-cool-grey)`)}>
          Future<br />built.
        </p>
      </section>
    </div>
  )
}

export default PageHome
