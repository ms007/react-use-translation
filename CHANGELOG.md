# Changelog

## 2.0.0

### Breaking changes

- **New entry points.** The package now has an `exports` field and `"type": "module"`. The ES module build moved from `dist/index.es.js` to `dist/index.js`, the CommonJS build from `dist/index.js` to `dist/index.cjs`. Imports from `react-use-translation` keep working. Deep imports into `dist/` no longer resolve.
- **Modern JavaScript output.** The build no longer compiles down to ES5. It contains arrow functions, template literals and object spread. If you support browsers without ES2018, let your bundler transpile this package.
- **Only `react` as peer dependency.** `react-dom` was never imported and is no longer a peer dependency. The required React version is `>=16.8.0`.
- **`useUpdateTranslation` throws outside of a provider.** It used to return `undefined`, which failed later with `updateTranslations is not a function`. It now throws `useUpdateTranslation must be used within a TranslationsProvider`.
- **Translations that are not strings return the path.** A path pointing to an object or array used to return that value, and React threw while rendering it. Numbers were returned as numbers. All of these now return the path, just like a missing translation.
- **An empty string is a valid translation.** `''` used to fall back to the path. It now renders nothing.
- **Updates survive without a `translations` prop.** A `TranslationsProvider` without the prop used to discard translations set through `useUpdateTranslation` on every re-render. It now keeps them.
- **`TranslationsProvider` is a function component.** Code that relied on its class instance, for example through a `ref`, no longer works.
- **Node.js 18 or later** is required, up from Node.js 8.

### Added

- TypeScript type declarations. The package exports the types `Translations`, `TranslationValues`, `TranslateProps`, `TranslationsProviderProps` and `WithTranslationProps`.
- The README documents the `Translate` component, loading a language on demand and the `language` field.

### Changed

- The context value of `TranslationsProvider` is memoized. Components using translations only re-render when the translations change, not on every render of the provider.
