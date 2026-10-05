// Site content, ported from the design's ui_kits/website/site-data.js (window.HW_DATA).
const T = '/assets/team/'
const team = [
  { id: 'david', group: 'partners', name: 'David Constable', title: 'Founding Partner', photo: T + 'HW_Team_David-Constable.jpg', bio: 'David brings over 20 years of experience in international architecture and real estate development, having led $5B in project design and management with a focus on low-carbon, design-forward outcomes.' },
  { id: 'tim', group: 'partners', name: 'Tim Blair', title: 'Founding Partner', photo: T + 'HW_Team_Tim-Blair.jpg', bio: 'Tim brings 20 years of experience in real estate investment banking and private equity, having completed over $8B in transactions across complex commercial and mixed-use residential developments in the Americas and Europe.' },
  { id: 'nathan', group: 'partners', name: 'Nathan Helbach', title: 'Partner, United States', photo: T + 'HW_Team_Nathan-Helbach-square.png', bio: 'Nathan brings 10 years of experience in real estate development and investing, having delivered over 2,200 multifamily units in the United States and several large-scale mass timber buildings in North America, with a focus on expanding Heartwood’s strategy into the United States.' },
  { id: 'george', group: 'advisors', name: 'George Theuvenet', title: 'Senior Advisor', photo: T + 'HW_Team_George.jpg', bio: 'George brings over 30 years of experience in financial institutions, real estate, investor relations, and capital raising, with a strong track record building and sustaining long-term relationships across international institutional markets.' },
  { id: 'rebekah', group: 'advisors', name: 'Rebekah Tobias', title: 'Senior Advisor', photo: T + 'HW_Team_Rebekah.jpg', bio: 'Rebekah brings over 20 years of experience in real estate and investment, advising Heartwood on resilient European real estate strategies and drawing on deep relationships across European family offices and capital-raising networks.' },
  { id: 'richard', group: 'advisors', name: 'Richard Crofts', title: 'Senior Advisor', photo: T + 'HW_Team_Richard-Crofts.png', bio: 'Richard brings a 25+-year track record structuring and launching investment vehicles and leading complex mergers, acquisitions, and cross-border transactions. He holds the Chartered Investment Manager (CIM) designation, is a Fellow of the Canadian Securities Institute (FCSI), and was previously recognized as a “Top 40 Under 40” lawyer called to the Bar in New York State and Ontario.' },
  { id: 'cheryl', group: 'advisors', name: 'Cheryl Gray', title: 'Senior Advisor', photo: T + 'HW_Team_Cheryl-Gray.png', bio: 'Cheryl brings decades of institutional real estate management experience, helping clients strengthen organizational structure, sustainability initiatives, risk mitigation, and prop-tech implementation across all major asset classes. Her recognition includes the BOMA Canada Chairman’s Award, the REIC Emeritus Award, and GlobeSt’s Real Estate Women of Influence Innovator of the Year Award.' },
  { id: 'dylank', group: 'team', name: 'Dylan Kent', title: 'Director, Capital Markets', photo: T + 'HW_Team_Dylan-Kent.jpg', bio: 'Dylan brings over 10 years of experience in real estate capital markets across large institutions, boutique investment firms, and large-scale developers, with an entrepreneurial track record spanning startups and ventures in real estate, prop-tech, and sports & entertainment.' },
  { id: 'dustin', group: 'team', name: 'Dustin Buenaventura', title: 'Director, Business Development', photo: T + 'HW_Team_Dustin-Buenaventura.png', bio: 'Dustin brings over a decade of experience in Canadian financial services and business development, including senior roles at Equiton, Brompton Funds, Horizons ETFs, and Sun Life Global Investments, with deep expertise across private equity, ETFs, wealth management, and alternative investments.' },
  { id: 'kris', group: 'team', name: 'Kristopher Tavella', title: 'Vice President, Investments and Portfolio Manager', photo: T + 'HW_Team_Kristopher-Tavella.png', bio: null },
  { id: 'jordan', group: 'team', name: 'Jordan Winter', title: 'Director, Fund Accounting & Reporting', photo: T + 'HW_Team_Jordan-Winter.jpg', bio: null },
  { id: 'nic', group: 'team', name: 'Nic Green', title: 'Director, Construction', photo: T + 'HW_Team_Nic-Green.png', bio: null },
  { id: 'adam', group: 'team', name: 'Adam Morgan', title: 'Associate, Development and Investments', photo: T + 'HW_Team_Adam-Morgan.png', bio: null },
  { id: 'jonathan', group: 'team', name: 'Jonathan Graham', title: 'Manager, Building Performance', photo: T + 'HW_Team_Jonathan-Graham.png', bio: null },
  { id: 'dylandc', group: 'team', name: 'Dylan Delli Colli', title: 'Data Science Lead', photo: T + 'HW_Team_Dylan.jpg', bio: null },
  { id: 'mikef', group: 'team', name: 'Mike Freeland', title: 'Senior PM, Construction', photo: T + 'HW_Team_Mike-Freeland.jpg', bio: null },
  { id: 'jude', group: 'team', name: 'Jude Siby', title: 'Senior Development Accountant', photo: T + 'HW_Team_Jude-Siby.png', bio: null },
  { id: 'mikep', group: 'team', name: 'Mike Prapavessis', title: 'Analyst, Development and Investments', photo: T + 'HW_Team_Mike-Prapavessis.jpg', bio: null },
  { id: 'cole', group: 'team', name: 'Cole Cameron', title: 'Analyst, Development and Investments', photo: T + 'HW_Team_Cole.jpg', bio: null },
  { id: 'matt', group: 'team', name: 'Matthew Sardellitti', title: 'Analyst, Development and Investments', photo: T + 'HW_Team_Matt.jpg', bio: null },
]

const R = '/assets/project-renders/'
const projects = [
  { slug: '2102-lawrence', name: '2102 Lawrence Avenue East', loc: 'Toronto, Ontario', country: 'Canada', strategy: 'Growth', status: 'Pending', units: 'TBC', img: R + 'HW_Render_2102-Lawrence.jpg' },
  { slug: '3385-lawrence', name: '3385 Lawrence Avenue East', loc: 'Toronto, Ontario', country: 'Canada', strategy: 'Growth', status: 'Pre-construction', units: '155', img: R + 'HW_Render_3385-Lawrence.jpg', img2: R + 'HW_Render_3385-Lawrence-Courtyard.jpg', cap1: 'Street view, rendering', cap2: 'Courtyard, rendering', body: 'A purpose-built rental community in Scarborough, organised around a shared landscaped courtyard. The project reflects how we approach resilience: building systems chosen for long-term operating cost, generous amenity space residents actually use, and a design intended to age well rather than simply lease up quickly.' },
  { slug: '360-kennedy', name: '360 Kennedy Lane', loc: 'Ottawa, Ontario', country: 'Canada', strategy: 'Growth', status: 'TBC', units: 'TBC', img: R + 'HW_Render_360-Kennedy-Lane.jpg' },
  { slug: '308-parkside', name: '308 Parkside Drive', loc: 'Hamilton, Ontario', country: 'Canada', strategy: 'Growth', status: 'TBC', units: 'TBC', img: R + 'HW_Render_308-Parkside-Dr.jpg' },
  { slug: '353-sherbourne', name: '353 Sherbourne Street', loc: 'Toronto, Ontario', country: 'Canada', strategy: 'Growth', status: 'TBC', units: 'TBC', img: R + 'HW_Render_353-Sherbourne.jpg' },
  { slug: '4094-tomken', name: '4094 Tomken Road', loc: 'Mississauga, Ontario', country: 'Canada', strategy: 'Growth', status: 'TBC', units: 'TBC', img: R + 'HW_Render_4094-Tomken-Road.jpg' },
  { slug: '1570-main', name: '1570 Main Street', loc: 'Hamilton, Ontario', country: 'Canada', strategy: 'Growth', status: 'TBC', units: 'TBC', img: R + 'HW_Render_1570-Main-Street.png' },
  { slug: '175-oxford', name: '175 Oxford Street', loc: 'Orillia, Ontario', country: 'Canada', strategy: 'Growth', status: 'TBC', units: 'TBC', img: R + 'HW_Render_175-Oxford-Street.webp' },
  {
    slug: '517-w-main', name: '517 West Main Street', loc: 'Madison, Wisconsin', country: 'United States', strategy: 'Income', status: 'Stabilized', units: '33',
    body: 'A four-storey, 33-unit mass timber building a few blocks from the Wisconsin State Capitol. Its studio, one-bedroom and two-bedroom homes are laid out on a repeatable 12-foot grid of prefabricated steel walls and cross-laminated timber floors, wrapped in brick laid by Wisconsin masons. The building steps back from the street to keep a mature tree, leaving room for a small public plaza and a ground-floor café. Developed by Neutral, the building is now owned and asset-managed by Heartwood.',
    designTeam: ['Neutral, architect of record', 'Sala Hars, design consultant', 'Shane Bernau, landscape'],
    partner: ['Developed by Neutral'], owner: ['Heartwood, owner and asset manager'],
    amenities: ['Ground-floor wellness space and gym', 'Library lobby', 'Work-friendly lobby', 'Private backyard with grill', 'Public plaza', 'Underground parking', 'EV charging', 'Bike sharing'],
    features: ['Cross-laminated timber floors and ceilings', '12 × 12 ft standard plan grid', 'Prefabricated cold-formed steel walls', 'Brick facade by Wisconsin masons', 'Triple-glazed, floor-to-ceiling windows', 'Reverse-osmosis water filtration in every unit', 'First building with Kohler WasteLab sinks', 'Massing recessed to keep a mature street tree'],
    materialBoard: { src: R + 'HW_517-W-Main_Material-board.png', cap: 'Interior materials: pine, white oak, terrazzo, glass and warm grey finishes' },
    img: R + 'HW_517-W-Main_Front.png', cap1: 'Front elevation, West Main Street', img2: R + 'HW_517-W-Main_Street.png', cap2: 'Street view, West Main Street',
    gallery: [{ src: R + 'HW_517-W-Main_Corner.png', cap: 'Corner view, West Main Street' }, { src: R + 'HW_517-W-Main_Aerial.jpeg', cap: 'Aerial view toward Lake Monona' }],
    drawings: [{ src: R + 'HW_517-W-Main_Drawing_plan-typical.png', cap: 'Typical floor plan' }, { src: R + 'HW_517-W-Main_Drawing_plan-lower.png', cap: 'Lower level plan' }, { src: R + 'HW_517-W-Main_Drawing_section-a.png', cap: 'Longitudinal section' }, { src: R + 'HW_517-W-Main_Drawing_section-b.png', cap: 'Cross section' }],
  },
]

const issues = [
  { no: '01', date: 'October 2026', title: 'Why we take the long view in real estate', dek: 'A letter from our founders, the Build. Buy. Hold. platform, 3385 Lawrence Avenue East, and our market perspective.', img: '/assets/website/HW_3385-Lawrence-Av-E_1.png', live: true },
  { no: '02', date: 'November 2026', title: 'Coming November', dek: 'The next edition of The Long View arrives early November.', img: '', live: false },
]

const I = R + 'innovation/'
const pillars = [
  { key: 'resilience', n: '01', title: 'Resilience', line: 'Designed for the 2050 climate.', body: 'Our buildings are built to adapt — to a changing climate, regulatory uncertainty and utility-cost volatility. Heat pumps, high-performance prefabricated envelopes and rooftop solar protect both residents and long-term value.', img: I + 'HW_Innovation_Green-Roof.jpg', points: ['Heat pump systems with 3–4× the efficiency of gas boilers', 'Prefabricated, high-performance building envelopes', 'Rooftop solar PV and green roofs'] },
  { key: 'community', n: '02', title: 'Community', line: 'Better buildings are better places to live.', body: 'Neighbours connect through indoor and outdoor gathering spaces, abundant green space and programming with local partners. Residents stay longer, and communities take root.', img: I + 'HW_Innovation_Community-Space.jpg', points: ['Indoor and outdoor gathering spaces', 'Biodiverse, water-efficient landscapes', 'Natural, tactile, durable materials like mass timber'] },
  { key: 'data', n: '03', title: 'Data', line: 'Iterative, practical innovation at every step.', body: 'Cloud-based controls monitor, operate and automate our buildings — from energy and security to mechanical systems. What we learn in one building informs the next, through a repeatable, systems-based approach.', img: I + 'HW_Innovation_Smart-Building-Controls.png', points: ['Smart, connected building controls', 'Data-driven decarbonization and efficiency', 'Repeatable systems that adapt to each site'] },
]

const systems = [
  { title: 'Rooftop Solar PV', img: I + 'HW_Innovation_Rooftop-Solar-PV.png', body: 'Reduces energy costs for building operations and improves resilience to changes in the electrical grid.' },
  { title: 'Green Roofs', img: I + 'HW_Innovation_Green-Roof.jpg', body: 'Improves insulation, passively manages stormwater and reduces urban heat island effects.' },
  { title: 'Prefabricated Envelopes', img: I + 'HW_Innovation_Prefab-Envelope_1.jpg', body: 'Shortens construction timeframes and improves performance, saving costs in construction and operations.' },
  { title: 'Smart Building Controls', img: I + 'HW_Innovation_Smart-Building-Controls.png', body: 'Cloud-based controls monitor, operate and automate our buildings, improving performance and reducing operating costs.' },
  { title: 'Low-energy Heating & Cooling', img: I + 'HW_Innovation_Heating-Cooling-Geothermal.jpg', body: 'Heat pump-based systems deliver 3–4 times greater energy efficiency than traditional gas boilers, with lower maintenance costs.' },
  { title: 'Prefabricated Mass Timber', img: I + 'HW_Innovation_Mass-Timber.png', body: 'Repeatable mass-timber structures improve construction speed and reduce costs — a natural, beautiful, long-lasting material residents love.' },
]

const stats = [
  { target: 14, prefix: '', suffix: '', dec: 0, label: 'Projects in the seed portfolio' },
  { target: 2600, prefix: '', suffix: '', dec: 0, label: 'Potential housing units' },
  { target: 1.5, prefix: '$', suffix: 'B', dec: 1, label: 'Development budget' },
  { target: 13, prefix: '$', suffix: 'B+', dec: 0, label: 'Founding partners’ combined project & transaction experience' },
]

const market = [
  { icon: 'HOME', theme: 'Demand is rising', op: '+', note: 'More households need rental homes every year.', ca: { big: '+1.4M', label: 'Renter households added, 2011–2025.' }, us: { big: '4.03M', label: 'Estimated shortfall of homes in 2025, up from 3.8M.' } },
  { icon: 'CONSTRUCTION', theme: 'Supply is falling', op: '=', note: 'New construction is pulling back sharply.', ca: { big: '7,243', label: 'Condo units cancelled in 2025, more than double the prior year.' }, us: { big: '−73%', label: 'Multifamily starts from the 2022 peak, as of Q1 2026.' } },
  { icon: 'BUILDING', theme: 'Vacancy stays low', op: '', note: 'Even after record completions, units are being absorbed.', ca: { big: '3.1%', label: 'Purpose-built rental vacancy, 2025.' }, us: { big: '4.8%', label: 'Multifamily vacancy, Q1 2026, as demand outpaced new supply.' } },
]

function fmt(s, p) {
  const v = s.target * p
  const t = s.dec ? v.toFixed(s.dec) : Math.round(v).toLocaleString('en-CA')
  return s.prefix + t + s.suffix
}

export const HW_DATA = { team, projects, issues, pillars, systems, stats, market, fmt }
export default HW_DATA
