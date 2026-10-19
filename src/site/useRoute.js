import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { normalizeRoute } from './sitemap.js'
import { pathFor, routeFor } from './paths.js'

// Old links carried the route in the hash (/#investment/growth). Move them to the real path.
function readLocation() {
  const h = window.location.hash.slice(1)
  if (/^[a-z]/.test(h)) {
    let r = h
    try {
      r = decodeURIComponent(h)
    } catch {
      // Use the raw hash.
    }
    history.replaceState(history.state, '', pathFor(normalizeRoute(r)) + window.location.search)
  }
  return routeFor(window.location.pathname)
}

const saveScroll = () => history.replaceState({ ...history.state, scrollY: window.scrollY }, '')

// The current route lives in the URL path (/investors/growth-trust). Each navigation pushes a
// history entry, so Back and Forward work and return to where the reader was on the page.
export default function useRoute() {
  const [route, setRoute] = useState(readLocation)
  const [scrollTo, setScrollTo] = useState(null)

  useEffect(() => {
    history.scrollRestoration = 'manual'
    const onPop = () => {
      setRoute(routeFor(window.location.pathname))
      setScrollTo(history.state?.scrollY ?? 0)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  // Scroll after the new page has rendered; a second pass catches content that grows on load.
  useLayoutEffect(() => {
    if (scrollTo === null) return
    window.scrollTo(0, scrollTo)
    const raf = requestAnimationFrame(() => window.scrollTo(0, scrollTo))
    return () => cancelAnimationFrame(raf)
  }, [scrollTo, route])

  const go = useCallback((r) => {
    const path = pathFor(normalizeRoute(r))
    if (path === window.location.pathname) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    saveScroll()
    history.pushState({ scrollY: 0 }, '', path)
    setRoute(routeFor(path))
    setScrollTo(0)
  }, [])

  return [normalizeRoute(route), go]
}
