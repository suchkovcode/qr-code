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
                     <Label for="name">{{ t("nameLabel") }}</Label>
                     <Input id="name" v-model="form.name" :placeholder="t('namePlaceholder')" required autocomplete="name" />
                  </div>
                  <div class="space-y-2">
                     <Label for="email">{{ t("emailLabel") }}</Label>
                     <Input id="email" v-model="form.email" type="email" :placeholder="t('emailPlaceholder')" required autocomplete="email" />
                  </div>
                  <div class="space-y-2">
                     <Label for="password">{{ t("passwordLabel") }}</Label>
                     <Input
                        id="password"
                        v-model="form.password"
                        type="password"
                        :placeholder="t('passwordPlaceholder')"
                        required
                        autocomplete="new-password" />
                  </div>
                  <Button type="submit" class="w-full" :disabled="isLoading">
                     <Loader2 v-if="isLoading" class="mr-2 h-4 w-4 animate-spin" />
                     {{ t("signUp") }}
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
                  <Button variant="outline" type="button" @click="socialRegister('google')">
                     <span class="sr-only">Google</span>
                     Google
                  </Button>
                  <Button variant="outline" type="button" @click="socialRegister('facebook')">
                     <span class="sr-only">Facebook</span>
                     Facebook
                  </Button>
               </div>
            </CardContent>
         </Card>
         <p class="text-muted-foreground px-8 text-center text-sm">
            {{ t("haveAccount") }}
            <NuxtLinkLocale to="/login" class="hover:text-primary underline underline-offset-4">
               {{ t("signIn") }}
            </NuxtLinkLocale>
         </p>
      </div>
   </section>
</template>

<script setup lang="ts">
import { Loader2 } from "lucide-vue-next";
import { useToast } from "@/components/ui/toast";

const router = useRouter();
const { toast } = useToast();
const { $trackEvent } = useNuxtApp();
const { t } = useI18n();

const form = ref({ name: "", email: "", password: "" });
const isLoading = ref(false);

const handleSubmit = async () => {
   isLoading.value = true;

   try {
      await $fetch("/api/register", {
         method: "post",
         body: {
            name: form.value.name,
            email: form.value.email,
            password: form.value.password,
         },
      });

      $trackEvent("register_success", { method: "email" });

      toast({
         title: t("notifications.successTitle"),
         description: t("notifications.successDescription"),
         variant: "default",
      });

      router.push("/auth/dashboard");
   } catch (error) {
      $trackEvent("register_failed", { method: "email" });

      toast({
         title: t("notifications.errorTitle"),
         description: error.value || t("notifications.errorDescription"),
         variant: "destructive",
      });
   } finally {
      isLoading.value = false;
   }
};

const socialRegister = (provider: string) => {
   toast({
      title: t("notifications.socialTitle"),
      description: t("notifications.socialDescription", { provider }),
      variant: "default",
   });

   $trackEvent("register_attempt", { method: provider });
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
      "title": "Создание аккаунта",
      "description": "Введите ваши данные для создания нового аккаунта",
      "nameLabel": "Имя",
      "passwordLabel": "Пароль",
      "emailLabel": "Email",
      "namePlaceholder": "Введите ваше имя",
      "emailPlaceholder": "Введите ваш email",
      "signUp": "Зарегистрироваться",
      "passwordPlaceholder": "Введите ваш пароль",
      "confirmPasswordLabel": "Подтвердите пароль",
      "confirmPasswordPlaceholder": "Введите пароль еще раз",
      "termsLabel": "Создавая аккаунт, вы соглашаетесь с нашими Условиями использования и Политикой конфиденциальности",
      "registerButton": "Зарегистрироваться",
      "haveAccount": "Уже есть аккаунт?",
      "orContinueWith": "или продолжить с",
      "signIn": "Войти",

      "notifications": {
         "successTitle": "Успешно",
         "successDescription": "Вы успешно зарегистрировались.",
         "errorTitle": "Ошибка",
         "errorDescription": "Неверный email или пароль.",
         "socialTitle": "Вход через соцсети",
         "socialDescription": "Вход через {provider} не реализован в этой демо-версии."
      },

      "meta": {
         "title": "FindMyStuff QR - Регистрация",
         "description": "Создайте новый аккаунт на FindMyStuff QR, чтобы начать генерировать QR-коды для ваших вещей."
      }
   },
   "en": {
      "title": "Create an account",
      "description": "Enter your details to create a new account",
      "nameLabel": "Name",
      "passwordLabel": "Password",
      "emailLabel": "Email",
      "namePlaceholder": "Enter your name",
      "emailPlaceholder": "Enter your email",
      "signUp": "Sign up",
      "passwordPlaceholder": "Enter your password",
      "confirmPasswordLabel": "Confirm password",
      "confirmPasswordPlaceholder": "Enter password again",
      "termsLabel": "By creating an account, you agree to our Terms of Service and Privacy Policy",
      "registerButton": "Register",
      "haveAccount": "Already have an account?",
      "orContinueWith": "or continue with",
      "signIn": "Sign in",

      "notifications": {
         "successTitle": "Success",
         "successDescription": "You have successfully registered.",
         "errorTitle": "Error",
         "errorDescription": "Invalid email or password.",
         "socialTitle": "Social login",
         "socialDescription": "Login with {provider} is not implemented in this demo."
      },

      "meta": {
         "title": "FindMyStuff QR - Registration",
         "description": "Create a new account on FindMyStuff QR to start generating QR codes for your items."
      }
   }
}
</i18n>
