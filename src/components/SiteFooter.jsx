import { FOOTER_COLUMNS, LEGAL_LINKS, LINKEDIN_URL, ADDRESS } from '../site/sitemap.js'
import { linkProps } from '../site/paths.js'
import { DotField, HsForm } from '../design/ui.jsx'
import { HW_BRAND_ICONS } from '../design/hw-icons.js'

function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function SiteFooter({ go }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <div className="site-footer__cols">
          {FOOTER_COLUMNS.map((c) => (
            <div key={c.label} className="site-footer__col">
              <span className="site-footer__heading">{c.label}</span>
              {c.items.map(([label, r]) => (
                <a
                  key={label}
                  data-tap=""
                  className="site-footer__link"
                  aria-label={label === 'Overview' ? `${c.label} overview` : undefined}
                  {...linkProps(go, r)}
                >
                  {label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="site-footer__aside">
          <span className="site-footer__heading">The Long View Newsletter — monthly</span>
          <HsForm form="newsletter" />
          <div className="site-footer__contact">
            <span>{ADDRESS}</span>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" data-tap="" aria-label="Heartwood on LinkedIn">
              <LinkedInIcon />
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="site-footer__field">
        <div className="site-footer__dots">
          <DotField preset="icons" icons={HW_BRAND_ICONS.join('|')} iconSize=".6" interval="3600" color="#2697AA" />
        </div>
        <p className="site-footer__mark">
          Future
          <br />
          built.
        </p>
      </div>

      <div className="site-footer__logo">
        <img loading="lazy" decoding="async" src="/assets/logos/Heartwood_Logo_White.png" alt="Heartwood" />
      </div>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} Heartwood Investments</span>
        <div className="site-footer__legal">
          {LEGAL_LINKS.map(([label, r]) => (
            <a key={r} data-tap="" {...linkProps(go, r)}>
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default SiteFooter
