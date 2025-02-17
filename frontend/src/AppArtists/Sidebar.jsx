import React, { useEffect, useState } from "react";
import AuctionsPage from "./AuctionsPage";
import SilentAuctions from "./SilentAuction";
import ArtWorks from "./ArtWorks";
import VirtualMarket from "./VirtualMarket";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import ArtistsProfile from "./ArtistsProfile";

function Sidebar() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // توجيه المستخدم إذا لم يكن مسجلاً
    }
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [activeTab, setActiveTab] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // حالة لإظهار/إخفاء الشريط الجانبي

  const menuItems = [
    { id: 1, name: "الصفحه الشخصيه"},
    { id: 2, name: "المزادات الحية  " },
    { id: 3, name: "المزادات الصامتة" },
    { id: 4, name: " الاعمال الفنية "},
    { id: 5, name: "3D الاعمال الفنية "},
  ];

  return (
    <div className="flex flex-row-reverse font-cairo mt-2">
      {/* القائمة الجانبية */}
      <div
         className={`${
          isSidebarOpen ? "block inset-0 z-100" : "hidden"
        } w-[300px] bg-gray-100  lg:block flex flex-col justify-between h-screen`}
      >
        <div className="px-4 py-3">
          <h1 className="text-2xl font-bold flex items-center justify-between">
            فضاء الفن
            <img src={logo} className="w-10 h-10" alt="Logo" />
          </h1>
        </div>
        <nav className="flex-1">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li
                key={item.id}
                className={`flex items-center px-4 py-2 rounded-lg cursor-pointer justify-end transition-all duration-200 ease-in-out ${
                  activeTab === item.id
                    ? "bg-blue-100 text-blue-600 transform scale-105"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="font-medium">{item.name}</span>
                <span className="text-xl ml-2">{item.icon}</span>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4">
          <button onClick={handleLogout} className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">تسجيل الخروج</button>
        </div>
      </div>

      {/* أيقونة القائمة الجانبية للأجهزة الصغيرة */}
      <div className="lg:hidden sm:block ">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-2xl text-purple-600"
        >
          ☰
        </button>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="mx-2">
        {activeTab === 1 && <ArtistsProfile />}
        {activeTab === 2 && <AuctionsPage />}
        {activeTab === 3 && <SilentAuctions/>}
        {activeTab === 4 && <ArtWorks/>}
        {activeTab === 5 && <VirtualMarket/>}
      </div>
    </div>
  );
}

export default Sidebar;
