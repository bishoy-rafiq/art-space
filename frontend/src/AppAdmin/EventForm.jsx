import React, { useState } from 'react';
import axios from 'axios';
import bg from "../assets/auctions1.svg";
import Upload from "../assets/Upload.png";

function EventForm({ onAddEvent }) {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    data: '',
    effectiveness: '',
    image: null,
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // جديد: حالة لمعرفة إذا كان النموذج قيد الإرسال

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
    e.preventDefault(); // منع إرسال النموذج بشكل افتراضي

    if (isSubmitting) return; // إذا كان النموذج قيد الإرسال بالفعل، لا تقم بتقديمه مرة أخرى

    // Check if required fields are filled
    if (!formData.title || !formData.location || !formData.data || !formData.effectiveness) {
      setErrorMessage('يرجى ملء جميع الحقول!');
      setTimeout(() => setErrorMessage(''), 3000); // Clear error message after 3 seconds
      return;
    }

    setIsSubmitting(true); // تفعيل حالة الإرسال

    const form = new FormData();
    form.append('title', formData.title);
    form.append('location', formData.location);
    form.append('data', formData.data);
    form.append('effectiveness', formData.effectiveness);
    if (formData.image) {
      form.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://localhost:3001/api/events/addEvent', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        // Clear form and show success message only after the event is successfully added
        setFormData({
          title: '',
          location: '',
          data: '',
          effectiveness: '',
          image: null,
        });
        setSuccessMessage('تمت إضافة الحدث بنجاح!');
        setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds

        // Add the new event to the parent component
        onAddEvent(response.data.event);
      }
    } catch (error) {
      console.error('Error submitting event:', error);
      setErrorMessage('حدث خطأ أثناء الإرسال. حاول مرة أخرى!');
    } finally {
      setIsSubmitting(false); // إيقاف حالة الإرسال بعد التقديم
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

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="اكتب عنوان الحدث"
            value={formData.title}
            onChange={handleChange}
            name="title"
            className="mb-2 w-full border border-gray-300 p-2 rounded-md"
          />

          <input
            type="date"
            value={formData.data}
            onChange={handleChange}
            name="data"
            className="mb-2 w-full border border-gray-300 p-2 rounded-md"
          />

          <input
            type="text"
            placeholder="موقع الحدث"
            value={formData.location}
            onChange={handleChange}
            name="location"
            className="mb-2 w-full border border-gray-300 p-2 rounded-md"
          />

          <textarea
            placeholder="نوع الحدث"
            value={formData.effectiveness}
            onChange={handleChange}
            name="effectiveness"
            className="mb-2 w-full border border-gray-300 p-2 rounded-md"
          />

          <button
            type="submit"
            className="bg-purple-600 text-white py-2 px-4 rounded-md w-full hover:bg-purple-700 transition"
            disabled={isSubmitting} // تعطيل الزر أثناء الإرسال
          >
            {isSubmitting ? "جاري الإرسال..." : "نشر"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EventForm;
