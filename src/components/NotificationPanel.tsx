
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import NotificationItem from './NotificationItem';
import { Notification } from '../types/notification';

interface NotificationPanelProps {
  notifications: Notification[];
  onClose?: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ notifications, onClose }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const handleToggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-200 w-80 max-h-96 flex flex-col" dir="rtl">
      {/* Top Bar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <h3 className="font-semibold text-gray-800 text-sm">הודעות</h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleToggleMinimize}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title={isMinimized ? "הרחב" : "כווץ"}
          >
            {isMinimized ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              title="סגור"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Content Area */}
      {!isMinimized && (
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              אין הודעות חדשות
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom Bar */}
      {!isMinimized && (
        <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>{notifications.length} הודעות</span>
            <button className="text-blue-600 hover:text-blue-800 transition-colors">
              סמן הכל כנקרא
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
