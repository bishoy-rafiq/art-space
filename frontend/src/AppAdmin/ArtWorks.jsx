import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import ArtWorkForm from './ArtWorkForm';
import ArtWorkList from './ArtWorkList';

function ArtWorks() {
  const [artworks, setArtworks] = useState([]);
  const apiUrl = 'http://localhost:3001';

  const fetchArtworks = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/artworks`);
      setArtworks(response.data.artworks);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  const handleAddArtWork = async (ArtWorkData) => {
    try {
      await axios.post(`${apiUrl}/api/addArtwork`, ArtWorkData);
      fetchArtworks();
    } catch (error) {
      alert('حدث خطأ أثناء إضافة العمل الفني. حاول مجددًا!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/deleteArtwork/${id}`);
      fetchArtworks();
    } catch (error) {
      alert('حدث خطأ أثناء حذف العمل الفني. حاول مجددًا!');
      console.error('Error deleting artworks:', error.response || error.message);
    }
  };

  return (
    <div>
      <h1 className="text-lg text-right py-4 mx-4">الاعمال الفنية</h1>
      {/* <ArtWorkForm onAddArtWork={handleAddArtWork} /> */}
      <ArtWorkList artworks={artworks} onDeleteArtWork={handleDelete} />
    </div>
  );
}

export default ArtWorks;
