import liff from '@line/liff'
import type { LiffProfile } from '../types/auth'

export const useLiff = () => {
  const isInitialized = ref(false)
  const isLoading = ref(false)

  /**
   * LIFF初期化
   */
  const initLiff = async (liffId: string) => {
    if (isInitialized.value) return true

    try {
      isLoading.value = true
      await liff.init({ liffId })
      isInitialized.value = true
      return true
    } catch (err) {
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * ログイン状態チェック
   */
  const isLoggedIn = computed(() => {
    if (!isInitialized.value) return false
    return liff.isLoggedIn()
  })

  /**
   * ログイン実行
   */
  const login = () => {
    if (!isInitialized.value) return

    if (!liff.isInClient()) {
      liff.login({ redirectUri: window.location.href })
    }
  }

  /**
   * ログアウト実行
   */
  const logout = () => {
    if (!isInitialized.value) return
    liff.logout()
  }

  /**
   * ユーザープロフィール取得
   */
  const getProfile = async (): Promise<LiffProfile | null> => {
    if (!isInitialized.value || !isLoggedIn.value) {
      return null
    }

    try {
      const profile = await liff.getProfile()
      return {
        userId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
        statusMessage: profile.statusMessage
      }
    } catch {
      return null
    }
  }

  /**
   * アクセストークン取得
   */
  const getAccessToken = (): string | null => {
    if (!isInitialized.value || !isLoggedIn.value) {
      return null
    }

    try {
      return liff.getAccessToken()
    } catch {
      return null
    }
  }

  /**
   * LINEアプリ内かどうかチェック
   */
  const isInClient = computed(() => {
    if (!isInitialized.value) return false
    return liff.isInClient()
  })

  return {
    isInitialized: readonly(isInitialized),
    isLoading: readonly(isLoading),
    isLoggedIn,
    isInClient,
    initLiff,
    login,
    logout,
    getProfile,
    getAccessToken
  }
}