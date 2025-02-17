import React, { useRef,useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Artists = () => {
  const scrollRef = useRef(null);
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




  return (
    <div
      id="Artists"
      className="flex flex-col text-right gap-4 py-16 md:mx-10 mt-4 "
    >
      <div className="flex justify-between font-cairo font-bold text-sm md:text-2xl p-4">
        <Link to="/ArtistsAll" className='text-red-400'>شاهد الكل</Link>
        <h1>الفنانين المميزين</h1>
      </div>



        {/* قائمة الفنانين */}
        <div
  ref={scrollRef}
  className="flex gap-4 overflow-x-auto scrollbar-hide justify-start mt-4"
>

{artists && artists.length > 0 ? (
          artists.map((item, index) => (
               <Link
   to={`/artist/${item.id}`}  // Assuming each artist has a unique id
  onClick={() => window.scrollTo(0, 0)}
   className="cursor-pointer flex-shrink-0 w-64" 
   key={index}
 >
   <div className="bg-white rounded-lg shadow-lg mb-4 p-3"> 
     <img
       className="w-full h-40 rounded-lg mt-2 object-cover" 
       src={item.image}
       alt={item.speciality}
     />
     <h1 className='text-gray-900  font-cairo  mt-2'>{item.othar_name}</h1>
     <p className="text-gray-400 leading-7 break-words font-cairo  mt-2 text-center text-sm">
       {item.degree}
     </p>
   </div>
 </Link>
 
))
) : (
  <p>لا توجد بيانات لعرضها</p>
)}      
  </div>
      </div>
  );
};

export default Artists;

