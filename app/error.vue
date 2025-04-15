<template>
   <Title>Error - {{ error.statusCode }}</Title>
   <section class="bg-background font-Inter container grid h-screen w-full items-center justify-center">
      <div class="container">
         <h1 class="font-Inter mb-5 text-center text-[110px]">
            {{ error.statusCode }}
         </h1>
         <p class="font-Inter mb-8 text-center text-lg opacity-70">
            {{ t("title") }}<br />
            {{ error.message }}
         </p>
         <NuxtLinkLocale
            class="border-input bg-background ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring mx-auto flex h-10 max-w-[350px] items-center justify-center rounded-md border px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
            to="/">
            {{ t("button") }}
         </NuxtLinkLocale>
      </div>
   </section>
</template>

<script setup>
const props = defineProps({
   error: { type: Object, required: true },
});

const { t } = useI18n();
</script>

<i18n lang="json">
{
   "ru": {
      "title": "Ой произошла ошибка",
      "button": "Вернуться на главную"
   },
   "en": {
      "title": "Oh, there was an error",
      "button": "Back to home"
   }
}
</i18n>
