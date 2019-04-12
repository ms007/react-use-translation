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

## License

MIT © [ms007](https://github.com/ms007)
