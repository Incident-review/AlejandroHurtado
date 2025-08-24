import { Box, Button, HStack } from '@chakra-ui/react';
import { useEffect, useRef, useCallback } from 'react';

interface EventTimelineBarProps {
  years: number[];
  currentYear: number;
  onYearClick: (year: number) => void;
  headerHeight?: number;
}

const YEAR_BAR_HEIGHT = 48;

const EventTimelineBar = ({
  years,
  currentYear,
  onYearClick,
  headerHeight = 64,
}: EventTimelineBarProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  const yearRefs = useRef<{ [year: number]: HTMLButtonElement | null }>({});
  // Using useBreakpointValue to handle responsive behavior if needed in the future

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
  }, [currentYear, years]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent, year: number) => {
    const currentIndex = years.indexOf(year);
    
    if (e.key === 'ArrowRight' && currentIndex < years.length - 1) {
      onYearClick(years[currentIndex + 1]);
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
      onYearClick(years[currentIndex - 1]);
    } else if (e.key === 'Home') {
      onYearClick(years[0]);
    } else if (e.key === 'End') {
      onYearClick(years[years.length - 1]);
    }
  }, [years, onYearClick]);

  if (years.length === 0) {
    return null;
  }

  return (
    <Box
      id="event-timeline-bar"
      position="fixed"
      top={`${headerHeight}px`}
      left={0}
      right={0}
      zIndex={1200}
      bg="rgba(0, 0, 0, 0.7)"
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="rgba(255, 255, 255, 0.1)"
      py={3}
      height={`${YEAR_BAR_HEIGHT}px`}
      minH={`${YEAR_BAR_HEIGHT}px`}
      sx={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none',
          zIndex: -1
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
        }
      }}
    >
      <HStack 
        spacing={2} 
        overflowX="auto" 
        w="100%" 
        justify="flex-start"
        sx={{
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {years.map(year => (
          <Button
            key={year}
            ref={el => { yearRefs.current[year] = el; }}
            size="sm"
            variant={year === currentYear ? 'solid' : 'outline'}
            colorScheme="yellow"
            fontWeight={year === currentYear ? 'bold' : 'normal'}
            onClick={() => onYearClick(year)}
            onKeyDown={(e) => handleKeyDown(e, year)}
            minW="56px"
            borderWidth={year === currentYear ? 2 : 1}
            borderColor={year === currentYear ? '#cd853f' : '#8b7355'}
            bg={year === currentYear ? '#8b7355' : 'transparent'}
            color={year === currentYear ? '#faf0c0' : '#f0d680'}
            _hover={{ 
              bg: year === currentYear ? 'rgba(160, 133, 107, 0.8)' : 'rgba(139, 115, 85, 0.8)',
              backdropFilter: 'blur(12px)',
              color: '#faf0c0',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
            }}
            _active={{
              transform: 'translateY(1px)',
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
            }}
            sx={{
              backdropFilter: 'blur(10px)',
              '&::before': {
                content: '""',
                position: 'absolute',
                inset: 0,
                borderRadius: '9999px',
                padding: '1px',
                background: 'linear-gradient(135deg, rgba(255,165,0,0.4), rgba(139, 69, 19, 0.3), rgba(0,0,0,0.2))',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                pointerEvents: 'none'
              }
            }}
            transition="all 0.2s ease"
            borderRadius="full"
            aria-current={year === currentYear ? 'true' : 'false'}
            aria-label={`View events from ${year}`}
          >
            {year}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default EventTimelineBar;
