import eventsData from '../data/events.json';
import { mapJsonToEvent } from '../utils/mapEventData';
import type { Event } from '../types/events';

// Map the JSON data to our Event type
const events: Event[] = eventsData.events.map((event, index) => 
  mapJsonToEvent(event, index)
);

// Get all events
const getAllEvents = (): Event[] => {
  return [...events];
};

// Get upcoming events
const getUpcomingEvents = (limit?: number): Event[] => {
  const now = new Date();
  const upcoming = events
    .filter(event => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return limit ? upcoming.slice(0, limit) : upcoming;
};

// Get past events
const getPastEvents = (limit?: number): Event[] => {
  const now = new Date();
  const past = events
    .filter(event => new Date(event.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return limit ? past.slice(0, limit) : past;
};

// Get event by ID
const getEventById = (id: string): Event | undefined => {
  return events.find(event => event.id === id);
};

export const eventDataService = {
  getAllEvents,
  getUpcomingEvents,
  getPastEvents,
  getEventById,
};

export default eventDataService;
