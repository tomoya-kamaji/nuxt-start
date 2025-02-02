<script setup lang="ts">
export interface Step {
  number: number;
  label: string;
  route: string;
}

defineProps<{
  currentStep: number;
  steps: Step[];
}>();
</script>

<template>
  <div class="mb-8">
    <div class="flex justify-between">
      <div v-for="step in steps" :key="step.number" class="flex-1 text-center">
        <div
          :class="[
            'rounded-full w-8 h-8 flex items-center justify-center mx-auto',
            currentStep >= step.number
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-600',
          ]"
        >
          {{ step.number }}
        </div>
        <div class="mt-2">{{ step.label }}</div>
      </div>
    </div>
  </div>
</template>
