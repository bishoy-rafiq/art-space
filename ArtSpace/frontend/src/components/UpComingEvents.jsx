import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { useNotifications } from '../context/NotificationsContext';
import { useFavorites } from '../context/FavoritesContext';
import { ar } from 'date-fns/locale';
import { format } from 'date-fns'; 
import { assets } from '../assets/assets';


const UpComingEvents = () => {
  const scrollRef = useRef(null);
  const { addNotification } = useNotifications();
  const { addFavorite } = useFavorites();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return format(date, "EEEE, dd MMMM yyyy", { locale: ar }); // يظهر اليوم والتاريخ مع الأرقام بالعربية
    };
  
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/events/events');
        console.log('Response Data:', response.data);
        setEvents(response.data.events || response.data); // تأكد من هيكل البيانات
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
  const handleAddFavorite = (event) => {
    addFavorite({
      item_id: event.id, 
      item_type: "upcoming_events",
    });
  };
  
  return (
    <div className="flex flex-col gap-4 py-16 md:mx-10 mt-4">
      <div className="flex text-right justify-between font-cairo font-bold text-xs md:text-2xl p-4">
        <Link to="/auctions/liveauctions" className="text-red-400">
          شاهد الكل
        </Link>
        <h1 className="hidden md:flex text-right">الفعاليات القادمة</h1>
        <h1 className="flex md:hidden">المزادات</h1>
      </div>

      {/* حالة التحميل */}
      {loading ? (
        <p className="text-center text-gray-600">جاري تحميل الفعاليات...</p>
      ) : events.length > 0 ? (
        <div
  ref={scrollRef}
  className="flex gap-4 overflow-x-auto scrollbar-hide justify-start mt-4"
>

{events.map((event, index) => (
            <div className="cursor-pointer flex-shrink-0" key={index}>
              <div className="bg-white rounded-lg shadow-lg mb-4 p-3 flex items-center gap-4 md:flex-col md:items-stretch">
                {/* صورة الحدث */}
                <img
                  className="w-14 h-14 rounded-md object-cover md:w-full md:h-40"
                  src={event.image || '/path-to-default-image.jpg'}
                  alt={event.title || 'عنوان غير متوفر'}
                />
                {/* النصوص */}
                <div className="flex flex-col gap-2">
                  <div className="md:flex justify-between mt-2 hidden">
                                  <img
                    onClick={() => {
                      addNotification(
                        "تم إضافة العنصر",
                        `تمت إضافة ${event.title} بنجاح إلى المفضلة!`
                      );
                      handleAddFavorite(event); // ✅ تمرير العنصر
                    }}
                    src={assets.heart}
                    className="cursor-pointer"
                    alt="favorite"
                  />
                    <p className="text-gray-600 font-cairo text-xs bg-blue-100 p-1 rounded-2xl">
                      {event.effectiveness || 'غير محدد'}
                    </p>
                  </div>
                  <p className="text-gray-600 font-cairo text-right md:text-sm text-xs">
                    {event.title || 'عنوان غير متوفر'}
                  </p>
                  <p className="text-gray-600 font-cairo text-right md:text-sm text-xs">
                    {event.location || 'الموقع غير متوفر'}
                  </p>
                  <p className="text-orange-600 font-cairo text-right md:text-sm text-xs">
                    {formatDate(event.data)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">لا توجد فعاليات حالياً</p>
      )}
    </div>
  );
};

export default UpComingEvents;
