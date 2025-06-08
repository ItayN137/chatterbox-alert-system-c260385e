
import React, { useState } from 'react';
import NotificationItem from '../components/NotificationItem';
import NotificationDetail from '../components/NotificationDetail';
import { Notification } from '../types/notification';
import { mockNotifications } from '../data/mockNotifications';
import { Bell } from 'lucide-react';

const Home = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  const handleNotificationRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: !notification.isRead }
          : notification
      )
    );
  };

  const handleTogglePin = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isPinned: !notification.isPinned }
          : notification
      )
    );
  };

  const handleNotificationSelect = (notification: Notification) => {
    setSelectedNotification(notification);
    // Mark as read when selecting
    if (!notification.isRead) {
      handleNotificationRead(notification.id);
    }
  };

  // Sort notifications: pinned first, then by creation date
  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100" dir="rtl">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <Bell className="text-blue-600" size={28} />
          <h1 className="text-2xl font-bold text-gray-900">מערכת הודעות</h1>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
              {unreadCount} הודעות שלא נקראו
            </span>
          )}
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Notifications List - Left Side */}
        <div className="w-1/3 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">רשימת הודעות</h2>
            <p className="text-sm text-gray-600">{notifications.length} הודעות</p>
          </div>
          
          <div className="divide-y divide-gray-100">
            {sortedNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationSelect(notification)}
                className={`cursor-pointer transition-colors ${
                  selectedNotification?.id === notification.id 
                    ? 'bg-blue-50 border-r-4 border-blue-500' 
                    : 'hover:bg-gray-50'
                }`}
              >
                <NotificationItem 
                  notification={notification}
                  onRead={handleNotificationRead}
                  onTogglePin={handleTogglePin}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Notification Detail - Right Side */}
        <div className="flex-1 bg-gray-50">
          {selectedNotification ? (
            <NotificationDetail 
              notification={selectedNotification}
              onRead={handleNotificationRead}
              onTogglePin={handleTogglePin}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Bell size={64} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg">בחר הודעה לצפייה בפרטים</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
