
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface AddNotificationTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddNotificationType: (typeName: string) => void;
}

const AddNotificationTypeDialog: React.FC<AddNotificationTypeDialogProps> = ({
  open,
  onOpenChange,
  onAddNotificationType,
}) => {
  const [typeName, setTypeName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeName.trim()) {
      onAddNotificationType(typeName.trim());
      setTypeName('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" dir="rtl">
        <DialogHeader>
          <DialogTitle>הוסף סוג הודעה חדש</DialogTitle>
          <DialogDescription>
            צור סוג הודעה חדש במערכת ההודעות
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type-name">שם סוג ההודעה</Label>
            <Input
              id="type-name"
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
              placeholder="הכנס שם סוג הודעה..."
              className="text-right"
              dir="rtl"
            />
          </div>
          <DialogFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              ביטול
            </Button>
            <Button type="submit" disabled={!typeName.trim()}>
              הוסף סוג הודעה
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddNotificationTypeDialog;
