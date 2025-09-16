import { Box } from '@chakra-ui/react';
import Hero from '../components/Hero';
//import NextEvents from '../components/NextEvents';
import Statistics from '../components/Statistics';
//import HistoricGuitars from '../components/HistoricGuitars';
import Curriculum from '../components/layout/Curriculum';

const HomePage = () => {
  return (
    <Box>
      <Hero />
      <Statistics />
      <Curriculum />
    </Box>
  );
};

export default HomePage;
