// Writes a real HTML page for every route after `vite build`: the page body rendered by React,
// and its own title, description, canonical link, Open Graph tags and structured data.
// Pages are written as dist/<path>.html; vercel.json's cleanUrls serves them at /<path>.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const { render, PAGE_ROUTES, pathFor } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href)
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')

function page(urlPath) {
  const { html, head } = render(urlPath)
  return template.replace('<!--head-->', head).replace('<div id="root"></div>', `<div id="root">${html}</div>`)
}

const written = new Set()
for (const route of PAGE_ROUTES) {
  const urlPath = pathFor(route)
  const file = urlPath === '/' ? 'index.html' : urlPath.slice(1) + '.html'
  if (written.has(file)) continue
  written.add(file)
  fs.mkdirSync(path.dirname(path.join(dist, file)), { recursive: true })
  fs.writeFileSync(path.join(dist, file), page(urlPath))
}
// Served by Vercel, with a 404 status, for any path without a page.
fs.writeFileSync(path.join(dist, '404.html'), page('/page-not-found'))
fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true })
console.log(`Pre-rendered ${written.size} pages and 404.html`)
