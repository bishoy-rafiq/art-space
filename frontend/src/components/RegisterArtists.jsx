import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
const RegisterArtists = () => {
  const [formData, setFormData] = useState({
    name: '',
    othar_name: '',
    nationality: '',
    speciality: '',
    degree: '',
    profession: '',
    location: '',
    college: '',
    graduation_year: '',
    rotors: '',
    skill_1: '',
    skill_2: '',
    achievements: '',
    hrefX: '',
    hrefY: '',
    hrefI: '',
    hrefF: '',
    email: '',
    password: '',
    image: null, // جديد لتخزين الصورة الشخصية
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
      const response = await axios.post('http://localhost:3001/api/addArtist', formDataToSubmit, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log("User registered:", response.data);

      // عرض رسالة نجاح
      toast.success("تم التسجيل بنجاح! سيتم توجيهك إلى الصفحة الرئيسية...", {

      });

      // توجيه المستخدم إلى الصفحة الرئيسية بعد 3 ثوانٍ
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      // عرض رسالة خطأ
      toast.error(err.response?.data?.message || "فشل التسجيل", {
      });
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="max-w-md mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center"> انشاء حساب فنان</h2>
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


        <label> اللقب والاسم</label>
        <input
          type="text"
          name="othar_name"
          placeholder="الفنان / يوسف السالمي"
          value={formData.othar_name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />

        <label>الجنسية</label>
        <input type="text"
          name='nationality'
          placeholder='اماراتي'
          value={formData.nationality}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
        <label>التخصص</label>
        <input type="text"
          name='speciality'
          placeholder='نحت'
          value={formData.speciality}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
        <label>نبذه عنك</label>
        <input type="text"
          name='degree'
          placeholder='فنان نحات إماراتي يُعرف بإبداعه في الأعمال الفنية ...'
          value={formData.degree}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
        <label>المهنة</label>
        <input type="text"
          name='profession'
          placeholder='فنان نحت'
          value={formData.graduation_year}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
        <label>الموقع</label>
        <input type="text"
          name='location'
          placeholder='[المدينة، الدولة]'
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
        <label>الدرجة العلمية</label>


        <input type="text"
          name='college'
          placeholder='بكالوريوس الفنون الجميلة'
          value={formData.college}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
        <label> سنة التخرج</label>

        <input type="text"
          name='graduation_year'
          placeholder='2015'
          value={formData.graduation_year}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
        <label>الدوارت الخاصه بك</label>

        <input type="text"
          name='rotors'
          placeholder='النحت الحديث في المهعد البرطاني'
          value={formData.rotors}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
        <label>المهارات الخاصه بك</label>

        <input type="text"
          name='skill_1'
          placeholder='نحات مستقل : تصميم وتنفيذ منحوتات فنية للمعارض المحلية والدولية.'
          value={formData.skill_1}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
        <label>المهارات الخاصه بك</label>

        <input type="text"
          name='skill_2'
          placeholder='معلم فن النحت : تقديم ورش عمل لتعريف المشاركين بأساليب وتقنيات النحت الحديثة.'
          value={formData.skill_2}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
        <label>الفعاليات</label>

        <input type="text"
          name='achievements'
          placeholder='مشاركات في الفعاليات الثقافية :.....'
          value={formData.achievements}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
        <label>لينك تويتر</label>

        <input type="text"
          name='hrefX'
          placeholder='https://x.com/'
          value={formData.hrefX}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
        <label>لينك اليوتيوب</label>

        <input type="text"
          name='hrefY'
          placeholder='https://www.youtube.com/'
          value={formData.hrefY}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
        <label>لينك الانستقرام</label>

        <input type="text"
          name='hrefI'
          placeholder='https://www.instagram.com/'
          value={formData.hrefI}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
        <label>لينك الفيسبوك</label>

        <input type="text"
          name='hrefF'
          placeholder='https://www.facebook.com/'
          value={formData.hrefF}
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
          name="image"
          onChange={handleChange}
          accept="image/*"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500 disabled:opacity-50"
        />
        {formData.image && (
          <div className="mt-4 text-center">
            <img
              src={URL.createObjectURL(formData.image)}
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

export default RegisterArtists;
