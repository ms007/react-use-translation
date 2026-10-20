import { useState } from 'react'
import { useTranslation, useUpdateTranslation } from 'react-use-translation'

const languages = [
  { code: 'de', label: 'Deutsch' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
]

function LanguageSwitch() {
  const current = useTranslation('language')
  const label = useTranslation('languageSwitch.label')
  const loadingText = useTranslation('languageSwitch.loading')
  const updateTranslations = useUpdateTranslation()
  const [loading, setLoading] = useState(false)

  // Vite puts each language file into its own chunk and loads it on demand
  const switchTo = async (code: string) => {
    setLoading(true)
    try {
      const { default: translations } = await import(`../translations/${code}.json`)
      updateTranslations(translations)
    } finally {
      setLoading(false)
    }
  }

  return (
    <nav className="language-switch" aria-label={label}>
      {languages.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          lang={code}
          aria-pressed={current === code}
          disabled={loading}
          onClick={() => switchTo(code)}
        >
          {label}
        </button>
      ))}
      {loading && <span role="status">{loadingText}</span>}
    </nav>
  )
}

export default LanguageSwitch
