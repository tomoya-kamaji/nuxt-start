<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          ログイン
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          LINEアカウントでログインしてください
        </p>
      </div>
      
      <div v-if="isLoading" class="text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p class="mt-2 text-sm text-gray-600">読み込み中...</p>
      </div>
      
      <div v-else-if="!isLoggedIn" class="text-center">
        <button
          @click="handleLogin"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          LINEでログイン
        </button>
      </div>
      
      <div v-else class="text-center">
        <p class="text-sm text-gray-600">ログイン済みです</p>
        <button
          @click="navigateTo('/')"
          class="mt-2 text-indigo-600 hover:text-indigo-500"
        >
          ホームに戻る
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { login, isLoggedIn, isLoading } = useAuth()

const handleLogin = async () => {
  await login()
}

// ログイン済みの場合は自動でリダイレクト
watch(isLoggedIn, (newValue) => {
  if (newValue) {
    navigateTo('/')
  }
}, { immediate: true })
</script>