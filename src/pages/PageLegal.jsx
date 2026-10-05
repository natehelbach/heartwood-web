import { sx, DotField } from '../design/ui.jsx'

// Ported from ui_kits/website/PageLegal.dc.html. `sub` is privacy | disclosures | terms.

const PAGES = {
  privacy: ['Privacy Policy', 'How Heartwood collects, uses and protects personal information shared through this website, including newsletter subscriptions and investor enquiries.', '#2697AA'],
  disclosures: ['Important Disclosures', 'Information on this website is provided for general purposes only. It is not an offer to sell, or a solicitation of an offer to buy, any security in any jurisdiction where such an offer or solicitation would be unlawful.', '#BC532D'],
  terms: ['Terms & Conditions', 'The terms governing use of this website. Information on this site is for general purposes only and is not an offer to sell or a solicitation of an offer to buy any securities.', '#B28951'],
}

const DISCLOSURE_SECTIONS = [
  { h: 'Offerings in Canada', p: 'Securities of Heartwood Residential Growth Trust and Heartwood Residential Income Trust are offered in Canada only to investors who qualify as “accredited investors” or under another available prospectus exemption under applicable Canadian securities laws, and only by way of the applicable offering memorandum. The offering memorandum should be reviewed carefully before investing. No securities regulatory authority in Canada has reviewed or passed on the merits of these securities.' },
  { h: 'Offerings in the United States', p: 'Any offering of securities in the United States is made only to “accredited investors” as defined in Rule 501(a) of Regulation D under the U.S. Securities Act of 1933, as amended, in transactions exempt from registration, and only by way of the applicable offering documents. These securities have not been registered under the Securities Act or any state securities laws, and have not been approved or disapproved by the U.S. Securities and Exchange Commission or any state regulator. They are subject to restrictions on transfer and resale.' },
  { h: 'Forward-looking information', p: 'This website may contain forward-looking information and forward-looking statements, including targets, projections and estimates. These are based on current expectations and assumptions, are not guarantees of future performance, and actual results may differ materially. Heartwood undertakes no obligation to update them except as required by law.' },
  { h: 'Risk', p: 'Investing in private real estate involves risk, including illiquidity and the possible loss of some or all of your capital. Past performance is not indicative of future results. Investors should consult their own financial, legal and tax advisors before investing.' },
  { h: 'No advice', p: 'Nothing on this website is investment, legal, tax or accounting advice, or a recommendation that any security or strategy is suitable for any person.' },
]

const PANEL = 'background:rgba(249,249,249,.85)'

function PageLegal({ sub }) {
  const [title, body, dot] = PAGES[sub] || PAGES.privacy
  const sections = sub === 'disclosures' ? DISCLOSURE_SECTIONS : []
  return (
    <section data-screen-label="Legal" style={sx('position:relative;overflow:hidden;background:var(--hw-white);color:var(--hw-black);font-family:var(--font-body);min-height:clamp(520px,50vw,760px)')}>
      <div style={sx('position:absolute;top:0;bottom:0;right:0;width:min(100%,max(46%,380px));pointer-events:none;opacity:.5')}>
        <DotField key={sub} preset="icons" icons="RISK|LIBRARY|ACCESSIBLE / ADA|MAIL" iconSize=".6" interval="6000" color={dot} />
      </div>
      <div style={sx('position:relative;padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:24px;max-width:820px')}>
        <p style={sx('margin:0;font-family:var(--font-subhead);font-weight:500;font-size:clamp(18px,1.4vw,22px);text-transform:uppercase;color:var(--hw-terracotta)')}>Legal</p>
        <h1 style={sx(`margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(34px,4.4vw,64px);line-height:1.05;letter-spacing:-.02em;${PANEL}`)}>{title}</h1>
        <p style={sx(`margin:0;font-size:clamp(18px,1.5vw,22px);line-height:1.55;${PANEL}`)}>{body}</p>
        {sections.length > 0 && (
          <div style={sx('display:flex;flex-direction:column;gap:28px;padding-top:8px')}>
            {sections.map((s) => (
              <div key={s.h} style={sx(`display:flex;flex-direction:column;gap:10px;border-top:1px solid var(--hw-black);padding-top:16px;${PANEL}`)}>
                <h2 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(22px,2vw,28px);line-height:1.15')}>{s.h}</h2>
                <p style={sx('margin:0;font-size:18px;line-height:1.6;text-wrap:pretty')}>{s.p}</p>
              </div>
            ))}
            <p style={sx(`margin:0;font-size:14px;line-height:1.5;${PANEL}`)}>
              Draft for legal review. This page does not constitute legal advice and must be approved by counsel before publication.
            </p>
          </div>
        )}
        <p style={sx('margin:0;font-family:var(--font-subhead);font-size:12px;text-transform:uppercase;color:var(--hw-black)')}>Placeholder — final wording to be provided by Heartwood</p>
      </div>
    </section>
  )
}

export default PageLegal
