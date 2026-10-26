import { useState } from 'react'
import { Hv, sx } from '../design/ui.jsx'

// Ported from ui_kits/website/PageManagement.dc.html (Management › Asset Management).

const R = '/assets/project-renders/'
const PH = '/assets/photography/'

// [slug, short, loc, img]
const L = [
  ['353-sherbourne', '353 Sherbourne', 'Toronto, Ontario', R + 'HW_Render_353-Sherbourne_web.jpg'],
  ['3385-lawrence', '3385 Lawrence', 'Toronto, Ontario', R + 'HW_Render_3385-Lawrence_web.jpg'],
  ['360-kennedy', '360 Kennedy', 'Ottawa, Ontario', R + 'HW_Render_360-Kennedy-Lane.jpg'],
  ['175-oxford', '175 Oxford', 'Orillia, Ontario', PH + 'HW_Photo_175-Oxford_Townhomes-Sky.jpg'],
  ['308-parkside', '308 Parkside', 'Hamilton, Ontario', PH + 'HW_Photo_308-Parkside_Townhomes-Day.jpg'],
  ['4094-tomken', '4094 Tomken', 'Mississauga, Ontario', R + 'HW_Render_4094-Tomken-Road_web.jpg'],
  ['2102-lawrence', '2102 Lawrence', 'Toronto, Ontario', R + 'HW_Render_2102-Lawrence.jpg'],
]

const CHIP = 'padding:12px 16px;border:1px solid var(--hw-white);font-family:var(--font-subhead);font-weight:500;font-size:13px;text-transform:uppercase'
const LINK = 'width:28px;border-top:1.5px solid var(--hw-white)'
const BTN = 'padding:16px 24px;background:var(--hw-black);color:var(--hw-white);border:1.5px solid var(--hw-black);cursor:pointer;font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase'
const BTN_H = 'background:var(--hw-teal);border-color:var(--hw-teal)'

const PILLARS = [
  { n: '01', t: 'Built for connection', p: 'We create communities where residents feel connected and valued. Through thoughtful use of shared spaces, resident engagement and community programming, we foster a sense of belonging that supports satisfaction, retention and long-term occupancy.', img: '/assets/lifestyle/HW_Lifestyle_10.jpg' },
  { n: '02', t: 'Healthy living', p: 'Our experience in building design, development and operations informs how we manage every asset. We prioritize building performance, resident comfort and healthy living environments, creating homes where people want to stay.', img: PH + 'HW_MassTimber_Living-Room.jpg', filter: true },
  { n: '03', t: 'Operational efficiency', p: 'We combine development expertise, institutional property management and real-time operating data to drive asset performance. Through active oversight, disciplined capital planning and continuous evaluation of operating costs, we identify opportunities to improve efficiency, protect asset value and strengthen long-term returns.', img: PH + 'HW_Photo_Mechanical-Room-Electrical.jpg', filter: true },
]

function PageManagement({ go }) {
  const [act, setAct] = useState(1)
  const to = (r) => () => go && go(r)
  const accItems = L.map(([slug, short, loc, img], i) => ({ slug, short, name: short + ', ' + loc, loc, img, pos: slug === '175-oxford' ? 'center 72%' : 'center', size: 'cover', flex: i === act ? 5 : 1, op: i === act ? 1 : 0, hover: () => act !== i && setAct(i), open: to('properties/' + slug) }))
  const resetAcc = () => act !== 1 && setAct(1)

  return (
    <div style={sx('background:var(--hw-white);color:var(--hw-black);font-family:var(--font-body)')}>
      <section data-screen-label="Asset Management — Hero" style={sx('padding:clamp(48px,6vw,72px) clamp(20px,3vw,40px) clamp(28px,3vw,40px)')}>
        <div data-am-2="" style={sx('display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:24px clamp(32px,5vw,64px);align-items:end')}>
          <div style={sx('display:flex;flex-direction:column;gap:20px')}>
            <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase;color:var(--hw-terracotta)')}>Asset Management</p>
            <h1 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(48px,6.6vw,96px);line-height:1;letter-spacing:-.025em;text-wrap:balance')}>Operational excellence.</h1>
          </div>
          <p style={sx('margin:0;font-size:clamp(18px,1.5vw,22px);line-height:1.45;text-wrap:pretty')}>Well-run, healthy, community-focused homes attract and retain residents. Strong resident relationships, consistent occupancy and disciplined operations support predictable cash flow, long-term asset value and durable returns for our investors.</p>
        </div>
      </section>
      <section data-screen-label="Asset Management — Portfolio" style={sx('padding:0 clamp(20px,3vw,40px)')}>
        <div data-am-acc="" onMouseLeave={resetAcc} style={sx('display:flex;height:clamp(440px,44vw,640px)')}>
          {accItems.map((p) => (
            <button key={p.slug} type="button" onMouseEnter={p.hover} onFocus={p.hover} onClick={p.open} aria-label={p.name} style={sx(`position:relative;flex:${p.flex};min-width:0;padding:0;border:0;cursor:pointer;overflow:hidden;background:var(--hw-brown) url('${p.img}') ${p.pos}/${p.size} no-repeat;transition:flex .6s cubic-bezier(.6,0,.2,1);color:var(--hw-white);text-align:left`)}>
              <span style={sx('position:absolute;inset:0;background:linear-gradient(180deg,rgba(33,33,33,0) 55%,rgba(33,33,33,.7))')} />
              <span data-am-lb="" style={sx(`position:absolute;left:clamp(24px,4vw,56px);bottom:clamp(28px,3.4vw,48px);display:flex;flex-direction:column;gap:14px;white-space:nowrap;opacity:${p.op};transition:opacity .3s`)}>
                <small style={sx('font-family:var(--font-subhead);font-weight:500;font-size:15px;text-transform:uppercase')}>{p.loc}</small>
                <strong style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(28px,3.4vw,48px);line-height:1;letter-spacing:-.02em;text-transform:uppercase')}>{p.short}</strong>
              </span>
            </button>
          ))}
        </div>
        <div style={sx('display:flex;justify-content:flex-end;padding-top:20px')}>
          <Hv as="button" type="button" onClick={to('development/projects')} s={BTN} h={BTN_H}>See the portfolio →</Hv>
        </div>
      </section>
      <section data-screen-label="Asset Management — Our roots" style={sx('margin-top:clamp(56px,7vw,96px);background:var(--hw-black);color:var(--hw-white);padding:clamp(56px,7vw,88px) clamp(20px,3vw,40px)')}>
        <div data-am-2="" style={sx('display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:32px clamp(32px,5vw,64px);align-items:start')}>
          <div style={sx('display:flex;flex-direction:column;gap:20px')}>
            <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase;color:var(--hw-cool-grey)')}>Our roots</p>
            <h2 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(32px,3.6vw,46px);line-height:1.04;letter-spacing:-.02em;text-wrap:balance')}>The first principles of a developer. The discipline of an investor. The patience of a long-term owner.</h2>
          </div>
          <div style={sx('display:flex;flex-direction:column;gap:28px')}>
            <p style={sx('margin:0;font-size:clamp(18px,1.5vw,22px);line-height:1.45;text-wrap:pretty')}>Our approach to asset management brings together expertise in investment banking, real estate underwriting, design, development and operations. We understand buildings from the ground up, from how they are designed and constructed to how they are leased, operated and valued.</p>
            <p style={sx('margin:0;font-size:clamp(18px,1.5vw,22px);line-height:1.45;text-wrap:pretty')}>We manage each asset with the same rigour we bring to underwriting an investment. Leasing strategy, rental performance, operating costs and capital decisions are continuously evaluated against their impact on cash flow, asset value and long-term returns. Our financial models evolve with the buildings, informed by real-time operating data and the experience of the teams managing them.</p>
            <p style={sx('margin:0;font-size:clamp(18px,1.5vw,22px);line-height:1.45;text-wrap:pretty')}>One integrated team, one dataset and one set of standards, connecting decisions on the ground to investment performance and long-term value creation.</p>
            <div style={sx('display:flex;flex-wrap:wrap;align-items:center;row-gap:8px')}>
              <span style={sx(CHIP)}>Development</span>
              <span style={sx(LINK)} />
              <span style={sx(CHIP)}>Design</span>
              <span style={sx(LINK)} />
              <span style={sx(CHIP)}>Investment management</span>
              <span style={sx(LINK)} />
              <span style={sx('padding:12px 16px;background:var(--hw-terracotta);border:1px solid var(--hw-terracotta);font-family:var(--font-subhead);font-weight:500;font-size:13px;text-transform:uppercase')}>Asset management</span>
            </div>
          </div>
        </div>
      </section>
      <section data-screen-label="Asset Management — Pillars" style={sx('padding:clamp(56px,7vw,96px) clamp(20px,3vw,40px)')}>
        <div style={sx('display:flex;flex-direction:column;border-bottom:1.5px solid var(--hw-black)')}>
          {PILLARS.map((r) => (
            <div key={r.n} data-am-row="" style={sx('display:grid;grid-template-columns:120px minmax(0,1fr) minmax(0,1fr);gap:clamp(24px,3.4vw,48px);padding:clamp(32px,4vw,48px) 0;border-top:1.5px solid var(--hw-black);align-items:center')}>
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(32px,3.6vw,46px);letter-spacing:-.02em;color:var(--hw-terracotta)')}>{r.n}</span>
              <div style={sx('display:flex;flex-direction:column;gap:14px')}>
                <h3 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(28px,2.6vw,36px);line-height:1.1;letter-spacing:-.01em')}>{r.t}</h3>
                <p style={sx('margin:0;font-size:18px;line-height:1.55;text-wrap:pretty')}>{r.p}</p>
              </div>
              {r.filter ? (
                <div style={sx('position:relative;aspect-ratio:16/10;overflow:hidden;background:var(--hw-brown)')}>
                  <span style={sx(`position:absolute;inset:0;background:url('${r.img}') center/cover no-repeat;filter:sepia(.18) saturate(.85) contrast(1.04) brightness(1.02)`)} />
                </div>
              ) : (
                <div style={sx(`aspect-ratio:16/10;background:var(--hw-brown) url('${r.img}') center/cover no-repeat`)} />
              )}
            </div>
          ))}
        </div>
      </section>
      <section data-screen-label="Asset Management — Returns" style={sx('padding:0 clamp(20px,3vw,40px) clamp(72px,9vw,120px)')}>
        <div data-am-2="" style={sx('display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:28px clamp(32px,5vw,64px);align-items:end')}>
          <h2 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(36px,4.4vw,64px);line-height:1.02;letter-spacing:-.025em;text-wrap:balance')}>Resident retention and durable returns grow together.</h2>
          <div style={sx('display:flex;flex-direction:column;gap:24px;align-items:flex-start')}>
            <p style={sx('margin:0;font-size:clamp(18px,1.5vw,22px);line-height:1.45;text-wrap:pretty')}>Less turnover means less vacancy, lower leasing, make-ready and marketing costs, and steadier income for investors over the long term.</p>
            <div style={sx('display:flex;flex-wrap:wrap;gap:12px')}>
              <Hv as="button" type="button" onClick={to('investors')} s={BTN} h={BTN_H}>Explore our investment opportunities →</Hv>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PageManagement
