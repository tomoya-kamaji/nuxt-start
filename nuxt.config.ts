// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@vueuse/nuxt"],

  ssr: false,

  runtimeConfig: {
    public: {
      liffId: process.env.NUXT_PUBLIC_LIFF_ID || "",
    },
  },

  vite: {
    server: {
      hmr: {
        port: 24678,
        host: "localhost",
      },
      allowedHosts: [".trycloudflare.com"],
    },
  },

  devServer: {
    host: "0.0.0.0",
  },

  nitro: {
    devServer: {
      watch: [],
    },
  },
});
