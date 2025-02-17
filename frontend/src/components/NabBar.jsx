import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import { assets } from "../assets/assets";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const NavBar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();


  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      // إذا لم يكن النقر داخل عنصر يحمل كلاس "menu-profile"
      // (سواء على الأيقونة أو داخل حاوية القائمة)
      if (!event.target.closest(".menu-profile")) {
        setShowProfileMenu(false);
      }
    };

    // أضف المستمع للأحداث عند فتح القائمة
    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    // أزل المستمع عند إغلاق القائمة
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  // دالة تسجيل الخروج
  const handleLogout = () => {
    logout();
    toast.success("تم تسجيل الخروج بنجاح");
    navigate("/login");
  };

  return (
    // شريط التنقل ثابت في الأسفل
    <nav className=" bottom-0 left-0 w-full flex items-center justify-center bg-gray-100 p-4 shadow-md z-30">
      <ul className="flex gap-5 items-center">
        
        {/* الملف الشخصي */}
        <li
          className={`relative flex flex-col items-center`}
        >
          {/* لاحظ إضافة الكلاس "menu-profile" على أيقونة الحساب */}
          <img
            onClick={() => setShowProfileMenu((prev) => !prev)}
            src={assets.Profile}
            alt="Profile"
            className="mb-2 cursor-pointer menu-profile"
            aria-label="Toggle profile menu"
          />
          <p  onClick={() => setShowProfileMenu((prev) => !prev)} className="cursor-pointer menu-profile">حسابي</p>
          {/* القائمة المنسدلة للملف الشخصي */}
          {showProfileMenu && (
            // أضف الكلاس "menu-profile" أيضًا هنا
            <div className="menu-profile absolute w-48 z-10 bottom-full mb-2 bg-white rounded-lg shadow-lg p-4">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      if (user && user.id) {
                        navigate(`/profile/${user.id}`);
                        setShowProfileMenu(false);
                      } else {
                        console.error("User ID is missing or invalid.");
                      }
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    الملف الشخصي
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    navigate("/login");
                    setShowProfileMenu(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  تسجيل الدخول
                </button>
              )}
            </div>
          )}
        </li>

        {/* المجتمع */}
        <li
          className={`flex flex-col items-center `}
        >
          <Link to="/MyComponent" className="flex flex-col items-center">
            <img src={assets.Group} alt="Group Icon" className="mb-2" />
            المجتمع
          </Link>
        </li>

        {/* الرئيسية */}
        <li
          className={`flex flex-col items-center `}
        >
          <Link to="/" className="flex flex-col items-center">
            <img
              src={assets.home}
              alt="Home Icon"
              className="mb-2 brightness-75 hover:brightness-100"
            />
            الرئيسية
          </Link>
        </li>

        {/* القائمة */}
        <li
          className={`flex flex-col items-center text-orange-600`}
        >
          <Link to="/menu" className="flex flex-col items-center">
            <img
              src={assets.menu_icon}
              alt="Menu Icon"
              className="w-6 h-6 mb-2"
            />
            القائمة
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
