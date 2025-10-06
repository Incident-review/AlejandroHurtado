import { Box, Container } from '@chakra-ui/react';
import Hero from '../components/Hero';
//import NextEvents from '../components/NextEvents';
import Statistics from '../components/features/events/Statistics';
//import HistoricGuitars from '../components/HistoricGuitars';
import Curriculum from '../components/Curriculum';

const HomePage = () => {
  return (
    <Box as="main" minH="100vh">
      <Hero />
      <Box as="section" py={16}>
        <Container maxW="container.xl">
          <Statistics />
          <Curriculum />
        </Container>
      </Box>
      
    </Box>
  );
};

export default HomePage;
