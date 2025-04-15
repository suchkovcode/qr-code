<template>
   <section class="container py-10">
      <div class="mx-auto max-w-5xl space-y-8">
         <div class="space-y-2">
            <h1 class="text-3xl font-bold tracking-tight">{{ t("dashboard") }}</h1>
            <p class="text-muted-foreground">{{ t("dashboardDescription") }}</p>
         </div>

         <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
               <CardHeader>
                  <CardTitle>{{ t("qrCodes") }}</CardTitle>
                  <CardDescription>{{ t("qrCodesDescription") }}</CardDescription>
               </CardHeader>
               <CardContent>
                  <div class="text-3xl font-bold">0</div>
               </CardContent>
               <CardFooter>
                  <Button asChild>
                     <NuxtLink to="/create">{{ t("createQR") }}</NuxtLink>
                  </Button>
               </CardFooter>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>{{ t("scans") }}</CardTitle>
                  <CardDescription>{{ t("scansDescription") }}</CardDescription>
               </CardHeader>
               <CardContent>
                  <div class="text-3xl font-bold">0</div>
               </CardContent>
               <CardFooter>
                  <Button variant="outline" asChild>
                     <NuxtLink to="/">{{ t("viewStats") }}</NuxtLink>
                  </Button>
               </CardFooter>
            </Card>

            <Card>
               <CardHeader>
                  <CardTitle>{{ t("account") }}</CardTitle>
                  <CardDescription>{{ t("accountDescription") }}</CardDescription>
               </CardHeader>
            </Card>
         </div>

         <div class="mt-8">
            <Card>
               <CardHeader>
                  <CardTitle>{{ t("recentActivity") }}</CardTitle>
                  <CardDescription>{{ t("recentActivityDescription") }}</CardDescription>
               </CardHeader>
               <CardContent>
                  <div class="text-muted-foreground flex items-center justify-center p-8 text-center">
                     <p>{{ t("noActivity") }}</p>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   </section>
</template>

<script setup lang="ts">
const { t } = useI18n();

useHead({
   title: "Dashboard - FindMyStuff QR",
});
</script>

<i18n lang="json">
{
   "ru": {
      "dashboard": "Панель управления",
      "dashboardDescription": "Обзор всей вашей активности и статистики.",
      "qrCodes": "QR-коды",
      "qrCodesDescription": "Общее количество созданных QR-кодов",
      "createQR": "Создать QR-код",
      "scans": "Сканирования",
      "scansDescription": "Общее количество сканирований ваших QR-кодов",
      "viewStats": "Просмотр статистики",
      "account": "Аккаунт",
      "accountDescription": "Информация о вашем аккаунте",
      "editProfile": "Редактировать профиль",
      "recentActivity": "Недавняя активность",
      "recentActivityDescription": "Последние сканирования ваших QR-кодов",
      "noActivity": "Пока нет активности для отображения.",
      "title": "Ваши QR-коды",
      "description": "Управляйте всеми вашими сгенерированными QR-кодами.",
      "noQRCodes": "Вы еще не создали ни одного QR-кода.",
      "createButton": "Создать новый QR-код",
      "table": {
         "name": "Название",
         "created": "Создан",
         "scans": "Сканирований",
         "status": "Статус",
         "actions": "Действия"
      },
      "status": {
         "active": "Активен",
         "inactive": "Неактивен"
      }
   },
   "en": {
      "dashboard": "Dashboard",
      "dashboardDescription": "Overview of all your activity and statistics.",
      "qrCodes": "QR Codes",
      "qrCodesDescription": "Total number of QR codes created",
      "createQR": "Create QR Code",
      "scans": "Scans",
      "scansDescription": "Total number of scans of your QR codes",
      "viewStats": "View Statistics",
      "account": "Account",
      "accountDescription": "Your account information",
      "editProfile": "Edit Profile",
      "recentActivity": "Recent Activity",
      "recentActivityDescription": "Latest scans of your QR codes",
      "noActivity": "No activity to display yet.",
      "title": "Your QR Codes",
      "description": "Manage all your generated QR codes.",
      "noQRCodes": "You haven't created any QR codes yet.",
      "createButton": "Create New QR Code",
      "table": {
         "name": "Name",
         "created": "Created",
         "scans": "Scans",
         "status": "Status",
         "actions": "Actions"
      },
      "status": {
         "active": "Active",
         "inactive": "Inactive"
      }
   }
}
</i18n>
