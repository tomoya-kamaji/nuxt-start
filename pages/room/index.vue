<script setup>
import { ref } from "vue";
import { useSnackbar } from "~/composables/useSnackbar";
import { CreateRoomForm } from "./components";
const { showSnackbar } = useSnackbar();

// ルーム名の状態管理
const roomName = ref("");

// ルーム一覧の取得
const { data: roomData, pending } = await useFetch("/api/rooms", {
  watch: true,
});

// ルーム作成のAPI呼び出し
const createRoom = async () => {
  try {
    const { data } = await useFetch("/api/rooms", {
      method: "POST",
      body: {
        name: roomName.value,
      },
    });

    if (data.value?.room) {
      showSnackbar("ルームを作成しました", "success");
      roomName.value = ""; // フォームをリセット
    }
  } catch (e) {
    console.error(e);
    showSnackbar("ルームの作成に失敗しました", "error");
  }
};
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4"
  >
    <div v-if="pending">
      <LoadingIndicator />
    </div>
    <div v-else class="w-full max-w-md">
      <!-- ルーム作成フォーム -->
      <CreateRoomForm v-model="roomName" @create-room="createRoom" />
      <!-- ルーム一覧 -->
      <!-- <RoomList :rooms="roomData?.rooms || []" /> -->
    </div>
  </div>
</template>
