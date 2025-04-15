<template>
   <div>
      <!-- Our Hero Section -->
      <section class="py-12 md:py-24 lg:py-32">
         <div class="container px-4 md:px-6">
            <div class="flex flex-col items-center justify-center space-y-4 text-center">
               <div class="space-y-2">
                  <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                     {{ t("hero.title") }}
                  </h1>
                  <p class="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
                     {{ t("hero.description") }}
                  </p>
               </div>
            </div>
         </div>
      </section>

      <!-- Our Story Section -->
      <section class="bg-muted/50 py-12 md:py-24 lg:py-32">
         <div class="container px-4 md:px-6">
            <div class="grid gap-6 lg:grid-cols-2 lg:gap-12">
               <div class="space-y-4">
                  <div class="bg-primary/10 text-primary inline-block w-fit rounded-lg px-3 py-1 text-sm">
                     {{ t("story.label") }}
                  </div>
                  <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                     {{ t("story.title") }}
                  </h2>
                  <p class="text-muted-foreground md:text-xl">
                     {{ t("story.paragraph1") }}
                  </p>
                  <p class="text-muted-foreground md:text-xl">
                     {{ t("story.paragraph2") }}
                  </p>
               </div>
               <div class="flex items-center justify-center">
                  <img
                     src="/placeholder.svg?height=400&width=600"
                     alt="Our Story"
                     class="aspect-video overflow-hidden rounded-xl object-cover object-center"
                     width="600"
                     height="400" />
               </div>
            </div>
         </div>
      </section>

      <!-- Our Mission Section -->
      <section class="py-12 md:py-24 lg:py-32">
         <div class="container px-4 md:px-6">
            <div class="grid gap-6 lg:grid-cols-2 lg:gap-12">
               <div class="order-last flex items-center justify-center lg:order-first">
                  <img
                     src="/placeholder.svg?height=400&width=600"
                     alt="Our Mission"
                     class="aspect-video overflow-hidden rounded-xl object-cover object-center"
                     width="600"
                     height="400" />
               </div>
               <div class="space-y-4">
                  <div class="bg-primary/10 text-primary inline-block w-fit rounded-lg px-3 py-1 text-sm">
                     {{ t("mission.label") }}
                  </div>
                  <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                     {{ t("mission.title") }}
                  </h2>
                  <p class="text-muted-foreground md:text-xl">
                     {{ t("mission.paragraph1") }}
                  </p>
                  <p class="text-muted-foreground md:text-xl">
                     {{ t("mission.paragraph2") }}
                  </p>
               </div>
            </div>
         </div>
      </section>

      <!-- Our Values Section -->
      <section class="bg-muted/50 py-12 md:py-24 lg:py-32">
         <div class="container px-4 md:px-6">
            <div class="flex flex-col items-center justify-center space-y-4 text-center">
               <div class="space-y-2">
                  <div class="bg-primary/10 text-primary mx-auto inline-block w-fit rounded-lg px-3 py-1 text-sm">
                     {{ t("values.label") }}
                  </div>
                  <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                     {{ t("values.title") }}
                  </h2>
                  <p class="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
                     {{ t("values.description") }}
                  </p>
               </div>
            </div>
            <div class="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
               <Card v-for="i in 6" :key="i" class="flex flex-col items-center text-center">
                  <div class="bg-primary/10 flex h-20 w-20 min-w-20 items-center justify-center rounded-full">
                     <component :is="valueIcons[i - 1]" class="text-primary h-10 w-10" />
                  </div>
                  <CardTitle class="mt-4">{{ t(`values.items.${i - 1}.title`) }}</CardTitle>

                  <CardContent>
                     <p class="text-muted-foreground">{{ t(`values.items.${i - 1}.description`) }}</p>
                  </CardContent>
               </Card>
            </div>
         </div>
      </section>

      <!-- Stats Section -->
      <section class="py-12 md:py-24 lg:py-32">
         <div class="container px-4 md:px-6">
            <div class="flex flex-col items-center justify-center space-y-4 text-center">
               <div class="space-y-2">
                  <div class="bg-primary/10 text-primary mx-auto inline-block w-fit rounded-lg px-3 py-1 text-sm">
                     {{ t("stats.label") }}
                  </div>
                  <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                     {{ t("stats.title") }}
                  </h2>
                  <p class="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
                     {{ t("stats.description") }}
                  </p>
               </div>
            </div>
            <div class="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
               <Card v-for="i in 4" :key="i" class="flex flex-col items-center text-center">
                  <div class="text-primary text-4xl font-bold">{{ t(`stats.items.${i - 1}.value`) }}</div>
                  <CardContent>
                     <p class="text-lg font-medium">{{ t(`stats.items.${i - 1}.label`) }}</p>
                     <p class="text-muted-foreground text-sm">{{ t(`stats.items.${i - 1}.description`) }}</p>
                  </CardContent>
               </Card>
            </div>
         </div>
      </section>

      <!-- CTA Section -->
      <section class="bg-muted/50 py-12 md:py-24 lg:py-32">
         <div class="container px-4 md:px-6">
            <div class="flex flex-col items-center justify-center space-y-4 text-center">
               <div class="space-y-2">
                  <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                     {{ t("cta.title") }}
                  </h2>
                  <p class="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
                     {{ t("cta.description") }}
                  </p>
               </div>
               <div class="flex flex-col gap-2 min-[400px]:flex-row">
                  <NuxtLink to="/create">
                     <Button size="lg">
                        {{ t("cta.primaryButton") }}
                     </Button>
                  </NuxtLink>
                  <NuxtLink to="/contact">
                     <Button size="lg" variant="outline">
                        {{ t("cta.secondaryButton") }}
                     </Button>
                  </NuxtLink>
               </div>
            </div>
         </div>
      </section>
   </div>
</template>

<script setup lang="ts">
import { Heart, Shield, Zap, Users, Target, Globe } from "lucide-vue-next";

const valueIcons = [Heart, Shield, Zap, Users, Target, Globe];

const { t } = useI18n();

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
      "hero": {
         "title": "О FindMyStuff QR",
         "description": "Наша миссия — помогать людям возвращать потерянные ценные вещи с помощью инновационной технологии QR-кодов."
      },
      "story": {
         "label": "Наша история",
         "title": "Как всё начиналось",
         "paragraph1": "FindMyStuff QR родился из личного опыта. Наш основатель потерял ноутбук во время деловой поездки и понял, что нет эффективного способа для нашедшего вернуть его анонимно. Это породило идею простой системы QR-кодов, которая могла бы соединять нашедших с владельцами, защищая при этом конфиденциальность каждого.",
         "paragraph2": "Основанная в 2022 году, наша компания выросла из небольшого стартапа в надежный сервис, которым пользуются тысячи людей по всему миру. Наша команда увлечена созданием практичных решений, которые реально меняют жизнь людей к лучшему."
      },
      "mission": {
         "label": "Наша миссия",
         "title": "Воссоединение людей с их ценностями",
         "paragraph1": "В FindMyStuff QR наша миссия проста: помогать людям возвращать потерянные вещи с помощью доступной технологии, ориентированной на конфиденциальность. Мы верим, что потеря вещи не должна означать потерю навсегда.",
         "paragraph2": "Мы стремимся создать глобальное сообщество отзывчивых людей, которые могут легко вернуть потерянные вещи их законным владельцам. Устраняя барьеры для общения и защищая конфиденциальность, мы делаем процесс возврата потерянных вещей простым и безопасным."
      },
      "values": {
         "label": "Наши ценности",
         "title": "За что мы выступаем",
         "description": "Эти основные принципы определяют всё, что мы делаем в FindMyStuff QR.",
         "items": [
            {
               "title": "Эмпатия",
               "description": "Мы понимаем стресс и разочарование от потери ценных вещей и разрабатываем наш сервис с учетом эмоциональных потребностей пользователей."
            },
            {
               "title": "Конфиденциальность",
               "description": "Мы стремимся защищать личную информацию наших пользователей и давать им контроль над тем, чем они делятся."
            },
            {
               "title": "Инновации",
               "description": "Мы постоянно совершенствуем нашу технологию, чтобы сделать процесс возврата потерянных вещей более эффективным."
            },
            {
               "title": "Сообщество",
               "description": "Мы верим в силу взаимопомощи и работаем над созданием глобального сообщества добрых самаритян."
            },
            {
               "title": "Простота",
               "description": "Мы стремимся сделать наш сервис интуитивно понятным и простым в использовании для всех, независимо от технических навыков."
            },
            {
               "title": "Глобальный охват",
               "description": "Мы создаем сервис, который работает в любой точке мира, преодолевая языковые и географические барьеры."
            }
         ]
      },
      "stats": {
         "label": "Наше влияние",
         "title": "Меняем мир к лучшему",
         "description": "С момента запуска мы помогли тысячам людей вернуть их потерянные вещи.",
         "items": [
            {
               "value": "50K+",
               "label": "QR-кодов создано",
               "description": "Уникальных QR-кодов, сгенерированных нашими пользователями"
            },
            {
               "value": "15K+",
               "label": "Вещей возвращено",
               "description": "Успешно возвращено их владельцам"
            },
            {
               "value": "120+",
               "label": "Стран",
               "description": "Где активно используется наш сервис"
            },
            {
               "value": "98%",
               "label": "Уровень удовлетворенности",
               "description": "От наших пользователей по всему миру"
            }
         ]
      },
      "cta": {
         "title": "Готовы защитить свои вещи?",
         "description": "Создайте свой первый QR-код сегодня и увеличьте шансы на возврат потерянных вещей.",
         "primaryButton": "Создать QR-код",
         "secondaryButton": "Связаться с нами"
      },
      "meta": {
         "title": "О нас - FindMyStuff QR",
         "description": "Узнайте о FindMyStuff QR, нашей миссии, ценностях и команде, стоящей за нашим сервисом QR-кодов для потерянных вещей."
      }
   },
   "en": {
      "hero": {
         "title": "About FindMyStuff QR",
         "description": "We're on a mission to help people recover their lost valuables through innovative QR code technology."
      },
      "story": {
         "label": "Our Story",
         "title": "How It All Started",
         "paragraph1": "FindMyStuff QR was born out of a personal experience. Our founder lost his laptop during a business trip and realized there was no effective way for someone who found it to return it anonymously. This sparked the idea for a simple QR code system that could connect finders with owners while protecting everyone's privacy.",
         "paragraph2": "Founded in 2022, we've grown from a small startup to a trusted service used by thousands of people worldwide. Our team is passionate about creating practical solutions that make a real difference in people's lives."
      },
      "mission": {
         "label": "Our Mission",
         "title": "Reuniting People With Their Valuables",
         "paragraph1": "At FindMyStuff QR, our mission is simple: to help people recover their lost belongings through accessible, privacy-focused technology. We believe that losing an item shouldn't mean losing it forever.",
         "paragraph2": "We're committed to creating a global community of helpful individuals who can easily return lost items to their rightful owners. By removing barriers to communication while protecting privacy, we make the process of returning lost items simple and secure."
      },
      "values": {
         "label": "Our Values",
         "title": "What We Stand For",
         "description": "These core principles guide everything we do at FindMyStuff QR.",
         "items": [
            {
               "title": "Empathy",
               "description": "We understand the stress and frustration of losing valuable items and design our service with users' emotional needs in mind."
            },
            {
               "title": "Privacy",
               "description": "We're committed to protecting our users' personal information and giving them control over what they share."
            },
            {
               "title": "Innovation",
               "description": "We continuously improve our technology to make the process of recovering lost items more efficient and effective."
            },
            {
               "title": "Community",
               "description": "We believe in the power of people helping people and work to foster a global community of good samaritans."
            },
            {
               "title": "Simplicity",
               "description": "We strive to make our service intuitive and easy to use for everyone, regardless of technical ability."
            },
            {
               "title": "Global Reach",
               "description": "We're building a service that works anywhere in the world, breaking down language and geographic barriers."
            }
         ]
      },
      "stats": {
         "label": "Our Impact",
         "title": "Making a Difference",
         "description": "Since our launch, we've helped thousands of people recover their lost items.",
         "items": [
            {
               "value": "50K+",
               "label": "QR Codes Created",
               "description": "Unique QR codes generated by our users"
            },
            {
               "value": "15K+",
               "label": "Items Recovered",
               "description": "Successfully returned to their owners"
            },
            {
               "value": "120+",
               "label": "Countries",
               "description": "Where our service is actively used"
            },
            {
               "value": "98%",
               "label": "Satisfaction Rate",
               "description": "From our users worldwide"
            }
         ]
      },
      "cta": {
         "title": "Ready to Secure Your Belongings?",
         "description": "Create your first QR code today and increase the chances of recovering your lost items.",
         "primaryButton": "Create QR Code",
         "secondaryButton": "Contact Us"
      },
      "meta": {
         "title": "About Us - FindMyStuff QR",
         "description": "Learn about FindMyStuff QR, our mission, values, and the team behind our QR code service for lost items."
      }
   }
}
</i18n>
