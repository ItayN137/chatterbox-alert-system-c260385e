
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import AddNotificationDialog from './AddNotificationDialog';
import { Notification } from '../types/notification';

interface AddNotificationButtonProps {
  onAddNotification?: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
}

const AddNotificationButton: React.FC<AddNotificationButtonProps> = ({ onAddNotification }) => {
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleAddNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    if (onAddNotification) {
      onAddNotification(notification);
      setShowAddDialog(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowAddDialog(true)}
        className="p-3 bg-background border border-border rounded-full shadow-lg hover:bg-accent transition-all duration-200"
        title="הוסף הודעה חדשה"
      >
        <Plus size={24} className="text-foreground" />
      </button>

      <AddNotificationDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAddNotification={handleAddNotification}
      />
    </>
  );
};

export default AddNotificationButton;
