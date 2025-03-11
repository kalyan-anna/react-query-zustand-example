import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { IssueStatus } from '../issue/types';
import { sprintApi } from './api';
import { Sprint } from './type';

export const sprintKeys = {
  all: ['sprints'] as const,
  byProjectId: (projectId: string) => [...sprintKeys.all, { projectId }],
};

export const useSprintsQuery = <T = Sprint[]>({
  projectId,
  select,
}: {
  projectId: string;
  select?: (data: Sprint[]) => T;
}) => {
  return useQuery<T, Error>({
    queryKey: sprintKeys.byProjectId(projectId),
    queryFn: () => sprintApi.getSprints(projectId) as Promise<T>,
    select: select as (data: T) => T,
  });
};

export const useUnCompletedSprintsQuery = ({ projectId }: { projectId: string }) => {
  const uncompletedSprintSelect = useCallback(
    (sprints: Sprint[]) =>
      sprints
        .filter(sprint => sprint.status !== 'COMPLETED')
        .sort((a, b) => {
          if (a.status === 'ACTIVE' && b.status !== 'ACTIVE') {
            return -1;
          } else if (b.status === 'ACTIVE' && a.status !== 'ACTIVE') {
            return 1;
          }
          return 0;
        }),
    [],
  );

  return useSprintsQuery({ projectId, select: uncompletedSprintSelect });
};

export const useCompletedSprintsQuery = ({ projectId }: { projectId: string }) => {
  const completedSprintSelect = useCallback(
    (sprints: Sprint[]) => sprints.filter(sprint => sprint.status === 'COMPLETED'),
    [],
  );

  return useSprintsQuery({ projectId, select: completedSprintSelect });
};

export const useActiveSprintQuery = ({ projectId }: { projectId: string }) => {
  const activeSprintSelect = useCallback(
    (sprints: Sprint[]) => sprints.find(sprint => sprint.status === 'ACTIVE'),
    [],
  );
  return useSprintsQuery({ projectId, select: activeSprintSelect });
};

export const useActiveSprintIssuesByStatusQuery = ({
  projectId,
  status,
}: {
  projectId: string;
  status: IssueStatus;
}) => {
  const result = useActiveSprintQuery({ projectId });

  return useMemo(() => {
    const issues = result.data?.issues.filter(issue => issue.status === status);

    return {
      ...result,
      data: issues,
    };
  }, [result, status]);
};
