import { useProjectIdParam } from '@/hooks/useProjectIdParam';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sprintDialog } from '../ui-dialog';
import { sprintApi } from './api';
import { sprintKeys } from './queries';
import { CreateSprintRequest, Sprint } from './type';

export const useCreateSprintMutation = () => {
  const { closeDialog } = sprintDialog.useDialogState();
  const queryClient = useQueryClient();
  const projectId = useProjectIdParam();

  return useMutation({
    mutationFn: (request: CreateSprintRequest) =>
      sprintApi.createSprint(projectId as string, request),
    onSettled(data, error) {
      if (!error) {
        closeDialog();
      }
    },
    onSuccess: async data => {
      await queryClient.invalidateQueries({ queryKey: sprintKeys.byProjectId(data.projectId) });
    },
  });
};

export const useCompleteSprintMutation = () => {
  const queryClient = useQueryClient();
  const projectId = useProjectIdParam();

  return useMutation({
    mutationFn: (sprintId: string) =>
      sprintApi.updateSprint(projectId, {
        id: sprintId,
        status: 'COMPLETED',
        endDate: new Date(),
      }),
    onMutate: async sprintId => {
      const previousSprints = queryClient.getQueryData<Sprint[]>(sprintKeys.byProjectId(projectId));
      if (previousSprints) {
        const updatedspints = previousSprints.map(sprint => {
          if (sprint.id === sprintId) {
            return { ...sprint, status: 'COMPLETING', endDate: new Date().toISOString() };
          }
          return sprint;
        });
        queryClient.setQueryData(sprintKeys.byProjectId(projectId), updatedspints);
      }
    },
  });
};

export const useStartSprintMutation = () => {
  const queryClient = useQueryClient();
  const projectId = useProjectIdParam();

  return useMutation({
    mutationFn: (sprintId: string) =>
      sprintApi.updateSprint(projectId, {
        id: sprintId,
        status: 'ACTIVE',
        startDate: new Date(),
      }),
    onMutate: async sprintId => {
      const previousSprints = queryClient.getQueryData<Sprint[]>(sprintKeys.byProjectId(projectId));
      if (previousSprints) {
        const updatedspints = previousSprints.map(sprint => {
          if (sprint.id === sprintId) {
            return { ...sprint, status: 'ACTIVE', startDate: new Date().toISOString() };
          }
          return sprint;
        });
        queryClient.setQueryData(sprintKeys.byProjectId(projectId), updatedspints);
      }
    },
  });
};
