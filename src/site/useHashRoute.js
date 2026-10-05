import { useCallback, useEffect, useState } from 'react'
import { normalizeRoute } from './sitemap.js'

function readHash() {
  try {
    const h = decodeURIComponent(window.location.hash.slice(1))
    return /^[a-z]/.test(h) ? h : 'home'
  } catch {
    return 'home'
  }
}

// The current route lives in the URL hash (#investment/growth), so links are
// shareable and the back button works.
export default function useHashRoute() {
  const [route, setRoute] = useState(readHash)

  useEffect(() => {
    const onHash = () => {
      setRoute(readHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const go = useCallback((r) => {
    if (r === 'home') {
      // Drop the hash entirely rather than leaving a bare "#".
      history.pushState(null, '', window.location.pathname + window.location.search)
      setRoute('home')
      window.scrollTo(0, 0)
      return
    }
    window.location.hash = r
  }, [])

  return [normalizeRoute(route), go]
}
