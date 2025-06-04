
import { Notification } from '../types/notification';

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'bug',
    project: 1,
    title: 'תיקון באג קריטי בממשק המשתמש',
    shortText: 'זוהה ותוקן באג שגרם לקריסת המערכת במצבים מסוימים',
    longText: 'הבאג אותר בקומפוננטת הטעינה הראשית ונגרם בגלל שגיאה בטיפול בנתונים אסינכרוניים. התיקון כולל שיפור בטיפול בשגיאות והוספת מנגנון חזרה למצב יציב.',
    createdAt: new Date('2024-01-15T10:30:00'),
    isPinned: true,
    isRead: false
  },
  {
    id: '2',
    type: 'update',
    project: 2,
    title: 'עדכון מערכת אבטחה',
    shortText: 'עודכנו פרוטוקולי האבטחה למערכת ההתחברות',
    longText: 'השדרוג כולל יישום תקן OAuth 2.1, הצפנה משופרת לסיסמאות, ומנגנון זיהוי דו-שלבי מתקדם. השינויים נכנסו לתוקף החל מהיום.',
    createdAt: new Date('2024-01-14T14:15:00'),
    isPinned: false,
    isRead: true
  },
  {
    id: '3',
    type: 'version',
    project: 1,
    title: 'שחרור גרסה 2.4.1',
    shortText: 'גרסה חדשה עם שיפורים בביצועים ותכונות חדשות',
    longText: 'הגרסה החדשה כוללת: ממשק משתמש מחודש, שיפור בזמני טעינה של 40%, תמיכה בעברית משופרת, ואינטגרציה עם מערכות חיצוניות נוספות.',
    createdAt: new Date('2024-01-13T09:00:00'),
    isPinned: true,
    isRead: false
  },
  {
    id: '4',
    type: 'maintenance',
    project: 3,
    title: 'תחזוקה מתוכננת בסוף השבוע',
    shortText: 'השבתה מתוכננת של המערכת לצורך תחזוקה',
    longText: 'התחזוקה תתבצע בין השעות 23:00 ביום שישי ל-06:00 ביום ראשון. במהלך התקופה הזו המערכת לא תהיה זמינה. אנא שמרו את העבודה שלכם מראש.',
    createdAt: new Date('2024-01-12T16:45:00'),
    isPinned: false,
    isRead: true
  },
  {
    id: '5',
    type: 'security',
    project: 2,
    title: 'התראת אבטחה - פעילות חשודה',
    shortText: 'זוהתה פעילות חשודה במערכת',
    longText: 'המערכת זיהתה ניסיונות התחברות חוזרים ונשנים מכתובת IP לא מוכרת. הנתונים הועברו לצוות האבטחה לבדיקה. אנא וודאו שהסיסמאות שלכם חזקות ועדכניות.',
    createdAt: new Date('2024-01-11T11:20:00'),
    isPinned: true,
    isRead: false
  },
  {
    id: '6',
    type: 'info',
    project: 1,
    title: 'הוספת תכונה חדשה - ייצוא נתונים',
    shortText: 'נוספה אפשרות לייצא נתונים בפורמטים שונים',
    createdAt: new Date('2024-01-10T13:30:00'),
    isPinned: false,
    isRead: true
  }
];
