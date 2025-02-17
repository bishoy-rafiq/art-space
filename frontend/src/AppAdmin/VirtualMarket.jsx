import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VirtualMarketForm from './VirtualMarketForm';
import VirtualMarketList from './VirtualMarketList';

function VirtualMarket() {
  const [virtualmarket, setVirtualMarket] = useState([]);
  const apiUrl = 'http://localhost:3001';

  const fetchVirtualMarket = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/items`);
      setVirtualMarket(response.data.virtualmarket);
    } catch (error) {
      console.error('Error fetching virtualmarket:', error);
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
      alert('حدث خطأ أثناء إضافة العمل الفني. حاول مجددًا!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/deleteItem/${id}`);
      fetchVirtualMarket();
    } catch (error) {
      alert('حدث خطأ أثناء حذف العمل الفني. حاول مجددًا!');
      console.error('Error deleting virtualmarket:', error.response || error.message);
    }
  };

  return (
    <div>
      <h1 className="text-lg text-right py-4 mx-4">3Dالاعمال الفنية</h1>
      <VirtualMarketForm onAddVirtualMarket={handleAddArtWork} />
      <VirtualMarketList virtualmarket={virtualmarket} onDeleteVirtualMarket={handleDelete} />
    </div>
  );
}

export default VirtualMarket;
