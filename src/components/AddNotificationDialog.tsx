
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { NotificationType } from '../types/notification';

interface AddNotificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddNotification: (notification: {
    type: NotificationType;
    project: number;
    title: string;
    shortText: string;
    longText?: string;
    isPinned: boolean;
    isRead?: boolean;
  }) => void;
}

const AddNotificationDialog: React.FC<AddNotificationDialogProps> = ({
  open,
  onOpenChange,
  onAddNotification,
}) => {
  const [formData, setFormData] = useState({
    type: 'info' as NotificationType,
    project: 1,
    title: '',
    shortText: '',
    longText: '',
    isPinned: false,
  });

  const notificationTypes: { value: NotificationType; label: string }[] = [
    { value: 'info', label: 'מידע' },
    { value: 'bug', label: 'באג' },
    { value: 'update', label: 'עדכון מערכת' },
    { value: 'version', label: 'גרסה' },
    { value: 'maintenance', label: 'השבתה' },
    { value: 'security', label: 'אבטחה' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.shortText.trim()) {
      return;
    }

    onAddNotification({
      ...formData,
      longText: formData.longText.trim() || undefined,
      isRead: false,
    });

    setFormData({
      type: 'info',
      project: 1,
      title: '',
      shortText: '',
      longText: '',
      isPinned: false,
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle>הוסף הודעה חדשה</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              סוג הודעה
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {notificationTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Project */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              פרויקט
            </label>
            <input
              type="number"
              min="1"
              value={formData.project}
              onChange={(e) => handleInputChange('project', parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              כותרת <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Short Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              תיאור קצר <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.shortText}
              onChange={(e) => handleInputChange('shortText', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Long Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              תיאור מלא (אופציונלי)
            </label>
            <textarea
              value={formData.longText}
              onChange={(e) => handleInputChange('longText', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pinned */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPinned"
              checked={formData.isPinned}
              onChange={(e) => handleInputChange('isPinned', e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isPinned" className="text-sm text-gray-700">
              הצמד הודעה
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              הוסף הודעה
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              ביטול
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNotificationDialog;
