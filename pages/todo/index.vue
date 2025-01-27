<script setup>
import TodoList from "~/features/todo/components/TodoList.vue";
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">タスク管理</h1>
    <TodoList />
  </div>
</template>

<style scoped>
.task-manager {
  max-width: 600px;
  margin: 0 auto;
}
</style>
