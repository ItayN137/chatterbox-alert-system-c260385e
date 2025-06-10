
import React, { useState } from 'react';
import { Settings, Moon, Sun, Calendar as CalendarIcon, List, Building, Tag } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import AddProjectDialog from './AddProjectDialog';
import AddNotificationTypeDialog from './AddNotificationTypeDialog';

interface SettingsButtonProps {
  onViewModeChange?: (mode: 'list' | 'calendar') => void;
  viewMode?: 'list' | 'calendar';
  projects?: { id: number; name: string }[];
  notificationTypes?: { id: string; name: string }[];
  onAddProject?: (projectName: string) => void;
  onAddNotificationType?: (typeName: string) => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ 
  onViewModeChange, 
  viewMode = 'list',
  projects = [],
  notificationTypes = [],
  onAddProject,
  onAddNotificationType
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddProjectDialog, setShowAddProjectDialog] = useState(false);
  const [showAddTypeDialog, setShowAddTypeDialog] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  const handleViewModeToggle = () => {
    const newMode = viewMode === 'list' ? 'calendar' : 'list';
    if (onViewModeChange) {
      onViewModeChange(newMode);
    }
  };

  const handleAddProject = (projectName: string) => {
    if (onAddProject) {
      onAddProject(projectName);
    }
  };

  const handleAddNotificationType = (typeName: string) => {
    if (onAddNotificationType) {
      onAddNotificationType(typeName);
    }
  };

  const isDark = theme === 'dark';

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-background border border-border rounded-full shadow-lg hover:bg-accent transition-all duration-200"
          title="הגדרות"
        >
          <Settings size={24} className="text-foreground" />
        </button>

        {isOpen && (
          <>
            {/* Overlay to close dropdown when clicking outside */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <div className="absolute top-full left-0 mt-2 bg-background border border-border rounded-lg shadow-xl w-56 z-50">
              <div className="p-3 border-b border-border">
                <h3 className="font-semibold text-foreground text-sm">הגדרות</h3>
              </div>
              <div className="p-2 space-y-2">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between p-3 rounded-md hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {isDark ? <Sun size={16} className="text-foreground" /> : <Moon size={16} className="text-foreground" />}
                    <span className="text-foreground text-sm">{isDark ? 'מצב בהיר' : 'מצב כהה'}</span>
                  </div>
                  <div className={`w-12 h-6 rounded-full transition-colors ${isDark ? 'bg-primary' : 'bg-muted'} relative`}>
                    <div className={`w-5 h-5 bg-background rounded-full absolute top-0.5 transition-transform ${isDark ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                  </div>
                </button>

                {/* View Mode Toggle */}
                <button
                  onClick={handleViewModeToggle}
                  className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors"
                >
                  {viewMode === 'list' ? <CalendarIcon size={16} className="text-foreground" /> : <List size={16} className="text-foreground" />}
                  <span className="text-foreground text-sm">{viewMode === 'list' ? 'תצוגת לוח שנה' : 'רשימת הודעות'}</span>
                </button>

                {/* Add Project */}
                <button
                  onClick={() => {
                    setShowAddProjectDialog(true);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors"
                >
                  <Building size={16} className="text-foreground" />
                  <span className="text-foreground text-sm">הוסף פרויקט</span>
                </button>

                {/* Add Notification Type */}
                <button
                  onClick={() => {
                    setShowAddTypeDialog(true);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-accent transition-colors"
                >
                  <Tag size={16} className="text-foreground" />
                  <span className="text-foreground text-sm">הוסף סוג הודעה</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <AddProjectDialog
        open={showAddProjectDialog}
        onOpenChange={setShowAddProjectDialog}
        onAddProject={handleAddProject}
      />

      <AddNotificationTypeDialog
        open={showAddTypeDialog}
        onOpenChange={setShowAddTypeDialog}
        onAddNotificationType={handleAddNotificationType}
      />
    </>
  );
};

export default SettingsButton;
