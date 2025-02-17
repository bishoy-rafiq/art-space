import React from 'react';
import CloseSquare from "../assets/CloseSquare.svg";

const SilentAuctionsList = ({ silentAuctions, onDeleteAuction }) => {
  return (
    <div className="py-4 px-6 text-right">
      <h2 className="text-2xl">المزادات الصامتة </h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2  gap-4">
        {silentAuctions && silentAuctions.length > 0 ? (
          silentAuctions.map((silentAuction) => (
            <div key={silentAuction.id} className=" p-4 ">
              {/* تحقق من وجود صورة صحيحة */}
              {silentAuction.image ? (
                <img
                  src={silentAuction.image}
                  alt={silentAuction.title}
                  className="rounded-lg w-full object-cover shadow-md"
                />
              ) : (
                <div className="w-full h-48 bg-gray-300 rounded-lg flex justify-center items-center">
                  <span className="text-gray-600">لا توجد صورة</span>
                </div>
              )}
              <h3 className="text-xl mt-4">{silentAuction.title}</h3>
              <p className="mt-4">{silentAuction.user_name}</p>
              <p className="mt-4">{silentAuction.price}</p>

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => onDeleteAuction    (silentAuction.id)}
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

export default SilentAuctionsList;
