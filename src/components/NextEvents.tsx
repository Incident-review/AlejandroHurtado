import { Box, Button, Grid, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { events } from '../data/data';
import { getUpcomingEvents } from '../utils/eventUtils';
import EventCard from './EventCard';

const NextEvents = () => {
  // Get the first 3 upcoming events
  const upcomingEvents = getUpcomingEvents(events).slice(0, 3);

  return (
    <Box py={10} bg="#1a0f0a" position="relative" overflow="hidden">
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        background="linear-gradient(135deg, #1a0f0a 0%, #2d1b0f 25%, #4a2d1a 50%, #6b4c2e 75%, #8b6b3a 100%)"
        zIndex={0}
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        background="radial-gradient(circle at 20% 80%, rgba(139, 115, 85, 0.04) 0%, transparent 50%)"
        zIndex={0}
      />
      <Box position="relative" zIndex={1}>
        <Heading as="h2" textStyle="sectionTitle" textAlign="center" color="#faf0c0">
          Next Events
        </Heading>
        <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={8}>
          {upcomingEvents.map((event) => (
            <EventCard key={event.eventNumber} event={event} />
          ))}
        </Grid>
        {events.length > 3 && (
          <Box textAlign="center" mt={8}>
            <RouterLink to="/events">
              <Button 
                variant="solid" 
                bg="rgba(139, 115, 85, 0.9)"
                color="#faf0c0"
                fontWeight="bold"
                _hover={{ 
                  bg: 'rgba(160, 133, 107, 0.95)',
                  transform: 'translateY(-2px)',
                  boxShadow: 'xl'
                }}
                transition="all 0.3s ease"
                border="2px solid"
                borderColor="#cd853f"
                size="lg"
                backdropFilter="blur(10px)"
              >
                View All Events
              </Button>
            </RouterLink>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NextEvents;
