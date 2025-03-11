import { useParams } from 'next/navigation';

export const useProjectIdParam = () => {
  const params = useParams();
  return params.projectId as string;
};
