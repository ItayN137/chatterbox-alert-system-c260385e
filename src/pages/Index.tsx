
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import NotificationPanel from '../components/NotificationPanel';
import { mockNotifications } from '../data/mockNotifications';
import { Notification, NotificationType } from '../types/notification';

const Index = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const handleNotificationRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: !notification.isRead } // Toggle read state
          : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const handleAddNotification = (newNotification: Omit<Notification, 'id' | 'createdAt'>) => {
    const notification: Notification = {
      ...newNotification,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    
    setNotifications(prev => [notification, ...prev]);
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

  // Sort notifications: pinned first, then by creation date
  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">מערכת הודעות מתקדמת</h1>
          <p className="text-xl text-gray-600 mb-6">קומפוננטת הודעות עם תמיכה מלאה בעברית ותכונות מתקדמות</p>
          
          {/* Link to Home page */}
          <Link to="/home">
            <Button className="mb-4 gap-2" size="lg">
              <Home size={20} />
              עבור לדף הבית של מערכת ההודעות
            </Button>
          </Link>
        </div>

        {/* Bell notification panel - positioned fixed in top right */}
        <div className="fixed top-8 right-8 z-50">
          <NotificationPanel 
            notifications={sortedNotifications}
            onNotificationRead={handleNotificationRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onAddNotification={handleAddNotification}
            onTogglePin={handleTogglePin}
          />
        </div>

        {/* Demo Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6" dir="rtl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">תכונות המערכת</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">סוגי הודעות:</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• באג - הודעות על תקלות ותיקונים</li>
                <li>• עדכון מערכת - שדרוגים ושיפורים</li>
                <li>• גרסה - שחרור גרסאות חדשות</li>
                <li>• השבתה - תחזוקה מתוכננת</li>
                <li>• אבטחה - התראות אבטחה</li>
                <li>• מידע - הודעות כלליות</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">תכונות נוספות:</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• הצמדת הודעות חשובות</li>
                <li>• סימון הודעות כנקראות</li>
                <li>• הוספת הודעות חדשות</li>
                <li>• פעמון עם מספר הודעות שלא נקראו</li>
                <li>• הרחבה וכיווץ של פאנל ההודעות</li>
                <li>• הבחנה בין פרויקטים</li>
                <li>• תמיכה מלאה בעברית</li>
                <li>• עיצוב רספונסיבי</li>
                <li>• אנימציות חלקות</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
