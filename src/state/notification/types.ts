export enum NotificationStatus {
  READ = 'READ',
  UNREAD = 'UNREAD',
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  status: NotificationStatus;
}
