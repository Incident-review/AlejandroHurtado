import type { Event, EventLocation, EventMedia } from '../types/events';

export interface JsonEvent {
  id: string;
  dateISO: string;
  year: number;
  country: string;
  city: string | null;
  venue: string | null;
  eventName: string;
  program: string[] | null;
  artists: string[];
  tags: string[];
  capacity: number | null;
  attendance: number | null;
  fee: number | null;
  currency: string | null;
  sources: string[];
  notes: string | null;
}

export const mapJsonToEvent = (jsonEvent: JsonEvent, index: number): Event => {
  const location: EventLocation = {
    country: jsonEvent.country,
    city: jsonEvent.city || 'City not specified',
    venue: jsonEvent.venue || 'Venue not specified',
    building: jsonEvent.venue || undefined,
  };

  const media: EventMedia = {
    imageUrls: [],
  };

  return {
    id: jsonEvent.id,
    eventNumber: index + 1, // Generate a simple event number based on array index
    eventName: jsonEvent.eventName,
    slug: jsonEvent.id, // Use the ID as the slug for now
    type: 'solo', // Default to 'solo' as it's not specified in the JSON
    status: new Date(jsonEvent.dateISO) >= new Date() ? 'upcoming' : 'past',
    date: jsonEvent.dateISO,
    location,
    isOnline: false, // Default to false as it's not specified in the JSON
    collaborators: jsonEvent.artists,
    media,
    program: jsonEvent.program || [],
    awards: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
