import { useEffect } from 'react'
import { Hv, sx, RULE_BG } from '../design/ui.jsx'
import HW_ARTICLES from '../design/articles-data.js'

// Ported from ui_kits/website/PageArticle.dc.html: one Perspective or White paper by slug.

const MONO = 'font-family:var(--font-subhead);font-weight:500;text-transform:uppercase'
const H2 = 'margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(26px,2.4vw,34px);line-height:1.1'
const PARA = 'margin:0;font-size:clamp(18px,1.4vw,20px);line-height:1.6;text-wrap:pretty'

function Section({ s }) {
  return (
    <div style={sx('display:flex;flex-direction:column;gap:16px')}>
      <h2 style={sx(H2)}>{s.h}</h2>
      {s.p.map((para) => (
        <p key={para} style={sx(PARA)}>{para}</p>
      ))}
    </div>
  )
}

function Figure({ a, bars, prefix = '' }) {
  return (
    <figure style={sx('margin:0;padding:clamp(20px,2.4vw,32px);background:var(--hw-white);border:1.5px solid var(--hw-black);display:flex;flex-direction:column;gap:18px')}>
      <figcaption style={sx(`${MONO};font-size:13px`)}>{prefix}{a.figure.title}</figcaption>
      {bars.map((b) => (
        <div key={b.l} style={sx('display:flex;flex-direction:column;gap:6px')}>
          <span style={sx('display:flex;justify-content:space-between;gap:12px;font-size:18px')}>
            <span>{b.l}</span>
            <span style={sx('font-family:var(--font-display);font-weight:500;font-size:18px')}>{b.label}</span>
          </span>
          <span style={sx('height:14px;background:rgba(33,33,33,.1);display:block')}>
            <span style={sx(`display:block;height:100%;width:${b.w};background:${b.c}`)} />
          </span>
        </div>
      ))}
      <span style={sx('font-size:14px')}>Source: {a.figure.source}</span>
    </figure>
  )
}

function PageArticle({ slug, go }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const a = HW_ARTICLES.find((x) => x.slug === slug) || HW_ARTICLES[0]
  const paper = a.kind === 'White paper'
  const fb = (a.figure && a.figure.bars) || []
  const max = Math.max(...fb.map((b) => b.v), 1)
  const bars = fb.map((b, i) => ({ l: b.l, label: b.label || b.v + '%', w: (b.v / max) * 100 + '%', c: i === 0 ? 'var(--hw-terracotta)' : 'var(--hw-black)' }))
  const secs = a.sections || []
  const toc = secs.map((s, i) => ({ ...s, n: String(i + 1).padStart(2, '0'), fig: i === 1 }))
  const related = HW_ARTICLES.filter((x) => x.slug !== a.slug && (x.kind === 'White paper') === paper)
    .slice(0, 3)
    .map((x) => ({ kind: x.kind === 'White paper' ? 'White paper No. ' + x.no : 'Perspective', title: x.title, dek: x.dek, slug: x.slug }))

  return (
    <div style={sx('background:#F9F9F9;color:var(--hw-black);font-family:var(--font-body)')}>
      <div style={sx('padding:clamp(20px,2.5vw,32px) clamp(20px,3vw,40px) 0;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap')}>
        <Hv as="button" onClick={() => go('insights/perspectives')} s={`background:none;border:0;padding:0;cursor:pointer;color:var(--hw-black);${MONO};font-size:13px`} h="color:var(--hw-terracotta)">
          ← Perspectives
        </Hv>
        <span style={sx(`display:inline-flex;padding:5px 9px;border:1.5px dashed currentColor;${MONO};font-size:12px;letter-spacing:.04em`)}>Sample copy — layout review</span>
      </div>

      {!paper && (
        <>
          <header data-screen-label="Perspective — Header" style={sx('padding:clamp(32px,5vw,72px) clamp(20px,3vw,40px) clamp(28px,3vw,44px);display:flex;flex-direction:column;gap:22px;max-width:1080px')}>
            <span style={sx(`display:flex;gap:10px;align-items:center;${MONO};font-size:13px`)}>
              <span style={sx('width:8px;height:8px;border-radius:50%;background:var(--hw-teal);display:block')} />
              Perspective · {a.date} · {a.read}
            </span>
            <h1 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(38px,5.4vw,80px);line-height:1.02;letter-spacing:-.02em;text-wrap:balance')}>{a.title}</h1>
            <p style={sx('margin:0;max-width:760px;font-size:clamp(19px,1.7vw,24px);line-height:1.45;text-wrap:pretty')}>{a.dek}</p>
            <div style={sx('display:flex;align-items:center;gap:14px')}>
              {a.author?.photo && <img src={a.author.photo} alt="" style={sx('width:48px;height:48px;border-radius:50%;object-fit:cover;display:block')} />}
              <span style={sx('display:flex;flex-direction:column;gap:2px')}>
                <span style={sx('font-family:var(--font-display);font-weight:500;font-size:18px')}>{a.author?.name}</span>
                <span style={sx('font-size:18px')}>{a.author?.role}</span>
              </span>
            </div>
          </header>
          <div style={sx('padding:0 clamp(20px,3vw,40px)')}>
            <img src={a.img} alt="" style={sx('width:100%;aspect-ratio:16/7;object-fit:cover;display:block;background:var(--hw-cool-grey)')} />
          </div>
          <section data-screen-label="Perspective — Body" style={sx('padding:clamp(40px,5vw,80px) clamp(20px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:clamp(32px,5vw,96px);align-items:start;max-width:1280px')}>
            <aside style={sx('position:sticky;top:96px;display:flex;flex-direction:column;gap:18px;max-width:340px')}>
              <p style={sx(`margin:0;${MONO};font-size:13px;color:var(--hw-black)`)}>Key points</p>
              {a.keyPoints.map((k) => (
                <p key={k} style={sx('margin:0;padding-top:12px;border-top:1px solid var(--hw-black);font-size:18px;line-height:1.45')}>{k}</p>
              ))}
              <div style={sx('display:flex;gap:8px;flex-wrap:wrap;padding-top:6px')}>
                <span style={sx(`${MONO};font-size:12px;padding:9px 12px;border:1.5px solid var(--hw-black)`)}>Share on LinkedIn</span>
                <span style={sx(`${MONO};font-size:12px;padding:9px 12px;border:1.5px solid var(--hw-black)`)}>Copy link</span>
              </div>
            </aside>
            <article style={sx('display:flex;flex-direction:column;gap:clamp(28px,3vw,40px);max-width:700px;grid-column:span 2')}>
              {secs.slice(0, 1).map((s) => (
                <Section key={s.h} s={s} />
              ))}
              <blockquote style={sx('margin:0;padding:clamp(8px,1vw,16px) 0;font-family:var(--font-display);font-weight:500;font-size:clamp(28px,3vw,42px);line-height:1.12;letter-spacing:-.01em;color:var(--hw-terracotta);text-wrap:balance')}>
                “{a.quote}”
              </blockquote>
              {secs.slice(1).map((s) => (
                <Section key={s.h} s={s} />
              ))}
              <Figure a={a} bars={bars} />
            </article>
          </section>
          <section style={sx('margin:0 clamp(20px,3vw,40px);padding:clamp(32px,4vw,56px);background:var(--hw-teal);color:var(--hw-white);display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:24px')}>
            <div style={sx('display:flex;flex-direction:column;gap:10px;max-width:640px')}>
              <p style={sx(`margin:0;${MONO};font-size:13px`)}>The Long View</p>
              <p style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(26px,2.6vw,38px);line-height:1.1')}>Get our perspective every month.</p>
            </div>
            <Hv as="button" onClick={() => go('insights/newsletter')} s={`padding:16px 24px;background:var(--hw-white);color:var(--hw-black);border:0;cursor:pointer;${MONO};font-size:14px`} h="background:var(--hw-black);color:var(--hw-white)">
              Subscribe →
            </Hv>
          </section>
        </>
      )}

      {paper && (
        <>
          <header data-screen-label="White paper — Cover" style={sx('margin:clamp(20px,2.5vw,32px) clamp(20px,3vw,40px) 0;padding:clamp(32px,5vw,72px);background:var(--hw-terracotta);color:var(--hw-white);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,360px),1fr));gap:clamp(32px,5vw,80px);align-items:center')}>
            <div style={sx('display:flex;flex-direction:column;gap:22px')}>
              <span style={sx(`${MONO};font-size:13px`)}>White paper No. {a.no} · {a.date} · {a.read}</span>
              <h1 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(36px,4.6vw,68px);line-height:1.03;letter-spacing:-.02em;text-wrap:balance')}>{a.title}</h1>
              <p style={sx('margin:0;max-width:600px;font-size:clamp(18px,1.5vw,22px);line-height:1.45;text-wrap:pretty')}>{a.dek}</p>
              <div style={sx('display:flex;flex-wrap:wrap;gap:10px;padding-top:6px')}>
                <span style={sx(`padding:15px 22px;background:var(--hw-black);color:var(--hw-white);${MONO};font-size:14px`)}>Download PDF</span>
                <span style={sx(`padding:13.5px 20.5px;border:1.5px solid var(--hw-white);${MONO};font-size:14px`)}>Copy link for a client</span>
              </div>
            </div>
            <div style={sx('justify-self:center;width:min(100%,340px);aspect-ratio:8.5/11;background:var(--hw-white);color:var(--hw-black);border:1.5px solid var(--hw-black);display:flex;flex-direction:column;overflow:hidden')}>
              <div style={sx('padding:22px;display:flex;flex-direction:column;gap:12px;flex:1')}>
                <img src="/assets/website/Heartwood-Wordmark.svg" alt="Heartwood" style={sx('height:16px;width:auto;align-self:flex-start;display:block')} />
                <span style={sx(`margin-top:18px;${MONO};font-size:12px;color:var(--hw-black)`)}>White paper No. {a.no}</span>
                <span style={sx('font-family:var(--font-display);font-weight:500;font-size:24px;line-height:1.08')}>{a.title}</span>
              </div>
              <img src={a.img} alt="" style={sx('width:100%;height:42%;object-fit:cover;display:block;background:var(--hw-cool-grey)')} />
            </div>
          </header>
          <section data-screen-label="White paper — Body" style={sx(`padding:clamp(40px,5vw,80px) clamp(20px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:clamp(32px,5vw,96px);align-items:start;max-width:1280px;background:${RULE_BG}`)}>
            <aside style={sx('position:sticky;top:96px;display:flex;flex-direction:column;max-width:320px')}>
              <p style={sx(`margin:0 0 14px;${MONO};font-size:13px;color:var(--hw-black)`)}>Contents</p>
              <span style={sx('padding:10px 0;border-top:1px solid var(--hw-black);font-size:18px')}>Executive summary</span>
              {toc.map((t) => (
                <span key={t.n} style={sx('display:flex;gap:12px;padding:10px 0;border-top:1px solid var(--hw-black);font-size:18px')}>
                  <span style={sx('font-family:var(--font-subhead);font-weight:500;color:var(--hw-terracotta)')}>{t.n}</span>
                  {t.h}
                </span>
              ))}
              <span style={sx('padding:10px 0;border-top:1px solid var(--hw-black);border-bottom:1px solid var(--hw-black);font-size:18px')}>Sources</span>
            </aside>
            <article style={sx('display:flex;flex-direction:column;gap:clamp(32px,3.5vw,48px);max-width:720px;grid-column:span 2')}>
              <div style={sx('padding:clamp(22px,2.6vw,36px);background:var(--hw-white);border:1.5px solid var(--hw-black);display:flex;flex-direction:column;gap:16px')}>
                <p style={sx(`margin:0;${MONO};font-size:13px`)}>Executive summary</p>
                {a.keyPoints.map((k) => (
                  <p key={k} style={sx('margin:0;display:flex;gap:14px;font-family:var(--font-display);font-weight:500;font-size:clamp(19px,1.6vw,23px);line-height:1.3')}>
                    <span style={{ color: 'var(--hw-terracotta)' }}>—</span>
                    <span>{k}</span>
                  </p>
                ))}
              </div>
              {toc.map((s) => (
                <div key={s.n} style={sx('display:flex;flex-direction:column;gap:14px;border-top:1px solid var(--hw-black);padding-top:20px')}>
                  <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:14px;color:var(--hw-black)')}>{s.n}</span>
                  <Section s={s} />
                  {s.fig && <Figure a={a} bars={bars} prefix="Figure 1 · " />}
                </div>
              ))}
              <div style={sx('display:flex;flex-direction:column;gap:10px;border-top:1px solid var(--hw-black);padding-top:20px')}>
                <p style={sx(`margin:0;${MONO};font-size:13px`)}>Sources</p>
                {(a.sources || []).map((t, i) => (
                  <span key={t} style={sx('font-size:18px;line-height:1.5')}>{i + 1}. {t}</span>
                ))}
              </div>
              <p style={sx('margin:0;font-size:14px;line-height:1.55')}>
                For advisor and accredited or eligible investor use. This paper is for information only and is not an offer to sell securities. Any offering is made only under the Offering Memorandum. Past performance is not indicative of future results.
              </p>
            </article>
          </section>
          <section style={sx('margin:0 clamp(20px,3vw,40px);padding:clamp(32px,4vw,56px);background:var(--hw-black);color:var(--hw-white);display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:24px')}>
            <div style={sx('display:flex;flex-direction:column;gap:10px;max-width:640px')}>
              <p style={sx(`margin:0;${MONO};font-size:13px;color:var(--hw-black)`)}>For advisors</p>
              <p style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(26px,2.6vw,38px);line-height:1.1')}>Want to walk a client through this?</p>
            </div>
            <div style={sx('display:flex;flex-wrap:wrap;gap:10px')}>
              <Hv as="button" onClick={() => go('investment/advisors')} s={`padding:15px 22px;background:var(--hw-white);color:var(--hw-black);border:0;cursor:pointer;${MONO};font-size:14px`} h="background:var(--hw-terracotta);color:var(--hw-white)">
                Request advisor access
              </Hv>
              <Hv as="button" onClick={() => go('investment/meeting')} s={`padding:13.5px 20.5px;background:transparent;color:var(--hw-white);border:1.5px solid var(--hw-white);cursor:pointer;${MONO};font-size:14px`} h="background:var(--hw-white);color:var(--hw-black)">
                Meet with us
              </Hv>
            </div>
          </section>
        </>
      )}

      <section data-screen-label="Article — Related" style={sx(`padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:24px;background:${RULE_BG}`)}>
        <p style={sx(`margin:0;${MONO};font-size:clamp(18px,1.4vw,22px);color:var(--hw-terracotta)`)}>{paper ? 'More white papers' : 'More perspectives'}</p>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:clamp(20px,2.5vw,36px)')}>
          {related.map((r) => (
            <Hv key={r.slug} as="button" onClick={() => go('insights/perspectives/' + r.slug)} s="display:flex;flex-direction:column;gap:12px;padding:16px 0 0;background:none;border:0;border-top:1px solid var(--hw-black);cursor:pointer;text-align:left;color:var(--hw-black);font:inherit" h="color:var(--hw-teal)">
              <span style={sx(`${MONO};font-size:12px`)}>{r.kind}</span>
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(21px,1.8vw,26px);line-height:1.15;text-wrap:balance')}>{r.title}</span>
              <span style={sx('font-size:18px;line-height:1.5')}>{r.dek}</span>
              <span style={sx(`${MONO};font-size:13px`)}>Read →</span>
            </Hv>
          ))}
        </div>
      </section>
    </div>
  )
}

export default PageArticle
