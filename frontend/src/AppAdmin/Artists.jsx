import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArtistsList from './ArtistsList';

function Artists() {
    const [artists, setArtists] = useState([]);
    const apiUrl = 'http://localhost:3001';

    useEffect(() => {
        fetchArtists();
      }, []);
      
      const fetchArtists = async () => {
        try {
          const response = await axios.get(`${apiUrl}/api/artists`);
          console.log('Response:', response.data); // لفحص الاستجابة
          setArtists(response.data.data); // استخدم response.data.data بدلاً من response.data.artists
        } catch (error) {
          console.error('Error fetching artists:', error.response || error.message);
        }
      };
      
      

 
  const handleDeleteArtists = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/deleteArtist/${id}`);
      fetchArtists();
    } catch (error) {
      console.error('Error deleting Artist:', error.response || error.message);
    }
  };

 

  return (
    <div>
      <h1 className="text-lg text-right py-4 mx-4">الفنانين</h1>
      <ArtistsList
        artists={artists}
        onDeleteArtists={handleDeleteArtists}
      />
    </div>
  );
}

export default Artists;
