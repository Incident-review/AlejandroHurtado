import type { 
  Event, 
  EventFilters as RootEventFilters, 
  PaginationOptions as RootPaginationOptions, 
  PaginatedEvents as RootPaginatedEvents 
} from '../../../types/events';
import eventsData from '../../../data/events.json';
import { mapJsonToEvent } from '../../../utils/mapEventData';

// Map the JSON data to the Event type
const events = eventsData.events.map((event, index) => 
  mapJsonToEvent(event, index)
);

// Re-export types for consistency
export type EventFilters = RootEventFilters;
export type PaginationOptions = RootPaginationOptions;
export type PaginatedEvents = RootPaginatedEvents;

/**
 * Service for handling event-related operations
 */
class EventService {
  private events: Event[];

  constructor(initialEvents: Event[]) { 
    this.events = [...initialEvents];
  }

  /**
   * Get all events with optional filtering and pagination
   */
  public getEvents(
    filters: Partial<EventFilters> = {},
    pagination: PaginationOptions = { page: 1, pageSize: 10, sortBy: 'date', sortOrder: 'desc' }
  ): PaginatedEvents {
    let filteredEvents = this.filterEvents(this.events, filters);
    filteredEvents = this.sortEvents(filteredEvents, pagination.sortBy, pagination.sortOrder);
    
    const { page = 1, pageSize = 10 } = pagination;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    return {
      data: filteredEvents.slice(startIndex, endIndex),
      total: filteredEvents.length,
      page,
      pageSize,
      totalPages: Math.ceil(filteredEvents.length / pageSize)
    };
  }

  /**
   * Get a single event by eventNumber
   */
  public getEventById(id: string | number): Event | undefined {
    return this.events.find(event => event.eventNumber === Number(id));
  }

  /**
   * Get events by year
   */
  public getEventsByYear(year: number, filters: any = {}): Event[] {
    const yearStart = new Date(year, 0, 1).toISOString();
    const yearEnd = new Date(year + 1, 0, 1).toISOString();
    
    return this.filterEvents(this.events, {
      ...filters,
      startDate: { gte: yearStart, lt: yearEnd }
    });
  }

  /**
   * Get upcoming events
   */
  public getUpcomingEvents(limit?: number): Event[] {
    const upcoming = this.events.filter(event => new Date(event.date) >= new Date());
    return limit ? upcoming.slice(0, limit) : upcoming;
  }

  /**
   * Get past events
   */
  public getEventsByDateRange(startDate: string, endDate: string): Event[] {
    return this.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= new Date(startDate) && eventDate <= new Date(endDate);
    });
  }

  /**
   * Get all unique years from events
   */
  public getEventYears(): number[] {
    const years = new Set<number>();
    this.events.forEach(event => {
      years.add(new Date(event.date).getFullYear());
    });
    return Array.from(years).sort((a, b) => b - a); // Descending order
  }

  /**
   * Get all unique locations from events
   */
  public getEventLocations(): { country: string; city: string }[] {
    const locations = new Map<string, { country: string; city: string }>();
    
    this.events.forEach(event => {
      const key = `${event.location.country}-${event.location.city}`.toLowerCase();
      if (!locations.has(key)) {
        locations.set(key, {
          country: event.location.country,
          city: event.location.city
        });
      }
    });
    
    return Array.from(locations.values());
  }

  /**
   * Add a new event
   */
  public addEvent(event: Omit<Event, 'eventNumber'>): Event {
    const newEvent: Event = {
      ...event,
      eventNumber: this.generateEventNumber(),
    };
    
    this.events.push(newEvent);
    return newEvent;
  }

  /**
   * Update an existing event
   */
  public updateEvent(eventNumber: number, updates: Partial<Event>): Event | undefined {
    const index = this.events.findIndex(e => e.eventNumber === eventNumber);
    
    if (index === -1) return undefined;
    
    const updatedEvent = {
      ...this.events[index],
      ...updates,
    };
    
    this.events[index] = updatedEvent;
    return updatedEvent;
  }

  /**
   * Delete an event by eventNumber
   */
  public deleteEvent(eventNumber: number): boolean {
    const initialLength = this.events.length;
    this.events = this.events.filter(event => event.eventNumber !== eventNumber);
    return this.events.length < initialLength;
  }

  // Private helper methods
  private filterEvents(events: Event[], filters: Partial<EventFilters>): Event[] {
    return events.filter(event => {
      // Filter by year if provided
      if (filters.year) {
        const years = Array.isArray(filters.year) ? filters.year : [filters.year];
        const eventYear = new Date(event.date).getFullYear();
        if (!years.includes(eventYear)) return false;
      }
      // Filter by country
      if (filters.country) {
        const countries = Array.isArray(filters.country) ? filters.country : [filters.country];
        if (!countries.some(c => c.toLowerCase() === event.location.country.toLowerCase())) {
          return false;
        }
      }
      // Search by query
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchFields = [
          event.eventName,
          event.description,
          event.location.city,
          event.location.country,
          event.location.building,
          event.collaborators?.join(' '),
        ].filter(Boolean).join(' ').toLowerCase();
        
        if (!searchFields.includes(query)) return false;
      }
      // Filter by upcoming/past
      if (filters.upcomingOnly && new Date(event.date) < new Date()) return false;
      if (filters.pastOnly && new Date(event.date) >= new Date()) return false;
      
      return true;
    });
  }

  private sortEvents(events: Event[], sortBy: 'date' | 'eventName' | 'location' = 'date', sortOrder: 'asc' | 'desc' = 'desc'): Event[] {
    return [...events].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'eventName':
          comparison = a.eventName.localeCompare(b.eventName);
          break;
        case 'location':
        default:
          const locationA = `${a.location.city}, ${a.location.country}`;
          const locationB = `${b.location.city}, ${b.location.country}`;
          comparison = locationA.localeCompare(locationB);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }

  private generateEventNumber(): number {
    const maxNumber = Math.max(...this.events.map(e => e.eventNumber), 0);
    return maxNumber + 1;
  }
}

// Create and export a singleton instance
export const eventService = new EventService(events);

export default eventService;
