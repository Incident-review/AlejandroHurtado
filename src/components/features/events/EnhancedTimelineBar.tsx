import { Box, Button, HStack, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useRef, useCallback } from 'react';
import { useEvents } from './useEvents';

interface EnhancedTimelineBarProps {
  currentYear: number;
  onYearClick: (year: number) => void;
  showAllYears?: boolean;
}

const EnhancedTimelineBar: React.FC<EnhancedTimelineBarProps> = ({
  currentYear,
  onYearClick,
  showAllYears = false
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  const yearRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});
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
    if (yearRefs.current[currentYear] && barRef.current) {
      const yearElement = yearRefs.current[currentYear];
      const container = barRef.current;
      
      if (yearElement && container) {
        const containerWidth = container.offsetWidth;
        const yearLeft = yearElement.offsetLeft;
        const yearWidth = yearElement.offsetWidth;
        
        // Calculate scroll position to center the year
        const scrollLeft = yearLeft - (containerWidth / 2) + (yearWidth / 2);
        
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [currentYear, visibleYears]);

  // Handle year button click with smooth scroll
  const handleYearClick = useCallback((year: number): void => {
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
      ref={barRef}
      as="nav"
      aria-label="Event timeline"
      position="fixed"
      top="var(--header-height)"
      left={0}
      right={0}
      bg="rgba(0, 0, 0, 0.8)"
      backdropFilter="blur(8px)"
      zIndex={10}
      overflowX="auto"
      overflowY="hidden"
      py={2}
      px={4}
      css={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <HStack
        spacing={{ base: 4, md: 6 }}
        px={{ base: 4, md: 8 }}
        minW="max-content"
        justify="center"
      >
        {visibleYears.map((year) => (
          <Button
            key={year}
            ref={(el) => { if (el) yearRefs.current[year] = el }}
            variant="ghost"
            size={isDesktop ? 'md' : 'sm'}
            color={currentYear === year ? 'white' : 'gray.400'}
            fontWeight={currentYear === year ? 'bold' : 'normal'}
            fontSize={isDesktop ? 'lg' : 'md'}
            p={2}
            minW="auto"
            height="auto"
            borderRadius="md"
            _hover={{
              color: 'white',
              bg: 'rgba(255, 255, 255, 0.1)',
            }}
            _active={{
              bg: 'rgba(255, 255, 255, 0.2)',
            }}
            _focus={{
              boxShadow: '0 0 0 2px rgba(255, 255, 255, 0.5)',
              outline: 'none',
            }}
            onClick={() => handleYearClick(year)}
            onKeyDown={(e) => handleKeyDown(e, year)}
            aria-current={currentYear === year ? 'true' : 'false'}
            tabIndex={0}
          >
            {year}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default EnhancedTimelineBar;
