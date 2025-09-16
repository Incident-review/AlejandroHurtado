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
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Responsive values
  const buttonSize = useBreakpointValue({ base: 'xs', md: 'sm' });
  const buttonMinWidth = useBreakpointValue({ base: '48px', md: '56px' });

  // Handle intersection observer for visible year detection
  useEffect(() => {
    if (!onYearVisible) return;

    console.log('Setting up intersection observer...');
    console.log('Available years:', years);

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        console.log('Intersection observer entries:', entries.length);
        
        // Find the section that's closest to the top of the viewport
        interface ClosestSection {
          element: Element;
          top: number;
        }
        let closestSection: ClosestSection | null = null;
        
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            const rect = entry.target.getBoundingClientRect();
            const distanceFromTop = Math.abs(rect.top);
            
            if (!closestSection || distanceFromTop < closestSection.top) {
              closestSection = {
                element: entry.target,
                top: distanceFromTop
              };
            }
          }
        });

        if (closestSection) {
          const target = closestSection.element as HTMLElement;
          
          // Try both possible attribute names
          const yearAttr = target.getAttribute('data-year') || 
                          target.getAttribute('data-event-year');
          
          if (yearAttr) {
            const year = parseInt(yearAttr, 10);
            if (!isNaN(year) && years.includes(year)) {
              console.log('Year in view:', year);
              onYearVisible(year);
            }
          }
        }
      },
      {
        root: null,
        // Use a larger root margin to detect sections as they approach the viewport
        rootMargin: '-20% 0px -70% 0px',
        // Use a single threshold since we're calculating visibility differently
        threshold: 0.1
      }
    );

    // Observe all year sections
    const yearSections = document.querySelectorAll('[data-year], [data-event-year]');
    console.log(`Found ${yearSections.length} year sections to observe`);
    
    yearSections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [onYearVisible, years]);

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

  // Keyboard navigation handler (kept for future use)
  // const handleKeyDown = useCallback((e: React.KeyboardEvent, year: number) => {
  //   const currentIndex = years.indexOf(year);
  //   
  //   if (e.key === 'ArrowRight' && currentIndex < years.length - 1) {
  //     onYearClick(years[currentIndex + 1]);
  //   } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
  //     onYearClick(years[currentIndex - 1]);
  //   } else if (e.key === 'Home') {
  //     onYearClick(years[0]);
  //   } else if (e.key === 'End') {
  //     onYearClick(years[years.length - 1]);
  //   }
  // }, [years, onYearClick]);

  // Handle year button click
  const handleClick = useCallback((year: number) => {
    if (!isScrolling) {
      onYearClick(year);
      scrollToYear(year);
      
      // Force update the visible year
      if (onYearVisible) {
        onYearVisible(year);
      }
    }
  }, [isScrolling, onYearClick, scrollToYear, onYearVisible]);

  // Update active year when visible year changes
  useEffect(() => {
    if (visibleYear && visibleYear !== currentYear && !isScrolling) {
      // Update the current year in the parent component
      onYearClick(visibleYear);
      
      // Ensure the button is scrolled into view
      if (yearRefs.current[visibleYear]) {
        yearRefs.current[visibleYear]?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [visibleYear, currentYear, isScrolling, onYearClick]);

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
      py={6}
      px={{ base: 8, md: 12 }}
      minH="64px"
      sx={{
        paddingLeft: 'calc(50% - 50vw + 1rem)',
        paddingRight: 'calc(50% - 50vw + 1rem)',
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
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      <Box 
        display="flex"
        justifyContent="center"
        alignItems="center"
        h="100%"
        w="100%"
        overflowX="auto"
        overflowY="hidden"
        px={4}
        css={{
          '& > *:not(:last-child)': {
            marginRight: '16px',
          },
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
        ref={barRef}
      >
        {years.map((year) => {
          const isActive = year === currentYear || year === visibleYear;
          return (
            <Button
              key={year}
              ref={el => { if (el) yearRefs.current[year] = el; }}
              size={buttonSize}
              minW={buttonMinWidth}
              variant="ghost"
              colorScheme={variant === 'dark' ? 'orange' : 'blue'}
              onClick={() => handleClick(year)}
              isActive={isActive}
              _active={{
                transform: 'scale(0.98)',
                boxShadow: 'sm',
              }}
              transition="all 0.2s"
              borderRadius="full"
              fontSize={{ base: 'sm', md: 'md' }}
              fontWeight={isActive ? 'bold' : 'normal'}
              px={{ base: 4, md: 5 }}
              color={isActive ? theme.activeColor : theme.inactiveColor}
              bg={isActive ? theme.activeBg : 'transparent'}
              border="1px solid"
              borderColor={isActive ? theme.borderColorActive : theme.borderColorInactive}
              _hover={{
                bg: isActive ? theme.activeBg : 'transparent',
                color: isActive ? theme.activeColor : theme.inactiveColor,
              }}
              position="relative"
            >
              {year}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
};

export default TimelineBar;
