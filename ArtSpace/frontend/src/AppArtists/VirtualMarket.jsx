import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VirtualMarketForm from './VirtualMarketForm';
import VirtualMarketList from './VirtualMarketList';
import { toast } from 'react-toastify';

function VirtualMarket() {
  const [virtualmarket, setVirtualMarket] = useState([]);
  const apiUrl = 'http://localhost:3001';

  const fetchVirtualMarket = async () => {
    const artist_id = localStorage.getItem("artist_id");
    if (!artist_id) {
      console.warn("⚠️ لا يوجد معرف فنان في LocalStorage!");
      return;
    }
    try {
      const response = await axios.get(`${apiUrl}/api/items/${artist_id}`);
      console.log("✅ الأعمال المسترجعة:", response.data);
      setVirtualMarket(response.data.data);

    } catch (error) {
      console.error("❌ خطأ في جلب الأعمال:", error.response ? error.response.data : error.message);
      toast.error(`❌ خطأ: ${error.response?.data?.message || "تحقق من الخادم!"}`);
    }
  };

  useEffect(() => {
    fetchVirtualMarket();
  }, []);

  const handleAddArtWork = async (VirtualMarketData) => {
    try {
    await axios.post(`${apiUrl}/api/addItem`, VirtualMarketData);
    fetchVirtualMarket();

    } catch (error) {
        console.error("❌ خطأ أثناء الإضافة:", error.response?.data || error.message);
        toast.error("❌ حدث خطأ أثناء إضافة العمل الفني. حاول مجددًا!");
    }
};

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/deleteItem/${id}`);
    fetchVirtualMarket();
    } catch (error) {
      toast.error("❌ حدث خطأ أثناء حذف العمل الفني. حاول مجددًا!");
    }
  };

  return (
    <div>
      <h1 className="text-lg text-right py-4 mx-4">🎨 3D الأعمال الفنية</h1>
      <VirtualMarketForm onAddVirtualMarket={handleAddArtWork} />
      <VirtualMarketList virtualmarket={virtualmarket} onDeleteVirtualMarket={handleDelete} />
    </div>
  );
}

export default VirtualMarket;
