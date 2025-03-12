'use client';

import { SprintContainer } from '@/components/SprintContainer';
import { SprintContainerSkeleton } from '@/components/SprintContainerSkeleton';
import { useProjectIdParam } from '@/hooks/useProjectIdParam';
import { useBacklogIssuesQuery } from '@/state/issue';
import { useProjectQuery } from '@/state/project';
import { useCompletedSprintsQuery, useUnCompletedSprintsQuery } from '@/state/sprint';
import { issueDialog, sprintDialog } from '@/state/ui-dialog';
import { Breadcrumbs, Button, Typography } from '@material-tailwind/react';
import Link from 'next/link';

export default function IssuesPage() {
  const projectId = useProjectIdParam();
  const { data: backlogData, isLoading: isBacklogLoading } = useBacklogIssuesQuery(projectId);
  const { data: sprintsData, isLoading: isSprintLoading } = useUnCompletedSprintsQuery({
    projectId: projectId,
  });
  const { data: completedData, isLoading: isCompletedSprintLoading } = useCompletedSprintsQuery({
    projectId: projectId,
  });
  const loadingSprints = isBacklogLoading || isSprintLoading || isCompletedSprintLoading;
  const hasData = !!backlogData?.length || !!sprintsData?.length || !!completedData?.length;
  const { data: selectedProjectData } = useProjectQuery(projectId);

  const { openDialog } = issueDialog.useDialogState();
  const { openDialog: openSprintDialog } = sprintDialog.useDialogState();

  const handleCreateIssueClick = () => {
    openDialog();
  };

  return (
    <div>
      <Breadcrumbs className="mb-2">
        <Link href="/">Projects</Link>
        <span>{selectedProjectData?.name}</span>
        <span>Issues</span>
      </Breadcrumbs>
      <div className="flex items-center w-full mb-6">
        <div>
          <Typography variant="h3">Issues</Typography>
        </div>
        <div className="ml-auto flex gap-4">
          <Button variant="outlined" onClick={handleCreateIssueClick}>
            Create Issue
          </Button>
          <Button variant="outlined" onClick={() => openSprintDialog()}>
            Create Sprint
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-12">
        {isSprintLoading && (
          <>
            <SprintContainerSkeleton />
            <SprintContainerSkeleton />
          </>
        )}
        {!loadingSprints && !hasData && (
          <Typography className="text-lg mt-8">Nothing found.</Typography>
        )}
        {!isSprintLoading &&
          sprintsData?.map(sprint => (
            <SprintContainer
              key={sprint.id}
              name={sprint.name}
              startDate={sprint.startDate}
              endDate={sprint.endDate}
              goal={sprint.goal}
              issues={sprint.issues}
              status={sprint.status}
              sprintId={sprint.id}
            />
          ))}
        {isBacklogLoading && <SprintContainerSkeleton />}
        {!isBacklogLoading && (backlogData?.length ?? 0) > 0 && (
          <SprintContainer name="Backlog" issues={backlogData} />
        )}
        {isCompletedSprintLoading && <SprintContainerSkeleton />}
        {!isCompletedSprintLoading &&
          completedData?.map(sprint => (
            <SprintContainer
              key={sprint.id}
              name={sprint.name}
              startDate={sprint.startDate}
              endDate={sprint.endDate}
              goal={sprint.goal}
              issues={sprint.issues}
              status={sprint.status}
              sprintId={sprint.id}
            />
          ))}
      </div>
    </div>
  );
}
