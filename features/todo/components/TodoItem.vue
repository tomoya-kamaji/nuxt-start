<script setup>
// propsとemitsを明示的に定義
defineProps({
  task: {
    type: Object,
    required: true,
  },
});

defineEmits(["delete-task", "toggle-task"]);
</script>

<template>
  <li class="flex items-center gap-2 p-2 border rounded">
    <input
      type="checkbox"
      :checked="task.completed"
      @change="$emit('toggle-task', task.id)"
      class="h-4 w-4"
    />
    <span :class="{ 'line-through': task.completed }">
      {{ task.title }}
    </span>
    <button
      @click="$emit('delete-task', task.id)"
      class="ml-auto text-red-500 hover:text-red-700"
    >
      削除
    </button>
  </li>
</template>
