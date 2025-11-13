import { Box, SimpleGrid, Text, useBreakpointValue } from '@chakra-ui/react';
import { useEffect, useMemo, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { eventService } from './eventService';
import type { Event } from './events';

// Helper to get current year
const currentYear = new Date().getFullYear();
const careerStartYear = 2014; // Based on event data
const careerYears = currentYear - careerStartYear;

interface StatItem {
  value: number;
  label: string;
  description: string;
}

interface PerformanceStats {
  totalConcerts: number;
  countriesPerformed: number;
  yearsActive: number;
  citiesVisited: number;
  uniqueVenues: number;
}

const AnimatedCounter = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const duration = 1.5; // seconds

  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const end = value;
    const incrementTime = Math.max(10, (duration * 1000) / end); // Ensure minimum animation time
    
    const timer = setInterval(() => {
      start += 1;
      setCount(Math.min(start, end));
      
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const StatCard = ({ value, label, description }: StatItem) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={!isMobile ? { y: -5 } : {}}
    >
      <Box
        textAlign="center"
        p={{ base: 3, md: 4 }}
        borderRadius="md"
        bg="rgba(255, 255, 255, 0.03)"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.08)"
        h="100%"
        transition="all 0.3s ease"
        _hover={{
          borderColor: 'rgba(255, 255, 255, 0.15)',
          transform: 'translateY(-2px)'
        }}
      >
        <Text 
          as="div"
          fontSize={{ base: '2xl', md: '3xl' }}
          fontWeight="300"
          color="white"
          lineHeight="1.1"
          mb={2}
          minH={{ base: '2rem', md: '2.5rem' }}
        >
          <AnimatedCounter value={value} />
        </Text>
        
        <Text 
          fontSize={{ base: 'xs', md: 'sm' }} 
          color="gray.400"
          letterSpacing="0.05em"
          textTransform="uppercase"
          mb={1}
        >
          {label}
        </Text>
        
        <Text 
          fontSize={{ base: '2xs', md: 'xs' }} 
          color="gray.500"
          lineHeight="tall"
        >
          {description}
        </Text>
      </Box>
    </motion.div>
  );
};

const usePerformanceStats = (): [PerformanceStats | null, boolean] => {
  const [stats, setStats] = useState<PerformanceStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const calculateStats = (events: Event[]): PerformanceStats => {
      const uniqueCountries = new Set<string>();
      const uniqueCities = new Set<string>();
      const uniqueVenues = new Set<string>();
      
      events.forEach((event) => {
        if (event.location?.country) {
          uniqueCountries.add(event.location.country);
        }
        if (event.location?.city) {
          uniqueCities.add(event.location.city.toLowerCase().trim());
        }
        if (event.location?.venue) {
          uniqueVenues.add(event.location.venue.trim());
        }
      });

      return {
        totalConcerts: events.length,
        countriesPerformed: uniqueCountries.size,
        yearsActive: careerYears,
        citiesVisited: uniqueCities.size,
        uniqueVenues: uniqueVenues.size
      };
    };

    const loadStats = async () => {
      try {
        const allEvents = eventService.getAllEvents();
        const stats = calculateStats(allEvents);
        setStats(stats);
      } catch (error) {
        console.error('Error loading performance stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, []);

  return [stats, isLoading];
};

const Statistics = () => {
  const { t } = useTranslation();
  const [stats, isLoading] = usePerformanceStats();

  const statItems = useMemo<StatItem[]>(() => {
    if (!stats) return [];
    
    return [
      {
        value: stats.totalConcerts,
        label: t('statistics.concerts'),
        description: t('statistics.concertsDesc')
      },
      {
        value: stats.countriesPerformed,
        label: t('statistics.countries'),
        description: t('statistics.countriesDesc')
      },
      {
        value: stats.citiesVisited,
        label: t('statistics.cities'),
        description: t('statistics.citiesDesc')
      },
      {
        value: stats.uniqueVenues,
        label: t('statistics.venues'),
        description: t('statistics.venuesDesc')
      },
      {
        value: stats.yearsActive,
        label: t('statistics.years'),
        description: t('statistics.yearsDesc')
      }
    ];
  }, [stats, t]);

  if (isLoading || !stats) {
    return (
      <Box py={20} w="full" position="relative" bg="transparent">
        <Box maxW="6xl" mx="auto" px={{ base: 6, md: 8 }}>
          <Text textAlign="center" color="gray.400">{t('statistics.loading')}</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box py={{ base: 12, md: 16 }} w="full" position="relative" bg="transparent">
      <Box maxW="6xl" mx="auto" px={{ base: 4, md: 6 }}>
        <SimpleGrid 
          columns={{ base: 2, sm: 3, md: 5 }} 
          spacing={{ base: 3, md: 4 }}
          mx="auto"
          maxW="4xl"
        >
          {statItems.map((item) => (
            <StatCard key={item.label} {...item} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default Statistics;
