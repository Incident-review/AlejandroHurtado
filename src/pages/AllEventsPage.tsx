import { Box, Heading, Spinner, Center, Container, VStack, Divider, Text } from '@chakra-ui/react';
import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import type { Event } from '../types/events';
import EventCard from '../components/EventCard';
import ConsolidatedTimelineBar from '../components/ConsolidatedTimelineBar';
import AnimatedBackground from '../components/AnimatedBackground';
import { eventDataService } from '../services/eventDataService';

const HEADER_HEIGHT = 64;
const YEAR_BAR_HEIGHT = 60; // Height of the timeline bars by year, sorted descending

// Utility: group events by year, sorted descending
const groupEventsByYear = (eventsList: Event[]) => {
  const map = new Map<number, Event[]>();
  eventsList.forEach(event => {
    const year = new Date(event.date).getFullYear();
    if (!map.has(year)) map.set(year, []);
    map.get(year)!.push(event);
  });
  // Sort years descending
  return new Map([...map.entries()].sort((a, b) => b[0] - a[0]));
};

const AllEventsPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [unifiedEvents, setUnifiedEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load events on component mount
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const allEvents = eventDataService.getAllEvents();
        const now = new Date();
        
        // Process events in a single pass
        const [future, past] = allEvents.reduce<[Event[], Event[]]>(
          (acc, event) => {
            const eventDate = new Date(event.date);
            const index = eventDate >= now ? 0 : 1;
            acc[index].push(event);
            return acc;
          },
          [[], []]
        );

        // Sort future events chronologically
        future.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        
        // Sort past events in reverse chronological order
        past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setUnifiedEvents([...future, ...past]);
      } catch (err) {
        console.error('Failed to load events:', err);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  // Group events by year and separate past/future events
  const { pastEvents, futureEvents } = useMemo(() => {
    const now = new Date();
    return unifiedEvents.reduce((acc, event) => {
      const eventDate = new Date(event.date);
      if (eventDate < now) {
        acc.pastEvents.push(event);
      } else {
        acc.futureEvents.push(event);
      }
      return acc;
    }, { pastEvents: [] as Event[], futureEvents: [] as Event[] });
  }, [unifiedEvents]);

  // Group events by year
  const pastEventsByYear = useMemo(() => groupEventsByYear(pastEvents), [pastEvents]);
  const futureEventsByYear = useMemo(() => groupEventsByYear(futureEvents), [futureEvents]);

  const allYears = useMemo(() => {
    const pastYears = Array.from(pastEventsByYear.keys());
    const futureYears = Array.from(futureEventsByYear.keys());
    return Array.from(new Set([...pastYears, ...futureYears])).sort((a, b) => b - a);
  }, [pastEventsByYear, futureEventsByYear]);

  const yearSectionRefs = useRef<{ [year: number]: HTMLDivElement | null }>({});
  const pastFutureDividerRef = useRef<HTMLDivElement>(null);
  
  // Create ref callback for year sections
  const setYearSectionRef = useCallback((year: number) => (el: HTMLDivElement | null) => {
    yearSectionRefs.current[year] = el;
  }, []);

  // Auto-scroll to the most recent past event on initial load
  useEffect(() => {
    if (pastEvents.length > 0) {
      const mostRecentPastYear = Math.max(...Array.from(pastEventsByYear.keys()));
      setTimeout(() => {
        const ref = yearSectionRefs.current[mostRecentPastYear];
        if (ref) {
          ref.scrollIntoView({ behavior: 'auto', block: 'start' });
          // Scroll up a bit to account for the fixed header
          window.scrollBy(0, -100);
        }
      }, 100);
    }
  }, [pastEvents.length, pastEventsByYear]);
  const [currentYear, setCurrentYear] = useState<number>(allYears[0] ?? new Date().getFullYear());
  const [visibleYear, setVisibleYear] = useState<number | null>(allYears[0] ?? null);
  
  // Debug log when years change
  useEffect(() => {
    console.log('Years updated:', allYears);
    console.log('Current year:', currentYear);
    console.log('Visible year:', visibleYear);
  }, [allYears, currentYear, visibleYear]);

  // Handle year click - scroll to the selected year's section
  const handleYearClick = useCallback((year: number) => {
    console.log('Year clicked:', year);
    setCurrentYear(year);
    const ref = yearSectionRefs.current[year];
    console.log('Year section ref:', ref);
    if (ref) {
      // Add a small delay to ensure the ref is properly set
      setTimeout(() => {
        console.log('Scrolling to year:', year);
        ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, []);

  // Update current year when visible year changes
  useEffect(() => {
    console.log('Visible year changed:', visibleYear, 'Current year:', currentYear);
    if (visibleYear && visibleYear !== currentYear) {
      console.log('Updating current year to:', visibleYear);
      setCurrentYear(visibleYear);
    }
  }, [visibleYear, currentYear]);

  // Function to render events for a specific year
  const renderYearEvents = (year: number, events: Event[], isPast: boolean) => (
    <Box 
      key={year} 
      ref={setYearSectionRef(year)} 
      id={`year-${year}`}
      data-event-year={year}
      data-year={year}
      mb={8}
      pt={8}
      bg="transparent"
      scrollMarginTop={`${HEADER_HEIGHT + YEAR_BAR_HEIGHT + 20}px`}
      position="relative"
    >
      <Box 
        position="absolute" 
        left={0} 
        right={0} 
        top={0} 
        height="1px" 
        bg={isPast ? "orange.500" : "blue.400"}
        opacity={0.5}
      />
      <Heading 
        as="h2" 
        size="lg" 
        mb={4} 
        color="white"
        textShadow="0 1px 2px rgba(0,0,0,0.5)"
        position="relative"
        pl={4}
        display="flex"
        alignItems="center"
      >
        <Box 
          as="span" 
          mr={2} 
          color={isPast ? "orange.400" : "blue.300"}
        >
          {isPast ? '✓' : '→'}
        </Box>
        {year}
        <Box 
          ml={2} 
          fontSize="sm" 
          color={isPast ? "orange.300" : "blue.200"}
          fontWeight="normal"
        >
          ({isPast ? 'Past' : 'Upcoming'})
        </Box>
      </Heading>
      <Box
        display="grid"
        gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        gap={4}
        width="90%"
        bg="transparent"
      >
        {events.map((event: Event) => (
          <EventCard 
            key={event.id} 
            event={event} 
            variant={isPast ? 'past' : 'upcoming'}
          />
        ))}
      </Box>
    </Box>
  );

  // Function to render a year section
  const renderYearSection = (year: number, events: Event[], isPast: boolean) => (
    <Box 
      key={year}
      ref={setYearSectionRef(year)}
      id={`year-${year}`}
      data-event-year={year}
      data-year={year}
      mb={8}
      pt={8}
      bg="transparent"
      scrollMarginTop={`${HEADER_HEIGHT + YEAR_BAR_HEIGHT + 20}px`}
      position="relative"
    >
      <Box 
        position="absolute" 
        left={0} 
        right={0} 
        top={0} 
        height="1px" 
        bg={isPast ? "orange.500" : "blue.400"}
        opacity={0.5}
      />
      <Heading 
        as="h2" 
        size="lg" 
        mb={4} 
        color="white"
        textShadow="0 1px 2px rgba(0,0,0,0.5)"
        position="relative"
        pl={4}
        display="flex"
        alignItems="center"
      >
        <Box 
          as="span" 
          mr={2} 
          color={isPast ? "orange.400" : "blue.300"}
        >
          {isPast ? '✓' : '→'}
        </Box>
        {year}
        <Box 
          ml={2} 
          fontSize="sm" 
          color={isPast ? "orange.300" : "blue.200"}
          fontWeight="normal"
        >
          ({isPast ? 'Past' : 'Upcoming'})
        </Box>
      </Heading>
      <Box
        display="grid"
        gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        gap={4}
        width="100%"
        bg="transparent"
      >
        {events.map((event) => (
          <EventCard 
            key={event.id}
            event={event}
            variant={isPast ? 'past' : 'upcoming'}
          />
        ))}
      </Box>
    </Box>
  );

  return (
    <Box minH="100vh" position="relative" overflowX="hidden">
      <AnimatedBackground />
      <Box 
        position="fixed" 
        top="0" 
        left="0" 
        right="0" 
        zIndex={1000}
        bg="rgba(0, 0, 0, 0.9)"
        backdropFilter="blur(10px)"
        boxShadow="lg"
      >
        <Container maxW="container.xl" py={4}>
          <VStack spacing={0} align="stretch">
            <Center mb={2}>
              <Heading as="h1" size="xl" color="white" lineHeight="shorter">Events</Heading>
            </Center>
            <ConsolidatedTimelineBar 
              years={allYears} 
              currentYear={currentYear}
              visibleYear={visibleYear}
              onYearClick={handleYearClick}
              onYearVisible={setVisibleYear}
            />
          </VStack>
        </Container>
      </Box>
      
      {/* Main content */}
      <Box 
        as="div"
        maxW={{ base: '100%', md: 'container.md', lg: 'container.lg', xl: 'container.xl' }} 
        mx="auto" 
        px={{ base: 4, md: 6 }} 
        pt={`${HEADER_HEIGHT + YEAR_BAR_HEIGHT}px`}
        pb={6}
      >
        {/* Future Events */}
        {futureEvents.length > 0 && (
          <Box mb={12}>
            <Heading 
              as="h2" 
              size="xl" 
              color="white" 
              mb={6}
              display="flex"
              alignItems="center"
            >
              <Box as="span" color="blue.300" mr={3}>→</Box>
              Upcoming Events
            </Heading>
            {Array.from(futureEventsByYear.entries())
              .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
              .map(([year, events]) => renderYearSection(Number(year), events, false))}
          </Box>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <Box>
            <Heading 
              as="h2" 
              size="xl" 
              color="white" 
              mb={6}
              mt={futureEvents.length > 0 ? 16 : 0}
              display="flex"
              alignItems="center"
            >
              <Box as="span" color="orange.400" mr={3}>✓</Box>
              Past Events
            </Heading>
            {Array.from(pastEventsByYear.entries())
              .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
              .map(([year, events]) => renderYearSection(Number(year), events, true))}
          </Box>
        )}

        {loading && (
          <Center minH="50vh">
            <Spinner size="xl" color="#cd853f" />
          </Center>
        )}

        {error && (
          <Center minH="50vh">
            <Box color="red.500" textAlign="center" p={4}>
              {error}
            </Box>
          </Center>
        )}

        {!loading && !error && pastEvents.length === 0 && futureEvents.length === 0 && (
          <Center minH="50vh">
            <Box color="white">No events found.</Box>
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default AllEventsPage;
