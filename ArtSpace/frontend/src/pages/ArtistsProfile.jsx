import React, { useState, useEffect } from "react";
import axios from 'axios'; 
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { useNotifications } from "../context/NotificationsContext";
import { useFavorites } from "../context/FavoritesContext";

const BioSection = ({ artist }) => (
  <div className="text-right font-cairo">
    <p className="text-blue-600 font-bold mb-4">السيرة الذاتية</p>
    {[{ label: "الاسم", value: artist.name || "غير متوفر" },
      { label: "الجنسية", value: artist.nationality || "غير متوفر" },
      { label: "المهنة", value: artist.profession || "غير متوفر" },
      { label: "مكان الاقامة", value: artist.location || "غير متوفر" }]
      .map(({ label, value }, index) =>
        value && (
          <p className="text-gray-600 mb-2" key={index}>
            <span className="font-bold">{label}: </span>
            {value}
          </p>
        )
      )}
    <p className="text-blue-600 font-bold mb-4">التعليم</p>
    {[{ label: "كلية", value: artist.college || "غير متوفر" },
      { label: "التخصص", value: artist.speciality || "غير متوفر" },
      { label: "سنة التخرج", value: artist.graduation_year || "غير متوفر" },
      { label: "الدورات", value: artist.rotors || "غير متوفر" }]
      .map(({ label, value }, index) =>
        value && (
          <p className="text-gray-600 mb-2" key={index}>
            <span className="font-bold">{label}: </span>
            {value}
          </p>
        )
      )}
    <p className="text-blue-600 font-bold mb-4">الخبرات المهنية</p>
    {[artist.skill_1, artist.skill_2, artist.achievements]
      .map((value, index) =>
        value && (
          <p className="text-gray-600 mb-2" key={index}>
            {value}
          </p>
        )
      )}
  </div>
);


// مكوّن معرض الأعمال
const ArtworksSection = ({ artworks = [], virtualmarket = [], auctions = [], silentAuctions = [] }) => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const { addFavorite } = useFavorites();

  const handleAddFavorite = (item) => {
    addFavorite({
      item_id: item.id, 
      item_type: item.type, // ✅ تمرير نوع العنصر الفعلي
    });
    addNotification("تمت الإضافة", `تمت إضافة ${item.title} للمفضلة!`);
  };

  // دمج جميع العناصر في قائمة واحدة مع تحديد نوعها
  const allItems = [
    ...artworks.map(item => ({ ...item, type: "artwork" })), 
    ...virtualmarket.map(item => ({ ...item, type: "virtualmarket" })), 
    ...auctions.map(item => ({ ...item, type: "auction" })), 
    ...silentAuctions.map(item => ({ ...item, type: "silentAuction" }))
  ];

  if (allItems.length === 0) {
    return <p className="text-center text-gray-500 py-8">لا توجد عناصر لعرضها.</p>;
  }

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-right mb-6">معرض الأعمال</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allItems.map((item) => (
          <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
            {/* صورة العنصر */}
            <div className="relative">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <img 
                onClick={() => handleAddFavorite(item)}
                src={assets?.heart || "/default-heart.png"} // ✅ تأكيد وجود الصورة أو استخدام بديل
                className="absolute top-2 right-3 cursor-pointer"
                alt="favorite"
              />
            </div>
            
            {/* تفاصيل العنصر */}
            <div className="p-4 text-right">
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              {item.price && <p className="text-sm text-gray-600 mt-2">{item.price}</p>}

              {/* عرض أعلى سعر إذا كان مزادًا */}
              {item.type === "auction" && (
                <div className="flex justify-between mt-4 items-center">
                  <span className="text-red-600">{item.highestBid}</span>
                  <p className="text-gray-400 text-sm">أعلى سعر حتى الآن</p>
                </div>
              )}

              {/* زر التفاعل حسب نوع العنصر */}
              <button
                  onClick={() => navigate("/addorder", { state: { item } })}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg mt-4 w-full hover:bg-yellow-600">
                {item.type === "auction" || item.type === "silentAuction" ? "اضف سعرك" : "شراء"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



// مكوّن التواصل
const ContactSection = ({ artist }) => (
  <div className="text-right">
    {artist.email && (
      <p className="text-gray-600 mb-4">
        <span className="font-bold mb-4">البريد الإلكتروني</span> <br />
        {artist.email}
      </p>
    )}
    <p className="text-gray-600 mb-4">وسائل التواصل</p>
    <ul className="flex gap-6 justify-center mb-4">
      {[
        { href: artist.hrefX, icon: assets.x, alt: "X" },
        { href: artist.hrefY, icon: assets.youtuob, alt: "YouTube" },
        { href: artist.hrefI, icon: assets.instgram, alt: "Instagram" },
        { href: artist.hrefF, icon: assets.facfock, alt: "Facebook" },
      ].map(
        ({ href, icon, alt }, index) =>
          href && (
            <li key={index}>
              <a href={href} target="_blank" rel="noopener noreferrer">
                <img className="w-8" src={icon} alt={alt} />
              </a>
            </li>
          )
      )}
    </ul>
  </div>
);

const ArtistsProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("bio");
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
          setLoading(true);
  
          const responses = await Promise.allSettled([
              axios.get(`http://localhost:3001/api/artists/${id}`),
              axios.get(`http://localhost:3001/api/artworks/${id}`),
              axios.get(`http://localhost:3001/api/auctions/${id}`),
              axios.get(`http://localhost:3001/api/silentAuctions/${id}`),
              axios.get(`http://localhost:3001/api/items/${id}`)
          ]);
  
          // استخراج البيانات أو تعيين قيمة فارغة في حالة الخطأ
          const artistData = responses[0].status === "fulfilled" ? responses[0].value.data.data : {};
          const artworksData = responses[1].status === "fulfilled" ? responses[1].value.data.data || [] : [];
          const auctionsData = responses[2].status === "fulfilled" ? responses[2].value.data.data || [] : [];
          const silentAuctionsData = responses[3].status === "fulfilled" ? responses[3].value.data.data || [] : [];
          const virtualMarketData = responses[4].status === "fulfilled" ? responses[4].value.data.data || [] : [];
  
          setSelectedArtist({
              ...artistData,
              artworks: artworksData,
              auctions: auctionsData,
              silentAuctions: silentAuctionsData,
              virtualmarket: virtualMarketData
          });
  
          console.log("✅ Fetched Data:", {
              artist: artistData,
              artworks: artworksData,
              auctions: auctionsData,
              silentAuctions: silentAuctionsData,
              virtualmarket: virtualMarketData
          });
  
      } catch (err) {
          console.error("❌ Error fetching data:", err);
          setError("حدث خطأ أثناء جلب البيانات.");
      } finally {
          setLoading(false);
      }
  };
  

    fetchData();
  }, [id]);

  

  if (loading) {
    return <p className="text-center text-gray-500">جارٍ التحميل...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!selectedArtist) {
    return <p className="text-center text-gray-500">الفنان غير موجود</p>;
  }

  return (
    <div className="p-8 bg-gray-100 ">
      {/* بيانات الفنان */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:items-start p-6 mb-8 ">
        <div className="hidden md:block">
          <BioSection artist={selectedArtist} />
        </div>
        <div className="flex-1">
          {/* الشكل الأول للشاشات الكبيرة */}
          <div className="hidden md:block">
            <img
              src={selectedArtist.image}
              alt={selectedArtist.name}
              className="w-full lg:rounded-lg object-cover"
            />
          </div>
          </div>
        </div>
     
 {/* الشكل الثاني للشاشات الصغيرة */}
<div className="md:hidden block mb-14">
  <div className="relative bg-cover bg-center rounded-3xl h-40" style={{
    backgroundImage:
      "linear-gradient(to right, rgba(0, 35, 102, 1), rgba(255, 255, 255, 1))",
  }}>
    <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
      <img
        src={selectedArtist.image}
        alt={selectedArtist.name}
        className="w-24 h-24 rounded-full object-cover" 
      />
    </div>
  </div>
</div>



      {/* الأزرار للشاشات الصغيرة */}
      <div className="md:hidden mt-2  flex items-center gap-2  text-xs">
        {["bio", "artworks", "contact"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={` py-2 rounded-lg w-full ${
              activeTab === tab
                ? "bg-[#D4AF37] text-white"
                : "bg-white text-gray-400"
            }`}
          >
            {tab === "bio"
              ? "السيرة الذاتية"
              : tab === "artworks"
              ? "معرض الأعمال"
              : "التواصل"}
          </button>
        ))}
      </div>

      {/* عرض القسم المحدد للشاشات الصغيرة */}
      <div className="mt-6 md:hidden">
        {activeTab === "bio" && <BioSection artist={selectedArtist} />}
        {activeTab === "artworks" && (
        <ArtworksSection
        artworks={selectedArtist.artworks}
        virtualmarket={selectedArtist.virtualmarket}
  auctions={selectedArtist.auctions}
  silentAuctions={selectedArtist.silentAuctions}

      />
      
        )}
        {activeTab === "contact" && <ContactSection artist={selectedArtist} />}
      </div>

      {/* معرض الأعمال للشاشات الكبيرة */}
      <div className="hidden md:block mt-6">
      <ArtworksSection
  artworks={selectedArtist.artworks}
  virtualmarket={selectedArtist.virtualmarket}
  auctions={selectedArtist.auctions}
  silentAuctions={selectedArtist.silentAuctions}

/>
      </div>
    </div>
  );
};

export default ArtistsProfile;
