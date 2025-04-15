export function useSignOut() {
   const localePath = useLocalePath();
   const router = useRouter();

   const signOut = async () => {
      try {
         await $fetch("/api/signout", { method: "post" });
         setTimeout(() => {
            router.push(localePath("/"));
         }, 200);
      } catch (error) {
         console.error("Ошибка при выходе:", error);
      }
   };

   return {
      signOut,
   };
}
