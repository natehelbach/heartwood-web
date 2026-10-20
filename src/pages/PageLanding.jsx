import { useRef, useState } from 'react'
import { Hv, sx, RULE_BG, HubspotNote } from '../design/ui.jsx'
import { LOGIN_URL } from '../site/sitemap.js'
import { HONEYPOT, HUBSPOT, isEmail, useFormSubmit } from '../site/forms.js'

// Ported from ui_kits/website/PageLanding.dc.html. `sub` is events | learn | podcast | meeting |
// portal | advisors | hnw | institutional.

const L = '/assets/lifestyle/'
const R = '/assets/project-renders/'
const MONO = 'font-family:var(--font-subhead);font-weight:500;text-transform:uppercase'
const EYEBROW = `margin:0;${MONO};font-size:clamp(18px,1.4vw,22px);color:var(--hw-terracotta)`
const H2 = 'margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(30px,3.2vw,46px);line-height:1.05'
const RULE_LINE = 'height:1.5px;background:var(--hw-terracotta)'
const FIELD = 'padding:12px 14px;border:1px solid var(--hw-black);background:var(--hw-white);font-family:var(--font-subhead);font-size:14px;color:var(--hw-black)'
const NUM = 'font-family:var(--font-subhead);font-weight:500;font-size:clamp(36px,3.4vw,52px);line-height:1;color:var(--hw-terracotta)'
const ARROW_ROW = 'display:flex;justify-content:space-between;align-items:center;gap:20px;padding:24px 0;background:none;border:0;border-top:1px solid var(--hw-black);border-bottom:1px solid var(--hw-black);cursor:pointer;color:var(--hw-black);text-align:left'

const HUBSPOT_LABEL = {
  events: 'Event alerts sign-up', learn: 'Research sign-up', podcast: 'Podcast subscribe', advisors: 'Advisor access request',
  hnw: 'High-net-worth enquiry', institutional: 'Institutional enquiry', meeting: 'Book a call (or HubSpot Meetings link)', portal: 'Investor portal sign-up',
}

const PAGES = {
  events: {
    hero: { eyebrow: 'Insights · Events', title: 'Join our free events.', intro: 'Meet the people behind the buildings. Each month we host a lunch for Exempt Market Dealers. Each quarter we gather every investor for an evening together. And when a building reaches a milestone, we invite you to see it for yourself.', cta: 'Register for free', img: L + 'HW_Lifestyle_22.jpg' },
    form: { eyebrow: 'Stay in the loop', title: 'Hear about new events first.', note: 'We’ll email you when new dates are announced. One message per event, never more.', cta: 'Notify me', thanks: 'You’re on the list. We’ll email you when new events are announced.', hubspot: 'event-registration', hasSelect: true, selectLabel: 'How did you hear about us?', options: ['Advisor or referral', 'LinkedIn', 'Google', 'Podcast', 'Conference', 'Other'] },
  },
  learn: {
    hero: { eyebrow: 'Insights · Learn', title: 'Understand the opportunity before you commit.', intro: 'Webinar replays, research, market outlooks and case studies from the Heartwood team.', cta: 'Get new research by email', img: R + 'HW_Render_Innovation.jpg' },
    form: { eyebrow: 'Stay informed', title: 'New research, straight to your inbox.', note: 'We publish when we have something worth reading — not on a schedule.', cta: 'Subscribe', thanks: 'Thanks — you’re on the list.', hubspot: 'learn-subscribe', hasSelect: false, options: [] },
  },
  podcast: {
    hero: { eyebrow: 'Insights · The Long View Podcast', title: 'The Long View Podcast', intro: 'Conversations on how we live, build and invest for the long term. Our founders, market experts, architects and institutional investors on why purpose-built rental matters, and where it’s heading.', cta: 'Subscribe', img: L + 'HW_Lifestyle_28.jpg' },
    form: { eyebrow: 'Subscribe', title: 'Be the first to hear new episodes.', note: 'One email per episode, with show notes.', cta: 'Subscribe', thanks: 'Subscribed. We’ll let you know when episode one is live.', hubspot: 'podcast-subscribe', hasSelect: false, options: [] },
  },
  advisors: {
    hero: { eyebrow: 'Investments · For advisors', title: 'Purpose-built rental for your clients’ portfolios.', intro: 'We work with EMDs, RIAs, wealth managers and advisor platforms. You get the materials, education and direct access to bring our trusts to your clients with confidence.', cta: 'Request advisor access', cta2: 'Meet with us', img: R + 'HW_Render_2102-Lawrence.jpg' },
    form: { eyebrow: 'Advisor access', title: 'Request advisor access.', note: 'Our advisor team will confirm your registration and send fund materials, the Offering Memorandum and upcoming CE sessions.', cta: 'Request access', thanks: 'Thanks — our advisor team will be in touch within one business day.', hubspot: 'advisor-access', hasSelect: true, selectLabel: 'Firm type', options: ['Exempt market dealer', 'Investment dealer (CIRO)', 'Portfolio manager', 'RIA', 'Wealth manager', 'Other'] },
  },
  hnw: {
    hero: { eyebrow: 'For Investors · Private Wealth', title: 'Real estate built to hold its value.', intro: 'For family offices, entrepreneurs and high-net-worth families who want durable, lower-volatility returns from purpose-built rental housing.', cta: 'Book a call', img: R + 'HW_Render_3385-Lawrence-Courtyard.jpg' },
    form: { eyebrow: 'Get started', title: 'Talk to our investment team.', note: 'A 30-minute call to learn about your goals and walk you through our Growth and Income strategies.', cta: 'Book a call', thanks: 'Thanks. A member of our team will be in touch within one business day.', hubspot: 'hnw-enquiry', hasSelect: true, selectLabel: 'I’m interested in', options: ['Growth strategy', 'Income strategy', 'Both', 'Co-investment (family office)', 'Not sure yet'] },
  },
  institutional: {
    hero: { eyebrow: 'For Investors · Institutional', title: 'An institutional mindset. An entrepreneurial pace.', intro: 'For pension funds, foundations, endowments, insurers and sovereign wealth funds looking for long-term exposure to purpose-built rental housing.', cta: 'Contact us', img: R + 'HW_Render_360-Kennedy-Lane.jpg' },
    form: { eyebrow: 'Institutional enquiries', title: 'Contact us.', note: 'Tell us about your mandate. We’ll meet first, then share the data room and DDQ.', cta: 'Send enquiry', thanks: 'Thank you. A senior member of our team will be in touch.', hubspot: 'institutional-enquiry', hasSelect: true, selectLabel: 'Organization type', options: ['Pension fund', 'Foundation or endowment', 'Insurer', 'Sovereign wealth fund', 'Consultant or placement agent', 'Other'] },
  },
  meeting: {
    hero: { eyebrow: 'Investments · Schedule a meeting', title: 'Meet with our investment team.', intro: 'An introductory meeting with our senior team to understand your objectives and discuss how we can partner.', cta: 'Invest with us', img: '/assets/renders/HW_360-Kennedy-Lane_1.png', faded: true },
    form: { eyebrow: 'Schedule a meeting', title: 'Pick a time that works.', note: '', cta: 'Schedule a meeting', thanks: 'Booked. A confirmation and prep email are on the way.', hubspot: 'meeting-booking', hasSelect: true, selectLabel: 'Which best describes you?', options: ['Advisor (EMD, RIA, wealth manager)', 'Private wealth (family office or high-net-worth)', 'Institutional investor'] },
  },
  portal: {
    hero: { eyebrow: 'Investments · Investor portal', title: 'Everything you need to invest, in one place.', intro: 'Create an account to review fund materials, start a subscription and track your investment.', cta: 'Create your account', img: R + 'HW_Render_3385-Lawrence-Courtyard.jpg' },
    form: { eyebrow: 'Investor sign-up', title: 'Create your account.', note: 'Takes two minutes. You can browse before you commit.', cta: 'Create your account', thanks: 'Account created. Check your email to continue to the portal.', hubspot: 'portal-signup', hasSelect: true, selectLabel: 'Investor type', options: ['Individual', 'Joint', 'Corporation / trust', 'Advisor', 'Institutional'] },
  },
}

const A = '/assets/'
const FEATURE_PW = [
  { tag: 'Perspective', t: 'Private rental development: why now', m: 'A structural shortage, a supply cliff and a low entry point. Why this is the moment for rental.', img: A + 'lifestyle/HW_Lifestyle_26.jpg', r: 'insights/perspectives/why-now-private-rental-growth' },
  { tag: 'White paper', t: 'Private real estate in a modern portfolio', m: 'Why Canada’s largest pension funds hold alternatives, and what rental housing adds.', img: A + 'project-renders/HW_Render_3385-Lawrence-Courtyard.jpg', r: 'insights/perspectives/private-real-estate-portfolio' },
]
const FEATURE_INST = [
  { tag: 'White paper', t: 'Rental fundamentals: why the housing gap persists', m: 'Short-term softness hides a long-term shortage. The data behind our outlook.', img: A + 'project-renders/HW_Render_353-Sherbourne.jpg', r: 'insights/perspectives/housing-gap' },
  { tag: 'White paper', t: 'Low leverage, lower risk', m: 'Why we keep debt conservative, and what that means when rates or values move.', img: A + 'photography/HW_MassTimber_Studio.jpg', r: 'insights/perspectives/low-leverage' },
]
const QUOTE_PW = { q: '[Quote to confirm] We started Heartwood to give private investors access to the kind of long-term rental housing that institutions have held for decades, built and run by one team.', n: 'Tim Blair', t: 'Founding Partner', img: A + 'team/HW_Team_Tim-Blair_HR.jpg' }
const QUOTE_INST = { q: '[Quote to confirm] We build to hold, so every decision we make, from the site to the systems, is one we expect to live with for decades alongside our partners.', n: 'David Constable', t: 'Founding Partner', img: A + 'team/HW_Team_David-Constable_HR.jpg' }
const AUD_EXTRA = {
  hnw: { feature: FEATURE_PW, quote: QUOTE_PW },
  advisors: { feature: FEATURE_PW, quote: QUOTE_PW },
  institutional: { feature: FEATURE_INST, quote: QUOTE_INST },
}

const AUD = {
  advisors: {
    lead: 'A partner that makes your job easier.',
    body: 'Your clients trust you to find opportunities they can’t reach on their own. Our trusts give them access to institutional-quality purpose-built rental housing, built and managed by one team from start to finish. We keep you informed and give you everything you need to explain it clearly.',
    heading: 'How we work with advisors',
    items: [{ no: '01', title: 'Clear materials', body: 'Fund overviews, the Offering Memorandum and client-ready summaries for each trust.' }, { no: '02', title: 'Ongoing education', body: 'Webinars and whitepapers on private real estate, tax, legal and planning topics.' }, { no: '03', title: 'Access for your clients', body: 'Bring a group of clients into an opportunity together, with our team alongside you.' }, { no: '04', title: 'A dedicated contact', body: 'One person for subscriptions, documents and client questions.' }],
    link: 'See upcoming advisor events', r: 'insights/events',
    oppHeading: 'What you can offer your clients', oppIntro: 'Two trusts, both available to your clients in Series A: $25,000 minimum for the Growth Trust and $20,000 for the Income Trust.',
    opps: [
      { tag: 'Growth strategy', dot: 'var(--fund-growth)', title: 'Heartwood Residential Growth Trust', body: 'New purpose-built rental, developed and held for long-term appreciation.', cta: 'Explore the Growth Trust', r: 'investment/growth' },
      { tag: 'Income strategy', dot: 'var(--fund-income)', title: 'Heartwood Residential Income Trust', body: 'Stabilized buildings that pay monthly distributions, with an optional DRIP.', cta: 'Explore the Income Trust', r: 'investment/income' },
      { tag: 'Client groups', dot: 'var(--hw-terracotta)', title: 'Bring clients in together', body: 'Allocate for a group of clients at once, with our team on the calls alongside you.', cta: 'Talk to our advisor team', r: 'investment/meeting' },
    ],
    factsHeading: 'The details advisors ask about first.',
    facts: [
      { k: 'Who it’s for', v: 'EMDs, investment dealers, portfolio managers, RIAs and wealth managers.' },
      { k: 'Minimum', v: '$25,000 per client for the Growth Trust, $20,000 for the Income Trust.' },
      { k: 'Unit series', v: 'Series A in both trusts, with an up-front commission and a trailer of up to 1.0% a year to your dealer. Institutional series (Growth Series I, Income Series B) carry no trailer.' },
      { k: 'Eligibility', v: 'Accredited investors, and eligible investors under the offering memorandum exemption where it applies.' },
      { k: 'Registered accounts', v: 'Eligible for RRSPs, RRIFs, TFSAs and FHSAs through a supported custodian.' },
      { k: 'Subscriptions', v: 'Signed through DocuSign. Clients fund by wire to the trust, or through Olympia Trust for registered accounts. SGGG, our record keeper, records the units.' },
      { k: 'Reporting', v: 'Monthly statements and T3 slips from SGGG, our record keeper. You see your clients’ units, unit price, market value and returns in the advisor portal.' },
    ],
    stepsHeading: 'How it works',
    steps: [{ no: '01', title: 'Request access', body: 'Tell us about your firm. We confirm your registration within one business day.' }, { no: '02', title: 'Review the materials', body: 'Offering Memorandum, due diligence pack and client-ready summaries.' }, { no: '03', title: 'Allocate for clients', body: 'Start a subscription from the advisor portal. Your client signs electronically.' }, { no: '04', title: 'Stay informed', body: 'Statements, distributions and project updates for every client, in one place.' }],
    docs: [{ t: 'Advisor due diligence pack', m: 'Fund structure, track record, fees and risk factors.', cta: 'Request' }, { t: 'Offering Memoranda', m: 'Growth Trust and Income Trust.', cta: 'Request' }, { t: 'Client fact sheets', m: 'One page per trust, ready to share.', cta: 'Request' }, { t: 'Lunch & Learn for your office', m: 'We come to you, monthly in Toronto.', cta: 'Book' }],
    contact: { n: 'Dustin Buenaventura', t: 'Capital Markets', img: '/assets/team/HW_Team_Dustin-Buenaventura.png', body: 'Your contact for advisor access, materials, subscriptions and client questions.' },
  },
  hnw: {
    lead: 'Homes built to last. Investments designed to endure.',
    body: 'We develop, own and manage purpose-built rental communities in supply-constrained markets. Our Growth strategy builds new buildings and holds them for the long term. Our Income strategy owns stabilized buildings that pay regular distributions. Both are designed for steady, lower-volatility returns.',
    heading: 'What to expect from us',
    items: [{ no: '01', title: 'Two strategies', body: 'Growth for long-term appreciation. Income for regular distributions. Or both.' }, { no: '02', title: 'Direct access', body: 'Speak with the people who build and manage the buildings you invest in.' }, { no: '03', title: 'Regular updates', body: 'The Long View every month, plus project milestones as they happen.' }, { no: '04', title: 'Events and tours', body: 'Investor evenings each quarter and building tours when there’s something to see.' }],
    link: 'Compare our investment strategies', r: 'investment/overview',
    oppHeading: 'Ways to invest with us', oppIntro: 'Invest directly from $25,000 in the Growth Trust or $20,000 in the Income Trust. Family offices can also co-invest alongside us in specific projects.',
    opps: [
      { tag: 'Growth strategy', dot: 'var(--fund-growth)', title: 'Heartwood Residential Growth Trust', body: 'For long-term appreciation. We build new rental homes and hold them.', cta: 'Explore the Growth Trust', r: 'investment/growth' },
      { tag: 'Income strategy', dot: 'var(--fund-income)', title: 'Heartwood Residential Income Trust', body: 'For regular income. Monthly distributions from stabilized buildings.', cta: 'Explore the Income Trust', r: 'investment/income' },
      { tag: 'Family offices', dot: 'var(--hw-terracotta)', title: 'Co-investment', body: 'Invest alongside the trusts in a specific building, with direct access to our team.', cta: 'Start a conversation', r: 'investment/meeting' },
    ],
    factsHeading: 'The details that matter before you invest.',
    facts: [
      { k: 'Who it’s for', v: 'Accredited investors, entrepreneurs, families and family offices.' },
      { k: 'Minimum', v: 'Series A: $25,000 for the Growth Trust, $20,000 for the Income Trust. Growth Series F: $1,000,000.' },
      { k: 'Distributions', v: 'The Income Trust pays monthly, with an option to reinvest. The Growth Trust reinvests for long-term value.' },
      { k: 'Liquidity', v: 'Monthly redemptions with notice. Early redemption fees may apply in the first years.' },
      { k: 'Registered accounts', v: 'Hold units in an RRSP, RRIF, TFSA or FHSA through a self-directed plan with Olympia Trust.' },
      { k: 'Tax reporting', v: 'T3 slips by the end of March, or NR4 for non-residents.' },
      { k: 'Investor portal', v: 'Holdings, statements and documents online, any time.' },
    ],
    stepsHeading: 'How it works',
    steps: [{ no: '01', title: 'Book a call', body: 'A 30-minute conversation about your goals and our two strategies.' }, { no: '02', title: 'Review the documents', body: 'We send the Offering Memorandum and answer any questions.' }, { no: '03', title: 'Subscribe', body: 'Sign electronically, then fund by wire or through Olympia Trust for registered accounts.' }, { no: '04', title: 'Track your investment', body: 'Monthly statements and updates in the investor portal.' }],
    docs: [{ t: 'Growth Trust overview', m: 'Strategy, projects and target returns.', cta: 'Request' }, { t: 'Income Trust overview', m: 'Buildings, distributions and occupancy.', cta: 'Request' }, { t: 'The Long View', m: 'Our monthly letter from the founders.', cta: 'Subscribe' }, { t: 'Investor evenings', m: 'Quarterly, in Toronto.', cta: 'Join' }],
    contact: { n: 'Dylan Kent', t: 'Private Wealth', img: '/assets/team/HW_Team_Dylan-Kent_HR.jpg', body: 'Your contact for questions about our strategies, subscriptions and your account.' },
  },
  institutional: {
    lead: 'Built to institutional standards.',
    body: 'We underwrite like an institution and move like a boutique. That lets us read the market and act quickly while holding every building to the same standard of quality, governance and reporting. We can partner through our trusts or through separately managed accounts built around your mandate.',
    heading: 'How we partner with institutions',
    items: [{ no: '01', title: 'Separately managed accounts', body: 'Development and operating expertise applied to your specific mandate.' }, { no: '02', title: 'Long-term alignment', body: 'We build to hold, so our interests stay aligned with yours for decades.' }, { no: '03', title: 'Rigorous diligence', body: 'Governance, advisory boards and reporting designed for institutional review.' }, { no: '04', title: 'One platform', body: 'Sourcing, development, construction and asset management in one team.' }],
    link: 'Read about our platform', r: 'platform',
    oppHeading: 'How institutions invest with us', oppIntro: 'Commit through our trusts, or build a mandate with us directly.',
    opps: [
      { tag: 'Trusts', dot: 'var(--fund-growth)', title: 'Fund commitments', body: 'Institutional Series I units in the Growth or Income Trust.', cta: 'See ways to invest', r: 'investment/overview' },
      { tag: 'Mandates', dot: 'var(--fund-income)', title: 'Separately managed accounts', body: 'Our development and operating platform, applied to your mandate.', cta: 'Start a conversation', r: 'investment/meeting' },
      { tag: 'Partnerships', dot: 'var(--hw-terracotta)', title: 'Joint ventures and co-investment', body: 'Partner on specific buildings or a programme of developments.', cta: 'Start a conversation', r: 'investment/meeting' },
    ],
    factsHeading: 'What your investment committee will ask.',
    facts: [
      { k: 'Who it’s for', v: 'Pension funds, foundations, endowments, insurers and sovereign wealth funds.' },
      { k: 'Minimum', v: '$5,000,000 for Growth Series I and $1,000,000 for Income Series B. Mandates and partnerships are sized to your programme.' },
      { k: 'Alignment', v: 'We build to hold, and the team invests alongside our partners.' },
      { k: 'Governance', v: 'Independent advisory board, audited financials, SGGG as record keeper.' },
      { k: 'Reporting', v: 'Quarterly reporting, with property-level data available.' },
      { k: 'Sustainability', v: 'Performance data for each building, including emissions and energy use.' },
      { k: 'Data room', v: 'Full due diligence materials through DocSend.' },
    ],
    stepsHeading: 'How it works',
    steps: [{ no: '01', title: 'Introductory meeting', body: 'We learn about your mandate and walk you through the platform.' }, { no: '02', title: 'Due diligence', body: 'Data room access, site visits and time with our team.' }, { no: '03', title: 'Structure', body: 'Agree on the vehicle: trust units, a mandate or a partnership.' }, { no: '04', title: 'Report', body: 'Quarterly reporting and a senior contact for the life of the investment.' }],
    docs: [{ t: 'Institutional overview', m: 'Platform, track record and pipeline.', cta: 'Request' }, { t: 'Data room', m: 'Full due diligence materials.', cta: 'Request access' }, { t: 'Sustainability report', m: 'Building-level performance data.', cta: 'Request' }, { t: 'Site visits', m: 'See our buildings in person.', cta: 'Book' }],
    contact: { n: 'David Constable', t: 'Co-founder', img: '/assets/team/HW_Team_David-Constable.jpg', body: 'A senior member of our team leads every institutional relationship.' },
  },
}

const EVENTS = [
  { id: 'e1', type: 'Investor Evening', date: 'Quarterly · Date TBA', format: 'In person · Toronto', title: 'An evening of wine and conversation', dek: 'Our quarterly gathering for every investor: private wealth, high-net-worth, institutional and advisors. A relaxed wine tasting with the Heartwood team and an update on the portfolio.', speaker: 'The Heartwood team', img: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=80' },
  { id: 'e2', type: 'Lunch & Learn', date: 'Monthly · Mid-month', format: 'In person · Toronto', title: 'Exempt Market Dealer lunch', dek: 'A small monthly lunch for EMDs and their dealing representatives. A fund update, project news and an open Q&A with our investment team.', speaker: 'Dustin Buenaventura', img: L + 'HW_Lifestyle_33.jpg' },
  { id: 'e3', type: 'Building Tour', date: 'As milestones happen', format: 'On site', title: 'Building tours and grand openings', dek: 'When there’s something worth seeing, we open the doors: construction milestones, topping out, and opening tours of finished buildings.', speaker: 'Nic Green', img: R + 'HW_Render_3385-Lawrence-Courtyard.jpg' },
]
const RESOURCES = [
  { id: 'r1', type: 'Past Webinars', title: 'Why purpose-built rental, why now — replay', dek: 'Recorded session with Q&A.', img: L + 'HW_Lifestyle_22.jpg', gated: false },
  { id: 'r2', type: 'Market Outlooks', title: 'Canadian rental housing outlook', dek: 'Supply pipeline, vacancy and rent trends across our markets.', img: R + 'HW_Render_2102-Lawrence.jpg', gated: true },
  { id: 'r3', type: 'Case Studies', title: '3385 Lawrence Avenue East', dek: 'From acquisition to pre-construction: thesis, design and delivery plan.', img: R + 'HW_Render_3385-Lawrence.jpg', gated: true },
  { id: 'r4', type: 'Whitepapers', title: 'Climate-resilient housing and long-term value', dek: 'How resilient design changes operating cost and asset life.', img: R + 'HW_Render_Innovation.jpg', gated: true },
  { id: 'r5', type: 'Research', title: 'Mass timber in mid-rise rental', dek: 'Cost, schedule and carbon findings from our design work.', img: R + 'HW_Render_353-Sherbourne.jpg', gated: true },
  { id: 'r6', type: 'Past Webinars', title: 'Inside the Growth and Income strategies — replay', dek: 'Structure, targets and risk, explained by the team.', img: L + 'HW_Lifestyle_33.jpg', gated: false },
]
const PAPERS = [
  { tag: 'Tax', t: 'Tax-efficient income from private real estate', m: 'How return of capital, registered accounts and the way income is taxed can help your clients keep more of what they earn.' },
  { tag: 'Market', t: 'Rental fundamentals: why the housing gap persists', m: 'Short-term softness hides a long-term shortage. The data behind our outlook for purpose-built rental.' },
  { tag: 'Portfolio', t: 'Private real estate in a modern portfolio', m: 'Why Canada’s largest pension funds hold alternatives, and what private rental housing adds to client portfolios.' },
  { tag: 'Market', t: 'Why purpose-built rental is not a condo', m: 'Ownership, tenure and operations: why rental buildings behave differently from condos through a housing cycle.' },
  { tag: 'Income', t: 'Distributions covered by cash flow', m: 'How we fund distributions from net operating income, not new capital, and how we report coverage each quarter.' },
  { tag: 'Risk', t: 'Low leverage, lower risk', m: 'Why we keep debt conservative, and what that means for investors when rates or values move.' },
  { tag: 'Portfolio', t: 'A nimble fund with no legacy assets', m: 'A newer portfolio with no older assets to fix, so capital goes into new, efficient buildings.' },
]
const PLATFORMS = ['YouTube', 'Spotify', 'Apple Podcasts', 'Amazon Music']
const EPISODES = [
  { no: '01', date: 'Coming soon', title: 'Founding Story', guest: 'With Tim Blair & David Constable, Co-founders', desc: 'Meet the founders behind Heartwood, and why they started the firm.', img: R + 'HW_Render_3385-Lawrence.jpg' },
]
const BENEFITS = [
  { title: 'Fund materials', body: 'Offering memorandum, fund overview and track record.' },
  { title: 'Online subscription', body: 'Choose a trust and amount, add co-investors and sign through DocuSign.' },
  { title: 'Accreditation', body: 'Upload documents or invite your accountant to verify.' },
  { title: 'Reporting', body: 'Quarterly reports, statements and distributions in one place.' },
]
const MEETING_TEAM = [
  { name: 'Dustin Buenaventura', title: 'Director, Business Development', img: '/assets/team/headshots/HW_Team_Dustin-Buenaventura_2026_Toned.jpg', nowrap: true },
  { name: 'Dylan Kent', title: 'Director, Capital Markets', img: '/assets/team/headshots/HW_Team_Dylan-Kent_2026_Toned.jpg' },
]

const chipStyle = (on) => `border:1.5px solid var(--hw-black);background:${on ? '#212121' : 'transparent'};color:${on ? '#F9F9F9' : '#212121'};cursor:pointer;${MONO};font-size:13px`

function PlatformButtons() {
  return (
    <div style={sx('display:flex;flex-wrap:wrap;gap:10px')}>
      {PLATFORMS.map((label) => (
        <Hv key={label} as="button" s="display:flex;flex-direction:column;align-items:flex-start;gap:2px;padding:10px 16px;background:var(--hw-black);color:var(--hw-white);border:0;cursor:pointer;text-align:left" h="background:var(--hw-terracotta)">
          <span style={sx('font-family:var(--font-subhead);font-size:12px;text-transform:uppercase;letter-spacing:.04em')}>Listen on</span>
          <span style={sx(`${MONO};font-size:15px`)}>{label}</span>
        </Hv>
      ))}
    </div>
  )
}

function NumberedGrid({ items, min = 240 }) {
  return (
    <div style={sx(`display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,${min}px),1fr));gap:clamp(20px,3vw,48px)`)}>
      {items.map((x) => (
        <div key={x.no || x.title} style={sx('display:flex;flex-direction:column;gap:10px;border-top:1px solid var(--hw-black);padding-top:16px')}>
          {x.no && <span style={sx(NUM)}>{x.no}</span>}
          <span style={sx('font-family:var(--font-display);font-weight:500;font-size:22px')}>{x.title}</span>
          <span style={sx('font-size:18px;line-height:1.5;text-wrap:pretty')}>{x.body}</span>
        </div>
      ))}
    </div>
  )
}

function Events({ toForm, go }) {
  const [filter, setFilter] = useState('All')
  const [reg, setReg] = useState(null)
  const [regDone, setRegDone] = useState({})
  const evs = EVENTS.filter((e) => filter === 'All' || e.type === filter)
  return (
    <section data-screen-label="Events — Calendar" style={sx('padding:0 clamp(20px,3vw,40px) clamp(48px,6vw,88px);display:flex;flex-direction:column;gap:clamp(28px,3vw,40px)')}>
      <div style={sx('display:flex;flex-wrap:wrap;gap:8px;padding-top:24px;border-top:1.5px solid var(--hw-terracotta)')}>
        {['All', 'Investor Evening', 'Lunch & Learn', 'Building Tour'].map((l) => (
          <button key={l} aria-pressed={filter === l} onClick={() => setFilter(l)} style={sx(`padding:9px 14px;${chipStyle(filter === l)}`)}>{l}</button>
        ))}
      </div>
      {evs.length > 0 ? (
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr));gap:clamp(32px,3vw,48px) clamp(20px,2.5vw,36px)')}>
          {evs.map((e) => {
            const done = !!regDone[e.id]
            const open = reg === e.id && !done
            return (
              <article key={e.id} style={sx('display:flex;flex-direction:column;gap:14px')}>
                <div style={sx('position:relative;aspect-ratio:4/3;overflow:hidden;background:var(--hw-cool-grey)')}>
                  <img src={e.img} alt="" style={sx('position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block')} />
                  <span style={sx(`position:absolute;left:0;top:0;padding:10px 14px;background:var(--hw-white);${MONO};font-size:13px`)}>{e.date}</span>
                </div>
                <div style={sx(`display:flex;justify-content:space-between;gap:12px;${MONO};font-size:13px`)}>
                  <span style={{ color: 'var(--hw-terracotta)' }}>{e.type}</span>
                  <span>{e.format}</span>
                </div>
                <h3 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(22px,2vw,30px);line-height:1.1;text-wrap:balance')}>{e.title}</h3>
                <p style={sx('margin:0;font-size:18px;line-height:1.5;text-wrap:pretty')}>{e.dek}</p>
                <span style={sx('font-family:var(--font-subhead);font-size:12px;text-transform:uppercase')}>With {e.speaker}</span>
                {open && (
                  <>
                    <HubspotNote label="Event registration" />
                    <form
                      onSubmit={(x) => {
                        x.preventDefault()
                        setReg(null)
                        setRegDone((d) => ({ ...d, [e.id]: true }))
                      }}
                      data-hubspot-form="event-registration"
                      style={sx('display:flex;flex-direction:column;gap:10px;padding:16px;background:var(--hw-cool-grey)')}
                    >
                      <input required aria-label="Your name" placeholder="YOUR NAME" style={sx('padding:11px 12px;border:1px solid var(--hw-black);background:var(--hw-white);font-family:var(--font-subhead);font-size:13px')} />
                      <input type="email" required aria-label="Your email" placeholder="YOUR EMAIL" style={sx('padding:11px 12px;border:1px solid var(--hw-black);background:var(--hw-white);font-family:var(--font-subhead);font-size:13px')} />
                      <Hv as="button" type="submit" s={`padding:12px 16px;border:0;background:var(--hw-black);color:var(--hw-white);cursor:pointer;${MONO};font-size:13px`} h="background:var(--hw-terracotta)">
                        Confirm registration
                      </Hv>
                    </form>
                  </>
                )}
                {done && <span style={sx(`padding:12px 0;border-top:1px solid var(--hw-black);${MONO};font-size:13px`)}>You’re registered ✓ — confirmation on its way</span>}
                {!done && !open && (
                  <Hv as="button" onClick={() => setReg(e.id)} s={`align-self:flex-start;padding:12px 16px;background:none;border:1.5px solid var(--hw-black);cursor:pointer;${MONO};font-size:13px;color:var(--hw-black)`} h="background:var(--hw-black);color:var(--hw-white)">
                    Register for free
                  </Hv>
                )}
              </article>
            )
          })}
        </div>
      ) : (
        <div style={sx('display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:20px;padding:32px 0;border-top:1px solid var(--hw-black);border-bottom:1px solid var(--hw-black)')}>
          <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(22px,2.2vw,32px)')}>No {filter} events scheduled right now.</span>
          <Hv as="button" onClick={toForm} s={`padding:12px 16px;background:var(--hw-black);color:var(--hw-white);border:0;cursor:pointer;${MONO};font-size:13px`} h="background:var(--hw-terracotta)">
            Tell me when one’s announced
          </Hv>
        </div>
      )}
      <p style={sx('margin:0;font-family:var(--font-subhead);font-size:12px;text-transform:uppercase')}>
        Events are free and open to prospective investors and advisors. Past sessions are available in{' '}
        <button onClick={() => go('insights/learn')} style={sx('background:none;border:0;padding:0;cursor:pointer;font:inherit;text-transform:inherit;text-decoration:underline;color:inherit')}>Perspectives</button>.
      </p>
    </section>
  )
}

function Learn({ go }) {
  const [filter, setFilter] = useState('All')
  const [gate, setGate] = useState(null)
  const [unlocked, setUnlocked] = useState({})
  const resources = RESOURCES.filter((r) => filter === 'All' || r.type === filter)
  return (
    <section data-screen-label="Learn — Library" style={sx(`padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:28px;background:${RULE_BG}`)}>
      <div style={sx(RULE_LINE)} />
      <div style={sx('display:flex;justify-content:space-between;align-items:flex-end;gap:20px;flex-wrap:wrap')}>
        <h2 style={sx(H2)}>Replays and research</h2>
        <div style={sx('display:flex;flex-wrap:wrap;gap:8px')}>
          {['All', 'Past Webinars', 'Whitepapers', 'Research', 'Market Outlooks', 'Case Studies'].map((l) => (
            <button key={l} aria-pressed={filter === l} onClick={() => setFilter(l)} style={sx(`padding:8px 12px;${chipStyle(filter === l)}`)}>{l}</button>
          ))}
        </div>
      </div>
      <div style={sx('display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr));gap:clamp(28px,3vw,44px) clamp(20px,2.5vw,36px)')}>
        {resources.map((r) => {
          const open = gate === r.id && !unlocked[r.id]
          const cta = unlocked[r.id] ? 'Link sent to your email ✓' : r.gated ? 'Download the report' : 'Watch the replay'
          return (
            <article key={r.id} style={sx('display:flex;flex-direction:column;gap:12px;border-top:1px solid var(--hw-black);padding-top:16px')}>
              <img src={r.img} alt="" style={sx('width:100%;aspect-ratio:16/10;object-fit:cover;display:block;background:var(--hw-cool-grey)')} />
              <span style={sx(`display:flex;gap:10px;align-items:center;${MONO};font-size:12px`)}>
                <span style={sx('width:8px;height:8px;border-radius:50%;background:var(--hw-terracotta)')} />
                {r.type}
              </span>
              <h3 style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(20px,1.8vw,26px);line-height:1.15;text-wrap:balance')}>{r.title}</h3>
              <p style={sx('margin:0;font-size:18px;line-height:1.5;text-wrap:pretty')}>{r.dek}</p>
              {open ? (
                <>
                  <HubspotNote label="Resource download (email gate)" />
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setGate(null)
                      setUnlocked((u) => ({ ...u, [r.id]: true }))
                    }}
                    data-hubspot-form="learn-download"
                    style={sx('display:flex;gap:0;border:1.5px solid var(--hw-black)')}
                  >
                    <input type="email" required aria-label="Your email" placeholder="YOUR EMAIL" style={sx('flex:1;min-width:0;padding:10px 12px;border:0;background:var(--hw-white);font-family:var(--font-subhead);font-size:13px')} />
                    <button type="submit" style={sx(`padding:10px 14px;border:0;background:var(--hw-black);color:var(--hw-white);cursor:pointer;${MONO};font-size:13px`)}>Send</button>
                  </form>
                </>
              ) : (
                <Hv as="button" onClick={r.gated ? () => setGate(r.id) : undefined} s={`align-self:flex-start;background:none;border:0;border-bottom:1.5px solid currentColor;padding:0 0 3px;cursor:pointer;${MONO};font-size:13px;color:var(--hw-black)`} h="color:var(--hw-terracotta)">
                  {cta}
                </Hv>
              )}
            </article>
          )
        })}
      </div>
      <Hv as="button" onClick={() => go('insights/events')} s={ARROW_ROW} h="color:var(--hw-terracotta)">
        <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(22px,2.2vw,32px)')}>Prefer to ask questions live? Join a live session.</span>
        <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:28px')}>→</span>
      </Hv>
    </section>
  )
}

function Podcast() {
  return (
    <section data-screen-label="Podcast — Episodes" style={sx('padding:0 clamp(20px,3vw,40px) clamp(48px,6vw,88px);display:flex;flex-direction:column')}>
      <div style={sx(RULE_LINE)} />
      {EPISODES.map((ep) => (
        <div key={ep.no} data-m-stack="" style={sx('display:grid;grid-template-columns:minmax(0,clamp(140px,24vw,300px)) minmax(0,1fr) auto;gap:16px clamp(20px,3vw,48px);align-items:center;padding:24px 0;border-bottom:1px solid var(--hw-black)')}>
          <div style={sx('position:relative;aspect-ratio:16/9;overflow:hidden;background:var(--hw-brown)')}>
            <img src={ep.img} alt="" style={sx('position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block')} />
            <div style={sx('position:absolute;inset:0;background:var(--overlay-brown)')} />
            <span style={sx('position:absolute;left:14px;bottom:10px;font-family:var(--font-display);font-weight:500;font-size:clamp(32px,3.4vw,48px);line-height:1;color:var(--hw-white)')}>#{ep.no}</span>
          </div>
          <div style={sx('display:flex;flex-direction:column;gap:8px;min-width:0')}>
            <span style={sx(`${MONO};font-size:13px;color:var(--hw-black)`)}>Episode {ep.no} · {ep.date}</span>
            <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.4vw,36px);line-height:1.1;letter-spacing:-.01em')}>{ep.title}</span>
            <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:14px;text-transform:uppercase;color:var(--hw-teal)')}>{ep.guest}</span>
            <span style={sx('font-size:18px;line-height:1.5;max-width:640px;text-wrap:pretty')}>{ep.desc}</span>
          </div>
          <div style={sx('display:flex;justify-content:flex-end')}>
            <span style={sx(`padding:12px 16px;border:1.5px solid var(--hw-black);${MONO};font-size:13px;opacity:.55`)}>Watch · coming soon</span>
          </div>
        </div>
      ))}
      <div style={sx('display:flex;flex-direction:column;gap:22px;padding-top:clamp(48px,6vw,88px)')}>
        <h2 style={sx(H2)}>Follow us on your favourite platform</h2>
        <PlatformButtons />
      </div>
    </section>
  )
}

function Audience({ sub, aud, hero, toForm, go }) {
  const { feature, quote } = AUD_EXTRA[sub]
  return (
    <>
      <section data-screen-label="Audience — Intro" style={sx('padding:clamp(56px,6vw,96px) clamp(20px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,420px),1fr));gap:clamp(28px,4vw,72px);align-items:start')}>
        <h2 style={sx(`${H2};letter-spacing:-.01em;text-wrap:balance`)}>{aud.lead}</h2>
        <div style={sx('display:flex;flex-direction:column;gap:24px')}>
          <p style={sx('margin:0;font-size:clamp(18px,1.5vw,22px);line-height:1.5;text-wrap:pretty')}>{hero.intro}</p>
          <p style={sx('margin:0;font-size:clamp(17px,1.35vw,20px);line-height:1.55;text-wrap:pretty')}>{aud.body}</p>
          <div style={sx('display:flex;flex-wrap:wrap;gap:12px')}>
            <Hv as="button" onClick={toForm} s={`padding:16px 24px;background:var(--hw-black);color:var(--hw-white);border:1.5px solid var(--hw-black);cursor:pointer;${MONO};font-size:14px`} h="background:var(--hw-terracotta);border-color:var(--hw-terracotta)">
              {hero.cta} →
            </Hv>
            {hero.cta2 && (
              <Hv as="button" onClick={() => go('investment/meeting')} s={`padding:16px 24px;background:transparent;color:var(--hw-black);border:1.5px solid var(--hw-black);cursor:pointer;${MONO};font-size:14px`} h="background:var(--hw-black);color:var(--hw-white)">
                {hero.cta2}
              </Hv>
            )}
          </div>
        </div>
      </section>
      <section data-screen-label="Audience — Featured insights" style={sx('padding:0 clamp(20px,3vw,40px) clamp(56px,6vw,96px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));gap:clamp(16px,2vw,24px)')}>
        {feature.map((ft) => (
          <Hv key={ft.t} as="button" onClick={() => go(ft.r)} s="position:relative;display:flex;align-items:flex-end;min-height:clamp(320px,30vw,460px);padding:0;border:0;cursor:pointer;text-align:left;overflow:hidden;background:var(--hw-brown);color:var(--hw-white);font-family:var(--font-body);transition:transform .25s ease" h="transform:translateY(-4px)">
            <img src={ft.img} alt="" style={sx('position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block')} />
            <span style={sx('position:absolute;inset:0;background:linear-gradient(0deg,rgba(33,33,33,.75),rgba(33,33,33,0) 70%)')} />
            <span style={sx('position:relative;display:flex;flex-direction:column;gap:12px;padding:clamp(24px,2.6vw,36px);width:100%;box-sizing:border-box')}>
              <span style={sx(`${MONO};font-size:13px`)}>{ft.tag}</span>
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(26px,2.6vw,38px);line-height:1.08;letter-spacing:-.01em;text-wrap:balance')}>{ft.t}</span>
              <span style={sx('font-size:18px;line-height:1.45;max-width:520px;text-wrap:pretty')}>{ft.m}</span>
              <span style={sx(`display:flex;justify-content:space-between;align-items:center;padding:12px 0 10px;border-bottom:1.5px solid var(--hw-white);${MONO};font-size:14px`)}>
                Read more<span aria-hidden="true">→</span>
              </span>
            </span>
          </Hv>
        ))}
      </section>
      <section data-screen-label="Audience — How we work" style={sx(`padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:28px;background:${RULE_BG}`)}>
        <div style={sx(RULE_LINE)} />
        <h2 style={sx(H2)}>{aud.heading}</h2>
        <NumberedGrid items={aud.items} />
        <Hv as="button" onClick={() => go(aud.r)} s={ARROW_ROW} h="color:var(--hw-terracotta)">
          <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(22px,2.2vw,32px)')}>{aud.link}</span>
          <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:28px')}>→</span>
        </Hv>
      </section>
      <section data-screen-label="Audience — Opportunities" style={sx('padding:0 clamp(20px,3vw,40px) clamp(48px,6vw,88px);display:flex;flex-direction:column;gap:28px')}>
        <div style={sx(RULE_LINE)} />
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:clamp(20px,4vw,64px);align-items:end')}>
          <h2 style={sx(H2)}>{aud.oppHeading}</h2>
          <p style={sx('margin:0;max-width:560px;font-size:clamp(17px,1.35vw,20px);line-height:1.5;text-wrap:pretty')}>{aud.oppIntro}</p>
        </div>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:clamp(20px,2.4vw,36px)')}>
          {aud.opps.map((o) => (
            <Hv key={o.title} as="button" onClick={() => go(o.r)} s="display:flex;flex-direction:column;gap:14px;padding:20px 0 0;background:none;border:0;border-top:3px solid var(--hw-black);cursor:pointer;color:var(--hw-black);text-align:left;font-family:var(--font-body)" h="color:var(--hw-terracotta)">
              <span style={sx(`display:flex;align-items:center;gap:10px;${MONO};font-size:12px`)}>
                <span style={sx(`width:10px;height:10px;background:${o.dot}`)} />
                {o.tag}
              </span>
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.2vw,32px);line-height:1.1')}>{o.title}</span>
              <span style={sx('font-size:18px;line-height:1.5;color:var(--hw-black);text-wrap:pretty')}>{o.body}</span>
              <span style={sx(`${MONO};font-size:13px`)}>{o.cta} →</span>
            </Hv>
          ))}
        </div>
      </section>
      <section data-screen-label="Audience — Quote" style={sx('padding:0 clamp(20px,3vw,40px) clamp(56px,6vw,96px);display:flex;flex-wrap:wrap;gap:clamp(28px,4vw,72px);align-items:center')}>
        <img src={quote.img} alt={quote.n} style={sx('flex:1 1 260px;width:100%;max-width:420px;aspect-ratio:1;object-fit:cover;object-position:center top;display:block;background:var(--hw-cool-grey)')} />
        <div style={sx('flex:2 1 420px;min-width:0;display:flex;flex-direction:column;gap:24px')}>
          <p style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(26px,2.8vw,42px);line-height:1.18;letter-spacing:-.01em;text-wrap:pretty')}>“{quote.q}”</p>
          <Hv as="button" onClick={() => go('about/leadership')} s="align-self:flex-start;display:flex;flex-direction:column;gap:4px;background:none;border:0;padding:0;cursor:pointer;text-align:left;color:var(--hw-black)" h="color:var(--hw-terracotta)">
            <span style={sx('font-family:var(--font-display);font-weight:500;font-size:22px')}>{quote.n} →</span>
            <span style={sx(`${MONO};font-size:13px`)}>{quote.t}</span>
          </Hv>
        </div>
      </section>
      <section data-screen-label="Audience — Key facts" style={sx('background:var(--hw-cool-grey);padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:clamp(28px,4vw,72px);align-items:start')}>
        <div style={sx('display:flex;flex-direction:column;gap:16px')}>
          <p style={sx(EYEBROW)}>What you’ll want to know</p>
          <h2 style={sx(`${H2};text-wrap:balance`)}>{aud.factsHeading}</h2>
        </div>
        <div style={sx('display:flex;flex-direction:column')}>
          {aud.facts.map((k) => (
            <div key={k.k} data-m-stack="" style={sx('display:grid;grid-template-columns:minmax(0,200px) minmax(0,1fr);gap:8px 24px;padding:16px 0;border-top:1px solid var(--hw-black)')}>
              <span style={sx(`${MONO};font-size:13px;padding-top:3px`)}>{k.k}</span>
              <span style={sx('font-size:18px;line-height:1.5;text-wrap:pretty')}>{k.v}</span>
            </div>
          ))}
        </div>
      </section>
      <section data-screen-label="Audience — How it works" style={sx(`padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px) 0;display:flex;flex-direction:column;gap:28px;background:${RULE_BG}`)}>
        <h2 style={sx(H2)}>{aud.stepsHeading}</h2>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,220px),1fr));gap:clamp(20px,3vw,40px)')}>
          {aud.steps.map((x) => (
            <div key={x.no} style={sx('display:flex;flex-direction:column;gap:10px;border-top:1px solid var(--hw-black);padding-top:16px')}>
              <span style={sx('font-family:var(--font-subhead);font-weight:500;font-size:14px;color:var(--hw-black)')}>Step {x.no}</span>
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:22px')}>{x.title}</span>
              <span style={sx('font-size:18px;line-height:1.5;text-wrap:pretty')}>{x.body}</span>
            </div>
          ))}
        </div>
      </section>
      {sub === 'advisors' && (
        <section data-screen-label="Audience — White papers" style={sx(`padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px) 0;display:flex;flex-direction:column;gap:28px;background:${RULE_BG}`)}>
          <div style={sx('display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-end;gap:16px 40px')}>
            <div style={sx('display:flex;flex-direction:column;gap:14px;max-width:720px')}>
              <p style={sx(EYEBROW)}>White papers</p>
              <h2 style={sx(`${H2};text-wrap:balance`)}>Research to share with your clients.</h2>
              <p style={sx('margin:0;font-size:clamp(17px,1.4vw,20px);line-height:1.5;text-wrap:pretty')}>
                Short, sourced reads on how purpose-built rental works and how we manage risk. Each one comes as a web article and a branded PDF.
              </p>
            </div>
            <span style={sx(`display:inline-flex;padding:5px 9px;border:1.5px dashed currentColor;${MONO};font-size:12px;letter-spacing:.04em`)}>Draft copy — for review</span>
          </div>
          <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:clamp(16px,2vw,24px)')}>
            {PAPERS.map((p) => (
              <div key={p.t} style={sx('display:flex;flex-direction:column;gap:14px;padding:24px;background:var(--hw-white);border:1.5px solid var(--hw-black);min-height:300px')}>
                <span style={sx(`${MONO};font-size:12px;letter-spacing:.04em;color:var(--hw-black)`)}>{p.tag}</span>
                <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(22px,1.9vw,26px);line-height:1.12;text-wrap:balance')}>{p.t}</span>
                <span style={sx('font-size:18px;line-height:1.5;text-wrap:pretty')}>{p.m}</span>
                <div style={sx('margin-top:auto;display:flex;flex-wrap:wrap;gap:8px')}>
                  <span style={sx(`${MONO};font-size:12px;padding:10px 14px;background:var(--hw-black);color:var(--hw-white)`)}>Download PDF</span>
                  <span style={sx(`${MONO};font-size:12px;padding:10px 14px;border:1.5px solid var(--hw-black)`)}>Copy link</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      <section data-screen-label="Audience — Resources and contact" style={sx(`padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px) 0;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,380px),1fr));gap:clamp(24px,4vw,64px);align-items:start;background:${RULE_BG}`)}>
        <div style={sx('display:flex;flex-direction:column;gap:16px')}>
          <p style={sx(EYEBROW)}>Resources</p>
          <div style={sx('display:flex;flex-direction:column')}>
            {aud.docs.map((d) => (
              <div key={d.t} style={sx('display:flex;justify-content:space-between;align-items:center;gap:16px;padding:16px 0;border-top:1px solid var(--hw-black)')}>
                <span style={sx('display:flex;flex-direction:column;gap:4px')}>
                  <span style={sx('font-family:var(--font-display);font-weight:500;font-size:20px')}>{d.t}</span>
                  <span style={sx('font-size:18px')}>{d.m}</span>
                </span>
                <span style={sx(`flex:none;${MONO};font-size:12px;padding:10px 14px;border:1.5px solid var(--hw-black)`)}>{d.cta}</span>
              </div>
            ))}
          </div>
          <Hv as="a" href={LOGIN_URL} target="_blank" rel="noopener noreferrer" s="display:flex;justify-content:space-between;align-items:center;gap:16px;padding:18px 0;background:none;border:0;border-top:1px solid var(--hw-black);cursor:pointer;text-align:left;color:var(--hw-black);text-decoration:none" h="color:var(--hw-teal)">
            <span style={sx('display:flex;flex-direction:column;gap:4px')}>
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:20px')}>Invite-only events</span>
              <span style={sx('font-size:18px')}>Lunch &amp; Learns, investor evenings and building tours. Log in to see yours.</span>
            </span>
            <span style={sx(`${MONO};font-size:13px;white-space:nowrap`)}>Log in ↗</span>
          </Hv>
        </div>
        <div style={sx('display:flex;flex-direction:column;gap:18px')}>
          <p style={sx(`margin:0;${MONO};font-size:clamp(14px,1.2vw,18px);color:var(--hw-terracotta)`)}>Your Heartwood contact</p>
          <div data-m-stack="" style={sx('display:grid;grid-template-columns:minmax(0,180px) minmax(0,1fr);gap:clamp(16px,2vw,28px);align-items:end;padding-top:16px;border-top:1px solid var(--hw-black)')}>
            <img src={aud.contact.img} alt={aud.contact.n} style={sx('width:100%;aspect-ratio:1;object-fit:cover;display:block;background:var(--hw-cool-grey)')} />
            <div style={sx('display:flex;flex-direction:column;gap:8px')}>
              <span style={sx('font-family:var(--font-display);font-weight:500;font-size:clamp(24px,2.2vw,32px)')}>{aud.contact.n}</span>
              <span style={sx(`${MONO};font-size:13px`)}>{aud.contact.t}</span>
              <span style={sx('font-size:18px;line-height:1.5;text-wrap:pretty')}>{aud.contact.body}</span>
              <Hv as="button" onClick={() => go('about/leadership')} s={`align-self:flex-start;margin-top:6px;background:none;border:0;border-bottom:1.5px solid var(--hw-black);padding:0 0 3px;cursor:pointer;color:var(--hw-black);${MONO};font-size:13px`} h="color:var(--hw-terracotta);border-color:var(--hw-terracotta)">
                View full bio →
              </Hv>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const ERROR_TEXT = `${MONO};font-size:12px;letter-spacing:.06em;line-height:1.4`

// The landing page form. Checks fields inline, then shows sending, sent or error states.
// Submissions go to HubSpot once the form's ID is set in src/site/forms.js.
function LeadForm({ s, form, meeting }) {
  const { status, send } = useFormSubmit(form.hubspot)
  const [errors, setErrors] = useState({})

  const onSubmit = (e) => {
    e.preventDefault()
    const el = e.currentTarget.elements
    const v = { name: el.name.value.trim(), email: el.email.value.trim(), choice: el.choice ? el.choice.value : '' }
    const errs = {}
    if (!v.name) errs.name = 'Enter your name.'
    if (!isEmail(v.email)) errs.email = 'Enter a valid email address.'
    if (form.hasSelect && !v.choice) errs.choice = 'Choose an option.'
    setErrors(errs)
    const first = Object.keys(errs)[0]
    if (first) {
      el[first].focus()
      return
    }
    const [firstname, ...rest] = v.name.split(/\s+/)
    const fields = { firstname, lastname: rest.join(' '), email: v.email }
    if (v.choice) fields[HUBSPOT.selectFields[form.hubspot] || 'message'] = v.choice
    send(fields, el.company_website.value)
  }

  // A field's error clears as soon as it is edited.
  const clearError = (e) => {
    const n = e.target.name
    if (errors[n]) setErrors((x) => ({ ...x, [n]: undefined }))
  }

  if (status === 'sent') {
    return <p role="status" style={sx('margin:0;font-family:var(--font-display);font-weight:500;font-size:clamp(26px,2.6vw,38px);line-height:1.1')}>{form.thanks}</p>
  }

  const field = (k) => ({
    name: k,
    'aria-invalid': errors[k] ? true : undefined,
    'aria-describedby': errors[k] ? `${s}-${k}-error` : undefined,
  })
  const fieldStyle = (k) => sx(`${FIELD}${errors[k] ? ';outline:2px solid var(--hw-black);outline-offset:0' : ''}`)
  const error = (k) => errors[k] && <span id={`${s}-${k}-error`} style={sx(ERROR_TEXT)}>{errors[k]}</span>

  return (
    <>
      <HubspotNote label={HUBSPOT_LABEL[s]} />
      <form onSubmit={onSubmit} onInput={clearError} onChange={clearError} noValidate data-hubspot-form={form.hubspot} style={sx('position:relative;display:flex;flex-direction:column;gap:18px')}>
        <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:18px')}>
          <label style={sx('display:flex;flex-direction:column;gap:8px')}>
            <span style={sx(`${MONO};font-size:13px`)}>Name</span>
            <input {...field('name')} required autoComplete="name" placeholder="ENTER YOUR NAME" style={fieldStyle('name')} />
            {error('name')}
          </label>
          <label style={sx('display:flex;flex-direction:column;gap:8px')}>
            <span style={sx(`${MONO};font-size:13px`)}>Email</span>
            <input {...field('email')} type="email" required autoComplete="email" placeholder="ENTER YOUR EMAIL" style={fieldStyle('email')} />
            {error('email')}
          </label>
        </div>
        {form.hasSelect && (
          <label style={sx('display:flex;flex-direction:column;gap:8px')}>
            <span style={sx(`${MONO};font-size:13px`)}>{form.selectLabel}</span>
            <select {...field('choice')} required defaultValue="" style={sx(`${FIELD};border-radius:0${errors.choice ? ';outline:2px solid var(--hw-black);outline-offset:0' : ''}`)}>
              <option value="" disabled>Select one</option>
              {form.options.map((o) => <option key={o}>{o}</option>)}
            </select>
            {error('choice')}
          </label>
        )}
        <input {...HONEYPOT} />
        {meeting && (
          <div style={sx('min-height:260px;border:1.5px dashed var(--hw-black);display:flex;align-items:center;justify-content:center;padding:20px;text-align:center;font-family:var(--font-subhead);font-size:13px;text-transform:uppercase;line-height:1.5')}>
            HubSpot Meetings calendar embeds here
          </div>
        )}
        <div style={sx('display:flex;flex-direction:column;align-items:flex-start;gap:12px')}>
          <Hv as="button" type="submit" disabled={status === 'sending'} s={`padding:12px 18px;background:var(--hw-black);color:var(--hw-white);border:0;cursor:${status === 'sending' ? 'progress' : 'pointer'};${MONO};font-size:14px`} h={`background:${meeting ? 'var(--hw-teal)' : 'var(--hw-terracotta)'}`}>
            {status === 'sending' ? 'Sending…' : form.cta}
          </Hv>
          <p role="status" aria-live="polite" style={sx('margin:0;max-width:560px;font-size:15px;line-height:1.45;text-wrap:pretty')}>
            {status === 'error' && (
              <>
                Something went wrong and your details weren’t sent. Please try again, or email <a href="mailto:info@heartwoodinvestments.ca" style={{ color: 'inherit' }}>info@heartwoodinvestments.ca</a>.
              </>
            )}
          </p>
        </div>
      </form>
    </>
  )
}

function PageLanding({ sub, go }) {
  const s = PAGES[sub] ? sub : 'events'
  const { hero, form } = PAGES[s]
  const aud = AUD[s]
  const formRef = useRef(null)
  const meeting = s === 'meeting'
  const plainHero = s === 'events' || s === 'podcast'

  const toForm = () => {
    const el = formRef.current
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' })
  }

  return (
    <div style={sx('background:var(--hw-white);color:var(--hw-black);font-family:var(--font-body)')}>
      {aud ? (
        <section data-screen-label={'Landing — ' + s} style={sx('position:relative;overflow:hidden;height:clamp(480px,52vw,760px);background:var(--hw-brown)')}>
          <img src={hero.img} alt="" style={sx('position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block')} />
          <div style={sx('position:absolute;inset:0;background:var(--overlay-brown)')} />
          <div style={sx('position:absolute;left:0;right:0;bottom:0;padding:clamp(40px,5vw,72px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:20px;color:var(--hw-white)')}>
            <p style={sx(`margin:0;${MONO};font-size:clamp(14px,1.2vw,18px)`)}>{hero.eyebrow}</p>
            <h1 style={sx('margin:0;max-width:980px;font-family:var(--font-display);font-weight:500;font-size:clamp(40px,5.6vw,88px);line-height:1;letter-spacing:-.025em;text-wrap:balance')}>{hero.title}</h1>
          </div>
        </section>
      ) : plainHero ? (
        <section data-screen-label={'Landing — ' + s} style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))')}>
          <div style={sx('padding:clamp(56px,8vw,128px) clamp(20px,3vw,40px) clamp(32px,4vw,56px);display:flex;flex-direction:column;gap:24px;justify-content:flex-end')}>
            <p style={sx(EYEBROW)}>{hero.eyebrow}</p>
            <h1 style={sx('margin:0;max-width:900px;font-family:var(--font-display);font-weight:500;font-size:clamp(44px,6vw,96px);line-height:1;letter-spacing:-.025em;text-wrap:balance')}>{hero.title}</h1>
            <p style={sx('margin:0;max-width:680px;font-size:clamp(18px,1.5vw,22px);line-height:1.5;text-wrap:pretty')}>{hero.intro}</p>
            {s === 'podcast' && <PlatformButtons />}
          </div>
          {s === 'podcast' && (
            <div style={sx("min-height:clamp(380px,40vw,640px);background:var(--hw-cool-grey) url('/assets/photography/HW_MassTimber_Lounge-Corner.jpg') center 85%/cover no-repeat")} />
          )}
        </section>
      ) : (
        <section data-screen-label={'Landing — ' + s} style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));min-height:clamp(440px,42vw,640px)')}>
          <div style={sx('padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:22px;justify-content:flex-end')}>
            <p style={sx(EYEBROW)}>{hero.eyebrow}</p>
            <h1 style={sx('margin:0;max-width:760px;font-family:var(--font-display);font-weight:500;font-size:clamp(40px,5.2vw,80px);line-height:1;letter-spacing:-.025em;text-wrap:balance')}>{hero.title}</h1>
            <p style={sx('margin:0;max-width:580px;font-size:clamp(18px,1.5vw,22px);line-height:1.5;text-wrap:pretty')}>{hero.intro}</p>
            <div style={sx('display:flex;flex-wrap:wrap;gap:12px')}>
              <Hv as="button" onClick={toForm} s={`padding:14px 20px;background:var(--hw-black);color:var(--hw-white);border:0;cursor:pointer;${MONO};font-size:14px`} h="background:var(--hw-terracotta)">
                {hero.cta}
              </Hv>
              {hero.cta2 && (
                <Hv as="button" onClick={() => go('investment/meeting')} s={`padding:16px 24px;background:transparent;color:var(--hw-black);border:1.5px solid var(--hw-black);cursor:pointer;${MONO};font-size:15px;letter-spacing:.02em`} h="background:var(--hw-black);color:var(--hw-white)">
                  {hero.cta2}
                </Hv>
              )}
            </div>
          </div>
          <div style={sx('position:relative;overflow:hidden;min-height:340px;background:var(--hw-brown)')}>
            <img src={hero.img} alt="" style={sx('position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block')} />
            {!hero.faded && <div style={sx('position:absolute;inset:0;background:var(--overlay-brown)')} />}
          </div>
        </section>
      )}

      {s === 'events' && <Events toForm={toForm} go={go} />}
      {s === 'learn' && <Learn go={go} />}
      {s === 'podcast' && <Podcast />}
      {aud && <Audience sub={s} aud={aud} hero={hero} toForm={toForm} go={go} />}


      {s === 'portal' && (
        <section data-screen-label="Investor Portal — Benefits" style={sx(`padding:clamp(48px,6vw,88px) clamp(20px,3vw,40px);display:flex;flex-direction:column;gap:28px;background:${RULE_BG}`)}>
          <div style={sx(RULE_LINE)} />
          <h2 style={sx(H2)}>What you’ll access</h2>
          <NumberedGrid items={BENEFITS} />
          <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:clamp(20px,3vw,48px);padding-top:24px;border-top:1px solid var(--hw-black)')}>
            <div style={sx('display:flex;flex-direction:column;gap:10px')}>
              <span style={sx(`${MONO};font-size:13px;color:var(--hw-black)`)}>Who can invest</span>
              <p style={sx('margin:0;font-size:18px;line-height:1.55;max-width:560px;text-wrap:pretty')}>
                Heartwood’s trusts are offered to accredited investors under Canadian securities law. You can create an account and browse fund materials before confirming eligibility; we verify accreditation before any subscription.
              </p>
            </div>
            <div style={sx('display:flex;flex-direction:column;gap:10px')}>
              <span style={sx(`${MONO};font-size:13px;color:var(--hw-black)`)}>Security &amp; privacy</span>
              <p style={sx('margin:0;font-size:18px;line-height:1.55;max-width:560px;text-wrap:pretty')}>
                Documents are shared through tracked, access-controlled links and signed through DocuSign. We never sell or share your information.
              </p>
            </div>
          </div>
        </section>
      )}

      <section ref={formRef} data-screen-label={'Landing — ' + s + ' form'} style={sx('padding:0 clamp(20px,3vw,40px) clamp(48px,6vw,88px);display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr));gap:clamp(32px,4vw,64px);align-items:stretch')}>
        <div style={sx(`display:flex;flex-direction:column;gap:20px;padding-top:clamp(40px,5vw,72px);border-top:${meeting ? '0' : '1.5px solid var(--hw-terracotta)'}`)}>
          <p style={sx(EYEBROW)}>{form.eyebrow}</p>
          <h2 style={sx('margin:0;max-width:560px;font-family:var(--font-display);font-weight:500;font-size:clamp(32px,3.6vw,52px);line-height:1.08;letter-spacing:-.015em;text-wrap:balance')}>{form.title}</h2>
          {form.note && <p style={sx('margin:0;max-width:520px;font-size:18px;line-height:1.5;text-wrap:pretty')}>{form.note}</p>}
          {meeting && (
            <div style={sx('display:flex;flex-direction:column;gap:20px;padding-top:12px')}>
              <span style={sx(`${MONO};font-size:13px;color:var(--hw-black)`)}>You’ll be meeting with one of our investment experts</span>
              <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,220px));gap:clamp(24px,3vw,48px)')}>
                {MEETING_TEAM.map((m) => (
                  <div key={m.name} style={sx('display:flex;flex-direction:column;gap:10px')}>
                    <img src={m.img} alt={m.name} style={sx('width:100%;aspect-ratio:1;object-fit:cover;display:block;background:var(--hw-cool-grey)')} />
                    <span style={sx(`font-family:var(--font-display);font-weight:500;font-size:clamp(20px,1.7vw,24px)${m.nowrap ? ';white-space:nowrap' : ''}`)}>{m.name}</span>
                    <span style={sx('font-family:var(--font-subhead);font-size:13px;text-transform:uppercase;line-height:1.35')}>{m.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div style={sx(`background:${meeting ? 'var(--hw-terracotta)' : 'var(--hw-cool-grey)'};color:${meeting ? 'var(--hw-white)' : 'var(--hw-black)'};padding:clamp(28px,3vw,44px);margin-top:clamp(40px,5vw,72px);display:flex;flex-direction:column;gap:22px`)}>
          <LeadForm key={s} s={s} form={form} meeting={meeting} />
        </div>
      </section>
    </div>
  )
}

export default PageLanding
