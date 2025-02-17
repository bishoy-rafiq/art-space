import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';

const ArtistsAll = () => {
  const [artists, setArtists] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/artists');
        console.log("Data from API:", response.data); // تحقق من البيانات
        if (response.data && Array.isArray(response.data.data)) {
          setArtists(response.data.data); // تخزين المصفوفة الموجودة داخل response.data
        } else {
          setError('لا توجد بيانات لعرضها');
        }
      } catch (error) {
        setError('حدث خطأ أثناء جلب البيانات');
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading) {
    return <p>جارٍ التحميل...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // تحقق من البيانات في الـ artists
  console.log("Artists in state:", artists);

  return (
    <div className="flex flex-col text-center gap-4 py-16 mx-10 mt-4 ">
      <div className="font-cairo font-bold text-2xl p-4">
        <h1>الفنانين المميزين</h1>
      </div>

      {/* قائمة الفنانين */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-6 mt-6 md:mx-10">
        {artists && artists.length > 0 ? (
          artists.map((item, index) => (
            <div className="cursor-pointer" key={index}>
              <div className="bg-white rounded-lg shadow-lg mb-4 p-3 md:bg-none md:rounded-none md:shadow-none">
                <Link to={`/artist/${item.id}`} onClick={() => window.scrollTo(0, 0)}>
                  <img
                    className="w-full h-40 rounded-lg mt-2 object-cover"
                    src={item.image}
                    alt={item.speciality}
                  />
                  <h1 className="text-gray-900 font-cairo mt-2">{item.name}</h1>
                  <p className="text-gray-400 font-cairo mt-2 text-center text-sm">{item.profession}</p>
                  <p className="text-gray-400 leading-7 break-words font-cairo mt-2 text-center text-sm">
                    {item.degree}
                  </p>
                </Link>
                <ul className="hidden md:flex justify-center gap-2 mt-4">
                  {item.hrefX && <li><a href={item.hrefX} target="_blank"><img className="w-8" src={assets.x} alt="" /></a></li>}
                  {item.hrefY && <li><a href={item.hrefY} target="_blank"><img className="w-8" src={assets.youtuob} alt="" /></a></li>}
                  {item.hrefI && <li><a href={item.hrefI} target="_blank"><img className="w-8" src={assets.instgram} alt="" /></a></li>}
                  {item.hrefF && <li><a href={item.hrefF} target="_blank"><img className="w-8" src={assets.facfock} alt="" /></a></li>}
                </ul>
                <Link to={`/artist/${item.id}`} onClick={() => window.scrollTo(0, 0)} className="flex md:hidden justify-center">
                  <button className="bg-[#D4AF37] px-4 py-2 rounded-3xl text-white font-cairo text-sm">
                    عرض الملف الشخصي
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>لا توجد بيانات لعرضها</p>
        )}
      </div>
    </div>
  );
};

export default ArtistsAll;
