import { Box, Button, HStack, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useRef, useCallback } from 'react';
import useEvents from '../hooks/useEvents';

interface EnhancedTimelineBarProps {
  currentYear: number;
  onYearClick: (year: number) => void;
  showAllYears?: boolean;
}

const EnhancedTimelineBar = ({
  currentYear,
  onYearClick,
  showAllYears = false,
}: EnhancedTimelineBarProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  const yearRefs = useRef<{ [year: number]: HTMLButtonElement | null }>({});
  const isDesktop = useBreakpointValue({ base: false, md: true });
  
  // Use our custom hook to get event years
  const { getEventYears } = useEvents();
  const years = getEventYears();
  
  // Filter years if we don't want to show all
  const visibleYears = showAllYears 
    ? years 
    : years.filter(year => year >= new Date().getFullYear() - 1);

  // Auto-scroll to the current year
  useEffect(() => {
    const activeBtn = yearRefs.current[currentYear];
    const bar = barRef.current;
    
    if (activeBtn && bar) {
      const barRect = bar.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const scrollLeft = activeBtn.offsetLeft - bar.offsetLeft - barRect.width / 2 + btnRect.width / 2;
      
      bar.scrollTo({ 
        left: scrollLeft, 
        behavior: 'smooth' 
      });
    }
  }, [currentYear, visibleYears]);

  // Handle year button click with smooth scroll
  const handleYearClick = useCallback((year: number) => {
    onYearClick(year);
    
    // Update URL hash for deep linking
    window.history.pushState({}, '', `#year-${year}`);
  }, [onYearClick]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent, year: number) => {
    const currentIndex = visibleYears.indexOf(year);
    
    if (e.key === 'ArrowRight' && currentIndex < visibleYears.length - 1) {
      handleYearClick(visibleYears[currentIndex + 1]);
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
      handleYearClick(visibleYears[currentIndex - 1]);
    } else if (e.key === 'Home') {
      handleYearClick(visibleYears[0]);
    } else if (e.key === 'End') {
      handleYearClick(visibleYears[visibleYears.length - 1]);
    }
  }, [visibleYears, handleYearClick]);

  if (visibleYears.length === 0) {
    return null; // Don't render if no years available
  }

  return (
    <Box
      id="timeline-bar"
      as="nav"
      aria-label="Event timeline"
      position="fixed"
      top="var(--header-height)"
      left="0"
      w="100%"
      zIndex={1200}
      bg={isDesktop ? 'gray.50' : 'whiteAlpha.900'}
      borderBottom="1px solid"
      borderColor={isDesktop ? 'gray.200' : 'gray.100'}
      py={1}
      boxShadow={isDesktop ? 'sm' : 'none'}
      overflowX="auto"
      ref={barRef}
      sx={{
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <HStack 
        as="ul"
        role="list"
        spacing={2} 
        px={4}
        py={2}
        justifyContent={{ base: 'flex-start', md: 'center' }}
        listStyleType="none"
      >
        {visibleYears.map((year) => {
          const isActive = year === currentYear;
          const yearId = `year-${year}`;
          
          return (
            <Box as="li" key={year}>
              <Button
                id={yearId}
                size="sm"
                variant={isActive ? (isDesktop ? 'ghost' : 'solid') : 'outline'}
                colorScheme={isActive ? (isDesktop ? 'blue' : 'teal') : 'gray'}
                fontWeight={isActive ? 'semibold' : 'normal'}
                onClick={() => handleYearClick(year)}
                onKeyDown={(e) => handleKeyDown(e, year)}
                minW="60px"
                px={3}
                borderRadius="full"
                borderWidth={isActive ? (isDesktop ? 0 : 2) : 1}
                borderColor={isActive ? (isDesktop ? 'transparent' : 'teal.500') : 'gray.200'}
                bg={isActive 
                  ? (isDesktop ? 'blue.50' : 'teal.500') 
                  : (isDesktop ? 'transparent' : 'white')
                }
                color={isActive 
                  ? (isDesktop ? 'blue.700' : 'white') 
                  : 'gray.700'
                }
                _hover={{
                  bg: isActive 
                    ? (isDesktop ? 'blue.100' : 'teal.600') 
                    : (isDesktop ? 'gray.100' : 'gray.50')
                }}
                _focus={{
                  outline: '2px solid',
                  outlineColor: 'blue.400',
                  outlineOffset: '2px',
                }}
                transition="all 0.2s"
                ref={el => {
                  yearRefs.current[year] = el;
                }}
                aria-current={isActive ? 'true' : 'false'}
                aria-label={`View events from ${year}`}
              >
                {year}
              </Button>
            </Box>
          );
        })}
      </HStack>
    </Box>
  );
};

export default EnhancedTimelineBar;
