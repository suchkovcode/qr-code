<template>
   <div>
      <!-- Hero Section -->
      <section class="bg-primary/5 py-20">
         <div class="container px-4 md:px-6">
            <div class="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
               <div class="flex flex-col justify-center space-y-4">
                  <div class="space-y-2">
                     <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                        {{ t("hero.title") }}
                     </h1>
                     <p class="text-muted-foreground max-w-[600px] md:text-xl">
                        {{ t("hero.description") }}
                     </p>
                  </div>
                  <div class="flex flex-col gap-2 min-[400px]:flex-row">
                     <Button size="lg" asChild>
                        <NuxtLinkLocale to="/create">{{ t("hero.createQR") }}</NuxtLinkLocale>
                     </Button>
                     <Button size="lg" variant="outline" asChild>
                        <NuxtLinkLocale to="/how-it-works">{{ t("hero.learnMore") }}</NuxtLinkLocale>
                     </Button>
                  </div>
               </div>
               <div class="flex items-center justify-center">
                  <Card class="w-full max-w-md">
                     <CardHeader>
                        <CardTitle>{{ t("hero.tryItNow") }}</CardTitle>
                        <CardDescription>{{ t("hero.quickStart") }}</CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div v-if="generatedQR" class="flex flex-col items-center">
                           <div ref="qrCodeRef" class="mb-4 h-64 w-64"></div>
                           <div class="flex flex-wrap justify-center gap-2">
                              <Button @click="downloadQRCode('png')" variant="outline" size="sm">
                                 <Download class="mr-2 h-4 w-4" />
                                 PNG
                              </Button>
                              <Button @click="downloadQRCode('svg')" variant="outline" size="sm">
                                 <Download class="mr-2 h-4 w-4" />
                                 SVG
                              </Button>
                              <Button @click="downloadQRCode('pdf')" variant="outline" size="sm">
                                 <FileText class="mr-2 h-4 w-4" />
                                 PDF
                              </Button>
                           </div>
                           <Button class="mt-4 w-full" size="lg" @click="resetForm">
                              <RefreshCw class="mr-2 h-4 w-4" />
                              {{ t("quickCreate.newQR") }}
                           </Button>
                        </div>
                        <form v-else @submit.prevent="handleQuickCreate" class="space-y-4">
                           <div class="space-y-2">
                              <Label for="phone">{{ t("form.phone") }} <small class="text-destructive">*</small></Label>
                              <Input id="phone" v-model="quickForm.phone" type="tel" :placeholder="t('form.phonePlaceholder')" required />
                           </div>
                           <div class="space-y-2">
                              <Label for="message">{{ t("form.message") }} <small class="text-destructive">*</small></Label>
                              <Textarea id="message" v-model="quickForm.message" :placeholder="t('form.messagePlaceholder')" rows="3" required />
                           </div>
                           <Button type="submit" class="w-full" :disabled="isCreating">
                              <Loader2 v-if="isCreating" class="mr-2 h-4 w-4 animate-spin" />
                              {{ t("quickCreate.generateButton") }}
                           </Button>
                        </form>
                     </CardContent>
                  </Card>
               </div>
            </div>
         </div>
      </section>

      <!-- How It Works Section -->
      <section class="py-12 md:py-24 lg:py-32">
         <div class="container px-4 md:px-6">
            <div class="flex flex-col items-center justify-center space-y-4 text-center">
               <div class="space-y-2">
                  <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                     {{ t("howItWorks.title") }}
                  </h2>
                  <p class="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                     {{ t("howItWorks.description") }}
                  </p>
               </div>
            </div>
            <div class="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
               <div v-for="(step, index) in steps" :key="index" class="flex flex-col items-center space-y-4 text-center">
                  <div class="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full">
                     <component :is="step.icon" class="text-primary h-8 w-8" />
                  </div>
                  <div class="space-y-2">
                     <h3 class="text-xl font-bold">{{ t(step.title) }}</h3>
                     <p class="text-muted-foreground">{{ t(step.description) }}</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <!-- Examples Gallery -->
      <section class="bg-muted/50 py-12 md:py-24 lg:py-32">
         <div class="container px-4 md:px-6">
            <div class="flex flex-col items-center justify-center space-y-4 text-center">
               <div class="space-y-2">
                  <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                     {{ t("examples.title") }}
                  </h2>
                  <p class="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                     {{ t("examples.description") }}
                  </p>
               </div>
            </div>
            <div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
               <Card v-for="(example, index) in examples" :key="index" class="gap-0 overflow-hidden py-0">
                  <img class="aspect-video w-full object-cover" :src="example.image" :alt="t(example.alt)" />
                  <CardContent class="p-4">
                     <h3 class="text-lg font-bold">{{ t(example.title) }}</h3>
                     <p class="text-muted-foreground text-sm">{{ t(example.description) }}</p>
                  </CardContent>
               </Card>
            </div>
         </div>
      </section>

      <!-- CTA Section -->
      <section class="py-12 md:py-24 lg:py-32">
         <div class="container px-4 md:px-6">
            <div class="flex flex-col items-center justify-center space-y-4 text-center">
               <div class="space-y-2">
                  <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                     {{ t("cta.title") }}
                  </h2>
                  <p class="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                     {{ t("cta.description") }}
                  </p>
               </div>
               <div class="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                     <NuxtLinkLocale to="/register">{{ t("cta.getStarted") }}</NuxtLinkLocale>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                     <NuxtLinkLocale to="/contact">{{ t("cta.contactUs") }}</NuxtLinkLocale>
                  </Button>
               </div>
            </div>
         </div>
      </section>
   </div>
</template>

<script setup lang="ts">
import type { QuickFormData, Step, Example } from "@/types";
import { QrCode, Smartphone, Share2, Loader2, Download, RefreshCw, FileText } from "lucide-vue-next";
import { useToast } from "@/components/ui/toast/use-toast";
import QRCodeStyling from "qr-code-styling";

const { toast } = useToast();
const { $trackEvent } = useNuxtApp();
const { t } = useI18n();

const quickForm = ref<QuickFormData>({ phone: "", message: "" });
const qrCodeRef = ref<HTMLElement | null>(null);
const generatedQR = ref<boolean | null>(null);
const isCreating = ref<boolean>(false);
let qrCodeInstance: QRCodeStyling | null = null;

const generateQRCode = async (data: Record<string, string>): Promise<boolean> => {
   try {
      if (qrCodeRef.value) {
         qrCodeRef.value.innerHTML = "";
      }

      qrCodeInstance = new QRCodeStyling({
         width: 256,
         height: 256,
         type: "svg",
         data: JSON.stringify(data),
         dotsOptions: {
            color: "#000000",
            type: "rounded",
         },
         cornersSquareOptions: {
            color: "#000000",
            type: "extra-rounded",
         },
         cornersDotOptions: {
            color: "#000000",
            type: "dot",
         },
         backgroundOptions: {
            color: "#ffffff",
         },
         imageOptions: {
            crossOrigin: "anonymous",
            margin: 5,
         },
      });

      if (qrCodeRef.value) {
         qrCodeInstance.append(qrCodeRef.value);
         return true;
      }
      return false;
   } catch (error) {
      console.error("Error in QR code generation:", error);
      return false;
   }
};

const handleQuickCreate = async (): Promise<void> => {
   isCreating.value = true;

   try {
      const qrData = {
         phone: quickForm.value.phone,
         message: quickForm.value.message,
      };

      generatedQR.value = true;

      await nextTick();
      await generateQRCode(qrData);

      $trackEvent("generate_qr", {
         type: "quick",
         has_phone: !!quickForm.value.phone,
      });

      toast({
         title: t("notifications.qrGenerated"),
         description: t("notifications.qrReady"),
         variant: "default",
      });
   } catch (error) {
      console.error("Error generating QR code:", error);
      toast({
         title: t("notifications.error"),
         description: t("notifications.qrGenerationFailed"),
         variant: "destructive",
      });
      generatedQR.value = false;
   } finally {
      isCreating.value = false;
   }
};

const downloadQRCode = (fileType: "png" | "svg" | "pdf"): void => {
   try {
      const filename = `findmystuff-qr-${Date.now()}`;

      qrCodeInstance.download({
         name: filename,
         extension: fileType,
      });

      toast({
         title: t("notifications.qrDownloaded"),
         description: t("notifications.qrDownloadedDescription", { filename: `${filename}.${fileType}` }),
         variant: "default",
      });

      $trackEvent("download_qr", {
         format: fileType,
      });
   } catch (error) {
      console.error("Error downloading QR code:", error);

      toast({
         title: t("notifications.error"),
         description: t("notifications.downloadFailed"),
         variant: "destructive",
      });
   }
};

const resetForm = (): void => {
   if (qrCodeRef.value) {
      qrCodeRef.value.innerHTML = "";
   }

   qrCodeInstance = null;
   generatedQR.value = false;

   quickForm.value = {
      phone: "",
      message: "",
   };
};

const steps: Step[] = [
   {
      icon: QrCode,
      title: "howItWorks.step1.title",
      description: "howItWorks.step1.description",
   },
   {
      icon: Smartphone,
      title: "howItWorks.step2.title",
      description: "howItWorks.step2.description",
   },
   {
      icon: Share2,
      title: "howItWorks.step3.title",
      description: "howItWorks.step3.description",
   },
];

const examples: Example[] = [
   {
      image: "/placeholder.svg?height=200&width=300",
      alt: "examples.item1.alt",
      title: "examples.item1.title",
      description: "examples.item1.description",
   },
   {
      image: "/placeholder.svg?height=200&width=300",
      alt: "examples.item2.alt",
      title: "examples.item2.title",
      description: "examples.item2.description",
   },
   {
      image: "/placeholder.svg?height=200&width=300",
      alt: "examples.item3.alt",
      title: "examples.item3.title",
      description: "examples.item3.description",
   },
   {
      image: "/placeholder.svg?height=200&width=300",
      alt: "examples.item4.alt",
      title: "examples.item4.title",
      description: "examples.item4.description",
   },
   {
      image: "/placeholder.svg?height=200&width=300",
      alt: "examples.item5.alt",
      title: "examples.item5.title",
      description: "examples.item5.description",
   },
   {
      image: "/placeholder.svg?height=200&width=300",
      alt: "examples.item6.alt",
      title: "examples.item6.title",
      description: "examples.item6.description",
   },
];

useHead({
   title: t("meta.title"),
   meta: [
      {
         name: "description",
         content: t("meta.description"),
      },
   ],
   script: [
      {
         type: "application/ld+json",
         innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": t("meta.websiteName"),
            "url": "https://findmystuffqr.com",
            "potentialAction": {
               "@type": "SearchAction",
               "target": "https://findmystuffqr.com/search?q={search_term_string}",
               "query-input": "required name=search_term_string",
            },
         }),
      },
   ],
});
</script>

<i18n lang="json">
{
   "ru": {
      "hero": {
         "title": "Больше никогда не теряйте свои вещи",
         "description": "Создавайте индивидуальные QR-коды для ваших вещей. Когда кто-то найдет вашу потерянную вещь, он сможет отсканировать QR-код, чтобы связаться с вами.",
         "createQR": "Создать QR-код",
         "learnMore": "Узнать больше",
         "tryItNow": "Попробуйте сейчас",
         "quickStart": "Быстро создайте QR-код с вашей контактной информацией",
         "generateQR": "Создать QR-код",
         "createButton": "Создать QR-код",
         "learnMoreButton": "Узнать больше"
      },
      "form": {
         "name": "Имя",
         "email": "Email",
         "phone": "Телефон",
         "message": "Сообщение",
         "namePlaceholder": "Введите ваше имя",
         "emailPlaceholder": "Введите ваш email",
         "phonePlaceholder": "Введите ваш номер телефона",
         "messagePlaceholder": "Введите сообщение"
      },
      "quickCreate": {
         "title": "Быстрый генератор QR-кодов",
         "description": "Создайте базовый QR-код за считанные секунды",
         "generateButton": "Сгенерировать QR-код",
         "newQR": "Создать новый"
      },
      "howItWorks": {
         "title": "Как это работает",
         "description": "Наша система QR-кодов упрощает возврат ваших потерянных вещей",
         "step1": {
            "title": "Создайте",
            "description": "Сгенерируйте индивидуальный QR-код с вашей контактной информацией."
         },
         "step2": {
            "title": "Прикрепите",
            "description": "Распечатайте и прикрепите QR-код к вашим ценным вещам."
         },
         "step3": {
            "title": "Верните",
            "description": "В случае потери, нашедший может отсканировать QR-код, чтобы связаться с вами."
         },
         "learnMoreButton": "Узнать больше"
      },
      "examples": {
         "title": "QR-коды в действии",
         "description": "Посмотрите, как наши QR-коды могут использоваться на различных предметах",
         "item1": {
            "title": "Бирки для багажа",
            "description": "Прикрепите к вашему чемодану или рюкзаку",
            "alt": "QR-код на бирке багажа"
         },
         "item2": {
            "title": "Ошейники для животных",
            "description": "Помогите потерявшимся питомцам найти дорогу домой",
            "alt": "QR-код на ошейнике питомца"
         },
         "item3": {
            "title": "Электроника",
            "description": "Наклейте на ноутбуки, телефоны и планшеты",
            "alt": "QR-код на ноутбуке"
         },
         "item4": {
            "title": "Ключи",
            "description": "Прикрепите к вашей связке ключей",
            "alt": "QR-код на брелоке"
         },
         "item5": {
            "title": "Кошельки",
            "description": "Вложите в ваш кошелек или сумку",
            "alt": "QR-код в кошельке"
         },
         "item6": {
            "title": "Велосипеды",
            "description": "Прикрепите к раме вашего велосипеда",
            "alt": "QR-код на велосипеде"
         }
      },
      "cta": {
         "title": "Готовы защитить свои вещи?",
         "description": "Создайте свой первый QR-код сегодня и увеличьте шансы на возврат потерянных вещей.",
         "getStarted": "Начать",
         "contactUs": "Связаться с нами"
      },
      "notifications": {
         "error": "Ошибка",
         "qrNotGenerated": "QR-код не был сгенерирован. Пожалуйста, сначала создайте QR-код.",
         "qrDownloaded": "QR-код загружен",
         "qrDownloadedDescription": "Ваш QR-код был загружен как {filename}",
         "downloadFailed": "Не удалось загрузить QR-код. Пожалуйста, попробуйте еще раз.",
         "qrGenerated": "QR-код сгенерирован!",
         "qrReady": "Ваш QR-код готов к скачиванию.",
         "qrGenerationFailed": "Не удалось сгенерировать QR-код. Пожалуйста, попробуйте еще раз."
      },
      "meta": {
         "title": "FindMyStuff QR - Создавайте QR-коды, чтобы найти ваши утерянные вещи",
         "description": "Создавайте индивидуальные QR-коды, которые помогут найти ваши потерянные вещи. Просто в использовании, настраиваемые и эффективные.",
         "websiteName": "FindMyStuff QR"
      }
   },
   "en": {
      "hero": {
         "title": "Never lose your belongings again",
         "description": "Create custom QR codes for your items. When someone finds your lost item, they can scan the QR code to contact you.",
         "createQR": "Create QR code",
         "learnMore": "Learn more",
         "tryItNow": "Try it now",
         "quickStart": "Quickly create a QR code with your contact information",
         "generateQR": "Generate QR code",
         "createButton": "Create QR code",
         "learnMoreButton": "Learn more"
      },
      "form": {
         "name": "Name",
         "email": "Email",
         "phone": "Phone",
         "message": "Message",
         "namePlaceholder": "Enter your name",
         "emailPlaceholder": "Enter your email",
         "phonePlaceholder": "Enter your phone number",
         "messagePlaceholder": "Enter message"
      },
      "quickCreate": {
         "title": "Quick QR code generator",
         "description": "Create a basic QR code in seconds",
         "generateButton": "Generate QR code",
         "newQR": "Create new"
      },
      "howItWorks": {
         "title": "How it works",
         "description": "Our QR code system makes returning your lost items easy",
         "step1": {
            "title": "Create",
            "description": "Generate a custom QR code with your contact information."
         },
         "step2": {
            "title": "Attach",
            "description": "Print and attach the QR code to your valuable items."
         },
         "step3": {
            "title": "Return",
            "description": "If lost, the finder can scan the QR code to contact you."
         },
         "learnMoreButton": "Learn more"
      },
      "examples": {
         "title": "QR codes in action",
         "description": "See how our QR codes can be used on various items",
         "item1": {
            "title": "Luggage tags",
            "description": "Attach to your suitcase or backpack",
            "alt": "QR code on luggage tag"
         },
         "item2": {
            "title": "Pet collars",
            "description": "Help lost pets find their way home",
            "alt": "QR code on pet collar"
         },
         "item3": {
            "title": "Electronics",
            "description": "Stick on laptops, phones, and tablets",
            "alt": "QR code on laptop"
         },
         "item4": {
            "title": "Keys",
            "description": "Attach to your keychain",
            "alt": "QR code on keychain"
         },
         "item5": {
            "title": "Wallets",
            "description": "Insert into your wallet or purse",
            "alt": "QR code in wallet"
         },
         "item6": {
            "title": "Bicycles",
            "description": "Attach to your bicycle frame",
            "alt": "QR code on bicycle"
         }
      },
      "cta": {
         "title": "Ready to protect your belongings?",
         "description": "Create your first QR code today and increase the chances of getting your lost items back.",
         "getStarted": "Get started",
         "contactUs": "Contact us"
      },
      "notifications": {
         "error": "Error",
         "qrNotGenerated": "QR code has not been generated. Please create a QR code first.",
         "qrDownloaded": "QR Code Downloaded",
         "qrDownloadedDescription": "Your QR code has been downloaded as {filename}",
         "downloadFailed": "Failed to download QR code. Please try again.",
         "qrGenerated": "QR Code Generated!",
         "qrReady": "Your QR code is ready to download.",
         "qrGenerationFailed": "Failed to generate QR code. Please try again."
      },
      "meta": {
         "title": "FindMyStuff QR - Generate QR codes to find your lost items",
         "description": "Create custom QR codes to help find your lost items. Easy to use, customizable, and effective.",
         "websiteName": "FindMyStuff QR"
      }
   }
}
</i18n>
