import { IssueTypeEnum } from '@/state/issue/types';

export const ISSUE_TYPE_COLOR = {
  [IssueTypeEnum.Values.STORY]: 'bg-gray-500',
  [IssueTypeEnum.Values.BUG]: 'bg-red-500',
};
