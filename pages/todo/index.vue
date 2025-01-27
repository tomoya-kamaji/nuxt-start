<script setup>
import { ref } from "vue";

const newTask = ref("");
const tasks = ref([
  { id: 1, title: "タスク1", completed: false },
  { id: 2, title: "タスク2", completed: false },
]);

const addTask = () => {
  if (newTask.value.trim()) {
    tasks.value.push({
      id: Date.now(),
      title: newTask.value,
      completed: false,
    });
    newTask.value = "";
  }
};

const deleteTask = (taskId) => {
  tasks.value = tasks.value.filter((task) => task.id !== taskId);
};
</script>

<style scoped>
.task-manager {
  max-width: 600px;
  margin: 0 auto;
}
</style>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">タスク管理</h1>
    <div class="task-manager">
      <div class="mb-4">
        <input
          v-model="newTask"
          @keyup.enter="addTask"
          type="text"
          placeholder="新しいタスクを入力"
          class="border p-2 rounded w-full"
        />
      </div>
      <ul class="space-y-2">
        <li
          v-for="task in tasks"
          :key="task.id"
          class="flex items-center gap-2 p-2 border rounded"
        >
          <input type="checkbox" v-model="task.completed" class="h-4 w-4" />
          <span :class="{ 'line-through': task.completed }">{{
            task.title
          }}</span>
          <button
            @click="deleteTask(task.id)"
            class="ml-auto text-red-500 hover:text-red-700"
          >
            削除
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
