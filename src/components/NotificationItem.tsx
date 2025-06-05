import React, { useState, useEffect } from 'react';
import { Pin, ChevronDown, ChevronUp } from 'lucide-react';
import { Notification, NotificationType } from '../types/notification';

interface NotificationItemProps {
  notification: Notification;
  onRead?: (notificationId: string) => void;
  onTogglePin?: (notificationId: string) => void;
  isForceExpanded?: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onRead, 
  onTogglePin,
  isForceExpanded = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isForceExpanded) {
      setIsExpanded(true);
    }
  }, [isForceExpanded]);

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
      minute: '2-digit'
    }).format(date);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    
    // Mark as read only when expanding (showing more details)
    if (!isExpanded && !notification.isRead && onRead) {
      onRead(notification.id);
    }
  };

  const handleTogglePin = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onTogglePin) {
      onTogglePin(notification.id);
    }
  };

  return (
    <div 
      className={`relative p-3 hover:bg-gray-50 transition-colors ${
        notification.isRead ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      {/* Type indicator line */}
      <div className={`absolute right-0 top-0 bottom-0 w-1 ${getTypeLineColor(notification.type)}`}></div>
      
      <div className="flex items-start gap-3">
        {/* Pin button */}
        <button
          onClick={handleTogglePin}
          className={`flex-shrink-0 mt-1 p-1 rounded hover:bg-gray-200 transition-colors ${
            notification.isPinned ? 'text-blue-500' : 'text-gray-400'
          }`}
          title={notification.isPinned ? 'בטל הצמדה' : 'הצמד הודעה'}
        >
          <Pin size={14} />
        </button>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded text-xs font-medium border ${getTypeColor(notification.type)}`}>
              {getTypeText(notification.type)}
            </span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              פרויקט {notification.project}
            </span>
            {!notification.isRead && (
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            )}
          </div>

          {/* Title */}
          <h4 className={`font-medium text-sm mb-1 leading-tight ${
            notification.isRead ? 'text-gray-600' : 'text-gray-900'
          }`}>
            {notification.title}
          </h4>

          {/* Short text */}
          <p className={`text-xs mb-2 leading-relaxed ${
            notification.isRead ? 'text-gray-500' : 'text-gray-600'
          }`}>
            {notification.shortText}
          </p>

          {/* Long text (expandable) */}
          {notification.longText && (
            <div>
              {isExpanded && (
                <p className="text-xs text-gray-700 mb-2 leading-relaxed bg-gray-50 p-2 rounded">
                  {notification.longText}
                </p>
              )}
              <button
                onClick={toggleExpanded}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
              >
                {isExpanded ? (
                  <>
                    <ChevronUp size={12} />
                    <span>הסתר פרטים</span>
                  </>
                ) : (
                  <>
                    <ChevronDown size={12} />
                    <span>הצג פרטים</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Date */}
          <div className="mt-2 text-xs text-gray-500">
            {formatDate(notification.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
