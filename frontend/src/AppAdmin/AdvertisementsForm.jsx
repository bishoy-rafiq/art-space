import React, { useState } from 'react';
import axios from 'axios';
import bg from "../assets/auctions1.svg";
import Upload from "../assets/Upload.png";

function AdvertisementsForm({ onAddAdvertisement }) {

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    link: '',
    image_url: null,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      image_url: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('title', formData.title);
    form.append('content', formData.content);
    form.append('link', formData.link);
    if (formData.image_url) {
      form.append('image', formData.image_url); // تأكد من استخدام نفس الاسم كما في السيرفر
    }

    try {
  const url = 'http://localhost:3001';

      const response = await axios.post(`${url}/api/advertisements`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        // إضافة الإعلان إلى القائمة في المكون الأب
        onAddAdvertisement(response.data.advertisement); // تأكد من أن هذا هو الإعلان الجديد الذي يتم إضافته

        setSuccessMessage('تمت إضافة الإعلان بنجاح!');

        // مسح الحقول بعد الإضافة
        setFormData({
          title: '',
          content: '',
          link: '',
          image_url: null,
        });

        // إخفاء رسالة النجاح بعد 3 ثواني
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setErrorMessage('حدث خطأ أثناء إرسال الإعلان.');
      }
    } catch (error) {
      console.error('Error submitting advertisement:', error);
      setErrorMessage('حدث خطأ أثناء الإرسال. حاول مرة أخرى!');
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

          {formData.image_url && (
            <img
              src={URL.createObjectURL(formData.image_url)}
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

        <input
          type="text"
          placeholder="اكتب عنوان الاعلان "
          value={formData.title}
          onChange={handleChange}
          name="title"
          className="mb-2 w-full border border-gray-300 p-2 rounded-md"
        />

        <input
          type="text"
          placeholder="رابط الإعلان"
          value={formData.link}
          onChange={handleChange}
          name="link"
          className="mb-2 w-full border border-gray-300 p-2 rounded-md"
        />

        <textarea
          placeholder="تفاصيل الاعلان هذا المحتوي يمكن تغيرة هذا المختوي يمكن تغييرة "
          value={formData.content}
          onChange={handleChange}
          name="content"
          className="mb-2 w-full border border-gray-300 p-2 rounded-md"
        />

        <button
          onClick={handleSubmit}
          className="bg-purple-600 text-white py-2 px-4 rounded-md w-full hover:bg-purple-700 transition"
        >
          نشر
        </button>
      </div>
    </div>
  );
}

export default AdvertisementsForm;
