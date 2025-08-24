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
  building?: string;
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
  date: string; // ISO date string
  endDate?: string; // ISO date string
  durationMinutes?: number;
  
  // Location
  location: EventLocation;
  isOnline: boolean;
  onlineAccessUrl?: string;
  
  // Organization
  organizer?: string;
  collaborators?: string[];
  luthier?: string;
  
  // Media and content
  media: EventMedia;
  ticketInfo?: TicketInfo;
  program?: string[];
  composers?: string[];
  performers?: string[];
  
  // Metadata
  awards: Award[];
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  lastModifiedBy?: string;
  
  // Legacy/backward compatibility
  image?: string; // Legacy field, prefer media.imageUrls[0]
  tourName?: string; // Legacy field
}

// Type guards
export function isUpcomingEvent(event: Event): boolean {
  return new Date(event.date) >= new Date();
}

export function isPastEvent(event: Event): boolean {
  return new Date(event.date) < new Date();
}

// Date range type for filtering
export interface DateRange {
  gte?: string;
  lte?: string;
  lt?: string;
  gt?: string;
}

// Event filter types
export interface EventFilters {
  type?: EventType | EventType[];
  status?: EventStatus | EventStatus[];
  startDate?: DateRange;
  endDate?: DateRange;
  year?: number | number[];
  country?: string | string[];
  city?: string | string[];
  searchQuery?: string;
  upcomingOnly?: boolean;
  pastOnly?: boolean;
  limit?: number;
  offset?: number;
}

// Pagination and sorting
export interface PaginationOptions {
  page?: number;
  pageSize?: number;
  sortBy?: 'date' | 'eventName' | 'location';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedEvents {
  data: Event[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
