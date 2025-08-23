import { Box, Button, Grid, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { events } from '../data/data';
import { getUpcomingEvents } from '../utils/eventUtils';
import EventCard from './EventCard';

const NextEvents = () => {
  // Get the first 3 upcoming events
  const upcomingEvents = getUpcomingEvents(events).slice(0, 3);

  return (
    <Box py={10}>
      <Heading as="h2" textStyle="sectionTitle" textAlign="center">
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
            <Button variant="solid" colorScheme="accent">
              View All Events
            </Button>
          </RouterLink>
        </Box>
      )}
    </Box>
  );
};

export default NextEvents;
