import type { Event, EventStatus, EventType, EventLocation, EventMedia, TicketInfo } from '../types/events';

interface RawEvent {
  eventNumber: number;
  eventName: string;
  date: string;
  location: {
    country: string;
    city: string;
    building?: string;
    venue?: string;
  };
  image?: string;
  awards?: Array<{ name: string; year: number }>;
  description?: string;
}

export function convertToEvent(rawEvent: RawEvent): Event {
  const id = `event-${rawEvent.eventNumber}`;
  const slug = rawEvent.eventName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  const location: EventLocation = {
    country: rawEvent.location.country,
    city: rawEvent.location.city,
    venue: rawEvent.location.venue || rawEvent.location.building || 'Venue TBD',
    building: rawEvent.location.building,
  };

  const eventDate = new Date(rawEvent.date);
  const now = new Date();
  const status: EventStatus = eventDate > now ? 'upcoming' : 'past';

  const media: EventMedia = {
    imageUrls: rawEvent.image ? [rawEvent.image] : [],
  };

  const ticketInfo: TicketInfo = {
    isFree: false,
  };

  const awards = (rawEvent.awards || []).map((award, index) => ({
    id: `award-${rawEvent.eventNumber}-${index}`,
    name: award.name,
    year: award.year,
  }));

  return {
    id,
    eventNumber: rawEvent.eventNumber,
    eventName: rawEvent.eventName,
    slug,
    date: rawEvent.date,
    // startDate and endDate are not part of the Event interface
    // Using date field which is the correct field
    location,
    status,
    type: 'solo' as EventType,
    description: rawEvent.description || '',
    media,
    ticketInfo,
    awards,
    isOnline: false, // Default to false for all events
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function convertEvents(rawEvents: RawEvent[]): Event[] {
  return rawEvents.map(convertToEvent);
}
