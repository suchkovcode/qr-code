<template>
   <section class="container py-10">
      <div class="mx-auto max-w-4xl space-y-12">
         <!-- Header -->
         <div class="space-y-4 text-center">
            <h1 class="text-4xl font-bold tracking-tight">{{ t("title") }}</h1>
            <p class="text-muted-foreground mx-auto max-w-2xl text-lg">
               {{ t("description") }}
            </p>
         </div>

         <!-- Steps -->
         <div class="space-y-16">
            <div
               v-for="(step, index) in steps"
               :key="index"
               class="flex flex-col gap-8 md:flex-row"
               :class="{ 'md:flex-row-reverse': index % 2 !== 0 }">
               <div class="flex-1 space-y-4">
                  <Badge variant="outline" class="px-3 py-1 text-sm"> {{ t("step") }} {{ index + 1 }} </Badge>
                  <h2 class="text-2xl font-bold tracking-tight">{{ t(step.titleKey) }}</h2>
                  <p class="text-muted-foreground">{{ t(step.descriptionKey) }}</p>
                  <ul v-if="step.bulletPoints" class="text-muted-foreground mt-4 ml-6 list-disc space-y-2">
                     <li v-for="(point, pointIndex) in step.bulletPoints" :key="pointIndex">
                        {{ t(point) }}
                     </li>
                  </ul>
               </div>
               <div class="bg-muted/50 flex flex-1 items-center justify-center rounded-lg border p-8">
                  <div class="relative h-48 w-48">
                     <component :is="step.icon" class="text-primary h-full w-full" />
                  </div>
               </div>
            </div>
         </div>

         <!-- Benefits -->
         <div class="space-y-8">
            <h2 class="text-center text-3xl font-bold tracking-tight">{{ t("benefits.title") }}</h2>
            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
               <Card v-for="(benefit, index) in benefits" :key="index" class="flex flex-col">
                  <CardHeader>
                     <div class="bg-primary/10 mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                        <component :is="benefit.icon" class="text-primary h-6 w-6" />
                     </div>
                     <CardTitle>{{ t(benefit.titleKey) }}</CardTitle>
                  </CardHeader>
                  <CardContent class="flex-1">
                     <p class="text-muted-foreground">{{ t(benefit.descriptionKey) }}</p>
                  </CardContent>
               </Card>
            </div>
         </div>

         <!-- FAQ -->
         <div class="space-y-8">
            <h2 class="text-center text-3xl font-bold tracking-tight">{{ t("faq.title") }}</h2>
            <Accordion type="single" collapsible class="w-full">
               <AccordionItem v-for="(faq, index) in faqs" :key="index" :value="`item-${index}`">
                  <AccordionTrigger>{{ t(faq.questionKey) }}</AccordionTrigger>
                  <AccordionContent>
                     <div class="prose prose-sm dark:prose-invert">
                        <p>{{ t(faq.answerKey) }}</p>
                     </div>
                  </AccordionContent>
               </AccordionItem>
            </Accordion>
         </div>

         <!-- CTA -->
         <div class="bg-primary/5 rounded-lg p-8 text-center">
            <h2 class="text-2xl font-bold tracking-tight">{{ t("cta.title") }}</h2>
            <p class="text-muted-foreground mx-auto mt-2 max-w-md">
               {{ t("cta.description") }}
            </p>
            <Button size="lg" class="mt-6" @click="navigateToCreate">
               {{ t("cta.button") }}
               <ArrowRight class="ml-2 h-4 w-4" />
            </Button>
         </div>
      </div>
   </section>
</template>

<script setup lang="ts">
import { QrCode, Smartphone, MapPin, Shield, Clock, Globe, ArrowRight, Sparkles, BadgeCheck, Lock } from "lucide-vue-next";

const router = useRouter();
const { t } = useI18n();

const navigateToCreate = () => {
   router.push("/create");
};

const steps = [
   {
      titleKey: "steps.create.title",
      descriptionKey: "steps.create.description",
      icon: QrCode,
      bulletPoints: ["steps.create.point1", "steps.create.point2", "steps.create.point3"],
   },
   {
      titleKey: "steps.attach.title",
      descriptionKey: "steps.attach.description",
      icon: MapPin,
      bulletPoints: ["steps.attach.point1", "steps.attach.point2"],
   },
   {
      titleKey: "steps.recover.title",
      descriptionKey: "steps.recover.description",
      icon: Smartphone,
      bulletPoints: ["steps.recover.point1", "steps.recover.point2", "steps.recover.point3"],
   },
];

const benefits = [
   {
      titleKey: "benefits.privacy.title",
      descriptionKey: "benefits.privacy.description",
      icon: Shield,
   },
   {
      titleKey: "benefits.quick.title",
      descriptionKey: "benefits.quick.description",
      icon: Clock,
   },
   {
      titleKey: "benefits.global.title",
      descriptionKey: "benefits.global.description",
      icon: Globe,
   },
   {
      titleKey: "benefits.customizable.title",
      descriptionKey: "benefits.customizable.description",
      icon: Sparkles,
   },
   {
      titleKey: "benefits.reliable.title",
      descriptionKey: "benefits.reliable.description",
      icon: BadgeCheck,
   },
   {
      titleKey: "benefits.secure.title",
      descriptionKey: "benefits.secure.description",
      icon: Lock,
   },
];

const faqs = [
   {
      questionKey: "faq.question1",
      answerKey: "faq.answer1",
   },
   {
      questionKey: "faq.question2",
      answerKey: "faq.answer2",
   },
   {
      questionKey: "faq.question3",
      answerKey: "faq.answer3",
   },
   {
      questionKey: "faq.question4",
      answerKey: "faq.answer4",
   },
   {
      questionKey: "faq.question5",
      answerKey: "faq.answer5",
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
});
</script>

<i18n lang="json">
{
   "ru": {
      "title": "Как работает FindMyStuff QR",
      "description": "Наш сервис помогает вам вернуть потерянные вещи с помощью индивидуальных QR-кодов. Узнайте, как работает процесс и почему он эффективен.",
      "step": "Шаг",
      "steps": {
         "create": {
            "title": "Создайте свой индивидуальный QR-код",
            "description": "Сгенерируйте персонализированный QR-код с вашей контактной информацией, который может быть легко отсканирован любым, кто найдет вашу потерянную вещь.",
            "point1": "Введите ваши контактные данные (email, телефон, имя)",
            "point2": "Настройте дизайн и цвет вашего QR-кода",
            "point3": "Добавьте опциональный логотип, чтобы сделать ваш QR-код уникальным"
         },
         "attach": {
            "title": "Прикрепите QR-коды к вашим вещам",
            "description": "Распечатайте ваши QR-коды и прикрепите их к вашим ценным вещам. Мы рекомендуем использовать водонепроницаемые наклейки или бирки для долговечности.",
            "point1": "Скачайте ваш QR-код в формате PNG, SVG или PDF",
            "point2": "Распечатайте и прикрепите к ноутбукам, телефонам, ключам, багажу и другим вещам"
         },
         "recover": {
            "title": "Верните ваши потерянные вещи",
            "description": "Если кто-то найдет вашу потерянную вещь, он может отсканировать QR-код с помощью любого смартфона, чтобы увидеть вашу контактную информацию.",
            "point1": "Нашедший сканирует ваш QR-код своим смартфоном",
            "point2": "Он видит вашу контактную информацию и сообщение",
            "point3": "Он может связаться с вами, чтобы организовать возврат вашей вещи"
         }
      },

      "benefits": {
         "title": "Преимущества использования FindMyStuff QR",
         "privacy": {
            "title": "Контроль конфиденциальности",
            "description": "Вы решаете, какую именно информацию предоставить нашедшим. Никакие личные данные не видны публично без сканирования."
         },
         "quick": {
            "title": "Быстрая настройка",
            "description": "Создавайте и печатайте QR-коды за считанные минуты с помощью нашего простого, удобного интерфейса."
         },
         "global": {
            "title": "Работает по всему миру",
            "description": "QR-коды можно сканировать в любой точке мира, что увеличивает ваши шансы на возврат во время путешествий."
         },
         "customizable": {
            "title": "Полностью настраиваемый",
            "description": "Персонализируйте ваши QR-коды с помощью пользовательских цветов, стилей и логотипов, чтобы они соответствовали вашим вещам."
         },
         "reliable": {
            "title": "Надежная технология",
            "description": "QR-коды долговечны и могут быть отсканированы даже при частичном повреждении или износе."
         },
         "secure": {
            "title": "Безопасная система",
            "description": "Ваши данные зашифрованы и защищены с помощью стандартных отраслевых мер безопасности."
         }
      },
      "faq": {
         "title": "Часто задаваемые вопросы",
         "question1": "Нужно ли создавать аккаунт для генерации QR-кодов?",
         "answer1": "Да, создание аккаунта позволяет вам управлять вашими QR-кодами, отслеживать сканирования и обновлять вашу контактную информацию при необходимости.",
         "question2": "Насколько долговечны QR-коды?",
         "answer2": "QR-коды очень долговечны и могут быть отсканированы даже при частичном повреждении. Для лучших результатов мы рекомендуем использовать водонепроницаемые наклейки или ламинированные бирки при прикреплении к предметам, которые могут подвергаться воздействию стихии.",
         "question3": "Могу ли я обновить свою контактную информацию после создания QR-кода?",
         "answer3": "Да, с зарегистрированным аккаунтом вы можете обновлять свою контактную информацию в любое время без необходимости создавать и печатать новые QR-коды.",
         "question4": "Безопасна ли моя личная информация?",
         "answer4": "Да, мы серьезно относимся к безопасности данных. Ваша личная информация зашифрована и передается только при сканировании вашего QR-кода. Вы контролируете, какая именно информация видна нашедшим.",
         "question5": "Могу ли я отслеживать, когда мой QR-код сканируется?",
         "answer5": "Да, с премиум-аккаунтом вы получаете уведомления, когда ваши QR-коды сканируются, включая время и приблизительное местоположение сканирования."
      },
      "cta": {
         "title": "Готовы защитить свои вещи?",
         "description": "Создайте свой первый QR-код сегодня и увеличьте шансы на возврат потерянных вещей.",
         "button": "Создать свой QR-код"
      },
      "meta": {
         "title": "Как это работает - FindMyStuff QR",
         "description": "Узнайте, как QR-коды FindMyStuff помогают вернуть потерянные вещи. Создавайте индивидуальные QR-коды, прикрепляйте их к своим вещам и увеличивайте шансы на их возврат."
      }
   },
   "en": {
      "title": "How FindMyStuff QR Works",
      "description": "Our service helps you recover lost items using custom QR codes. Learn how the process works and why it's effective.",
      "step": "Step",
      "steps": {
         "create": {
            "title": "Create Your Custom QR Code",
            "description": "Generate a personalized QR code with your contact information that can be easily scanned by anyone who finds your lost item.",
            "point1": "Enter your contact details (email, phone, name)",
            "point2": "Customize the design and color of your QR code",
            "point3": "Add an optional logo to make your QR code unique"
         },
         "attach": {
            "title": "Attach QR Codes to Your Items",
            "description": "Print your QR codes and attach them to your valuable items. We recommend using waterproof stickers or tags for durability.",
            "point1": "Download your QR code in PNG, SVG, or PDF format",
            "point2": "Print and attach to laptops, phones, keys, luggage, and other items"
         },
         "recover": {
            "title": "Recover Your Lost Items",
            "description": "If someone finds your lost item, they can scan the QR code with any smartphone to see your contact information.",
            "point1": "The finder scans your QR code with their smartphone",
            "point2": "They see your contact information and message",
            "point3": "They can contact you to arrange the return of your item"
         }
      },

      "benefits": {
         "title": "Benefits of Using FindMyStuff QR",
         "privacy": {
            "title": "Privacy Control",
            "description": "You decide exactly what information to provide to finders. No personal data is visible publicly without scanning."
         },
         "quick": {
            "title": "Quick Setup",
            "description": "Create and print QR codes in minutes using our simple, user-friendly interface."
         },
         "global": {
            "title": "Works Worldwide",
            "description": "QR codes can be scanned anywhere in the world, increasing your chances of recovery while traveling."
         },
         "customizable": {
            "title": "Fully Customizable",
            "description": "Personalize your QR codes with custom colors, styles, and logos to match your items."
         },
         "reliable": {
            "title": "Reliable Technology",
            "description": "QR codes are durable and can be scanned even when partially damaged or worn."
         },
         "secure": {
            "title": "Secure System",
            "description": "Your data is encrypted and protected using industry-standard security measures."
         }
      },
      "faq": {
         "title": "Frequently Asked Questions",
         "question1": "Do I need to create an account to generate QR codes?",
         "answer1": "Yes, creating an account allows you to manage your QR codes, track scans, and update your contact information when necessary.",
         "question2": "How durable are the QR codes?",
         "answer2": "QR codes are very durable and can be scanned even when partially damaged. For best results, we recommend using waterproof stickers or laminated tags when attaching to items that may be exposed to the elements.",
         "question3": "Can I update my contact information after creating a QR code?",
         "answer3": "Yes, with a registered account you can update your contact information at any time without having to create and print new QR codes.",
         "question4": "Is my personal information safe?",
         "answer4": "Yes, we take data security seriously. Your personal information is encrypted and only shared when your QR code is scanned. You control exactly what information is visible to finders.",
         "question5": "Can I track when my QR code is scanned?",
         "answer5": "Yes, with a premium account you receive notifications when your QR codes are scanned, including the time and approximate location of the scan."
      },
      "cta": {
         "title": "Ready to protect your belongings?",
         "description": "Create your first QR code today and increase your chances of getting lost items back.",
         "button": "Create Your QR Code"
      },
      "meta": {
         "title": "How It Works - FindMyStuff QR",
         "description": "Learn how FindMyStuff QR codes help you recover lost items. Create custom QR codes, attach them to your belongings, and increase your chances of getting them back."
      }
   }
}
</i18n>
