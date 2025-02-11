<script setup lang="ts">
// APIのレスポンス型を定義
interface SSRData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// useFetchで型を指定して使用
const {
  data: ssrData,
  error,
  status,
} = await useFetch<SSRData>("https://jsonplaceholder.typicode.com/posts/1", {
  async transform(data) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return data;
  },
});
</script>

<template>
  <div>
    <h1>SSRテスト</h1>
    <div v-if="error">
      <p class="error">エラーが発生しました: {{ error.message }}</p>
    </div>
    <div v-else>
      <h2>タイトル: {{ ssrData?.title }}</h2>
      <p>内容: {{ ssrData?.body }}</p>
      <p v-if="status === 'pending'">データを取得中...</p>
    </div>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
