import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TranslationsProvider } from 'react-use-translation'
import './index.css'
import App from './App.tsx'
import de from './translations/de.json'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TranslationsProvider translations={de}>
      <App />
    </TranslationsProvider>
  </StrictMode>,
)
