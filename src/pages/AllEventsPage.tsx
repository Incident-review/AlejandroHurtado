import { useState, useEffect, useRef, useMemo } from 'react';
import { Box, VStack, Text, Center, Spinner, Container } from '@chakra-ui/react';
import type { Event } from '../types/events';
import EventCard from '../components/EventCard';
import { eventService } from '../components/features/events/eventService';
import AnimatedBackground from '../components/AnimatedBackground';

// Constants
const HEADER_HEIGHT = 64;
const TIMELINE_BAR_HEIGHT = 60; // Height of the timeline bar

// Utility: group events by year, sorted descending
const groupEventsByYear = (eventsList: Event[]): Map<number, Event[]> => {
  const map = new Map<number, Event[]>();
  eventsList?.forEach(event => {
    const year = new Date(event.startDate).getFullYear();
    if (!map.has(year)) map.set(year, []);
    map.get(year)?.push(event);
  });
  return new Map([...map.entries()].sort((a, b) => b[0] - a[0]));
};

// Simple timeline bar component
const TimelineBar = ({ 
  years, 
  currentYear, 
  onYearClick 
}: { 
  years: number[]; 
  currentYear: number | null; 
  onYearClick: (year: number) => void 
}) => (
  <Box 
    position="fixed"
    top={0}
    left={0}
    right={0}
    height={`${HEADER_HEIGHT + 65}px`} /* 6px below header + 38px for the bar */
    bg="rgba(0, 0, 0, 0.9)"
    zIndex={998}
  >
    <Box 
      display="flex" 
      overflowX="auto" 
      py={2} 
      px={4}
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      zIndex={999}
      sx={{
        '&::-webkit-scrollbar': {
          height: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          bg: 'gray.600',
          borderRadius: '2px',
        },
      }}
    >
      {years.map(year => (
        <Box
          key={year}
          as="button"
          px={4}
          py={2}
          mx={1}
          borderRadius="md"
          bg={currentYear === year ? 'rgba(255, 255, 255, 0.2)' : 'transparent'}
          color={currentYear === year ? 'white' : 'gray.300'}
          fontWeight={currentYear === year ? 'bold' : 'normal'}
          _hover={{
            bg: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
          }}
          _focus={{
            outline: 'none',
            boxShadow: 'none',
          }}
          _active={{
            outline: 'none',
          }}
          onClick={() => onYearClick(year)}
          whiteSpace="nowrap"
          transition="all 0.2s"
        >
          {year}
        </Box>
      ))}
    </Box>
  </Box>
);

const AllEventsPage = () => {
  // State management
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const yearRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Group events by year
  const eventsByYear = useMemo(() => groupEventsByYear(events), [events]);
  const years = useMemo(() => Array.from(eventsByYear.keys()), [eventsByYear]);

  // Set initial year to the most recent year with events
  useEffect(() => {
    if (years.length > 0 && currentYear === null) {
      setCurrentYear(years[0]);
    }
  }, [years, currentYear]);

  // Load events on mount
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const allEvents = await eventService.getAllEvents();
        setEvents(allEvents);
        setLoading(false);
      } catch (err) {
        console.error('Error loading events:', err);
        setError('Failed to load events. Please try again later.');
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  // Handle year click
  const handleYearClick = (year: number) => {
    setCurrentYear(year);
    const yearElement = yearRefs.current[year];
    if (yearElement && containerRef.current) {
      const headerOffset = HEADER_HEIGHT + TIMELINE_BAR_HEIGHT;
      const elementPosition = yearElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Set up intersection observer for year highlighting
  useEffect(() => {
    if (years.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const year = parseInt(entry.target.getAttribute('data-year') || '0', 10);
            setCurrentYear(year);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: `-${HEADER_HEIGHT + TIMELINE_BAR_HEIGHT}px 0px -50% 0px`
      }
    );

    // Observe all year sections
    years.forEach((year) => {
      const element = yearRefs.current[year];
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      years.forEach((year) => {
        const element = yearRefs.current[year];
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [years]);

  if (loading) {
    return (
      <Center minH="50vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center minH="50vh">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Box position="relative" minH="100vh" bg="transparent" color="white">
      <AnimatedBackground />
      
      {/* Year selector */}
      <TimelineBar 
        years={years} 
        currentYear={currentYear} 
        onYearClick={handleYearClick} 
      />

      {/* Events container */}
      <Box 
        ref={containerRef}
        position="relative"
        zIndex={1}
        pt={`${TIMELINE_BAR_HEIGHT + HEADER_HEIGHT}px`}
        pb={20}
        minH={`calc(100vh - ${HEADER_HEIGHT}px)`}
        overflowY="auto"
        bg="rgba(0, 0, 0, 0.6)"
        backdropFilter="blur(2px)"
        scrollBehavior="smooth"
        scrollPaddingTop={`${TIMELINE_BAR_HEIGHT + HEADER_HEIGHT + 20}px`}
      >
        <Container maxW="container.lg">
          {Array.from(eventsByYear.entries()).map(([year, yearEvents], index, array) => {
            const isLastYear = index === array.length - 1;
            const yearDate = new Date(year, 0, 1);
            const isCurrentYear = yearDate.getFullYear() === new Date().getFullYear();
            const isPastYear = yearDate < new Date();
            
            return (
              <Box 
                key={year}
                ref={(el) => {
                  if (el) {
                    yearRefs.current[year] = el;
                  }
                }}
                data-year={year}
                id={`year-${year}`}
                position="relative"
                mb={isLastYear ? 0 : 16}
                sx={!isLastYear ? {
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: '50%',
                    bottom: -8,
                    transform: 'translateX(-50%)',
                    width: '2px',
                    height: '40px',
                    bg: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)'
                  }
                } : {}}
              >
                <Box 
                  position="relative"
                  mb={8}
                  textAlign="center"
                >
                  <Box 
                    as="span"
                    display="inline-block"
                    position="relative"
                    px={6}
                    py={2}
                    bg={isCurrentYear ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)'}
                    borderRadius="full"
                    fontSize="sm"
                    fontWeight={isCurrentYear ? 'bold' : 'normal'}
                    color={isPastYear ? 'whiteAlpha.700' : 'white'}
                    backdropFilter="blur(4px)"
                    border="1px solid"
                    borderColor={isCurrentYear ? 'whiteAlpha.400' : 'whiteAlpha.200'}
                    _before={!isLastYear ? {
                      content: '""',
                      position: 'absolute',
                      left: '50%',
                      bottom: -48,
                      transform: 'translateX(-50%)',
                      width: '1px',
                      height: '40px',
                      bg: 'whiteAlpha.200',
                    } : {}}
                  >
                    {year} {isCurrentYear && '• Current Year'}
                  </Box>
                </Box>
                <VStack spacing={6} align="stretch">
                  {yearEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </VStack>
              </Box>
            );
          })}
          
          {events.length === 0 && !loading && (
            <Center minH="50vh">
              <Text>No events found.</Text>
            </Center>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default AllEventsPage;
