import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdvertisementsForm from './AdvertisementsForm';
import AdvertisementsList from './AdvertisementsList';

function AdvertisementsPage() {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // الحصول على URL من البيئة أو تعيين قيمة افتراضية
  const apiUrl = 'http://localhost:3001';
  console.log('API URL:', apiUrl); // Debugging

  // جلب الإعلانات
  const fetchAdvertisements = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${apiUrl}/api/advertisements`);
      setAdvertisements(response.data.advertisements);
    } catch (err) {
      setError('Failed to fetch advertisements.');
      console.error('Error fetching advertisements:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  // إضافة إعلان جديد
  const handleAddAdvertisement = async (advertisementData) => {
    try {
      await axios.post(`${apiUrl}/api/advertisements`, advertisementData);
      fetchAdvertisements();
    } catch (err) {
      console.error('Error adding advertisement:', err);
      setError('Failed to add advertisement.');
    }
  };

  // حذف إعلان
  const handleDeleteAdvertisement = async (advertisementId) => {
    try {
      setAdvertisements((prev) =>
        prev.filter((ad) => ad.id !== advertisementId)
      ); // Optimistic update
      await axios.delete(`${apiUrl}/api/advertisements/${advertisementId}`);
    } catch (err) {
      console.error('Error deleting advertisement:', err);
      setError('Failed to delete advertisement.');
      fetchAdvertisements(); // Rollback fetch in case of failure
    }
  };

  return (
    <div>
      <h1 className="text-lg text-right py-4 mx-4">إدارة الإعلانات</h1>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <AdvertisementsForm onAddAdvertisement={handleAddAdvertisement} />
      <AdvertisementsList
        advertisements={advertisements}
        onDeleteEvent={handleDeleteAdvertisement}
      />
    </div>
  );
}

export default AdvertisementsPage;
