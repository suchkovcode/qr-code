<template>
   <header class="border-b">
      <div class="container flex h-16 items-center justify-between">
         <div class="flex items-center gap-6">
            <NuxtLinkLocale to="/" class="flex items-center gap-2 font-bold">
               <QrCode class="text-primary h-6 w-6" />
               <span>FindMyStuff QR</span>
            </NuxtLinkLocale>
            <nav class="hidden md:flex">
               <ul class="flex items-center gap-6">
                  <li>
                     <NuxtLinkLocale to="/how-it-works" class="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
                        {{ t("howItWorks") }}
                     </NuxtLinkLocale>
                  </li>
                  <li>
                     <NuxtLinkLocale to="/create" class="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors">
                        {{ t("createQR") }}
                     </NuxtLinkLocale>
                  </li>
               </ul>
            </nav>
         </div>
         <div class="flex items-center gap-4">
            <LanguageSwitcher />
            <UserMenu v-if="user" :user="user" />
            <div v-else class="hidden md:flex md:gap-2">
               <NuxtLinkLocale to="/login">
                  <Button variant="ghost" size="sm">{{ t("login") }}</Button>
               </NuxtLinkLocale>
               <NuxtLinkLocale to="/register">
                  <Button size="sm">{{ t("register") }}</Button>
               </NuxtLinkLocale>
            </div>
            <Sheet>
               <SheetTrigger asChild>
                  <Button variant="outline" size="icon" class="md:hidden">
                     <Menu class="h-5 w-5" />
                     <span class="sr-only">Toggle menu</span>
                  </Button>
               </SheetTrigger>
               <SheetContent side="right">
                  <SheetHeader>
                     <SheetTitle>FindMyStuff QR</SheetTitle>
                  </SheetHeader>
                  <nav class="p-8">
                     <ul class="flex flex-col gap-4">
                        <li>
                           <NuxtLinkLocale to="/how-it-works" class="text-sm font-medium">
                              {{ t("howItWorks") }}
                           </NuxtLinkLocale>
                        </li>
                        <li>
                           <NuxtLinkLocale to="/create" class="text-sm font-medium">
                              {{ t("createQR") }}
                           </NuxtLinkLocale>
                        </li>
                        <li v-if="!user">
                           <NuxtLinkLocale to="/login" class="text-sm font-medium">
                              {{ t("login") }}
                           </NuxtLinkLocale>
                        </li>
                        <li v-if="!user">
                           <NuxtLinkLocale to="/register" class="text-sm font-medium">
                              {{ t("register") }}
                           </NuxtLinkLocale>
                        </li>
                        <li v-if="user">
                           <NuxtLinkLocale to="/dashboard" class="text-sm font-medium">
                              {{ t("dashboard") }}
                           </NuxtLinkLocale>
                        </li>
                        <li v-if="user">
                           <button @click="signOut" class="text-destructive text-sm font-medium">
                              {{ t("logout") }}
                           </button>
                        </li>
                     </ul>
                  </nav>
               </SheetContent>
            </Sheet>
         </div>
      </div>
   </header>
</template>

<script setup lang="ts">
import { QrCode, Menu } from "lucide-vue-next";

const { signOut } = useSignOut();
const user = useCookie("token");
const { t } = useI18n();
</script>

<i18n lang="json">
{
   "ru": {
      "howItWorks": "Как это работает",
      "login": "Вход",
      "register": "Регистрация",
      "dashboard": "Панель управления",
      "createQR": "Создать QR",
      "account": "Аккаунт",
      "logout": "Выход"
   },
   "en": {
      "howItWorks": "How It Works",
      "login": "Login",
      "register": "Register",
      "dashboard": "Dashboard",
      "createQR": "Create QR",
      "account": "Account",
      "logout": "Logout"
   }
}
</i18n>
