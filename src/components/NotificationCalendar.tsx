
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Notification, NotificationType } from '../types/notification';
import { isSameDay, format } from 'date-fns';
import { cn } from '@/lib/utils';

interface NotificationCalendarProps {
  notifications: Notification[];
  onDayClick?: (date: Date, notification: Notification) => void;
  compact?: boolean;
}

const NotificationCalendar: React.FC<NotificationCalendarProps> = ({ 
  notifications,
  onDayClick,
  compact = false
}) => {
  const getTypeColor = (type: NotificationType): string => {
    const colors = {
      bug: '#ef4444',
      update: '#3b82f6',
      version: '#22c55e',
      maintenance: '#eab308',
      security: '#f97316',
      info: '#6b7280'
    };
    return colors[type] || colors.info;
  };

  // Group notifications by date and prioritize unread notifications
  const notificationsByDate = notifications.reduce((acc, notification) => {
    const dateKey = format(new Date(notification.createdAt), 'yyyy-MM-dd');
    
    // If no notification exists for this date, add it
    if (!acc[dateKey]) {
      acc[dateKey] = notification;
    } else {
      // If current notification is unread and existing is read, replace it
      // This prioritizes unread notifications over read ones
      if (!notification.isRead && acc[dateKey].isRead) {
        acc[dateKey] = notification;
      }
      // If both have same read status, keep the first one (existing behavior)
    }
    
    return acc;
  }, {} as Record<string, Notification>);

  // Get dates that have notifications
  const notificationDates = Object.keys(notificationsByDate).map(dateKey => new Date(dateKey));

  const handleDayClick = (date: Date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const notification = notificationsByDate[dateKey];
    if (notification && onDayClick) {
      onDayClick(date, notification);
    }
  };

  return (
    <div className={cn("p-2", compact && "p-1")} dir="ltr">
      <Calendar
        mode="single"
        className={cn(
          "w-full pointer-events-auto",
          compact && "scale-75 -mx-4 -my-2"
        )}
        onDayClick={handleDayClick}
        modifiers={{
          hasNotification: (day) => notificationDates.some(date => isSameDay(date, day))
        }}
        components={{
          DayContent: ({ date }) => {
            const dateKey = format(date, 'yyyy-MM-dd');
            const notification = notificationsByDate[dateKey];
            const hasNotification = !!notification;
            
            if (hasNotification) {
              const color = getTypeColor(notification.type);
              return (
                <span 
                  className={cn(
                    "relative w-full h-full flex items-center justify-center text-white font-bold rounded",
                    compact && "text-xs"
                  )}
                  style={{ backgroundColor: color }}
                >
                  {date.getDate()}
                </span>
              );
            }
            
            return (
              <span className={cn(
                "relative w-full h-full flex items-center justify-center",
                compact && "text-xs"
              )}>
                {date.getDate()}
              </span>
            );
          }
        }}
      />
    </div>
  );
};

export default NotificationCalendar;
