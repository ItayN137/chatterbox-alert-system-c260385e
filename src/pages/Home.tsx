
import React, { useState } from 'react';
import NotificationItem from '../components/NotificationItem';
import NotificationDetail from '../components/NotificationDetail';
import NotificationPanel from '../components/NotificationPanel';
import SettingsButton from '../components/SettingsButton';
import { Notification } from '../types/notification';
import { mockNotifications } from '../data/mockNotifications';

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

  const handleAddNotification = (newNotification: Omit<Notification, 'id' | 'createdAt'>) => {
    const notification: Notification = {
      ...newNotification,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    
    setNotifications(prev => [notification, ...prev]);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  // Sort notifications: pinned first, then by creation date
  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="bg-background shadow-sm border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🏔️</span>
            <h1 className="text-2xl font-bold text-foreground">מערכת הודעות</h1>
            {unreadCount > 0 && (
              <span className="bg-destructive text-destructive-foreground text-sm px-3 py-1 rounded-full">
                {unreadCount} הודעות שלא נקראו
              </span>
            )}
          </div>
          
          {/* Top Left Controls */}
          <div className="flex items-center gap-3">
            <NotificationPanel 
              notifications={sortedNotifications}
              onNotificationRead={handleNotificationRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onAddNotification={handleAddNotification}
              onTogglePin={handleTogglePin}
            />
            <SettingsButton />
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Notifications List - Left Side */}
        <div className="w-1/3 bg-background border-l border-border overflow-y-auto">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-foreground">רשימת הודעות</h2>
            <p className="text-sm text-muted-foreground">{notifications.length} הודעות</p>
          </div>
          
          <div className="divide-y divide-border">
            {sortedNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationSelect(notification)}
                className={`cursor-pointer transition-colors ${
                  selectedNotification?.id === notification.id 
                    ? 'bg-accent border-r-4 border-primary' 
                    : 'hover:bg-accent/50'
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
        <div className="flex-1 bg-muted/30">
          {selectedNotification ? (
            <NotificationDetail 
              notification={selectedNotification}
              onRead={handleNotificationRead}
              onTogglePin={handleTogglePin}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <span className="text-6xl block mb-4">🏔️</span>
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
