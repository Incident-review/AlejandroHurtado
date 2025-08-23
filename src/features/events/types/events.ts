// Types for event status
export type EventStatus = 'upcoming' | 'past' | 'cancelled' | 'ongoing';

// Types for event types/categories
export type EventType = 'solo' | 'orchestra' | 'chamber' | 'competition' | 'masterclass' | 'other';

export interface Award {
  id: string;
  name: string;
  year: number;
  category?: string;
  iconUrl?: string;
  description?: string;
}

export interface EventLocation {
  country: string;
  province?: string;
  city: string;
  venue: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  googleMapsUrl?: string;
}

export interface EventMedia {
  imageUrls: string[];
  videoUrls?: string[];
  programPdfUrl?: string;
}

export interface TicketInfo {
  isFree: boolean;
  price?: number;
  currency?: string;
  purchaseUrl?: string;
  soldOut?: boolean;
}

export interface Event {
  // Core identifiers
  id: string;
  eventNumber: number;
  eventName: string;
  slug: string;
  
  // Event details
  type: EventType;
  status: EventStatus;
  description?: string;
  shortDescription?: string;
  
  // Timing
  startDate: string; // ISO 8601 format
  endDate?: string;   // For multi-day events
  durationMinutes?: number;
  
  // Location
  location: EventLocation;
  isOnline: boolean;
  onlineAccessUrl?: string;
  
  // Organization
  organizer?: string;
  collaborators?: string[];
  luthier?: string;
  
  // Media
  media: EventMedia;
  
  // Ticketing
  ticketInfo?: TicketInfo;
  
  // Additional metadata
  program?: string[];
  composers?: string[];
  performers?: string[];
  
  // Awards
  awards: Award[];
  
  // System fields
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  lastModifiedBy?: string;
}

// Type guards
export function isUpcomingEvent(event: Event): boolean {
  return new Date(event.startDate) > new Date();
}

export function isPastEvent(event: Event): boolean {
  return new Date(event.startDate) <= new Date();
}

// Date range type for filtering
export interface DateRange {
  gte?: string; // Greater than or equal to date (ISO string)
  lte?: string; // Less than or equal to date (ISO string)
  lt?: string;  // Less than date (ISO string)
  gt?: string;  // Greater than date (ISO string)
}

// Event filter types
export interface EventFilters {
  // Filter by event type
  type?: EventType | EventType[];
  
  // Filter by status
  status?: EventStatus | EventStatus[];
  
  // Filter by date range
  startDate?: DateRange;
  endDate?: DateRange;
  
  // Filter by year (convenience for UI)
  year?: number | number[];
  
  // Filter by location
  country?: string | string[];
  city?: string | string[];
  
  // Text search
  searchQuery?: string;
  
  // Convenience filters
  upcomingOnly?: boolean;
  pastOnly?: boolean;
  
  // Pagination (can be used with pagination options)
  limit?: number;
  offset?: number;
}

// Pagination and sorting
export interface PaginationOptions {
  page?: number;
  pageSize?: number;
  sortBy?: 'date' | 'name' | 'location';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedEvents {
  data: Event[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
