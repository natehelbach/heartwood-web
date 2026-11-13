import { useEffect, useState } from 'react'
import { Hv, sx } from '../design/ui.jsx'
import HW_DATA from '../design/site-data.js'

// Ported from ui_kits/website/PageProperties.dc.html. No `sub` shows the filterable list;
// `sub` = a project slug shows that project's split view.

const P = HW_DATA.projects
const tbc = (v) => (v && v !== 'TBC' ? v : '')
const list = (v) => (Array.isArray(v) ? v : tbc(v) ? [v] : [])

const FILTERS = [
  ['Market', 'country', ['All', 'Canada', 'United States']],
]

const MONO = 'font-family:var(--font-subhead);font-weight:500;text-transform:uppercase'
// The design currently hides the callout row under the project gallery.
const SHOW_CALLOUTS = false
// The design turns off the name lockup over the main image (its showLockup prop).
const SHOW_LOCKUP = false

// `only` limits the list to one strategy (Development › Projects shows Growth).
function PropertyList({ only, go }) {
  const [sel, setSel] = useState({ country: 'All', strategy: 'All' })
  const filters = FILTERS
  const shown = P.filter((p) => (!only || p.strategy === only) && (sel.country === 'All' || p.country === sel.country) && (sel.strategy === 'All' || p.strategy === sel.strategy))
  return (
    <>
      <section data-screen-label="Properties — Intro" style={sx('padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px) clamp(32px,4vw,56px);display:flex;flex-direction:column;gap:20px')}>
        <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(14px,1.2vw,18px);text-transform:uppercase;color:var(--hw-hemlock)')}>Properties</p>
        <h1 style={sx('margin:0;max-width:880px;font-family:var(--font-display);font-weight:500;font-size:clamp(34px,4.4vw,64px);line-height:1.05;letter-spacing:-.02em;text-wrap:balance')}>
          Places people want to live produce portfolios with durable value.
        </h1>
      </section>
      <section data-screen-label="Properties — Filters" style={sx('padding:0 clamp(20px,3vw,40px) clamp(28px,3vw,40px);display:flex;flex-wrap:wrap;gap:16px clamp(32px,5vw,72px)')}>
        {filters.map(([label, key, opts]) => (
          <div key={key} style={sx('display:flex;flex-wrap:wrap;align-items:baseline;gap:8px 20px')}>
            <span style={sx('font-size:14px;color:rgba(33,33,33,.6)')}>{label}</span>
            {opts.map((t) => {
              const on = sel[key] === t
              return (
                <Hv
                  key={t}
                  as="button"
                  aria-pressed={on}
                  onClick={() => setSel((s) => ({ ...s, [key]: t }))}
                  s={`background:none;border:0;border-bottom:1.5px solid ${on ? 'var(--hw-black)' : 'transparent'};padding:0 0 3px;cursor:pointer;font-family:var(--font-body);font-size:18px;color:var(--hw-black);opacity:${on ? 1 : 0.5}`}
                  h="opacity:1"
                >
                  {t}
                </Hv>
              )
            })}
          </div>
        ))}
      </section>
      <section data-screen-label="Properties — Projects" style={sx('padding:0 clamp(20px,3vw,40px) clamp(48px,6vw,88px);display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,260px),1fr));gap:clamp(36px,4vw,56px) clamp(12px,1.4vw,20px)')}>
        {shown.map((p) => (
          <ProjectCard key={p.slug} p={p} go={go} />
        ))}
      </section>
    </>
  )
}

function ProjectCard({ p, go }) {
  const [hover, setHover] = useState(false)
  const tag = p.country === 'United States' ? 'US' : (p.country || '')
  const dot = p.strategy === 'Income' ? 'var(--hw-teal)' : 'var(--hw-terracotta)'
  return (
    <button
      onClick={() => go('properties/' + p.slug)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={sx(`display:flex;flex-direction:column;gap:14px;background:none;border:0;padding:0;cursor:pointer;text-align:left;font-family:var(--font-body);color:${hover ? 'var(--hw-teal)' : 'var(--hw-black)'}`)}
    >
      <span style={sx('display:flex;flex-direction:column;gap:4px')}>
        <span style={sx('display:flex;justify-content:space-between;align-items:flex-end;gap:12px')}>
          <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(20px,1.7vw,26px);line-height:1.15;letter-spacing:-.01em;text-wrap:balance;min-height:2.3em;display:flex;align-items:flex-end')}>{p.name}</span>
        </span>
        <span style={sx('font-size:18px;color:var(--hw-black)')}>{p.loc}</span>
        <span style={sx('display:flex;gap:8px;align-items:center;font-size:14px')}>
          <span style={sx(`width:8px;height:8px;border-radius:50%;background:${dot};display:block`)} />
          {tag}
        </span>
      </span>
      <span style={sx('display:block;width:100%;aspect-ratio:2/3;overflow:hidden;background:var(--hw-cool-grey)')}>
        <img loading="lazy" decoding="async" src={p.img} alt={p.name} style={sx(`width:100%;height:100%;object-fit:cover;object-position:${p.pos || 'center'};display:block;transition:transform .6s ease;transform:${hover ? 'scale(1.03)' : 'none'}`)} />
      </span>
    </button>
  )
}

function PropertyDetail({ sub, go }) {
  const [img, setImg] = useState(0)
  const [dw, setDw] = useState(0)
  const [dwPaused, setDwPaused] = useState(false)

  const idx = Math.max(0, P.findIndex((p) => p.slug === sub))
  const c = P[idx] || {}

  // Reset the gallery when moving between projects.
  useEffect(() => {
    setImg(0)
    setDw(0)
  }, [sub])

  // Drawings advance on their own unless the pointer is over them.
  useEffect(() => {
    const k = c.drawings ? c.drawings.length : 0
    if (k < 2) return
    const t = setInterval(() => {
      if (!dwPaused) setDw((d) => (d + 1) % k)
    }, 2600)
    return () => clearInterval(t)
  }, [c.drawings, dwPaused])

  const images = [{ src: c.img, cap: c.cap1 || 'Rendering', pos: c.pos }]
    .concat(c.img2 ? [{ src: c.img2, cap: c.cap2 || 'Rendering' }] : [], (c.gallery || []).map((g) => (typeof g === 'string' ? { src: g, cap: '' } : g)))
    .filter((i) => i.src)
  const n = images.length || 1
  const ii = Math.min(img, n - 1)
  const setImgWrap = (k) => setImg(((k % n) + n) % n)

  const groups = [['Units', c.units], ...(list(c.designTeam).length ? [['Design team', c.designTeam]] : []), ...(c.owner ? [['Ownership', c.owner]] : []), ['Amenities', c.amenities], ['Key features', c.features]].map(([k, v]) => {
    const vals = list(v)
    return { k, vals: vals.length ? vals : ['To be confirmed'], op: vals.length ? 1 : 0.45 }
  })
  const meta = [
    { k: 'Status', v: tbc(c.status) || 'To be confirmed' },
    { k: 'Location', v: c.loc || 'To be confirmed' },
  ]
  const lock =
    idx % 2 === 0
      ? { overlay: 'rgba(58,35,22,.5)', fg: 'var(--hw-white)', icon: '/assets/logos/Heartwood_DataIcon_Simplified_White.png' }
      : { overlay: 'rgba(197,220,234,.5)', fg: 'var(--hw-black)', icon: '/assets/logos/Heartwood_DataIcon_Simplified_Black.png' }
  const words = String(c.name || '').split(' ')
  const stack = words.length <= 3 ? words : [words[0], words[1], words.slice(2).join(' ')]
  const callouts = [tbc(c.units) ? c.units + ' new rental homes' : '', ...list(c.features).slice(0, 2)].filter(Boolean)
  const drawings = c.drawings || []
  const dwi = drawings.length ? dw % drawings.length : 0
  const arrowVis = n > 1 ? 'visible' : 'hidden'
  const arrow = `background:none;border:0;padding:8px;cursor:pointer;font-family:var(--font-body);font-size:22px;color:var(--hw-black);visibility:${arrowVis}`

  return (
    <div data-screen-label="Properties — Project" className="hw-split" data-m-stack-md="" style={sx('display:grid;grid-template-columns:minmax(320px,1fr) minmax(0,2fr);align-items:start;border-top:1px solid rgba(33,33,33,.2)')}>
      <aside className="hw-split-left" style={sx('min-width:0;align-self:start;position:sticky;top:82px;max-height:calc(100vh - 82px);max-height:calc(100svh - 82px);overflow:auto;border-right:1px solid rgba(33,33,33,.2);display:flex;flex-direction:column')}>
        <div style={sx('flex:none;padding:clamp(20px,2vw,32px) clamp(20px,2vw,32px) 0;display:flex;flex-direction:column;gap:16px')}>
          <Hv as="button" onClick={() => go('properties')} s={`align-self:flex-start;background:none;border:0;padding:0;cursor:pointer;color:var(--hw-black);${MONO};font-size:13px`} h="color:var(--hw-terracotta)">
            ← All properties
          </Hv>
          <div style={sx('display:flex;flex-direction:column;border-top:1.5px solid var(--hw-terracotta);padding-top:12px')}>
            {P.map((p, i) => (
              <Hv
                key={p.slug}
                as="button"
                aria-current={i === idx ? 'page' : undefined}
                onClick={() => go('properties/' + p.slug)}
                s={`display:flex;align-items:center;gap:10px;background:none;border:0;padding:5px 0;cursor:pointer;text-align:left;font-family:var(--font-display);font-weight:500;font-size:18px;line-height:1.25;color:var(--hw-black);opacity:${i === idx ? 1 : 0.5}`}
                h="opacity:1"
              >
                <span style={sx(`width:8px;height:8px;border-radius:50%;background:${i === idx ? 'var(--hw-terracotta)' : 'transparent'};display:block;flex:none`)} />
                {p.name}
              </Hv>
            ))}
          </div>
        </div>
        <div style={sx('flex:none;padding:clamp(28px,3vw,44px) clamp(20px,2vw,32px) 0;display:flex;flex-direction:column')}>
          <h1 style={sx('margin:0 0 20px;font-family:var(--font-display);font-weight:500;font-size:clamp(28px,2.6vw,40px);line-height:1.05;letter-spacing:-.02em;text-wrap:balance')}>{c.name}</h1>
          <p style={sx(`margin:0 0 12px;${MONO};font-size:13px;color:var(--hw-terracotta)`)}>Overview</p>
          {meta.map((m) => (
            <div key={m.k} style={sx('display:flex;justify-content:space-between;gap:16px;padding:10px 0;border-top:1px solid var(--hw-black)')}>
              <span style={sx(`${MONO};font-size:12px`)}>{m.k}</span>
              <span style={sx('font-size:18px;text-align:right')}>{m.v}</span>
            </div>
          ))}
          <p style={sx('margin:20px 0 0;font-size:18px;line-height:1.55;text-wrap:pretty')}>
            {c.body || 'Project narrative to come — site, design moves, building systems deployed and the outcome for residents and investors.'}
          </p>
        </div>
        <div style={sx('flex:none;padding:clamp(28px,3vw,44px) clamp(20px,2vw,32px) clamp(40px,4vw,64px);display:flex;flex-direction:column')}>
          <p style={sx(`margin:0 0 12px;${MONO};font-size:13px;color:var(--hw-terracotta)`)}>Project details</p>
          {groups.map((g) => (
            <div key={g.k} style={sx('display:flex;flex-direction:column;gap:4px;padding:12px 0;border-top:1px solid var(--hw-black)')}>
              <span style={sx(`${MONO};font-size:12px`)}>{g.k}</span>
              {g.vals.map((v) => (
                <span key={v} style={sx(`font-size:18px;line-height:1.4;opacity:${g.op}`)}>{v}</span>
              ))}
            </div>
          ))}
          {c.materialBoard && (
            <figure data-screen-label="Property — Material board" style={sx('margin:0;padding-top:12px;border-top:1px solid var(--hw-black);display:flex;flex-direction:column;gap:10px')}>
              <span style={sx(`${MONO};font-size:12px`)}>Material board</span>
              <img loading="lazy" decoding="async" src={c.materialBoard.src} alt="Material board" style={sx('width:100%;max-width:520px;aspect-ratio:1/1;object-fit:cover;display:block;background:var(--hw-cool-grey)')} />
              <figcaption style={sx('font-size:14px;max-width:520px')}>{c.materialBoard.cap}</figcaption>
            </figure>
          )}
        </div>
      </aside>

      <div style={sx('min-width:0;padding:clamp(20px,2vw,32px) clamp(20px,2vw,32px) clamp(48px,6vw,96px);display:flex;flex-direction:column;gap:clamp(48px,8vw,140px)')}>
        <>
          <figure style={sx('margin:0;display:grid;grid-template-columns:40px minmax(0,1fr) 40px;align-items:center;gap:8px')}>
            <Hv as="button" onClick={() => setImgWrap(ii - 1)} aria-label="Previous image" s={arrow} h="color:var(--hw-teal)">←</Hv>
            <span style={sx(`position:relative;display:block;width:100%;aspect-ratio:${c.ratio || '3/2'};overflow:hidden;background:var(--hw-cool-grey)`)}>
              {images.map((im, i) => (
                <img loading="lazy" decoding="async" key={im.src} src={im.src} alt={im.cap} style={sx(`position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${im.pos || 'center'};display:block;opacity:${i === ii ? 1 : 0};transition:opacity .4s ease`)} />
              ))}
              {SHOW_LOCKUP && (
                <>
                <span style={sx(`position:absolute;inset:0;background:${lock.overlay};pointer-events:none`)} />
                <span data-screen-label="Property — Lockup" style={sx('position:absolute;left:clamp(20px,3vw,48px);bottom:clamp(20px,3vw,48px);display:flex;align-items:center;gap:clamp(16px,2vw,32px);pointer-events:none')}>
                  <img loading="lazy" decoding="async" src={lock.icon} alt="" style={sx('width:clamp(125px,11vw,180px);height:auto;display:block')} />
                  <span style={sx(`font-family:var(--font-display);font-weight:500;font-size:clamp(36px,4.2vw,72px);line-height:1.02;letter-spacing:-.01em;color:${lock.fg};display:flex;flex-direction:column`)}>
                    {stack.map((ln) => (
                      <span key={ln}>{ln}</span>
                    ))}
                  </span>
                </span>
                </>
              )}
            </span>
            <Hv as="button" onClick={() => setImgWrap(ii + 1)} aria-label="Next image" s={arrow} h="color:var(--hw-teal)">→</Hv>
            <figcaption style={sx('grid-column:2;display:flex;justify-content:space-between;gap:16px;font-size:14px')}>
              <span style={{ fontStyle: 'italic' }}>{images[ii] ? images[ii].cap : ''}</span>
              <span>{n > 1 ? `${ii + 1} / ${n}` : ''}</span>
            </figcaption>
          </figure>
          {SHOW_CALLOUTS && callouts.length > 0 && (
            <div style={sx('margin:16px 48px 0;display:flex;flex-wrap:wrap;gap:10px 28px')}>
              {callouts.map((co) => (
                <span key={co} style={sx(`display:flex;align-items:center;gap:10px;${MONO};font-size:13px`)}>
                  <span style={sx('width:8px;height:8px;border-radius:50%;background:var(--hw-terracotta);display:block;flex:none')} />
                  {co}
                </span>
              ))}
            </div>
          )}
        </>

        {images.length > 1 && (
          <div style={sx('margin:0 48px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));align-items:start;gap:20px')}>
            {images.slice(1).map((im, i) => (
              <button key={im.src} onClick={() => setImgWrap(i + 1)} style={sx('background:none;border:0;padding:0;cursor:pointer;display:flex;flex-direction:column;gap:8px;text-align:left;font-family:var(--font-body);color:var(--hw-black)')}>
                <span style={sx('display:block;width:100%;overflow:hidden;background:var(--hw-cool-grey)')}>
                  <img loading="lazy" decoding="async" src={im.src} alt={im.cap} style={sx('width:100%;height:auto;display:block')} />
                </span>
                <span style={sx('font-size:14px;font-style:italic')}>{im.cap}</span>
              </button>
            ))}
          </div>
        )}

        {(c.scroll || []).map((si) => (
          <figure key={si.src} data-screen-label="Property — Photo" style={sx('margin:0 48px;display:flex;flex-direction:column;gap:10px')}>
            <img loading="lazy" decoding="async" src={si.src} alt={si.cap} style={sx('width:100%;height:auto;display:block;background:var(--hw-cool-grey)')} />
            <figcaption style={sx('font-size:14px;font-style:italic')}>{si.cap}</figcaption>
          </figure>
        ))}

        {drawings.length > 0 && (
          <section data-screen-label="Property — Drawings" onMouseEnter={() => setDwPaused(true)} onMouseLeave={() => setDwPaused(false)} style={sx('margin:0 clamp(20px,3.4vw,48px);display:flex;flex-direction:column;gap:16px')}>
            <div style={sx('display:flex;justify-content:space-between;align-items:baseline;gap:16px;border-top:1px solid rgba(33,33,33,.2);padding-top:14px')}>
              <span style={sx('font-size:18px;font-weight:600')}>Drawings</span>
              <span style={sx('font-size:14px')}>{`${dwi + 1} / ${drawings.length}`}</span>
            </div>
            <button onClick={() => setDw((d) => (d + 1) % drawings.length)} aria-label="Next drawing" style={sx('position:relative;display:block;width:100%;aspect-ratio:1155/832;background:transparent;border:0;padding:0;cursor:pointer;font-family:var(--font-body);color:var(--hw-black)')}>
              {drawings.map((d, i) => (
                <img loading="lazy" decoding="async" key={d.src} src={d.src} alt={d.cap} style={sx(`position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block;mix-blend-mode:multiply;opacity:${i === dwi ? 1 : 0};transition:opacity .5s ease`)} />
              ))}
              <span style={sx('position:absolute;right:16px;top:16px;font-size:28px;font-weight:300;line-height:1')}>+</span>
            </button>
            <div style={sx('display:flex;flex-wrap:wrap;gap:8px 24px')}>
              {drawings.map((d, i) => (
                <Hv
                  key={d.src}
                  as="button"
                  aria-pressed={i === dwi}
                  onClick={() => setDw(i)}
                  s={`background:none;border:0;border-bottom:1.5px solid ${i === dwi ? 'var(--hw-black)' : 'transparent'};padding:0 0 3px;cursor:pointer;font-family:var(--font-body);font-size:18px;color:var(--hw-black);opacity:${i === dwi ? 1 : 0.5}`}
                  h="opacity:1"
                >
                  {d.cap}
                </Hv>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function PageProperties({ sub, only, go }) {
  return (
    <div style={sx('background:var(--hw-white);color:var(--hw-black);font-family:var(--font-body)')}>
      {sub ? <PropertyDetail sub={sub} go={go} /> : <PropertyList only={only} go={go} />}
    </div>
  )
}

export default PageProperties
