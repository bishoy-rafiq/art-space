import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SilentAuctionsList from './SilentAuctionsList';
import SilentAuctionsForm from './SilentAuctionsForm';

function SilentAuctions() {
  const [silentAuctions, setAuctions] = useState([]);
  const apiUrl = 'http://localhost:3001';

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
      const response = await axios.get(`${apiUrl}/api/silentAuctions/${artist_id}`);
    console.log("✅ الأعمال المسترجعة:", response.data);
           setAuctions  (response.data.data); // ✅ التأكد من تعيين البيانات بشكل صحيح
       } catch (error) {
           console.error("❌ خطأ في جلب الأعمال:", error.response ? error.response.data : error.message);
           toast(`❌ خطأ: ${error.response?.data?.message || "تحقق من الخادم!"}`);
       }
   };

  const handleAddAuction = async (auctionData) => {
    try {
      await axios.post(`${apiUrl}/api/addSilentAuction`, auctionData);
      fetchAuctions();
    } catch (error) {
      console.error('Error adding auction:', error.response || error.message);
    }
  };

  const handleDeleteAuction = async (auctionId) => {
    try {
      await axios.delete(`${apiUrl}/api/deleteSilentAuction/${auctionId}`);
      fetchAuctions();
    } catch (error) {
      console.error('Error deleting auction:', error.response || error.message);
    }
  };

 

  return (
    <div>
      <h1 className="text-lg text-right py-4 mx-4">المزادات الصامتة </h1>
      <SilentAuctionsForm onAddAuction={handleAddAuction} />
      <SilentAuctionsList
        silentAuctions={silentAuctions}
        onDeleteAuction={handleDeleteAuction}
      />
    </div>
  );
}

export default SilentAuctions;
