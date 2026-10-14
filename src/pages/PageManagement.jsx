import { Hv, sx } from '../design/ui.jsx'

// Ported from ui_kits/website/PageManagement.dc.html (Management › Asset Management).

const MONO = 'font-family:var(--font-subhead);font-weight:500;text-transform:uppercase'

const APPROACH = [
  { n: '01', k: 'Spaces', v: 'Common areas designed for connection and community.' },
  { n: '02', k: 'Well-being', v: 'Health and well-being features for residents.' },
  { n: '03', k: 'Stewardship', v: 'Within two years of acquisition, a plan to bring each building up to our environmental standard.' },
  { n: '04', k: 'Systems', v: 'Our management workflow and building data, applied from day one.' },
]

function PageManagement({ go }) {
  return (
    <div style={sx('background:var(--hw-white);color:var(--hw-black);font-family:var(--font-body)')}>
      <section data-screen-label="Management — Hero" style={sx("position:relative;overflow:hidden;height:clamp(420px,42vw,640px);background:var(--hw-brown) url('/assets/photography/HW_MassTimber_Studio.jpg') center/cover no-repeat")}>
        <div style={sx('position:absolute;inset:0;background:var(--overlay-brown)')} />
        <div style={sx('position:absolute;left:0;right:0;bottom:0;padding:clamp(40px,5vw,72px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:20px;color:var(--hw-white)')}>
          <p style={sx(`margin:0;${MONO};font-size:clamp(14px,1.2vw,18px)`)}>Asset Management</p>
          <h1 style={sx('margin:0;max-width:900px;font-family:var(--font-display);font-weight:500;font-size:clamp(36px,4.8vw,72px);line-height:1.02;letter-spacing:-.02em;text-wrap:balance')}>We operate every building like we built it.</h1>
        </div>
      </section>
      <section data-screen-label="Management — Approach" style={sx('padding:clamp(56px,6vw,96px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:clamp(36px,4vw,56px)')}>
        <p style={sx('margin:0;max-width:760px;font-size:clamp(19px,1.6vw,24px);line-height:1.45;text-wrap:pretty')}>
          Whether we built a building or bought it, we apply the same thinking that shapes our new buildings. The goal is a better resident experience, more efficient operations and stronger long-term value.
        </p>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:clamp(20px,2.4vw,36px)')}>
          {APPROACH.map((a) => (
            <div key={a.n} style={sx('display:flex;flex-direction:column;gap:12px;padding-top:20px;border-top:1.5px solid var(--hw-black)')}>
              <span style={sx(`${MONO};font-size:14px;color:var(--hw-terracotta)`)}>{a.n}</span>
              <h2 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.2vw,30px)')}>{a.k}</h2>
              <p style={sx('margin:0;font-size:18px;line-height:1.5')}>{a.v}</p>
            </div>
          ))}
        </div>
        <figure style={sx('margin:0;display:flex;flex-direction:column;gap:12px')}>
          <div style={sx("aspect-ratio:16/9;background:var(--hw-cool-grey) url('/assets/photography/HW_Photo_Fitness-Gym.jpg') center/cover no-repeat")} />
          <figcaption style={sx('font-size:18px;font-style:italic')}>On-site fitness, part of everyday life</figcaption>
        </figure>
        <div style={sx('display:flex;flex-wrap:wrap;gap:12px')}>
          <Hv as="button" onClick={() => go('development/projects')} s={`padding:16px 24px;background:var(--hw-black);color:var(--hw-white);border:1.5px solid var(--hw-black);cursor:pointer;${MONO};font-size:14px`} h="background:var(--hw-teal);border-color:var(--hw-teal)">
            See our properties →
          </Hv>
          <Hv as="button" onClick={() => go('investment/income-strategy')} s={`padding:16px 24px;background:transparent;color:var(--hw-black);border:1.5px solid var(--hw-black);cursor:pointer;${MONO};font-size:14px`} h="background:var(--hw-black);color:var(--hw-white)">
            Income strategy
          </Hv>
        </div>
      </section>
    </div>
  )
}

export default PageManagement
