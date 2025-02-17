import React, { useState } from "react";
import CloseSquare from "../assets/CloseSquare.svg";
import pencilEdit from "../assets/pencilEdit.svg";
import Upload from "../assets/Upload.png";

function AuctionsList({ Auctions, onDeleteAuction, onEditAuction }) {
  const [editingAuctionId, setEditingAuctionId] = useState(null);
  const [editedAuction, setEditedAuction] = useState({
    title: "",
    speciality: "",
    highestBid: "",
    timeRemaining: "",
    image: "",
  });

  const handleEditClick = (auction) => {
    setEditingAuctionId(auction.id);
    setEditedAuction({ ...auction });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAuction((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setEditedAuction((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSaveClick = () => {
    onEditAuction(editingAuctionId, editedAuction);
    setEditingAuctionId(null);
  };

  const handleCancelClick = () => {
    setEditingAuctionId(null);
  };

  return (
    <div className="py-4 px-6 text-right">
      <h2 className="text-2xl">الفعاليات القادمة</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Auctions.map((auction) => (
          <div key={auction.id} className="event-card bg-white p-4 shadow-md rounded-lg">
            {editingAuctionId === auction.id ? (
              // Edit Interface
              <div>
                <div className="relative w-full rounded-lg bg-gray-100">
                  {editedAuction.image ? (
                    typeof editedAuction.image === "string" ? (
                      <img
                        src={editedAuction.image}
                        alt={editedAuction.title}
                        className="rounded-lg w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(editedAuction.image)}
                        alt="Uploaded Preview"
                        className="rounded-lg w-full h-full object-cover"
                      />
                    )
                  ) : (
                    <p className="text-gray-500 flex items-center justify-center h-full">
                      No Image
                    </p>
                  )}
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <img
                    src={Upload}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2"
                    alt="Upload"
                  />
                </div>
                <input
                  name="speciality"
                  value={editedAuction.speciality || ""}
                  onChange={handleInputChange}
                  className="mt-2 w-full p-2 border rounded-lg"
                  placeholder="Edit speciality"
                />
                <input
                  name="title"
                  value={editedAuction.title || ""}
                  onChange={handleInputChange}
                  className="text-xl font-bold mt-2 w-full p-2 border rounded-lg"
                  placeholder="Edit title"
                />
             
                <input
                  name="highestBid"
                  value={editedAuction.highestBid || ""}
                  onChange={handleInputChange}
                  className="mt-2 w-full p-2 border rounded-lg"
                  placeholder="Edit highest bid"
                />
                <input
                  name="timeRemaining"
                  value={editedAuction.timeRemaining || ""}
                  onChange={handleInputChange}
                  className="mt-2 w-full p-2 border rounded-lg"
                  placeholder="Edit time remaining"
                />
                <div className="flex justify-between mt-4">
                  <button onClick={handleSaveClick} className="py-2 px-4 flex">
                    نشر <img src={pencilEdit} className="ml-2" alt="Edit" />
                  </button>
                  <button onClick={handleCancelClick} className="py-2 px-4 flex">
                    إلغاء <img src={CloseSquare} className="ml-2" alt="Delete" />
                  </button>
                </div>
              </div>
            ) : (
              // View Interface
              <>
                <img
                  src={auction.image}
                  alt={auction.title}
                  className="rounded-lg w-full object-cover"
                />
                <p>{auction.timeRemaining}</p>

                <p className="bg-blue-200 p-2 mt-2 rounded-lg">{auction.speciality}</p>

                <h3 className="text-xl mt-2">{auction.title}</h3>
                <p>{auction.highestBid}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEditClick(auction)}
                    className="flex items-center py-2 px-4"
                  >
                    تعديل <img src={pencilEdit} className="ml-2" alt="Edit" />
                  </button>
                  <button
                    onClick={() => onDeleteAuction(auction.id)}
                    className="flex items-center py-2 px-4"
                  >
                    حذف <img src={CloseSquare} className="ml-2" alt="Delete" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuctionsList;
