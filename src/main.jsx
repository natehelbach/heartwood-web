import { createRoot, hydrateRoot } from 'react-dom/client'
import { inject } from '@vercel/analytics'
import './styles/tokens.css'
import './styles/site.css'
import App from './App.jsx'

const loadElements = () => import('./design/elements.js')

// Vercel Web Analytics; also counts the client-side page changes made through history.pushState.
inject()

// Built pages arrive pre-rendered (scripts/prerender.js); the dev server sends an empty root.
const root = document.getElementById('root')
if (root.hasChildNodes()) hydrateRoot(root, <App onReady={loadElements} />)
else createRoot(root).render(<App onReady={loadElements} />)
