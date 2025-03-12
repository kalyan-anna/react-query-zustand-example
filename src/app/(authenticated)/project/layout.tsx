'use client';

import { SideNav } from '@/app/__layout/SideNav';
import { ToastContainer } from '@/components/design-system/ToastContainer';
import { IssueUpsertDialog } from '@/components/IssueUpsertDialog';
import { SprintCompleteWarningDialog } from '@/components/SprintCompleteWarningDialog';
import { SprintCreateDialog } from '@/components/SprintCreateDialog';
import { SprintStartWarningDialog } from '@/components/SprintStartWarningDialog';
import { useProjectIdParam } from '@/hooks/useProjectIdParam';
import { useUIPreferenceStore } from '@/state/ui-preference';
import React, { useEffect } from 'react';

export default function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setLastVisitedProjectId } = useUIPreferenceStore.use.actions();
  const projectId = useProjectIdParam();

  useEffect(() => {
    setLastVisitedProjectId(projectId);
  }, [projectId, setLastVisitedProjectId]);

  return (
    <>
      <IssueUpsertDialog />
      <SprintCreateDialog />
      <SprintCompleteWarningDialog />
      <SprintStartWarningDialog />

      <section className="flex flex-1">
        <div>
          <SideNav />
        </div>
        <ToastContainer />
        <div className="px-8 md:px-8 py-8 w-full">{children}</div>
      </section>
    </>
  );
}
