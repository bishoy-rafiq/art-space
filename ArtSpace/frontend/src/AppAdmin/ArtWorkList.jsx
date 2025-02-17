import React from 'react';

function ArtWorkList({ artworks, onDeleteArtWork }) {

  return (
    <div className="p-4">
      {!artworks || artworks.length === 0 ? (
        <p className="text-center text-gray-500">لا يوجد عمل مضاف حتى الآن.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {artworks.map((artwork) => (
            <div
              key={artwork.id}
              className="p-4 flex flex-col items-center text-center border border-gray-200 rounded-lg shadow-md"
            >
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-[300px] h-[200px] rounded-md shadow-lg object-cover mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{artwork.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{`المزاد: ${artwork.Auctiontype}`}</p>
              <p className="text-gray-600 text-sm mb-2">{`السعر: ${artwork.price} درهم`}</p>
              <p className="text-gray-600 text-sm">{`الفنان: ${artwork.artist_name}`}</p>
              <button
                onClick={() => onDeleteArtWork(artwork.id)}
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

export default ArtWorkList;
