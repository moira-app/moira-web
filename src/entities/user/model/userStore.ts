import { create } from 'zustand'

interface UserState {
  isLoggedIn: boolean
  userName: string | null
  login: (token: string, userName: string) => void
  logout: () => void
}

export const useUserStore = create<UserState>((set) => {
  return {
    // 초기 유저 상태
    isLoggedIn: false,
    userName: null,
    login: (userName) => set({ isLoggedIn: true, userName }),
    logout: () => set({ isLoggedIn: false, userName: null })
  }
})
