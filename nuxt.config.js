import pkg from './package'

export default {
  mode: 'spa',
  srcDir:'app',
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
    '~/assets/base.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  env: {
    APIKEY: process.env.APIKEY,
    AUTHDOMAIN: process.env.AUTHDOMAIN,
    DATABASEURL: process.env.DATABASEURL,
    PROJECTID: process.env.PROJECTID,
    STORAGEBUCKET: process.env.STORAGEBUCKET,
    MESSAGINGSENDERID: process.env.MESSAGINGSENDERID
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
