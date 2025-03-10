import { useMemo } from 'react';
import { useAuthStore } from '../auth';
import { useQuery } from '@tanstack/react-query';
import { userApi } from './api';

export const userKeys = {
  all: ['users'] as const,
  user: (id: string) => [...userKeys.all, { id }],
};

export const useUsersQuery = () => {
  return useQuery({
    queryKey: userKeys.all,
    queryFn: () => userApi.getUsers(),
  });
};

export const useCurrentUserQuery = () => {
  const currentUserId = useAuthStore.use.currentUserId() ?? '';
  const result = useQuery({
    queryKey: userKeys.user(currentUserId),
    queryFn: () => userApi.getUser(currentUserId),
  });

  return useMemo(() => {
    const firstName = result.data?.name.split(' ')[0];

    return {
      ...result,
      data: {
        ...result.data,
        firstName,
      },
    };
  }, [result]);
};
