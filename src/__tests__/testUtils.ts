import type { Event } from '../types/events';

/**
 * Creates a mock event with all required fields
 */
export const createMockEvent = (overrides: Partial<Event> = {}): Event => {
  const now = new Date().toISOString();
  
  const baseEvent: Event = {
    id: '1',
    eventNumber: 1,
    eventName: 'Test Event',
    slug: 'test-event',
    type: 'solo',
    status: 'upcoming',
    description: 'Test description',
    shortDescription: 'Test short description',
    date: now,
    durationMinutes: 90,
    location: {
      country: 'Test Country',
      city: 'Test City',
      venue: 'Test Venue'
    },
    isOnline: false,
    organizer: 'Test Organizer',
    collaborators: [],
    media: {
      imageUrls: ['/test-image.jpg']
    },
    program: [],
    awards: [],
    createdAt: now,
    updatedAt: now
  } as const;

  // Apply overrides, ensuring required fields are not removed
  return {
    ...baseEvent,
    ...overrides,
    location: {
      ...baseEvent.location,
      ...(overrides.location || {})
    },
    media: {
      ...baseEvent.media,
      ...(overrides.media || {})
    },
    ticketInfo: {
      isFree: true,
      ...baseEvent.ticketInfo,
      ...(overrides.ticketInfo || {})
    }
  };
};

/**
 * Creates a mock event with a specific date
 */
export const createMockEventWithDate = (date: string, overrides: Partial<Event> = {}): Event => 
  createMockEvent({
    date,
    ...overrides,
  });

/**
 * Creates a mock event with a specific location
 */
export const createMockEventWithLocation = (location: Partial<Event['location']>, overrides: Partial<Event> = {}): Event => {
  const locationWithDefaults = {
    country: 'Test Country',
    city: 'Test City',
    venue: 'Test Venue',
    ...location
  };
  
  return createMockEvent({
    ...overrides,
    location: locationWithDefaults
  });
};

/**
 * Creates a mock event with awards
 */
export const createMockEventWithAwards = (awards: Event['awards'], overrides: Partial<Event> = {}): Event =>
  createMockEvent({
    awards: awards.map((award, index) => ({
      id: `award-${index}`,
      name: award.name,
      year: award.year,
      category: award.category || 'Performance',
    })),
    ...overrides,
  });
