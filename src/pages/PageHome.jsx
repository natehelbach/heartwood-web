import { useEffect, useState } from 'react'
import { Hv, sx, DotField } from '../design/ui.jsx'
import HW_DATA from '../design/site-data.js'

// Ported from ui_kits/website/PageHome.dc.html.

const MONO = 'font-family:var(--font-subhead);font-weight:500;text-transform:uppercase'
// Card underline and label colour (the design's "CTA colour" option, set to Black).
const CTA_C = 'var(--hw-black)'

const PILLAR = 'margin:clamp(64px,7vw,96px) clamp(20px,3vw,40px) 0;padding-top:40px;border-top:1.5px solid var(--hw-black);display:flex;flex-wrap:wrap;gap:clamp(28px,3.4vw,48px)'
const PILLAR_LINK = `align-self:flex-start;background:none;border:0;padding:0;cursor:pointer;color:var(--hw-black);${MONO};font-size:14px`
const CARD = 'display:flex;flex-direction:column;gap:10px;padding:0;border:0;background:none;cursor:pointer;text-align:left;color:var(--hw-black);font-family:var(--font-body);transition:transform .25s ease,color .2s'
const CARD_HOVER = 'color:var(--hw-terracotta);transform:translateY(-4px)'
const ARROW_BTN = 'width:44px;height:44px;display:flex;align-items:center;justify-content:center;border:1.5px solid var(--hw-black);background:none;cursor:pointer;color:var(--hw-black);font-size:18px'

const STRATEGIES = [
  { kind: 'Growth strategy · Build to Hold', big: 'Build.', bg: 'var(--hw-cool-grey)', img: '/assets/photography/HW_Photo_Timber-Townhomes-Courtyard.png', pos: 'center 85%', ring: '/assets/logos/HW_Growth_Ring_White.png', word: 'Growth', label: 'Growth strategy', r: 'investment/growth-strategy' },
  { kind: 'Income strategy · Buy to Hold', big: 'Buy.', bg: 'var(--hw-hemlock)', img: '/assets/photography/HW_Photo_517-W-Main_Facade-Trees.jpg', pos: 'center', ring: '/assets/logos/HW_Income_Ring_White.png', word: 'Income', label: 'Income strategy', r: 'investment/income-strategy' },
]

// Development carousel: Growth projects with a rendering, three at a time.
const DEV = HW_DATA.projects
  .filter((p) => p.strategy === 'Growth' && p.img)
  .map((p) => ({ ...p, short: p.name.replace(/ (Avenue|Street|Road|Drive|Lane)( East| West| North)?$/, (m) => (m.includes('Lane') ? ' Lane' : '')) }))

function Pillar({ n, title, line, children, links }) {
  return (
    <div style={sx('flex:1 1 280px;display:flex;flex-direction:column;gap:18px')}>
      <span style={sx(`${MONO};font-size:14px;color:var(--hw-terracotta)`)}>{n}</span>
      <h2 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(34px,3.4vw,48px);line-height:1;letter-spacing:-.02em')}>{title}</h2>
      <p style={sx('margin:0;font-size:18px;line-height:1.5;text-wrap:pretty')}>{line}</p>
      {links}
      {children}
    </div>
  )
}

function CardLabel({ children }) {
  return (
    <span style={sx(`display:flex;justify-content:space-between;align-items:center;gap:12px;width:100%;box-sizing:border-box;padding:14px 0 12px;border-bottom:1.5px solid ${CTA_C};color:${CTA_C};${MONO};font-size:14px;letter-spacing:.02em`)}>
      {children}
      <span aria-hidden="true">→</span>
    </span>
  )
}

function PageHome({ go }) {
  const nav = (r) => () => go(r)
  const [devI, setDevI] = useState(0)
  const [devPaused, setDevPaused] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      if (!devPaused) setDevI((i) => i + 1)
    }, 5000)
    return () => clearInterval(t)
  }, [devPaused])

  const dn = DEV.length || 1
  const di = ((devI % dn) + dn) % dn
  const devSlides = [0, 1, 2].slice(0, Math.min(3, DEV.length)).map((o) => DEV[(di + o) % dn])
  const pad = (v) => String(v).padStart(2, '0')

  return (
    <div style={sx('background:var(--hw-white);color:var(--hw-black);font-family:var(--font-body)')}>
      <div data-scroll-track="landing" data-screen-label="Home — Hero" style={sx('position:relative;height:200vh')}>
        <div style={sx("position:sticky;top:0;height:100vh;height:100svh;overflow:clip;background:#212121 url('/assets/website/landing-image.webp') center/cover no-repeat")}>
          <div style={sx('position:absolute;top:var(--nav-h,82px);left:0;right:0;bottom:0;overflow:hidden')}>
            <DotField preset="landing" />
            <p style={sx('position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:clamp(16rem,30vw,26rem);margin:0;font-family:var(--font-subhead);font-weight:500;text-transform:uppercase;font-size:clamp(0.875rem,1.15vw,1.5rem);line-height:1.5;color:#F9F9F9;text-align:center;text-wrap:pretty;pointer-events:none')}>
              Heartwood is a Real Estate Investment Manager
            </p>
            <p style={sx('position:absolute;bottom:clamp(1.5rem,4vh,3rem);left:30px;margin:0;font-family:var(--font-subhead);font-weight:500;text-transform:uppercase;font-size:clamp(0.875rem,1.15vw,1.5rem);line-height:1.15;color:#F9F9F9;pointer-events:none')}>
              Future<br />built.
            </p>
          </div>
        </div>
      </div>

      <section data-screen-label="Home — Who we are" style={sx('padding:clamp(56px,6vw,96px) clamp(20px,3vw,40px) 0;display:flex;flex-wrap:wrap;gap:clamp(28px,4.4vw,64px);align-items:flex-end')}>
        <h1 style={sx('flex:3 1 520px;margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(40px,6vw,88px);line-height:1;letter-spacing:-.03em;text-wrap:balance')}>
          An investment manager with institutional rigour and entrepreneurial pace.
        </h1>
        <p style={sx('flex:2 1 320px;margin:0;font-size:clamp(18px,1.4vw,20px);line-height:1.5;text-wrap:pretty')}>
          Heartwood is a real estate investment manager focused on purpose-built rental housing. One integrated team invests, develops and manages, bringing disciplined strategy, thoughtful design and hands-on operations to every building. The result is resilient assets, healthy communities and lasting value for our investors.
        </p>
      </section>

      <section data-screen-label="Home — Investment" style={sx(PILLAR)}>
        <Pillar n="01" title="Investment" line="Two strategies in purpose-built rental housing.">
          <Hv as="button" onClick={nav('investment/overview')} s={PILLAR_LINK} h="color:var(--hw-terracotta)">Explore our strategies →</Hv>
        </Pillar>
        <div style={sx('flex:2 1 560px;min-width:0')}>
          <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:16px')}>
            {STRATEGIES.map((st) => (
              <Hv key={st.r} as="button" onClick={nav(st.r)} s="display:flex;flex-direction:column;padding:0;border:0;background:none;cursor:pointer;text-align:left;color:var(--hw-white);transition:transform .25s ease,opacity .25s ease" h="transform:translateY(-4px);opacity:.92">
                <span style={sx(`width:100%;box-sizing:border-box;background:${st.bg};padding:28px 24px 20px;display:flex;flex-direction:column;gap:6px`)}>
                  <span style={sx(`${MONO};font-size:12px;letter-spacing:.04em`)}>{st.kind}</span>
                  <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(56px,6vw,84px);line-height:.95;letter-spacing:-.04em')}>{st.big}</span>
                </span>
                <span style={sx(`position:relative;display:block;width:100%;aspect-ratio:4/3;background:var(--hw-cool-grey) url('${st.img}') ${st.pos}/cover no-repeat`)}>
                  <span style={sx('position:absolute;inset:0;background:linear-gradient(0deg,rgba(33,33,33,.55),rgba(33,33,33,0) 40%)')} />
                  <span style={sx('position:absolute;left:24px;bottom:24px;display:flex;align-items:center;gap:14px')}>
                    <img src={st.ring} alt="" style={sx('height:clamp(44px,4.4vw,64px);width:auto;display:block')} />
                    <span style={sx('font-family:var(--font-display);font-weight:900;font-size:clamp(28px,2.8vw,40px);line-height:.85;text-transform:uppercase')}>{st.word}</span>
                  </span>
                </span>
                <CardLabel>{st.label}</CardLabel>
              </Hv>
            ))}
          </div>
        </div>
      </section>

      <section data-screen-label="Home — Development" style={sx(PILLAR)}>
        <Pillar n="02" title="Development" line="New rental homes, from zoning through construction.">
          <Hv as="button" onClick={nav('development/design')} s={PILLAR_LINK} h="color:var(--hw-terracotta)">How we develop →</Hv>
        </Pillar>
        <div onMouseEnter={() => setDevPaused(true)} onMouseLeave={() => setDevPaused(false)} style={sx('flex:2 1 560px;min-width:0;display:flex;flex-direction:column;gap:20px')}>
          <div data-m-one="" style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:16px')}>
            {devSlides.map((p) => (
              <Hv key={p.slug} as="button" onClick={nav('properties/' + p.slug)} s={CARD} h={CARD_HOVER}>
                <span style={sx(`position:relative;display:block;width:100%;aspect-ratio:3/4;background:var(--hw-cool-grey) url('${p.img}') center/cover no-repeat`)} />
                <span style={sx('font-family:var(--font-display);font-weight:500;font-size:20px')}>{p.short}</span>
                <CardLabel>View project</CardLabel>
              </Hv>
            ))}
          </div>
          <div style={sx('display:flex;align-items:center;justify-content:space-between;gap:16px')}>
            <span style={sx(`${MONO};font-size:13px`)}>{pad(di + 1)} / {pad(DEV.length)}</span>
            <div style={sx('display:flex;gap:8px')}>
              <Hv as="button" onClick={() => setDevI((i) => i - 1)} aria-label="Previous projects" s={ARROW_BTN} h="background:var(--hw-black);color:var(--hw-white)">←</Hv>
              <Hv as="button" onClick={() => setDevI((i) => i + 1)} aria-label="Next projects" s={ARROW_BTN} h="background:var(--hw-black);color:var(--hw-white)">→</Hv>
            </div>
          </div>
        </div>
      </section>

      <section data-screen-label="Home — Management" style={sx(`${PILLAR};margin-bottom:clamp(72px,8vw,120px)`)}>
        <Pillar
          n="03"
          title="Management"
          line="Completed buildings we operate for the long term."
          links={
            <div style={sx('display:flex;flex-wrap:wrap;gap:12px 28px')}>
              <Hv as="button" onClick={nav('management/asset')} s={PILLAR_LINK} h="color:var(--hw-terracotta)">How we operate →</Hv>
              <Hv as="button" onClick={nav('properties')} s={PILLAR_LINK} h="color:var(--hw-terracotta)">View our properties →</Hv>
            </div>
          }
        />
        <div style={sx('flex:2 1 560px;min-width:0')}>
          <div style={sx('display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start')}>
            <div style={sx('flex:2 1 300px;min-width:0;display:flex;flex-direction:column')}>
              <Hv as="button" onClick={nav('management/asset')} s={CARD} h={CARD_HOVER}>
                <span style={sx("position:relative;display:block;width:100%;aspect-ratio:16/10;background:var(--hw-cool-grey) url('/assets/photography/HW_MassTimber_Studio.jpg') center/cover no-repeat")} />
                <span style={sx('font-family:var(--font-display);font-weight:500;font-size:20px')}>Operating rental communities</span>
                <span style={sx('font-size:15px;color:var(--hw-black)')}>Leased, maintained and improved for the long term</span>
                <CardLabel>How we operate</CardLabel>
              </Hv>
            </div>
            <div style={sx('flex:1 1 180px;min-width:0;display:flex;flex-direction:column')}>
              <Hv as="button" onClick={nav('management/asset')} s={CARD} h={CARD_HOVER}>
                <span style={sx("position:relative;display:block;width:100%;aspect-ratio:3/4;background:var(--hw-cool-grey) url('/assets/photography/HW_Photo_Fitness-Gym.jpg') center/cover no-repeat")} />
                <span style={sx('font-family:var(--font-display);font-weight:500;font-size:20px')}>Resident life</span>
                <span style={sx('font-size:15px;color:var(--hw-black)')}>Amenities and services for residents</span>
                <CardLabel>The resident experience</CardLabel>
              </Hv>
            </div>
          </div>
        </div>
      </section>

      <section data-screen-label="Home — Platform deck CTA" style={sx('background:var(--hw-terracotta);color:var(--hw-white);padding:clamp(48px,5vw,88px) clamp(20px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(32px,4vw,64px);align-items:center')}>
        <div style={sx('display:flex;flex-direction:column;justify-content:center;align-self:stretch')}>
          <p style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(32px,3.6vw,52px);line-height:1.08;letter-spacing:-.015em;max-width:640px;text-wrap:balance')}>Build the next generation of real estate with us.</p>
        </div>
        <div style={sx('display:flex;flex-direction:column;gap:24px')}>
          <p style={sx('margin:0;max-width:520px;font-size:clamp(17px,1.4vw,20px);line-height:1.5')}>
            Meet with our investment team to review our funds, strategy and track record. We work with financial advisors, private investors and institutions, and tailor each conversation to your mandate.
          </p>
          <Hv as="button" onClick={nav('investment/meeting')} s="align-self:flex-start;padding:16px 26px;background:var(--hw-black);color:var(--hw-white);border:0;cursor:pointer;font-family:var(--font-subhead);font-weight:500;font-size:15px;letter-spacing:.02em;text-transform:uppercase" h="background:var(--hw-terracotta)">
            Book a discovery meeting →
          </Hv>
        </div>
      </section>
    </div>
  )
}

export default PageHome
