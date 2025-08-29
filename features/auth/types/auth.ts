export interface LiffProfile {
  userId: string
  displayName: string
  pictureUrl?: string
  statusMessage?: string
}

export interface AuthState {
  isLoggedIn: boolean
  profile: LiffProfile | null
  isLoading: boolean
  error: string | null
}