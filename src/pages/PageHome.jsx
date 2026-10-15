import { useState } from 'react'
import { Hv, sx, DotField } from '../design/ui.jsx'

// Ported from ui_kits/website/PageHome.dc.html.

const MONO = 'font-family:var(--font-subhead);font-weight:500;text-transform:uppercase'
const EYEBROW = `margin:0;${MONO};font-size:15px;color:var(--hw-terracotta)`
const DISPLAY = 'margin:0;font-family:var(--font-display);font-weight:500;letter-spacing:-.025em;line-height:1;text-wrap:balance'
const BLACK_BTN = `padding:16px 24px;background:var(--hw-black);color:var(--hw-white);border:0;cursor:pointer;${MONO};font-size:14px`

const TREE_LABEL = 'font-family:var(--font-subhead);font-weight:500;font-size:clamp(11px,.9vw,13px);letter-spacing:.04em;text-transform:uppercase;color:#212121;white-space:nowrap;background:#F9F9F9;padding:2px 4px'
const CHIP_LABEL = 'color:#212121;background:var(--hw-cool-grey);padding:4px 9px;font-family:var(--font-display);font-weight:500;font-size:clamp(12px,1vw,15px);line-height:1.2;white-space:nowrap'
const RING_CELL = 'flex:0 1 440px;min-width:0;box-sizing:border-box;width:100%;max-width:440px;display:flex;flex-direction:column;align-items:center;gap:clamp(56px,6vw,80px);padding:56px clamp(56px,7vw,110px) 40px'

const I = '/assets/project-renders/innovation/'
const R = '/assets/project-renders/'

const FLIPS = [
  { short: 'Buildings', title: 'Resilient Buildings', body: 'We own comfortable, durable, and nurturing buildings that support resident well-being where people love to live long term.', img: R + 'HW_Render_3385-Lawrence.jpg' },
  { short: 'Communities', title: 'Resilient Communities', body: 'Making community part of the place you live. Spaces and programming bringing humans together, so residents can thrive.', img: I + 'HW_Innovation_Community-Space.jpg' },
  { short: 'Investments', title: 'Resilient Investments', body: 'Investments focused on quality, desirability, and effective management are resilient through economic cycles. Places people want to live produce portfolios with durable value for investors.', img: R + 'HW_Render_360-Kennedy-Lane.jpg' },
]

const WHAT_WE_DO = [
  { n: '01', k: 'Investing', v: 'Growth and Income strategies for investors who want durable, long-term exposure to rental housing.', t: 'Growth · Income' },
  { n: '02', k: 'Developing', v: 'New rental communities, sourced with data and built on a proven system of components.', t: 'Sourcing · Design · Construction' },
  { n: '03', k: 'Managing', v: 'Hospitality-focused operations and measured performance across every building we own.', t: 'Leasing · Operations · Reporting' },
]

const NEXT = [
  { k: 'For Investors', v: 'Private wealth, advisors and institutions.', b: 'Go to For Investors', r: 'investors/private-wealth' },
  { k: 'Development', v: 'How we build, and the projects in our pipeline.', b: 'Go to Development', r: 'development/design' },
  { k: 'Asset Management', v: 'How we operate and improve our buildings.', b: 'Go to Asset Management', r: 'management/asset' },
]

// A vertical leader line with a label at its top or bottom end.
function Leader({ left, top, height, side, end, label, labelStyle }) {
  return (
    <div style={sx(`position:absolute;left:${left};top:${top};height:${height};border-left:1px solid #212121`)}>
      <span style={sx(`position:absolute;${labelStyle};${side}:10px;${end}:0;transform:translateY(${end === 'top' ? '-50%' : '50%'})`)}>{label}</span>
    </div>
  )
}

function PageHome({ go }) {
  const nav = (r) => () => go(r)
  const [flip, setFlip] = useState(0)
  const fi = ((flip % 3) + 3) % 3
  const cur = FLIPS[fi]

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

      <section data-screen-label="Home — Who we are" style={sx('padding:clamp(72px,9vw,128px) clamp(20px,3vw,40px) clamp(32px,4vw,56px);display:flex;flex-direction:column;gap:clamp(24px,3vw,40px);align-items:center;text-align:center')}>
        <p style={sx(EYEBROW)}>Who we are</p>
        <h1 style={sx(`${DISPLAY};max-width:1080px;font-size:clamp(34px,4.6vw,68px)`)}>
          The future is built on expertise, intelligence and innovation. We create durable investment value through healthy, beautiful and resilient real estate.
        </h1>
      </section>

      <section data-screen-label="Home — Heartwood rings" style={sx('padding:clamp(24px,3vw,48px) clamp(20px,3vw,40px) 0;overflow:hidden')}>
        <div data-hw-rings="" style={sx('display:flex;flex-wrap:nowrap;align-items:center;justify-content:center;gap:clamp(16px,2vw,32px)')}>
          <div style={sx(RING_CELL)}>
            <div style={sx('position:relative;aspect-ratio:1/1;width:100%;max-width:300px')}>
              <div style={sx("position:absolute;inset:0;border-radius:50%;background:#3A2316 url('/assets/brand/HW_Tree-Rings-Texture.png') 49% 49%/165% no-repeat;box-shadow:inset 0 0 0 clamp(4px,.6vw,8px) #3A2316")} />
              <Leader left="70.7%" top="-14%" height="19.6%" side="left" end="top" label="Bark" labelStyle={TREE_LABEL} />
              <Leader left="32.7%" top="-6%" height="18.8%" side="right" end="top" label="Sapwood" labelStyle={TREE_LABEL} />
              <Leader left="35.5%" top="75.1%" height="34.9%" side="right" end="bottom" label="Growth rings" labelStyle={TREE_LABEL} />
              <Leader left="50%" top="50%" height="68%" side="left" end="bottom" label="Heartwood" labelStyle={TREE_LABEL} />
            </div>
            <div style={sx('display:flex;flex-direction:column;align-items:center;gap:10px')}>
              <span style={sx(`${MONO};font-size:12px`)}>The heartwood of a tree</span>
              <p style={sx('margin:0;max-width:340px;font-size:17px;line-height:1.5;text-wrap:pretty')}>The dense inner core, formed slowly and strong enough to hold the living system around it.</p>
            </div>
          </div>
          <div data-hw-arrow="" style={sx('flex:none;width:96px;height:3px;background:var(--hw-terracotta);position:relative')}>
            <span style={sx('position:absolute;right:-4px;top:-9px;border-left:20px solid var(--hw-terracotta);border-top:10.5px solid transparent;border-bottom:10.5px solid transparent')} />
          </div>
          <div style={sx(RING_CELL)}>
            <div style={sx('position:relative;aspect-ratio:1/1;width:100%;max-width:300px')}>
              <hw-dots mode="rings" count="380" seed="9" color="#212121" size=".6" style={sx('position:absolute;inset:0;pointer-events:none')} />
              <Leader left="69.3%" top="-14%" height="22.7%" side="left" end="top" label="Performance" labelStyle={CHIP_LABEL} />
              <Leader left="36.2%" top="-6%" height="26.5%" side="right" end="top" label="Resilient real estate" labelStyle={CHIP_LABEL} />
              <Leader left="39.9%" top="67.5%" height="42.5%" side="right" end="bottom" label="Investment value" labelStyle={CHIP_LABEL} />
              <Leader left="50%" top="50%" height="68%" side="left" end="bottom" label="Expertise · Intelligence · Innovation" labelStyle={`${CHIP_LABEL};white-space:normal;width:max-content;max-width:min(220px,40vw)`} />
            </div>
            <div style={sx('display:flex;flex-direction:column;align-items:center;gap:10px')}>
              <span style={sx(`${MONO};font-size:12px`)}>The heartwood of our platform</span>
              <p style={sx('margin:0;max-width:340px;font-size:17px;line-height:1.5;text-wrap:pretty')}>At our core, expertise, intelligence and innovation. We build and own resilient real estate, which leads to performance.</p>
            </div>
          </div>
        </div>
        <div style={sx('display:flex;justify-content:center;padding:clamp(24px,3vw,40px) 0 0')}>
          <Hv as="button" type="button" onClick={nav('about/who')} s={BLACK_BTN} h="background:var(--hw-terracotta)">Learn who we are →</Hv>
        </div>
      </section>

      <section data-screen-label="Home — Resilient trio" style={sx('margin-top:clamp(72px,8vw,112px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));min-height:clamp(480px,48vw,640px)')}>
        <div style={sx('padding:clamp(40px,5vw,72px) clamp(20px,3vw,40px);display:flex;flex-direction:column;justify-content:space-between;gap:40px')}>
          <div style={sx('display:flex;flex-direction:column;gap:24px')}>
            <p style={sx(EYEBROW)}>0{fi + 1} / 03</p>
            <h2 style={sx(`${DISPLAY};font-size:clamp(40px,5vw,72px)`)}>{cur.title}</h2>
            <p style={sx('margin:0;max-width:520px;font-size:clamp(18px,1.5vw,21px);line-height:1.5;text-wrap:pretty')}>{cur.body}</p>
          </div>
          <div style={sx('display:flex;flex-wrap:wrap;gap:10px;align-items:center')}>
            {FLIPS.map((f, i) => (
              <button key={f.short} type="button" aria-pressed={i === fi} onClick={() => setFlip(i)} style={sx(`min-height:46px;padding:0 18px;background:${i === fi ? 'var(--hw-black)' : 'transparent'};color:${i === fi ? 'var(--hw-white)' : 'var(--hw-black)'};border:1.5px solid var(--hw-black);cursor:pointer;${MONO};font-size:13px`)}>
                {f.short}
              </button>
            ))}
            <Hv as="button" type="button" onClick={() => setFlip((v) => v + 1)} aria-label="Next" s="width:46px;height:46px;border:1.5px solid var(--hw-black);background:none;color:var(--hw-black);cursor:pointer;font-size:18px" h="background:var(--hw-black);color:var(--hw-white)">→</Hv>
          </div>
        </div>
        <div style={sx(`min-height:360px;background:var(--hw-brown) url('${cur.img}') center/cover no-repeat;transition:background-image .3s`)} />
      </section>

      <section data-screen-label="Home — What we do" style={sx('margin:clamp(72px,8vw,112px) clamp(20px,3vw,40px) 0;display:flex;flex-direction:column;gap:clamp(32px,4vw,56px)')}>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:24px 64px;align-items:end')}>
          <div style={sx('display:flex;flex-direction:column;gap:20px')}>
            <p style={sx(EYEBROW)}>What we do</p>
            <h2 style={sx(`${DISPLAY};font-size:clamp(36px,4.2vw,60px)`)}>We invest in, develop and manage living assets.</h2>
          </div>
          <p style={sx('margin:0;max-width:460px;font-size:clamp(18px,1.4vw,20px);line-height:1.5;text-wrap:pretty')}>One integrated team on one data-driven system, from sourcing to stabilization and for the decades after.</p>
        </div>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:16px')}>
          {WHAT_WE_DO.map((w) => (
            <div key={w.n} style={sx('background:var(--hw-cool-grey);padding:32px 28px 28px;display:flex;flex-direction:column;gap:20px;min-height:clamp(340px,30vw,420px)')}>
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(88px,9vw,132px);line-height:.8;letter-spacing:-.05em;color:var(--hw-terracotta)')}>{w.n}</span>
              <span style={sx('display:block;width:48px;height:3px;background:var(--hw-black);margin-top:12px')} />
              <span style={sx(`${DISPLAY};font-size:clamp(30px,2.8vw,40px)`)}>{w.k}</span>
              <span style={sx('flex:1;font-size:17px;line-height:1.5;text-wrap:pretty')}>{w.v}</span>
              <span style={sx(`${MONO};font-size:12px;padding-top:14px;border-top:1px solid var(--hw-black)`)}>{w.t}</span>
            </div>
          ))}
        </div>
      </section>

      <section data-screen-label="Home — Where to next" style={sx('padding:clamp(72px,8vw,112px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:28px')}>
        <p style={sx(EYEBROW)}>Where to next</p>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:16px')}>
          {NEXT.map((c) => (
            <div key={c.k} style={sx('display:flex;flex-direction:column;justify-content:space-between;gap:40px;padding:32px;border:1.5px solid var(--hw-black);min-height:240px')}>
              <div style={sx('display:flex;flex-direction:column;gap:12px')}>
                <h3 style={sx(`${DISPLAY};font-size:clamp(30px,2.8vw,40px)`)}>{c.k}</h3>
                <p style={sx('margin:0;font-size:17px;line-height:1.5')}>{c.v}</p>
              </div>
              <Hv as="button" type="button" onClick={nav(c.r)} s={`align-self:flex-start;${BLACK_BTN}`} h="background:var(--hw-terracotta)">{c.b} →</Hv>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default PageHome
