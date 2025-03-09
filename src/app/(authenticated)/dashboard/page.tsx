import { ProjectList } from '@/components/ProjectList';
import { Typography } from '@material-tailwind/react';
import { useEffect } from 'react';

export const DashboardPage = () => {
  const { data, loading } = useCurrentUserQuery();
  const { setLastVisitedProjectId } = useUIPreferenceState();

  useEffect(() => {
    setLastVisitedProjectId('');
  }, [setLastVisitedProjectId]);

  return (
    <section className="flex flex-col gap-8 md:px-52">
      <div>
        <Typography variant="h1" color="blue-gray" className="mb-4 md:mb-8">
          Welcome{!loading && <span>, {data.firstName}!</span>}
        </Typography>
      </div>
      <ProjectList />
    </section>
  );
};
