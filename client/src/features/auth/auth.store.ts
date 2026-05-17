import { create } from 'zustand';
import type { AuthUser } from './auth.types';
import { tokenStorage } from '../../utils/storage';
import { meRequest } from '../../api/auth.api';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasHydrated: boolean;
  setAuth: (user: AuthUser, token: string) => void;
  clearAuth: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: tokenStorage.get(),
  isAuthenticated: false,
  isLoading: false,
  hasHydrated: false,

  setAuth: (user, token) => {
    tokenStorage.set(token);
    set({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
      hasHydrated: true,
    });
  },

  clearAuth: () => {
    tokenStorage.clear();
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      hasHydrated: true,
    });
  },

  checkAuth: async () => {
    const token = tokenStorage.get();

    if (!token) {
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        hasHydrated: true,
      });
      return;
    }

    set({ isLoading: true });

    try {
      const user = await meRequest();
      set({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
        hasHydrated: true,
      });
    } catch {
      tokenStorage.clear();
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        hasHydrated: true,
      });
    }
  },
}));