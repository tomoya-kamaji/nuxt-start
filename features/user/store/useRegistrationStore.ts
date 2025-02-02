import { defineStore } from "pinia";
import type {
  RegistrationComplete,
  RegistrationStep1Form,
  RegistrationStep2Form,
  RegistrationStep3Form,
} from "../types/registration";
import type { Step } from "../components/StepIndicator.vue";

export const RegistrationSteps: Step[] = [
  { number: 1, label: "基本情報", route: "/user/step1" },
  { number: 2, label: "プロフィール", route: "/user/step2" },
  { number: 3, label: "設定", route: "/user/step3" },
];

interface RegistrationState {
  basicInfo?: RegistrationStep1Form;
  profile?: RegistrationStep2Form;
  preferences?: RegistrationStep3Form;
  step: Step[];
  currentStep: number;
}
/**
 * ユーザー登録情報を管理するストア
 * Step1: 基本情報
 * Step2: プロフィール
 * Step3: 設定・好み
 */
export const useRegistrationStore = defineStore("registration", {
  state: (): RegistrationState => ({
    basicInfo: undefined,
    profile: undefined,
    preferences: undefined,
    step: RegistrationSteps,
    currentStep: 1,
  }),

  getters: {
    // 現在のステップが有効かチェック
    isCurrentStepValid: (state) => {
      switch (state.currentStep) {
        case 1:
          return !!state.basicInfo;
        case 2:
          return !!state.profile;
        case 3:
          return !!state.preferences;
        default:
          return false;
      }
    },

    // 全データを結合して返す
    completeRegistrationData: (state): RegistrationComplete | undefined => {
      if (!state.basicInfo || !state.profile || !state.preferences)
        return undefined;

      return {
        ...state.basicInfo,
        ...state.profile,
        ...state.preferences,
      };
    },
  },

  actions: {
    setStateDateStep1(data: RegistrationStep1Form) {
      this.basicInfo = data;
    },
    setStateDateStep2(data: RegistrationStep2Form) {
      this.profile = data;
    },
    setStateDateStep3(data: RegistrationStep3Form) {
      this.preferences = data;
    },

    // 次のステップへ進む
    nextStep() {
      const router = useRouter();
      if (this.currentStep < 3) {
        this.currentStep++;
        router.push(this.step[this.currentStep - 1].route);
      }
    },

    // 前のステップへ戻る
    previousStep() {
      if (this.currentStep > 1) {
        const router = useRouter();
        this.currentStep--;
        router.push(this.step[this.currentStep - 1].route);
      }
    },

    /** チェックして足りていないものがあればそのステップの最初に戻る */
    checkStepDataAndGoBack() {
      const router = useRouter();
      if (!this.basicInfo) {
        this.currentStep = 1;
        router.push("/user/step1");
      } else if (!this.profile) {
        this.currentStep = 2;
        router.push("/user/step2");
      } else if (!this.preferences) {
        this.currentStep = 3;
        router.push("/user/step3");
      }
    },

    async submitCompleteRegistration() {
      if (!this.completeRegistrationData) {
        throw new Error("登録情報が不完全です");
      }

      try {
        const response = await fetch("/api/registration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.completeRegistrationData),
        });

        if (!response.ok) {
          throw new Error("登録に失敗しました");
        }

        return true;
      } catch (e) {
        return false;
      }
    },

    // 登録情報をリセット
    resetRegistration() {
      this.basicInfo = undefined;
      this.profile = undefined;
      this.preferences = undefined;
      this.currentStep = 1;
    },
  },
});
