import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { useNotifications } from "../context/NotificationsContext";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";

const AuctionsHome = () => {
  const { addNotification } = useNotifications();
  const { addFavorite } = useFavorites();
  const scrollRef = useRef(null);
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

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth / 2;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleAddFavorite = (auction) => {
    addFavorite({
      item_id: auction.id,
      item_type: "auctions", 
    });
  };
  

  return (
    <div className="flex flex-col text-right gap-4 py-16 md:mx-10 mx-2 mt-4 font-cairo">
      <h2 className="text-xl font-bold text-gray-800 mb-6">المزادات</h2>
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg hover:bg-gray-300 z-10"
        >
          <img src={assets.chevron_right} alt="" />
        </button>

        <div ref={scrollRef}         className="flex gap-4 overflow-x-auto scrollbar-hide justify-start mt-4">
          {auctions.map((auction) => (
            <div key={auction.id} className="bg-white shadow-md rounded-xl flex-shrink-0 w-72">
              <div className="relative">
                <img
                  src={auction.image}
                  alt={auction.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute top-40 right-0 left-0 text-center bg-white text-red-500 text-xs p-2">
                  {auction.timeRemaining}
                </div>
              </div>
              <div className="p-4 flex-col">
                <div>
                  <div className="flex justify-between items-center mt-2">
                  <img
  onClick={() => {
    addNotification(
      "تم إضافة العنصر",
      `تمت إضافة ${auction.title} بنجاح إلى المفضلة!`
    );
    handleAddFavorite(auction);
  }}
  src={assets.heart}
  className="cursor-pointer"
  alt="favorite"
/>
                    <p className="bg-blue-200 rounded-2xl p-2 mt-2 text-sm">
                      {auction.speciality}
                    </p>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mt-2">{auction.title}</h3>
                </div>
                <div className="flex justify-between mt-4 items-center">
                  <span className="text-red-600">{auction.highestBid}</span>
                  <p className="text-gray-400 text-sm">أعلى سعر حتى الآن</p>
                </div>
                <button
                   onClick={() => navigate("/addorder", { state: { auction } })}
                  className="bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600 text-sm mt-2"
                >
                  اضف سعرك
                </button>
              </div>
            </div>
          ))}
        </div>

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

export default AuctionsHome;
