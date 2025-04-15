<template>
   <section class="container flex h-screen w-screen flex-col items-center justify-center">
      <div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
         <div class="flex flex-col space-y-2 text-center">
            <h1 class="text-2xl font-semibold tracking-tight">{{ t("title") }}</h1>
            <p class="text-muted-foreground text-sm">
               {{ t("description") }}
            </p>
         </div>
         <Card>
            <CardContent class="grid gap-6">
               <form class="space-y-4" @submit.prevent="handleSubmit">
                  <div class="space-y-2">
                     <Label for="email">{{ t("emailLabel") }}</Label>
                     <Input id="email" v-model="form.email" type="email" :placeholder="t('emailPlaceholder')" required autocomplete="email" />
                  </div>
                  <div class="space-y-2">
                     <div class="flex items-center justify-between">
                        <Label for="password">{{ t("passwordLabel") }}</Label>
                        <NuxtLinkLocale to="/" class="text-muted-foreground hover:text-primary text-xs">
                           {{ t("forgotPassword") }}
                        </NuxtLinkLocale>
                     </div>
                     <Input
                        id="password"
                        v-model="form.password"
                        type="password"
                        :placeholder="t('passwordPlaceholder')"
                        required
                        autocomplete="current-password" />
                  </div>
                  <Button type="submit" class="w-full" :disabled="isLoading">
                     <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                     {{ t("signIn") }}
                  </Button>
               </form>
               <div class="relative">
                  <div class="absolute inset-0 flex items-center">
                     <span class="w-full border-t"></span>
                  </div>
                  <div class="relative flex justify-center text-xs uppercase">
                     <span class="bg-background text-muted-foreground px-2">
                        {{ t("orContinueWith") }}
                     </span>
                  </div>
               </div>
               <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Button variant="outline" type="button" @click="socialLogin('google')">
                     <span class="sr-only">Google</span>
                     Google
                  </Button>
                  <Button variant="outline" type="button" @click="socialLogin('facebook')">
                     <span class="sr-only">Facebook</span>
                     Facebook
                  </Button>
               </div>
            </CardContent>
         </Card>
         <p class="text-muted-foreground px-8 text-center text-sm">
            {{ t("noAccount") }}
            <NuxtLinkLocale to="/register" class="hover:text-primary underline underline-offset-4">
               {{ t("signUp") }}
            </NuxtLinkLocale>
         </p>
      </div>
   </section>
</template>

<script setup lang="ts">
import { useToast } from "@/components/ui/toast";
import { Loader2 } from "lucide-vue-next";

const router = useRouter();
const { toast } = useToast();
const { t } = useI18n();
const { $trackEvent } = useNuxtApp();

const form = ref({ email: "", password: "" });
const isLoading = ref(false);

const handleSubmit = async () => {
   isLoading.value = true;
   try {
      await $fetch("/api/login", {
         method: "post",
         body: {
            email: form.value.email,
            password: form.value.password,
         },
      });

      $trackEvent("login_success", { method: "email" });

      toast({
         title: t("notifications.successTitle"),
         description: t("notifications.successDescription"),
         variant: "default",
      });

      router.push("/auth/dashboard");
   } catch (error) {
      $trackEvent("login_failed", { method: "email" });

      toast({
         title: t("notifications.errorTitle"),
         description: error.value || t("notifications.errorDescription"),
         variant: "destructive",
      });
   } finally {
      isLoading.value = false;
   }
};

const socialLogin = (provider: string) => {
   toast({
      title: t("notifications.socialTitle"),
      description: t("notifications.socialDescription", { provider }),
      variant: "default",
   });

   $trackEvent("login_attempt", { method: provider });
};

useHead({
   title: t("meta.title"),
   meta: [
      {
         name: "description",
         content: t("meta.description"),
      },
   ],
});

definePageMeta({ layout: "auth" });
</script>

<i18n lang="json">
{
   "ru": {
      "title": "Вход в аккаунт",
      "description": "Введите ваш email и пароль для входа в аккаунт",
      "emailLabel": "Email",
      "emailPlaceholder": "Введите ваш email",
      "passwordPlaceholder": "Введите ваш пароль",
      "passwordLabel": "Пароль",
      "rememberMe": "Запомнить меня",
      "forgotPassword": "Забыли пароль?",
      "loginButton": "Войти",
      "noAccount": "Нет аккаунта?",
      "signUp": "Зарегистрироваться",
      "signIn": "Войти",
      "orContinueWith": "или продолжить с",

      "notifications": {
         "successTitle": "Успешно",
         "successDescription": "Вы успешно вошли в систему.",
         "errorTitle": "Ошибка",
         "errorDescription": "Неверный email или пароль.",
         "socialTitle": "Вход через соцсети",
         "socialDescription": "Вход через {provider} не реализован в этой демо-версии."
      },

      "meta": {
         "title": "FindMyStuff QR - Вход",
         "description": "Войдите в свой аккаунт FindMyStuff QR для управления вашими QR-кодами и настройками."
      }
   },
   "en": {
      "title": "Account Login",
      "description": "Enter your email and password to log into your account",
      "emailLabel": "Email",
      "emailPlaceholder": "Enter your email",
      "passwordPlaceholder": "Enter your password",
      "passwordLabel": "Password",
      "rememberMe": "Remember me",
      "forgotPassword": "Forgot password?",
      "loginButton": "Login",
      "noAccount": "Don't have an account?",
      "signUp": "Sign up",
      "signIn": "Sign in",
      "orContinueWith": "or continue with",

      "notifications": {
         "successTitle": "Success",
         "successDescription": "You have successfully logged in.",
         "errorTitle": "Error",
         "errorDescription": "Invalid email or password.",
         "socialTitle": "Social Login",
         "socialDescription": "Login with {provider} is not implemented in this demo."
      },

      "meta": {
         "title": "FindMyStuff QR - Login",
         "description": "Sign in to your FindMyStuff QR account to manage your QR codes and settings."
      }
   }
}
</i18n>
