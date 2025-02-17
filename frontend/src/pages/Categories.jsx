import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Categories = () => {
    const scrollRef = useRef(null);
    const [categories, setCategories] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/all');
          if (response.data) {
            setCategories(response.data.categories);
        } else {
          setError('لا توجد بيانات لعرضها');
        }
      } catch (error) {
        setError('حدث خطأ أثناء جلب البيانات');
      } finally {
        setLoading(false);
      }
    };
  
      fetchCategories();
    }, []);
  
    if (loading) {
      return <p>جارٍ التحميل...</p>;
    }
  
    if (error) {
      return <p>{error}</p>;
    }
  
    return (
        <div
            id="speciality"
            className="flex flex-col text-right gap-4 py-16 text-[#57575F] mx-2 md:mx-10 mt-4 font-cairo font-bold"
        >
            <div className="hidden md:block text-2xl p-4">
                <h1>الفئات</h1>
                <p>
                    <span className="text-orange-200">تجربة بصرية غير مسبوقة: </span>
                    استمتع بجميع فئات <br /> الفن
                </p>
            </div>

            {/* الشبكة أو التمرير حسب الشاشة */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto justify-start mt-4  md:overflow-hidden md:grid md:grid-cols-auto md:mx-10 scrollbar-hide"
            >      

                {categories.map((item, index) => (
                    <Link
                        to={`/categories/${item.speciality}`}  // تعديل الرابط ليحتوي على الفئة
                        onClick={() => window.scrollTo(0, 0)} // إعادة تعيين التمرير عند التنقل
                        className="cursor-pointer flex-shrink-0 md:flex-shrink"
                        key={index}
                    >
                        <div className="bg-white md:bg-green-50 rounded-lg shadow-lg mb-4 p-4">
                            <p className="text-[#57575F] font-cairo font-bold mt-2 text-center">{item.speciality}</p>
                            <img
                                className="hidden md:block w-full rounded-lg mt-2"
                                src={item.image}
                                alt={item.speciality}
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Categories;
