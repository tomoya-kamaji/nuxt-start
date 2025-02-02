<script setup lang="ts">
import { z } from "zod";
import { ref, computed } from "vue";

// ステップの定義
const steps = [
  {
    id: 1,
    title: "基本情報",
    description: "お客様の基本情報を入力してください",
  },
  {
    id: 2,
    title: "お問い合わせ内容",
    description: "具体的な内容を記入してください",
  },
  { id: 3, title: "確認", description: "入力内容をご確認ください" },
];

// 現在のステップ
const currentStep = ref(1);

// バリデーションスキーマの定義
const contactSchema = z.object({
  // ステップ1のフィールド
  name: z
    .string()
    .min(1, "名前は必須です")
    .max(50, "名前は50文字以内で入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスは必須です")
    .email("有効なメールアドレスを入力してください"),
  phone: z
    .string()
    .min(1, "電話番号は必須です")
    .regex(/^[0-9-]+$/, "有効な電話番号を入力してください"),

  // ステップ2のフィールド
  category: z.string().min(1, "カテゴリーを選択してください"),
  subject: z.string().min(1, "件名は必須です"),
  message: z.string().min(10, "メッセージは10文字以上で入力してください"),
});

type ContactForm = z.infer<typeof contactSchema>;

const form = ref<ContactForm>({
  name: "",
  email: "",
  phone: "",
  category: "",
  subject: "",
  message: "",
});

const errors = ref<Partial<Record<keyof ContactForm, string>>>({});

// 各ステップのフィールド定義
const stepFields = {
  1: ["name", "email", "phone"],
  2: ["category", "subject", "message"],
  3: [] as string[],
} as const;

// 現在のステップのフィールドを取得
const currentFields = computed(
  () => stepFields[currentStep.value as keyof typeof stepFields]
);

// 現在のステップのバリデーション
const validateCurrentStep = () => {
  const fields = currentFields.value;
  const currentSchema = contactSchema.pick(
    fields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
  );

  const result = currentSchema.safeParse(form.value);
  if (!result.success) {
    const formattedErrors: Partial<Record<keyof ContactForm, string>> = {};
    result.error.errors.forEach((error: any) => {
      const path = error.path[0] as keyof ContactForm;
      formattedErrors[path] = error.message;
    });
    errors.value = formattedErrors;
    return false;
  }

  errors.value = {};
  return true;
};

// 次のステップへ
const nextStep = () => {
  if (!validateCurrentStep()) return;
  if (currentStep.value < steps.length) {
    currentStep.value++;
  }
};

// 前のステップへ
const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

// フォーム送信
const handleSubmit = async () => {
  if (!validateCurrentStep()) return;

  try {
    const { error } = await useFetch("/api/contact", {
      method: "POST",
      body: form.value,
    });

    if (!error.value) {
      navigateTo("/contact/complete");
    }
  } catch (e) {
    console.error("送信エラー:", e);
  }
};

// カテゴリーの選択肢
const categories = [
  { id: "general", label: "一般的なお問い合わせ" },
  { id: "support", label: "技術サポート" },
  { id: "feedback", label: "フィードバック" },
  { id: "other", label: "その他" },
];
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="max-w-3xl mx-auto">
      <!-- ステップインジケーター -->
      <div class="mb-8">
        <div class="flex justify-between">
          <div v-for="step in steps" :key="step.id" class="flex-1">
            <div class="relative flex items-center">
              <div
                :class="[
                  'w-8 h-8 rounded-full flex items-center justify-center font-semibold',
                  step.id === currentStep
                    ? 'bg-blue-500 text-white'
                    : step.id < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-600',
                ]"
              >
                {{ step.id }}
              </div>
              <div class="ml-2">
                <div class="text-sm font-medium">{{ step.title }}</div>
                <div class="text-xs text-gray-500">{{ step.description }}</div>
              </div>
              <div
                v-if="step.id !== steps.length"
                class="flex-1 border-t border-gray-300 mx-4"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- フォームコンテンツ -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <!-- ステップ1: 基本情報 -->
        <div v-if="currentStep === 1">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >お名前</label
              >
              <input
                v-model="form.name"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                :class="{ 'border-red-500': errors.name }"
              />
              <p v-if="errors.name" class="mt-1 text-sm text-red-600">
                {{ errors.name }}
              </p>
            </div>

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

            <div>
              <label class="block text-sm font-medium text-gray-700"
                >電話番号</label
              >
              <input
                v-model="form.phone"
                type="tel"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                :class="{ 'border-red-500': errors.phone }"
              />
              <p v-if="errors.phone" class="mt-1 text-sm text-red-600">
                {{ errors.phone }}
              </p>
            </div>
          </div>
        </div>

        <!-- ステップ2: お問い合わせ内容 -->
        <div v-if="currentStep === 2">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700"
                >カテゴリー</label
              >
              <select
                v-model="form.category"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                :class="{ 'border-red-500': errors.category }"
              >
                <option value="">選択してください</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.label }}
                </option>
              </select>
              <p v-if="errors.category" class="mt-1 text-sm text-red-600">
                {{ errors.category }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700"
                >件名</label
              >
              <input
                v-model="form.subject"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                :class="{ 'border-red-500': errors.subject }"
              />
              <p v-if="errors.subject" class="mt-1 text-sm text-red-600">
                {{ errors.subject }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700"
                >メッセージ</label
              >
              <textarea
                v-model="form.message"
                rows="4"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                :class="{ 'border-red-500': errors.message }"
              ></textarea>
              <p v-if="errors.message" class="mt-1 text-sm text-red-600">
                {{ errors.message }}
              </p>
            </div>
          </div>
        </div>

        <!-- ステップ3: 確認 -->
        <div v-if="currentStep === 3">
          <div class="space-y-4">
            <div class="border rounded-lg p-4">
              <h3 class="font-medium text-lg mb-4">入力内容の確認</h3>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-500">お名前</p>
                  <p class="font-medium">{{ form.name }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">メールアドレス</p>
                  <p class="font-medium">{{ form.email }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">電話番号</p>
                  <p class="font-medium">{{ form.phone }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">カテゴリー</p>
                  <p class="font-medium">
                    {{ categories.find((c) => c.id === form.category)?.label }}
                  </p>
                </div>
                <div class="col-span-2">
                  <p class="text-sm text-gray-500">件名</p>
                  <p class="font-medium">{{ form.subject }}</p>
                </div>
                <div class="col-span-2">
                  <p class="text-sm text-gray-500">メッセージ</p>
                  <p class="font-medium whitespace-pre-wrap">
                    {{ form.message }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ナビゲーションボタン -->
        <div class="mt-6 flex justify-between">
          <button
            v-if="currentStep > 1"
            @click="prevStep"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            戻る
          </button>
          <div v-else class="w-20"></div>

          <button
            v-if="currentStep < steps.length"
            @click="nextStep"
            class="px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600"
          >
            次へ
          </button>
          <button
            v-else
            @click="handleSubmit"
            class="px-4 py-2 bg-green-500 text-white rounded-md text-sm font-medium hover:bg-green-600"
          >
            送信する
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
