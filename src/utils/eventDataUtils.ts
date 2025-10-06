import type { Event, EventType } from '../types/events';

interface RawEvent {
  eventNumber: number;
  eventName: string;
  date: string;
  location: {
    country: string;
    city: string;
    building: string;
  };
  image: string;
  awards: Array<{
    name: string;
    year: number;
    category?: string;
  }>;
  description: string;
  type?: EventType;
  isOnline?: boolean;
  organizer?: string;
  collaborators?: string[];
  program?: Array<{
    title: string;
    composer: string;
    duration: number;
  }>;
}

export const convertEvents = (rawEvents: RawEvent[]): Event[] => {
  return rawEvents.map(rawEvent => ({
    id: `event-${rawEvent.eventNumber}`,
    eventNumber: rawEvent.eventNumber,
    eventName: rawEvent.eventName,
    slug: rawEvent.eventName.toLowerCase().replace(/\s+/g, '-'),
    type: (rawEvent.type as EventType) || 'solo',
    status: 'past',
    description: rawEvent.description,
    shortDescription: rawEvent.description.substring(0, 100) + '...',
    startDate: new Date(rawEvent.date).toISOString(),
    endDate: new Date(rawEvent.date).toISOString(),
    durationMinutes: 90,
    location: {
      country: rawEvent.location.country,
      city: rawEvent.location.city,
      venue: rawEvent.location.building,
      coordinates: {
        lat: 0,
        lng: 0
      }
    },
    isOnline: rawEvent.isOnline || false,
    organizer: rawEvent.organizer || '',
    collaborators: rawEvent.collaborators || [],
    media: {
      imageUrls: [rawEvent.image],
      videoUrls: []
    },
    program: rawEvent.program ? rawEvent.program.map(p => `${p.title} by ${p.composer} (${p.duration} min)`) : [],
    awards: rawEvent.awards.map((award, index) => ({
      id: `award-${rawEvent.eventNumber}-${index}`,
      name: award.name,
      year: award.year,
      category: award.category || 'Performance'
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    performers: [],
    ticketInfo: {
      isFree: true
    }
  }));
};
