import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/site.css'
// The design's custom elements: <hw-dotfield>, <hw-dots>, <hw-intel-flow>, <hw-hubspot-form>.
import './design/hw-dotfield.js'
import './design/hw-dots.js'
import './design/hw-intel-flow.js'
import './design/hw-hubspot-form.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(<App />)
