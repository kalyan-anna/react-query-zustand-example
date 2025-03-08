import { useMutation } from '@tanstack/react-query';
import { authApi } from '@/state/auth/api';
import { LoginRequest } from './types';
import { useAuthStore } from './store';
import { useRouter } from 'next/navigation';
import { useUIPreferenceStore } from '../ui-preference';

export const useLoginMutation = () => {
  const router = useRouter();
  const { loginSuccess, clearAuth } = useAuthStore.use.actions();
  const lastVisitedProjectId = useUIPreferenceStore.use.lastVisitedProjectId();

  return useMutation({
    mutationFn: (loginRequest: LoginRequest) => authApi.login(loginRequest),
    onSuccess(data) {
      loginSuccess(data);
      router.replace(
        lastVisitedProjectId ? `/project/${lastVisitedProjectId}/issues` : '/dashboard',
      );
    },
    onError: () => clearAuth(),
  });
};
