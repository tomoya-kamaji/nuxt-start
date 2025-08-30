import { defineStore } from "pinia";

export interface UserProfile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  profile: UserProfile | null;
  isLoading: boolean;
}

/**
 * 認証ストア
 */
export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    isLoggedIn: false,
    profile: null,
    isLoading: false,
  }),

  getters: {
    isAuthenticated: (state) => state.isLoggedIn && state.profile !== null,
    displayName: (state) => state.profile?.displayName || "",
    userId: (state) => state.profile?.userId || "",
    pictureUrl: (state) => state.profile?.pictureUrl || "",
  },

  actions: {
    setLoading(loading: boolean) {
      this.isLoading = loading;
    },

    setLoggedIn(loggedIn: boolean) {
      this.isLoggedIn = loggedIn;
      if (!loggedIn) {
        this.profile = null;
      }
    },

    setProfile(profile: UserProfile | null) {
      this.profile = profile;
      this.isLoggedIn = profile !== null;
    },

    logout() {
      this.isLoggedIn = false;
      this.profile = null;
    },
  },
});
