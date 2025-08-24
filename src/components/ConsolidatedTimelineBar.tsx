import { Box, Button, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useRef, useCallback, useState } from 'react';

interface TimelineBarProps {
  years: number[];
  currentYear: number;
  onYearClick: (year: number) => void;
  headerHeight?: number;
  variant?: 'light' | 'dark';
  visibleYear?: number | null;
  onYearVisible?: (year: number | null) => void;
}

const TimelineBar = ({
  years,
  currentYear,
  onYearClick,
  headerHeight = 64,
  variant = 'dark',
  visibleYear = null,
  onYearVisible,
}: TimelineBarProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  const yearRefs = useRef<{ [year: number]: HTMLButtonElement | null }>({});
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  // Responsive values
  const buttonSize = useBreakpointValue({ base: 'xs', md: 'sm' });
  const buttonMinWidth = useBreakpointValue({ base: '48px', md: '56px' });

  // Handle intersection observer for visible year detection
  useEffect(() => {
    if (!onYearVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const year = parseInt(entry.target.getAttribute('data-year') || '0', 10);
            if (year) {
              onYearVisible(year);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Trigger when 50% of the event is visible
      }
    );

    // Observe all event sections
    const eventSections = document.querySelectorAll('[data-event-year]');
    eventSections.forEach(section => observer.observe(section));

    return () => {
      eventSections.forEach(section => observer.unobserve(section));
      observer.disconnect();
    };
  }, [onYearVisible]);

  // Auto-scroll to the current year
  const scrollToYear = useCallback((year: number) => {
    const activeBtn = yearRefs.current[year];
    const bar = barRef.current;
    
    if (activeBtn && bar && !isScrolling) {
      const barRect = bar.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const scrollLeft = activeBtn.offsetLeft - bar.offsetLeft - (barRect.width / 2) + (btnRect.width / 2);
      
      setIsScrolling(true);
      bar.scrollTo({ 
        left: scrollLeft, 
        behavior: 'smooth' 
      });
      
      // Reset scrolling state after animation completes
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    }
  }, [isScrolling]);

  // Handle initial scroll and year changes
  useEffect(() => {
    if (years.length > 0) {
      // Small delay to ensure the DOM is fully rendered
      const timer = setTimeout(() => {
        scrollToYear(currentYear);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [years.length, currentYear]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

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

  // Theme variants
  const variants = {
    light: {
      bg: 'rgba(0, 0, 0, 0.7)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      activeBg: '#8b7355',
      activeColor: '#faf0c0',
      inactiveColor: '#f0d680',
      borderColorActive: '#cd853f',
      borderColorInactive: '#8b7355',
      hoverBg: '#a0856b',
      hoverColor: '#faf0c0',
    },
    dark: {
      bg: 'rgba(0, 0, 0, 0.7)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      activeBg: 'rgba(255, 84, 5, 0.85)',
      activeColor: 'white',
      inactiveColor: 'rgba(255, 255, 255, 0.8)',
      borderColorActive: 'rgba(255, 84, 5, 0.9)',
      borderColorInactive: 'rgba(255, 255, 255, 0.2)',
      hoverBg: 'rgba(255, 84, 5, 0.95)',
      hoverColor: 'white',
    }
  };

  const theme = variants[variant];

  return (
    <Box
      id="timeline-bar"
      position="fixed"
      top={`${headerHeight}px`}
      left={0}
      right={0}
      zIndex={1200}
      bg={theme.bg}
      borderTop="none"
      borderBottom="1px solid"
      borderColor={theme.borderColor}
      py={4}
      px={4}
      minH="44px"
      sx={{
        paddingLeft: 'calc(50% - 50vw)',
        paddingRight: 'calc(50% - 50vw)',
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
      <Box 
        w="100%"
        overflowX="auto"
        ref={barRef}
        sx={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          padding: '8px 6px',
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          width="max-content"
          minWidth="100%"
          padding="0 0px"
          margin="0 auto"
          sx={{
            '& > *:not(:last-child)': {
              marginRight: '16px',
            }
          }}
        >
          {years.map((year) => {
            const isActive = year === currentYear;
            return (
              <Button
                key={year}
                size={buttonSize}
                variant={isActive ? 'solid' : 'outline'}
                fontWeight={isActive ? 'bold' : 'normal'}
                onClick={() => onYearClick(year)}
                minW={buttonMinWidth}
                px={{ base: 2, md: 4 }}
                py={2}
                borderWidth={isActive || visibleYear === year ? 2 : 1}
                borderColor={isActive || visibleYear === year ? theme.borderColorActive : theme.borderColorInactive}
                bg={isActive || visibleYear === year ? theme.activeBg : 'transparent'}
                color={isActive || visibleYear === year ? theme.activeColor : theme.inactiveColor}
                _hover={{ 
                  bg: isActive || visibleYear === year ? theme.hoverBg : theme.borderColorInactive,
                  color: theme.hoverColor,
                  transform: 'translateY(-1px)',
                  boxShadow: 'md'
                }}
                _active={{
                  transform: 'translateY(0)',
                  boxShadow: 'sm'
                }}
                transition="all 0.2s"
                borderRadius="full"
                fontSize={{ base: 'xs', md: 'sm' }}
                ref={el => { if (el) yearRefs.current[year] = el; }}
                onKeyDown={(e) => handleKeyDown(e, year)}
                aria-label={`Filter events from ${year}`}
                aria-current={year === currentYear || visibleYear === year ? 'true' : 'false'}
                opacity={visibleYear && visibleYear !== year ? 0.8 : 1}
              >
                {year}
              </Button>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default TimelineBar;
