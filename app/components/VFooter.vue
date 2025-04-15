<template>
   <footer class="border-t py-6 md:py-10">
      <div class="container">
         <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
               <div class="flex items-center gap-2 font-bold">
                  <QrCode class="text-primary h-5 w-5" />
                  <span>FindMyStuff QR</span>
               </div>
               <p class="text-muted-foreground mt-2 text-sm">
                  {{ t("copyright") }}
               </p>
            </div>
            <div>
               <h3 class="mb-3 text-sm font-medium">{{ t("company") }}</h3>
               <ul class="space-y-2 text-sm">
                  <li>
                     <NuxtLinkLocale to="/about" class="text-muted-foreground hover:text-foreground transition-colors">
                        {{ t("about") }}
                     </NuxtLinkLocale>
                  </li>
                  <li>
                     <NuxtLinkLocale to="/contact" class="text-muted-foreground hover:text-foreground transition-colors">
                        {{ t("contact") }}
                     </NuxtLinkLocale>
                  </li>
               </ul>
            </div>
            <div>
               <h3 class="mb-3 text-sm font-medium">{{ t("legal") }}</h3>
               <ul class="space-y-2 text-sm">
                  <li>
                     <NuxtLinkLocale to="/" class="text-muted-foreground hover:text-foreground transition-colors">
                        {{ t("terms") }}
                     </NuxtLinkLocale>
                  </li>
                  <li>
                     <NuxtLinkLocale to="/" class="text-muted-foreground hover:text-foreground transition-colors">
                        {{ t("privacy") }}
                     </NuxtLinkLocale>
                  </li>
               </ul>
            </div>
            <LanguageSwitcher />
         </div>
      </div>
   </footer>
</template>

<script setup lang="ts">
import { QrCode } from "lucide-vue-next";

const { t } = useI18n();
</script>

<i18n lang="json">
{
   "ru": {
      "company": "Компания",
      "about": "О нас",
      "contact": "Контакты",
      "careers": "Карьера",
      "legal": "Юридическая информация",
      "terms": "Условия использования",
      "privacy": "Политика конфиденциальности",
      "copyright": "© 2025 FindMyStuff QR. Все права защищены."
   },
   "en": {
      "company": "Company",
      "about": "About Us",
      "contact": "Contact",
      "careers": "Careers",
      "legal": "Legal",
      "terms": "Terms of Service",
      "privacy": "Privacy Policy",
      "copyright": "© 2025 FindMyStuff QR. All rights reserved."
   }
}
</i18n>
