export default defineNuxtRouteMiddleware((to, from) => {
   const token = useCookie("token");

   const isAuthPath = to.path.startsWith("/auth");
   const isEnglishPath = to.path.startsWith("/en/");

   if (!isAuthPath && !isEnglishPath) {
      return;
   }

   if (!token.value && to.path !== "/login") {
      return navigateTo("/login");
   }
});
