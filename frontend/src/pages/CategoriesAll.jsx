import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios"; // استيراد axios
import { assets } from "../assets/assets";

const CategoriesAll = () => {
    const { speciality } = useParams();
    const [filterItems, setFilterItems] = useState([]);
    const { categories, setCategories, isLoading, setIsLoading,  } = useContext(AppContext); // جلب الحالات من السياق
    const navigate = useNavigate();

    const applyFilter = () => {
        if (!categories.length) {
            setFilterItems([]);
            return;
        }

        if (speciality === "الفئات") {
            setFilterItems(categories);
        } else {
            const selectedCategory = categories.find((cat) => cat.speciality === speciality);
            setFilterItems(selectedCategory ? [selectedCategory] : []);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/allItems', {
                 
                });
                setCategories(response.data.categories || []);
            } catch (error) {

            }
        };
        fetchData();
    }, [ setCategories, setIsLoading]);

    useEffect(() => {
        applyFilter();
    }, [categories, speciality]);

    if (isLoading) {
        return <p className="text-center text-gray-600">جارٍ تحميل البيانات...</p>;
    }

    return (
        <div className="justify-center mx-6 px-4 py-8 font-cairo font-bold text-gray-600">
            {/* أزرار الفلترة */}
            <div className="flex justify-center gap-5 text-sm flex-wrap">
                {categories.map((category, index) => (
                    <button
                    key={category.id || index} // استخدم id أو index كملاذ أخير

                        onClick={() => navigate(`/categories/${category.speciality}`)}
                        aria-pressed={speciality === category.speciality}
                        className={`transition-all cursor-pointer p-2 ${
                            speciality === category.speciality ? "text-blue-600 border border-blue-600" : ""
                        }`}
                    >
                        {category.speciality}
                    </button>
                ))}
                <button
                    onClick={() => navigate(`/categories/الفئات`)}
                    className={`transition-all cursor-pointer p-2 ${
                        speciality === "الفئات" ? "text-blue-600 border border-blue-600" : ""
                    }`}
                >
                    شاهد الكل
                </button>
            </div>

            {/* عرض العناصر */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-6 mt-6">
                {filterItems.length > 0 ? (
                    filterItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white shadow-md rounded-lg p-4 text-right transition-transform hover:scale-105"
                        >
                            {item.image && (
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-56 object-cover rounded-lg"
                                />
                            )}
                            <p className="mt-2">
                                <span className="bg-slate-100 p-1 ml-4">الفئة</span>
                                {item.speciality}
                            </p>
                            <h3 className="text-lg font-bold text-gray-700 mt-4 mb-2">
                                {item.title}
                            </h3>
                       <p className="text-sm font-bold text-gray-600 mt-4 mb-2">{item.address}</p>
                            <button
                                onClick={() => navigate(`/artgallerydisplay`)}
                                className="font-semibold hover:underline flex justify-start gap-4"
                            >
                                <img src={assets.chevron_right} alt="" /> اعرف أكثر
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600 col-span-3">
                        لا توجد عناصر متاحة لهذه الفئة.
                    </p>
                )}
            </div>
        </div>
    );
};

export default CategoriesAll;
