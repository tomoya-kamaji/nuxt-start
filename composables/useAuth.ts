import liff from "@line/liff";
import { useAuthStore, type UserProfile } from "~/composables/auth";

// LIFF操作専用のcomposable (状態は持たない)
export const useAuth = () => {
  const authStore = useAuthStore();
  const isInitialized = ref(false);

  // LIFF初期化
  const initLiff = async (): Promise<boolean> => {
    if (isInitialized.value) return true;

    const { $config } = useNuxtApp();
    const liffId = $config.public.liffId;

    if (!liffId) {
      console.error("LIFF ID not found");
      return false;
    }

    try {
      authStore.setLoading(true);
      console.log("Initializing LIFF...");

      await liff.init({ liffId });
      isInitialized.value = true;

      // 初期化後、ログイン状態をチェック
      if (liff.isLoggedIn()) {
        await syncProfile();
      }

      console.log("LIFF initialized successfully");
      return true;
    } catch (error) {
      console.error("LIFF initialization failed:", error);
      return false;
    } finally {
      authStore.setLoading(false);
    }
  };

  // プロフィール同期 (LIFF → Pinia)
  const syncProfile = async () => {
    if (!liff.isLoggedIn()) {
      authStore.logout();
      return;
    }

    try {
      const userProfile = await liff.getProfile();
      const profile: UserProfile = {
        userId: userProfile.userId,
        displayName: userProfile.displayName,
        pictureUrl: userProfile.pictureUrl,
        statusMessage: userProfile.statusMessage,
      };

      authStore.setProfile(profile);
      console.log("Profile synced:", profile);
    } catch (error) {
      console.error("Failed to sync profile:", error);
    }
  };

  // ログイン
  const login = async () => {
    console.log("Login called");

    // 初期化されていない場合は初期化
    if (!isInitialized.value) {
      const success = await initLiff();
      if (!success) return;
    }

    if (liff.isLoggedIn()) {
      console.log("Already logged in");
      await syncProfile();
      return;
    }

    // 外部ブラウザの場合はLINEログインページにリダイレクト
    if (!liff.isInClient()) {
      console.log("Redirecting to LINE login");
      liff.login({ redirectUri: window.location.href });
    } else {
      console.log("In LINE app, should auto login");
    }
  };

  // ログアウト
  const logout = () => {
    if (isInitialized.value) {
      liff.logout();
    }
    authStore.logout();
  };

  // アクセストークン取得
  const getAccessToken = (): string | null => {
    if (!isInitialized.value || !liff.isLoggedIn()) return null;
    return liff.getAccessToken();
  };

  return {
    // LIFF状態
    isInitialized: readonly(isInitialized),
    isInClient: computed(() =>
      isInitialized.value ? liff.isInClient() : false
    ),

    // Actions
    initLiff,
    login,
    logout,
    syncProfile,
    getAccessToken,
  };
};
