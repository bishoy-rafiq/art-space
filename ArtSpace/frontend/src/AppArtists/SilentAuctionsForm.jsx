import React, { useState } from 'react';
import axios from 'axios';
import bg from '../assets/auctions1.svg';
import Upload from '../assets/Upload.png';

function SilentAuctionsForm({ onAddAuction }) {
    const [formData, setFormData] = useState({
        title: '',
        artist_id: localStorage.getItem("artist_id"),
        details: '',
        image: null,
    });

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            ([key, value]) => key !== 'image' && !value
        );
        if (missingFields.length > 0) {
            setErrorMessage('يرجى ملء جميع الحقول المطلوبة!');
            setTimeout(() => setErrorMessage(''), 3000);
            return;
        }

        setIsSubmitting(true);

        const form = new FormData();
        form.append('title', formData.title);
        form.append('artist_id', formData.artist_id);
        form.append('details', formData.details);
        if (formData.image) {
            form.append('image', formData.image);
        }

        try {
            const response = await axios.post('http://localhost:3001/api/addSilentAuction', form, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.status === 201) {
                setFormData({
                    title: '',
                    artist_id: localStorage.getItem("artist_id"),
                    details: '',
                    image: null,
                });
                setSuccessMessage('تمت إضافة المزاد بنجاح!');
                setTimeout(() => setSuccessMessage(''), 3000);

                onAddAuction(response.data.auction);
            }
        } catch (error) {
            console.error('Error submitting auction:', error);
            setErrorMessage('حدث خطأ أثناء الإرسال. حاول مرة أخرى!');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center mt-4">
            <div className="flex-col p-6 rounded-lg shadow-md mb-6 w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] xl:w-[30vw]">
                <div className="relative mb-4">
                    <img
                        src={bg}
                        className="w-full object-cover rounded-md"
                        alt="صورة الخلفية"
                    />
                    <div className="absolute inset-0 bg-[#ffffffac] bg-opacity-70 rounded-md"></div>

                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer"
                    />
                    <img
                        src={Upload}
                        alt="أيقونة الرفع"
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-75"
                    />

                    {formData.image && (
                        <img
                            src={URL.createObjectURL(formData.image)}
                            alt="Uploaded Preview"
                            className="absolute inset-0 w-full h-full object-cover rounded-md opacity-80"
                        />
                    )}
                </div>

                {successMessage && (
                    <div className="text-center text-green-500 mb-4">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="text-center text-red-500 mb-4">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='text-right'>
                <label className='m-1'> اضافة عنوان المزاد</label>
                    <input
                        type="text"
                        placeholder="اكتب عنوان المزاد"
                        value={formData.title}
                        onChange={handleChange}
                        name="title"
                        className="mb-2 w-full border border-gray-300 p-2 rounded-md"
                    />
            <label className='m-1'>اضافة تفاصيل العمل</label>

                           <input
                        type="text"
                        placeholder="لوحه مقاس 30*40 تعبر عن..."
                        value={formData.details}
                        onChange={handleChange}
                        name="details"
                        className="mb-2 w-full border border-gray-300 p-2 rounded-md"
                    />

                    <button
                        type="submit"
                        className="bg-purple-600 text-white py-2 px-4 rounded-md w-full hover:bg-purple-700 transition"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'جاري الإرسال...' : 'إضافة المزاد'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SilentAuctionsForm;
