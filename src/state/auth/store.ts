import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { LoginResponse } from './types';
import { createSelectors } from '@/utils/zustand.helper';

type AuthState = {
  accessToken?: string;
  isAuthenticated: boolean;
  currentUserId?: string;
};

type AuthAction = {
  loginSuccess: (loginResponse: LoginResponse) => void;
  clearAuth: () => void;
};

const initState: AuthState = {
  accessToken: undefined,
  isAuthenticated: false,
  currentUserId: undefined,
};

type AuthStateAndAction = AuthState & { actions: AuthAction };

const useAuthStoreBase = create<AuthStateAndAction>()(
  immer(
    devtools(
      set => ({
        ...initState,
        actions: {
          loginSuccess: (loginResponse: LoginResponse) => {
            set(state => {
              state.accessToken = loginResponse.accessToken;
              state.currentUserId = loginResponse.currentUserId;
              state.isAuthenticated = true;
            });
          },
          clearAuth: () => {
            set(state => {
              state.accessToken = undefined;
              state.currentUserId = undefined;
              state.isAuthenticated = false;
            });
          },
        },
      }),
      {
        enabled: true,
        name: 'auth-store',
        store: 'auth-store',
      },
    ),
  ),
);

export const useAuthStore = createSelectors(useAuthStoreBase);
