import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuctionsList from './AuctionsList';
import AuctionsForm from './AuctionsForm';

function AuctionsPage() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    const artist_id = localStorage.getItem("artist_id");  
    if (!artist_id) {
        console.warn("⚠️ لا يوجد معرف فنان في LocalStorage!");
        return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/api/auctions/${artist_id}`);
        console.log("✅ الأعمال المسترجعة:", response.data);
         setAuctions(response.data.data); // ✅ التأكد من تعيين البيانات بشكل صحيح
     } catch (error) {
         console.error("❌ خطأ في جلب الأعمال:", error.response ? error.response.data : error.message);
         toast(`❌ خطأ: ${error.response?.data?.message || "تحقق من الخادم!"}`);
     }
    
  };

  const handleAddAuction = async (auctionData) => {
    try {
      await axios.post('http://localhost:3001/api/auctions', auctionData);
      fetchAuctions();
    } catch (error) {
      console.error('Error adding auction:', error.response || error.message);
    }
  };

  const handleDeleteAuction = async (auctionId) => {
    try {
      await axios.delete(`http://localhost:3001/api/auctions/${auctionId}`);
      fetchAuctions();
    } catch (error) {
      console.error('Error deleting auction:', error.response || error.message);
    }
  };

  const handleEditAuction = async (auctionId, updatedAuction) => {
    try {
      const formData = new FormData();
      formData.append('title', updatedAuction.title);
      formData.append('speciality', updatedAuction.speciality);
      formData.append('details', updatedAuction.details);
      formData.append('highestBid', updatedAuction.highestBid);
      formData.append('timeRemaining', updatedAuction.timeRemaining);
      formData.append('endTime', updatedAuction.endTime);
      if (updatedAuction.image instanceof File) {
        formData.append('image', updatedAuction.image);
      }

      await axios.put(`http://localhost:3001/api/auctions/${auctionId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      fetchAuctions();
    } catch (error) {
      console.error('Error updating auction:', error.response || error.message);
    }
  };

  return (
    <div>
      <h1 className="text-lg text-right py-4 mx-4">اضافة فعاليات قادمة</h1>
      <AuctionsForm onAddAuction={handleAddAuction} />
      <AuctionsList
        Auctions={auctions}
        onDeleteAuction={handleDeleteAuction}
        onEditAuction={handleEditAuction}
      />
    </div>
  );
}

export default AuctionsPage;
