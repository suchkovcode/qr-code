<template>
   <section class="container py-10">
      <div class="mx-auto max-w-5xl space-y-8">
         <div class="space-y-2">
            <h1 class="text-3xl font-bold tracking-tight">{{ t("title") }}</h1>
            <p class="text-muted-foreground">{{ t("description") }}</p>
         </div>

         <div class="grid gap-8 md:grid-cols-2">
            <!-- QR Code Form -->
            <Card class="h-fit">
               <CardHeader>
                  <CardTitle>{{ t("form.title") }}</CardTitle>
                  <CardDescription>{{ t("form.description") }}</CardDescription>
               </CardHeader>
               <CardContent>
                  <form @submit.prevent="handleQuickCreate" class="space-y-6">
                     <Tabs v-model="activeTab" class="w-full gap-6">
                        <TabsList class="grid w-full grid-cols-2">
                           <TabsTrigger value="contact">{{ t("form.contactInfo") }}</TabsTrigger>
                           <TabsTrigger value="design">{{ t("form.design") }}</TabsTrigger>
                        </TabsList>
                        <TabsContent value="contact" class="space-y-4">
                           <div class="space-y-2">
                              <Label class="gap-1" for="name">{{ t("name") }} <small class="text-destructive">*</small> </Label>
                              <Input id="name" v-model="qrData.name" :placeholder="t('namePlaceholder')" required />
                           </div>
                           <div class="space-y-2">
                              <Label class="gap-1" for="email">{{ t("email") }} <small class="text-destructive">*</small></Label>
                              <Input id="email" v-model="qrData.email" type="email" :placeholder="t('emailPlaceholder')" required />
                           </div>
                           <div class="space-y-2">
                              <Label for="phone">{{ t("phone") }}</Label>
                              <Input id="phone" v-model="qrData.phone" type="tel" :placeholder="t('phonePlaceholder')" />
                           </div>
                           <div class="space-y-2">
                              <Label for="message">{{ t("message") }}</Label>
                              <Textarea id="message" v-model="qrData.message" :placeholder="t('messagePlaceholder')" rows="3" />
                              <p class="text-muted-foreground text-xs">
                                 {{ t("form.messageHelp") }}
                              </p>
                           </div>
                        </TabsContent>
                        <TabsContent value="design" class="space-y-4">
                           <div class="space-y-2">
                              <Label>{{ t("form.qrStyle") }}</Label>
                              <div class="grid grid-cols-3 gap-2">
                                 <div
                                    v-for="style in qrStyles"
                                    :key="style.id"
                                    class="hover:bg-muted relative cursor-pointer rounded-md border p-2"
                                    :class="{ 'border-primary': qrData.style === style.id, 'border-input': qrData.style !== style.id }"
                                    @click="qrData.style = style.id">
                                    <div class="flex h-20 items-center justify-center">
                                       <img :src="style.preview" :alt="style.name" class="max-h-full max-w-full" />
                                    </div>
                                    <p class="mt-2 text-center text-xs">{{ style.name }}</p>
                                 </div>
                              </div>
                           </div>
                           <div class="space-y-2">
                              <Label for="color">{{ t("form.mainColor") }}</Label>
                              <div class="flex gap-2">
                                 <div
                                    v-for="color in qrColors"
                                    :key="color.value"
                                    class="h-8 w-8 cursor-pointer rounded-full border"
                                    :style="{ backgroundColor: color.value }"
                                    :class="{ 'ring-primary ring-2 ring-offset-2': qrData.color === color.value }"
                                    @click="qrData.color = color.value"></div>
                              </div>
                           </div>
                           <div class="space-y-2">
                              <Label for="logo">{{ t("form.addLogo") }}</Label>
                              <div class="grid grid-cols-4 gap-2">
                                 <div
                                    class="hover:bg-muted flex h-16 cursor-pointer items-center justify-center rounded-md border border-dashed p-2"
                                    :class="{ 'border-primary': !qrData.logo }"
                                    @click="qrData.logo = null">
                                    <X class="text-muted-foreground h-6 w-6" />
                                 </div>
                                 <div
                                    v-for="logo in qrLogos"
                                    :key="logo.id"
                                    class="hover:bg-muted flex h-16 cursor-pointer items-center justify-center rounded-md border p-2"
                                    :class="{ 'border-primary': qrData.logo === logo.id, 'border-input': qrData.logo !== logo.id }"
                                    @click="qrData.logo = logo.id">
                                    <img :src="logo.preview" :alt="logo.name" class="max-h-full max-w-full" />
                                 </div>
                              </div>
                           </div>
                        </TabsContent>
                     </Tabs>

                     <Button type="submit" class="w-full" :disabled="isCreating">
                        <Loader2 v-if="isCreating" class="mr-2 h-4 w-4 animate-spin" />
                        {{ t("form.generateButton") }}
                     </Button>
                  </form>
               </CardContent>
            </Card>

            <!-- QR Code Preview -->
            <div class="flex flex-col space-y-4">
               <Card>
                  <CardHeader>
                     <CardTitle>{{ t("preview.title") }}</CardTitle>
                     <CardDescription>{{ t("preview.description") }}</CardDescription>
                  </CardHeader>
                  <CardContent class="flex flex-col items-center justify-center p-6">
                     <div v-if="generatedQR" class="mb-4" ref="qrCodeRef"></div>
                     <div v-else class="flex h-64 w-64 items-center justify-center rounded-lg border border-dashed">
                        <p class="text-muted-foreground text-center text-sm">
                           {{ t("preview.placeholder") }}
                        </p>
                     </div>
                  </CardContent>
               </Card>

               <Card v-if="generatedQR">
                  <CardHeader>
                     <CardTitle>{{ t("download.title") }}</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div class="grid grid-cols-2 gap-2">
                        <Button variant="outline" @click="downloadQRCode('png')">
                           <Download class="mr-2 h-4 w-4" />
                           PNG
                        </Button>
                        <Button variant="outline" @click="downloadQRCode('svg')">
                           <Download class="mr-2 h-4 w-4" />
                           SVG
                        </Button>
                        <Button class="col-span-2" variant="outline" @click="downloadQRCode('pdf')">
                           <FileText class="mr-2 h-4 w-4" />
                           PDF
                        </Button>
                     </div>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   </section>
</template>

<script setup lang="ts">
import type { QRData, QRStyle, QRColor, QRLogo, QROptions } from "@/types";
import { X, Download, FileText, Loader2 } from "lucide-vue-next";
import { useToast } from "@/components/ui/toast";
import QRCodeStyling from "qr-code-styling";

const { toast } = useToast();
const { t } = useI18n();
const { $trackEvent } = useNuxtApp();

const activeTab = ref<string>("contact");
const generatedQR = ref<boolean | null>(null);
const isCreating = ref<boolean>(false);
const qrCodeRef = ref<HTMLElement | null>(null);
let qrCodeInstance: QRCodeStyling | null = null;

const qrData = ref<QRData>({
   name: "",
   email: "",
   phone: "",
   message: "",
   style: "dots",
   color: "#000000",
   logo: null,
});

const qrStyles: QRStyle[] = [
   { id: "dots", name: "Dots", preview: "/dots.svg" },
   { id: "squares", name: "Squares", preview: "/squares.svg" },
   { id: "rounded", name: "Rounded", preview: "/rounded.svg" },
];

const qrColors: QRColor[] = [
   { name: "Black", value: "#000000" },
   { name: "Red", value: "#ef4444" },
   { name: "Green", value: "#22c55e" },
   { name: "Blue", value: "#3b82f6" },
   { name: "Purple", value: "#a855f7" },
   { name: "Orange", value: "#f97316" },
];

const qrLogos: QRLogo[] = [
   { id: "logo1", name: "Logo 1", preview: "/logo1.svg" },
   { id: "logo2", name: "Logo 2", preview: "/logo2.svg" },
   { id: "logo3", name: "Logo 3", preview: "/logo3.svg" },
];

const getLogoPath = (logoId: string | null): string | undefined => {
   if (!logoId) return undefined;

   switch (logoId) {
      case "logo1":
         return "/logo1.svg";
      case "logo2":
         return "/logo2.svg";
      case "logo3":
         return "/logo3.svg";
      default:
         return undefined;
   }
};

const getDotType = (style: string): string => {
   switch (style) {
      case "dots":
         return "dots";
      case "rounded":
         return "rounded";
      default:
         return "square";
   }
};

const generateQRCode = async (options: QROptions): Promise<QRCodeStyling> => {
   try {
      if (qrCodeRef.value) {
         qrCodeRef.value.innerHTML = "";
      }

      const qrInstance = new QRCodeStyling(options);

      if (qrCodeRef.value) {
         qrInstance.append(qrCodeRef.value);
      }
      return qrInstance;
   } catch (error) {
      console.error("Error in QR code generation:", error);
      throw error;
   }
};

const handleQuickCreate = async (): Promise<void> => {
   isCreating.value = true;

   try {
      const data = {
         name: qrData.value.name,
         email: qrData.value.email,
         phone: qrData.value.phone,
         message: qrData.value.message,
      };

      const qrDataString = JSON.stringify(data);

      const dotType = getDotType(qrData.value.style);

      const logoImage = getLogoPath(qrData.value.logo);

      const qrOptions: QROptions = {
         width: 256,
         height: 256,
         type: "svg",
         data: qrDataString,
         dotsOptions: {
            color: qrData.value.color,
            type: dotType,
         },
         cornersSquareOptions: {
            color: qrData.value.color,
            type: "square",
         },
         cornersDotOptions: {
            color: qrData.value.color,
            type: "dot",
         },
         backgroundOptions: {
            color: "#ffffff",
         },
         imageOptions: {
            crossOrigin: "anonymous",
            margin: 10,
         },
      };

      if (logoImage) {
         qrOptions.image = logoImage;
      }

      // First, set generatedQR to true to ensure the container is rendered
      generatedQR.value = true;

      // Wait for the DOM to update with the qrCodeRef element
      await nextTick();

      // Now generate and append the QR code
      qrCodeInstance = await generateQRCode(qrOptions);

      $trackEvent("generate_qr", {
         type: "custom",
         style: qrData.value.style,
         has_logo: !!qrData.value.logo,
      });

      toast({
         title: t("notifications.qrGenerated"),
         description: t("notifications.qrReady"),
         variant: "default",
      });

      activeTab.value = "design";
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

interface DownloadOptions {
   name: string;
   extension: string;
}

const downloadQRCode = (fileType: "png" | "svg" | "pdf"): void => {
   try {
      const filename = `findmystuff-qr-${Date.now()}`;

      if (!qrCodeInstance) {
         throw new Error("QR code has not been generated yet");
      }

      qrCodeInstance.download({
         name: filename,
         extension: fileType,
      } as DownloadOptions);

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

useHead({
   title: t("meta.title"),
   meta: [
      {
         name: "description",
         content: t("meta.description"),
      },
   ],
});
</script>

<i18n lang="json">
{
   "ru": {
      "title": "Создайте свой QR-код",
      "description": "Настройте свой QR-код с вашей контактной информацией и предпочтениями дизайна.",
      "name": "Имя",
      "email": "Email",
      "phone": "Телефон",
      "message": "Сообщение",
      "namePlaceholder": "Введите ваше имя",
      "emailPlaceholder": "Введите ваш email",
      "phonePlaceholder": "Введите ваш номер телефона",
      "messagePlaceholder": "Введите сообщение",

      "form": {
         "title": "Контактная информация",
         "description": "Введите информацию, которую вы хотите передать нашедшему вашу вещь.",
         "contactInfo": "Контакты",
         "design": "Дизайн",
         "messageHelp": "Краткое сообщение для нашедшего с объяснением, как вернуть вашу вещь.",
         "qrStyle": "Стиль QR-кода",
         "mainColor": "Основной цвет",
         "addLogo": "Добавить логотип (опционально)",
         "generateButton": "Сгенерировать QR-код"
      },

      "preview": {
         "title": "Предпросмотр",
         "description": "Так будет выглядеть ваш QR-код.",
         "placeholder": "Ваш QR-код появится здесь после генерации."
      },

      "download": {
         "title": "Варианты скачивания"
      },

      "meta": {
         "title": "Создать QR-код - FindMyStuff QR",
         "description": "Создайте индивидуальный QR-код для поиска потерянных вещей. Настройте дизайн, добавьте контактную информацию и скачайте в различных форматах."
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
      }
   },
   "en": {
      "title": "Create Your QR Code",
      "description": "Customize your QR code with your contact information and design preferences.",
      "name": "Name",
      "email": "Email",
      "phone": "Phone",
      "message": "Message",
      "namePlaceholder": "Enter your name",
      "emailPlaceholder": "Enter your email",
      "phonePlaceholder": "Enter your phone number",
      "messagePlaceholder": "Enter a message",

      "form": {
         "title": "Contact Information",
         "description": "Enter the information you want to share with the person who finds your item.",
         "contactInfo": "Contact",
         "design": "Design",
         "messageHelp": "A brief message for the finder explaining how to return your item.",
         "qrStyle": "QR Code Style",
         "mainColor": "Main Color",
         "addLogo": "Add Logo (optional)",
         "generateButton": "Generate QR Code"
      },
      "preview": {
         "title": "Preview",
         "description": "This is how your QR code will look.",
         "placeholder": "Your QR code will appear here after generation."
      },

      "download": {
         "title": "Download Options"
      },

      "meta": {
         "title": "Create QR Code - FindMyStuff QR",
         "description": "Create a custom QR code to help find your lost items. Customize design, add contact information, and download in multiple formats."
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
      }
   }
}
</i18n>
