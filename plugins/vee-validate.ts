// plugins/vee-validate.ts
import { defineRule } from "vee-validate";
import { required, email } from "@vee-validate/rules";

export default defineNuxtPlugin(() => {
  defineRule("required", (value: string) => {
    if (!value) {
      return "This field is required";
    }
    return true;
  });
  defineRule("email", (value: string) => {
    if (!value) {
      return "This field is required";
    }
    return true;
  });
});
