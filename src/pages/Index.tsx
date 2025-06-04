
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import NotificationPanel from '../components/NotificationPanel';
import { mockNotifications } from '../data/mockNotifications';

const Index = () => {
  const [showNotifications, setShowNotifications] = useState(true);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">מערכת הודעות מתקדמת</h1>
          <p className="text-xl text-gray-600 mb-6">קומפוננטת הודעות עם תמיכה מלאה בעברית ותכונות מתקדמות</p>
          
          <Button 
            onClick={toggleNotifications}
            className="mb-8"
          >
            {showNotifications ? 'הסתר הודעות' : 'הצג הודעות'}
          </Button>
        </div>

        <div className="flex justify-center">
          {showNotifications && (
            <div className="animate-fade-in">
              <NotificationPanel 
                notifications={mockNotifications}
                onClose={() => setShowNotifications(false)}
              />
            </div>
          )}
        </div>

        {/* Demo Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6" dir="rtl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">תכונות המערכת</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">סוגי הודעות:</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• באג - הודעות על תקלות ותיקונים</li>
                <li>• עדכון מערכת - שדרוגים ושיפורים</li>
                <li>• גרסה - שחרור גרסאות חדשות</li>
                <li>• השבתה - תחזוקה מתוכננת</li>
                <li>• אבטחה - התראות אבטחה</li>
                <li>• מידע - הודעות כלליות</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">תכונות נוספות:</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• הצמדת הודעות חשובות</li>
                <li>• הרחבה וכיווץ של פרטים</li>
                <li>• הבחנה בין פרויקטים</li>
                <li>• תמיכה מלאה בעברית</li>
                <li>• עיצוב רספונסיבי</li>
                <li>• אנימציות חלקות</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
