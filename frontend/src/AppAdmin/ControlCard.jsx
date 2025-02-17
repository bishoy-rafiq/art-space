import React, { useState, useEffect } from "react";
import axios from "axios";

const ControlCard = () => {
  const [auctions, setAuctions] = useState([]);
  const [newAuction, setNewAuction] = useState({
    title: "",
    speciality: "",
    highestBid: "",
    timeRemaining: "",
    image: null,
  });

  // جلب جميع المزادات عند تحميل الصفحة
  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    try {
        const response = await axios.get("http://localhost:3000/auctions");
        console.log(response.data);
    } catch (error) {
        console.error("خطأ أثناء جلب المزادات:", error);
    }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAuction({ ...newAuction, [name]: value });
  };

  const handleImageChange = (e) => {
    setNewAuction({ ...newAuction, image: e.target.files[0] });
  };

  const handleAddAuction = async () => {
    const formData = new FormData();
    formData.append("title", newAuction.title);
    formData.append("speciality", newAuction.speciality);
    formData.append("highestBid", newAuction.highestBid);
    formData.append("timeRemaining", newAuction.timeRemaining);
    if (newAuction.image) {
      formData.append("image", newAuction.image);
    }

    try {
      await axios.post("http://localhost:3000/auctions", formData);
      fetchAuctions(); // تحديث القائمة بعد الإضافة
    } catch (error) {
      console.error("خطأ أثناء إضافة المزاد:", error);
    }
  };

  const handleDeleteAuction = async (auctionId) => {
    try {
      await axios.delete(`http://localhost:3000/auctions/${auctionId}`);
      fetchAuctions(); // تحديث القائمة بعد الحذف
    } catch (error) {
      console.error("خطأ أثناء حذف المزاد:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {/* قائمة المزادات */}
      {auctions.map((auction) => (
        <div key={auction.id} className="border rounded-lg p-4 relative">
          <div className="flex flex-col items-center">
            <div className="bg-gray-100 w-full h-32 flex items-center justify-center rounded-lg">
              {auction.image ? (
                <img
                  src={auction.image}
                  alt="Auction"
                  className="h-32 w-full object-cover rounded-lg"
                />
              ) : (
                <button className="text-gray-500">📤 إضافة صورة</button>
              )}
            </div>
            <h3 className="text-gray-700 text-lg font-semibold mt-4 text-center">
              {auction.title}
            </h3>
            <p className="text-gray-500 text-center">{auction.speciality}</p>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => handleDeleteAuction(auction.id)}
              className="bg-red-400 text-white px-4 py-2 rounded"
            >
              حذف المزاد
            </button>
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">
              تاريخ الانتهاء: {auction.timeRemaining}
            </button>
          </div>
        </div>
      ))}

      {/* إضافة مزاد جديد */}
      <div className="border-dashed border-2 border-blue-400 rounded-lg p-4 relative">
        <div className="flex flex-col items-center">
          <div className="bg-gray-100 w-full h-32 flex items-center justify-center rounded-lg">
            <input
              type="file"
              onChange={handleImageChange}
              className="text-gray-500"
            />
          </div>
          <input
            type="text"
            name="title"
            placeholder="عنوان الإعلان"
            value={newAuction.title}
            onChange={handleInputChange}
            className="mt-4 p-2 border rounded w-full"
          />
          <input
            type="text"
            name="speciality"
            placeholder="التخصص"
            value={newAuction.speciality}
            onChange={handleInputChange}
            className="mt-2 p-2 border rounded w-full"
          />
          <input
            type="number"
            name="highestBid"
            placeholder="أعلى مزايدة"
            value={newAuction.highestBid}
            onChange={handleInputChange}
            className="mt-2 p-2 border rounded w-full"
          />
          <input
            type="text"
            name="timeRemaining"
            placeholder="الوقت المتبقي"
            value={newAuction.timeRemaining}
            onChange={handleInputChange}
            className="mt-2 p-2 border rounded w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleAddAuction}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            إضافة المزاد
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlCard;
