import React, { createContext, useState, useContext } from "react";

// إنشاء Context
const NotificationsContext = createContext();

// مزود NotificationsContext
export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // وظيفة لإضافة إشعار جديد
  const addNotification = (title, text) => {
    if (!title || !text) {
      console.error("العنوان والنص مطلوبان لإضافة إشعار");
      return;
    }
    const newNotification = {
      title,
      text,
      date: new Intl.DateTimeFormat('ar-EG', {
        weekday: 'long', // اسم اليوم (الأحد، الاثنين...)
        hour: '2-digit', // الساعة
        minute: '2-digit', // الدقائق
        hour12: true, // صيغة 12 ساعة (ص/م)
        timeZone: 'Asia/Riyadh', // تحديد المنطقة الزمنية
      }).format(new Date()),
    };
    

    setNotifications((prev) => [newNotification, ...prev]);
  };

  // وظيفة لإزالة إشعار باستخدام الفهرس
  const removeNotification = (index) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

// استخدام NotificationsContext بسهولة
export const useNotifications = () => useContext(NotificationsContext);
