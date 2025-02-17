import React, {  useState, useEffect } from "react";
import axios from "axios";
import { assets} from '../assets/assets';
import { useNotifications } from '../context/NotificationsContext';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigate } from "react-router-dom";

const SilentAuctions = () => {
      const { addNotification } = useNotifications(); 
      const { addFavorite } = useFavorites(); 
          const [silentAuctions, setAuctions] = useState([]);
          const navigate = useNavigate();

    
      useEffect(() => {
        const fetchAuctions = async () => {
          try {
            const response = await axios.get("http://localhost:3001/api/silentAuctions");
            setAuctions(response.data.silentAuctions || response.data);
          } catch (error) {
            console.error("Error fetching auctions:", error);
          }
        };
    
        fetchAuctions();
      }, []);
    
     
      const handleAddFavorite = (silentAuction) => {
        addFavorite({
          item_id: silentAuction.id, // ✅ تأكد أن `id` موجود
          item_type: "silent_auctions", // ✅ نوع العنصر (يجب أن يكون محددًا)
        });
      };
      
      
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-right">المزادات الصامتة</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-center gap-6">
                {silentAuctions.map((silentAuction) => (
                    <div
                        key={silentAuction.id}
                        className="overflow-hidden"
                    >
                        {/* صورة المنتج */}
                        <div className="relative">
                            <img
                             
                                src={silentAuction.image}
                                alt={silentAuction.title}
                                className="w-full h-48 object-cover shadow-md rounded-lg"
                            />
                                            <img
  onClick={() => {
    addNotification(
      "تم إضافة العنصر",
      `تمت إضافة ${silentAuction.title} بنجاح إلى المفضلة!`
    );
    handleAddFavorite(silentAuction); // ✅ تمرير العنصر
  }}
  src={assets.heart}
 className="absolute top-2 right-3 cursor-pointer"
  alt="favorite"
/>
                        </div>
                        {/* محتوى العنصر */}
                        <div className="p-4 text-right">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                {silentAuction.title}
                            </h3>
                            <button        
                          onClick={() => navigate("/addorder", { state: { silentAuction } })}
 className="bg-yellow-500 text-white px-6 py-2 p-6 rounded-lg hover:bg-yellow-600">
                                قدم عرض
                            </button>
                        </div>
                    </div>
                ))}
            </div>     
        </div>
    );
};

export default SilentAuctions;
