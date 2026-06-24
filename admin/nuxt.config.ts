export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1',
      portfolioUrl: process.env.NUXT_PUBLIC_PORTFOLIO_URL || 'http://localhost:5173',
    },
  },
  app: {
    head: {
      title: 'CV Admin Panel',
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    },
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },
})
