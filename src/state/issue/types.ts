import { z } from 'zod';

const IssueStatusEnum = z.enum(['TO_DO', 'IN_PROGRESS', 'DONE', 'REVIEW']);
const IssueTypeEnum = z.enum(['BUG', 'STORY']);

export const issueSchema = z.object({
  id: z.string(),
  issueNumber: z.string(),
  summary: z.string(),
  description: z.string(),
  projectId: z.string(),
  assigneeUserId: z.string().nullable(),
  reporterUserId: z.string(),
  status: IssueStatusEnum,
  type: IssueTypeEnum,
  storyPoints: z.number(),
  sprintId: z.string().nullable(),
  orderIndex: z.number(),
});

export type IssueStatus = z.infer<typeof IssueStatusEnum>;
export type IssueType = z.infer<typeof IssueTypeEnum>;
export type Issue = z.infer<typeof issueSchema>;
