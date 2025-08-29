<script setup lang="ts">
import { Field } from "vee-validate";

export interface BaseFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  modelValue: string;
  error?: string;
}

const props = withDefaults(
  defineProps<
    BaseFieldProps & {
      rows?: number;
    }
  >(),
  {
    placeholder: "",
    label: "",
    required: false,
    rows: 4,
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <Field v-slot="{ field, errors }" :name="name">
    <div class="form-field">
      <label v-if="label" :for="name" class="form-label">
        {{ label }}
        <span v-if="required" class="required">*</span>
      </label>

      <textarea
        v-bind="field"
        :id="name"
        :rows="rows"
        :placeholder="placeholder"
        :value="modelValue"
        class="form-textarea"
        :class="{ 'has-error': errors.length > 0 }"
        @input="
          emit(
            'update:modelValue',
            ($event.target as HTMLTextAreaElement).value
          )
        "
      />

      <span v-if="errors.length > 0" class="error-message">
        {{ errors[0] }}
      </span>
    </div>
  </Field>
</template>
