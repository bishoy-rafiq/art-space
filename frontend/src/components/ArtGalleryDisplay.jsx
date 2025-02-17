import React, { useRef, useState, useEffect, useCallback } from "react";
import { assets } from "../assets/assets";
import axios from 'axios';
import { useNotifications } from "../context/NotificationsContext";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";

const ArtGalleryDisplay = () => {
  const { addNotification } = useNotifications(); // استخدام دالة الإشعار
  const { addFavorite } = useFavorites(); // استخدام دالة إضافة المفضلة
  const [isMobile, setIsMobile] = useState(false);
  const imgRefs = useRef({});
  const overlayRefs = useRef({});
  const [virtualmarket, setVirtualMarket] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVirtualMarket = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/items');
        if (response.data) {
          setVirtualMarket(response.data.virtualmarket);
        } else {
          setError('لا توجد بيانات لعرضها');
        }
      } catch (error) {
        setError('حدث خطأ أثناء جلب البيانات');
      } finally {
        setLoading(false);
      }
    };
    fetchVirtualMarket();
  }, []); // ✅ إضافة المصفوفة الفارغة
  


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleInteraction = useCallback((event, id) => {
    let clientX, clientY;

    if (event.touches) {
      // إذا كان الحدث من نوع لمس
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      // إذا كان الحدث من نوع ماوس
      clientX = event.clientX;
      clientY = event.clientY;
    }

    const imgElement = imgRefs.current[id];
    const overlayElement = overlayRefs.current[id];

    if (!imgElement || !overlayElement) return;

    const { width, height, left, top } = imgElement.getBoundingClientRect();

    const xPercent = ((clientX - left) / width - 0.5) * 2;
    const yPercent = ((clientY - top) / height - 0.5) * 2;

    const rotateX = yPercent * -15;
    const rotateY = xPercent * 15;

    imgElement.style.transition = "transform 0.3s ease-out";
    overlayElement.style.transition = "transform 0.3s ease-out";

    imgElement.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.2)`;
    overlayElement.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.15)`;
  }, []);

  const resetInteraction = (id) => {
    const imgElement = imgRefs.current[id];
    const overlayElement = overlayRefs.current[id];

    if (!imgElement || !overlayElement) return;

    imgElement.style.transition = "transform 0.3s ease-out";
    overlayElement.style.transition = "transform 0.3s ease-out";

    imgElement.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    overlayElement.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  };

  const handleAddFavorite = (virtualmarket) => {
    addFavorite({
      item_id: virtualmarket.id,
      item_type: "virtualmarket", 
    });
  };
  

  return (
    <div className="flex flex-col gap-4 justify-start items-center  py-16 pb-40">
    <h2 className="text-2xl font-bold text-right mb-6">السوق الافتراضي</h2>
  
    {!virtualmarket.length && !loading && !error && (
      <p className="text-center text-gray-500">لا توجد عناصر في السوق الافتراضي حاليًا.</p>
    )}
  
    {virtualmarket.length > 0 ? (
      virtualmarket.map((virtualmarket) => (
        <div
          key={virtualmarket.id}
          className="w-[90%] sm:w-4/5 h-[359px] relative mx-auto mt-2 sm:mt-4"
          onMouseMove={(e) => !isMobile && handleInteraction(e, virtualmarket.id)}
          onMouseLeave={() => !isMobile && resetInteraction(virtualmarket.id)}
          onTouchMove={(e) => isMobile && handleInteraction(e, virtualmarket.id)}
          onTouchEnd={() => isMobile && resetInteraction(virtualmarket.id)}
        >
          <img
            ref={(el) => (imgRefs.current[virtualmarket.id] = el)}
            src={virtualmarket.image}
            alt={virtualmarket.title}
            className="w-full h-full object-cover transition-transform duration-300 ease-out rounded-lg"
          />
          <img
            onClick={() => {
              addNotification("تم إضافة العنصر", `تمت إضافة ${virtualmarket.title} بنجاح إلى المفضلة!`);
              handleAddFavorite(virtualmarket);
            }}
            src={assets.heart}
            alt="favorite"
            className="cursor-pointer p-2 sm:p-3 absolute top-3 right-3"
          />
          <img
            ref={(el) => (overlayRefs.current[virtualmarket.id] = el)}
            src={assets.image_3D}
            alt="3D Overlay"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out opacity-90 pointer-events-none"
          />
          {/* ✅ تفاصيل العنصر */}
          <div className="absolute hidden sm:block bottom-2.5 right-2.5 bg-white/80 px-2.5 py-2 rounded-md text-right text-sm font-bold shadow-md">
            <p>{virtualmarket.title}</p>
            <p>{virtualmarket.address}</p>
            <p>{virtualmarket.details}</p>
            <p>{virtualmarket.price}</p>
            <button 
              onClick={() => navigate("/addorder", { state: { virtualmarket } })}
              className="bg-yellow-500 py-1 p-8 rounded-lg hover:bg-yellow-600 text-sm mt-2">
              شراء
            </button>
          </div>
          <div className="sm:hidden flex flex-col items-center py-2 text-right text-sm">
            <p className="text-sm sm:text-base font-semibold">{virtualmarket.title}</p>
            <p className="text-gray-600">{virtualmarket.address}</p>
            <p className="text-gray-600">{virtualmarket.details}</p>
            <p className="text-gray-900 font-bold">{virtualmarket.price}</p>
            <button 
              onClick={() => navigate("/addorder", { state: { virtualmarket } })}
              className="bg-yellow-500 py-1 px-4 rounded-lg hover:bg-yellow-600 text-sm mt-2">
              شراء
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-500">لا توجد عناصر لعرضها.</p>
    )}
  </div>
  
  );

};

export default ArtGalleryDisplay;
