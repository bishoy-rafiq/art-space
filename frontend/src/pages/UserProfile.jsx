import React, { useEffect, useState, useContext } from "react";
import SectionOrders from "../components/SectionOrders";
import SectionFavorites from "../components/SectionFavorites";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user: authUser, token } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("orders"); 
  const userId = authUser?.id;

  useEffect(() => {
    const fetchData = async () => {
      if (!token || !userId) {
        setError("التوكن أو معرف المستخدم مفقود. يرجى تسجيل الدخول.");
        setLoading(false);
        return;
      }

      try {
        // 🟢 جلب جميع البيانات في وقت واحد باستخدام Promise.all
        const [userRes, ordersRes, favoritesRes] = await Promise.all([
          axios.get(`http://localhost:3001/api/profile/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:3001/api/orders/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:3001/api/favorites/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUser(userRes.data.user);
        setOrders(ordersRes.data.orders);
        setFavorites(favoritesRes.data.favorites);
      } catch (err) {
        console.error("❌ خطأ أثناء جلب البيانات:", err.response?.data || err.message);
        setError("حدث خطأ أثناء جلب البيانات. يرجى المحاولة لاحقًا.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, userId]);

  if (loading) return <div className="text-center">جاري تحميل البيانات...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          إعادة المحاولة
        </button>
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      {/* Header */}
      <div className="relative bg-cover bg-center rounded-3xl h-40" 
        style={{ backgroundImage: "linear-gradient(to right, rgba(0, 35, 102, 1), rgba(255, 255, 255, 1))" }}>
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
          <img 
            src={user?.profile_image || "/default-avatar.png"} 
            alt="User" 
            className="w-24 h-24 rounded-full border-4 border-white" 
          />
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mt-16">
        <h1 className="text-xl font-bold">{user?.name || "اسم المستخدم غير متوفر"}</h1>
      </div>

      <div className="px-4 mt-8">
        <div className="mb-4">
          <p className="text-right text-lg font-semibold mb-2">الاسم:</p>
          <p className="text-right text-gray-700">{user?.name || "غير متوفر"}</p>
        </div>
        <div className="mb-4">
          <p className="text-right text-lg font-semibold mb-2">تاريخ الميلاد:</p>
          <p className="text-right text-gray-700">{user?.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString() : "غير متوفر"}</p>
        </div>

        {/* Sections (Desktop View) */}
        <div className="mt-8 hidden md:block">
          <SectionOrders title="مشترياتي" orders={orders} />
          <SectionFavorites title="المفضلة" favorites={favorites} />
        </div>

        {/* Navigation Buttons (Mobile View) */}
        <div className="flex justify-center gap-4 mt-6 md:hidden">
          <button
            className={`py-2 rounded-lg w-full transition duration-300 ${activeTab === "orders" ? "bg-[#D4AF37] text-white" : "bg-white text-gray-400"}`}
            onClick={() => setActiveTab("orders")}
          >
            مشترياتي
          </button>
          <button
            className={`py-2 rounded-lg w-full transition duration-300 ${activeTab === "favorites" ? "bg-[#D4AF37] text-white" : "bg-white text-gray-400"}`}
            onClick={() => setActiveTab("favorites")}
          >
            المفضلة
          </button>
        </div>

        {/* Dynamic Section (Mobile View) */}
        <div className="mt-6 block md:hidden">
          {activeTab === "orders" ? <SectionOrders orders={orders} /> : <SectionFavorites favorites={favorites} />}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
