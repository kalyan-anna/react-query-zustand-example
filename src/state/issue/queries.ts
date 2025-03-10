import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { issuesAPi } from './api';

export const issuesKeys = {
  all: ['issues'] as const,
  byProjectId: (projectId: string) => [...issuesKeys.all, { projectId }],
  count: (projectId: string) => [...issuesKeys.all, 'count', { projectId }],
};

export const useBacklogIssuesQuery = (projectId: string) => {
  const result = useQuery({
    queryKey: issuesKeys.byProjectId(projectId),
    queryFn: () => issuesAPi.getIssues(projectId),
  });

  return useMemo(() => {
    const sortedIssues = [...(result.data ?? [])].sort((a, b) => a.orderIndex - b.orderIndex);
    return {
      ...result,
      data: sortedIssues,
    };
  }, [result]);
};

export const useIssuesCountByProjectId = (projectId: string) => {
  return useQuery({
    queryKey: issuesKeys.count(projectId),
    queryFn: () => issuesAPi.getIssuesCount(projectId),
  });
};
