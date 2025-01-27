<script setup>
import { ref } from "vue";
import TodoItem from "./TodoItem.vue";
import TodoForm from "./TodoForm.vue";
import { useTodo } from "../composables/useTodo";

const { tasks, addTask, deleteTask, toggleTask } = useTodo();

// FormからTodoListへのイベントハンドラ
const handleAddTask = (title) => {
  addTask(title);
};

// ItemからTodoListへのイベントハンドラ
const handleDeleteTask = (taskId) => {
  deleteTask(taskId);
};

const handleToggleTask = (taskId) => {
  toggleTask(taskId);
};
</script>

<template>
  <div class="task-manager">
    <!-- Formコンポーネントは新規タスクの入力のみを担当 -->
    <TodoForm @submit="handleAddTask" />

    <ul class="space-y-2">
      <!-- Itemコンポーネントは個別のタスク表示のみを担当 -->
      <TodoItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @delete-task="handleDeleteTask"
        @toggle-task="handleToggleTask"
      />
    </ul>
  </div>
</template>

<style scoped>
.task-manager {
  max-width: 600px;
  margin: 0 auto;
}
</style>
