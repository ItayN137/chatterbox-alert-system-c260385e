
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X, Plus, Bell, Minimize, Calendar as CalendarIcon, List } from 'lucide-react';
import NotificationItem from './NotificationItem';
import AddNotificationDialog from './AddNotificationDialog';
import NotificationCalendar from './NotificationCalendar';
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
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [expandedNotificationId, setExpandedNotificationId] = useState<string | null>(null);

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

  const handleToggleView = () => {
    setViewMode(viewMode === 'list' ? 'calendar' : 'list');
    setExpandedNotificationId(null);
  };

  const handleCalendarDayClick = (date: Date, notification: Notification) => {
    setViewMode('list');
    setExpandedNotificationId(notification.id);
    // Mark as read when opening from calendar
    if (!notification.isRead && onNotificationRead) {
      onNotificationRead(notification.id);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={handleToggleExpanded}
        className="p-3 bg-background border border-border rounded-full shadow-lg hover:bg-accent transition-all duration-200 relative"
        title="הצג הודעות"
      >
        <Bell size={24} className="text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Popup Panel */}
      {isExpanded && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsExpanded(false)}
          />
          
          {/* Panel */}
          <div className="absolute top-full left-0 mt-2 bg-background rounded-lg shadow-xl border border-border w-80 max-h-96 flex flex-col z-50" dir="rtl">
            {/* Top Bar */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-muted/50 rounded-t-lg">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <h3 className="font-semibold text-foreground text-sm">הודעות</h3>
                {unreadCount > 0 && (
                  <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleToggleView}
                  className="p-1 hover:bg-accent rounded transition-colors"
                  title={viewMode === 'list' ? 'תצוגת לוח שנה' : 'רשימת הודעות'}
                >
                  {viewMode === 'list' ? <CalendarIcon size={16} /> : <List size={16} />}
                </button>
                <button
                  onClick={() => setShowAddDialog(true)}
                  className="p-1 hover:bg-accent rounded transition-colors"
                  title="הוסף הודעה חדשה"
                >
                  <Plus size={16} />
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1 hover:bg-accent rounded transition-colors"
                  title="סגור"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto">
              {viewMode === 'list' ? (
                notifications.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground text-sm">
                    אין הודעות חדשות
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {notifications.map((notification) => (
                      <NotificationItem 
                        key={notification.id} 
                        notification={notification}
                        onRead={onNotificationRead}
                        onTogglePin={onTogglePin}
                        isForceExpanded={expandedNotificationId === notification.id}
                      />
                    ))}
                  </div>
                )
              ) : (
                <NotificationCalendar 
                  notifications={notifications} 
                  onDayClick={handleCalendarDayClick}
                />
              )}
            </div>

            {/* Bottom Bar */}
            <div className="p-3 border-t border-border bg-muted/50 rounded-b-lg">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{notifications.length} הודעות</span>
                <button 
                  onClick={handleMarkAllAsRead}
                  className="text-primary hover:text-primary/80 transition-colors"
                  disabled={unreadCount === 0}
                >
                  סמן הכל כנקרא
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <AddNotificationDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddNotification={handleAddNotification}
      />
    </div>
  );
};

export default NotificationPanel;
