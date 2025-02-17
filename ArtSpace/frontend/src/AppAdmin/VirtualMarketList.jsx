import React from 'react';

function VirtualMarketList({ virtualmarket, onDeleteVirtualMarket }) {

  return (
    <div className="p-4">
      {!virtualmarket || virtualmarket.length === 0 ? (
        <p className="text-center text-gray-500">لا يوجد عمل مضاف حتى الآن.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {virtualmarket.map((virtualmarket) => (
            <div
              key={virtualmarket.id}
              className="p-4 flex flex-col items-center text-center border border-gray-200 rounded-lg shadow-md"
            >
              <img
                src={virtualmarket.image}
                alt={virtualmarket.title}
                className="w-[300px] h-[200px] rounded-md shadow-lg object-cover mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{virtualmarket.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{`التخصص: ${virtualmarket.category_name}`}</p>
              <p className="text-gray-600 text-sm mb-2">{`السعر: ${virtualmarket.price} درهم`}</p>
              <p className="text-gray-600 text-sm">{`الفنان: ${virtualmarket.artist_name}`}</p>
              <button
                onClick={() => onDeleteVirtualMarket(virtualmarket.id)}
                className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition mt-4"
              >
                حذف
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VirtualMarketList;
