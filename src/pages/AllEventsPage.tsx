import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Box, VStack, Text, Center, Spinner, Container } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import type { Event } from '../types/events';
import EventCard from '../components/EventCard';
import { eventService } from '../components/features/events/eventService';
//import AnimatedBackground from '../components/AnimatedBackground';

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
  const { t } = useTranslation();
  // State management
  const [loading] = useState<boolean>(false);
  const [events] = useState<Event[]>(() => eventService.getAllEvents());
  const [error] = useState<string | null>(null);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const yearRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper function to check if an event is in the past
  const isEventPast = (event: Event) => {
    if (!event.startDate) return false;
    const eventDate = new Date(event.startDate);
    const now = new Date();
    // Set time to start of day for accurate date comparison
    now.setHours(0, 0, 0, 0);
    return eventDate < now;
  };

  // Group events by year and sort them by date
  const eventsByYear = useMemo(() => {
    if (!events) return new Map<number, Event[]>();
    
    // Sort events by date (newest first)
    const sortedEvents = [...events].sort((a, b) => {
      const dateA = a.startDate ? new Date(a.startDate).getTime() : 0;
      const dateB = b.startDate ? new Date(b.startDate).getTime() : 0;
      return dateB - dateA; // Sort newest first
    });
    
    // Debug log to verify sorting and past events
    console.log('Sorted events:', sortedEvents.map(e => ({
      id: e.id,
      startDate: e.startDate,
      name: e.eventName,
      isPast: isEventPast(e)
    })));
    
    return groupEventsByYear(sortedEvents);
  }, [events]);

  const years = useMemo(() => Array.from(eventsByYear.keys()), [eventsByYear]);

  // Set initial year to the most recent year with events
  useEffect(() => {
    if (years.length > 0 && currentYear === null) {
      setCurrentYear(years[0]);
    }
  }, [years, currentYear]);

  // Load events on mount
  // (Removed: events are initialized synchronously)
  // useEffect(() => {
  //   const loadEvents = async () => {
  //     try {
  //       const allEvents = await eventService.getAllEvents();
  //       setEvents(allEvents);
  //       setLoading(false);
  //     } catch (err) {
  //       console.error('Error loading events:', err);
  //       setError(t('events.failedToLoad'));
  //       setLoading(false);
  //     }
  //   };
  //   loadEvents();
  // }, [t]);

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
                    {year} {isCurrentYear && t('events.currentYear')}
                  </Box>
                </Box>
                <VStack spacing={6} align="stretch">
                  {yearEvents.map((event, index, array) => {
                    const isPast = isEventPast(event);
                    const nextEvent = array[index + 1];
                    const isLastPastEvent = isPast && nextEvent && !isEventPast(nextEvent);
                    const isLastEventOfYear = index === array.length - 1;
                    const currentYear = Number(year);
                    const nextYearEvents = Array.from(eventsByYear.entries())
                      .find(([y]) => y < currentYear);
                    const hasFutureEventsInPastYear = nextYearEvents && 
                      nextYearEvents[1].some(e => !isEventPast(e));
                    
                    const shouldShowDivider = isLastPastEvent || 
                      (isLastEventOfYear && hasFutureEventsInPastYear);
                    
                    return (
                      <React.Fragment key={event.id}>
                        <EventCard 
                          event={event} 
                          isPastEvent={isPast}
                        />
                        {shouldShowDivider && (
                          <Box 
                            position="relative" 
                            my={10}
                            px={4}
                            h="3px"
                          >
                            {/* Main divider line */}
                            <Box 
                              position="absolute"
                              left={0}
                              right={0}
                              top="50%"
                              h="2px"
                              bgGradient="linear(to-r, transparent, white, transparent)"
                              zIndex={1}
                            />
                            {/* NOW label */}
                            <Box
                              position="absolute"
                              left="50%"
                              top="50%"
                              transform="translate(-50%, -50%)"
                              bg="black"
                              color="white"
                              px={4}
                              py={1}
                              fontSize="xs"
                              fontWeight="bold"
                              borderRadius="full"
                              border="1px solid rgba(255,255,255,0.5)"
                              zIndex={2}
                              fontFamily="mono"
                              letterSpacing="0.1em"
                              textTransform="uppercase"
                              boxShadow="0 0 10px rgba(0,0,0,0.7)"
                            >
                              NOW
                            </Box>
                            {/* Glow effect */}
                            <Box
                              position="absolute"
                              left="50%"
                              top="50%"
                              transform="translate(-50%, -50%)"
                              w="100px"
                              h="20px"
                              bg="rgba(255,255,255,0.1)"
                              filter="blur(10px)"
                              zIndex={0}
                            />
                          </Box>
                        )}
                      </React.Fragment>
                    );
                  })}
                  {/* Add divider at the end of the year if there are past events in the next year */}
                  {yearEvents.length > 0 && (() => {
                    const lastEvent = yearEvents[yearEvents.length - 1];
                    const isLastEventPast = isEventPast(lastEvent);
                    const currentYear = Number(year);
                    const nextYearEvents = Array.from(eventsByYear.entries())
                      .find(([y]) => y < currentYear)?.[1] || [];
                    const hasFutureEventsInPastYear = nextYearEvents.some(e => !isEventPast(e));
                    
                    return isLastEventPast && hasFutureEventsInPastYear && (
                      <Box 
                        position="relative" 
                        my={10}
                        px={4}
                        h="3px"
                        key={`year-divider-${year}`}
                      >
                        <Box 
                          position="absolute"
                          left={0}
                          right={0}
                          top="50%"
                          h="2px"
                          bgGradient="linear(to-r, transparent, white, transparent)"
                          zIndex={1}
                        />
                        <Box
                          position="absolute"
                          left="50%"
                          top="50%"
                          transform="translate(-50%, -50%)"
                          bg="black"
                          color="white"
                          px={4}
                          py={1}
                          fontSize="xs"
                          fontWeight="bold"
                          borderRadius="full"
                          border="1px solid rgba(255,255,255,0.5)"
                          zIndex={2}
                          fontFamily="mono"
                          letterSpacing="0.1em"
                          textTransform="uppercase"
                          boxShadow="0 0 10px rgba(0,0,0,0.7)"
                        >
                          NOW
                        </Box>
                      </Box>
                    );
                  })()}
                </VStack>
              </Box>
            );
          })}
          
          {events.length === 0 && !loading && (
            <Center minH="50vh">
              <Text>{t('events.noEvents')}</Text>
            </Center>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default AllEventsPage;
