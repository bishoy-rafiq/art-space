import React, { useState } from 'react';
import CloseSquare from "../assets/CloseSquare.svg";
import pencilEdit from "../assets/pencilEdit.svg";
import Upload from "../assets/Upload.png";
function EventList({ events, onDeleteEvent, onEditEvent }) {
  const [editingEventId, setEditingEventId] = useState(null);
  const [editedEvent, setEditedEvent] = useState({
    title: '',
    location: '',
    data: '',
    effectiveness: '',
    image: '',
  });

  const handleEditClick = (event) => {
    setEditingEventId(event.id);
    setEditedEvent({ ...event });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({ ...editedEvent, [name]: value });
  };

  const handleFileChange = (e) => {
    setEditedEvent({ ...editedEvent, image: e.target.files[0] });
  };

  const handleSaveClick = () => {
    onEditEvent(editingEventId, editedEvent);
    setEditingEventId(null);
  };

  const handleCancelClick = () => {
    setEditingEventId(null);
  };

  return (
    <div className=" py-4 px-6 text-right">
      <h2 className="text-2xl">الفعاليات القادمة</h2>
      <div className=" mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4">
        {events.map((event) => (
          <div key={event.id} className="event-card bg-white p-4 shadow-md rounded-lg">
            {editingEventId === event.id ? (
              // واجهة التعديل
              <div>
                <div className="relative w-full  rounded-lg bg-gray-100">
                  {editedEvent.image ? (
                    typeof editedEvent.image === 'string' ? (
                      <img
                        src={editedEvent.image}
                        alt={editedEvent.title}
                        className="rounded-lg w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(editedEvent.image)}
                        alt="Uploaded Preview"
                        className="rounded-lg w-full h-full object-cover"
                      />
                    )
                  ) : (
                    <p className="text-gray-500 flex items-center justify-center h-full">No Image</p>
                  )}
            <div className="absolute inset-0 bg-[#ffffffac] bg-opacity-70 object-cover rounded-md"></div>
                 
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <img src={Upload} className='absolute top-1/2 left-1/2 transform -translate-x-1/2' alt="aa" />
              
                </div>
                <input
                  name="effectiveness"
                  value={editedEvent.effectiveness}
                  onChange={handleInputChange}
                  className="bg-blue-100 mt-2 p-2 w-full rounded-lg"
                  placeholder="Edit effectiveness"
                />
                <input
                  type="text"
                  name="title"
                  value={editedEvent.title}
                  onChange={handleInputChange}
                  className="text-xl font-bold mt-2 w-full p-2 border rounded-lg"
                  placeholder="Edit title"
                />
                <input
                  type="text"
                  name="location"
                  value={editedEvent.location}
                  onChange={handleInputChange}
                  className="mt-2 w-full p-2 border rounded-lg"
                  placeholder="Edit location"
                />
                <input
                  type="date"
                  name="data"
                  value={editedEvent.data}
                  onChange={handleInputChange}
                  className="mt-2 w-full p-2 border rounded-lg"
                />
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handleSaveClick}
                    className="py-2 px-4 flex"
                  >
                    نشر <img src={pencilEdit} className="ml-2" alt="Edit" />
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className="py-2 px-4 flex"
                  >
                    إلغاء <img src={CloseSquare} className="ml-2" alt="Delete" />
                  </button>
                </div>
              </div>
            ) : (
              // واجهة العرض
              <>
                <img src={event.image} alt={event.title} className="rounded-lg w-full  object-cover" />
                <p className="bg-blue-200 p-2 mt-2 rounded-lg">{event.effectiveness}</p>
                <h3 className="text-xl mt-2">{event.title}</h3>
                <p>{event.location}</p>
                <p>{event.data}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEditClick(event)}
                    className="flex items-center py-2 px-4  "
                  >
                    تعديل <img src={pencilEdit} className="ml-2" alt="Edit" />
                  </button>
                  <button
                    onClick={() => onDeleteEvent(event.id)}
                    className="flex items-center py-2 px-4 "
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

export default EventList;
