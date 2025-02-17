import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "./AuthContext"; // ✅ استيراد سياق المصادقة

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const { user, token } = useContext(AuthContext); // ✅ يجب استدعاؤه داخل المكوّن

  const addFavorite = async (item) => {
    if (!user || !user.id) {
      toast.error("❌ لم يتم العثور على المستخدم، يرجى تسجيل الدخول.");
      return;
    }
  
    if (!token) {
      toast.error("❌ غير مصرح بالدخول، لم يتم إرسال التوكن.");
      return;
    }
  
    const itemWithUser = { ...item, user_id: user.id };
  
    try {
      const response = await axios.post(
        "http://localhost:3001/api/favorites",
        itemWithUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 201) {
        setFavorites((prev) => [...prev, itemWithUser]);
        toast.success("✅ تمت الإضافة إلى المفضلة");
      }
    } catch (error) {
      toast.error(`❌ ${error.response?.data?.message || "حدث خطأ أثناء إضافة العنصر إلى المفضلة"}`);
    }
  };
  
  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// ✅ هوك لاستخدام سياق المفضلات بشكل صحيح
export const useFavorites = () => useContext(FavoritesContext);
