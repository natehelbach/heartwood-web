import { useState } from 'react'
import { Hv, sx, DotField, RULE_BG, HubspotNote } from '../design/ui.jsx'
import HW_DATA from '../design/site-data.js'

// Ported from ui_kits/website/PageAbout.dc.html. `sub` is who | leadership | careers | contact.

const R = '/assets/project-renders/'

const TIERS = [
  { n: '01', w: 'Build', k: 'Ground-up development', p: 'Energy-efficient, purpose-built rental communities in supply-constrained markets.', f: 'Growth Strategy' },
  { n: '02', w: 'Buy', k: 'Core acquisition', p: 'Modern, stabilized, institutional-quality rental properties at today’s pricing.', f: 'Income Strategy' },
  { n: '03', w: 'Hold', k: 'Long-term ownership', p: 'Held for recurring income and long-term appreciation across cycles.', f: 'Across the platform' },
]

const RESILIENT = [
  { title: 'Resilient Buildings', body: 'We own comfortable, durable, and nurturing buildings that support resident well-being where people love to live long term.', img: R + 'HW_Render_3385-Lawrence.jpg' },
  { title: 'Resilient Communities', body: 'Making community part of the place you live. Spaces and programming bringing humans together, so residents can thrive.', img: R + 'innovation/HW_Innovation_Community-Space.jpg' },
  { title: 'Resilient Investments', body: 'Investments focused on quality, desirability, and effective management are resilient through economic cycles.', img: R + 'HW_Render_360-Kennedy-Lane.jpg' },
]

const VALUES = [
  { n: '01', k: 'Practical innovation', v: 'We test, measure and improve — building by building.' },
  { n: '02', k: 'Long-term thinking', v: 'We build to hold, so we build to last.' },
  { n: '03', k: 'One team', v: 'Investing, building and managing sit at the same table.' },
]

const GROUPS = [
  ['Partners', 'partners'],
  ['Senior advisors', 'advisors'],
  ['Team', 'team'],
]

const FIELD = sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:12px;text-transform:uppercase;display:flex;flex-direction:column;gap:8px')
const INPUT = sx('padding:14px 16px;border:1.5px solid var(--hw-black);background:transparent;font-family:var(--font-body);font-size:18px;color:var(--hw-black);text-transform:none')

function Who({ go }) {
  return (
    <>
      <section data-screen-label="Who we are — Hero" style={sx('position:relative;overflow:hidden;min-height:clamp(480px,46vw,680px);display:flex;align-items:flex-end')}>
        <div style={sx('position:absolute;top:0;bottom:0;right:0;width:min(100%,max(46%,380px));pointer-events:none')}>
          <DotField preset="icons" icons="BUILDING|HOUSE|EQUITY|RETURNS" iconSize=".6" interval="3900" color="#BC532D" />
        </div>
        <div style={sx('position:relative;padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:24px')}>
          <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(18px,1.4vw,22px);text-transform:uppercase;color:var(--hw-terracotta)')}>Who we are</p>
          <h1 style={sx('margin:0;max-width:980px;font-family:var(--font-display);font-weight:500;font-size:clamp(34px,4.4vw,64px);line-height:1.05;letter-spacing:-.02em;text-wrap:balance;background:rgba(249,249,249,.82)')}>
            Heartwood is a next-generation real estate platform focused on enduring buildings, healthier homes, stronger communities, and durable investment returns.
          </h1>
        </div>
      </section>

      <section data-screen-label="Who we are — Heartwood" style={sx('position:relative;overflow:hidden;background:var(--hw-black);color:var(--hw-white);min-height:clamp(520px,50vw,760px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));align-items:center')}>
        <div style={sx('padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:24px;position:relative;z-index:1')}>
          <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(14px,1.2vw,18px);text-transform:uppercase;color:var(--hw-hemlock)')}>Why Heartwood</p>
          <p style={sx('margin:0;max-width:600px;font-family:var(--font-display);font-weight:500;font-size:clamp(28px,3vw,44px);line-height:1.12;letter-spacing:-.01em;text-wrap:balance')}>
            The wood at the heart of a tree is its strength. Formed slowly. Strengthened by growth, and solid enough to support the living system around it.
          </p>
          <p style={sx('margin:0;max-width:540px;font-size:clamp(17px,1.35vw,20px);line-height:1.5')}>
            We build, acquire, and operate high-quality multifamily real estate designed to become stronger over time — creating resilient buildings, resilient communities, and resilient portfolios for our investors.
          </p>
        </div>
        <div style={sx('position:relative;height:100%;min-height:420px')}>
          <div style={sx('position:absolute;inset:0;pointer-events:none')}>
            <DotField preset="icons" icons="LOCATION PIN|BUILDING|TREE|HOUSE" iconSize=".6" interval="4200" color="#B28951" />
          </div>
        </div>
      </section>

      <section data-screen-label="Who we are — Build Buy Hold" style={sx(`padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:clamp(28px,3vw,44px);background:${RULE_BG}`)}>
        <div style={sx('display:flex;flex-direction:column;gap:20px')}>
          <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(14px,1.2vw,18px);text-transform:uppercase;color:var(--hw-teal)')}>The platform</p>
          <h2 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(40px,5vw,76px);line-height:1;letter-spacing:-.02em')}>Build. Buy. Hold.</h2>
          <p style={sx('margin:0;max-width:620px;font-size:clamp(17px,1.35vw,20px);line-height:1.5')}>
            Heartwood’s living platform develops high-quality, energy-efficient communities, buys modern stabilized core properties, and holds them for long-term appreciation.
          </p>
        </div>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));border-top:1px solid var(--hw-black)')}>
          {TIERS.map((t) => (
            <div key={t.n} style={sx('padding:28px 28px 32px 0;display:flex;flex-direction:column;gap:12px;border-bottom:1px solid var(--hw-black)')}>
              <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:14px;color:var(--hw-black)')}>{t.n}</span>
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(48px,6vw,84px);line-height:1;letter-spacing:-.025em')}>{t.w}</span>
              <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:13px;text-transform:uppercase')}>{t.k}</span>
              <p style={sx('margin:0;font-size:18px;line-height:1.45;max-width:380px')}>{t.p}</p>
              <span style={sx('margin-top:8px;padding-top:12px;border-top:1px solid var(--hw-black);font-family:var(--font-subhead);font-weight:500;font-size:12px;text-transform:uppercase')}>{t.f}</span>
            </div>
          ))}
        </div>
      </section>

      <section data-screen-label="Who we are — Resilient" style={sx('background:var(--hw-cool-grey);padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:clamp(24px,3vw,48px)')}>
        {RESILIENT.map((r) => (
          <div key={r.title} style={sx('display:flex;flex-direction:column;gap:16px')}>
            <img src={r.img} alt="" style={sx('width:100%;aspect-ratio:4/3;object-fit:cover;display:block;background:var(--hw-brown)')} />
            <h3 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.2vw,32px);letter-spacing:-.01em')}>{r.title}</h3>
            <p style={sx('margin:0;font-size:18px;line-height:1.45;text-wrap:pretty')}>{r.body}</p>
          </div>
        ))}
      </section>

      <section style={sx('padding:clamp(40px,5vw,72px) clamp(20px,3vw,40px);display:flex;flex-wrap:wrap;gap:20px;justify-content:space-between;align-items:center;border-top:var(--section-rule)')}>
        <p style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.4vw,36px)')}>Meet the specialists behind the platform.</p>
        <Hv as="button" onClick={() => go('about/leadership')} s="padding:14px 22px;background:var(--hw-black);color:var(--hw-white);border:0;cursor:pointer;font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase" h="background:var(--hw-teal)">
          Our team →
        </Hv>
      </section>
    </>
  )
}

function Leadership() {
  const [open, setOpen] = useState(null)
  return (
    <section data-screen-label="Team" style={sx('background:var(--hw-white);color:var(--hw-black)')}>
      <div style={sx('position:relative;overflow:hidden;min-height:clamp(380px,36vw,520px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));align-items:end')}>
        <div style={sx('padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px) clamp(32px,4vw,56px);display:flex;flex-direction:column;gap:20px;position:relative;z-index:1')}>
          <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(14px,1.2vw,18px);text-transform:uppercase;color:var(--hw-teal)')}>Team</p>
          <h1 style={sx('margin:0;max-width:640px;font-family:var(--font-display);font-weight:500;font-size:clamp(34px,4.4vw,64px);line-height:1.05;letter-spacing:-.02em;text-wrap:balance')}>One integrated team, united by one goal.</h1>
          <p style={sx('margin:0;max-width:520px;font-size:clamp(17px,1.35vw,20px);line-height:1.5')}>
            Our team brings together specialists from across real estate, each with deep experience in their disciplines.
          </p>
        </div>
        <div style={sx('position:relative;height:100%;min-height:340px')}>
          <div style={sx('position:absolute;inset:0;pointer-events:none')}>
            <DotField preset="icons" icons="OFFICE|CO-WORKING SPACE|LIBRARY|CLOCK" iconSize=".6" interval="4500" color="#2697AA" />
          </div>
        </div>
      </div>
      {GROUPS.map(([label, key]) => (
        <div key={key}>
          <div style={sx('padding:clamp(28px,3vw,40px) clamp(20px,3vw,40px) 14px;font-family:var(--font-subhead);font-weight:500;font-size:13px;text-transform:uppercase;color:var(--hw-teal)')}>{label}</div>
          {HW_DATA.team
            .filter((t) => t.group === key)
            .map((t) => {
              const isOpen = open === t.id
              return (
                <div key={t.id} style={sx('border-top:1.5px solid rgba(33,33,33,.3)')}>
                  <Hv
                    as="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen((o) => (o === t.id ? null : t.id))}
                    s="width:100%;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,260px) 48px;gap:24px;align-items:center;padding:clamp(18px,2vw,26px) clamp(20px,3vw,40px);background:none;border:0;cursor:pointer;color:var(--hw-black);text-align:left"
                    h="background:rgba(33,33,33,.04)"
                  >
                    <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.4vw,34px);letter-spacing:-.01em')}>{t.name}</span>
                    <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:12px;text-transform:uppercase;color:var(--hw-teal);line-height:1.3')}>{t.title}</span>
                    <span style={sx('position:relative;width:36px;height:36px;justify-self:end;display:block')}>
                      <span style={sx('position:absolute;left:0;right:0;top:50%;height:1px;background:var(--hw-black);display:block')} />
                      <span style={sx(`position:absolute;top:0;bottom:0;left:50%;width:1px;background:var(--hw-black);display:block;transform:scaleY(${isOpen ? 0 : 1});transition:transform .3s`)} />
                    </span>
                  </Hv>
                  {isOpen && (
                    <div style={sx('display:grid;grid-template-columns:minmax(0,200px) minmax(0,640px);gap:clamp(20px,3vw,40px);padding:0 clamp(20px,3vw,40px) clamp(24px,3vw,36px)')}>
                      <img src={t.photo} alt={t.name} style={sx('width:100%;aspect-ratio:1/1;object-fit:cover;display:block;filter:grayscale(1);background:var(--hw-brown)')} />
                      <p style={sx('margin:0;font-size:clamp(17px,1.35vw,20px);line-height:1.55;text-wrap:pretty')}>{t.bio || 'Full bio coming soon.'}</p>
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      ))}
      <div style={sx('border-top:1.5px solid rgba(33,33,33,.3);height:clamp(40px,5vw,72px)')} />
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <section data-screen-label="Contact" style={sx(`padding:clamp(48px,6vw,96px) clamp(20px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(32px,5vw,80px);align-items:start;background:${RULE_BG}`)}>
      <div style={sx('display:flex;flex-direction:column;gap:24px')}>
        <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(18px,1.4vw,22px);text-transform:uppercase;color:var(--hw-terracotta)')}>Contact</p>
        <h1 style={sx('margin:0;max-width:640px;font-family:var(--font-display);font-weight:500;font-size:clamp(34px,4.4vw,64px);line-height:1.05;letter-spacing:-.02em;text-wrap:balance')}>Contact us.</h1>
        <p style={sx('margin:0;max-width:520px;font-size:clamp(18px,1.5vw,22px);line-height:1.5')}>
          Questions about Heartwood, our properties or working with us. We’ll reply within one business day.
        </p>
        <div style={sx('display:flex;flex-direction:column;gap:6px;font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase;line-height:1.5')}>
          <span>25 King St W, Toronto, Ontario M5L 2A1</span>
          <a href="mailto:info@heartwood.com">info@heartwood.com</a>
        </div>
      </div>
      <div style={sx('display:flex;flex-direction:column;gap:18px')}>
        <HubspotNote label="General contact" />
        {sent ? (
          <p style={sx('margin:0;font-family:var(--font-display);font-size:clamp(22px,2.2vw,32px)')}>Thanks. We’ll be in touch shortly.</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
            style={sx('display:flex;flex-direction:column;gap:18px')}
          >
            <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:18px')}>
              <label style={FIELD}>Name<input required style={INPUT} /></label>
              <label style={FIELD}>Email<input type="email" required style={INPUT} /></label>
            </div>
            <label style={FIELD}>Message<textarea rows={5} style={{ ...INPUT, resize: 'vertical' }} /></label>
            <Hv as="button" type="submit" s="align-self:flex-start;padding:16px 26px;background:var(--hw-black);color:var(--hw-white);border:0;cursor:pointer;font-family:var(--font-subhead);font-weight:500;font-size:15px;text-transform:uppercase" h="background:var(--hw-terracotta)">
              Send message
            </Hv>
          </form>
        )}
      </div>
    </section>
  )
}

function Careers() {
  return (
    <>
      <section data-screen-label="Careers — Hero" style={sx("position:relative;overflow:hidden;min-height:clamp(480px,48vw,720px);background:var(--hw-brown) url('/assets/lifestyle/HW_Lifestyle_37.jpg') center/cover no-repeat;display:flex;align-items:flex-end")}>
        <div style={sx('position:absolute;inset:0;background:var(--overlay-brown)')} />
        <div style={sx('position:absolute;top:0;bottom:0;right:0;width:min(100%,max(46%,380px));pointer-events:none')}>
          <DotField preset="icons" icons="CO-WORKING SPACE|CAFE|OFFICE|COMPUTER|BUILDING|RETURNS" iconSize=".6" interval="4800" color="#C5DCEA" />
        </div>
        <div style={sx('position:relative;padding:clamp(40px,5vw,72px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:20px;color:var(--hw-white)')}>
          <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(14px,1.2vw,18px);text-transform:uppercase')}>Careers</p>
          <h1 style={sx('margin:0;max-width:760px;font-family:var(--font-display);font-weight:500;font-size:clamp(34px,4.4vw,64px);line-height:1.05;letter-spacing:-.02em;text-wrap:balance')}>Build the next generation of real estate with us.</h1>
        </div>
      </section>
      <section style={sx('padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(32px,5vw,80px)')}>
        <div style={sx('display:flex;flex-direction:column;gap:20px')}>
          <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(14px,1.2vw,18px);text-transform:uppercase;color:var(--hw-landscape)')}>Working at Heartwood</p>
          <p style={sx('margin:0;max-width:560px;font-size:clamp(18px,1.5vw,22px);line-height:1.5')}>
            Architects, developers, analysts, builders and data scientists working side by side, on shared systems. We look for people who want to rethink how housing gets made — practically, iteratively and together.
          </p>
          <p style={sx('margin:0;font-family:var(--font-subhead);font-size:12px;text-transform:uppercase;color:var(--hw-black)')}>Draft copy — for review</p>
        </div>
        <div style={sx('display:flex;flex-direction:column')}>
          {VALUES.map((v) => (
            <div key={v.n} style={sx('border-top:1px solid var(--hw-black);padding:20px 0;display:grid;grid-template-columns:48px minmax(0,1fr);gap:12px')}>
              <span style={sx('font-family:var(--font-subhead);font-weight:500;color:var(--hw-terracotta)')}>{v.n}</span>
              <span style={sx('display:flex;flex-direction:column;gap:6px')}>
                <span style={sx('font-family:var(--font-display);font-weight:500;font-size:22px')}>{v.k}</span>
                <span style={sx('font-size:18px;line-height:1.45')}>{v.v}</span>
              </span>
            </div>
          ))}
          <div style={sx('background:var(--hw-white);border:var(--rule);padding:28px;display:flex;flex-direction:column;gap:14px;align-items:flex-start;margin-top:12px')}>
            <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:13px;text-transform:uppercase')}>Open roles</span>
            <p style={sx('margin:0;font-size:19px;line-height:1.45')}>No open positions right now. We’re always glad to hear from exceptional people.</p>
            <a href="mailto:info@heartwood.com?subject=Careers" style={sx('padding:12px 18px;background:var(--hw-black);color:var(--hw-white);text-decoration:none;font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase')}>
              Introduce yourself
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

function PageAbout({ sub, go }) {
  const s = sub || 'who'
  return (
    <div style={sx('background:var(--hw-white);color:var(--hw-black);font-family:var(--font-body)')}>
      {s === 'who' && <Who go={go} />}
      {s === 'leadership' && <Leadership />}
      {s === 'contact' && <Contact />}
      {s === 'careers' && <Careers />}
    </div>
  )
}

export default PageAbout
