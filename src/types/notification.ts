
export type NotificationType = 'bug' | 'update' | 'version' | 'maintenance' | 'security' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  project: number;
  title: string;
  shortText: string;
  longText?: string;
  createdAt: Date;
  isPinned: boolean;
  isRead?: boolean;
}
