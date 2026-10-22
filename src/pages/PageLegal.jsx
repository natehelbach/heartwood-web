import { sx, DotField } from '../design/ui.jsx'

// Ported from ui_kits/website/PageLegal.dc.html. `sub` is privacy | disclosures | terms.

const PAGES = {
  privacy: ['Privacy Policy', 'How Heartwood collects, uses, discloses and protects your personal information.', '#2697AA'],
  disclosures: ['Important Disclosures', 'Information on this website is provided for general purposes only. It is not an offer to sell, or a solicitation of an offer to buy, any security in any jurisdiction where such an offer or solicitation would be unlawful.', '#BC532D'],
  terms: ['Terms & Conditions', 'The terms governing use of this website. Information on this site is for general purposes only and is not an offer to sell or a solicitation of an offer to buy any securities.', '#B28951'],
}

const PRIVACY_SECTIONS = [
  { h: 'Who we are', p: 'Heartwood Investments (“Heartwood”, “we”, “us”) is an investment manager focused on the living sector. This policy explains how we collect, use, disclose and protect personal information through this website and in our dealings with investors, advisors and others who contact us. It is based on our internal Cyber Security, Data and Privacy Policy, effective August 2026.' },
  { h: 'Accountability', p: 'Heartwood is accountable for the personal information under its control. Our designated privacy contact is Jordan Winter, VP, Finance, who is responsible for our compliance with the Personal Information Protection and Electronic Documents Act (PIPEDA) and, where we work with investors in the European Union or United Kingdom, the General Data Protection Regulation (GDPR).' },
  { h: 'Information we collect', p: 'We collect the personal information you choose to give us, such as your name, email address, phone number, company, investor type and the content of your message, when you subscribe to our newsletter or podcast, request a meeting, register for an event or contact us. If you invest, we also collect the information required to verify your identity and investor status and to administer your investment, as described in the applicable offering documents. When you visit the site, we and our service providers may collect technical information such as your device, browser, pages viewed and approximate location through cookies and similar technologies.' },
  { h: 'How we use it', p: 'We use personal information to respond to your enquiries, send the newsletters, podcast updates and event invitations you ask for, assess and administer investments, meet our legal and regulatory obligations, and understand how our website is used so we can improve it. We do not sell personal information.' },
  { h: 'Consent and marketing emails', p: 'We collect, use and disclose personal information with your consent, or as permitted or required by law. We send commercial electronic messages only with your consent, in line with Canada’s Anti-Spam Legislation, and every message includes a way to unsubscribe. You may withdraw your consent at any time, subject to legal or contractual restrictions.' },
  { h: 'Service providers and disclosure', p: 'We share personal information only with service providers that help us operate, such as our IT, cloud storage, email and website form providers, and with fund administrators, dealers and professional advisors where needed to administer an investment. These parties must protect the information and use it only for the services they provide to us. We may also disclose information where required by law or to regulators. Some of our providers store or process information outside Canada, including in the United States, where it may be subject to the laws of that country.' },
  { h: 'How we protect it', p: 'We protect personal information with safeguards appropriate to its sensitivity. These include encryption of data in transit and at rest, multi-factor authentication for access to our systems, managed endpoint and network security, regular independent backups, and ongoing staff training on security and phishing. Access is limited to people who need it to do their work.' },
  { h: 'How long we keep it', p: 'We keep personal information only as long as needed for the purposes described here, or as required by law. Business and investor records are generally retained for at least seven years.' },
  { h: 'Your rights', p: 'You may ask to access the personal information we hold about you, ask us to correct it, or withdraw your consent to its collection, use or disclosure. Please make your request in writing to our privacy contact. We will verify your identity first and respond within 30 days, or tell you in writing if we need an extension permitted by law. If you are in the European Union or United Kingdom, you also have rights of erasure, restriction of processing, data portability and objection under the GDPR.' },
  { h: 'Privacy breaches', p: 'If a breach of our security safeguards involving your personal information creates a real risk of significant harm, we will notify you directly as soon as feasible and report it to the Office of the Privacy Commissioner of Canada. Where the GDPR applies, we will notify the relevant supervisory authority within 72 hours. We keep a record of every breach for at least 24 months.' },
  { h: 'Contact us', p: 'Questions, requests or concerns about this policy can be sent to our privacy contact, Jordan Winter, VP, Finance, at info@heartwoodinvestments.ca or 25 King St W, Toronto, Ontario. If you are not satisfied with our response, you may contact the Office of the Privacy Commissioner of Canada.' },
  { h: 'Changes to this policy', p: 'We review this policy at least annually and will post any updates on this page. Last updated October 2026.' }
]

const DISCLOSURE_SECTIONS = [
  { h: 'Offerings in Canada', p: 'Units of Heartwood Residential Growth Trust and Heartwood Residential Income Trust are offered in Canada only under exemptions from the prospectus requirement in National Instrument 45-106 Prospectus Exemptions, including the accredited investor and offering memorandum exemptions, and only by way of the applicable offering memorandum and subscription agreement. Units are distributed through a dealer registered in the investor’s jurisdiction, such as an exempt market dealer. No securities regulatory authority in Canada has reviewed this website or the offering memorandum, or passed on the merits of these securities, and any representation to the contrary is an offence.' },
  { h: 'Resale restrictions and rights of action', p: 'Units are subject to resale restrictions under applicable Canadian securities laws and there is no market for them. Investors may be unable to sell their units, and redemptions are limited as described in the offering memorandum. Depending on their province or territory, investors may have statutory or contractual rights of action for damages or rescission if the offering memorandum, or marketing materials incorporated into it, contains a misrepresentation. These rights must be exercised within prescribed time limits. Investors should refer to the offering memorandum and consult a legal advisor.' },
  { h: 'Offerings in the United States', p: 'Any offering of securities in the United States is made in reliance on Rule 506(c) of Regulation D under the U.S. Securities Act of 1933, as amended, and only by way of the applicable offering documents. Securities may be sold only to “accredited investors” as defined in Rule 501(a). These securities have not been registered under the Securities Act or any state securities laws, and have not been approved or disapproved by the U.S. Securities and Exchange Commission or any state regulator, nor has any regulator passed on the accuracy or adequacy of this website. They are “restricted securities” and may not be transferred or resold except as permitted under the Securities Act and applicable state laws.' },
  { h: 'Verification of accredited investor status', p: 'Before accepting a subscription in a Rule 506(c) offering, Heartwood will take reasonable steps to verify that each purchaser is an accredited investor. This may include reviewing tax returns, bank or brokerage statements, or written confirmation from a registered broker-dealer, registered investment adviser, licensed attorney or certified public accountant. A self-certification alone is not sufficient.' },
  { h: 'Forward-looking information', p: 'This website may contain forward-looking information and forward-looking statements within the meaning of applicable Canadian and U.S. securities laws, including targets, projections and estimates. These are based on current expectations and assumptions, are subject to known and unknown risks, are not guarantees of future performance, and actual results may differ materially. Heartwood undertakes no obligation to update them except as required by law.' },
  { h: 'Targets and performance', p: 'Target returns, distributions and leverage levels are objectives only, are not guaranteed and may not be achieved. Index and market data are provided for context and do not represent the performance of any Heartwood fund. Past performance is not indicative of future results.' },
  { h: 'Risk', p: 'An investment in private real estate is speculative and involves significant risk, including illiquidity, the use of leverage, development and lease-up risk, interest rate changes and the possible loss of some or all of your capital. It is suitable only for investors who can bear these risks and do not require immediate liquidity. Units are not insured by the Canada Deposit Insurance Corporation, the Federal Deposit Insurance Corporation or any other government deposit insurer. Please review the risk factors in the offering documents.' },
  { h: 'No advice', p: 'Nothing on this website is investment, legal, tax or accounting advice, or a recommendation that any security or strategy is suitable for any person. Investors should consult their own financial, legal and tax advisors before investing.' },
  { h: 'Jurisdictions', p: 'Information on this website is not directed at any person in a jurisdiction where its publication or availability would be unlawful. It is current as of the date shown and may change without notice.' }
]

const PANEL = 'background:rgba(249,249,249,.85)'

function PageLegal({ sub }) {
  const [title, body, dot] = PAGES[sub] || PAGES.privacy
  const sections = sub === 'privacy' || !sub ? PRIVACY_SECTIONS : sub === 'disclosures' ? DISCLOSURE_SECTIONS : []
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
          </div>
        )}
      </div>
    </section>
  )
}

export default PageLegal
