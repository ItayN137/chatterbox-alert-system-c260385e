
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Notification } from '../types/notification';

interface WhatsNewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  versionNotifications: Notification[];
}

const WhatsNewDialog: React.FC<WhatsNewDialogProps> = ({
  isOpen,
  onClose,
  versionNotifications
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentNotification = versionNotifications[currentIndex];

  const handleNext = () => {
    if (currentIndex < versionNotifications.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
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

  if (!currentNotification) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl" dir="rtl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-foreground">
              🎉 מה חדש
            </DialogTitle>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="סגור"
            >
              <X size={20} />
            </button>
          </div>
          <DialogDescription className="text-muted-foreground">
            גלה את התכונות והעדכונים החדשים במערכת
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Version indicator */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-lg border border-green-200">
                גרסה חדשה
              </span>
              <span className="text-sm text-green-700">
                פרויקט {currentNotification.project}
              </span>
            </div>
            <div className="text-sm text-green-600">
              {formatDate(currentNotification.createdAt)}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-foreground">
              {currentNotification.title}
            </h3>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 leading-relaxed">
                {currentNotification.shortText}
              </p>
            </div>

            {currentNotification.longText && (
              <div className="bg-background border border-border rounded-lg p-4">
                <h4 className="font-medium text-foreground mb-2">פרטים נוספים:</h4>
                <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {currentNotification.longText}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          {versionNotifications.length > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="p-2 rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="הודעה קודמת"
                >
                  <ChevronRight size={18} />
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === versionNotifications.length - 1}
                  className="p-2 rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="הודעה הבאה"
                >
                  <ChevronLeft size={18} />
                </button>
              </div>

              <div className="text-sm text-muted-foreground">
                {currentIndex + 1} מתוך {versionNotifications.length}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WhatsNewDialog;
