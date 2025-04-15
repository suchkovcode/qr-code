<template>
   <div class="flex items-center justify-center p-5">
      <NuxtLinkLocale to="/" class="flex items-center gap-2 font-bold">
         <QrCode class="text-primary h-6 w-6" />
         <span>FindMyStuff QR</span>
      </NuxtLinkLocale>
   </div>
   <main>
      <slot />
   </main>
</template>

<script setup lang="ts">
import { QrCode } from "lucide-vue-next";
</script>
