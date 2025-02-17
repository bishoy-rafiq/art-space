import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNotifications } from '../context/NotificationsContext';
import { useFavorites } from "../context/FavoritesContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const ArtMarket = () => {
    const { addNotification } = useNotifications();
    const { addFavorite } = useFavorites();
    const [artworks, setArtWorks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchArtWorks = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/artworks');
                if (response.data) {
                    setArtWorks(response.data.artworks);
                } else {
                    setError('لا توجد بيانات لعرضها');
                }
            } catch (error) {
                setError('حدث خطأ أثناء جلب البيانات');
            } finally {
                setLoading(false);
            }
        };


        fetchArtWorks();
    });


    const handleAddFavorite = (artworks) => {
        addFavorite({
            item_id: artworks.id, // ✅ تأكد أن `id` موجود
            item_type: "artworks", // ✅ نوع العنصر (يجب أن يكون محددًا)
        });
    };


    return (
        <div className="bg-white mx-2 md:mx-10 py-16">
            <h1 className="text-2xl font-bold text-right mb-6">السوق الفني</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {!artworks.length && !loading && !error && (
                    <p className="text-center text-gray-500">لا توجد عناصر في السوق الافتراضي حاليًا.</p>
                )}

                {artworks.length > 0 ? (
                    artworks.map((artwork) => (
                        <div key={artwork.id} className="bg-[#F2F2F2] shadow-md rounded-lg w-[300px] relative">
                            <img
                                onClick={() => {
                                    addNotification(
                                        "تم إضافة العنصر",
                                        `تمت إضافة ${artwork.title} بنجاح إلى المفضلة!`
                                    );
                                    handleAddFavorite(artwork);
                                }}
                                src={assets.heart}
                                alt="favorite"
                                className="cursor-pointer p-3 absolute top-3 right-3"
                            />
                            <img
                                src={artwork.image}
                                alt={artwork.title}
                                className="w-full h-[300px] rounded-lg object-cover"
                            />
                            <div className="p-4 text-right">
                                <h2 className="text-lg font-semibold text-gray-800">{artwork.title}</h2>
                                <p className="text-sm text-gray-600 mt-2">{artwork.price}</p>
                                <div className="flex justify-between text-xs  mt-4">
                                    <button
                                        onClick={() => navigate("/addorder", { state: { artwork } })}
                                        className="bg-gray-200 text-gray-800 p-2 rounded-lg"
                                    >
                                        قدم عرض
                                    </button>

                                    <button
                                        onClick={() => navigate("/addorder", { state: { artwork } })}

                                        className="bg-gray-200 text-gray-800  p-2 rounded-lg"
                                    >
                                        شراء بالتقسيط
                                    </button>
                                    <button
                                        onClick={() => navigate("/addorder", { state: { artwork } })}
                                        className="bg-[#D4AF37] text-white  p-2 rounded-lg"
                                    >
                                        شراء الآن
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>لا توجد عناصر لعرضها.</p>
                )}
            </div>
        </div>
    );
};

export default ArtMarket;
