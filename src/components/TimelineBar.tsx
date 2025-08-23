import { Box, Button, HStack } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

interface TimelineBarProps {
  years: number[];
  currentYear: number;
  onYearClick: (year: number) => void;
  isDesktop?: boolean; // Added for responsive style
}

const TimelineBar = ({ years, currentYear, onYearClick, isDesktop }: TimelineBarProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  const yearRefs = useRef<{ [year: number]: HTMLButtonElement | null }>({});

  useEffect(() => {
    const activeBtn = yearRefs.current[currentYear];
    const bar = barRef.current;
    if (activeBtn && bar) {
      const barRect = bar.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const scrollLeft =
        activeBtn.offsetLeft - bar.offsetLeft - barRect.width / 2 + btnRect.width / 2;
      bar.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [currentYear]);

  return (
    <Box
      id="timeline-bar"
      position="fixed"
      top="var(--header-height)"
      left="0"
      w="100vw"
      zIndex={1200}
      // Use more subtle color and highlight for desktop
      bg={isDesktop ? 'gray.50' : 'whiteAlpha.900'}
      borderBottom="1px solid"
      borderColor={isDesktop ? 'gray.300' : 'gray.200'}
      py={1}
      boxShadow={isDesktop ? 'md' : 'sm'}
      overflowX="auto"
      ref={barRef}
      sx={{
        backdropFilter: 'blur(6px)',
        scrollbarWidth: 'none', // Firefox
        '&::-webkit-scrollbar': { display: 'none' }, // Chrome/Safari
      }}
    >
      <Box h={{ base: 3, md: 4 }} />
      <HStack spacing={2} w="100%" justifyContent="flex-start">
        {years.map((year) => {
          const isActive = year === currentYear;
          return (
            <Button
              key={year}
              size="sm"
              variant={isActive ? (isDesktop ? 'ghost' : 'solid') : 'outline'}
              colorScheme={isActive ? (isDesktop ? 'gray' : 'teal') : 'gray'}
              fontWeight={isActive ? 'bold' : 'normal'}
              onClick={() => onYearClick(year)}
              minW="56px"
              borderWidth={isActive ? (isDesktop ? 0 : 2) : 1}
              borderColor={isActive ? (isDesktop ? 'transparent' : 'teal.500') : 'gray.300'}
              bg={isActive ? (isDesktop ? 'transparent' : 'teal.500') : (isDesktop ? 'transparent' : 'white')}
              color={isActive ? (isDesktop ? 'gray.800' : 'white') : 'gray.800'}
              textDecoration={isActive && isDesktop ? 'underline' : 'none'}
              _hover={{ bg: isActive ? (isDesktop ? 'gray.100' : 'teal.600') : (isDesktop ? 'gray.100' : 'gray.100') }}
              transition="all 0.2s"
              ref={el => {
                yearRefs.current[year] = el;
              }}
            >
              {year}
            </Button>
          );
        })}
      </HStack>
    </Box>
  );
};

export default TimelineBar;

// NOTE: TimelineBar now accepts isDesktop and adjusts color/highlight for desktop mode. You can further tweak the colors or styles as desired.