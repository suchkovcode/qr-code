<template>
   <Html class="font-Inter overflow-x-hidden" :lang="i18n.htmlAttrs.lang" dir="ltr">
      <Head>
         <Meta charset="utf-8" />
         <Meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
         <Meta http-equiv="x-ua-compatible" content="IE=edge" />
         <Meta name="apple-mobile-web-app-title" content="FindMyStuff QR" />
         <Meta name="mobile-web-app-capable" content="yes" />
         <Meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
         <Meta name="robots" content="noindex, nofollow" />
         <Link rel="image/x-icon" type="image/png" href="/static/favicon.ico" />
         <Link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
         <Link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
         <Link rel="apple-touch-icon" type="image/png" sizes="180x180" href="/static/apple-touch-icon.png" />
         <Link rel="manifest" href="/static/site.webmanifest" />
      </Head>
      <Body class="bg-background text-foreground overflow-x-hidden">
         <NuxtLayout>
            <NuxtPage />
         </NuxtLayout>
         <Toaster />
      </Body>
   </Html>
</template>

<script setup lang="ts">
const i18n = useLocaleHead();
</script>
