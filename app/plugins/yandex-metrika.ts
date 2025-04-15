interface YandexMetrikaOptions {
   id: number;
   debug?: boolean;
   autoTracking?: boolean;
}

export default defineNuxtPlugin((nuxtApp) => {
   const options = nuxtApp.$config.public.yandexMetrika as YandexMetrikaOptions | undefined;

   if (!options || !options.id) {
      console.warn("Yandex Metrika ID не указан");
      return;
   }

   const config = {
      debug: options.debug || false,
      autoTracking: options.autoTracking !== false,
      id: options.id,
   };

   const trackEvent = (eventName: string, params: Record<string, any> = {}) => {
      if (process.client) {
         if (config.debug) {
            console.log("Track event:", eventName, params);
         }

         if (window.ym) {
            window.ym(config.id, "reachGoal", eventName, params);
         }
      }
   };

   const trackPageView = (path?: string) => {
      if (process.client) {
         const currentPath = path || window.location.pathname;

         if (config.debug) {
            console.log("Page view:", currentPath);
         }

         trackEvent("page_view", { page: currentPath });

         if (window.ym) {
            window.ym(config.id, "hit", currentPath, {
               referer: document.referrer,
            });
         }
      }
   };

   const initYandexMetrika = () => {
      if (process.client) {
         const yandexScript = document.createElement("script");
         yandexScript.setAttribute("data-skip-moving", "true");
         yandexScript.innerHTML = `
        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(${config.id}, "init", {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true
        });
      `;
         document.head.appendChild(yandexScript);

         setTimeout(() => {
            trackPageView();
         }, 100);
      }
   };

   nuxtApp.hook("app:created", () => {
      initYandexMetrika();
   });

   if (config.autoTracking) {
      nuxtApp.hook("page:finish", () => {
         if (process.client) {
            trackPageView();
         }
      });
   }

   return {
      provide: {
         trackEvent,
         trackPageView,
      },
   };
});

declare global {
   interface Window {
      ym: (id: number, method: string, ...args: any[]) => void;
   }
}
