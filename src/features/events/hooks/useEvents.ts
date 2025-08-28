import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Event, EventFilters, PaginationOptions, PaginatedEvents } from '../../../types/events';
import eventService from '../services/eventService';

interface UseEventsOptions {
  initialFilters?: EventFilters;
  initialPagination?: PaginationOptions;
  autoFetch?: boolean;
}

export const useEvents = (options: UseEventsOptions = {}) => {
  const {
    initialFilters = {},
    initialPagination = { page: 1, pageSize: 10, sortBy: 'date', sortOrder: 'desc' },
    autoFetch = true
  } = options;

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<PaginationOptions>(initialPagination);
  const [filters, setFilters] = useState<EventFilters>(initialFilters);
  const [paginatedResult, setPaginatedResult] = useState<PaginatedEvents>({
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
    totalPages: 0
  });

  // Memoized filtered events
  const filteredEvents = useMemo(
    () => eventService.getEvents(filters, { ...pagination, pageSize: 1000 }),
    [filters, pagination]
  );

  // Fetch events based on filters and pagination
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = eventService.getEvents(filters, pagination);
      setEvents(result.data);
      setPaginatedResult(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch events'));
    } finally {
      setLoading(false);
    }
  }, [filters, pagination]);

  // Auto-fetch when filters or pagination changes if autoFetch is true
  useEffect(() => {
    if (autoFetch) {
      fetchEvents();
    }
  }, [fetchEvents, autoFetch]);

  // Get event by ID
  const getEventById = useCallback((id: string) => {
    return eventService.getEventById(id);
  }, []);

  // Add a new event
  const addEvent = useCallback(async (eventData: Omit<Event, 'eventNumber' | 'createdAt' | 'updatedAt'>) => {
    try {
      const eventToAdd: Omit<Event, 'eventNumber'> & { eventNumber?: number } = {
        ...eventData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      const newEvent = eventService.addEvent(eventToAdd);
      if (autoFetch) {
        await fetchEvents();
      }
      return newEvent;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to add event');
    }
  }, [autoFetch, fetchEvents]);

  // Update an event
  const updateEvent = useCallback(async (eventNumber: number, updates: Partial<Omit<Event, 'eventNumber'>>) => {
    try {
      const updatedEvent = eventService.updateEvent(eventNumber, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      if (autoFetch) {
        await fetchEvents();
      }
      return updatedEvent;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update event');
    }
  }, [autoFetch, fetchEvents]);

  // Delete an event
  const deleteEvent = useCallback(async (eventNumber: number) => {
    try {
      const success = eventService.deleteEvent(eventNumber);
      if (autoFetch) {
        await fetchEvents();
      }
      return success;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to delete event');
    }
  }, [autoFetch, fetchEvents]);

  // Reset filters to initial state
  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  // Update pagination
  const updatePagination = useCallback((newPagination: Partial<PaginationOptions>) => {
    setPagination(prev => ({
      ...prev,
      ...newPagination,
      page: newPagination.page !== undefined ? newPagination.page : prev.page,
      pageSize: newPagination.pageSize !== undefined ? newPagination.pageSize : prev.pageSize,
    }));
  }, []);

  // Get unique years from events
  const getEventYears = useCallback(() => {
    return eventService.getEventYears();
  }, []);

  // Get unique locations from events
  const getEventLocations = useCallback(() => {
    return eventService.getEventLocations();
  }, []);

  return {
    // State
    events,
    loading,
    error,
    filters,
    pagination: paginatedResult,
    filteredEvents: filteredEvents.data,
    totalEvents: filteredEvents.total,
    
    // Actions
    setFilters,
    updatePagination,
    resetFilters,
    fetchEvents,
    getEventById,
    addEvent,
    updateEvent,
    deleteEvent,
    getEventYears,
    getEventLocations,
  };
};

export default useEvents;
