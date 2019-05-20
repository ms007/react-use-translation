🇨🇺🇵🇹🇳🇱🇳🇴🇲🇽🇸🇮🇺🇾🇹🇩

# react-use-translation

> Hooks enabled internationalization for react

[![NPM](https://img.shields.io/npm/v/react-use-translation.svg)](https://www.npmjs.com/package/react-use-translation) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Installation

react-use-translation requires **React 16.8.4 or later.**

```bash
$ npm install --save react-use-translation
```

or

```bash
$ yarn add react-use-translation
```

This assumes that you’re using [npm](http://npmjs.com/) package manager
with a module bundler like [Webpack](https://webpack.js.org/) or
[Browserify](http://browserify.org/) to consume [CommonJS
modules](https://webpack.js.org/api/module-methods/#commonjs).

# Usage

### **With hooks**

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { TranslationsProvider, useTranslation } from 'react-use-translation';

const translations = {
  country: '🇨🇭',
  common: {
    weekdays: {
      monday: 'Montag',
      tuesday: 'Dienstag'
    }
  }
};

const MyComponent = () => {
  const monday = useTranslation('common.weekdays.monday');
  return <h1> {monday} </h1>;
};

ReactDOM.render(
  <TranslationsProvider translations={translations}>
    <MyComponent />
  </TranslationsProvider>,
  document.getElementById('root')
);
```

### **With HOC**

```jsx
import React, { Component } from 'react';
import { withTranslation } from 'react-use-translation';

class MyComponent extends Component {
  render() {
    const { translate } = this.props;
    const monday = translate('common.weekdays.monday');
    return <h1>{monday}</h1>;
  }
}

export default withTranslation(MyComponent);
```

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { TranslationsProvider } from 'react-use-translation';

import MyComponent from './MyComponent';

const translations = {
  country: '🇧🇷',
  common: {
    weekdays: {
      monday: 'segunda-feira',
      tuesday: 'terça-feira'
    }
  }
};

ReactDOM.render(
  <TranslationsProvider translations={translations}>
    <MyComponent />
  </TranslationsProvider>,
  document.getElementById('root')
);
```

## Translations object organization

You are free to choose how you want to organize the translations.
One possibility is the separation into features. You can nest the content as deep as you want.

Arrays are possible as well.

```js
const translations = {
  common: {
    weekdays: ['sunday', 'monday', 'tuesday', 'wednesday']
  }
};
```

```js
const firstDayOfWeek = useTranslation('common.weekdays[0]');
```

## Templating

You can use placeholders within translations. They work and look exactly the same as placeholders in ES 6 template strings with the only difference that translations are enclosed by double or single quotes instead of the back-tick (``) used by ES 6 template strings.

A translation string could thus be written as follows:

```js
const translations = {
  greeting: "Hello ${name}! You're looking ${adjective} today!"
};
```

Pass the values as second parameter to the useTranslation hook:

```js
const values = {
  name: 'Melanie',
  adjective: 'awesome'
};

const greeting = useTranslation('greeting', values);

// Hello Melanie! You're looking awesome today!
```

## Update translations

You can either perform the update in a controlled way by passing the new translations to the `TranslationsProvider`, or by using the builtin hook `useUpdateTranslation`, which can be used in any functional component down in the deeply nested tree of the child components of `TranslationsProvider`.

In the following example the hook is used

```jsx
import React from 'react';
import { useUpdateTranslation } from 'react-use-translation';

const translations = {
  language: 'german',
  common: {
    weekdays: {
      monday: 'Montag',
      tuesday: 'Dienstag'
    }
  }
};

const LanguageSwitch = () => {
  const switchLanguage = useUpdateTranslation();
  const onClick = () => switchLanguage(translations);
  return <button onClick={onClick}>Switch language</button>;
};

export default LanguageSwitch;
```

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { TranslationsProvider } from 'react-use-translation';

import LanguageSwitch from './LanguageSwitch';

const initialTranslations = {
  language: 'portuguese',
  common: {
    weekdays: {
      monday: 'segunda-feira',
      tuesday: 'terça-feira'
    }
  }
};

ReactDOM.render(
  <TranslationsProvider translations={initialTranslations}>
    <LanguageSwitch />
  </TranslationsProvider>,
  document.getElementById('root')
);
```

By default the `TranslationsProvider` stores a copy of the previous translations to determine if the internal state needs to be updated when new props are passed to it.

To minimize memory consumption, add a property with the name `language` to the translations. Then, during an update, this property is used to compare whether the derived state needs to be updated.

Have a look at the code example above for how to set the language.

## Note

react-use-translation comes with a peer dependency of `get`, `curry` and `template` from `lodash`. The minimum required version is 3.7.

We want to keep the bundle size low by excluding these dependencies. This also avoids bundling duplicate dependencies as you probably have lodash in your node_modules anyway.

## License

with ❤ MIT © [ms007](https://github.com/ms007)
