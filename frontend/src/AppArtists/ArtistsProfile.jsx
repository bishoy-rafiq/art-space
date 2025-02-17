import React, { useState, useEffect } from "react";
import axios from "axios";
import Upload from "../assets/Upload.png";
import { toast } from "react-toastify";

const ArtistsProfile = () => {
  const [artist, setArtistProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedArtist, setEditedArtist] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const apiUrl = "http://localhost:3001";

  useEffect(() => {
    fetchArtistProfile();
  }, []);

  const fetchArtistProfile = async () => {
    const artist_id = localStorage.getItem("artist_id");
    if (!artist_id) {
      console.warn("⚠️ لا يوجد معرف فنان في LocalStorage!");
      return;
    }
    try {
      const response = await axios.get(`${apiUrl}/api/artists/${artist_id}`);
      setArtistProfile(response.data.data);
      setEditedArtist(response.data.data);
    } catch (error) {
      console.error("❌ خطأ في جلب البيانات:", error);
      toast.error("❌ فشل تحميل البيانات، تحقق من الخادم!");
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleChange = (e) => {
    setEditedArtist({ ...editedArtist, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setEditedArtist({ ...editedArtist, image: URL.createObjectURL(file) }); // عرض الصورة الجديدة فورًا
    }
  };

  const handleSave = async () => {
    const artist_id = localStorage.getItem("artist_id");
    if (!artist_id) {
      console.warn("⚠️ لا يوجد معرف فنان في LocalStorage!");
      return;
    }

    const formData = new FormData();
    Object.keys(editedArtist).forEach((key) => {
      formData.append(key, editedArtist[key]);
    });

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await axios.put(`${apiUrl}/api/artists/${artist_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("✅ تم تحديث البيانات بنجاح!");
      fetchArtistProfile();
      setIsEditing(false);
    } catch (error) {
      console.error("❌ خطأ في تحديث البيانات:", error);
      toast.error("❌ فشل التحديث، تحقق من الخادم!");
    }
  };

  if (!artist) {
    return <p className="text-center text-gray-600">جارِ تحميل البيانات...</p>;
  }

  return (
    <div className="p-4 text-right justify-center font-cairo">
{/* صورة الفنان (تظهر فقط إذا لم يكن في وضع التعديل) */}
{!isEditing && (
  <div className="flex justify-center mt-4">
    <img
      src={artist.image}
      alt={artist.name}
      className="w-[300px] md:w-1/2 lg:w-1/3 rounded-lg object-cover"
    />
  </div>
)}

{/* تعديل الصورة (تظهر فقط أثناء التعديل) */}
{isEditing && (
  <div className="relative mb-4">
    {/* عرض الصورة الجديدة عند اختيارها، وإلا يتم عرض الصورة القديمة */}
    <img
      src={editedArtist.image || artist.image}
      className="w-full h-40 object-cover rounded-md"
      alt="صورة الخلفية"
    />
    
    <div className="absolute inset-0 bg-[#ffffffac] bg-opacity-70 rounded-md flex items-center justify-center">
      <label className="flex flex-col items-center cursor-pointer">
        <img src={Upload} alt="أيقونة الرفع" className="w-12 h-12 mb-2 opacity-75" />
        <span className="text-sm font-medium">اضغط لرفع صورة</span>
        <input type="file" onChange={handleFileChange} className="hidden" />
      </label>
    </div>
  </div>
)}


      {/* زر التعديل والحفظ */}
      {!isEditing ? (
        <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          تعديل
        </button>
      ) : (
        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 ml-2 rounded-md">
          حفظ
        </button>
      )}

      {/* عرض بيانات الفنان */}
      {[
        { label: "الاسم", key: "name" },
        { label: "اسم آخر", key: "othar_name" },
        { label: "نبذه عنك", key: "degree" },
        { label: "الجنسية", key: "nationality" },
        { label: "المهنة", key: "profession" },
        { label: "مكان الإقامة", key: "location" },
        { label: "الكلية", key: "college" },
        { label: "التخصص", key: "speciality" },
        { label: "سنة التخرج", key: "graduation_year" },
        { label: "الدورات", key: "rotors" },
        { label: "المهارة 1", key: "skill_1" },
        { label: "المهارة 2", key: "skill_2" },
        { label: "الإنجازات", key: "achievements" },
        { label: "لينك الفيسبوك", key: "hrefF" },
        { label: "لينك انستغرام", key: "hrefI" },
        { label: "لينك اليوتيوب", key: "hrefY" },
        { label: "لينك تويتر", key: "hrefX" },
      ].map(({ label, key }, index) => (
        <p className="text-gray-600 mb-2" key={index}>
          <span className="font-bold">{label}: </span>
          {isEditing ? (
            <input
              type="text"
              name={key}
              value={editedArtist[key] || ""}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          ) : (
            artist[key] || "غير متوفر"
          )}
        </p>
      ))}
    </div>
  );
};

export default ArtistsProfile;
