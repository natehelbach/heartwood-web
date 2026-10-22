import { useEffect, useState } from 'react'

// Helpers that let the design's markup be ported almost verbatim.
//
// sx('padding:16px;color:var(--hw-black)') turns a CSS declaration string, exactly as written
// in the .dc.html source, into a React style object. Results are cached per string.
const cache = new Map()

export function sx(css) {
  if (!css) return undefined
  let out = cache.get(css)
  if (out) return out
  out = {}
  let depth = 0
  let start = 0
  const decls = []
  for (let i = 0; i < css.length; i++) {
    const ch = css[i]
    if (ch === '(') depth++
    else if (ch === ')') depth--
    else if (ch === ';' && depth === 0) {
      decls.push(css.slice(start, i))
      start = i + 1
    }
  }
  decls.push(css.slice(start))
  for (const d of decls) {
    const i = d.indexOf(':')
    if (i < 0) continue
    const prop = d.slice(0, i).trim()
    const value = d.slice(i + 1).trim()
    if (!prop) continue
    const key = prop.startsWith('--') ? prop : prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    out[key] = value
  }
  cache.set(css, out)
  return out
}

// <Hv as="button" s="base css" h="hover css" …> — an element with the design's style-hover
// behaviour: the hover declarations layer over the base style while the pointer is over it.
export function Hv({ as: Tag = 'div', s, h, onMouseEnter, onMouseLeave, onFocus, onBlur, ...rest }) {
  const [on, setOn] = useState(false)
  const style = on && h ? { ...sx(s), ...sx(h) } : sx(s)
  return (
    <Tag
      {...rest}
      style={style}
      onMouseEnter={(e) => {
        setOn(true)
        onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        setOn(false)
        onMouseLeave?.(e)
      }}
      onFocus={(e) => {
        if (h && e.target.matches?.(':focus-visible')) setOn(true)
        onFocus?.(e)
      }}
      onBlur={(e) => {
        setOn(false)
        onBlur?.(e)
      }}
    />
  )
}

// <DotField preset="icons" icons="A|B" iconSize=".6" interval={3900} color="#BC532D" />
// wraps the design's <hw-dotfield> custom element (registered in hw-dotfield.js).
export function DotField({ preset, icons, iconSize, interval, color, style }) {
  return (
    <hw-dotfield
      preset={preset}
      icons={icons}
      icon-size={iconSize}
      interval={interval}
      color={color}
      style={style || { position: 'absolute', inset: 0 }}
    />
  )
}

// The terracotta section rule the design draws as a 1.5px background line across the top.
export const RULE_BG =
  'linear-gradient(var(--hw-terracotta),var(--hw-terracotta)) no-repeat top center/calc(100% - 2 * clamp(20px,3vw,40px)) 1.5px'

// HubSpot portal and the design's embedded form IDs (ui_kits/website, Oct 22).
export const HS_PORTAL = '343688725'
export const HS_FORMS = {
  newsletter: 'da801a25-5c50-4ddf-96c6-75e365397071',
  contact: '1f581465-19ec-4534-917a-f6f37a117d55',
  meeting: 'd895b98a-cec2-4ded-b3ed-c705de75becd',
  podcast: 'ba426d0d-5cb2-4057-8ec5-fd40a0679dd4',
}

// Port of the design's hsLoad(): once new empty .hs-form-frame divs are on the page, re-add
// HubSpot's embed script so it scans for them (it only scans when it loads).
function hsLoad() {
  clearTimeout(window.__hwHsT)
  window.__hwHsT = setTimeout(() => {
    const fr = [...document.querySelectorAll('.hs-form-frame')].filter((el) => !el.childElementCount && !el.dataset.hwHs)
    if (!fr.length) return
    fr.forEach((el) => (el.dataset.hwHs = '1'))
    const id = 'hs-embed-' + HS_PORTAL
    document.getElementById(id)?.remove()
    const sc = document.createElement('script')
    sc.id = id
    sc.src = `https://js-na3.hsforms.net/forms/embed/${HS_PORTAL}.js`
    sc.defer = true
    document.body.appendChild(sc)
  }, 150)
}

// A live HubSpot form embed, as the design's <div class="hs-form-frame" …>.
export function HsForm({ form }) {
  useEffect(hsLoad, [form])
  return (
    <div
      key={form}
      className="hs-form-frame"
      data-region="na3"
      data-form-id={HS_FORMS[form]}
      data-portal-id={HS_PORTAL}
      style={{ minHeight: 60, minWidth: 0 }}
    />
  )
}

// The dashed "HubSpot form needed" note the design places beside every placeholder form.
export function HubspotNote({ label, style }) {
  return (
    <span
      data-hubspot-needed={label}
      style={{
        alignSelf: 'flex-start',
        display: 'inline-flex',
        gap: 6,
        padding: '5px 9px',
        border: '1.5px dashed currentColor',
        fontFamily: 'var(--font-subhead)',
        fontWeight: 500,
        fontSize: 12,
        letterSpacing: '.04em',
        textTransform: 'uppercase',
        lineHeight: 1.2,
        ...style,
      }}
    >
      HubSpot form needed · {label}
    </span>
  )
}
