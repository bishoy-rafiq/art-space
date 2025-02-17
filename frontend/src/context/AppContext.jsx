import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

   
    const apiUrl ="http://localhost:3001";

    // دالة لتحميل بيانات الفئات
    const loadCategoriesData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiUrl}/api/allItmes`);
            if (response.data && response.data.categories) {
                setCategories(response.data.categories); // تعيين البيانات إلى الحالة
            } else {
                toast.error("لم يتم العثور على بيانات الفئات.");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("حدث خطأ أثناء جلب البيانات.");
        } finally {
            setLoading(false);
        }
    };

    // استدعاء الدالة مرة واحدة عند التحميل الأولي
    useEffect(() => {
        loadCategoriesData();
    }, []); // مصفوفة اعتماد فارغة

    // تمرير القيم إلى السياق
    const value = {
        categories,
        loadCategoriesData,
        loading,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
