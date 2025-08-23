import type { Event, Award } from '../types/events';

export const sortEventsByDate = (events: Event[], order: 'asc' | 'desc' = 'asc'): Event[] => {
  return events.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
};

export const getUpcomingEvents = (events: Event[]): Event[] => {
  const now = new Date().getTime();
  const upcoming = events.filter(event => new Date(event.date).getTime() >= now);
  return sortEventsByDate(upcoming, 'asc');
};

export const getPastEvents = (events: Event[]) => {
  const now = new Date();
  // Filter events that occurred before the current time and sort them in descending order
  return events
    .filter((event) => new Date(event.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// --- Statistics Calculation --- //

// Calculates the total number of concerts that have already occurred.
export const getTotalConcerts = (events: Event[]) => {
  return getPastEvents(events).length;
};

// Calculates the total number of awards from past events.
export const getTotalAwards = (events: Event[]) => {
  const pastEvents = getPastEvents(events);
  // Sum up the number of awards for each past event
  return pastEvents.reduce((total, event) => total + event.awards.length, 0);
};

// Calculates the number of unique countries toured based on past events.
export const getCountriesToured = (events: Event[]) => {
  const pastEvents = getPastEvents(events);
  // Create a Set of unique country names from the location object
  const countries = new Set(pastEvents.map((event) => event.location.country));
  return countries.size;
};

// Extracts unique awards from past events.
export const getUniqueAwards = (events: Event[]): Award[] => {
  const pastEvents = getPastEvents(events);
  const allAwards = pastEvents.flatMap((event) => event.awards);

  // Filter for unique awards based on the award name
  const uniqueAwards = new Map<string, Award>();
  allAwards.forEach((award) => {
    if (!uniqueAwards.has(award.name)) {
      uniqueAwards.set(award.name, award);
    }
  });

  return Array.from(uniqueAwards.values());
};
