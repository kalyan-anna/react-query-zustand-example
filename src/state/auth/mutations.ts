import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/state/auth/api';
import { LoginRequest, LoginResponse } from './types';
import { useAuthStore } from './store';
import { useRouter } from 'next/navigation';
import { useUIPreferenceStore } from '../ui-preference';
import { AxiosError } from 'axios';

export const useLoginMutation = () => {
  const router = useRouter();
  const { loginSuccess, clearAuth } = useAuthStore.use.actions();
  const lastVisitedProjectId = useUIPreferenceStore.use.lastVisitedProjectId();

  return useMutation<LoginResponse, AxiosError, LoginRequest>({
    mutationFn: (loginRequest: LoginRequest) => authApi.login(loginRequest),
    onSuccess(data) {
      loginSuccess(data);
      router.push(lastVisitedProjectId ? `/project/${lastVisitedProjectId}/issues` : '/dashboard');
    },
    onError: () => clearAuth(),
  });
};
