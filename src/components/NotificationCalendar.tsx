
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Notification, NotificationType } from '../types/notification';
import { isSameDay, format } from 'date-fns';
import { cn } from '@/lib/utils';

interface NotificationCalendarProps {
  notifications: Notification[];
  onDayClick?: (date: Date, notification: Notification) => void;
}

const NotificationCalendar: React.FC<NotificationCalendarProps> = ({ 
  notifications,
  onDayClick 
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

  // Group notifications by date and get the first notification for each date
  const notificationsByDate = notifications.reduce((acc, notification) => {
    const dateKey = format(new Date(notification.createdAt), 'yyyy-MM-dd');
    if (!acc[dateKey]) {
      acc[dateKey] = notification;
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
    <div className="p-2" dir="ltr">
      <Calendar
        mode="single"
        className={cn("w-full pointer-events-auto")}
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
                  className="relative w-full h-full flex items-center justify-center text-white font-bold rounded"
                  style={{ backgroundColor: color }}
                >
                  {date.getDate()}
                </span>
              );
            }
            
            return (
              <span className="relative w-full h-full flex items-center justify-center">
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
