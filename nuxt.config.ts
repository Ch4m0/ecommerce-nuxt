export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
  ],

  components: [
    { path: '~/components', pathPrefix: false },
    { path: '~/pages/products/_components', pathPrefix: false },
    { path: '~/pages/orders/_components', pathPrefix: false },
  ],

  imports: {
    dirs: [
      'composables',
      'stores',
      'constants',
      'pages/products/_composables',
      'pages/orders/_composables',
    ],
  },

  pages: {
    pattern: '**/*.vue',
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL,
    },
  },

  typescript: {
    strict: true,
  },
})
