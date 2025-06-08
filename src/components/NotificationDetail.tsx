
import React from 'react';
import { Pin, Eye, Calendar } from 'lucide-react';
import { Notification, NotificationType } from '../types/notification';

interface NotificationDetailProps {
  notification: Notification;
  onRead?: (notificationId: string) => void;
  onTogglePin?: (notificationId: string) => void;
}

const NotificationDetail: React.FC<NotificationDetailProps> = ({ 
  notification, 
  onRead, 
  onTogglePin 
}) => {
  const getTypeColor = (type: NotificationType): string => {
    const colors = {
      bug: 'bg-red-100 text-red-800 border-red-200',
      update: 'bg-blue-100 text-blue-800 border-blue-200',
      version: 'bg-green-100 text-green-800 border-green-200',
      maintenance: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      security: 'bg-orange-100 text-orange-800 border-orange-200',
      info: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[type] || colors.info;
  };

  const getTypeLineColor = (type: NotificationType): string => {
    const colors = {
      bug: 'bg-red-500',
      update: 'bg-blue-500',
      version: 'bg-green-500',
      maintenance: 'bg-yellow-500',
      security: 'bg-orange-500',
      info: 'bg-gray-500'
    };
    return colors[type] || colors.info;
  };

  const getTypeText = (type: NotificationType): string => {
    const typeTexts = {
      bug: 'באג',
      update: 'עדכון מערכת',
      version: 'גרסה',
      maintenance: 'השבתה',
      security: 'אבטחה',
      info: 'מידע'
    };
    return typeTexts[type] || 'מידע';
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      weekday: 'long'
    }).format(date);
  };

  const handleTogglePin = () => {
    if (onTogglePin) {
      onTogglePin(notification.id);
    }
  };

  const handleMarkAsUnread = () => {
    if (onRead) {
      onRead(notification.id);
    }
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getTypeColor(notification.type)}`}>
                {getTypeText(notification.type)}
              </span>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                פרויקט {notification.project}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleTogglePin}
                className={`p-2 rounded-lg hover:bg-gray-200 transition-colors ${
                  notification.isPinned ? 'text-blue-500 bg-blue-50' : 'text-gray-400'
                }`}
                title={notification.isPinned ? 'בטל הצמדה' : 'הצמד הודעה'}
              >
                <Pin size={18} />
              </button>

              {notification.isRead && (
                <button
                  onClick={handleMarkAsUnread}
                  className="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-400 hover:text-blue-500"
                  title="סמן כלא נקראה"
                >
                  <Eye size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Type indicator line */}
          <div className={`h-1 w-full rounded-full ${getTypeLineColor(notification.type)} mb-4`}></div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {notification.title}
          </h1>

          {/* Date */}
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={16} />
            <span className="text-sm">{formatDate(notification.createdAt)}</span>
          </div>

          {/* Short Text */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">תקציר</h3>
            <p className="text-blue-800 leading-relaxed">
              {notification.shortText}
            </p>
          </div>

          {/* Long Text */}
          {notification.longText && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">פרטים מלאים</h3>
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                {notification.longText}
              </div>
            </div>
          )}

          {/* Status */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">סטטוס</h3>
            <div className="flex items-center gap-4 text-sm">
              <span className={`flex items-center gap-2 ${notification.isRead ? 'text-green-600' : 'text-blue-600'}`}>
                <div className={`w-2 h-2 rounded-full ${notification.isRead ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                {notification.isRead ? 'נקראה' : 'לא נקראה'}
              </span>
              {notification.isPinned && (
                <span className="flex items-center gap-2 text-blue-600">
                  <Pin size={14} />
                  מוצמדת
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetail;
