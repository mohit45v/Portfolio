import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PrimeApp from './PrimeApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeApp />
  </StrictMode>,
)
