
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Notification } from '../types/notification';
import { isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';

interface NotificationCalendarProps {
  notifications: Notification[];
}

const NotificationCalendar: React.FC<NotificationCalendarProps> = ({ notifications }) => {
  // Get dates that have notifications
  const notificationDates = notifications.map(n => new Date(n.createdAt));
  
  // Get dates that have version notifications specifically
  const versionNotificationDates = notifications
    .filter(n => n.type === 'version')
    .map(n => new Date(n.createdAt));

  // Custom day content to show notification indicators
  const customDayContent = (day: Date) => {
    const hasNotification = notificationDates.some(date => isSameDay(date, day));
    const hasVersionNotification = versionNotificationDates.some(date => isSameDay(date, day));
    
    if (!hasNotification) return undefined;
    
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <span>{day.getDate()}</span>
        {hasVersionNotification && (
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full"></div>
        )}
        {hasNotification && !hasVersionNotification && (
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></div>
        )}
      </div>
    );
  };

  return (
    <div className="p-2" dir="ltr">
      <Calendar
        mode="single"
        className={cn("w-full pointer-events-auto")}
        components={{
          DayContent: ({ date }) => customDayContent(date)
        }}
        modifiers={{
          hasNotification: (day) => notificationDates.some(date => isSameDay(date, day)),
          hasVersionNotification: (day) => versionNotificationDates.some(date => isSameDay(date, day))
        }}
        modifiersStyles={{
          hasVersionNotification: {
            backgroundColor: '#dcfce7',
            color: '#166534'
          },
          hasNotification: {
            backgroundColor: '#dbeafe',
            color: '#1d4ed8'
          }
        }}
      />
    </div>
  );
};

export default NotificationCalendar;
