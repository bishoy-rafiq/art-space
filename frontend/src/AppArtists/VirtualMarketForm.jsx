import React, { useEffect, useState } from 'react';
import axios from 'axios';
import bg from '../assets/auctions1.svg';
import Upload from '../assets/Upload.png';

function VirtualMarketForm({ onAddVirtualMarket }) {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        artist_id: localStorage.getItem("artist_id"),
        category_id: '',
        address: '',
        details: '',
        image: null,
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/all');
                if (isMounted) {
                    setCategories(Array.isArray(response.data.categories) ? response.data.categories : []);
                }
            } catch (error) {
                if (isMounted) setErrorMessage("حدث خطأ أثناء تحميل التصنيفات.");
            }
        };
    
        fetchCategories();
        return () => { isMounted = false };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            image: file,
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        const missingFields = Object.entries(formData).filter(
            ([key, value]) => !value && key !== 'image'
        );
        if (missingFields.length > 0) {
            setErrorMessage('يرجى ملء جميع الحقول المطلوبة!');
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }

        setIsSubmitting(true);

        const form = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === 'image' && formData[key]) {
                form.append('image', formData[key]);
            } else if (key !== 'image') {
                form.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post('http://localhost:3001/api/addItem', form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 200) {
                setFormData({
                    title: '',
                    price: '',
                    artist_id: localStorage.getItem("artist_id"),
                    category_id: '',
                    address: '',
                    details: '',
                    image: null,
                });
                setSuccessMessage('تمت إضافة العمل بنجاح!');
                setTimeout(() => setSuccessMessage(''), 3000);

                onAddVirtualMarket(response.data.virtualmarket);
            }
        } catch (error) {
            console.error('Error submitting virtualmarket:', error);
            setErrorMessage('حدث خطأ أثناء الإرسال. حاول مرة أخرى!');
        } finally {
            setIsSubmitting(false);
        }
    };

    
    return (
        <div className="flex items-center justify-center mt-4">
            <div className="flex-col p-6 rounded-lg shadow-lg bg-white mb-6 w-[90vw] sm:w-[70vw] md:w-[50vw] lg:w-[40vw]">
                <h2 className="text-xl font-bold text-center mb-4">إضافة عمل جديد</h2>

                {/* منطقة رفع الصورة */}
           <div className="relative mb-4">
                              <img src={bg} className="w-full h-40 object-cover rounded-md" alt="صورة الخلفية" />
                              <div className="absolute inset-0 bg-[#ffffffac] bg-opacity-70 rounded-md flex items-center justify-center">
                                  <label className="flex flex-col items-center cursor-pointer">
                                      <img src={Upload} alt="أيقونة الرفع" className="w-12 h-12 mb-2 opacity-75" />
                                      <span className="text-sm font-medium">اضغط لرفع صورة</span>
                                      <input type="file" onChange={handleFileChange} className="hidden" />
                                  </label>
                              </div>
                              {formData.image && (
                                  <img src={URL.createObjectURL(formData.image)} alt="Uploaded Preview" className="absolute inset-0 w-full h-40 object-cover rounded-md" />
                              )}
                          </div>

                {/* رسائل النجاح أو الخطأ */}
                {successMessage && <div className="text-center text-green-500 mb-4">{successMessage}</div>}
                {errorMessage && <div className="text-center text-red-500 mb-4">{errorMessage}</div>}

                {/* نموذج الإدخال */}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder="عنوان العمل"
                        value={formData.title}
                        onChange={handleChange}
                        className="mb-2 w-full border border-gray-300 p-2 rounded-md"
                    />

                    <input
                        type="number"
                        name="price"
                        placeholder="السعر"
                        value={formData.price}
                        onChange={handleChange}
                        className="mb-2 w-full border border-gray-300 p-2 rounded-md"
                    />

                    {/* القائمة المنسدلة لاختيار التخصص */}
                    <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        className="mb-2 w-full border border-gray-300 p-2 rounded-md"
                    >
                        <option value="">اختر التخصص</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        name="address"
                        placeholder="عنوان العمل الفني"
                        value={formData.address}
                        onChange={handleChange}
                        className="mb-2 w-full border border-gray-300 p-2 rounded-md"
                    />

                    <textarea
                        name="details"
                        placeholder="وصف العمل الفني"
                        value={formData.details}
                        onChange={handleChange}
                        className="mb-2 w-full border border-gray-300 p-2 rounded-md"
                    />

<button
                        type="submit"
                        className={`w-full py-2 rounded-md text-white font-bold ${isSubmitting ? 'bg-gray-400' : 'bg-purple-600 hover:bg-purple-700'} transition`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'جاري الإرسال...' : 'إضافة عمل'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default VirtualMarketForm;
