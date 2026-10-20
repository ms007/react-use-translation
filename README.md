🇨🇺🇵🇹🇳🇱🇳🇴🇲🇽🇸🇮🇺🇾🇹🇩

# react-use-translation

> Hooks enabled internationalization for react

[![NPM](https://img.shields.io/npm/v/react-use-translation.svg)](https://www.npmjs.com/package/react-use-translation)

## Installation

```bash
npm install react-use-translation
```

The package ships ES modules, CommonJS and TypeScript types, so it works with any bundler and with Node.js.

## Usage

Wrap your app in a `TranslationsProvider` and pass it the translations.

```jsx
import { createRoot } from 'react-dom/client'
import { TranslationsProvider } from 'react-use-translation'

import App from './App'

const translations = {
  country: '🇨🇭',
  common: {
    weekdays: {
      monday: 'Montag',
      tuesday: 'Dienstag'
    }
  }
}

createRoot(document.getElementById('root')).render(
  <TranslationsProvider translations={translations}>
    <App />
  </TranslationsProvider>
)
```

Inside the provider there are three ways to read a translation.

### With the hook

```jsx
import { useTranslation } from 'react-use-translation'

const Monday = () => {
  const monday = useTranslation('common.weekdays.monday')
  return <h1>{monday}</h1>
}
```

### With the component

`Translate` renders the translation as text. Props other than `path` are passed as [template values](#templating).

```jsx
import { Translate } from 'react-use-translation'

const Monday = () => (
  <h1>
    <Translate path="common.weekdays.monday" />
  </h1>
)

export default Monday
```

```jsx
import { createRoot } from 'react-dom/client'
import { TranslationsProvider } from 'react-use-translation'

import Monday from './Monday'

const translations = {
  country: '🇧🇷',
  common: {
    weekdays: {
      monday: 'segunda-feira',
      tuesday: 'terça-feira'
    }
  }
}

createRoot(document.getElementById('root')).render(
  <TranslationsProvider translations={translations}>
    <Monday />
  </TranslationsProvider>
)
```

### With the HOC

`withTranslation` passes a `translate` function as a prop, which is useful for class components.

```jsx
import { Component } from 'react'
import { withTranslation } from 'react-use-translation'

class Monday extends Component {
  render() {
    return <h1>{this.props.translate('common.weekdays.monday')}</h1>
  }
}

export default withTranslation(Monday)
```

In TypeScript, type the props with `WithTranslationProps`:

```tsx
import { withTranslation, type WithTranslationProps } from 'react-use-translation'

class Monday extends Component<WithTranslationProps> {
  // ...
}
```

## Organizing translations

You are free to organize the translations as you like, for example by feature, and nest them as deep as you want. Arrays work as well:

```js
const translations = {
  common: {
    weekdays: ['sunday', 'monday', 'tuesday', 'wednesday']
  }
}

useTranslation('common.weekdays[0]')
// sunday
```

If a path does not exist, the path itself is returned. A missing translation shows up as `common.weekdays.friday` in the UI instead of rendering nothing.

## Templating

Translations can contain placeholders. They look like placeholders in template literals, but the translation is a plain string in single or double quotes:

```js
const translations = {
  greeting: "Hello ${name}! You're looking ${adjective} today!"
}
```

Pass the values as second argument to `useTranslation` or to `translate` from the HOC. `Translate` takes them as props.

```jsx
useTranslation('greeting', { name: 'Melanie', adjective: 'awesome' })
// Hello Melanie! You're looking awesome today!

<Translate path="greeting" name="Melanie" adjective="awesome" />
```

Placeholders accept any JavaScript expression, just like in template literals. The values are in scope as variables.

```js
const translations = {
  inbox: "You have ${count} new message${count === 1 ? '' : 's'}",
  author: 'Written by ${user.name.toUpperCase()}'
}

useTranslation('inbox', { count: 3 })
// You have 3 new messages

useTranslation('author', { user: { name: 'Melanie' } })
// Written by MELANIE
```

`null` and `undefined` render as an empty string. Each translation is compiled once and then reused, so rendering the same translation again is cheap.

### Limitations

- A placeholder ends at the first `}`. Expressions containing a closing curly brace, such as object literals or arrow functions with a block body, do not work.
- A placeholder that cannot be evaluated, for example because a value is missing, stays in the output as is: `Hello ${name}`. The other placeholders still render. Outside of production builds, a warning appears in the console.
- A translation with invalid syntax, such as `${1 +}`, is returned unchanged.
- Names that exist as browser globals, such as `name` or `status`, never count as missing. A missing `name` resolves to `window.name`, usually an empty string.
- Only `${...}` is supported. The lodash delimiters `<%= %>`, `<%- %>` and `<% %>` stay as plain text.
- `Translate` uses the `path` prop itself, so a placeholder named `${path}` cannot get a value through `Translate`. Use `useTranslation` instead.

### Security

Placeholders are compiled into a function with `new Function` and run in the browser. Anyone who can edit your translations can run arbitrary JavaScript in your app. Only load translations from sources you trust, never from user input.

If your Content Security Policy does not allow `'unsafe-eval'`, the browser blocks templated translations. Translations without placeholders work under any policy.

## Update translations

There are two ways to change the translations at runtime. Either pass new translations to the `TranslationsProvider`, or call the function returned by `useUpdateTranslation` from any component inside the provider. Called outside of a `TranslationsProvider`, `useUpdateTranslation` throws an error.

The update replaces all translations, it does not merge them.

```jsx
import { useUpdateTranslation } from 'react-use-translation'

const translations = {
  language: 'german',
  common: {
    weekdays: {
      monday: 'Montag',
      tuesday: 'Dienstag'
    }
  }
}

const LanguageSwitch = () => {
  const updateTranslations = useUpdateTranslation()
  return <button onClick={() => updateTranslations(translations)}>Deutsch</button>
}

export default LanguageSwitch
```

```jsx
import { createRoot } from 'react-dom/client'
import { TranslationsProvider } from 'react-use-translation'

import LanguageSwitch from './LanguageSwitch'

const initialTranslations = {
  language: 'portuguese',
  common: {
    weekdays: {
      monday: 'segunda-feira',
      tuesday: 'terça-feira'
    }
  }
}

createRoot(document.getElementById('root')).render(
  <TranslationsProvider translations={initialTranslations}>
    <LanguageSwitch />
  </TranslationsProvider>
)
```

### Loading a language on demand

Keep each language in its own file and load it only when the user switches. Bundlers like Vite and webpack split every file matched by the dynamic `import()` into its own chunk.

```json
// translations/de.json
{
  "language": "german",
  "common": {
    "weekdays": {
      "monday": "Montag",
      "tuesday": "Dienstag"
    }
  }
}
```

```jsx
import { useState } from 'react'
import { useUpdateTranslation } from 'react-use-translation'

const LanguageSwitch = () => {
  const updateTranslations = useUpdateTranslation()
  const [loading, setLoading] = useState(false)

  const switchTo = async language => {
    setLoading(true)
    try {
      const { default: translations } = await import(`./translations/${language}.json`)
      updateTranslations(translations)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button disabled={loading} onClick={() => switchTo('de')}>
        Deutsch
      </button>
      <button disabled={loading} onClick={() => switchTo('pt')}>
        Português
      </button>
    </>
  )
}
```

### The `language` field

Add a `language` field to every translations object. The provider compares it with the previous `translations` prop:

- Same language: the provider keeps its current translations, including those set through `useUpdateTranslation`.
- Different language: the provider switches to the new prop.
- No `language` field: every new object counts as a different language. An inline object like `translations={{ ... }}` then undoes updates on each re-render of the parent.

## TypeScript

The package ships its own type declarations. Besides the components and hooks it exports these types:

- `Translations`: the translations object passed to `TranslationsProvider`
- `TranslationValues`: the values for placeholders
- `TranslateProps`: the props of `Translate`
- `TranslationsProviderProps`: the props of `TranslationsProvider`
- `WithTranslationProps`: the props `withTranslation` passes to the wrapped component

## License

with ❤ MIT © [ms007](https://github.com/ms007)
