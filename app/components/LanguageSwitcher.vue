<template>
   <DropdownMenu>
      <DropdownMenuTrigger as-child>
         <Button variant="ghost" size="icon">
            <Globe class="h-5 w-5" />
            <span class="sr-only">{{ t("switchLanguage") }}</span>
         </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
         <DropdownMenuLabel>{{ t("language") }}</DropdownMenuLabel>
         <DropdownMenuSeparator />
         <DropdownMenuItem v-for="item in renderLocale" :key="item.code" @click="changeLanguage(item.code)" class="cursor-pointer">
            {{ item.name }}
         </DropdownMenuItem>
      </DropdownMenuContent>
   </DropdownMenu>
</template>

<script setup lang="ts">
import { Globe } from "lucide-vue-next";

const { locale, locales } = useI18n();
const { t } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const router = useRouter();

const renderLocale = computed(() => locales.value.filter((item) => item.code !== locale.value));

const changeLanguage = (code) => router.push(switchLocalePath(code));
</script>

<i18n lang="json">
{
   "ru": {
      "switchLanguage": "Переключить язык",
      "language": "Язык"
   },
   "en": {
      "switchLanguage": "Switch language",
      "language": "Language"
   }
}
</i18n>
