<script setup lang="ts">
import { ref } from "vue";
import { CreateRoomForm } from "./components";

// ルーム名の状態管理
const roomName = ref("");

// ルーム一覧の取得
const { data: roomData } = await useFetch("/api/rooms", {
  watch: false,
});

const createRoom = async () => {
  console.log("createRoom");
};
</script>

<template>
  <div
    class="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4"
  >
    <CreateRoomForm :roomName="roomName" @create-room="createRoom" />
  </div>
</template>
