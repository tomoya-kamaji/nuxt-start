<!-- src/features/user/components/Step1.vue -->
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRegistrationStore } from "@/features/user/store/useRegistrationStore";
import { type RegistrationStep1Form } from "@/features/user/types/registration";
import { validateRegistrationStep1 } from "@/features/user/util/validation";
import { RegistrationSteps } from "@/features/user/store/useRegistrationStore";
import { StepIndicator } from "@/features/user/components";
const router = useRouter();
const store = useRegistrationStore();

// フォームの初期値
const form = ref<RegistrationStep1Form>({
  username: store.basicInfo?.username || "",
  email: store.basicInfo?.email || "",
  password: store.basicInfo?.password || "",
});

// エラーオブジェクト
const errors = ref<Partial<Record<keyof RegistrationStep1Form, string>>>({});

const handleSubmit = () => {
  const { valid, errors: validationErrors } = validateRegistrationStep1(
    form.value
  );
  if (!valid) {
    errors.value = validationErrors;
    return;
  }
  errors.value = {};
  store.setStateDateStep1(form.value);
  store.nextStep();
  router.push("/user/step2");
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-3xl mx-auto">
      <StepIndicator
        :current-step="store.currentStep"
        :steps="RegistrationSteps"
      />
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold mb-6">基本情報</h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- ユーザー名 -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >ユーザー名</label
            >
            <input
              v-model="form.username"
              type="text"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              :class="{ 'border-red-500': errors.username }"
            />
            <p v-if="errors.username" class="mt-1 text-sm text-red-600">
              {{ errors.username }}
            </p>
          </div>
          <!-- メールアドレス -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >メールアドレス</label
            >
            <input
              v-model="form.email"
              type="email"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>
          <!-- パスワード -->
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >パスワード</label
            >
            <input
              v-model="form.password"
              type="password"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              :class="{ 'border-red-500': errors.password }"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">
              {{ errors.password }}
            </p>
          </div>
          <div class="flex justify-end mt-6">
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
