<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

defineEmits(["update:modelValue", "create-room"]);
</script>

<template>
  <div class="mb-6 rounded-lg bg-white p-6 shadow-md">
    <h2 class="mb-4 text-xl font-bold">新しいルームを作成</h2>
    <div class="flex gap-2">
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="ルーム名を入力"
        class="flex-1 rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />
      <Button
        variant="primary"
        @click="$emit('create-room')"
        :disabled="!modelValue"
      >
        作成
      </Button>
    </div>
  </div>
</template>
