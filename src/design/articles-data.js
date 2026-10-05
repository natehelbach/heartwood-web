// Sample Perspectives + White papers, ported from the design's ui_kits/website/articles-data.js
// (window.HW_ARTICLES). Copy and figures are placeholders for layout review.
const R = '/assets/renders/', T = '/assets/website/'
const DC = { name: 'David Constable', role: 'Co-founder & CEO', photo: T + 'HW_Team_David-Constable.jpg' }
const TB = { name: 'Tim Blair', role: 'Co-founder & President', photo: T + 'HW_Team_Tim-Blair.jpg' }
const GT = { name: 'Geoffrey Turnbull', role: 'Director, Innovation & Sustainability', photo: '' }

export const HW_ARTICLES = [
  { slug: 'nation-of-renters', kind: 'Perspective', title: 'Canada is becoming a nation of renters', dek: 'Renter households grew 35% between 2011 and 2025, far faster than households overall. What that means for the next decade of housing.', date: 'September 2026', read: '6 min read', author: DC, img: R + 'HW_2102-Lawrence-Av-E_1.png',
    keyPoints: ['Renter households are growing faster than owners in every major Canadian metro.', 'Affordability, not preference, is pushing more households to rent for longer.', 'Purpose-built rental remains a small share of the stock.'],
    quote: 'Renting is no longer a stop on the way to ownership. For millions of Canadians, it is home.',
    sections: [
      { h: 'A structural shift', p: ['For most of the last fifty years, renting was something Canadians did on the way to owning. That pattern is breaking. Since 2011, renter households have grown at more than twice the pace of households overall.', 'The shift is broad. It shows up in Toronto and Vancouver, but also in Ottawa, Calgary and the mid-sized cities around them.'] },
      { h: 'Why it is happening', p: ['Home prices have risen much faster than incomes. A typical household now needs far more income to carry a mortgage than it did a decade ago, and the down payment takes years longer to save.', 'Population growth adds to the pressure. New Canadians, students and young workers rent first, and many keep renting.'] },
      { h: 'What it means for investors', p: ['Demand for rental housing is deep and durable. Supply has not kept pace, which keeps vacancy low and supports rents over time.', 'We think the opportunity is in well-built, energy-efficient buildings that people want to live in for years, not months.'] },
    ],
    figure: { title: 'Household growth, 2011–2025', source: 'Statistics Canada. Illustrative, data to be confirmed.', bars: [{ l: 'Renter households', v: 35 }, { l: 'All households', v: 17 }, { l: 'Owner households', v: 10 }] } },
  { slug: 'supply-cliff', kind: 'Perspective', title: 'The supply cliff: why cancelled condos matter for rental', dek: '7,243 condominium units were cancelled in 2025. What it leaves behind in Ontario’s largest markets.', date: 'August 2026', read: '5 min read', author: TB, img: R + 'HW_4094-Tomken-Rd_2.png',
    keyPoints: ['Condo cancellations remove future rental supply, since many investor units would have been leased.', 'New starts are falling while population keeps growing.', 'The gap shows up in 2028–2030, when today’s missing projects would have completed.'],
    quote: 'Every cancelled condo tower is a rental building that will not exist in 2029.',
    sections: [
      { h: 'Where the units went', p: ['Thousands of pre-sold condo units were cancelled in 2025 as investors walked away and lenders tightened. Many of those units were bought by investors who would have rented them out.', 'When those projects stop, the rental supply they would have delivered disappears too.'] },
      { h: 'The timing gap', p: ['Buildings take three to five years to deliver. The projects not started today are the homes missing at the end of the decade.'] },
      { h: 'Our view', p: ['Purpose-built rental can fill part of that gap. We are building where the shortfall is largest and the demand is clearest.'] },
    ],
    figure: { title: 'GTA condo units cancelled', source: 'Urbanation. Illustrative, data to be confirmed.', bars: [{ l: '2023', v: 18, label: '1,300' }, { l: '2024', v: 55, label: '4,000' }, { l: '2025', v: 100, label: '7,243' }] } },
  { slug: 'heat-pumps-2050', kind: 'Perspective', title: 'Heat pumps, envelopes and the 2050 climate', dek: 'How low-energy systems protect residents from utility volatility, and investors from stranded assets.', date: 'July 2026', read: '7 min read', author: GT, img: R + 'HW_360-Kennedy-Lane_1.png',
    keyPoints: ['A tight envelope cuts energy demand before any equipment is chosen.', 'Heat pumps provide heating and cooling from one efficient system.', 'Lower operating costs support net operating income over the long term.'],
    quote: 'The cheapest energy is the energy a building never needs.',
    sections: [
      { h: 'Start with the envelope', p: ['Insulation, airtightness and good windows do most of the work. A well-built envelope keeps heat in during winter and out during summer, so smaller systems can do the job.'] },
      { h: 'Then electrify', p: ['Modern heat pumps work efficiently in Canadian winters and provide cooling as summers get hotter. One system, lower energy use, no on-site combustion.'] },
      { h: 'Why investors should care', p: ['Buildings that use less energy cost less to run, and they are better placed as carbon rules tighten. That is how we protect value over a long hold.'] },
    ],
    figure: { title: 'Energy use intensity, ekWh/m²/yr', source: 'Heartwood design targets vs. typical stock. Illustrative.', bars: [{ l: 'Typical older rental', v: 100, label: '250' }, { l: 'New code-built', v: 60, label: '150' }, { l: 'Heartwood target', v: 32, label: '80' }] } },
  { slug: 'tax-efficient-income', kind: 'White paper', no: '01', title: 'Tax-efficient income from private real estate', dek: 'How return of capital, registered accounts and the way income is taxed can help your clients keep more of what they earn.', date: 'October 2026', read: '10 pages', author: DC, img: R + 'HW_2102-Lawrence-Av-E_3.png',
    keyPoints: ['Distributions classified as return of capital (ROC) defer tax until units are sold, when gains are taxed at the capital gains rate.', 'Units held in a TFSA, RRSP or FHSA can grow tax-free or tax-deferred.', 'Interest, dividends and ROC are taxed very differently. The structure of the income matters as much as the yield.'],
    sections: [
      { h: 'Why tax belongs in the conversation', p: ['Canada’s capital gains rules have been in the news since 2024. The proposed increase to the inclusion rate was cancelled in March 2025, so it stays at 50%. The debate was a useful reminder: after-tax return is what clients actually keep.', 'Private real estate trusts can be structured to make income more tax-efficient. Here is how.'] },
      { h: 'Return of capital', p: ['Most investors buy real estate trusts for regular cash flow. In a non-registered account, distributions paid as ordinary income are taxed at the investor’s full marginal rate in the year they are received.', 'A trust can classify some or all of its distributions as return of capital. ROC is not taxed when received. Instead, it reduces the adjusted cost base of the units. Tax is deferred until the units are redeemed, and the gain is then taxed at the capital gains rate rather than as income.', 'For investors in higher brackets, or those who expect a lower bracket later, that deferral can be meaningful, especially when distributions are reinvested.'] },
      { h: 'Registered accounts', p: ['The simplest way to reduce tax is to hold eligible investments in a TFSA, RRSP or FHSA. Growth and income are tax-free or tax-deferred, depending on the account.', 'Many private alternatives are not eligible for registered plans. Units of a qualifying mutual fund trust can be, giving clients tax-sheltered access to rental income and growth.'] },
      { h: 'How investment income is taxed', p: ['Interest income is fully taxed at the marginal rate. Eligible Canadian dividends are grossed up, then reduced by federal and provincial dividend tax credits. ROC is deferred, then taxed as a capital gain when units are sold.', 'On the same pre-tax yield, the after-tax result can differ by thousands of dollars a year.'] },
      { h: 'What this means for Heartwood investors', p: ['[To confirm with Finance] The share of Heartwood Residential Income Trust distributions classified as ROC, and registered-plan eligibility for each trust and unit series.', 'This paper is not tax advice. Clients should speak with a qualified tax advisor about their own situation.'] },
    ],
    figure: { title: 'Year-one after-tax cash on $100,000 at a 6% yield', source: 'Illustrative only. Assumes a 46% marginal rate, Ontario. Not tax advice.', bars: [{ l: 'Return of capital (tax deferred)', v: 100, label: '$6,000' }, { l: 'Eligible dividends', v: 75, label: '≈ $4,500' }, { l: 'Interest income', v: 54, label: '≈ $3,240' }] },
    sources: ['Department of Finance Canada, capital gains inclusion rate announcement, March 2025', 'Canada Revenue Agency, return of capital and adjusted cost base guidance', 'Canada Revenue Agency, TFSA, RRSP and FHSA qualified investments'] },
  { slug: 'housing-gap', kind: 'White paper', no: '02', title: 'Rental fundamentals: why the housing gap persists', dek: 'Short-term softness in prices and rents hides a long-term shortage. The data behind our outlook for purpose-built rental.', date: 'October 2026', read: '12 pages', author: TB, img: R + 'HW_3385-Lawrence-Av-E_2.png',
    keyPoints: ['Canada completed a record of about 276,000 homes in 2024, but the PBO expects completions to fall well below the roughly 290,000 a year needed to close the gap.', 'Population growth has slowed from record highs but is forecast to remain among the fastest in the G7.', 'Ownership is still out of reach for many households, keeping renters in the market longer.'],
    sections: [
      { h: 'A cyclical pause, not a reversal', p: ['New supply, slower immigration and easing prices have cooled some markets. These are cyclical shifts. The structural gap between housing supply and demand remains, and is expected to widen again.'] },
      { h: 'The supply gap', p: ['The Parliamentary Budget Officer estimates completions will slow over the next decade, falling toward 193,000 a year by 2035. That is well short of the roughly 290,000 a year needed to close Canada’s housing gap.', 'CMHC reaches a similar conclusion: millions of additional homes are needed by 2035 to restore affordability.'] },
      { h: 'Rental construction will not close it alone', p: ['Rental starts reached record levels in 2024, helped by government programs and strong demand. But the picture varies by region: new starts in some markets offset sharp declines in Toronto and Vancouver.', 'In the GTA, a joint study by Urbanation, BILD and Finnegan Marshall projects rental demand will exceed new supply by about 121,000 units over ten years.'] },
      { h: 'Population growth stays strong', p: ['Canada’s population grew by about 3.2% a year in 2022 and 2023. Policy changes have slowed that sharply, but forecasts still place Canada among the fastest-growing G7 countries, with newcomers, students and workers driving rental demand.'] },
      { h: 'Ownership remains out of reach', p: ['Even as affordability improves, RBC reports that more than half of median household income is needed to own an average home in Canada. In Toronto and Vancouver the share is far higher. Many households will rent for longer.'] },
      { h: 'A window for new development', p: ['Construction cost growth has moderated from the double-digit increases of 2021–2023, and land values in parts of the GTA have fallen from their peak. For experienced developers, building new can now cost less than buying a comparable completed building.'] },
    ],
    figure: { title: 'Annual housing completions vs. need', source: 'Office of the Parliamentary Budget Officer, Household Formation and the Housing Stock, 2025.', bars: [{ l: 'Needed per year to close the gap', v: 100, label: '≈ 290,000' }, { l: '2024 completions (record)', v: 95, label: '≈ 276,000' }, { l: 'Projected 2035 completions', v: 67, label: '≈ 193,000' }] },
    sources: ['Office of the Parliamentary Budget Officer, 2025', 'CMHC Housing Supply Report, Fall 2025', 'Urbanation, BILD and Finnegan Marshall, GTA rental market study', 'Statistics Canada population estimates', 'RBC Economics, housing affordability monitor', 'CBRE Canada Real Estate Market Outlook 2025'] },
  { slug: 'private-real-estate-portfolio', kind: 'White paper', no: '03', title: 'Private real estate in a modern portfolio', dek: 'Why Canada’s largest pension funds hold alternatives, and how private rental housing can bring income, diversification and inflation protection to client portfolios.', date: 'October 2026', read: '12 pages', author: DC, img: R + 'HW_308-Parkside-Drive_3.png',
    keyPoints: ['Canada’s largest pension plans have grown their alternatives allocation substantially over two decades.', '2022 showed the limits of a 60/40 portfolio when stocks and bonds fell together.', 'Private rental housing has a long record of positive annual returns, including in high-inflation years.'],
    sections: [
      { h: 'Follow the long-term money', p: ['Canada’s largest pension plans, the “Maple Eight”, are known worldwide for long-term results. Since the 1990s they have moved steadily beyond stocks and bonds into private equity, infrastructure and private real estate. Alternatives are now a large share of their portfolios.'] },
      { h: 'Why diversification needs more than stocks and bonds', p: ['The traditional 60/40 portfolio relies on bonds to cushion falling stocks. In 2022, rising rates pushed both down at once.', 'Many advisors now consider a 10–20% allocation to alternatives to diversify returns and reduce volatility.'] },
      { h: 'The record of private rental housing', p: ['Private apartment funds offer exposure to income-producing rental buildings, with regular distributions and potential appreciation. Investors should weigh that against lower liquidity and longer holding periods.', 'The MSCI/REALpac Canada Private Apartments index has averaged roughly 9.6% a year since 1988, with no negative calendar year, including through the 2008–09 financial crisis and the pandemic. Past performance does not guarantee future results.'] },
      { h: 'Protection against inflation', p: ['Rents can reset as leases turn over, so rental income tends to keep pace with rising prices. In Canada’s higher-inflation years, private apartments have generally outpaced inflation.'] },
      { h: 'Built for long-term investors', p: ['Steady historical performance, growth potential and tax efficiency make private rental housing a strong long-term holding. A longer horizon also lets investors ride out short-term swings in liquidity and pricing.'] },
    ],
    figure: { title: 'Alternatives as a share of Canada’s largest pension plans', source: 'Annual reports of CPP Investments, OMERS, OTPP, CDPQ and others. Figures to verify.', bars: [{ l: '2005', v: 25, label: '14%' }, { l: '2015', v: 61, label: '35%' }, { l: '2024', v: 100, label: '57%' }] },
    sources: ['Annual reports of the Maple Eight pension plans', 'MSCI/REALpac Canada Quarterly Property Fund Index, Private Apartments', 'Statistics Canada, Consumer Price Index'] },
  { slug: 'rental-vs-condo', kind: 'White paper', no: '04', title: 'Why purpose-built rental is not a condo', dek: 'Ownership, tenure and operations: why rental buildings behave differently from condos through a housing cycle.', date: 'October 2026', read: '12 pages', author: TB, img: R + 'HW_3385-Lawrence-Av-E_1.png',
    keyPoints: ['A rental building has one owner and one operating plan; a condo has hundreds of owners.', 'Rental income does not depend on resale prices.', 'Professional management keeps occupancy and maintenance consistent.'],
    sections: [
      { h: 'Two very different assets', p: ['A condo tower is sold unit by unit. Once it completes, ownership is split across hundreds of buyers, each with their own goals. A purpose-built rental building stays under one owner, run as a single business.'] },
      { h: 'How they behave in a downturn', p: ['When condo prices fall, investor-owners face losses on resale and may sell at once. A rental building earns its return from rent, which has historically been far more stable than prices.'] },
      { h: 'Operations and quality', p: ['Rental owners build for a long hold. That changes design choices: durable materials, efficient systems and amenities that keep residents for years.'] },
      { h: 'What this means for your clients', p: ['Purpose-built rental offers exposure to housing demand without relying on resale prices or condo-market sentiment.'] },
    ],
    figure: { title: 'Year-over-year change, GTA', source: 'Illustrative, data to be confirmed.', bars: [{ l: 'Purpose-built rents', v: 70, label: '+3.5%' }, { l: 'Condo resale prices', v: 100, label: '−5.0%' }] },
    sources: ['CMHC Rental Market Report, 2025', 'Urbanation GTA Condominium Market Report, Q2 2026', 'Heartwood analysis'] },
  { slug: 'distribution-coverage', kind: 'White paper', no: '05', title: 'Distributions covered by cash flow', dek: 'How we fund distributions from net operating income, not new capital, and how we report coverage each quarter.', date: 'October 2026', read: '8 pages', author: DC, img: R + 'HW_308-Parkside-Drive_2.png',
    keyPoints: ['Distributions are paid from rental cash flow, not from new subscriptions.', 'We report the coverage ratio every quarter.', 'A coverage cushion protects the distribution if costs rise.'],
    sections: [
      { h: 'What coverage means', p: ['Coverage compares the cash a fund generates from its buildings to the distributions it pays. Above 1.0x, distributions are fully funded by operations.'] },
      { h: 'Why it matters', p: ['Some funds pay distributions partly from new investor money. That can hide weak performance. We fund ours from net operating income.'] },
      { h: 'How we report it', p: ['Each quarterly report shows net operating income, debt service, distributions paid and the resulting coverage ratio, by building and for the fund.'] },
    ],
    figure: { title: 'Income Trust distribution coverage', source: 'Illustrative, data to be confirmed.', bars: [{ l: 'Q1', v: 82, label: '1.15x' }, { l: 'Q2', v: 86, label: '1.20x' }, { l: 'Q3', v: 89, label: '1.24x' }] },
    sources: ['Heartwood Residential Income Trust quarterly reports', 'Offering Memorandum'] },
  { slug: 'low-leverage', kind: 'White paper', no: '06', title: 'Low leverage, lower risk', dek: 'Why we keep debt conservative, and what that means for investors when rates or values move.', date: 'October 2026', read: '10 pages', author: DC, img: R + 'HW_4094-Tomken-Rd_3.png',
    keyPoints: ['Lower loan-to-value means more room before values put pressure on the fund.', 'Long-term, insured financing reduces refinancing risk.', 'Conservative debt keeps more cash flow available for distributions.'],
    sections: [
      { h: 'Our approach to debt', p: ['We target loan-to-value well below many peers and favour long-term CMHC-insured financing where available.'] },
      { h: 'Stress-testing the portfolio', p: ['We model rate and value shocks on every building. Low leverage keeps the fund within covenants across a wide range of scenarios.'] },
      { h: 'The trade-off', p: ['More leverage can lift returns in a rising market. We accept a little less upside for much more resilience.'] },
    ],
    figure: { title: 'Loan-to-value', source: 'Illustrative, data to be confirmed.', bars: [{ l: 'Heartwood target', v: 55, label: '≤55%' }, { l: 'Typical private fund', v: 70, label: '65–75%' }] },
    sources: ['CMHC MLI Select program guide', 'Heartwood analysis'] },
  { slug: 'nimble-fund', kind: 'White paper', no: '07', title: 'A nimble fund with no legacy assets', dek: 'A newer portfolio with no older assets to fix, so capital goes into new, efficient buildings.', date: 'October 2026', read: '8 pages', author: TB, img: R + 'HW_353-Sherbourne-St_2.png',
    keyPoints: ['No older buildings needing costly retrofits.', 'New capital goes to new projects, not repairs.', 'A smaller fund can move quickly on the right opportunity.'],
    sections: [
      { h: 'The legacy problem', p: ['Many established funds hold older buildings that need major capital work: new systems, envelopes and units. That spending competes with new investment.'] },
      { h: 'Starting clean', p: ['Our portfolio is new or newly built. Capital goes into buildings that meet today’s standards and tomorrow’s carbon rules.'] },
      { h: 'Room to move', p: ['A focused fund can act quickly when the right site or acquisition appears, without first fixing what it already owns.'] },
    ],
    figure: { title: 'Average building age', source: 'Illustrative, data to be confirmed.', bars: [{ l: 'Heartwood portfolio', v: 10, label: '< 3 yrs' }, { l: 'Typical Canadian rental stock', v: 100, label: '45+ yrs' }] },
    sources: ['CMHC Rental Market Report, 2025', 'Heartwood analysis'] },
]

export default HW_ARTICLES
