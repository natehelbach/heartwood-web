import { useState } from 'react'
import { Hv, sx, RULE_BG, HsForm } from '../design/ui.jsx'
import HW_DATA from '../design/site-data.js'
import DotIcon from '../design/DotIcon.jsx'
import PageWhoB from './PageWhoB.jsx'
import { linkProps } from '../site/paths.js'

// Ported from ui_kits/website/PageAbout.dc.html. `sub` is who | leadership | standards | careers | contact.
// "Who we are" uses the design's default layout, B (PageWhoB.dc.html).

const VALUES = [
  { n: '01', k: 'Practical innovation', v: 'We test, measure and improve — building by building.' },
  { n: '02', k: 'Long-term thinking', v: 'We build to hold, so we build to last.' },
  { n: '03', k: 'One team', v: 'Investing, building and managing sit at the same table.' },
]

// The design hides the advisory board for now; restore by re-adding ['Advisory board', 'board'].
const GROUPS = [
  ['Partners', 'partners'],
  ['Senior advisors', 'advisors'],
  ['Team', 'team'],
]

// Team and senior advisors are listed by last name (ignoring a credential after a comma, like ", PMP").
const lastName = (t) => t.name.split(',')[0].trim().split(/\s+/).slice(-1)[0]
const groupMembers = (g) => {
  const l = HW_DATA.team.filter((t) => t.group === g)
  if (g === 'team' || g === 'advisors') l.sort((a, b) => lastName(a).localeCompare(lastName(b)) || a.name.localeCompare(b.name))
  return l
}

// People without a portrait yet get the dotted silhouette.
const NO_PORTRAIT = ['andrew', 'hendrenique', 'babak', 'michael', 'davena', 'daria']

// 4:5 team portraits, named after the person (assets/team/portrait/).
const portraitOf = (t) => `/assets/team/portrait/HW_Team_${t.name.replace(/\s+/g, '-')}_4x5_colour.jpg`

// Silhouette rows: [cy, first cx, last cx], dots every 5 units.
const SILHOUETTE = [
  [27.5, 42.5, 57.5], ...[32.5, 37.5, 42.5, 47.5, 52.5, 57.5].map((y) => [y, 37.5, 62.5]), ...[62.5, 67.5, 72.5, 77.5].map((y) => [y, 42.5, 57.5]),
  [82.5, 32.5, 67.5], [87.5, 27.5, 72.5], [92.5, 22.5, 77.5], [97.5, 17.5, 82.5], [102.5, 17.5, 82.5], ...[107.5, 112.5, 117.5, 122.5].map((y) => [y, 12.5, 87.5]),
]

function NoPortrait() {
  return (
    <svg viewBox="0 0 100 125" preserveAspectRatio="xMidYMax meet" aria-label="Photo coming soon" style={sx('position:absolute;inset:0;width:100%;height:100%;display:block')} fill="#212121">
      {SILHOUETTE.flatMap(([y, x0, x1]) => Array.from({ length: (x1 - x0) / 5 + 1 }, (_, i) => <circle key={y + '-' + i} cx={x0 + i * 5} cy={y} r="1.3" />))}
    </svg>
  )
}

function Leadership() {
  const [open, setOpen] = useState(null)
  return (
    <section data-screen-label="Team" style={sx('background:var(--hw-white);color:var(--hw-black)')}>
      <div data-screen-label="Team — Hero" style={sx('position:relative;overflow:hidden;min-height:clamp(480px,48vw,720px);background:var(--hw-black);display:flex;align-items:flex-end')}>
        <div style={sx("position:absolute;top:0;right:0;bottom:-288px;left:0;background:url('/assets/photography/HW_Team_Lobby-Walk.jpg') center center/cover no-repeat")} />
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
          {groupMembers(key).map((t) => {
              const isOpen = open === t.id
              return (
                <div key={t.id} style={sx('border-top:1.5px solid rgba(33,33,33,.3)')}>
                  <Hv
                    as="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen((o) => (o === t.id ? null : t.id))}
                    data-team-row=""
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
                    <div data-m-stack="" data-team-open="" style={sx('display:grid;grid-template-columns:minmax(0,240px) minmax(0,640px);gap:clamp(20px,3vw,40px);padding:clamp(8px,1vw,12px) clamp(20px,3vw,40px) clamp(28px,3vw,40px)')}>
                      <div style={sx('position:relative;width:100%;aspect-ratio:4/5;background:var(--hw-cool-grey)')}>
                        {NO_PORTRAIT.includes(t.id) ? <NoPortrait /> : <img loading="lazy" decoding="async" src={portraitOf(t)} alt={t.name} style={sx('position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;filter:grayscale(1)')} />}
                        <div style={sx('position:absolute;inset:0;background:rgba(197,220,234,.2);pointer-events:none')} />
                      </div>
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
  { big: 'NZAM · PRI · GRESB · INREV', tags: ['NZAM', 'PRI', 'GRESB', 'INREV'], icon: 'RETURNS', label: 'Net Zero Asset Managers signatory, PRI signatory and annual GRESB and INREV reporting.' },
]

const STD_PILLARS = [
  { n: '01', icon: 'RETURNS', k: 'Cost efficiency and enhanced asset value.', v: 'Energy performance improvements are a direct, quantifiable driver of investment returns.' },
  { n: '02', icon: 'BAR CHART', k: 'Reduced exposure to operating cost fluctuations and inflation.', v: 'The average multi-residential building in Ontario uses 64% of its energy for space heating. In Heartwood projects, that share falls to 16%.' },
  { n: '03', icon: 'RISK', k: 'Improved resilience: protection against physical climate and regulatory risks.', v: 'Physical and regulatory risks are an integral part of the energy transition, and they increasingly shape long-term asset performance.' },
  { n: '04', icon: 'PEOPLE', k: 'Driving quality and resident demand.', v: 'Three qualities of a more resilient building drive resident demand: physical comfort and health, lower energy costs, and the appeal of living in a zero-carbon or energy-efficient home.' },
]

const STD_APPLY = [
  {
    label: 'Growth Strategy · When we build', ring: '/assets/logos/HW_Growth_Ring_Black.png', bg: 'var(--hw-cool-grey)', fg: 'var(--hw-black)', line: 'rgba(33,33,33,.35)', chip: 'var(--hw-black)',
    items: [
      'We build all-electric buildings that burn no fossil fuels on site, and we endeavour to design projects that generate their own renewable energy.',
      'We choose materials and construction methods that keep the impact of building itself low. Wherever we can, we avoid impact at the source rather than offsetting it later.',
      'We design spaces that promote well-being for our residents: natural materials, abundant light, and access to gyms, outdoor space and community lounges, in walkable neighbourhoods.',
    ],
  },
]

export const STANDARD_LOGOS = [
  { name: 'CaGBC Zero Carbon Building Standard', url: 'https://www.cagbc.org/our-work/certification/zero-carbon-building-standard/', img: '/assets/logos/partners/CaGBC_Zero-Carbon-Building-Standard.png' },
  { name: 'CRREM', url: 'https://www.crrem.org/', img: '/assets/logos/partners/CRREM.png' },
  { name: 'GRESB', url: 'https://www.gresb.com/', img: '/assets/logos/partners/GRESB.png' },
  { name: 'INREV', url: 'https://www.inrev.org/', img: '/assets/logos/partners/INREV.png' },
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
          <img loading="lazy" decoding="async" src={l.img} alt={l.name} style={sx('max-width:100%;max-height:64px;width:auto;height:auto;display:block;mix-blend-mode:multiply')} />
        </Hv>
      ))}
    </div>
  )
}

const STD_EYEBROW = 'margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(14px,1.2vw,16px);text-transform:uppercase;color:var(--hw-terracotta)'
const STD_H2 = 'margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(32px,3.6vw,54px);line-height:1.05;letter-spacing:-.02em;text-wrap:balance'
const STD_BODY = 'margin:0;font-size:clamp(16px,1.2vw,18px);line-height:1.5;text-wrap:pretty'

const STD_H3 = 'margin:24px 0 0;font-family:var(--font-display);font-weight:500;font-size:clamp(22px,1.9vw,28px);line-height:1.15;letter-spacing:-.01em'

// [name, logo, text]
const STD_FOLLOW = [
  ['CRREM', '/assets/logos/partners/CRREM.png', 'We set our emissions targets using national CRREM decarbonization pathways: science-based annual carbon intensity limits from 2020 to 2050, specific to each country and building type.'],
  ['CaGBC Zero Carbon Building Standard', '/assets/logos/partners/CaGBC_Zero-Carbon-Building-Standard.png', 'The Growth Trust prioritizes projects designed to meet, or already certified to, the Zero Carbon Building standard.'],
  ['Net Zero Asset Managers initiative', '/assets/logos/partners/NZAM.png', 'As a signatory, we have committed Growth Trust assets to be managed toward net zero emissions by 2050 or sooner.'],
  ['UN Sustainable Development Goals', '/assets/logos/partners/UN-SDGs-wheel.png', 'Using the SDG Compass, we identified the SDGs our sustainability metrics contribute to measurably.'],
]

const STD_REPORT = [
  ['PRI', '/assets/logos/partners/PRI.png', 'We are a signatory to the Principles for Responsible Investment and report annually.'],
  ['GRESB', '/assets/logos/partners/GRESB.png', 'The Growth Trust reports to GRESB annually.'],
  ['INREV', '/assets/logos/partners/INREV.png', 'We report sustainability indicators in accordance with INREV reporting guidelines.'],
  ['Common Impact Data Standard', '/assets/logos/partners/Common-Impact-Data-Standard.png', 'Our sustainability indicators are available in the Common Impact Data Standard format.'],
  ['GHG Protocol', '/assets/logos/partners/GHG-Protocol.png', 'Our emissions reporting follows the GHG Protocol Corporate Standard. For Growth Trust assets, we also report embodied carbon under the Scope 3 Standard.'],
]

function FrameworkList({ items, last }) {
  return (
    <div style={sx(`display:flex;flex-direction:column;border-bottom:1px solid var(--hw-black)${last ? ';margin-bottom:24px' : ''}`)}>
      {items.map(([k, img, v]) => (
        <div key={k} style={sx('display:flex;flex-wrap:wrap;gap:8px clamp(20px,2.4vw,40px);align-items:center;padding:18px 0;border-top:1px solid var(--hw-black)')}>
          <span style={sx('display:flex;align-items:center;height:56px;flex:0 0 200px')}>
            <img loading="lazy" decoding="async" src={img} alt={k} style={sx('max-height:56px;max-width:180px;width:auto;height:auto;display:block;object-fit:contain;mix-blend-mode:multiply')} />
          </span>
          <p style={sx('flex:1 1 360px;margin:0;max-width:720px;font-size:18px;line-height:1.5;text-wrap:pretty')}>{v}</p>
        </div>
      ))}
    </div>
  )
}

function Standards({ go }) {
  return (
    <>
      <section data-screen-label="Standards — Hero" style={sx("position:relative;overflow:hidden;min-height:clamp(440px,44vw,640px);background:var(--hw-brown) url('/assets/photography/HW_Wood-Slice-Rings.jpg') 30% 15%/cover no-repeat;display:flex;align-items:flex-end")}>
        <div style={sx('position:absolute;inset:0;background:var(--overlay-brown)')} />
        <div style={sx('position:relative;padding:clamp(32px,4vw,56px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:20px;color:var(--hw-white)')}>
          <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(14px,1.2vw,18px);text-transform:uppercase')}>Our standards</p>
          <h1 style={sx('margin:0;max-width:900px;font-family:var(--font-display);font-weight:500;font-size:clamp(40px,5.4vw,88px);line-height:1;letter-spacing:-.02em;text-wrap:balance')}>Sustainability, to us, is practical: it’s building and operating with the future in mind.</h1>
          <p style={sx('margin:0;max-width:680px;font-size:clamp(18px,1.5vw,22px);line-height:1.5;text-wrap:pretty')}>
            Efficient, durable and healthy buildings cost less to run, stay competitive for longer and are better to live in. That is why resilience is part of every investment decision we make.
          </p>
        </div>
      </section>

      <section data-screen-label="Standards — Proof" style={sx('padding:clamp(32px,3.5vw,48px) clamp(20px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:clamp(24px,3vw,40px)')}>
        {STD_PROOF.map((p) => (
          <div key={p.big} style={sx('display:flex;flex-direction:column;gap:14px;border-top:1px solid var(--hw-black);padding-top:20px')}>
            <DotIcon name={p.icon} color="#617954" size={48} />
            {p.tags ? (
              <div style={sx('display:grid;grid-template-columns:repeat(2,max-content);gap:4px clamp(14px,1.4vw,22px);font-family:var(--font-display);font-weight:500;font-size:clamp(36px,3.8vw,58px);line-height:1;letter-spacing:-.02em;color:var(--hw-landscape)')}>
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            ) : (
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(36px,3.8vw,58px);line-height:1;letter-spacing:-.02em;color:var(--hw-landscape)')}>{p.big}</span>
            )}
            <p style={sx('margin:0;max-width:380px;font-size:18px;line-height:1.45;text-wrap:pretty')}>{p.label}</p>
          </div>
        ))}
      </section>

      <section data-screen-label="Standards — Mindset" style={sx('background:var(--hw-white);border-top:1.5px solid var(--hw-terracotta);padding:clamp(32px,3.5vw,48px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:clamp(28px,3vw,44px)')}>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:clamp(24px,4vw,72px);align-items:start')}>
          <div style={sx('display:flex;flex-direction:column;gap:20px')}>
            <p style={sx(STD_EYEBROW)}>Stewardship</p>
            <h2 style={sx(STD_H2)}>Resilient, low-energy buildings are a risk-mitigation and value-creation strategy, not a premium sustainability play.</h2>
          </div>
          <div style={sx('display:flex;flex-direction:column;gap:20px;font-size:clamp(18px,1.4vw,20px);line-height:1.6;text-wrap:pretty')}>
            <p style={sx('margin:0')}>
              We are working to shift the conversation about climate strategy in real estate away from environmental marketing and toward rigorous financial analysis. That means anticipating and managing material climate-related risks, prioritizing risk mitigation and value creation without adding unnecessary cost.
            </p>
            <p style={sx('margin:0')}>The same qualities also improve the resident experience, driving enduring demand.</p>
          </div>
        </div>
      </section>

      <section data-screen-label="Standards — Our standard" style={sx('padding:clamp(32px,3.5vw,48px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:clamp(28px,3vw,44px)')}>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(28px,4vw,56px);align-items:start')}>
          <div style={sx('display:flex;flex-direction:column;gap:20px')}>
            <p style={sx(STD_EYEBROW)}>Our standard</p>
            <h2 style={sx(STD_H2)}>Four opportunities shape every building we develop.</h2>
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
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(12px,1.4vw,16px);align-items:stretch')}>
          <div style={sx("min-height:clamp(320px,34vw,560px);background:var(--hw-brown) url('/assets/photography/HW_Photo_EV-Charging_NoLogo.jpg') center/cover no-repeat")} />
          <div style={sx('display:flex;flex-direction:column;gap:16px')}>
            <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(14px,1.2vw,16px);text-transform:uppercase')}>How we apply it</p>
            {STD_APPLY.map((c) => (
              <div key={c.label} style={sx(`background:${c.bg};color:${c.fg};padding:clamp(24px,3vw,40px);display:flex;flex-direction:column;gap:18px;flex:1`)}>
                <div style={sx('display:flex;align-items:center;gap:14px')}>
                  <img loading="lazy" decoding="async" src={c.ring} alt="" style={sx('height:44px;width:auto;display:block')} />
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
                <Hv as="a" {...linkProps(go, 'investment/growth')} s="align-self:flex-start;margin-top:auto;padding:14px 22px;background:var(--hw-black);color:var(--hw-white);text-decoration:none;font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase" h="background:var(--hw-terracotta);color:var(--hw-white)">
                  Invest in what we build →
                </Hv>
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
          We’d love to hear from you, whether it’s about Heartwood, our properties or working together. Send us a message and we’ll reply promptly.
        </p>
        <iframe src="/contact-map.html" title="Heartwood offices: Toronto and San Francisco" style={sx('width:100%;max-width:640px;aspect-ratio:16/10;border:0;display:block')} />
      </div>
      <div style={sx('display:flex;flex-direction:column;gap:18px')}>
        <HsForm form="contact" />
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
      {s === 'standards' && <Standards go={go} />}
      {s === 'contact' && <Contact />}
      {s === 'careers' && <Careers />}
    </div>
  )
}

export default PageAbout
