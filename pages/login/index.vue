<script setup>
const authStore = useAuthStore();
const { login, logout, isInitialized, isInClient } = useAuth();

const handleLogin = async () => {
  console.log("Login button clicked");
  await login();
};

const handleLogout = () => {
  logout();
};
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          ログイン
        </h2>
      </div>

      <!-- デバッグ情報 -->
      <div class="p-4 bg-gray-100 rounded text-sm">
        <p><strong>デバッグ情報:</strong></p>
        <p>LIFF初期化済み: {{ isInitialized }}</p>
        <p>ログイン状態: {{ authStore.isLoggedIn }}</p>
        <p>認証済み: {{ authStore.isAuthenticated }}</p>
        <p>LINEクライアント内: {{ isInClient }}</p>
        <p>読み込み中: {{ authStore.isLoading }}</p>
        <p>表示名: {{ authStore.profile?.displayName }}</p>
      </div>

      <div v-if="authStore.isLoading" class="text-center">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
        ></div>
        <p class="mt-2 text-sm text-gray-600">読み込み中...</p>
      </div>

      <div v-else-if="!authStore.isAuthenticated" class="text-center">
        <button
          @click="handleLogin"
          class="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          LINEでログイン
        </button>
      </div>

      <div v-else class="text-center space-y-4">
        <div class="p-4 bg-blue-100 rounded">
          <p class="text-sm text-gray-700">ログイン済み</p>
          <p class="font-semibold">{{ authStore.displayName }}</p>
        </div>

        <div class="space-x-4">
          <button
            @click="navigateTo('/')"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ホームへ
          </button>

          <button
            @click="handleLogout"
            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            ログアウト
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
