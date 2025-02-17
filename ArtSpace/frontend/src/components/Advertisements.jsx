import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const Advertisements = () => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [advertisements, setAdvertisements] = useState([]);

  const handleScroll = () => {
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = scrollRef.current.children[0]?.offsetWidth || 0; // عرض الكارت
    const index = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(index);
  };

  const handleDotClick = (index) => {
    const cardWidth = scrollRef.current.children[0]?.offsetWidth || 0; // عرض الكارت
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setCurrentIndex(index);
  };

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/advertisements');
        console.log('Response Data:', response.data);
        setAdvertisements(response.data.advertisements || response.data); // تأكد من هيكل البيانات
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchAdvertisements();
  }, []);

  return (
    <div className="mx-2 mt-1">
      <h2 className="text-sm font-bold text-right mt-4 text-blue-600">الأخبار والفعاليات</h2>
      {/* الحاوية الرئيسية للتمرير */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide justify-start mt-4"
      >
      {advertisements.map((advertisement) => (
          <div
            key={advertisement.id}
            className="min-w-[218px] relative rounded-lg shadow-lg overflow-hidden flex-shrink-0"
          >
            <img
              src={advertisement.image_url}
              alt={advertisement.title}
              className="w-full object-cover absolute"
            />
            <div className="absolute inset-0 bg-[#00000099] bg-opacity-70"></div>
            <div className="p-4 relative text-right">
              <h3 className="text-lg font-bold mb-2 text-white">{advertisement.title}</h3>
              <p className="text-gray-200">{advertisement.content}</p>
              <a href={advertisement.link} target="_blank" rel="noopener noreferrer"><button className="mt-4 text-sm bg-yellow-400 text-white py-1 px-4 rounded-full shadow-md hover:bg-yellow-500">
                اعرف المزيد
              </button>
              </a>
            </div>
          </div>
        ))}
      </div>
      {/* نقاط التنقل */}
      <div className="flex justify-center mt-4 gap-2">
        {advertisements.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-yellow-400' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Advertisements;
