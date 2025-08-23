import { Box } from '@chakra-ui/react';
import Hero from '../components/Hero';
import NextEvents from '../components/NextEvents';
import Statistics from '../components/Statistics';

const HomePage = () => {
  return (
    <Box>
      <Hero />
      <Statistics />
      <NextEvents />
    </Box>
  );
};

export default HomePage;
