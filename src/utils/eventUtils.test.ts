import { describe, it, expect, vi } from 'vitest';
import {
  sortEventsByDate,
  getUpcomingEvents,
  getPastEvents,
  getTotalConcerts,
  getTotalAwards,
  getCountriesToured,
  getUniqueAwards,
} from './eventUtils';
import type { Event } from '../types/events';

// Mock current date to ensure tests are deterministic
const MOCK_DATE = '2025-01-15T00:00:00Z';
vi.setSystemTime(new Date(MOCK_DATE));

const mockEvents: Event[] = [
  {
    eventNumber: 1,
    eventName: 'Past Event',
    date: '2024-12-01T19:00:00Z',
    location: { country: 'USA', city: 'New York' },
    awards: [{ name: 'Best Show', year: 2024 }],
  },
  {
    eventNumber: 2,
    eventName: 'Upcoming Event 1',
    date: '2025-02-01T19:00:00Z',
    location: { country: 'France', city: 'Paris' },
    awards: [],
  },
  {
    eventNumber: 3,
    eventName: 'Upcoming Event 2',
    date: '2025-03-01T19:00:00Z',
    location: { country: 'Japan', city: 'Tokyo' },
    awards: [],
  },
  {
    eventNumber: 4,
    eventName: 'Another Past Event',
    date: '2023-11-01T19:00:00Z',
    location: { country: 'UK', city: 'London' },
    awards: [],
  },
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
