import { describe, it, expect, vi } from 'vitest';
import {
  sortEventsByDate,
  getUpcomingEvents,
  getPastEvents,
  getTotalConcerts,
  getTotalAwards,
  getCountriesToured,
  getUniqueAwards,
} from '../utils/eventUtils';
// Import our custom Event type with an alias to avoid conflict with DOM Event
type AppEvent = import('../types/events').Event;

// Mock current date to ensure tests are deterministic
const MOCK_DATE = '2025-01-15T00:00:00Z';
vi.setSystemTime(new Date(MOCK_DATE));

// Helper function to create properly typed mock events
const createTestEvent = (overrides: Partial<AppEvent> = {}): AppEvent => ({
  id: '1',
  eventNumber: 1,
  eventName: 'Test Event',
  slug: 'test-event',
  type: 'solo',
  status: 'upcoming',
  description: 'Test description',
  date: new Date().toISOString(),
  location: {
    country: 'Test Country',
    city: 'Test City',
    venue: 'Test Venue',
  },
  isOnline: false,
  media: {
    imageUrls: ['/test-image.jpg'],
  },
  awards: [],
  program: [],
  collaborators: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

const mockEvents: AppEvent[] = [
  createTestEvent({
    eventNumber: 1,
    eventName: 'Past Event',
    date: '2023-06-01T19:00:00Z',
    location: {
      city: 'New York',
      country: 'USA',
      venue: 'Carnegie Hall',
    },
    awards: [{ id: '1', name: 'Best Show', year: 2023, category: 'Performance' }],
  }),
  createTestEvent({
    eventNumber: 2,
    eventName: 'Upcoming Event 1',
    date: '2025-02-01T19:00:00Z',
    location: {
      city: 'Paris',
      country: 'France',
      venue: 'Philharmonie de Paris',
    },
  }),
  createTestEvent({
    eventNumber: 3,
    eventName: 'Upcoming Event 2',
    date: '2025-03-01T19:00:00Z',
    location: {
      city: 'Tokyo',
      country: 'Japan',
      venue: 'Suntory Hall',
    },
  }),
  createTestEvent({
    eventNumber: 4,
    eventName: 'Another Past Event',
    date: '2023-11-01T19:00:00Z',
    location: {
      city: 'London',
      country: 'UK',
      venue: 'Royal Albert Hall',
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
      expect(upcoming.every(e => new Date(e.date) > new Date(MOCK_DATE))).toBe(true);
    });
  });

  describe('getPastEvents', () => {
    it('should return only events that are in the past', () => {
      const past = getPastEvents(mockEvents);
      expect(past).toHaveLength(2);
      expect(past.every(e => new Date(e.date) < new Date(MOCK_DATE))).toBe(true);
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
