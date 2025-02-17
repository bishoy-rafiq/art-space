import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets"; // Ensure the path is correct
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useNotifications } from "../context/NotificationsContext";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext); // Add user from AuthContext
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { notifications } = useNotifications();
  const location = useLocation();
  const navigate = useNavigate();
  const isNotHome = location.pathname !== "/";

  // Update screen size state
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".menu-notification") &&
        !event.target.closest(".menu-profile")
      ) {
        setShowMenu(false);
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    alert("تم تسجيل الخروج بنجاح");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between z-30 text-sm py-4 mb-2 mx-4 border-b border-b-[#ADADAD] font-cairo">
      {/* Menu Icon */}
      <div className="flex items-center gap-4 rounded-full bg-[#ffffff] p-2 shadow-lg">
        <img
          onClick={() => setShowMenu((prev) => !prev)}
          src={assets.Vector}
          alt="Menu Icon"
          className="w-5 cursor-pointer"
          aria-label="Toggle menu"
        />
        <div
          className={`${
            showMenu ? "absolute w-80 z-10" : "h-0 w-0"
          } top-20 overflow-hidden bg-white transition-all`}
        >
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            {/* Display Notifications */}
            {notifications.length > 0 ? (
  notifications.slice(0, 5).map(({ title, text, type, date }, index) => (
    <li key={index} className="flex items-start gap-3 bg-red-50 rounded-2xl p-3 my-2 w-full shadow-md menu-notification">
      <img src={assets.notification} className={`p-2 rounded-full ${type === "comment" ? "bg-indigo-200" : "bg-orange-200"}`} alt="Notification Icon" />
      <div>
        <h4 className="font-bold">{title}</h4>
        <p>{text}</p>
        <small className="text-gray-500 text-xs">{date}</small>
      </div>
    </li>
  ))
) : (
  <p className="text-gray-500 text-center">لا توجد إشعارات حالياً</p>
)}

          </ul>
        </div>

        {/* Profile Menu */}
        <div className="relative m-1 hidden md:flex">
          <img
            onClick={() => setShowProfileMenu((prev) => !prev)}
            src={assets.Profile}
            alt="Profile"
            className="w-5 cursor-pointer menu-profile"
            aria-label="Toggle profile menu"
          />
          {showProfileMenu && (
            <div className="absolute w-48 z-10 top-10 bg-white rounded-lg shadow-lg p-4 menu-profile">
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
        </div>
      </div>

      {/* Navigation Links */}
      <ul className="md:flex hidden items-center gap-4 font-cairo text-sm font-bold">
        <NavLink to="/about">
          <li className="py-1">من نحن</li>
        </NavLink>
        <NavLink to="/mycomponent">
          <li className="py-1">المنتدى</li>
        </NavLink>
        <NavLink to="/artistsall">
          <li className="py-1">الفنانين</li>
        </NavLink>
        <NavLink to="/artgallerydisplay">
          <li className="py-1">المعرض الفني</li>
        </NavLink>
        <NavLink to="/artmarket">
          <li className="py-1">السوق الفني</li>
        </NavLink>
        <NavLink to="/auctions">
          <li className="py-1">المزادات</li>
        </NavLink>
        <NavLink to="/categories/الفئات">
          <li className="py-1">الفئات</li>
        </NavLink>
      </ul>

      {/* Logo */}
      <div>
        <NavLink to="/">
          {isNotHome && isMobile ? (
            <div className="flex items-center justify-between gap-4 w-full">
              <button onClick={() => navigate(-1)} className="">
                <img src={assets.arrow_icon} alt="Back" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <h1 className="font-cairo text-lg cursor-pointer text-[#c9a635]">
                فضاء الفن
              </h1>
              <img src={assets.logo} alt="Logo" className="w-14 h-14 cursor-pointer" />
            </div>
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;