
import React, { useState } from 'react';
import { Settings, Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const SettingsButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-background border border-border rounded-full shadow-lg hover:bg-accent transition-all duration-200"
        title="הגדרות"
      >
        <Settings size={24} className="text-foreground" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-background border border-border rounded-lg shadow-xl w-48 z-50">
          <div className="p-3 border-b border-border">
            <h3 className="font-semibold text-foreground text-sm">מצב תצוגה</h3>
          </div>
          <div className="p-2">
            <button
              onClick={() => handleThemeChange('light')}
              className={`w-full flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors ${
                theme === 'light' ? 'bg-accent' : ''
              }`}
            >
              <Sun size={16} className="text-foreground" />
              <span className="text-foreground text-sm">מצב בהיר</span>
            </button>
            <button
              onClick={() => handleThemeChange('dark')}
              className={`w-full flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors ${
                theme === 'dark' ? 'bg-accent' : ''
              }`}
            >
              <Moon size={16} className="text-foreground" />
              <span className="text-foreground text-sm">מצב כהה</span>
            </button>
            <button
              onClick={() => handleThemeChange('system')}
              className={`w-full flex items-center gap-3 p-2 rounded-md hover:bg-accent transition-colors ${
                theme === 'system' ? 'bg-accent' : ''
              }`}
            >
              <Monitor size={16} className="text-foreground" />
              <span className="text-foreground text-sm">מצב מערכת</span>
            </button>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SettingsButton;
