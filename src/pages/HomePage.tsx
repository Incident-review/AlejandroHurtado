import { Box } from '@chakra-ui/react';
import Hero from '../components/Hero';
import NextEvents from '../components/NextEvents';
import Statistics from '../components/Statistics';
import HistoricGuitars from '../components/HistoricGuitars';

const HomePage = () => {
  return (
    <Box>
      <Hero />
      <Statistics />
      <HistoricGuitars />
      <NextEvents />
    </Box>
  );
};

export default HomePage;
