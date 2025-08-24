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
      left={0}
      w="100vw"
      zIndex={1200}
      bg="rgba(26, 15, 10, 0.85)"
      //borderBottom="1px solid"
      //borderColor="rgba(139, 115, 85, 0.6)"
      py={{ base: 0.5, md: 1 }}
      boxShadow="xl"
      overflowX="auto"
      ref={barRef}
      sx={{
        backdropFilter: 'blur(15px)',
        scrollbarWidth: 'none', // Firefox
        '&::-webkit-scrollbar': { display: 'none' }, // Chrome/Safari
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(1px 1px at 5px 10px, rgba(139, 115, 85, 0.05), transparent),
            radial-gradient(1px 1px at 15px 25px, rgba(205, 133, 63, 0.03), transparent),
            radial-gradient(2px 2px at 25px 35px, rgba(184, 134, 11, 0.02), transparent)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '50px 50px',
          zIndex: 0,
        }
      }}
    >
      <Box h={{ base: 1, md: 2 }} />
      <HStack spacing={2} w="100%" justifyContent="flex-start">
        {years.map((year) => {
          const isActive = year === currentYear;
          return (
            <Button
              key={year}
              size={{ base: 'xs', md: 'sm' }}
              variant={isActive ? 'solid' : 'outline'}
              colorScheme="yellow"
              fontWeight={isActive ? 'bold' : 'normal'}
              onClick={() => onYearClick(year)}
              minW={{ base: '48px', md: '56px' }}
              borderWidth={isActive ? 2 : 1}
              borderColor={isActive ? '#cd853f' : '#8b7355'}
              bg={isActive ? '#8b7355' : 'transparent'}
              color={isActive ? '#faf0c0' : '#f0d680'}
              _hover={{ 
                bg: isActive ? '#a0856b' : '#8b7355',
                color: isActive ? '#faf0c0' : '#faf0c0',
                transform: 'translateY(-1px)',
                boxShadow: 'md'
              }}
              transition="all 0.3s ease"
              borderRadius="full"
              fontSize={{ base: 'xs', md: 'sm' }}
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