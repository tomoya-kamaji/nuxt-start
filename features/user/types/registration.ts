import { z } from "zod";

export const registrationSchema = {
  step1: z.object({
    username: z
      .string()
      .min(3, "ユーザー名は3文字以上で入力してください")
      .max(20, "ユーザー名は20文字以内で入力してください"),
    email: z.string().email("有効なメールアドレスを入力してください"),
    password: z
      .string()
      .min(8, "パスワードは8文字以上で入力してください")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)/,
        "パスワードは英字と数字を含める必要があります"
      ),
  }),

  step2: z.object({
    firstName: z.string().min(1, "姓を入力してください"),
    lastName: z.string().min(1, "名を入力してください"),
    birthDate: z.string().min(1, "生年月日を入力してください"),
    occupation: z.string().min(1, "職業を入力してください"),
  }),

  step3: z.object({
    notifications: z.boolean(),
    newsletter: z.boolean(),
  }),
};

export type RegistrationStep1Form = z.infer<typeof registrationSchema.step1>;
export type RegistrationStep2Form = z.infer<typeof registrationSchema.step2>;
export type RegistrationStep3Form = z.infer<typeof registrationSchema.step3>;

// 全ステップのデータを含む型
export type RegistrationComplete = RegistrationStep1Form &
  RegistrationStep2Form &
  RegistrationStep3Form;
