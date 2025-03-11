import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from './api';
import { userKeys } from './queries';

export const useUpdateUserMutation = ({
  onSettled,
  onSuccess,
}: { onSettled?: () => void; onSuccess?: () => void } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (user: Partial<User>) => userApi.updateUser(user),
    onMutate: async (user: Partial<User>) => {
      const previousUser = user.id
        ? queryClient.getQueryData<User>(userKeys.user(user.id))
        : undefined;
      if (user.id) {
        queryClient.setQueryData(userKeys.user(user.id), user);
      }
      return { previousUser };
    },
    onError: (err, user, context) => {
      if (user.id) {
        queryClient.setQueryData(userKeys.user(user.id), context?.previousUser);
      }
    },
    onSettled,
    onSuccess,
  });
};
