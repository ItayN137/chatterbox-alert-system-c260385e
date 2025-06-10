
import React, { useState } from 'react';
import NotificationItem from '../components/NotificationItem';
import NotificationDetail from '../components/NotificationDetail';
import NotificationPanel from '../components/NotificationPanel';
import NotificationCalendar from '../components/NotificationCalendar';
import SettingsButton from '../components/SettingsButton';
import AddNotificationButton from '../components/AddNotificationButton';
import { Notification } from '../types/notification';
import { mockNotifications } from '../data/mockNotifications';

const Home = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [projects, setProjects] = useState<{ id: number; name: string }[]>([
    { id: 1, name: 'פרויקט דוגמה 1' },
    { id: 2, name: 'פרויקט דוגמה 2' },
    { id: 3, name: 'פרויקט דוגמה 3' }
  ]);
  const [notificationTypes, setNotificationTypes] = useState<{ id: string; name: string }[]>([
    { id: 'bug', name: 'באג' },
    { id: 'update', name: 'עדכון' },
    { id: 'version', name: 'גרסה' },
    { id: 'maintenance', name: 'תחזוקה' },
    { id: 'security', name: 'אבטחה' },
    { id: 'info', name: 'מידע' }
  ]);

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

  const handleCalendarDayClick = (date: Date, notification: Notification) => {
    setViewMode('list');
    setSelectedNotification(notification);
    // Mark as read when opening from calendar
    if (!notification.isRead) {
      handleNotificationRead(notification.id);
    }
  };

  const handleAddProject = (projectName: string) => {
    const newProject = {
      id: Math.max(...projects.map(p => p.id)) + 1,
      name: projectName
    };
    setProjects(prev => [...prev, newProject]);
  };

  const handleAddNotificationType = (typeName: string) => {
    const newType = {
      id: typeName.toLowerCase().replace(/\s+/g, '_'),
      name: typeName
    };
    setNotificationTypes(prev => [...prev, newType]);
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
            <AddNotificationButton 
              onAddNotification={handleAddNotification}
            />
            <SettingsButton 
              onViewModeChange={setViewMode}
              viewMode={viewMode}
              projects={projects}
              notificationTypes={notificationTypes}
              onAddProject={handleAddProject}
              onAddNotificationType={handleAddNotificationType}
            />
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Notifications List - Left Side */}
        <div className="w-1/3 bg-background border-l border-border overflow-y-auto">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-foreground">
              {viewMode === 'list' ? 'רשימת הודעות' : 'לוח שנה'}
            </h2>
            <p className="text-sm text-muted-foreground">{notifications.length} הודעות</p>
          </div>
          
          {viewMode === 'list' ? (
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
          ) : (
            <NotificationCalendar 
              notifications={sortedNotifications}
              onDayClick={handleCalendarDayClick}
            />
          )}
        </div>

        {/* Notification Detail - Right Side */}
        <div className="flex-1 bg-muted/30">
          {viewMode === 'calendar' ? (
            <NotificationCalendar 
              notifications={sortedNotifications}
              onDayClick={handleCalendarDayClick}
              isFullScreen={true}
            />
          ) : selectedNotification ? (
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
