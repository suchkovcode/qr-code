const isDev = process.env.NODE_ENV !== "production";
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
   builder: "vite",
   telemetry: false,
   ssr: true,

   runtimeConfig: {
      public: {
         apiBase: process.env.API_BASE || "/api",
         yandexMetrika: {
            id: 12345678,
            debug: process.env.NODE_ENV !== "production",
            autoTracking: true,
         },
      },
   },

   app: {
      rootId: "root",
      rootTag: "div",
      buildAssetsDir: isDev ? "/_nuxt/" : "assets/",

      pageTransition: {
         name: "page",
         mode: "out-in",
      },
   },

   devtools: { enabled: false },
   devServer: { port: 8080 },

   features: {
      inlineStyles: false,
      noScripts: false,
   },

   future: {
      compatibilityVersion: 4,
   },

   components: [
      {
         path: "~/components",
         pathPrefix: false,
      },
   ],

   nitro: {
      preset: "node-server",

      prerender: {
         autoSubfolderIndex: false,
      },

      imports: {
         dirs: ["server/utils"],
      },

      minify: false,
   },

   vite: {
      plugins: [tailwindcss()],
   },

   i18n: {
      baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
      strategy: "prefix_except_default",
      defaultLocale: "ru",
      detectBrowserLanguage: {
         alwaysRedirect: false,
         fallbackLocale: "ru",
         redirectOn: "root",
         useCookie: true,
         cookieCrossOrigin: true,
         cookieDomain: "/",
         cookieKey: "i18n_redirected",
         cookieSecure: true,
      },
      compilation: {
         strictMessage: false,
         escapeHtml: false,
      },
      bundle: {
         compositionOnly: true,
         runtimeOnly: false,
         fullInstall: false,
         dropMessageCompiler: true,
         optimizeTranslationDirective: false,
      },
      locales: [
         { code: "ru", name: "Русский", language: "ru-RU", dir: "ltr" },
         { code: "en", name: "English", language: "en-US", dir: "ltr" },
      ],
   },

   shadcn: {
      prefix: "",
      componentDir: "./app/components/ui",
   },

   colorMode: {
      classSuffix: "",
   },

   css: ["./app/styles/app.css"],
   modules: ["@nuxtjs/i18n", "@nuxtjs/color-mode", "shadcn-nuxt"],
   compatibilityDate: "2025-04-14",
});
