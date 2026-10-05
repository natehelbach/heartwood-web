import { useEffect, useState } from 'react'
import { Hv, sx, DotField, RULE_BG } from '../design/ui.jsx'
import HW_DATA from '../design/site-data.js'

// Ported from ui_kits/website/PageHome.dc.html.

const FP = [
  { slug: '3385-lawrence', short: '3385 Lawrence', desc: '155 purpose-built rental homes in Toronto, planned around a landscaped courtyard, shared amenities and transit access.' },
  { slug: '360-kennedy', short: '360 Kennedy', desc: 'Purpose-built rental housing in Ottawa, part of our Growth strategy.' },
  { slug: '353-sherbourne', short: '353 Sherbourne', desc: 'Purpose-built rental housing in downtown Toronto, part of our Growth strategy.' },
  { slug: '4094-tomken', short: '4094 Tomken', desc: 'Purpose-built rental housing in Mississauga, part of our Growth strategy.' },
].map((x) => ({ ...(HW_DATA.projects.find((p) => p.slug === x.slug) || {}), ...x }))

const SERVE = [
  ['Advisors', 'EMDs, RIAs and wealth managers.', 'investment/advisors'],
  ['Private wealth', 'Family offices and high-net-worth individuals.', 'investment/hnw'],
  ['Institutional investors', 'Pensions, foundations, endowments and insurers.', 'investment/institutional'],
]

const BUILT = [
  { label: 'Home — Well-being', title: 'Built for well-being.', body: 'Healthier homes come from natural light, clean air and space to gather. We design them in from day one.', img: '/assets/imagery/HW_Amenity_Fitness.png', cap: 'On-site fitness, part of everyday life' },
  { label: 'Home — Long term', title: 'Built for the long term.', body: 'Durable materials, smart systems and repeatable design keep buildings performing for decades.', img: '/assets/project-renders/HW_Render_3385-Lawrence-Courtyard.jpg', cap: '3385 Lawrence Avenue East, courtyard rendering' },
  { label: 'Home — Resilient investments', title: 'Built for resilient investments.', body: 'Quality buildings, strong demand and active management hold value through economic cycles. Two strategies, one discipline.', img: '/assets/project-renders/HW_Render_360-Kennedy-Lane.jpg', cap: '360 Kennedy Lane, Ottawa, rendering' },
]

const WAYS_IN = [
  ['Perspectives', 'Our thinking on housing, markets and building better.', 'Read →', 'insights/perspectives'],
  ['Podcast', 'Conversations on building better real estate.', 'Listen →', 'insights/podcast'],
  ['The Long View', 'Our monthly letter to investors and partners.', 'Subscribe →', 'insights/newsletter'],
]

const LIFESTYLE = [
  ['/assets/lifestyle/HW_Lifestyle_26.jpg', 'Kitchens built for everyday use'],
  ['/assets/lifestyle/HW_Lifestyle_21.jpg', 'Durable, natural finishes'],
  ['/assets/lifestyle/HW_Lifestyle_34.jpg', 'Room to gather'],
  ['/assets/lifestyle/HW_Lifestyle_32.jpg', 'Walkable, connected neighbourhoods'],
]

const OUTLINE_BTN = 'padding:16px 24px;background:transparent;color:var(--hw-black);border:1.5px solid var(--hw-black);cursor:pointer;font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase'
const OUTLINE_HOVER = 'background:var(--hw-black);color:var(--hw-white)'
const SECTION = `padding:clamp(72px,8vw,120px) clamp(20px,3vw,40px) 0;display:flex;flex-direction:column;gap:28px;background:${RULE_BG}`
const FIG_IMG = (img) => `aspect-ratio:16/9;background:var(--hw-cool-grey) url('${img}') center/cover no-repeat`

function PageHome({ go }) {
  const nav = (r) => () => go(r)
  const [feat, setFeat] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      if (!paused) setFeat((f) => (f + 1) % FP.length)
    }, 6000)
    return () => clearInterval(t)
  }, [paused])

  const fi = feat % FP.length
  const cur = FP[fi]
  const openFeat = nav('properties/' + cur.slug)

  return (
    <div style={sx('background:var(--hw-white);color:var(--hw-black);font-family:var(--font-body)')}>
      <div data-scroll-track="landing" data-screen-label="Home — Hero" style={sx('position:relative;height:200vh')}>
        <div style={sx("position:sticky;top:0;height:100vh;overflow:clip;background:#212121 url('/assets/website/landing-image.webp') center/cover no-repeat")}>
          <div style={sx('position:absolute;top:var(--nav-h,82px);left:0;right:0;bottom:0;overflow:hidden')}>
            <DotField preset="landing" />
            <p style={sx('position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:clamp(16rem,30vw,26rem);margin:0;font-family:var(--font-subhead);font-weight:500;text-transform:uppercase;font-size:clamp(0.875rem,1.15vw,1.5rem);line-height:1.5;color:#F9F9F9;text-align:center;text-wrap:pretty;pointer-events:none')}>
              Partnering to create durable real estate investments and enduring returns through buildings that last, healthier homes, and stronger communities.
            </p>
            <p style={sx('position:absolute;bottom:clamp(1.5rem,4vh,3rem);left:30px;margin:0;font-family:var(--font-subhead);font-weight:500;text-transform:uppercase;font-size:clamp(0.875rem,1.15vw,1.5rem);line-height:1.15;color:#F9F9F9;pointer-events:none')}>
              Future<br />built.
            </p>
          </div>
        </div>
      </div>

      <section data-screen-label="Home — Built to last" style={sx('padding:clamp(56px,6vw,96px) clamp(20px,3vw,40px) 0')}>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,460px),1fr));gap:clamp(36px,5vw,96px);align-items:end')}>
          <div style={sx('display:flex;flex-direction:column;gap:clamp(20px,2.4vw,32px)')}>
            <h1 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(36px,4.8vw,80px);line-height:1;letter-spacing:-.02em;text-wrap:balance')}>
              Homes built to last. Investments designed to endure.
            </h1>
            <p style={sx('margin:0;max-width:520px;font-size:clamp(17px,1.35vw,20px);line-height:1.5;text-wrap:pretty')}>
              We build, buy and operate purpose-built rental housing in Canada and the United States, and invest alongside the investors we serve.
            </p>
          </div>
          <div data-screen-label="Home — Who we serve" style={sx('display:flex;flex-direction:column')}>
            <p style={sx('margin:0 0 14px;font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase;color:var(--hw-black)')}>Who we serve</p>
            {SERVE.map(([title, sub, r]) => (
              <Hv
                key={r}
                as="button"
                onClick={nav(r)}
                s="display:grid;grid-template-columns:minmax(0,1fr) auto;grid-template-rows:auto auto;column-gap:clamp(16px,2vw,28px);row-gap:6px;align-items:baseline;padding:clamp(18px,2vw,24px) 0;background:none;border:0;border-top:1px solid var(--hw-black);cursor:pointer;color:var(--hw-black);text-align:left;font-family:var(--font-body)"
                h="color:var(--hw-terracotta)"
              >
                <span style={sx('grid-column:1;grid-row:1;font-family:var(--font-display);font-weight:500;font-size:clamp(26px,2.6vw,38px);line-height:1.05;letter-spacing:-.015em')}>{title}</span>
                <span style={sx('grid-column:2;grid-row:1/3;align-self:center;font-family:var(--font-display);font-weight:500;font-size:clamp(22px,2.2vw,32px);line-height:1')}>→</span>
                <span style={sx('grid-column:1;grid-row:2;justify-self:start;font-size:18px;line-height:1.45;text-wrap:pretty')}>{sub}</span>
              </Hv>
            ))}
            <div style={sx('height:1.5px;background:var(--hw-black)')} />
          </div>
        </div>
        <figure style={sx('margin:40px 0 0;display:flex;flex-direction:column;gap:12px')}>
          <div style={sx(FIG_IMG('/assets/imagery/HW_Interior_Timber-Living.jpg'))} />
          <figcaption style={sx('font-size:18px;font-style:italic')}>Timber ceilings, natural light and warm, durable finishes.</figcaption>
        </figure>
      </section>

      {BUILT.map((b, i) => (
        <section key={b.label} data-screen-label={b.label} style={sx(SECTION)}>
          <h2 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(40px,6vw,96px);line-height:1;letter-spacing:-.03em;max-width:1100px;text-wrap:balance')}>{b.title}</h2>
          <p style={sx('margin:0;max-width:620px;font-size:clamp(18px,1.5vw,22px);line-height:1.45;text-wrap:pretty')}>{b.body}</p>
          {i === 0 && (
            <div style={{ display: 'flex' }}>
              <Hv as="button" onClick={nav('insights')} s={OUTLINE_BTN} h={OUTLINE_HOVER}>Read our insights →</Hv>
            </div>
          )}
          {i === 1 && (
            <div style={{ display: 'flex' }}>
              <Hv as="button" onClick={nav('properties')} s={OUTLINE_BTN} h={OUTLINE_HOVER}>See our properties →</Hv>
            </div>
          )}
          {i === 2 && (
            <div style={sx('display:flex;gap:12px;flex-wrap:wrap')}>
              <Hv
                as="button"
                onClick={nav('investment/overview')}
                s="padding:16px 24px;background:var(--hw-black);color:var(--hw-white);border:1.5px solid var(--hw-black);cursor:pointer;font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase"
                h="background:var(--hw-teal);border-color:var(--hw-teal)"
              >
                Explore our investment strategies →
              </Hv>
              <Hv as="button" onClick={nav('investment/growth')} s={OUTLINE_BTN} h={OUTLINE_HOVER}>Growth strategy</Hv>
              <Hv as="button" onClick={nav('investment/income')} s={OUTLINE_BTN} h={OUTLINE_HOVER}>Income strategy</Hv>
            </div>
          )}
          <figure style={sx('margin:24px 0 0;display:flex;flex-direction:column;gap:12px')}>
            <div style={sx(FIG_IMG(b.img))} />
            <figcaption style={sx('font-size:18px;font-style:italic')}>{b.cap}</figcaption>
          </figure>
        </section>
      ))}

      <section data-screen-label="Home — Ways in" style={sx(`padding:clamp(72px,8vw,140px) clamp(20px,3vw,40px) clamp(56px,6vw,88px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:16px;background:${RULE_BG}`)}>
        {WAYS_IN.map(([title, body, cta, r]) => (
          <Hv
            key={r}
            as="button"
            onClick={nav(r)}
            s="background:transparent;border:1px solid var(--hw-black);padding:32px;display:flex;flex-direction:column;justify-content:space-between;gap:48px;min-height:260px;text-align:left;cursor:pointer;font-family:var(--font-body);color:var(--hw-black)"
            h="background:var(--hw-cool-grey)"
          >
            <span style={sx('display:flex;flex-direction:column;gap:10px')}>
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2vw,30px)')}>{title}</span>
              <span style={sx('font-size:18px;line-height:1.45')}>{body}</span>
            </span>
            <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase')}>{cta}</span>
          </Hv>
        ))}
      </section>

      <section data-screen-label="Home — Featured property" style={sx(`padding:clamp(72px,8vw,120px) clamp(20px,3vw,40px) 0;display:flex;flex-direction:column;gap:clamp(20px,2.5vw,40px);background:${RULE_BG}`)}>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(24px,4vw,64px);align-items:end')}>
          <button onClick={openFeat} style={sx('background:none;border:0;padding:0;cursor:pointer;text-align:left;margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(32px,3.8vw,56px);line-height:1.05;letter-spacing:-.02em;color:var(--hw-black);min-height:2.2em')}>
            Places people want to live. <span style={{ color: 'var(--hw-terracotta)' }}>Explore {cur.short} →</span>
          </button>
          <div style={sx('display:flex;flex-direction:column;gap:20px')}>
            <p style={sx('margin:0;font-size:clamp(17px,1.35vw,20px);line-height:1.5;text-wrap:pretty;min-height:3em')}>{cur.desc}</p>
            <div style={sx('display:flex;align-items:center;gap:16px')}>
              <Hv as="button" onClick={() => setFeat((f) => (f + FP.length - 1) % FP.length)} aria-label="Previous project" s="width:48px;height:48px;border:1.5px solid var(--hw-black);background:none;color:var(--hw-black);cursor:pointer;font-family:var(--font-body);font-size:20px" h={OUTLINE_HOVER}>←</Hv>
              <Hv as="button" onClick={() => setFeat((f) => (f + 1) % FP.length)} aria-label="Next project" s="width:48px;height:48px;border:1.5px solid var(--hw-black);background:none;color:var(--hw-black);cursor:pointer;font-family:var(--font-body);font-size:20px" h={OUTLINE_HOVER}>→</Hv>
              <div style={sx('display:flex;gap:8px;margin-left:8px')}>
                {FP.map((fd, i) => (
                  <button key={fd.slug} onClick={() => setFeat(i)} aria-label={fd.name} style={sx(`width:10px;height:10px;border-radius:50%;border:0;padding:0;cursor:pointer;background:var(--hw-black);opacity:${i === fi ? 1 : 0.25}`)} />
                ))}
              </div>
              <span style={sx('margin-left:auto;font-family:var(--font-subhead);font-weight:500;font-size:14px')}>{`0${fi + 1} / 0${FP.length}`}</span>
            </div>
            <Hv as="button" onClick={nav('properties')} s="align-self:flex-start;padding:14px 22px;background:var(--hw-black);color:var(--hw-white);border:0;cursor:pointer;font-family:var(--font-subhead);font-weight:500;font-size:14px;letter-spacing:.02em;text-transform:uppercase" h="background:var(--hw-terracotta)">
              See our properties →
            </Hv>
          </div>
        </div>
        <button
          onClick={openFeat}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-label={cur.name}
          style={sx('position:relative;display:block;width:100%;aspect-ratio:16/9;border:0;padding:0;cursor:pointer;background:var(--hw-cool-grey);overflow:hidden')}
        >
          {FP.map((fd, i) => (
            <img key={fd.slug} src={fd.img} alt={fd.name} style={sx(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;opacity:${i === fi ? 1 : 0};transition:opacity .6s ease`)} />
          ))}
          <span style={sx('position:absolute;left:0;bottom:0;padding:10px 14px;background:rgba(249,249,249,.92);font-family:var(--font-body);font-size:18px;font-style:italic;color:var(--hw-black)')}>
            {cur.name}, {cur.loc}
          </span>
        </button>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:16px')}>
          {LIFESTYLE.map(([img, cap]) => (
            <figure key={img} style={sx('margin:0;display:flex;flex-direction:column;gap:10px')}>
              <div style={sx(`aspect-ratio:4/5;background:var(--hw-cool-grey) url('${img}') center/cover no-repeat`)} />
              <figcaption style={sx('font-size:14px;font-style:italic')}>{cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section data-screen-label="Home — Platform deck CTA" style={sx('background:var(--hw-terracotta);color:var(--hw-white);padding:clamp(48px,5vw,88px) clamp(20px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(32px,4vw,64px);align-items:center')}>
        <div style={sx('display:flex;flex-direction:column;gap:20px')}>
          <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(14px,1.2vw,18px);text-transform:uppercase')}>Start with a discovery meeting</p>
          <p style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(32px,3.6vw,52px);line-height:1.08;letter-spacing:-.015em;max-width:640px;text-wrap:balance')}>Build the next generation of real estate with us.</p>
        </div>
        <div style={sx('display:flex;flex-direction:column;gap:24px')}>
          <p style={sx('margin:0;max-width:520px;font-size:clamp(17px,1.4vw,20px);line-height:1.5')}>
            A 30-minute conversation with our investment team. Tell us whether you’re an advisor, private investor or institution and we’ll take it from there.
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
