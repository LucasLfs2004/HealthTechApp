// store/authStore.ts
import { userData } from '@/types/userData';
import { create } from 'zustand';

type AuthState = {
  isLoggedIn: boolean;
  user?: userData | null;
  login: (user: userData) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>(set => ({
  isLoggedIn: false,
  user: null,
  login: (user: userData) => set({ isLoggedIn: true, user: user }),
  logout: () => set({ isLoggedIn: false }),
}));
