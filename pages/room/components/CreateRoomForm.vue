<script setup lang="ts">
interface Props {
  roomName: string;
}
const { roomName } = defineProps<Props>();

// イベントの命名を統一
const UPDATE_MODEL_VALUE = "update:modelValue";
const CREATE_ROOM = "create-room";
interface Emits {
  (e: typeof UPDATE_MODEL_VALUE, value: string): void;
  (e: typeof CREATE_ROOM): void;
}

const emits = defineEmits<Emits>();

watchEffect(() => {
  console.log(roomName);
});
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emits(UPDATE_MODEL_VALUE, target.value);
};

const handleCreateRoom = () => {
  emits(CREATE_ROOM);
};
</script>

<template>
  <div class="mb-6 rounded-lg bg-white p-6 shadow-md">
    <h2 class="mb-4 text-xl font-bold">新しいルームを作成</h2>
    <div class="flex gap-2">
      <input
        type="text"
        :value="roomName"
        @input="handleInput"
        placeholder="ルーム名を入力"
        class="flex-1 rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />
      <Button variant="primary" @click="handleCreateRoom" :disabled="!roomName">
        作成
      </Button>
    </div>
  </div>
</template>
