import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from './EventList';
import EventForm from './EventForm';

function EventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/events/events');
      
      setEvents(response.data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleAddEvent = async (eventData) => {
    try {
      await axios.post('http://localhost:3001/api/events/addEvent', eventData);
      fetchEvents();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:3001/api/events/deleteEvent/${eventId}`);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleEditEvent = async (eventId, updatedEvent) => {
    try {
      const formData = new FormData();
      formData.append('title', updatedEvent.title);
      formData.append('location', updatedEvent.location);
      formData.append('data', updatedEvent.data);
      formData.append('effectiveness', updatedEvent.effectiveness);
      if (updatedEvent.image instanceof File) {
        formData.append('image', updatedEvent.image);
      }

      await axios.put(`http://localhost:3001/api/events/updateEvent/${eventId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      fetchEvents(); // تحديث قائمة الأحداث بعد التعديل
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <div>
      <h1 className="text-lg text-right py-4 mx-4">اضافة فعاليات قادمة </h1>
      <EventForm onAddEvent={handleAddEvent} />
      <EventList
        events={events}
        onDeleteEvent={handleDeleteEvent}
        onEditEvent={handleEditEvent} // تمرير وظيفة التعديل
      />
    </div>
  );
}

export default EventsPage;
