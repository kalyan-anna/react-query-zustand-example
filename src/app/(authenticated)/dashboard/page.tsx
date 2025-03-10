'use client';

import { ProjectList } from '@/components/project/ProjectList';
import { useUIPreferenceStore } from '@/state/ui-preference';
import { useCurrentUserQuery } from '@/state/user';
import { Typography } from '@material-tailwind/react';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { data, isLoading } = useCurrentUserQuery();
  const { setLastVisitedProjectId } = useUIPreferenceStore.use.actions();

  useEffect(() => {
    setLastVisitedProjectId('');
  }, [setLastVisitedProjectId]);

  return (
    <section className="flex flex-col gap-8 md:px-52">
      <div>
        <Typography variant="h1" color="blue-gray" className="mb-4 md:mb-8">
          Welcome{!isLoading && <span>, {data.firstName}!</span>}
        </Typography>
      </div>
      <ProjectList />
    </section>
  );
}
