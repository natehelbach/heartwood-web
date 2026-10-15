import { Hv, sx } from '../design/ui.jsx'

// The "404 · Page not found" section from Heartwood Website.dc.html and PageInsights.dc.html.
// `actions` is [primary, secondary], each { label, go }.

const BTN = 'padding:14px 22px;cursor:pointer;font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase'

function NotFound({ actions }) {
  const [primary, secondary] = actions
  return (
    <section data-screen-label="Not found" style={sx('min-height:60vh;box-sizing:border-box;padding:clamp(64px,9vw,140px) clamp(20px,3vw,40px);display:flex;flex-direction:column;justify-content:center;gap:24px')}>
      <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:15px;text-transform:uppercase;color:var(--hw-terracotta)')}>404 · Page not found</p>
      <h1 style={sx('margin:0;max-width:760px;font-family:var(--font-display);font-weight:500;font-size:clamp(40px,5.4vw,72px);line-height:1;letter-spacing:-.025em;text-wrap:balance')}>We couldn’t find that page.</h1>
      <p style={sx('margin:0;max-width:560px;font-size:clamp(17px,1.35vw,20px);line-height:1.5')}>The link may be out of date, or the address may have a typo.</p>
      <div style={sx('display:flex;flex-wrap:wrap;gap:12px')}>
        <Hv as="button" type="button" onClick={primary.go} s={`${BTN};border:0;background:var(--hw-black);color:var(--hw-white)`} h="background:var(--hw-terracotta)">{primary.label}</Hv>
        <Hv as="button" type="button" onClick={secondary.go} s={`${BTN};border:1.5px solid var(--hw-black);background:none;color:var(--hw-black)`} h="border-color:var(--hw-terracotta);color:var(--hw-terracotta)">{secondary.label}</Hv>
      </div>
    </section>
  )
}

export default NotFound
