import React, { useState } from 'react';
import { assets } from '../assets/assets';

// البيانات الافتراضية (مثال على محتوى الموقع)
const siteData = [
  { id: 1, type: 'section', name: 'المنتدي', link: '/mycomponent' },
  { id: 2, type: 'section', name: 'السوق الفني', link: '/artmarket' },
  { id: 3, type: 'event', name: ' السوق الافتراضي', link: '/artgallerydisplay' },
  { id: 4, type: 'event', name: 'المزدات', link: '/artgallerydisplay' },
  { id: 5, type: 'page', name: 'السوق الافتراضي', link: '/artgallerydisplay' },
  { id: 6, type: 'page', name: ' الفنانين', link: '/artistsall' },
  { id: 6, type: 'page', name: ' المزادات الصامتة', link: '/artistsall' },
  { id: 6, type: 'page', name: ' المزادات الحية', link: '/artistsall' },
  { id: 6, type: 'page', name: 'الملف الشخصي ', link: '/userprofile' },
  { id: 6, type: 'page', name: 'الفئات', link: '/categories' },
  { id: 6, type: 'page', name: 'من نحن', link: '/about' },
];

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // وظيفة البحث
  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === '') {
      setResults([]); 
    } else {
      const filteredResults = siteData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filteredResults);
    }
  };

  return (
    <div className="mx-2 mt-1 block md:hidden">
      {/* حقل البحث */}
      <div className="relative flex w-full gap-4 ">
  <input
    type="text"
    value={query}
    onChange={handleSearch}
    placeholder="البحث"
    className="w-full  pr-2 py-2 border-none text-gray-100 text-center bg-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <img src={assets.search} className="absolute py-2 pr-2 right-3" />
</div>
      {/* عرض النتائج */}
      {results.length > 0 && (
        <div className="mt-4 bg-white rounded-lg shadow-lg">
          {results.map((item) => (
            <a
              key={item.id}
              href={item.link}
              className="block px-4 py-2 hover:bg-gray-100 text-right"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}

      {/* في حالة عدم وجود نتائج */}
      {query.trim() !== '' && results.length === 0 && (
        <p className="mt-4 text-red-500 text-right">لا توجد نتائج مطابقة.</p>
      )}
    </div>
  );
};

export default SearchBar;
