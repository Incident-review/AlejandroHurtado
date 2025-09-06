import { Box, Heading, Spinner, Center } from '@chakra-ui/react';
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

  const eventsByYear = useMemo(() => groupEventsByYear(unifiedEvents), [unifiedEvents]);
  const years = useMemo(() => Array.from(eventsByYear.keys()), [eventsByYear]);

  const yearSectionRefs = useRef<{ [year: number]: HTMLDivElement | null }>({});
  
  // Create ref callback for year sections
  const setYearSectionRef = useCallback((year: number) => (el: HTMLDivElement | null) => {
    yearSectionRefs.current[year] = el;
  }, []);
  const [currentYear, setCurrentYear] = useState<number>(years[0] ?? new Date().getFullYear());
  const [visibleYear, setVisibleYear] = useState<number | null>(years[0] ?? null);

  // Handle year click - scroll to the selected year's section
  const handleYearClick = useCallback((year: number) => {
    setCurrentYear(year);
    const ref = yearSectionRefs.current[year];
    if (ref) {
      // Add a small delay to ensure the ref is properly set
      setTimeout(() => {
        ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, []);

  // Update current year when visible year changes
  useEffect(() => {
    if (visibleYear && visibleYear !== currentYear) {
      setCurrentYear(visibleYear);
    }
  }, [visibleYear, currentYear]);

  return (
    <Box minH="100vh" position="relative" overflowX="hidden">
      <AnimatedBackground />
      <Box 
        position="fixed" 
        top="0" 
        left="0" 
        right="0" 
        zIndex="sticky"
        bg="rgba(0, 0, 0, 0.8)"
        backdropFilter="blur(8px)"
      >
        <Box 
          h={`${HEADER_HEIGHT}px`} 
          display="flex" 
          alignItems="center" 
          px={{ base: 4, md: 6 }}
          borderBottom="1px solid"
          borderColor="rgba(255, 255, 255, 0.1)"
        >
          <Heading as="h1" size="lg" color="white">Events</Heading>
        </Box>
        <ConsolidatedTimelineBar 
          years={years} 
          currentYear={currentYear}
          visibleYear={visibleYear}
          onYearClick={handleYearClick}
          onYearVisible={setVisibleYear}
          headerHeight={HEADER_HEIGHT}
          variant="dark"
        />
      </Box>
      
      {/* Main content */}
      <Box 
        as="div"
        maxW={{ base: '100%', md: 'container.md', lg: 'container.lg', xl: 'container.xl' }} 
        mx="auto" 
        px={{ base: 4, md: 6 }} 
        pt={`${HEADER_HEIGHT + YEAR_BAR_HEIGHT}px`}
        pb={6}
        minH="100vh"
        position="relative"
        bg="transparent"
      >
        {loading ? (
          <Center minH="50vh">
            <Spinner size="xl" color="#cd853f" />
          </Center>
        ) : error ? (
          <Center minH="50vh">
            <Box color="red.500" textAlign="center" p={4}>
              {error}
            </Box>
          </Center>
        ) : years.length === 0 ? (
          <Center minH="50vh">
            <Box>No upcoming events found.</Box>
          </Center>
        ) : (
          years.map((year) => {
            const yearEvents = eventsByYear.get(year)!;
            return (
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
              >
                <Heading 
                  as="h2" 
                  size="lg" 
                  mb={4} 
                  color="white"
                  textShadow="0 1px 2px rgba(0,0,0,0.5)"
                  position="relative"
                  pl={4}
                  _before={{
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '4px',
                    height: '60%',
                    bgGradient: 'linear(to bottom, #f6d365, #fda085)'
                  }}
                >
                  {year}
                </Heading>
                <Box
                  display="grid"
                  gridTemplateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
                  gap={4}
                  width="90%"
                  bg="transparent"
                >
                  {yearEvents.map((event: Event) => (
                    <Box
                      key={event.eventNumber}
                      minW={{ base: '90vw', sm: '320px' }}
                      maxW={{ base: '90vw', sm: '420px' }}
                      flex="0 0 auto"
                    >
                      <EventCard event={event} />
                    </Box>
                  ))}
                </Box>
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default AllEventsPage;
