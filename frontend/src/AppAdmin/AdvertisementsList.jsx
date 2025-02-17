import React from 'react';
import CloseSquare from "../assets/CloseSquare.svg";

const AdvertisementsList = ({ advertisements, onDeleteEvent }) => {
  
  return (
    <div className="py-4 px-6 text-right">
      <h2 className="text-2xl">الإعلانات</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {advertisements && advertisements.length > 0 ? (
          advertisements.map((advertisement) => (
            <div key={advertisement.id} className="bg-white p-4 shadow-md rounded-lg">
              {/* تحقق من وجود صورة صحيحة */}
              {advertisement.image_url ? (
                <img
                  src={advertisement.image_url}
                  alt={advertisement.title}
                  className="rounded-lg w-[300px] object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-300 rounded-lg flex justify-center items-center">
                  <span className="text-gray-600">لا توجد صورة</span>
                </div>
              )}
              <h3 className="text-xl mt-4">{advertisement.title}</h3>
              <p className="mt-4">{advertisement.content}</p>
              <p className="mt-4">{advertisement.link}</p>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => onDeleteEvent(advertisement.id)}
                  className="flex justify-between py-2 px-4"
                >
                  حذف <img src={CloseSquare} className="ml-2" alt="Delete" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">لا توجد فعاليات حالياً لعرضها.</p>
        )}
      </div>
    </div>
  );
};

export default AdvertisementsList;
