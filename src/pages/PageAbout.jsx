import { useState } from 'react'
import { Hv, sx, DotField, RULE_BG, HubspotNote } from '../design/ui.jsx'
import HW_DATA from '../design/site-data.js'
import PageWhoB from './PageWhoB.jsx'

// Ported from ui_kits/website/PageAbout.dc.html. `sub` is who | leadership | standards | careers | contact.
// "Who we are" uses the design's default layout, B (PageWhoB.dc.html).

const VALUES = [
  { n: '01', k: 'Practical innovation', v: 'We test, measure and improve — building by building.' },
  { n: '02', k: 'Long-term thinking', v: 'We build to hold, so we build to last.' },
  { n: '03', k: 'One team', v: 'Investing, building and managing sit at the same table.' },
]

const GROUPS = [
  ['Partners', 'partners'],
  ['Advisory board', 'board'],
  ['Senior advisors', 'advisors'],
  ['Team', 'team'],
]

const FIELD = sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:12px;text-transform:uppercase;display:flex;flex-direction:column;gap:8px')
const INPUT = sx('padding:14px 16px;border:1.5px solid var(--hw-black);background:transparent;font-family:var(--font-body);font-size:18px;color:var(--hw-black);text-transform:none')

function Leadership() {
  const [open, setOpen] = useState(null)
  return (
    <section data-screen-label="Team" style={sx('background:var(--hw-white);color:var(--hw-black)')}>
      <div style={sx('position:relative;overflow:hidden;min-height:clamp(380px,36vw,520px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));align-items:end')}>
        <div style={sx('padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px) clamp(32px,4vw,56px);display:flex;flex-direction:column;gap:20px;position:relative;z-index:1')}>
          <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(14px,1.2vw,18px);text-transform:uppercase;color:var(--hw-teal)')}>Team</p>
          <h1 style={sx('margin:0;max-width:640px;font-family:var(--font-display);font-weight:500;font-size:clamp(34px,4.4vw,64px);line-height:1.05;letter-spacing:-.02em;text-wrap:balance')}>One integrated team, building, owning and operating homes that last.</h1>
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
                      <div style={sx('display:flex;flex-direction:column;gap:24px;align-items:flex-start')}>
                        <p style={sx('margin:0;font-size:clamp(17px,1.35vw,20px);line-height:1.55;text-wrap:pretty;white-space:pre-line')}>{t.bio || 'Full bio coming soon.'}</p>
                        <Hv
                          as="a"
                          href={t.linkedin || 'https://www.linkedin.com/company/heartwood-investments1/people/'}
                          target="_blank"
                          rel="noopener noreferrer"
                          s="display:inline-flex;align-items:center;gap:10px;padding:12px 18px;border:1.5px solid var(--hw-black);color:var(--hw-black);text-decoration:none;font-family:var(--font-subhead);font-weight:500;font-size:14px;letter-spacing:.03em;text-transform:uppercase"
                          h="background:var(--hw-black);color:var(--hw-white)"
                        >
                          View {t.name.split(' ')[0]}’s LinkedIn ↗
                        </Hv>
                      </div>
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

const STD_PROOF = [
  { big: '76%', label: 'Typical reduction in energy use intensity for Growth Trust buildings vs. a code-minimum equivalent.' },
  { big: '1.5°C-aligned', label: 'Portfolio carbon intensity targeted to align with a 1.5°C pathway (CRREM).' },
  { big: 'Zero Carbon', label: 'Growth Trust prioritizes CaGBC Zero Carbon Building–certified projects.' },
  { big: 'NZAM · PRI · GRESB', label: 'Net Zero Asset Managers signatory, PRI signatory and annual GRESB reporting.' },
]

const STD_DETAIL = [
  { n: '01', k: 'Climate targets', v: 'Across all our strategies, we target an operational carbon intensity equal to or better than the applicable national CRREM pathway for residential buildings. The Growth Trust prioritizes all-electric buildings and on-site renewable energy, and aims to keep embodied carbon at or below the SBTi pathway for residential buildings. For each Income Trust property, we create a carbon reduction plan within two years of acquisition.' },
  { n: '02', k: 'Monitoring', v: 'Our data platform and on-site metering track electricity, gas and water use continuously, so we can report energy, carbon and water intensity, spot faults early and plan maintenance before small problems become large ones.' },
  { n: '03', k: 'Climate risk', v: 'We assess physical risks such as flooding, extreme heat, storms and wildfire, and transition risks such as changing regulation and tenant demand, using forward-looking climate data and engineering expertise.' },
]

const LP = '/assets/logos/partners/'
const STD_LOGOS = [
  { name: 'CaGBC Zero Carbon Building Standard', img: LP + 'CaGBC_Zero-Carbon-Building-Standard.png' },
  { name: 'CRREM', img: LP + 'CRREM.png' },
  { name: 'GRESB', img: LP + 'GRESB.png' },
  { name: 'PRI', img: LP + 'PRI.png' },
  { name: 'Net Zero Asset Managers Initiative', img: LP + 'NZAM.png' },
]

function Standards() {
  return (
    <>
      <section data-screen-label="Standards — Hero" style={sx("position:relative;overflow:hidden;min-height:clamp(440px,44vw,640px);background:var(--hw-brown) url('/assets/photography/HW_Photo_Rooftop-Terrace.jpg') center/cover no-repeat;display:flex;align-items:flex-end")}>
        <div style={sx('position:absolute;inset:0;background:var(--overlay-brown)')} />
        <div style={sx('position:relative;padding:clamp(32px,4vw,56px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:20px;color:var(--hw-white)')}>
          <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(14px,1.2vw,18px);text-transform:uppercase')}>Our standards</p>
          <h1 style={sx('margin:0;max-width:900px;font-family:var(--font-display);font-weight:500;font-size:clamp(40px,5.4vw,88px);line-height:1;letter-spacing:-.02em;text-wrap:balance')}>Built to a higher standard.</h1>
          <p style={sx('margin:0;max-width:680px;font-size:clamp(18px,1.5vw,22px);line-height:1.5;text-wrap:pretty')}>
            Efficient, low-carbon buildings cost less to run, stay competitive for longer and are healthier to live in. That is why environmental performance is part of every investment decision we make.
          </p>
        </div>
      </section>
      <section data-screen-label="Standards — Proof" style={sx('padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:clamp(20px,3vw,40px)')}>
        {STD_PROOF.map((p) => (
          <div key={p.big} style={sx('display:flex;flex-direction:column;gap:12px;border-top:1px solid var(--hw-black);padding-top:18px')}>
            <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(34px,3.4vw,52px);line-height:1;letter-spacing:-.02em;color:var(--hw-landscape)')}>{p.big}</span>
            <p style={sx('margin:0;font-size:18px;line-height:1.45;text-wrap:pretty')}>{p.label}</p>
          </div>
        ))}
      </section>
      <section data-screen-label="Standards — Detail" style={sx(`padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;background:${RULE_BG}`)}>
        {STD_DETAIL.map((d) => (
          <div key={d.n} style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:16px clamp(24px,4vw,72px);padding:clamp(24px,3vw,40px) 0;border-bottom:1px solid rgba(33,33,33,.3)')}>
            <div style={sx('display:flex;gap:14px;align-items:baseline')}>
              <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:15px;color:var(--hw-terracotta)')}>{d.n}</span>
              <h2 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(26px,2.4vw,36px);line-height:1.1;letter-spacing:-.01em')}>{d.k}</h2>
            </div>
            <p style={sx('margin:0;max-width:720px;font-size:clamp(18px,1.4vw,20px);line-height:1.6;text-wrap:pretty')}>{d.v}</p>
          </div>
        ))}
      </section>
      <section data-screen-label="Standards — Frameworks" style={sx('padding:0 clamp(20px,3vw,40px) clamp(48px,6vw,88px);display:flex;flex-direction:column;gap:20px')}>
        <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(16px,1.3vw,20px);text-transform:uppercase;color:var(--hw-terracotta)')}>Standards and frameworks</p>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));border-top:1px solid var(--hw-black);border-left:1px solid var(--hw-black)')}>
          {STD_LOGOS.map((l) => (
            <div key={l.name} style={sx('min-height:110px;display:flex;align-items:center;justify-content:center;padding:16px 20px;border-right:1px solid var(--hw-black);border-bottom:1px solid var(--hw-black);text-align:center;font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase;line-height:1.3')}>
              <img src={l.img} alt={l.name} style={sx('max-width:100%;max-height:64px;width:auto;height:auto;display:block;mix-blend-mode:multiply')} />
            </div>
          ))}
        </div>
      </section>
    </>
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
          <h1 style={sx('margin:0;max-width:760px;font-family:var(--font-display);font-weight:500;font-size:clamp(34px,4.4vw,64px);line-height:1.05;letter-spacing:-.02em;text-wrap:balance')}>Help us build, own and operate the next generation of housing.</h1>
        </div>
      </section>
      <section style={sx('padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(32px,5vw,80px)')}>
        <div style={sx('display:flex;flex-direction:column;gap:20px')}>
          <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(14px,1.2vw,18px);text-transform:uppercase;color:var(--hw-landscape)')}>Working at Heartwood</p>
          <p style={sx('margin:0;max-width:560px;font-size:clamp(18px,1.5vw,22px);line-height:1.5')}>
            We design, finance, build and operate rental housing, and invest in it for the long term. Architects, developers, builders, investment professionals, accountants and data scientists work side by side on shared systems, from the first site plan to years of ownership. We’re always looking for people who want to innovate in real estate investment, with the drive to deliver high-quality buildings and strong long-term returns.
          </p>
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
            <p style={sx('margin:0;font-size:19px;line-height:1.45')}>We’re always looking for talented people, even when there’s no open role. If you work in architecture, development, investing, construction, data science or technology and want to help build a better future for housing, we’d like to hear from you.</p>
            <a href="mailto:careers@heartwoodinvestments.ca?subject=Introduction%20%E2%80%94%20Careers%20at%20Heartwood" style={sx('padding:12px 18px;background:var(--hw-black);color:var(--hw-white);text-decoration:none;font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase')}>
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
      {s === 'who' && <PageWhoB go={go} />}
      {s === 'leadership' && <Leadership />}
      {s === 'standards' && <Standards />}
      {s === 'contact' && <Contact />}
      {s === 'careers' && <Careers />}
    </div>
  )
}

export default PageAbout
