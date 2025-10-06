import type { Event } from '../types/events';

interface RawEvent {
  id: string;
  dateISO: string;
  year: number;
  country: string;
  city: string;
  venue: string;
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

export function mapRawToEvent(raw: RawEvent): Event {
  const now = new Date();
  const eventDate = new Date(raw.dateISO);
  const status: 'upcoming' | 'past' = eventDate > now ? 'upcoming' : 'past';
  
  return {
    id: raw.id,
    eventNumber: 0, // Will be set in mapRawEvents
    eventName: raw.eventName,
    slug: raw.id,
    type: 'other',
    startDate: raw.dateISO,
    endDate: new Date(new Date(raw.dateISO).getTime() + 2 * 60 * 60 * 1000).toISOString(), // Add 2 hours as default duration
    durationMinutes: 120,
    status,
    isOnline: false,
    location: {
      country: raw.country,
      city: raw.city,
      venue: raw.venue,
      coordinates: {
        lat: 0,
        lng: 0
      }
    },
    description: raw.notes || '',
    shortDescription: raw.notes ? raw.notes.substring(0, 100) + (raw.notes.length > 100 ? '...' : '') : '',
    program: raw.program || [],
    performers: raw.artists,
    media: {
      imageUrls: raw.tags
        .filter(tag => tag.startsWith('image:'))
        .map(tag => tag.replace('image:', '')),
      videoUrls: raw.tags
        .filter(tag => tag.startsWith('video:'))
        .map(tag => tag.replace('video:', '')),
      programPdfUrl: raw.tags?.find(tag => tag.startsWith('pdf:'))?.replace('pdf:', '') || undefined,
    },
    organizer: '',
    collaborators: [],
    awards: [],
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    ticketInfo: {
      isFree: raw.fee === 0 || raw.fee === null,
      price: raw.fee || undefined,
      currency: raw.currency || undefined,
      purchaseUrl: raw.tags?.find(tag => tag.startsWith('ticket:'))?.replace('ticket:', '') || undefined,
    }
  };
}

export function mapRawEvents(events: RawEvent[]): Event[] {
  return events.map((event, index) => ({
    ...mapRawToEvent(event),
    eventNumber: events.length - index, // Assign event numbers in reverse chronological order
  }));
}
