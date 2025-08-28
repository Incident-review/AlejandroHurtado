import { Box, SimpleGrid, VStack, Text, useTheme } from '@chakra-ui/react';
import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat';
import { animate, motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import events from '../data/data';
import { getCountriesToured, getTotalAwards, getTotalConcerts } from '../utils/eventUtils';

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

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration: 1.5,
      ease: 'easeOut',
      onUpdate(value: number) {
        node.textContent = Math.round(value).toLocaleString();
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <span ref={nodeRef} />;
};

const Statistics = () => {
  const totalConcerts = getTotalConcerts(events);
  const totalAwards = getTotalAwards(events);
  const countriesToured = getCountriesToured(events);
  const theme = useTheme();

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
              value={`${totalConcerts.toLocaleString()}`}
              helpText={
                <>
                  <StatArrow type="increase" color="#8b7355" />
                  <Text color="#f5f5dc" fontWeight="medium">More to come!</Text>
                </>
              }
            />
            <AnimatedStat
              label="Awards Won"
              value={`${totalAwards}`}
              helpText={
                <>
                  <StatArrow type="increase" color="#8b7355" />
                  <Text color="#f5f5dc" fontWeight="medium">Aiming for more!</Text>
                </>
              }
            />
            <AnimatedStat
              label="Countries Toured"
              value={`${countriesToured}`}
              helpText={<Text color="#f5f5dc" fontWeight="medium">Different cultures, one music!</Text>}
            />
          </SimpleGrid>
        </StatGroup>
      </VStack>
    </Box>
  );
};

export default Statistics;
