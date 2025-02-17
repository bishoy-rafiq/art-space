import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NabBar from "./components/NabBar"; // تأكد من أن هذا الاسم صحيح في المشروع
import MyComponent from "./pages/MyComponent";
import CategoriesView from "./pages/CategoriesAll";
import ArtGalleryDisplay from "./components/ArtGalleryDisplay";
import ArtistsAll from "./pages/ArtistsAll";
import ArtMarket from "./pages/ArtMarket";
import UserProfile from "./pages/UserProfile";
import ArtistsProfile from "./pages/ArtistsProfile";
import ArtSpace from "./pages/ArtSpace";
import Auctions from "./pages/Auctions";
import Menu from "./components/Menu";
import Register from "./components/Register";
import AddOrder from "./components/AddOrder";
import LoginPage from "./pages/LoginPage";
import Sidebar from "./AppArtists/Sidebar";
import SidebarAdmin from "./AppAdmin/SidebarAdmin";

import { NotificationsProvider } from "./context/NotificationsContext";
import AppContextProvider from "./context/AppContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ التحقق مما إذا كان المستخدم في لوحة الفنان أو لوحة الأدمن
  const isArtistDashboard = location.pathname.startsWith("/artist-dashboard");
  const isAdminDashboard = location.pathname.startsWith("/dashboard");

  // ✅ إخفاء الـ Navbar و Footer في لوحات التحكم
  const shouldShowNavAndFooter = !isArtistDashboard && !isAdminDashboard;

  return (
    <AuthProvider>
      <div className="font-cairo">
        <ToastContainer />
        <AppContextProvider>
          <NotificationsProvider>
            <FavoritesProvider>
              {shouldShowNavAndFooter && <Navbar />}

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mycomponent" element={<MyComponent />} />
                <Route path="/categories/:speciality" element={<CategoriesView />} />
                <Route path="/artgallerydisplay" element={<ArtGalleryDisplay />} />
                <Route path="/artistsall" element={<ArtistsAll />} />
                <Route path="/artmarket" element={<ArtMarket />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile/:id" element={<UserProfile />} />
                <Route path="/artist/:id" element={<ArtistsProfile />} />
                <Route path="/about" element={<ArtSpace />} />
                <Route path="/auctions/*" element={<Auctions />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/addorder" element={<AddOrder />} />
                <Route path="/artist-dashboard/:id" element={<Sidebar />} />
                <Route path="/dashboard" element={<SidebarAdmin />} />
              </Routes>

              {shouldShowNavAndFooter && (isSmallScreen ? <NabBar /> : <Footer />)}
            </FavoritesProvider>
          </NotificationsProvider>
        </AppContextProvider>
      </div>
    </AuthProvider>
  );
};

export default App;
