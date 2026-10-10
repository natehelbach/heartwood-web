import { useState } from 'react'
import { Hv, sx, RULE_BG, HubspotNote } from '../design/ui.jsx'
import HW_DATA from '../design/site-data.js'
import DotIcon from '../design/DotIcon.jsx'
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
      <div data-screen-label="Team — Hero" style={sx("position:relative;overflow:hidden;min-height:clamp(480px,48vw,720px);background:var(--hw-brown) url('/assets/photography/HW_MassTimber_Ceiling-Corner.jpg') center 15%/cover no-repeat;display:flex;align-items:flex-end")}>
        <div style={sx('position:absolute;inset:0;background:var(--overlay-brown)')} />
        <div style={sx('position:relative;padding:clamp(40px,5vw,72px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:20px;color:var(--hw-white)')}>
          <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(14px,1.2vw,18px);text-transform:uppercase')}>Team</p>
          <h1 style={sx('margin:0;max-width:760px;font-family:var(--font-display);font-weight:500;font-size:clamp(34px,4.4vw,64px);line-height:1.05;letter-spacing:-.02em;text-wrap:balance')}>One integrated team, building, owning and operating homes that last.</h1>
          <p style={sx('margin:0;max-width:560px;font-size:clamp(17px,1.35vw,20px);line-height:1.5')}>
            Our team brings together specialists from across real estate, each with deep experience in their disciplines.
          </p>
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
  { big: '65%+', icon: 'SOLAR / ENERGY', label: 'Typical reduction in energy use intensity for buildings we build vs. a functionally equivalent code-minimum building.' },
  { big: '1.5°C-aligned', icon: 'LOW CARBON', label: 'Portfolio carbon intensity targeted to align with a 1.5°C pathway (CRREM).' },
  { big: 'NZAM · PRI · GRESB', icon: 'RETURNS', label: 'Net Zero Asset Managers signatory, PRI signatory and annual GRESB reporting.' },
]

const STD_GROUPS = [
  { k: 'Investors', icon: 'MONEY' },
  { k: 'Residents', icon: 'HOME' },
  { k: 'Community', icon: 'PEOPLE' },
  { k: 'Ecosystem', icon: 'TREE' },
]

const STD_PILLARS = [
  { n: '01', icon: 'LOW CARBON', k: 'Low impact, by design.', v: 'We measure each building against recognized benchmarks for residential buildings and review the whole portfolio every year.' },
  { n: '02', icon: 'SOLAR / ENERGY', k: 'Efficient by default.', v: 'We set each property’s energy target based on its location and energy sources. Every unit a building doesn’t need lowers costs and its footprint.' },
  { n: '03', icon: 'THERMOSTAT', k: 'Measured continuously.', v: 'Our data platform and on-site metering track electricity, gas and water around the clock, so we spot problems early.' },
  { n: '04', icon: 'BUILDING', k: 'Built to endure.', v: 'We assess climate, regulatory and technology risk, so buildings protect their value and give residents a reason to stay.' },
]

const STD_APPLY = [
  {
    label: 'Growth Strategy · When we build', ring: '/assets/logos/HW_Growth_Ring_Black.png', bg: 'var(--hw-cool-grey)', fg: 'var(--hw-black)', line: 'rgba(33,33,33,.35)', chip: 'var(--hw-black)',
    items: [
      'All-electric, no fossil fuels on site, low-impact materials. We avoid impact at the source rather than offsetting it later.',
      'At least 65% less energy than code minimum, powered by 75%+ renewable energy.',
      'Metering and our data platform built in from day one.',
      'Natural materials, abundant light, a gym, outdoor space and lounges, in walkable neighbourhoods.',
    ],
  },
  {
    label: 'Income Strategy · When we buy', ring: '/assets/logos/HW_Income_Ring_White.png', bg: 'var(--hw-hemlock)', fg: 'var(--hw-white)', line: 'rgba(249,249,249,.5)', chip: 'var(--hw-white)',
    items: [
      'A plan to bring every building to our standard within two years of acquisition.',
      'Recommissioning, heat pumps, solar, new windows and fresh-air ventilation.',
      'Our technology connected and sensors added to track energy and water use.',
      'Amenities retrofitted for well-being, and fossil-free landscaping and snow removal.',
    ],
  },
]

export const STANDARD_LOGOS = [
  { name: 'CaGBC Zero Carbon Building Standard', url: 'https://www.cagbc.org/our-work/certification/zero-carbon-building-standard/', img: '/assets/logos/partners/CaGBC_Zero-Carbon-Building-Standard.png' },
  { name: 'CRREM', url: 'https://www.crrem.org/', img: '/assets/logos/partners/CRREM.png' },
  { name: 'GRESB', url: 'https://www.gresb.com/', img: '/assets/logos/partners/GRESB.png' },
  { name: 'PRI', url: 'https://www.unpri.org/', img: '/assets/logos/partners/PRI.png' },
  { name: 'Net Zero Asset Managers Initiative', url: 'https://www.netzeroassetmanagers.org/', img: '/assets/logos/partners/NZAM.png' },
]

// The logo grid, each logo linking to its organization. Shared with the Investments overview.
export function StandardLogos() {
  return (
    <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));border-top:1px solid var(--hw-black);border-left:1px solid var(--hw-black)')}>
      {STANDARD_LOGOS.map((l) => (
        <Hv
          key={l.name}
          as="a"
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${l.name} (opens in a new tab)`}
          s="min-height:110px;display:flex;align-items:center;justify-content:center;padding:16px 20px;border-right:1px solid var(--hw-black);border-bottom:1px solid var(--hw-black);text-align:center;font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase;line-height:1.3;color:var(--hw-black);text-decoration:none;transition:background .15s"
          h="background:rgba(197,220,234,.35)"
        >
          <img src={l.img} alt={l.name} style={sx('max-width:100%;max-height:64px;width:auto;height:auto;display:block;mix-blend-mode:multiply')} />
        </Hv>
      ))}
    </div>
  )
}

const STD_EYEBROW = 'margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(14px,1.2vw,16px);text-transform:uppercase;color:var(--hw-terracotta)'
const STD_H2 = 'margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(32px,3.6vw,54px);line-height:1.05;letter-spacing:-.02em;text-wrap:balance'
const STD_BODY = 'margin:0;font-size:clamp(16px,1.2vw,18px);line-height:1.5;text-wrap:pretty'

const STD_H3 = 'margin:24px 0 0;font-family:var(--font-display);font-weight:500;font-size:clamp(22px,1.9vw,28px);line-height:1.15;letter-spacing:-.01em'

const STD_FOLLOW = [
  ['CRREM', 'We set our emissions targets using national CRREM decarbonization pathways: science-based annual carbon intensity limits from 2020 to 2050, specific to each country and building type.'],
  ['CaGBC Zero Carbon Building Standard', 'The Growth Trust prioritizes projects designed to meet, or already certified to, the Zero Carbon Building standard.'],
  ['Net Zero Asset Managers initiative', 'As a signatory, we have committed Growth Trust assets to be managed toward net zero emissions by 2050 or sooner.'],
  ['GHG Protocol', 'Our emissions reporting follows the GHG Protocol Corporate Standard. For Growth Trust assets, we also report embodied carbon under the Scope 3 Standard.'],
  ['UN Sustainable Development Goals', 'Using the SDG Compass, we identified the SDGs our sustainability metrics contribute to measurably.'],
]

const STD_REPORT = [
  ['PRI', 'We are a signatory to the Principles for Responsible Investment and report annually.'],
  ['GRESB', 'The Growth Trust reports to GRESB annually.'],
  ['Common Impact Data Standard', 'Our sustainability indicators are published in the Common Impact Data Standard format.'],
]

function FrameworkList({ items, last }) {
  return (
    <div style={sx(`display:flex;flex-direction:column;border-bottom:1px solid var(--hw-black)${last ? ';margin-bottom:24px' : ''}`)}>
      {items.map(([k, v]) => (
        <div key={k} style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:8px clamp(20px,3vw,48px);padding:18px 0;border-top:1px solid var(--hw-black)')}>
          <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:15px;text-transform:uppercase;line-height:1.35')}>{k}</span>
          <p style={sx('margin:0;max-width:720px;font-size:18px;line-height:1.5;text-wrap:pretty')}>{v}</p>
        </div>
      ))}
    </div>
  )
}

function Standards() {
  return (
    <>
      <section data-screen-label="Standards — Hero" style={sx("position:relative;overflow:hidden;min-height:clamp(440px,44vw,640px);background:var(--hw-brown) url('/assets/photography/HW_Wood-Slice-Rings.jpg') 30% 15%/cover no-repeat;display:flex;align-items:flex-end")}>
        <div style={sx('position:absolute;inset:0;background:var(--overlay-brown)')} />
        <div style={sx('position:relative;padding:clamp(32px,4vw,56px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:20px;color:var(--hw-white)')}>
          <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(14px,1.2vw,18px);text-transform:uppercase')}>Our standards</p>
          <h1 style={sx('margin:0;max-width:900px;font-family:var(--font-display);font-weight:500;font-size:clamp(40px,5.4vw,88px);line-height:1;letter-spacing:-.02em;text-wrap:balance')}>Built to a higher standard.</h1>
          <p style={sx('margin:0;max-width:680px;font-size:clamp(18px,1.5vw,22px);line-height:1.5;text-wrap:pretty')}>
            Efficient, durable and healthy buildings cost less to run, stay competitive for longer and are better to live in. That is why environmental performance is part of every investment decision we make.
          </p>
        </div>
      </section>

      <section data-screen-label="Standards — Proof" style={sx('padding:clamp(32px,3.5vw,48px) clamp(20px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:clamp(24px,3vw,40px)')}>
        {STD_PROOF.map((p) => (
          <div key={p.big} style={sx('display:flex;flex-direction:column;gap:14px;border-top:1px solid var(--hw-black);padding-top:20px')}>
            <DotIcon name={p.icon} color="#617954" size={48} />
            <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(36px,3.8vw,58px);line-height:1;letter-spacing:-.02em;color:var(--hw-landscape)')}>{p.big}</span>
            <p style={sx('margin:0;max-width:380px;font-size:18px;line-height:1.45;text-wrap:pretty')}>{p.label}</p>
          </div>
        ))}
      </section>

      <section data-screen-label="Standards — Mindset" style={sx('background:var(--hw-white);border-top:1.5px solid var(--hw-terracotta);padding:clamp(32px,3.5vw,48px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:clamp(28px,3vw,44px)')}>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:clamp(24px,4vw,72px);align-items:start')}>
          <div style={sx('display:flex;flex-direction:column;gap:20px')}>
            <p style={sx(STD_EYEBROW)}>Stewardship</p>
            <h2 style={sx(STD_H2)}>Most buildings take from their surroundings without a thought for what they leave behind.</h2>
          </div>
          <div style={sx('display:flex;flex-direction:column;gap:20px;font-size:clamp(18px,1.4vw,20px);line-height:1.6;text-wrap:pretty')}>
            <p style={sx('margin:0')}>
              They draw heavily on energy, water and materials, and they deplete our land and the communities around them. We approach sustainability through the mindset of environmental stewardship. That means asking not only how to reduce emissions, but how to create healthy, well-built spaces that are regenerative by nature for the residents who live in them and the communities that surround them.
            </p>
            <p style={sx('margin:0')}>
              We don’t believe any building can have zero impact on our ecosystem, but we do believe a building can come close to neutral. That is the standard we hold ourselves to: the least possible impact on our ecosystem, alongside the strongest possible financial return.
            </p>
          </div>
        </div>
        <div style={sx('display:flex;flex-direction:column;gap:24px')}>
          <p style={sx('margin:0;max-width:900px;font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.4vw,34px);line-height:1.2;letter-spacing:-.01em;text-wrap:pretty')}>Every building we build or buy serves four groups.</p>
          <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));border-top:1px solid var(--hw-black);border-left:1px solid var(--hw-black)')}>
            {STD_GROUPS.map((g) => (
              <div key={g.k} style={sx('display:flex;flex-direction:column;gap:16px;padding:clamp(20px,2.4vw,32px);border-right:1px solid var(--hw-black);border-bottom:1px solid var(--hw-black)')}>
                <DotIcon name={g.icon} color="#212121" size={44} />
                <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.2vw,32px);line-height:1')}>{g.k}</span>
              </div>
            ))}
          </div>
          <p style={sx('margin:0;max-width:820px;font-size:clamp(18px,1.4vw,20px);line-height:1.6;text-wrap:pretty')}>
            We don’t see these as competing interests. A building that is efficient, durable, healthy and beautiful costs less to run, keeps residents longer, adds to the neighborhood around it and holds its value for decades. Good stewardship and strong returns can derive from the same decisions.
          </p>
        </div>
      </section>

      <section data-screen-label="Standards — Our standard" style={sx('padding:clamp(32px,3.5vw,48px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:clamp(28px,3vw,44px)')}>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(28px,4vw,56px);align-items:start')}>
          <div style={sx('display:flex;flex-direction:column;gap:20px')}>
            <p style={sx(STD_EYEBROW)}>Our standard</p>
            <h2 style={sx(STD_H2)}>To do it, we hold every building we build and buy to a standard.</h2>
          </div>
          <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,max(240px,calc(50% - 1px))),1fr))')}>
            {STD_PILLARS.map((p) => (
              <div key={p.n} style={sx('padding:clamp(20px,2vw,28px);display:flex;flex-direction:column;gap:12px')}>
                <div style={sx('display:flex;justify-content:space-between;align-items:flex-start')}>
                  <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:15px;color:var(--hw-terracotta)')}>{p.n}</span>
                  <DotIcon name={p.icon} color="#BC532D" size={40} />
                </div>
                <h3 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(22px,2vw,28px);line-height:1.05;letter-spacing:-.01em')}>{p.k}</h3>
                <p style={sx(STD_BODY)}>{p.v}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={sx('display:flex;flex-direction:column;gap:16px')}>
          <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(14px,1.2vw,16px);text-transform:uppercase')}>How we apply it</p>
          <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(12px,1.4vw,16px)')}>
            {STD_APPLY.map((c) => (
              <div key={c.label} style={sx(`background:${c.bg};color:${c.fg};padding:clamp(24px,3vw,40px);display:flex;flex-direction:column;gap:18px`)}>
                <div style={sx('display:flex;align-items:center;gap:14px')}>
                  <img src={c.ring} alt="" style={sx('height:44px;width:auto;display:block')} />
                  <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:15px;text-transform:uppercase')}>{c.label}</span>
                </div>
                <div style={sx(`display:flex;flex-direction:column;border-top:1px solid ${c.line}`)}>
                  {c.items.map((t, i) => (
                    <div key={t} style={sx(`display:flex;gap:14px;align-items:baseline;padding:12px 0;border-bottom:1px solid ${c.line}`)}>
                      <span style={sx(`flex:none;display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:26px;padding:0 6px;box-sizing:border-box;border:1px solid ${c.chip};font-family:var(--font-subhead);font-size:13px`)}>{'0' + (i + 1)}</span>
                      <p style={sx(STD_BODY)}>{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-screen-label="Standards — Frameworks" style={sx('padding:clamp(32px,3.5vw,48px) clamp(20px,3vw,40px) clamp(48px,6vw,88px);display:flex;flex-direction:column;gap:20px')}>
        <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(16px,1.3vw,20px);text-transform:uppercase;color:var(--hw-terracotta)')}>Signatories and frameworks</p>
        <p style={sx('margin:0;max-width:720px;font-size:clamp(18px,1.5vw,22px);line-height:1.5;text-wrap:pretty')}>We design, measure and report against recognized standards.</p>
        <h3 style={sx(STD_H3)}>Standards we follow</h3>
        <FrameworkList items={STD_FOLLOW} />
        <h3 style={sx(STD_H3)}>How we report</h3>
        <FrameworkList items={STD_REPORT} last />
        <StandardLogos />
      </section>
    </>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <>
      <section data-screen-label="Contact — Hero" style={sx("position:relative;overflow:hidden;min-height:clamp(480px,48vw,720px);background:var(--hw-brown) url('/assets/photography/HW_MassTimber_Living-Room-Window.jpg') center 75%/cover no-repeat;display:flex;align-items:flex-end")}>
        <div style={sx('position:absolute;inset:0;background:var(--overlay-brown)')} />
        <div style={sx('position:relative;padding:clamp(40px,5vw,72px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:20px;color:var(--hw-white)')}>
          <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(14px,1.2vw,18px);text-transform:uppercase')}>Contact</p>
          <h1 style={sx('margin:0;max-width:760px;font-family:var(--font-display);font-weight:500;font-size:clamp(34px,4.4vw,64px);line-height:1.05;letter-spacing:-.02em;text-wrap:balance')}>Contact us.</h1>
        </div>
      </section>
    <section data-screen-label="Contact" style={sx(`padding:clamp(48px,6vw,96px) clamp(20px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(32px,5vw,80px);align-items:start;background:${RULE_BG}`)}>
      <div style={sx('display:flex;flex-direction:column;gap:24px')}>
        <p style={sx('margin:0;max-width:520px;font-size:clamp(18px,1.5vw,22px);line-height:1.5')}>
          We’d love to hear from you, whether it’s about Heartwood, our properties or working together. Send us a note and we’ll reply within one business day.
        </p>
        <iframe src="/contact-map.html" title="Heartwood offices: Toronto and San Francisco" style={sx('width:100%;max-width:640px;aspect-ratio:16/10;border:0;display:block')} />
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
    </>
  )
}

function Careers() {
  return (
    <>
      <section data-screen-label="Careers — Hero" style={sx("position:relative;overflow:hidden;min-height:clamp(480px,48vw,720px);background:var(--hw-brown) url('/assets/photography/HW_MassTimber_Lobby-Pendants.jpg') center 30%/cover no-repeat;display:flex;align-items:flex-end")}>
        <div style={sx('position:absolute;inset:0;background:var(--overlay-brown)')} />
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
