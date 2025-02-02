<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import {
  useRegistrationStore,
  RegistrationSteps,
} from "@/features/user/store/useRegistrationStore";
import type { RegistrationStep2Form } from "@/features/user/types/registration";
import { validateRegistrationStep2 } from "@/features/user/util/validation";
import { StepIndicator } from "@/features/user/components";

const router = useRouter();
const store = useRegistrationStore();

// データが不正ならステップを戻る
store.checkStepDataAndGoBack();

// フォームの初期値の定義
const form = ref<RegistrationStep2Form>({
  firstName: store.profile?.firstName || "",
  lastName: store.profile?.lastName || "",
  birthDate: store.profile?.birthDate || "",
  occupation: store.profile?.occupation || "",
});

// バリデーションエラーを管理するオブジェクト
const errors = ref<Partial<Record<keyof RegistrationStep2Form, string>>>({});

const handleSubmit = () => {
  const { valid, errors: validationErrors } = validateRegistrationStep2(
    form.value
  );
  if (!valid) {
    errors.value = validationErrors;
    return;
  }
  errors.value = {};
  store.setStateDateStep2(form.value);
  store.nextStep();
  router.push("/user/step3");
};

const goBack = () => {
  store.previousStep();
  router.push("/user/step1");
};
</script>

<style scoped>
.min-h-screen {
  min-height: 100vh;
}
</style>

<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-3xl mx-auto">
      <StepIndicator
        :current-step="store.currentStep"
        :steps="RegistrationSteps"
      />
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold mb-6">プロフィール情報</h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- 姓 -->
          <div>
            <label class="block text-sm font-medium text-gray-700">姓</label>
            <input
              v-model="form.firstName"
              type="text"
              placeholder="姓を入力してください"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              :class="{ 'border-red-500': errors.firstName }"
              required
            />
            <p v-if="errors.firstName" class="mt-1 text-sm text-red-600">
              {{ errors.firstName }}
            </p>
          </div>
          <!-- 名 -->
          <div>
            <label class="block text-sm font-medium text-gray-700">名</label>
            <input
              v-model="form.lastName"
              type="text"
              placeholder="名を入力してください"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              :class="{ 'border-red-500': errors.lastName }"
              required
            />
            <p v-if="errors.lastName" class="mt-1 text-sm text-red-600">
              {{ errors.lastName }}
            </p>
          </div>
          <!-- 生年月日 -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >生年月日</label
            >
            <input
              v-model="form.birthDate"
              type="date"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              :class="{ 'border-red-500': errors.birthDate }"
              required
            />
            <p v-if="errors.birthDate" class="mt-1 text-sm text-red-600">
              {{ errors.birthDate }}
            </p>
          </div>
          <!-- 職業 -->
          <div>
            <label class="block text-sm font-medium text-gray-700">職業</label>
            <input
              v-model="form.occupation"
              type="text"
              placeholder="職業を入力してください"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              :class="{ 'border-red-500': errors.occupation }"
              required
            />
            <p v-if="errors.occupation" class="mt-1 text-sm text-red-600">
              {{ errors.occupation }}
            </p>
          </div>
          <!-- ナビゲーションボタン -->
          <div class="flex justify-between mt-6">
            <button
              type="button"
              @click="goBack"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              戻る
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              次へ
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
