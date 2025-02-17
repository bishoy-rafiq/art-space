import React from 'react';

function ArtistsList({ artists, onDeleteArtists }) {
  console.log("Rendering ArtistsList with artists:", artists); // تحقق من البيانات

  return (
    <div className="p-4">
      {!artists || artists.length === 0 ? (
        <p className="text-center text-gray-500">لا توجد فنانين مضافين حتى الآن.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="p-4 flex flex-col items-center text-center"
            >
              <img
                src={artist.image}
                alt={artist.name}
                className="w-24 h-24 rounded-md shadow-lg object-cover mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{artist.name}</h2>
              <p className="text-gray-600 text-sm mb-2">{artist.speciality}</p>
              <button
                onClick={() => onDeleteArtists(artist.id)}
                className="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition"
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

export default ArtistsList;
