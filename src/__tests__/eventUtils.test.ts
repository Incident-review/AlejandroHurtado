import { describe, it, expect, vi } from 'vitest';
import {
  sortEventsByDate,
  getUpcomingEvents,
  getPastEvents,
  getTotalConcerts,
  getTotalAwards,
  getCountriesToured,
  getUniqueAwards,
} from '../utils/events';

// Import our custom Event type with an alias to avoid conflict with DOM Event
type AppEvent = import('../types/events').Event;

// Mock current date to ensure tests are deterministic
const MOCK_DATE = '2025-01-15T00:00:00Z';
vi.setSystemTime(new Date(MOCK_DATE));

// Helper function to create properly typed mock events
const createTestEvent = (overrides: Partial<AppEvent> = {}): AppEvent => {
  const now = new Date().toISOString();
  const baseEvent: AppEvent = {
    id: '1',
    eventNumber: 1,
    eventName: 'Test Event',
    slug: 'test-event',
    type: 'solo',
    status: 'upcoming',
    description: 'Test description',
    shortDescription: 'Test short description',
    startDate: now,
    endDate: new Date(new Date(now).getTime() + 3600000).toISOString(),
    durationMinutes: 90,
    location: {
      country: 'Test Country',
      city: 'Test City',
      venue: 'Test Venue',
      coordinates: {
        lat: 0,
        lng: 0
      }
    },
    isOnline: false,
    organizer: 'Test Organizer',
    collaborators: [],
    media: {
      imageUrls: [],
      videoUrls: []
    },
    program: [],
    awards: [],
    createdAt: now,
    updatedAt: now,
    performers: [],
    ticketInfo: {
      isFree: true
    }
  };

  return { ...baseEvent, ...overrides };
};

const mockEvents: AppEvent[] = [
  createTestEvent({
    eventNumber: 1,
    eventName: 'Past Event',
    startDate: '2023-06-01T19:00:00Z',
    endDate: '2023-06-01T21:00:00Z',
    location: {
      city: 'New York',
      country: 'USA',
      venue: 'Carnegie Hall',
      coordinates: {
        lat: 40.7653,
        lng: -73.9800
      }
    },
    awards: [{ id: '1', name: 'Best Show', year: 2023, category: 'Performance' }],
  }),
  createTestEvent({
    eventNumber: 2,
    eventName: 'Upcoming Event 1',
    startDate: '2025-02-01T19:00:00Z',
    endDate: '2025-02-01T21:00:00Z',
    location: {
      city: 'Paris',
      country: 'France',
      venue: 'Philharmonie de Paris',
      coordinates: {
        lat: 48.8919,
        lng: 2.3935
      }
    },
  }),
  createTestEvent({
    eventNumber: 3,
    eventName: 'Upcoming Event 2',
    startDate: '2025-03-01T19:00:00Z',
    endDate: '2025-03-01T21:00:00Z',
    location: {
      city: 'Tokyo',
      country: 'Japan',
      venue: 'Suntory Hall',
      coordinates: {
        lat: 35.6640,
        lng: 139.7319
      }
    },
  }),
  createTestEvent({
    eventNumber: 4,
    eventName: 'Another Past Event',
    startDate: '2023-11-01T19:00:00Z',
    endDate: '2023-11-01T21:00:00Z',
    location: {
      city: 'London',
      country: 'UK',
      venue: 'Royal Albert Hall',
      coordinates: {
        lat: 51.5009,
        lng: -0.1774
      }
    },
  }),
];

describe('eventUtils', () => {
  describe('sortEventsByDate', () => {
    it('should sort events in ascending order by date', () => {
      const sorted = sortEventsByDate([...mockEvents], 'asc');
      expect(sorted[0].eventName).toBe('Another Past Event');
      expect(sorted[3].eventName).toBe('Upcoming Event 2');
    });

    it('should sort events in descending order by date', () => {
      const sorted = sortEventsByDate([...mockEvents], 'desc');
      expect(sorted[0].eventName).toBe('Upcoming Event 2');
      expect(sorted[3].eventName).toBe('Another Past Event');
    });
  });

  describe('getUpcomingEvents', () => {
    it('should return only events that are in the future', () => {
      const upcoming = getUpcomingEvents(mockEvents);
      expect(upcoming).toHaveLength(2);
      expect(upcoming.every(e => new Date(e.startDate) > new Date(MOCK_DATE))).toBe(true);
    });
  });

  describe('getPastEvents', () => {
    it('should return only events that are in the past', () => {
      const past = getPastEvents(mockEvents);
      expect(past).toHaveLength(2);
      expect(past.every(e => new Date(e.startDate) < new Date(MOCK_DATE))).toBe(true);
    });
  });

  // --- Statistics Functions --- 
  describe('Statistics Functions with Past Events', () => {
    const pastEvents = getPastEvents(mockEvents);

    it('getTotalConcerts should return the total number of past concerts', () => {
      expect(getTotalConcerts(pastEvents)).toBe(2);
    });

    it('getTotalAwards should return the total number of awards from past events', () => {
      expect(getTotalAwards(pastEvents)).toBe(1);
    });

    it('getCountriesToured should return the number of unique countries from past events', () => {
      expect(getCountriesToured(pastEvents)).toBe(2);
    });

    it('getUniqueAwards should return a flattened array of unique awards from past events', () => {
      const uniqueAwards = getUniqueAwards(pastEvents);
      expect(uniqueAwards).toHaveLength(1);
      expect(uniqueAwards).toEqual([{ name: 'Best Show', year: 2024 }]);
    });
  });
});
