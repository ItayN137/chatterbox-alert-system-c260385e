
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X, Plus, Bell } from 'lucide-react';
import NotificationItem from './NotificationItem';
import AddNotificationDialog from './AddNotificationDialog';
import { Notification } from '../types/notification';

interface NotificationPanelProps {
  notifications: Notification[];
  onNotificationRead?: (notificationId: string) => void;
  onMarkAllAsRead?: () => void;
  onAddNotification?: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  onTogglePin?: (notificationId: string) => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ 
  notifications, 
  onNotificationRead,
  onMarkAllAsRead,
  onAddNotification,
  onTogglePin
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleToggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleMarkAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
  };

  const handleAddNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    if (onAddNotification) {
      onAddNotification(notification);
      setShowAddDialog(false);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Bell icon only view
  if (!isExpanded) {
    return (
      <div className="relative">
        <button
          onClick={handleToggleExpanded}
          className="p-3 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-200 relative"
          title="הצג הודעות"
        >
          <Bell size={24} className="text-gray-700" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </div>
    );
  }

  // Full panel view
  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-80 max-h-96 flex flex-col" dir="rtl">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <h3 className="font-semibold text-gray-800 text-sm">הודעות</h3>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowAddDialog(true)}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title="הוסף הודעה חדשה"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={handleToggleExpanded}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title="כווץ לפעמון"
          >
            <Bell size={16} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            אין הודעות חדשות
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <NotificationItem 
                key={notification.id} 
                notification={notification}
                onRead={onNotificationRead}
                onTogglePin={onTogglePin}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>{notifications.length} הודעות</span>
          <button 
            onClick={handleMarkAllAsRead}
            className="text-blue-600 hover:text-blue-800 transition-colors"
            disabled={unreadCount === 0}
          >
            סמן הכל כנקרא
          </button>
        </div>
      </div>

      <AddNotificationDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddNotification={handleAddNotification}
      />
    </div>
  );
};

export default NotificationPanel;
