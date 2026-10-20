import { useEffect } from 'react'
import { useTranslation } from 'react-use-translation'
import LanguageSwitch from './components/LanguageSwitch.tsx'
import Greeting from './components/Greeting.tsx'
import Inbox from './components/Inbox.tsx'
import Weekdays from './components/Weekdays.tsx'
import Footer from './components/Footer.tsx'

function App() {
  const language = useTranslation('language')
  const title = useTranslation('app.title')
  const intro = useTranslation('app.intro')

  // Keep <html lang> in sync so screen readers pick the right voice
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return (
    <main>
      <header>
        <h1>{title}</h1>
        <p>{intro}</p>
        <LanguageSwitch />
      </header>
      <Greeting user="Melanie" />
      <Inbox />
      <Weekdays />
      <Footer />
    </main>
  )
}

export default App
