# dw-ui
Dewib ui is an open source ui library for developing HTML/CSS and JS websites. This package is developed with Vue.js and tailwindcss and to use with NuxtJS

Get started with the [documentation](https://xhr-cache.dewib.com)

## Requirement
Dewib ui provide @nuxtjs/tailwindcss by default so please remove it or use v4 version

## Setup
```sh
yarn add @dewib/dw-ui # yarn
npm i @dewib/dw-ui # npm
```

Edit `nuxt.config.js`

```js
modules: [
  '@dewib/dw-ui'
]
```

dw-ui using tailwindcss-forms plugin as recommanded by tailwindui
If you want to overide default https://github.com/tailwindlabs/tailwindcss-forms config please overide the plugin
An exemple is provided in `storybook/plugins/custom.form.js`

```js
import forms from 'path/to/custom'

modules: [
  ['@dewib/dw-ui', {
    forms
  }]
]
```

## Theme
Dewib ui allows you to customize the default theme https://github.com/gaetansenn/dw-ui/blob/master/lib/utils/config.js
To do so create this path `dewib/config.js` to the root of your project

```js
export default {
  ui: {
    Button: {
      variants: {
        'yellow-600': 'bg-yellow-600 hover:opacity-75 text-white border-yellow-600',
        'red-50': 'bg-red-50 hover:opacity-75 text-red-600 border-red-50',
      },
      size: (props) => {
        return ({
          sm: 'px-3 py-1 text-sm leading-4',
          md: 'px-3 py-2 text-sm leading-4',
          lg: 'px-3 py-3 text-sm leading-4'
        })[props.size]
      }
    },
  }
}
```
