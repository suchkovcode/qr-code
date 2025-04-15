<template>
   <DropdownMenu>
      <DropdownMenuTrigger as-child>
         <Button variant="ghost" class="relative h-8 w-8 rounded-full bg-purple-600"></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56" align="end">
         <DropdownMenuItem class="cursor-pointer" @click="navigateTo('/auth/dashboard')">
            <LayoutDashboard class="mr-2 h-4 w-4" />
            <span>{{ t("dashboard") }}</span>
         </DropdownMenuItem>
         <DropdownMenuItem class="cursor-pointer" @click="navigateTo('/')">
            <User class="mr-2 h-4 w-4" />
            <span>{{ t("profile") }}</span>
         </DropdownMenuItem>
         <DropdownMenuItem class="cursor-pointer" @click="navigateTo('/')">
            <QrCode class="mr-2 h-4 w-4" />
            <span>{{ t("myQRCodes") }}</span>
         </DropdownMenuItem>
         <DropdownMenuSeparator />
         <DropdownMenuItem class="cursor-pointer" @click="handleLogout">
            <LogOut class="mr-2 h-4 w-4" />
            <span>{{ t("logout") }}</span>
         </DropdownMenuItem>
      </DropdownMenuContent>
   </DropdownMenu>
</template>

<script setup lang="ts">
import { LayoutDashboard, User, QrCode, LogOut } from "lucide-vue-next";

const props = defineProps({
   id: { type: String, required: false },
   name: { type: String, required: false },
   email: { type: String, required: false },
});

const { signOut } = useSignOut();
const { t } = useI18n();
const router = useRouter();

const handleLogout = (): void => {
   signOut();
   router.push("/");
};
</script>

<i18n lang="json">
{
   "ru": {
      "dashboard": "Панель управления",
      "profile": "Профиль",
      "myQRCodes": "Мои QR-коды",
      "logout": "Выход"
   },
   "en": {
      "dashboard": "Dashboard",
      "profile": "Profile",
      "myQRCodes": "My QR Codes",
      "logout": "Logout"
   }
}
</i18n>
