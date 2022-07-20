const colors = require('vuetify/es5/util/colors').default

module.exports = {
  mode: 'spa',
  server: {
    port: 3000, // par défaut: 3000
    host: 'localhost' // par défaut: localhost
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Store NGTV',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href:'https://fonts.googleapis.com/css?family=Material+Icons'},
      { rel: "stylesheet", href:"https://use.fontawesome.com/releases/v5.0.13/css/all.css"}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/axios',
    '~/plugins/vuetify'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/moment',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast'
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
        dark: true,
        themes: {
        dark: {
            primary: colors.blue.darken2,
            accent: colors.grey.darken3,
            secondary: colors.amber.darken3,
            info: colors.teal.lighten1,
            warning: colors.amber.base,
            error: colors.deepOrange.accent4,
            success: colors.green.accent3,
            current: colors.orange.accent3
        }
        }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  auth: {
    //plugins: [ '~/plugins/auth.js' ],
    // Options
    strategies: {
      local: { 
        endpoints: {
          register:{url:'/auth/register',method:'post',propertyName: 'token' },
          login: { url: '/auth/login', method: 'post', propertyName: 'token' },
          user: { url: '/auth/me', method: 'get', propertyName: false },
          logout: false
        }
      }
    }
  },
  axios: {
    baseURL: '10.0.0.203:4000/api'
  },
  router: {
    middleware: ['auth']
  },
  toast: {
    position: 'bottom-right',
    duration: '1500'
  }
}
