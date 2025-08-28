import { Box, Heading } from '@chakra-ui/react';
import { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import events from '../data/data';
import type { Event } from '../types/events';
import EventCard from '../components/EventCard';
import ConsolidatedTimelineBar from '../components/ConsolidatedTimelineBar';
import AnimatedBackground from '../components/AnimatedBackground';

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
  // Chronological: future first, then past
  const unifiedEvents = useMemo(() => {
    const now = new Date();
    const future = events.filter(e => new Date(e.date) >= now).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const past = events.filter(e => new Date(e.date) < now).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return [...future, ...past];
  }, []);

  const eventsByYear = useMemo(() => groupEventsByYear(unifiedEvents), [unifiedEvents]);
  const years = useMemo(() => Array.from(eventsByYear.keys()), [eventsByYear]);

  const yearSectionRefs = useRef<{ [year: number]: HTMLDivElement | null }>({});
  
  // Create ref callback for year sections
  const setYearSectionRef = useCallback((year: number) => (el: HTMLDivElement | null) => {
    yearSectionRefs.current[year] = el;
  }, []);
  const [currentYear, setCurrentYear] = useState<number>(years[0]);
  const [visibleYear, setVisibleYear] = useState<number | null>(years[0]);

  // Handle year click - scroll to the selected year's section
  const handleYearClick = useCallback((year: number) => {
    setCurrentYear(year);
    const ref = yearSectionRefs.current[year];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Update current year when visible year changes
  useEffect(() => {
    if (visibleYear && visibleYear !== currentYear) {
      setCurrentYear(visibleYear);
    }
  }, [visibleYear, currentYear]);

  // Content top padding is handled in App.tsx
  return (
    <Box minH="100vh" position="relative" overflowX="hidden">
      <AnimatedBackground />
      <ConsolidatedTimelineBar 
        years={years} 
        currentYear={currentYear}
        visibleYear={visibleYear}
        onYearClick={handleYearClick}
        onYearVisible={setVisibleYear}
        headerHeight={HEADER_HEIGHT}
        variant="dark"
      />
      
      {/* Main content */}
      <Box 
        as="div"
        maxW={{ base: '100%', md: 'container.md', lg: 'container.lg', xl: 'container.xl' }} 
        mx="auto" 
        px={{ base: 4, md: 6 }} 
        pb={6}
        minH="100%"
        position="relative"
        paddingTop={HEADER_HEIGHT + YEAR_BAR_HEIGHT}
        bg="transparent"
      >
        {years.map((year) => {
          const yearEvents = eventsByYear.get(year)!;
          return (
            <Box 
              key={year} 
              ref={setYearSectionRef(year)} 
              id={`year-${year}`}
              data-event-year={year}
              data-year={year}
              mb={8}
              pt={2}
              bg="transparent"
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
        })}
      </Box>
    </Box>
  );
};

export default AllEventsPage;
