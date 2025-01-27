<script setup>
import { ref } from "vue";

// propsとemitsを明示的に定義
defineEmits(["submit"]);

const newTask = ref("");

const handleSubmit = () => {
  if (newTask.value.trim()) {
    // 親コンポーネントにタイトルを送信
    emit("submit", newTask.value);
    newTask.value = "";
  }
};
</script>

<template>
  <div class="mb-4">
    <input
      v-model="newTask"
      @keyup.enter="handleSubmit"
      type="text"
      placeholder="新しいタスクを入力"
      class="border p-2 rounded w-full"
    />
  </div>
</template>
