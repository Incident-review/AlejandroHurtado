import { Box, Button, HStack, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useRef, useCallback } from 'react';

export interface TimelineBarProps {
  years: number[];
  currentYear: number;
  onYearClick: (year: number) => void;
  headerHeight?: number;
  stickyOffset?: number;
}

const TimelineBar = ({
  years,
  currentYear,
  onYearClick,
  headerHeight = 64,
  stickyOffset = 0,
}: TimelineBarProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  const yearRefs = useRef<{ [year: number]: HTMLButtonElement | null }>({});
  const isDesktop = useBreakpointValue({ base: false, md: true });

  // Auto-scroll to the current year
  useEffect(() => {
    const activeBtn = yearRefs.current[currentYear];
    const bar = barRef.current;
    
    if (activeBtn && bar) {
      const barRect = bar.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const scrollLeft = 
        activeBtn.offsetLeft - bar.offsetLeft - barRect.width / 2 + btnRect.width / 2;
      
      bar.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }, [currentYear]);

  const handleYearClick = useCallback((year: number) => {
    onYearClick(year);
    
    // Smooth scroll to the year section in the page
    const element = document.getElementById(`year-${year}`);
    if (element) {
      const headerOffset = headerHeight + (stickyOffset || 0);
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, [onYearClick, headerHeight, stickyOffset]);

  if (years.length === 0) return null;

  return (
    <Box
      ref={barRef}
      position="sticky"
      top={{ base: `${headerHeight}px`, md: `${headerHeight + 16}px` }}
      left={0}
      right={0}
      zIndex={1200}
      bg="rgba(0, 0, 0, 0.85)"
      borderBottom="1px solid"
      borderColor="rgba(255, 255, 255, 0.1)"
      py={{ base: 2, md: 3 }}
      boxShadow="lg"
      overflowX="auto"
      sx={{
        backdropFilter: 'blur(10px)',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      <HStack
        spacing={{ base: 4, md: 6 }}
        px={{ base: 4, md: 8 }}
        minW="max-content"
        justify="center"
      >
        {years.map((year) => (
          <Button
            key={year}
            ref={el => { if (el) yearRefs.current[year] = el }}
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
              transform: 'translateY(-2px)',
            }}
            _active={{
              color: 'white',
              transform: 'translateY(0)',
            }}
            transition="all 0.2s"
            onClick={() => handleYearClick(year)}
            position="relative"
            _after={{
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: currentYear === year ? '24px' : '0',
              height: '3px',
              bg: 'white',
              borderRadius: 'full',
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {year}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default TimelineBar;
