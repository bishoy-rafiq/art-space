import React, { useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import axios from 'axios';
import { useNotifications } from "../context/NotificationsContext";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";

const ArtMarktHome = () => {
  const { addNotification } = useNotifications();
  const { addFavorite } = useFavorites();
  const scrollRef = useRef(null);
  const [artworks, setArtWorks] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchArtWorks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/artworks');
        if (response.data) {
          setArtWorks(response.data.artworks);
        } else {
          setError('لا توجد بيانات لعرضها');
        }
      } catch (error) {
        setError('حدث خطأ أثناء جلب البيانات');
      } finally {
        setLoading(false);
      }
    };
  
    fetchArtWorks();
  }, []); // ✅ إضافة مصفوفة تبعيات فارغة لضمان تنفيذ `useEffect` مرة واحدة فقط
  
  const handleAddFavorite = (artworks) => {
    addFavorite({
      item_id: artworks.id, // ✅ تأكد أن `id` موجود
      item_type: "artworks", // ✅ نوع العنصر (يجب أن يكون محددًا)
    });
  };
  

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2; // الحركة بنصف عرض الشاشة
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth", // حركة سلسة
      });
    }
  };

  return (
    <div className="flex flex-col text-right gap-4 py-16 mx-2 mt-4 font-cairo">
      <h2 className="text-xl font-bold text-gray-800 mb-6">السوق الفني</h2>
      <div className="relative">
        {/* زر التمرير إلى اليسار */}
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg hover:bg-gray-300 z-10"
        >
          <img src={assets.chevron_right} alt="" />
        </button>

        {/* قائمة المزادات */}
        <div
  ref={scrollRef}
  className="flex gap-4 overflow-x-auto scrollbar-hide justify-start mt-4"

>
{artworks.length > 0 ? (
      artworks.map((artwork) => (
            <div
              key={artwork.id}
              className="bg-white shadow-md rounded-xl flex-shrink-0 min-w-[280px] sm:min-w-[350px]"
         
            >
              {/* صورة المنتج */}
              <div className="relative">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="w-full h-48 object-cover rounded-t-xl" 
                />
               
              </div>
              {/* محتوى العنصر */}
              <div className="p-4 flex-col ">
                <div>
                <div className="flex justify-between items-center mt-2">
                 
                <img
  onClick={() => {
    addNotification(
      "تم إضافة العنصر",
      `تمت إضافة ${artwork.title} بنجاح إلى المفضلة!`
    );
    handleAddFavorite(artwork); // ✅ تمرير العنصر
  }}
  src={assets.heart}
  className="cursor-pointer"
  alt="favorite"
/>

                  <p className="bg-blue-200 rounded-2xl p-2 mt-2 text-sm">
                    {artwork.Auctiontype}
                  </p>
               </div>
                  <h3 className="text-lg font-semibold text-gray-800 mt-2">
                    {artwork.title}
                  </h3>
                 
                </div>
                <div className="flex justify-between mt-4 items-center">
                  
                 
                
          
                <button 
                 onClick={() => navigate("/addorder", { state: { artwork } })}
                className="bg-yellow-500 py-1 p-8 rounded-lg hover:bg-yellow-600 text-sm mt-2">
                 شراء
                  </button>
                  <span className="text-red-600">{artwork.price}</span>
                  </div>
              </div>
            </div>
                        ))
                      ) : (
                        <p>لا توجد عناصر لعرضها.</p>
                      )}
        </div>

        {/* زر التمرير إلى اليمين */}
        <button
          onClick={() => scroll("right")}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg hover:bg-gray-300 z-10"
        >
                   <img src={assets.chevron_left} alt="" />

        </button>
      </div>
    </div>
  );
};

export default ArtMarktHome;
