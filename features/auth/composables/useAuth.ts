import { useLiff } from "~/features/auth/composables/useLiff";
import { useAuthStore } from "~/features/auth/store/useAuthStore";

export const useAuth = () => {
  const authStore = useAuthStore();
  const {
    login: liffLogin,
    logout: liffLogout,
    getProfile,
    isLoggedIn: liffIsLoggedIn,
  } = useLiff();

  const login = async () => {
    liffLogin();
  };

  const logout = () => {
    liffLogout();
    authStore.logout();
  };

  const refreshProfile = async () => {
    if (liffIsLoggedIn.value) {
      const profile = await getProfile();
      await authStore.updateProfile(profile);
    }
  };

  return {
    // State
    isLoggedIn: computed(() => authStore.isAuthenticated),
    profile: computed(() => authStore.profile),
    isLoading: computed(() => authStore.isLoading),
    userId: computed(() => authStore.userId),
    displayName: computed(() => authStore.displayName),
    pictureUrl: computed(() => authStore.pictureUrl),

    // Actions
    login,
    logout,
    refreshProfile,
  };
};
