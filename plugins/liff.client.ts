import { useLiff } from "~/features/auth/composables/useLiff";
import { useAuthStore } from "~/features/auth/store/useAuthStore";

export default defineNuxtPlugin(async () => {
  const { $config } = useNuxtApp();
  const { initLiff, getProfile, isLoggedIn } = useLiff();
  const authStore = useAuthStore();

  // LIFF ID を環境変数またはランタイム設定から取得
  const liffId = $config.public.liffId || process.env.NUXT_PUBLIC_LIFF_ID;

  if (liffId && typeof liffId === 'string') {
    authStore.setLoading(true);

    const success = await initLiff(liffId);

    if (success && isLoggedIn.value) {
      const profile = await getProfile();
      await authStore.updateProfile(profile);
    }

    authStore.setLoading(false);
  }
});
