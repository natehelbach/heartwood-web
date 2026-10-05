import HW_ICONS from './hw-icons.js'

// Static dot icon, a React port of the design's <hw-dot-icon name color size>.
function DotIcon({ name, color = '#212121', size = 56, style }) {
  const rows = HW_ICONS[name] || []
  const n = Math.max(rows.length, rows[0] ? rows[0].length : 1)
  const dots = []
  rows.forEach((r, y) => {
    for (let x = 0; x < r.length; x++) if (r[x] === '#') dots.push(<circle key={`${x}-${y}`} cx={x + 0.5} cy={y + 0.5} r={0.4} />)
  })
  return (
    <span style={{ display: 'block', width: size, height: size, ...style }}>
      <svg viewBox={`0 0 ${n} ${n}`} width={size} height={size} fill={color} role="img" aria-label={(name || '').toLowerCase()}>
        <g transform={`translate(${(n - (rows[0] || '').length) / 2},${(n - rows.length) / 2})`}>{dots}</g>
      </svg>
    </span>
  )
}

export default DotIcon
