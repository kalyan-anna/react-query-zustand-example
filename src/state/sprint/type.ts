import { z } from 'zod';
import { issueSchema } from '../issue/types';

const SprintStatusEnum = z.enum(['ACTIVE', 'COMPLETED', 'PLANNED']);

const sprintSchema = z.object({
  id: z.string(),
  name: z.string(),
  projectId: z.string(),
  goal: z.string(),
  startDate: z.string().transform(value => new Date(value)),
  endDate: z.string().transform(value => new Date(value)),
  status: SprintStatusEnum,
  issues: z.array(issueSchema),
});

export type SprintStatus = z.infer<typeof SprintStatusEnum>;
export type Sprint = z.infer<typeof sprintSchema>;

export interface CreateSprintRequest {
  name: string;
  goal: string;
  startDate: Date;
  endDate: Date;
}
