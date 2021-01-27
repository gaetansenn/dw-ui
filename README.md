# dw-ui
Dewib ui is an open source ui library for developing HTML/CSS and JS websites. This package is developed with Vue.js and tailwindcss and to use with NuxtJS

## Install

The library overide default tailwind config so if you have already added `require('@tailwindcss/custom-forms')` plugin with tailwind please remove it.

dw-ui use nuxt-i18n and [onLanguagesSwitch](https://i18n.nuxtjs.org/callbacks/#onlanguageswitchedoldlocale-newlocale) to update current translation.
At the moment vue i18n allow only one method to be used with `onLanguagesSwitch` so please don't overide it.
