import { useAuth } from "~/composables/useAuth";

export default defineNuxtPlugin(async () => {
  const { initLiff } = useAuth();

  // アプリ起動時にLIFF初期化
  await initLiff();
});
