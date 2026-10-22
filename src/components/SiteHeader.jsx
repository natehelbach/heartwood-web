import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { SECTIONS, SECTION_LANDING, LOGIN_URL, tagColor } from '../site/sitemap.js'
import { linkProps } from '../site/paths.js'

// Scroll distance over which the Home header collapses from the full-width
// wordmark to a compact bar.
const SHRINK_DISTANCE = 500

// Below this width the header swaps its menus for a Menu button and drawer.
const MOBILE_MAX = 900

function useScrollProgress(enabled) {
  const [k, setK] = useState(0)
  useEffect(() => {
    if (!enabled) return
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        setK(Math.min(1, Math.max(0, window.scrollY / SHRINK_DISTANCE)))
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [enabled])
  return enabled ? k : 0
}

function useIsMobile() {
  const [mob, setMob] = useState(false)
  useEffect(() => {
    const onResize = () => setMob(window.innerWidth < MOBILE_MAX)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return mob
}

// Touch devices open menus on tap only; hover would open and immediately navigate.
const canHover = () => typeof window === 'undefined' || !window.matchMedia?.('(hover: none)').matches

// Groups a section's items for the sub-nav: ungrouped items are direct links,
// grouped ones collapse into a dropdown named after the group.
function buildSubGroups(items, activeSub) {
  const out = []
  for (const it of items) {
    const active = it.r === activeSub
    if (!it.g) {
      out.push({ kind: 'link', label: it.label, tag: it.tag, r: it.r, active })
      continue
    }
    let g = out.find((o) => o.kind === 'group' && o.label === it.g)
    if (!g) {
      g = { kind: 'group', label: it.g, active: false, items: [] }
      out.push(g)
    }
    if (active) g.active = true
    g.items.push({ label: it.label, r: it.r, active })
  }
  return out
}

// `navSection` is the menu the route belongs to, which can differ from its first segment
// (Properties sits under Management). `activeSub` is the sub-nav item to underline.
function SiteHeader({ route, section, navSection, activeSub, go }) {
  const home = section === 'home'
  const k = useScrollProgress(home)
  const mob = useIsMobile()
  const [menu, setMenu] = useState(null)
  const [subMenu, setSubMenu] = useState(null)
  const [drawer, setDrawer] = useState(false)
  const [dOpen, setDOpen] = useState(null)
  const headerRef = useRef(null)

  // Close any open menu when the route changes.
  useEffect(() => {
    setMenu(null)
    setSubMenu(null)
    setDrawer(false)
  }, [route])

  useEffect(() => {
    if (!mob) setDrawer(false)
  }, [mob])

  // Lock page scroll behind the open drawer.
  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [drawer])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenu(null)
        setSubMenu(null)
        setDrawer(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Publish the header height so pages can offset content under the fixed Home header.
  useLayoutEffect(() => {
    const el = headerRef.current
    if (!el) return
    const publish = () => document.documentElement.style.setProperty('--nav-h', `${el.offsetHeight}px`)
    publish()
    const ro = new ResizeObserver(publish)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const cur = SECTIONS[navSection]
  const subGroups = cur?.items && !mob ? buildSubGroups(cur.items, activeSub) : []

  const closeMenus = () => {
    setMenu(null)
    setSubMenu(null)
    setDrawer(false)
  }
  // Menu items are real links: they open in a new tab, and Back returns to the page before.
  const link = (r) => linkProps(go, r, closeMenus)

  const bar = home
    ? mob
      ? {
          className: 'site-header site-header--home',
          padding: `${28 - 14 * k}px var(--gutter) ${40 - 26 * k}px`,
          logoWidth: `${74 - 34 * k}%`,
          border: drawer || k > 0.98 ? '1px solid rgba(33,33,33,.12)' : '0',
        }
      : {
          className: 'site-header site-header--home',
          padding: `${40 - 24 * k}px var(--gutter) ${88 - 72 * k}px`,
          logoWidth: `${100 - 84 * k}%`,
          navStyle: { opacity: k, pointerEvents: k > 0.5 ? 'auto' : 'none' },
        }
    : { className: `site-header site-header--inner${mob ? ' site-header--mobile' : ''}`, padding: '0 var(--gutter)' }

  // In the drawer, the current section starts expanded.
  const openKey = dOpen ?? (cur?.items ? navSection : null)

  return (
    <header
      ref={headerRef}
      className={bar.className}
      style={bar.border !== undefined ? { borderBottom: bar.border } : undefined}
      onMouseLeave={() => setMenu(null)}
    >
      <div style={{ padding: bar.padding }}>
        <div className="site-header__row">
          {home ? (
            <button
              type="button"
              className="site-header__wordmark"
              style={{ width: bar.logoWidth }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img src="/assets/website/Heartwood-Wordmark.svg" alt="Heartwood" />
            </button>
          ) : (
            <a className="site-header__logo" {...link('home')}>
              <img src="/assets/logos/Heartwood_Logo_Black.png" alt="Heartwood" />
            </a>
          )}

          {!mob && (
            <nav className="site-nav" aria-label="Main" style={bar.navStyle}>
              {Object.entries(SECTIONS).map(([key, m]) => {
                // The current section's items are already in the sub-nav, so its menu
                // doesn't drop down. Clicking a menu goes to its landing page.
                const current = navSection === key
                const drops = !!m.items && !current
                const open = menu === key && drops
                const landing = SECTION_LANDING[key]
                return (
                  <div
                    key={key}
                    className="site-nav__item"
                    onMouseEnter={() => canHover() && setMenu(drops ? key : null)}
                  >
                    <a
                      className={`site-nav__link${current ? ' is-current' : ''}`}
                      aria-expanded={drops ? open : undefined}
                      aria-haspopup={drops ? 'true' : undefined}
                      {...link(landing || (m.items ? m.items[0].r : m.r))}
                    >
                      {m.label}
                    </a>
                    {open && (
                      <div className="site-nav__menu">
                        {m.items.map((it, i) => (
                          <div key={it.r}>
                            {it.g && (i === 0 || m.items[i - 1].g !== it.g) && (
                              <span className="site-nav__group">{it.g}</span>
                            )}
                            <a className="site-nav__menu-link" {...link(it.r)}>
                              {it.label}
                              {it.tag && (
                                <span className="site-nav__tag" style={{ color: tagColor(it.tag) }}>
                                  {it.tag}
                                </span>
                              )}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
              <div className="site-nav__actions">
                <a className="btn btn--outline" {...link('investment/meeting')}>
                  Meet with us
                </a>
                <a className="btn btn--solid" href={LOGIN_URL} target="_blank" rel="noopener noreferrer">
                  Login<span aria-hidden="true">↗</span>
                </a>
              </div>
            </nav>
          )}

          {mob && (
            <button
              type="button"
              className="site-burger"
              aria-label={drawer ? 'Close menu' : 'Open menu'}
              aria-expanded={drawer}
              onClick={() => {
                setDrawer((d) => !d)
                setDOpen(null)
              }}
            >
              {drawer ? 'Close' : 'Menu'}
              <span className="site-burger__bars" aria-hidden="true">
                <span style={{ transform: drawer ? 'translateY(3.25px) rotate(45deg)' : 'none' }} />
                <span style={{ transform: drawer ? 'translateY(-3.25px) rotate(-45deg)' : 'none' }} />
              </span>
            </button>
          )}
        </div>
      </div>

      {mob && drawer && (
        <div className="site-drawer">
          {Object.entries(SECTIONS).map(([key, m]) => {
            const has = !!m.items
            const open = has && openKey === key
            return (
              <div key={key} className="site-drawer__section">
                <button
                  type="button"
                  className="site-drawer__head"
                  aria-expanded={has ? open : undefined}
                  onClick={has ? () => setDOpen(open ? '' : key) : link(m.r).onClick}
                >
                  {m.label}
                  <span style={{ color: navSection === key ? 'var(--hw-teal)' : 'var(--hw-black)' }}>
                    {has ? (open ? '−' : '+') : '→'}
                  </span>
                </button>
                {open && (
                  <div className="site-drawer__items">
                    {m.items.map((it, i) => (
                      <div key={it.r}>
                        {it.g && (i === 0 || m.items[i - 1].g !== it.g) && (
                          <span className="site-drawer__group">{it.g}</span>
                        )}
                        <a
                          className="site-drawer__link"
                          style={{ textDecoration: it.r === activeSub ? 'underline' : 'none' }}
                          aria-current={it.r === activeSub ? 'page' : undefined}
                          {...link(it.r)}
                        >
                          {it.label}
                          {it.tag && <span style={{ color: tagColor(it.tag), fontSize: 13 }}>{it.tag}</span>}
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
          <div className="site-drawer__actions">
            <a className="site-drawer__btn" {...link('investment/meeting')}>
              Meet with us
            </a>
            <a className="site-drawer__btn site-drawer__btn--solid" href={LOGIN_URL} target="_blank" rel="noopener noreferrer">
              Login<span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      )}

      {subGroups.length > 0 && (
        <div className="site-subnav">
          <span className="site-subnav__label">● {cur.label}</span>
          {subGroups.map((s) =>
            s.kind === 'link' ? (
              <a
                key={s.r}
                className={`site-subnav__link${s.active ? ' is-current' : ''}`}
                aria-current={s.active ? 'page' : undefined}
                {...link(s.r)}
              >
                {s.label}
                {s.tag && <span style={{ color: tagColor(s.tag) }}>{s.tag}</span>}
              </a>
            ) : (
              <div
                key={s.label}
                className="site-subnav__group"
                onMouseEnter={() => canHover() && setSubMenu(s.label)}
                onMouseLeave={() => setSubMenu(null)}
              >
                <button
                  type="button"
                  className={`site-subnav__link${s.active ? ' is-current' : ''}`}
                  aria-expanded={subMenu === s.label}
                  aria-haspopup="true"
                  onClick={() => setSubMenu((v) => (v === s.label ? null : s.label))}
                >
                  {s.label}
                  <span aria-hidden="true">{subMenu === s.label ? '▴' : '▾'}</span>
                </button>
                {subMenu === s.label && (
                  <div className="site-subnav__menu">
                    {s.items.map((x) => (
                      <a
                        key={x.r}
                        className={`site-subnav__menu-link${x.active ? ' is-current' : ''}`}
                        aria-current={x.active ? 'page' : undefined}
                        {...link(x.r)}
                      >
                        {x.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ),
          )}
        </div>
      )}
    </header>
  )
}

export default SiteHeader
