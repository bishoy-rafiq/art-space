import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    date_of_birth: '',
    email: '',
    password: '',
    profile_picture: null, // جديد لتخزين الصورة الشخصية
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value, // التعامل مع رفع الملفات
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    for (let key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:3001/api/addUser', formDataToSubmit, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log("User registered:", response.data);

      // عرض رسالة نجاح
      toast.success("تم التسجيل بنجاح! سيتم توجيهك إلى الصفحة الرئيسية...", {
        position: "top-right",
        autoClose: 3000,
      });

      // توجيه المستخدم إلى الصفحة الرئيسية بعد 3 ثوانٍ
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      // عرض رسالة خطأ
      toast.error(err.response?.data?.message || "فشل التسجيل", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">انشاء حساب</h2>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-2 text-right">
        <label>الاسم كامل</label>
        <input
          type="text"
          name="name"
          placeholder="الاسم كامل"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
        <label> تاريخ الميلاد</label>

        <input
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
        <label>البريد الإلكتروني</label>
        <input
          type="email"
          name="email"
          placeholder="الايميل"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
        <label>كلمة المرور</label>
        <input
          type="password"
          name="password"
          placeholder="الباسورد"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
        <label>الصورة الخاصه بك</label>
        <input
          type="file"
          name="profile_picture"
          onChange={handleChange}
          accept="image/*"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
        {formData.profile_picture && (
          <div className="mt-4 text-center">
            <img
              src={URL.createObjectURL(formData.profile_picture)}
              alt="Profile preview"
              className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-gray-300"
            />
          </div>
        )}
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
          تسجيل
        </button>
      </form>
    </div>
  );
};

export default Register;
