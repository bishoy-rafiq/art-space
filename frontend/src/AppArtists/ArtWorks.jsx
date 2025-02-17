import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArtWorkForm from './ArtWorkForm';
import ArtWorkList from './ArtWorkList';
import { toast } from 'react-toastify';

function ArtWorks() {  
  const [artworks, setArtworks] = useState([]);
  const apiUrl = 'http://localhost:3001';
  const fetchArtworks = async () => {
    const artist_id = localStorage.getItem("artist_id");  
    if (!artist_id) {
        console.warn("⚠️ لا يوجد معرف فنان في LocalStorage!");
        return;
    }

    try {
        const response = await axios.get(`${apiUrl}/api/artworks/${artist_id}`);
        console.log("✅ الأعمال المسترجعة:", response.data);
        setArtworks(response.data.data); // ✅ التأكد من تعيين البيانات بشكل صحيح
    } catch (error) {
        console.error("❌ خطأ في جلب الأعمال:", error.response ? error.response.data : error.message);
        toast(`❌ خطأ: ${error.response?.data?.message || "تحقق من الخادم!"}`);
    }
};

  useEffect(() => {
    fetchArtworks();
  }, []); 


  const handleAddArtWork = async (ArtWorkData) => {
    try {
     await axios.post(`${apiUrl}/api/addArtwork`, ArtWorkData);
     toast('حدث خطأ اضافة العمل الفني');

        fetchArtworks(); 
    } catch (error) {
        toast('حدث خطأ اضافة العمل الفني');
    }
};


  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/deleteArtwork/${id}`);
      fetchArtworks();
    } catch (error) {
      toast('حدث خطأ أثناء حذف العمل الفني. حاول مجددًا!');
    }
  };

  return (
    <div>
      <h1 className="text-lg text-right py-4 mx-4">الأعمال الفنية</h1>
      <ArtWorkForm onAddArtWork={handleAddArtWork} />
      <ArtWorkList artworks={artworks} onDeleteArtWork={handleDelete} />
    </div>
  );
}
export default ArtWorks;
