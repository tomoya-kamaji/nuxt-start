<!-- components/form/BaseTextInput.vue -->
<script setup lang="ts">
import { Field } from "vee-validate";
export interface BaseFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  modelValue: string | number;
  error?: string;
}

const props = withDefaults(defineProps<BaseFieldProps>(), {
  placeholder: "",
  label: "",
  required: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
}>();
</script>

<template>
  <Field v-slot="{ field, errors }" :name="name">
    <div class="form-field">
      <label v-if="label" :for="name" class="form-label">
        {{ label }}
        <span v-if="required" class="required">*</span>
      </label>

      <input
        v-bind="field"
        :id="name"
        type="text"
        :placeholder="placeholder"
        :value="modelValue"
        class="form-input"
        :class="{ 'has-error': errors.length > 0 }"
        @input="
          emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />

      <span v-if="errors.length > 0" class="error-message">
        {{ errors[0] }}
      </span>
    </div>
  </Field>
</template>
