<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import * as zod from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import TextInput from "@/components/form/TextInput.vue";

const useTypedField = <
  TSchema extends zod.ZodObject<any>,
  TKey extends keyof zod.infer<TSchema>
>(
  _: TSchema,
  name: TKey
) => {
  return useField<zod.infer<TSchema>[TKey]>(name as string);
};

const schema = zod.object({
  email: zod.string().email(),
  name: zod.string(),
  age: zod.number().min(18, { message: "年齢は18歳以上である必要があります" }),
});
const formSchema = toTypedSchema(schema);
type FormType = zod.infer<typeof schema>;

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const { value: email } = useTypedField(schema, "email");
const { value: name } = useTypedField(schema, "name");
const { value: age } = useTypedField(schema, "age");

const onSubmit = handleSubmit((values: FormType) => {
  console.log(values);
  alert(JSON.stringify(values, null, 2));
});
</script>

<template>
  <Form
    :validation-schema="formSchema"
    @submit="onSubmit"
    class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md"
  >
    <TextInput
      name="email"
      label="メールアドレス"
      required
      placeholder="example@example.com"
      class="mb-4"
      :modelValue="email"
    />
    <TextInput
      name="name"
      label="名前"
      required
      placeholder="山田太郎"
      class="mb-4"
      :modelValue="name"
    />
    <TextInput
      name="age"
      label="年齢"
      required
      placeholder="20"
      class="mb-4"
      v-model="age"
    />
    <button
      type="submit"
      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out"
    >
      送信
    </button>
  </Form>
</template>
