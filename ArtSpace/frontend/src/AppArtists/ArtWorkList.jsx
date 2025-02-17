import React from 'react';

function ArtWorkList({ artworks, onDeleteArtWork }) {
  return (
    <div className="py-4 px-6">
      {!artworks || artworks.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">لا يوجد عمل مضاف حتى الآن.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {artworks.map((artwork) => (
            <div
              key={artwork.id}
              className="p-4 flex flex-col items-center text-center border border-gray-300 rounded-xl shadow-lg bg-white hover:shadow-xl transition-all"
            >
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-52 rounded-lg shadow-md object-cover mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{artwork.title}</h2>
              <p className="text-gray-600 text-sm mb-2 font-medium">{`المزاد: ${artwork.Auctiontype}`}</p>
              <p className="text-gray-600 text-sm mb-2 font-medium">{`التفاصيل: ${artwork.details}`}</p>
              <p className="text-gray-700 text-base font-semibold mb-2">{`السعر: ${artwork.price} درهم`}</p>
              <button
                onClick={() => onDeleteArtWork(artwork.id)}
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-all font-bold"
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

export default ArtWorkList;
