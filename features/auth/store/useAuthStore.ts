import { defineStore } from "pinia"
import type { AuthState, LiffProfile } from "../types/auth"

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    isLoggedIn: false,
    profile: null,
    isLoading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => state.isLoggedIn && state.profile !== null,
    userId: (state) => state.profile?.userId,
    displayName: (state) => state.profile?.displayName,
    pictureUrl: (state) => state.profile?.pictureUrl
  },

  actions: {
    setLoading(loading: boolean) {
      this.isLoading = loading
    },

    setLoginState(isLoggedIn: boolean) {
      this.isLoggedIn = isLoggedIn
      if (!isLoggedIn) {
        this.profile = null
      }
    },

    setProfile(profile: LiffProfile | null) {
      this.profile = profile
    },

    async updateProfile(profile: LiffProfile | null) {
      this.setProfile(profile)
      this.setLoginState(profile !== null)
    },

    logout() {
      this.isLoggedIn = false
      this.profile = null
    }
  }
})