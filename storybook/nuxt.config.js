import module from '..'
import customForm from './plugins/custom-form'

export default {
  components: true,
  buildModules: [[module, {
    forms: customForm
  }], '@nuxtjs/tailwindcss'],
  env: {
    storybook: true
  },
  modules: [
    'nuxt-i18n'
  ],
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {},
        fr: {}
      }
    }
  },
  build: {
    babel: {
      // Prevents looping in console while building
      // https://github.com/nuxt/nuxt.js/issues/9224#issuecomment-893263501
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }], ['@babel/plugin-proposal-private-property-in-object', { loose: true }]]
    }
  }
}
