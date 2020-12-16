/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
/* eslint-disable quote-props */

module.exports = {
  theme: {
    extend: {
      spacing: {
        full: '100%'
      }
    }
  },
  variants: {
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
    cursor: ['responsive', 'disabled']
  },
  plugins: [
    require('@tailwindcss/custom-forms')
  ]
}
