import React, { useState, useEffect } from "react";
import axios from "axios";
import { assets } from '../assets/assets';
import { useNotifications } from '../context/NotificationsContext';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigate } from "react-router-dom";

const LiveAuctions = () => {
    const { addNotification } = useNotifications();
    const { addFavorite } = useFavorites();
    const [auctions, setAuctions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/auctions");
                setAuctions(response.data.auctions || response.data);
            } catch (error) {
                console.error("Error fetching auctions:", error);
            }
        };

        fetchAuctions();
    }, []);
    const handleAddFavorite = (auction) => {
        addFavorite({
          item_id: auction.id, // ✅ تأكد أن `id` موجود
          item_type: "auctions", // ✅ نوع العنصر (يجب أن يكون محددًا)
        });
      };
      


    return (
        <div className="mx-auto px-4 py-8 font-cairo text-right">
            <h2 className="text-xl font-bold text-gray-800 mb-6">المزادات الحية</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] justify-center gap-6">
                {auctions.map((auction) => (
                    <div
                        key={auction.id}
                        className=""
                    >
                        {/* صورة المنتج */}
                        <div className="relative shadow-md rounded-xl">
                            <img
                                src={auction.image}
                                alt={auction.title}
                                className="w-full h-48 object-cover shadow-md rounded-xl"

                            />
                            <img

                                onClick={() => {
                                    addNotification(
                                        "تم إضافة العنصر",
                                        `تمت إضافة ${auction.title} بنجاح إلى المفضلة!`
                                    );
                                    handleAddFavorite(auction); // ✅ تمرير العنصر
                                }}

                                src={assets.heart} className="absolute top-2 right-3 cursor-pointer" />
                            <div className="absolute top-40 object-cover right-0 left-0 text-center bg-white text-red-500 text-xs p-2">
                                {auction.timeRemaining}
                            </div>
                        </div>
                        {/* محتوى العنصر */}
                        <div className="p-4 text-right">
                            <h3 className="text-lg font-semibold text-gray-800">
                                {auction.title}
                            </h3>
                            <p className="text-gray-600 mt-2">أعلى سعر حتى الآن</p>
                            <div className="flex items-center justify-between mt-4">
                                <button
                                    onClick={() => navigate("/addorder", { state: { auction } })}
                                    className="bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600 text-sm mt-2"
                                >
                                    اضف سعرك
                                </button>
                                <span className="  text-blue-600 bg-[#D3D3D380]  px-4 py-2 rounded-lg">
                                    {auction.highestBid} د.ر
                                </span>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default LiveAuctions;
