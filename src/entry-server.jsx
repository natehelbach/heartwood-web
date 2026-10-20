// Server entry for the build's pre-render (scripts/prerender.js): renders one page to HTML.
import { renderToString } from 'react-dom/server'
import App, { isNotFound } from './App.jsx'
import { routeFor } from './site/paths.js'
import { normalizeRoute } from './site/sitemap.js'
import { pageHead, headHtml } from './site/meta.js'
import { PAGE_ROUTES } from './site/routes.js'

export { PAGE_ROUTES }
export { pathFor } from './site/paths.js'

export function render(path) {
  const route = normalizeRoute(routeFor(path))
  return { html: renderToString(<App initialPath={path} />), head: headHtml(pageHead(route, isNotFound(route))) }
}
