import { useAuth } from "~/features/auth/composables/useAuth";

export default defineNuxtRouteMiddleware(() => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn.value) {
    return navigateTo("/login");
  }
});
