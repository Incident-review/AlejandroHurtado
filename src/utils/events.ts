import type { Event, Award } from '../types/events';

/**
 * Sorts events by date in ascending or descending order
 */
export const sortEventsByDate = (events: Event[], order: 'asc' | 'desc' = 'asc'): Event[] => {
  return [...events].sort((a, b) => {
    const dateA = new Date(a.startDate).getTime();
    const dateB = new Date(b.startDate).getTime();
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
};

/**
 * Filters and sorts upcoming events
 */
export const getUpcomingEvents = (events: Event[], limit?: number): Event[] => {
  const now = new Date().getTime();
  const upcoming = events.filter(event => new Date(event.startDate).getTime() >= now);
  const sorted = sortEventsByDate(upcoming, 'asc');
  return limit ? sorted.slice(0, limit) : sorted;
};

/**
 * Filters and sorts past events
 */
export const getPastEvents = (events: Event[], limit?: number): Event[] => {
  const now = new Date();
  const past = events.filter(event => new Date(event.startDate) < now);
  const sorted = sortEventsByDate(past, 'desc');
  return limit ? sorted.slice(0, limit) : sorted;
};

/**
 * Gets total number of past concerts
 */
export const getTotalConcerts = (events: Event[]): number => {
  return getPastEvents(events).length;
};

/**
 * Gets total number of awards from past events
 */
export const getTotalAwards = (events: Event[]): number => {
  return getPastEvents(events).reduce(
    (total, event) => total + (event.awards?.length || 0),
    0
  );
};

/**
 * Gets number of unique countries toured
 */
export const getCountriesToured = (events: Event[]): number => {
  const countries = new Set<string>();
  getPastEvents(events).forEach(event => {
    if (event.location?.country) {
      countries.add(event.location.country);
    }
  });
  return countries.size;
};

/**
 * Gets unique awards from past events
 */
export const getUniqueAwards = (events: Event[]): Award[] => {
  const awardsMap = new Map<string, Award>();
  
  getPastEvents(events).forEach(event => {
    event.awards?.forEach(award => {
      if (!awardsMap.has(award.id)) {
        awardsMap.set(award.id, award);
      }
    });
  });
  
  return Array.from(awardsMap.values());
};

/**
 * Gets events grouped by year
 */
export const getEventsByYear = (events: Event[]): Map<number, Event[]> => {
  const eventsByYear = new Map<number, Event[]>();
  
  events.forEach(event => {
    const year = new Date(event.startDate).getFullYear();
    if (!eventsByYear.has(year)) {
      eventsByYear.set(year, []);
    }
    eventsByYear.get(year)?.push(event);
  });
  
  // Sort years in descending order
  const sortedYears = Array.from(eventsByYear.entries())
    .sort(([yearA], [yearB]) => yearB - yearA);
  
  return new Map(sortedYears);
};
