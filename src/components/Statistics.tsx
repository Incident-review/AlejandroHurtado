import { Box, SimpleGrid, VStack, Text, useTheme } from '@chakra-ui/react';
import { Stat, StatArrow, StatHelpText, StatLabel, StatNumber, StatGroup } from '@chakra-ui/stat';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { eventDataService } from '../services/eventDataService';

interface AnimatedStatProps {
  label: string;
  value: string;
  helpText: React.ReactNode;
}

const AnimatedStat = ({ label, value, helpText }: AnimatedStatProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
      });
    } else {
      controls.start({ opacity: 0, y: 20 });
    }
  }, [controls, inView]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={controls}>
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>
          <motion.span>
            {inView ? <Counter from={0} to={numericValue} /> : '0'}
            {value.includes('+') ? '+' : ''}
          </motion.span>
        </StatNumber>
        <StatHelpText>{helpText}</StatHelpText>
      </Stat>
    </motion.div>
  );
};

interface CounterProps {
  from: number;
  to: number;
}

const Counter = ({ from, to }: CounterProps) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    controls.start({
      opacity: [0, 1],
      transition: { duration: 1.5, ease: 'easeOut' }
    });

    // Simple counter animation
    let start: number;
    const duration = 1500; // 1.5 seconds
    const startValue = from;
    const endValue = to;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const value = Math.floor(startValue + progress * (endValue - startValue));
      node.textContent = value.toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [from, to, controls]);

  return <motion.span ref={nodeRef} animate={controls} />;
};

const Statistics = () => {
  const [stats, setStats] = useState({
    totalConcerts: 0,
    citiesVisited: 0,
    countriesToured: 0
  });
  const theme = useTheme();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const allEvents = eventDataService.getAllEvents();
        const now = new Date();
        const pastEvents = allEvents.filter(event => new Date(event.date) < now);
        
        // Count unique cities and countries
        const uniqueCities = new Set(
          pastEvents.map(event => `${event.location.city}, ${event.location.country}`)
        );
        const uniqueCountries = new Set(
          pastEvents.map(event => event.location.country)
        );
        
        setStats({
          totalConcerts: pastEvents.length,
          citiesVisited: uniqueCities.size,
          countriesToured: uniqueCountries.size
        });
      } catch (error) {
        console.error('Error loading event statistics:', error);
        // Fallback to some default values if there's an error
        setStats({
          totalConcerts: 50, // Default fallback value
          citiesVisited: 30,  // Default fallback value
          countriesToured: 15 // Default fallback value
        });
      }
    };

    loadStats();
  }, []);

  return (
    <Box sx={{
      ...theme.sectionStyles.statistics,
      background: 'transparent',
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '"\"',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(1px 1px at 15px 25px, rgba(139, 115, 85, 0.06), transparent),
          radial-gradient(1px 1px at 35px 45px, rgba(205, 133, 63, 0.04), transparent),
          radial-gradient(2px 2px at 55px 65px, rgba(184, 134, 11, 0.03), transparent),
          radial-gradient(1px 1px at 75px 85px, rgba(139, 115, 85, 0.04), transparent)
        `,
        backgroundRepeat: 'repeat',
        backgroundSize: '120px 120px',
        zIndex: 0,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(2px 2px at 25px 35px, rgba(139, 115, 85, 0.03), transparent),
          radial-gradient(1px 1px at 45px 55px, rgba(205, 133, 63, 0.02), transparent),
          radial-gradient(1px 1px at 65px 75px, rgba(184, 134, 11, 0.03), transparent)
        `,
        backgroundRepeat: 'repeat',
        backgroundSize: '150px 150px',
        zIndex: 0,
      }
    }}>
      <VStack gap={20} bg="transparent">
        <StatGroup>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={100}>
            <AnimatedStat
              label="Concerts Played"
              value={`${stats.totalConcerts.toLocaleString()}`}
              helpText={
                <>
                  <StatArrow type="increase" color="#8b7355" />
                  <Text color="#f5f5dc" fontWeight="medium">More to come!</Text>
                </>
              }
            />
            <AnimatedStat
              label="Cities Visited"
              value={`${stats.citiesVisited}`}
              helpText={
                <>
                  <StatArrow type="increase" color="#8b7355" />
                  <Text color="#f5f5dc" fontWeight="medium">And counting!</Text>
                </>
              }
            />
            <AnimatedStat
              label="Countries Toured"
              value={`${stats.countriesToured}`}
              helpText={<Text color="#f5f5dc" fontWeight="medium">Different cultures, one music!</Text>}
            />
          </SimpleGrid>
        </StatGroup>
      </VStack>
    </Box>
  );
};

export default Statistics;
