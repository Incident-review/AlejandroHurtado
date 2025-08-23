import { Box, SimpleGrid, VStack, Heading, Flex, Badge, Icon, Text, useTheme } from '@chakra-ui/react';
import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from '@chakra-ui/stat';
import { animate, motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { FaTrophy } from 'react-icons/fa';
import { events } from '../data/data';
import { getCountriesToured, getTotalAwards, getTotalConcerts, getUniqueAwards } from '../utils/eventUtils';

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
  const awardsRef = useRef(null);
  const awardsInView = useInView(awardsRef, { once: true, amount: 0.5 });
  const totalConcerts = getTotalConcerts(events);
  const totalAwards = getTotalAwards(events);
  const countriesToured = getCountriesToured(events);
  const uniqueAwards = getUniqueAwards(events);
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <Box sx={theme.sectionStyles.statistics}>
      <VStack gap={20}>
        <StatGroup>
          <SimpleGrid columns={{ base: 1, md: 3 }} gap={100}>
            <AnimatedStat
              label="Concerts Played"
              value={`${totalConcerts.toLocaleString()}`}
              helpText={
                <>
                  <StatArrow type="increase" />
                  More to come!
                </>
              }
            />
            <AnimatedStat
              label="Awards Won"
              value={`${totalAwards}`}
              helpText={
                <>
                  <StatArrow type="increase" />
                  Aiming for more!
                </>
              }
            />
            <AnimatedStat
              label="Countries Toured"
              value={`${countriesToured}`}
              helpText={<>Different cultures, one music!</>}
            />
          </SimpleGrid>
        </StatGroup>

        {uniqueAwards.length > 0 && (
          <Box ref={awardsRef} w="100%">
            <Heading size="lg" textAlign="center" mb={8}>
              Notable Awards
            </Heading>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={awardsInView ? 'visible' : 'hidden'}
            >
              <Flex wrap="wrap" justify="center" gap={4}>
                {uniqueAwards.map((award) => (
                  <motion.div key={award.name} variants={itemVariants}>
                    <Badge
                      as="a"
                      href={`/awards/${encodeURIComponent(award.name)}`}
                      layerStyle="awardsBadge"
                      cursor="pointer"
                      _hover={{ boxShadow: 'md', transform: 'scale(1.05)', textDecoration: 'none' }}
                    >
                      <Icon as={FaTrophy} />
                      <Text>{award.name}</Text>
                    </Badge>
                  </motion.div>
                ))}
              </Flex>
            </motion.div>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Statistics;
