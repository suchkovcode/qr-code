<template>
   <section class="bg-background py-12 md:py-24 lg:py-32">
      <div class="container px-4 md:px-6">
         <div class="mx-auto max-w-4xl space-y-8">
            <!-- Page Header -->
            <div class="space-y-2 text-center">
               <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {{ t("title") }}
               </h1>
               <p class="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
                  {{ t("description") }}
               </p>
            </div>

            <!-- Contact Form -->
            <Card>
               <CardHeader>
                  <CardTitle>{{ t("form.title") }}</CardTitle>
                  <CardDescription>{{ t("form.description") }}</CardDescription>
               </CardHeader>
               <CardContent>
                  <Form @submit="onSubmit" :validation-schema="formSchema" v-slot="{ errors, isSubmitting }">
                     <div class="grid gap-6 sm:grid-cols-2">
                        <FormField name="name" v-slot="{ field, errorMessage }">
                           <FormItem>
                              <FormLabel>{{ t("form.name.label") }}</FormLabel>
                              <FormControl>
                                 <Input v-bind="field" :placeholder="t('form.name.placeholder')" />
                              </FormControl>
                              <FormMessage>{{ errorMessage }}</FormMessage>
                           </FormItem>
                        </FormField>

                        <FormField name="email" v-slot="{ field, errorMessage }">
                           <FormItem>
                              <FormLabel>{{ t("form.email.label") }}</FormLabel>
                              <FormControl>
                                 <Input v-bind="field" type="email" :placeholder="t('form.email.placeholder')" />
                              </FormControl>
                              <FormMessage>{{ errorMessage }}</FormMessage>
                           </FormItem>
                        </FormField>
                     </div>

                     <div class="mt-6">
                        <FormField name="subject" v-slot="{ field, errorMessage }">
                           <FormItem>
                              <FormLabel>{{ t("form.subject.label") }}</FormLabel>
                              <FormControl>
                                 <Select v-bind="field">
                                    <SelectTrigger class="w-full">
                                       <SelectValue :placeholder="t('form.subject.placeholder')" />
                                    </SelectTrigger>
                                    <SelectContent>
                                       <SelectItem value="general">{{ t("form.subject.options.general") }}</SelectItem>
                                       <SelectItem value="support">{{ t("form.subject.options.support") }}</SelectItem>
                                       <SelectItem value="billing">{{ t("form.subject.options.billing") }}</SelectItem>
                                       <SelectItem value="feedback">{{ t("form.subject.options.feedback") }}</SelectItem>
                                       <SelectItem value="other">{{ t("form.subject.options.other") }}</SelectItem>
                                    </SelectContent>
                                 </Select>
                              </FormControl>
                              <FormMessage>{{ errorMessage }}</FormMessage>
                           </FormItem>
                        </FormField>
                     </div>

                     <div class="mt-6">
                        <FormField name="message" v-slot="{ field, errorMessage }">
                           <FormItem>
                              <FormLabel>{{ t("form.message.label") }}</FormLabel>
                              <FormControl>
                                 <Textarea v-bind="field" :placeholder="t('form.message.placeholder')" rows="6" />
                              </FormControl>
                              <FormMessage>{{ errorMessage }}</FormMessage>
                           </FormItem>
                        </FormField>
                     </div>

                     <Button type="submit" class="mt-8 w-full" :disabled="isSubmitting">
                        <Loader2 v-if="isSubmitting" class="mr-2 h-4 w-4 animate-spin" />
                        {{ t("form.submit") }}
                     </Button>
                  </Form>
               </CardContent>
            </Card>

            <!-- Contact Information -->
            <div class="grid gap-8 md:grid-cols-2">
               <Card>
                  <CardHeader>
                     <CardTitle>{{ t("contactInfo.title") }}</CardTitle>
                  </CardHeader>
                  <CardContent class="space-y-4">
                     <div class="flex items-start space-x-4">
                        <Mail class="text-primary h-5 w-5" />
                        <div>
                           <h3 class="font-medium">{{ t("contactInfo.email.title") }}</h3>
                           <p class="text-muted-foreground text-sm">support@findmystuffqr.com</p>
                        </div>
                     </div>
                     <div class="flex items-start space-x-4">
                        <Phone class="text-primary h-5 w-5" />
                        <div>
                           <h3 class="font-medium">{{ t("contactInfo.phone.title") }}</h3>
                           <p class="text-muted-foreground text-sm">{{ t("contactInfo.phone.value") }}</p>
                        </div>
                     </div>
                     <div class="flex items-start space-x-4">
                        <MapPin class="text-primary h-5 w-5" />
                        <div>
                           <h3 class="font-medium">{{ t("contactInfo.address.title") }}</h3>
                           <p class="text-muted-foreground text-sm">{{ t("contactInfo.address.value") }}</p>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Card>
                  <CardHeader>
                     <CardTitle>{{ t("faq.title") }}</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <Accordion type="single" collapsible class="w-full">
                        <AccordionItem v-for="(item, index) in 3" :key="index" :value="`item-${index}`">
                           <AccordionTrigger>{{ t(`faq.items.${index}.question`) }}</AccordionTrigger>
                           <AccordionContent>
                              <p>{{ t(`faq.items.${index}.answer`) }}</p>
                           </AccordionContent>
                        </AccordionItem>
                     </Accordion>
                  </CardContent>
               </Card>
            </div>
         </div>
      </div>
   </section>
</template>

<script setup lang="ts">
import { Mail, Phone, MapPin, Loader2 } from "lucide-vue-next";
import { useToast } from "@/components/ui/toast/use-toast";
import { toTypedSchema } from "@vee-validate/zod";
import { object, string } from "zod";

const { toast } = useToast();
const { t } = useI18n();

const isSubmitting = ref(false);

const formSchema = toTypedSchema(
   object({
      name: string()
         .min(2, { message: t("form.validation.name.min") })
         .max(50, { message: t("form.validation.name.max") }),
      email: string().email({ message: t("form.validation.email.invalid") }),
      subject: string({
         required_error: t("form.validation.subject.required"),
      }),
      message: string()
         .min(10, { message: t("form.validation.message.min") })
         .max(1000, { message: t("form.validation.message.max") }),
   }),
);

const onSubmit = async (values) => {
   isSubmitting.value = true;

   try {
      toast({
         title: t("notifications.success.title"),
         description: t("notifications.success.description"),
         variant: "default",
      });
   } catch (error) {
      console.error("Error submitting form:", error);
      toast({
         title: t("notifications.error.title"),
         description: t("notifications.error.description"),
         variant: "destructive",
      });
   } finally {
      isSubmitting.value = false;
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
      "title": "Свяжитесь с нами",
      "description": "Есть вопросы или нужна помощь? Свяжитесь с нашей командой, и мы ответим вам как можно скорее.",
      "form": {
         "title": "Отправьте нам сообщение",
         "description": "Заполните форму ниже, и мы ответим в течение 24-48 часов.",
         "name": {
            "label": "Имя",
            "placeholder": "Введите ваше имя"
         },
         "email": {
            "label": "Email",
            "placeholder": "Введите ваш email"
         },
         "subject": {
            "label": "Тема",
            "placeholder": "Выберите тему",
            "options": {
               "general": "Общий вопрос",
               "support": "Техническая поддержка",
               "billing": "Вопрос по оплате",
               "feedback": "Отзыв",
               "other": "Другое"
            }
         },
         "message": {
            "label": "Сообщение",
            "placeholder": "Введите ваше сообщение здесь..."
         },
         "consent": {
            "label": "Согласие на обработку данных",
            "description": "Я согласен на обработку моих персональных данных в соответствии с политикой конфиденциальности."
         },
         "submit": "Отправить сообщение",
         "validation": {
            "name": {
               "min": "Имя должно содержать не менее 2 символов",
               "max": "Имя не может превышать 50 символов"
            },
            "email": {
               "invalid": "Пожалуйста, введите действительный email адрес"
            },
            "subject": {
               "required": "Пожалуйста, выберите тему"
            },
            "message": {
               "min": "Сообщение должно содержать не менее 10 символов",
               "max": "Сообщение не может превышать 1000 символов"
            }
         }
      },
      "contactInfo": {
         "title": "Контактная информация",
         "email": {
            "title": "Email"
         },
         "phone": {
            "title": "Телефон",
            "value": "+1 (555) 123-4567"
         },
         "address": {
            "title": "Адрес",
            "value": "123 QR Street, Tech City, TC 12345"
         }
      },
      "faq": {
         "title": "Часто задаваемые вопросы",
         "items": [
            {
               "question": "Как быстро я получу ответ?",
               "answer": "Мы стремимся отвечать на все запросы в течение 24-48 рабочих часов. Для срочных вопросов, пожалуйста, укажите это в теме вашего сообщения."
            },
            {
               "question": "Могу ли я получить возврат средств за мою покупку?",
               "answer": "Да, мы предлагаем 30-дневную гарантию возврата денег для всех наших премиум-планов. Пожалуйста, свяжитесь с нашей службой поддержки, указав детали вашего заказа."
            },
            {
               "question": "Предлагаете ли вы индивидуальные решения QR-кодов для бизнеса?",
               "answer": "Да, мы предоставляем индивидуальные решения QR-кодов для бизнеса любого размера. Пожалуйста, свяжитесь с нами, указав ваши конкретные требования, и наша команда разработает для вас индивидуальное решение."
            }
         ]
      },
      "notifications": {
         "success": {
            "title": "Успешно",
            "description": "Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время."
         },
         "error": {
            "title": "Ошибка",
            "description": "Возникла проблема при отправке вашего сообщения. Пожалуйста, попробуйте еще раз."
         }
      },
      "meta": {
         "title": "Связаться с нами - FindMyStuff QR",
         "description": "Свяжитесь с командой FindMyStuff QR для поддержки, вопросов или отзывов о нашем сервисе QR-кодов."
      }
   },
   "en": {
      "title": "Contact Us",
      "description": "Have questions or need assistance? Reach out to our team and we'll get back to you as soon as possible.",
      "form": {
         "title": "Send us a message",
         "description": "Fill out the form below and we'll respond within 24-48 hours.",
         "name": {
            "label": "Name",
            "placeholder": "Enter your name"
         },
         "email": {
            "label": "Email",
            "placeholder": "Enter your email"
         },
         "subject": {
            "label": "Subject",
            "placeholder": "Select a subject",
            "options": {
               "general": "General Inquiry",
               "support": "Technical Support",
               "billing": "Billing Question",
               "feedback": "Feedback",
               "other": "Other"
            }
         },
         "message": {
            "label": "Message",
            "placeholder": "Enter your message here..."
         },
         "consent": {
            "label": "Privacy Consent",
            "description": "I agree to the processing of my personal data according to the privacy policy."
         },
         "submit": "Send Message",
         "validation": {
            "name": {
               "min": "Name must be at least 2 characters",
               "max": "Name cannot exceed 50 characters"
            },
            "email": {
               "invalid": "Please enter a valid email address"
            },
            "subject": {
               "required": "Please select a subject"
            },
            "message": {
               "min": "Message must be at least 10 characters",
               "max": "Message cannot exceed 1000 characters"
            }
         }
      },
      "contactInfo": {
         "title": "Contact Information",
         "email": {
            "title": "Email"
         },
         "phone": {
            "title": "Phone",
            "value": "+1 (555) 123-4567"
         },
         "address": {
            "title": "Address",
            "value": "123 QR Street, Tech City, TC 12345"
         }
      },
      "faq": {
         "title": "Frequently Asked Questions",
         "items": [
            {
               "question": "How quickly will I receive a response?",
               "answer": "We aim to respond to all inquiries within 24-48 business hours. For urgent matters, please indicate this in your message subject."
            },
            {
               "question": "Can I get a refund for my purchase?",
               "answer": "Yes, we offer a 30-day money-back guarantee for all our premium plans. Please contact our support team with your order details for assistance."
            },
            {
               "question": "Do you offer custom QR code solutions for businesses?",
               "answer": "Yes, we provide custom QR code solutions for businesses of all sizes. Please contact us with your specific requirements, and our team will work with you to create a tailored solution."
            }
         ]
      },
      "notifications": {
         "success": {
            "title": "Success",
            "description": "Your message has been sent. We will get back to you soon."
         },
         "error": {
            "title": "Error",
            "description": "There was a problem sending your message. Please try again."
         }
      },
      "meta": {
         "title": "Contact Us - FindMyStuff QR",
         "description": "Contact the FindMyStuff QR team for support, questions, or feedback about our QR code service."
      }
   }
}
</i18n>
