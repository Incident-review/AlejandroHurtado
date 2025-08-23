import { Box, HStack, Button, Heading } from '@chakra-ui/react';
import { useMemo, useRef, useEffect, useState } from 'react';
import { events } from '../data/data';
import type { Event } from '../types/events';
import EventCard from '../components/EventCard';

const HEADER_HEIGHT = 64;
const YEAR_BAR_HEIGHT = 48;

// Utility: group events by year, sorted descending
const groupEventsByYear = (events: Event[]) => {
  const map = new Map<number, Event[]>();
  events.forEach(event => {
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

  // Refs for scroll logic
  const yearSectionRefs = useRef<{ [year: number]: HTMLDivElement | null }>({});
  const yearBtnRefs = useRef<{ [year: number]: HTMLButtonElement | null }>({});
  const [currentYear, setCurrentYear] = useState<number>(years[0]);

  // Detect current year in view robustly
  useEffect(() => {
    const handleScroll = () => {
      let minDist = Infinity;
      let foundYear = years[0];
      for (const year of years) {
        const ref = yearSectionRefs.current[year];
        if (ref) {
          const rect = ref.getBoundingClientRect();
          // Use header + year bar height as offset
          const dist = Math.abs(rect.top - (HEADER_HEIGHT + YEAR_BAR_HEIGHT + 8));
          if (rect.top <= HEADER_HEIGHT + YEAR_BAR_HEIGHT + 8 && dist < minDist) {
            minDist = dist;
            foundYear = year;
          }
        }
      }
      setCurrentYear(foundYear);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [years]);

  // Center the active year in the year bar
  useEffect(() => {
    const btn = yearBtnRefs.current[currentYear];
    if (btn) {
      btn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [currentYear]);

  // Scroll to year section on click
  const handleYearClick = (year: number) => {
    const ref = yearSectionRefs.current[year];
    if (ref) {
      const y = ref.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT - YEAR_BAR_HEIGHT - 8;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <Box>
      {/* Fixed year bar below header, always responsive and never overflows */}
      <Box position="fixed" top={`${HEADER_HEIGHT}px`} left={0} w="100%" maxW="100vw" zIndex={90} bg="white" boxShadow="sm" py={2} px={2} style={{ height: YEAR_BAR_HEIGHT, minHeight: YEAR_BAR_HEIGHT }}>
        <Box h={{ base: 1, md: 2 }} />
        <HStack spacing={2} overflowX="auto" w="100%" justify="flex-start">
          {years.map(year => (
            <Button
              key={year}
              ref={el => { yearBtnRefs.current[year] = el; }}
              size="sm"
              variant={year === currentYear ? 'solid' : 'ghost'}
              colorScheme={year === currentYear ? 'teal' : 'gray'}
              fontWeight={year === currentYear ? 'bold' : 'normal'}
              onClick={() => handleYearClick(year)}
              borderRadius="full"
              minW="56px"
              transition="all 0.2s"
            >
              {year}
            </Button>
          ))}
        </HStack>
      </Box>
      {/* Spacer for header and year bar */}
      <Box style={{ height: HEADER_HEIGHT + YEAR_BAR_HEIGHT + 8, minHeight: HEADER_HEIGHT + YEAR_BAR_HEIGHT + 8 }} />
      {/* Main content */}
      <Box maxW="100vw" mx="auto" px={2} py={6}>
        {years.map((year) => {
          const yearEvents = eventsByYear.get(year)!;
          return (
            <Box key={year} mb={10} ref={el => { yearSectionRefs.current[year] = el; }} id={`year-section-${year}`}> 
              <Heading as="h2" size="md" mb={2} mt={4} color="gray.700">{year}</Heading>
              <Box
                display="flex"
                overflowX="auto"
                gap={4}
                pb={2}
                px={2}
                sx={{
                  scrollbarWidth: 'thin',
                  WebkitOverflowScrolling: 'touch',
                  touchAction: 'pan-y',
                  '&::-webkit-scrollbar': { height: '8px' },
                  '&::-webkit-scrollbar-thumb': { background: '#CBD5E0', borderRadius: '4px' },
                }}
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
